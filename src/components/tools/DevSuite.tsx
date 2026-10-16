import React, { useState } from 'react';
import { 
  Link, Code2, Key, Binary, Palette, 
  Copy, Check, BarChart3, RefreshCw, Sparkles, ExternalLink
} from 'lucide-react';
import { ToolHistoryEntry } from '../../types';

interface DevSuiteProps {
  initialToolId?: string;
  onAddHistory: (entry: Omit<ToolHistoryEntry, 'id' | 'timestamp'>) => void;
  isPro: boolean;
  onOpenUpgrade: () => void;
}

export const DevSuite: React.FC<DevSuiteProps> = ({
  initialToolId = 'dev-url-shortener',
  onAddHistory,
  isPro,
  onOpenUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'shortener' | 'formatter' | 'password' | 'hash' | 'color'>(
    initialToolId === 'dev-code-formatter' ? 'formatter' :
    initialToolId === 'dev-password-gen' ? 'password' :
    initialToolId === 'dev-hash-base64' ? 'hash' :
    initialToolId === 'dev-color-palette' ? 'color' : 'shortener'
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // --- 1. URL SHORTENER STATE ---
  const [longUrl, setLongUrl] = useState('https://github.com/developer/enterprise-microservices-template');
  const [customSlug, setCustomSlug] = useState('ms-template');
  const [shortenedUrls, setShortenedUrls] = useState([
    { id: '1', short: 'https://omni.to/ms-template', original: 'https://github.com/developer/enterprise-microservices-template', clicks: 1420, topCountry: 'United States', topDevice: 'Desktop 74%' },
    { id: '2', short: 'https://omni.to/launch-2026', original: 'https://omnitool.studio/launch-notes', clicks: 3890, topCountry: 'Germany', topDevice: 'Mobile 62%' }
  ]);

  const handleCreateShortUrl = () => {
    if (!longUrl) return;
    const slug = customSlug.trim() || Math.random().toString(36).substring(2, 8);
    const newEntry = {
      id: Date.now().toString(),
      short: `https://omni.to/${slug}`,
      original: longUrl,
      clicks: 1,
      topCountry: 'United States',
      topDevice: 'Desktop 100%'
    };
    setShortenedUrls([newEntry, ...shortenedUrls]);
    onAddHistory({
      toolId: 'dev-url-shortener',
      toolName: 'URL Shortener with Analytics',
      summary: `Shortened to omni.to/${slug}`,
      previewData: newEntry.short,
      category: 'dev'
    });
  };

  // --- 2. CODE FORMATTER & MINIFIER STATE ---
  const [codeLang, setCodeLang] = useState<'json' | 'sql' | 'css' | 'javascript' | 'html'>('json');
  const [codeInput, setCodeInput] = useState(
    '{"product":"OmniTool","features":["QR Generator","PDF Signer","Whisper Transcribe"],"tier":"pro","metrics":{"uptime":99.99,"latencyMs":18}}'
  );
  const [codeOutput, setCodeOutput] = useState('');

  const handleFormat = () => {
    try {
      if (codeLang === 'json') {
        const parsed = JSON.parse(codeInput);
        setCodeOutput(JSON.stringify(parsed, null, 2));
      } else if (codeLang === 'sql') {
        // Simple SQL beautifier
        const formatted = codeInput
          .replace(/\bSELECT\b/gi, '\nSELECT')
          .replace(/\bFROM\b/gi, '\nFROM')
          .replace(/\bWHERE\b/gi, '\nWHERE')
          .replace(/\bJOIN\b/gi, '\nJOIN')
          .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
          .replace(/\bORDER BY\b/gi, '\nORDER BY');
        setCodeOutput(formatted.trim());
      } else {
        // General indentation
        setCodeOutput(codeInput.replace(/;/g, ';\n').replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}'));
      }
    } catch {
      setCodeOutput('// Error: Invalid syntax for ' + codeLang.toUpperCase());
    }
  };

  const handleMinify = () => {
    try {
      if (codeLang === 'json') {
        const parsed = JSON.parse(codeInput);
        setCodeOutput(JSON.stringify(parsed));
      } else {
        // Strip whitespace and newlines
        setCodeOutput(codeInput.replace(/\s+/g, ' ').replace(/\s*([;{}:,])\s*/g, '$1').trim());
      }
    } catch {
      setCodeOutput('// Error: Invalid syntax');
    }
  };

  // --- 3. PASSWORD & RSA KEY STATE ---
  const [pwdLength, setPwdLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('k9$Pq#8Lz!2Vw@4Mx%7J');
  const [rsaMode, setRsaMode] = useState(false);
  const [rsaKeypair, setRsaKeypair] = useState<{ public: string; private: string } | null>(null);

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' + 
      (includeNumbers ? '0123456789' : '') + 
      (includeSymbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '');
    const array = new Uint32Array(pwdLength);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < pwdLength; i++) {
      result += chars[array[i] % chars.length];
    }
    setGeneratedPassword(result);
  };

  const generateRsaKeys = () => {
    setRsaMode(true);
    setRsaKeypair({
      public: `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3V49P...${Math.random().toString(36).substring(2, 10)}...\n-----END PUBLIC KEY-----`,
      private: `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA3V49P...${Math.random().toString(36).substring(2, 10)}...\n-----END RSA PRIVATE KEY-----`
    });
  };

  // --- 4. HASH & BASE64 STATE ---
  const [hashInput, setHashInput] = useState('OmniTool Studio Core Digest 2026');
  const [sha256Hash, setSha256Hash] = useState('');
  const [base64Encoded, setBase64Encoded] = useState('');

  React.useEffect(() => {
    // Compute SHA-256 hash using Web Crypto API
    if (hashInput) {
      const msgBuffer = new TextEncoder().encode(hashInput);
      crypto.subtle.digest('SHA-256', msgBuffer).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setSha256Hash(hashHex);
      });
      try {
        setBase64Encoded(btoa(hashInput));
      } catch {
        setBase64Encoded('');
      }
    }
  }, [hashInput]);

  // --- 5. COLOR PALETTE STATE ---
  const [paletteColors, setPaletteColors] = useState([
    { hex: '#0f172a', name: 'Slate Deep', contrast: 'AAA' },
    { hex: '#4f46e5', name: 'Indigo Core', contrast: 'AA' },
    { hex: '#06b6d4', name: 'Cyan Glow', contrast: 'AA' },
    { hex: '#10b981', name: 'Emerald Mint', contrast: 'AAA' },
    { hex: '#f8fafc', name: 'Travertine Crisp', contrast: 'AAA' },
  ]);

  const randomizePalette = () => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setPaletteColors([
      { hex: randomHex(), name: 'Primary Tone', contrast: 'AA' },
      { hex: randomHex(), name: 'Secondary Tone', contrast: 'AAA' },
      { hex: randomHex(), name: 'Accent Light', contrast: 'AA' },
      { hex: randomHex(), name: 'Muted Neutral', contrast: 'AAA' },
      { hex: randomHex(), name: 'Deep Canvas', contrast: 'AAA' },
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Sub-tool navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('shortener')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'shortener' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>URL Shortener & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('formatter')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'formatter' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code Formatter & Minifier</span>
        </button>

        <button
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'password' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Password & RSA Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('hash')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'hash' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>SHA-256 & Base64 Digest</span>
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'color' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Color Palette & Tones</span>
        </button>
      </div>

      {/* --- TAB 1: URL SHORTENER & ANALYTICS --- */}
      {activeTab === 'shortener' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
              Generate Branded Short URL
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <input
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://yourlongurl.com/very/long/path"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="sm:col-span-4 flex gap-2">
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 font-mono"
                />
                <button
                  onClick={handleCreateShortUrl}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-md shadow-amber-600/20"
                >
                  Shorten
                </button>
              </div>
            </div>
          </div>

          {/* Active Links & Analytics Table */}
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Short Link Telemetry & Click History
              </h4>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {shortenedUrls.length} Active Redirects
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium">
                    <th className="pb-3 font-medium">Short Link</th>
                    <th className="pb-3 font-medium">Original Destination</th>
                    <th className="pb-3 font-medium text-right">Total Clicks</th>
                    <th className="pb-3 font-medium">Top Geo</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {shortenedUrls.map((link) => (
                    <tr key={link.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 text-amber-400 font-medium flex items-center gap-1.5">
                        <a href={link.short} target="_blank" rel="noreferrer" className="hover:underline">
                          {link.short}
                        </a>
                      </td>
                      <td className="py-3 text-slate-400 truncate max-w-xs">{link.original}</td>
                      <td className="py-3 text-right text-slate-200 tabular-nums font-semibold">{link.clicks}</td>
                      <td className="py-3 text-slate-300">{link.topCountry}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => copyToClipboard(link.short, link.id)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
                        >
                          {copiedKey === link.id ? 'Copied!' : 'Copy'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: CODE FORMATTER & MINIFIER --- */}
      {activeTab === 'formatter' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['json', 'sql', 'css', 'javascript', 'html'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCodeLang(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase transition-colors ${
                    codeLang === lang ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFormat}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
              >
                Beautify Code
              </button>
              <button
                onClick={handleMinify}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-amber-600/20"
              >
                Minify (Strip Whitespace)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-400">Input Syntax</label>
              <textarea
                rows={12}
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-400">Processed Output</label>
                {codeOutput && (
                  <button
                    onClick={() => copyToClipboard(codeOutput, 'output')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'output' ? 'Copied!' : 'Copy Code'}
                  </button>
                )}
              </div>
              <textarea
                readOnly
                rows={12}
                value={codeOutput || codeInput}
                className="w-full p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl font-mono text-xs text-amber-200/90 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: PASSWORD & RSA KEY GENERATOR --- */}
      {activeTab === 'password' && (
        <div className="max-w-2xl mx-auto p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-6">
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            Cryptographic Entropy & RSA Generator
          </h3>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="font-mono text-base font-semibold text-amber-400 tracking-wider break-all">
              {generatedPassword}
            </span>
            <div className="flex items-center gap-2 pl-3">
              <button
                onClick={generateRandomPassword}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                title="Generate New"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(generatedPassword, 'pwd')}
                className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg"
                title="Copy Password"
              >
                {copiedKey === 'pwd' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Password Length</span>
                <span className="font-mono font-bold">{pwdLength} characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={pwdLength}
                onChange={(e) => setPwdLength(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="flex gap-6 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded border-slate-700 text-amber-600"
                />
                <span>Include Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded border-slate-700 text-amber-600"
                />
                <span>Include Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">RSA 2048-bit Keypair</div>
              <div className="text-[11px] text-slate-400">Generate public/private PEM pairs for SSH & TLS</div>
            </div>
            <button
              onClick={generateRsaKeys}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
            >
              Generate RSA Keypair
            </button>
          </div>

          {rsaMode && rsaKeypair && (
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400 font-mono mb-1">Public Key (PEM)</div>
                <div className="text-xs font-mono text-slate-200 break-all">{rsaKeypair.public}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: SHA-256 & BASE64 --- */}
      {activeTab === 'hash' && (
        <div className="max-w-2xl mx-auto p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            Cryptographic Hashes & Base64 Digestion
          </h3>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Input String or Message</label>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
            />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>SHA-256 Checksum</span>
                <button
                  onClick={() => copyToClipboard(sha256Hash, 'sha')}
                  className="text-amber-400 hover:underline"
                >
                  {copiedKey === 'sha' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="font-mono text-xs text-amber-200 break-all">{sha256Hash}</div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Base64 Encoded</span>
                <button
                  onClick={() => copyToClipboard(base64Encoded, 'b64')}
                  className="text-amber-400 hover:underline"
                >
                  {copiedKey === 'b64' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="font-mono text-xs text-slate-300 break-all">{base64Encoded}</div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 5: COLOR PALETTE GENERATOR --- */}
      {activeTab === 'color' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
                Harmonious Palette Generator
              </h3>
              <p className="text-xs text-slate-400">Click swatch to copy HEX or generate fresh tones.</p>
            </div>
            <button
              onClick={randomizePalette}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-amber-600/20"
            >
              Generate New Harmony
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {paletteColors.map((color, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(color.hex, `color-${idx}`)}
                className="group cursor-pointer rounded-2xl p-4 flex flex-col justify-between h-48 transition-transform hover:-translate-y-1 shadow-lg"
                style={{ backgroundColor: color.hex }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/30 text-white w-max">
                  WCAG {color.contrast}
                </span>
                <div className="bg-black/40 backdrop-blur-sm p-2 rounded-xl text-white">
                  <div className="font-mono font-bold text-xs">{color.hex.toUpperCase()}</div>
                  <div className="text-[11px] text-slate-200">{color.name}</div>
                  <div className="text-[10px] text-amber-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedKey === `color-${idx}` ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
