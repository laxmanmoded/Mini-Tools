import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  Download, Copy, Check, Sparkles, Upload, 
  Link, Wifi, Contact, MessageSquare, Coins, FileText, RotateCcw
} from 'lucide-react';
import { QrOptions, ToolHistoryEntry } from '../../types';

interface QrCodeSuiteProps {
  onAddHistory: (entry: Omit<ToolHistoryEntry, 'id' | 'timestamp'>) => void;
  isPro: boolean;
  onOpenUpgrade: () => void;
}

export const QrCodeSuite: React.FC<QrCodeSuiteProps> = ({ onAddHistory, isPro, onOpenUpgrade }) => {
  const [tab, setTab] = useState<QrOptions['type']>('url');
  
  // Content states
  const [url, setUrl] = useState('https://omnitool.studio');
  const [wifiSsid, setWifiSsid] = useState('Guest_WiFi_5G');
  const [wifiPassword, setWifiPassword] = useState('SecretKey99');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  
  const [vcardName, setVcardName] = useState('Alex Mercer');
  const [vcardOrg, setVcardOrg] = useState('OmniTool Studio');
  const [vcardPhone, setVcardPhone] = useState('+1 (555) 234-5678');
  const [vcardEmail, setVcardEmail] = useState('alex@omnitool.studio');
  const [vcardUrl, setVcardUrl] = useState('https://omnitool.studio');

  const [waPhone, setWaPhone] = useState('15552345678');
  const [waMessage, setWaMessage] = useState('Hello! I would like to inquire about your Pro tier services.');

  const [cryptoType, setCryptoType] = useState<'bitcoin' | 'ethereum' | 'solana' | 'usdt'>('bitcoin');
  const [cryptoAddress, setCryptoAddress] = useState('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
  const [cryptoAmount, setCryptoAmount] = useState('0.005');

  const [plainText, setPlainText] = useState('OmniTool Studio: The Swiss Army Knife of Digital Tools');

  // Styling states
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [eyeStyle, setEyeStyle] = useState<'square' | 'rounded' | 'dots'>('rounded');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [qrSize, setQrSize] = useState<number>(360);
  
  // Status states
  const [copied, setCopied] = useState(false);
  const [svgString, setSvgString] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Compute raw payload based on active tab
  const getRawPayload = (): string => {
    switch (tab) {
      case 'url':
        return url.trim() || 'https://omnitool.studio';
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardUrl}\nEND:VCARD`;
      case 'whatsapp':
        return `https://wa.me/${waPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`;
      case 'crypto':
        if (cryptoType === 'bitcoin') {
          return `bitcoin:${cryptoAddress}?amount=${cryptoAmount}`;
        } else if (cryptoType === 'ethereum') {
          return `ethereum:${cryptoAddress}?value=${cryptoAmount}`;
        } else {
          return `${cryptoType}:${cryptoAddress}`;
        }
      case 'text':
      default:
        return plainText;
    }
  };

  // Re-render QR code whenever inputs change
  useEffect(() => {
    const raw = getRawPayload();
    if (!raw) return;

    // Generate SVG string for vector download
    QRCode.toString(raw, {
      type: 'svg',
      errorCorrectionLevel: errorLevel,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    }).then(svg => {
      setSvgString(svg);
    }).catch(err => console.error(err));

    // Render on HTML5 Canvas for preview & raster export
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, raw, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Overlay central logo if provided
        if (logoUrl) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = logoUrl;
          img.onload = () => {
            const logoSize = qrSize * 0.22;
            const center = (qrSize - logoSize) / 2;
            const pad = 6;

            // Background badge for logo
            ctx.save();
            ctx.fillStyle = bgColor;
            ctx.beginPath();
            ctx.roundRect(center - pad, center - pad, logoSize + pad * 2, logoSize + pad * 2, 8);
            ctx.fill();

            // Draw logo with rounded clip
            ctx.beginPath();
            ctx.roundRect(center, center, logoSize, logoSize, 6);
            ctx.clip();
            ctx.drawImage(img, center, center, logoSize, logoSize);
            ctx.restore();
          };
        }
      });
    }
  }, [
    tab, url, wifiSsid, wifiPassword, wifiEncryption,
    vcardName, vcardOrg, vcardPhone, vcardEmail, vcardUrl,
    waPhone, waMessage, cryptoType, cryptoAddress, cryptoAmount, plainText,
    fgColor, bgColor, eyeStyle, logoUrl, errorLevel, qrSize
  ]);

  const handleDownload = (format: 'png' | 'jpg' | 'svg') => {
    if (format === 'svg') {
      if (!isPro) {
        onOpenUpgrade();
        return;
      }
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = `omnitool-qr-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(dlUrl);
    } else {
      if (!canvasRef.current) return;
      const dlUrl = canvasRef.current.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.95);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = `omnitool-qr-${Date.now()}.${format}`;
      a.click();
    }

    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch {
      // safe fallback
    }

    onAddHistory({
      toolId: 'qr-url',
      toolName: 'QR Code Suite',
      summary: `Generated ${tab.toUpperCase()} QR (${format.toUpperCase()})`,
      previewData: tab === 'url' ? url : getRawPayload().slice(0, 40),
      category: 'qr',
    });
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback: copy raw text payload
      await navigator.clipboard.writeText(getRawPayload());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Type Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => setTab('url')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'url' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>Web Link (URL)</span>
        </button>

        <button
          onClick={() => setTab('wifi')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'wifi' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span>Wi-Fi Network</span>
        </button>

        <button
          onClick={() => setTab('vcard')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'vcard' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Contact className="w-3.5 h-3.5" />
          <span>vCard Contact</span>
        </button>

        <button
          onClick={() => setTab('whatsapp')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'whatsapp' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp / SMS</span>
        </button>

        <button
          onClick={() => setTab('crypto')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'crypto' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Crypto Payment</span>
        </button>

        <button
          onClick={() => setTab('text')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === 'text' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Plain Text</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Styling Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-slate-900/50 dark:bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
              1. Payload Data
            </h3>

            {/* URL TAB */}
            {tab === 'url' && (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Target Destination URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span>Static permanent QR</span>
                  <span>·</span>
                  <span>Direct redirect</span>
                  <span>·</span>
                  <span>No redirects or tracking cookies</span>
                </div>
              </div>
            )}

            {/* WIFI TAB */}
            {tab === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="e.g. Acme_Office_5G"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Network Password
                  </label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Network Key"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Security Encryption
                  </label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="WPA">WPA/WPA2/WPA3 (Recommended)</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open Network)</option>
                  </select>
                </div>
              </div>
            )}

            {/* VCARD TAB */}
            {tab === 'vcard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={vcardName}
                    onChange={(e) => setVcardName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">Company / Organization</label>
                  <input
                    type="text"
                    value={vcardOrg}
                    onChange={(e) => setVcardOrg(e.target.value)}
                    placeholder="Company or Title"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="+1 555-0192"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* WHATSAPP TAB */}
            {tab === 'whatsapp' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Phone Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    placeholder="e.g. 15551234567"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Pre-filled Inquiry Message
                  </label>
                  <textarea
                    rows={3}
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    placeholder="Type initial message..."
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* CRYPTO TAB */}
            {tab === 'crypto' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['bitcoin', 'ethereum', 'solana', 'usdt'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCryptoType(curr)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg uppercase tracking-wider transition-colors ${
                        cryptoType === curr ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Wallet Public Address
                  </label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    placeholder="0x... or bc1..."
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm font-mono text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Requested Amount (Optional)
                  </label>
                  <input
                    type="text"
                    value={cryptoAmount}
                    onChange={(e) => setCryptoAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm font-mono text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* TEXT TAB */}
            {tab === 'text' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Raw Text or Note Payload
                </label>
                <textarea
                  rows={4}
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Enter notes, identifiers, or instructions..."
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                />
              </div>
            )}
          </div>

          {/* SECTION 2: STYLING & CUSTOMIZATION */}
          <div className="p-6 bg-slate-900/50 dark:bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
              2. Visual Customization & Brand Styling
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Foreground Color */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Pattern / Foreground Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-28 px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-200"
                  />
                  <div className="flex gap-1.5">
                    {['#0f172a', '#312e81', '#065f46', '#831843'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFgColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-5 h-5 rounded-full border border-slate-600 hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Canvas / Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-28 px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-200"
                  />
                  <div className="flex gap-1.5">
                    {['#ffffff', '#f8fafc', '#f1f5f9', '#fefce8'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setBgColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-5 h-5 rounded-full border border-slate-400 hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Upload & Error Correction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Center Brand Logo
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo (PNG/SVG)</span>
                  </button>
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoUrl(null)}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Error Correction Level
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-100"
                >
                  <option value="H">High - 30% recovery (Best for logos)</option>
                  <option value="Q">Quartile - 25% recovery</option>
                  <option value="M">Medium - 15% recovery</option>
                  <option value="L">Low - 7% recovery</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Preview & Export Dock (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="p-8 bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            {/* Soft background ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

            <div className="relative p-4 bg-white rounded-2xl shadow-xl transition-transform hover:scale-[1.01]">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono tabular-nums">{qrSize}×{qrSize}px</span>
              <span>·</span>
              <span>ISO/IEC 18004</span>
              <span>·</span>
              <span>Vector-Ready</span>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex items-center justify-center gap-3 w-full">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700/80 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Matrix!' : 'Copy Matrix'}</span>
              </button>

              <button
                onClick={() => {
                  setFgColor('#0f172a');
                  setBgColor('#ffffff');
                  setLogoUrl(null);
                }}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-700/80 transition-colors"
                title="Reset to default colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Export Options Box */}
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Download Formats
              </h4>
              {!isPro && (
                <span className="text-[11px] text-amber-400 font-medium">
                  Vector SVG requires Pro
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleDownload('png')}
                className="flex flex-col items-center justify-center p-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/70 rounded-xl text-slate-200 transition-colors group"
              >
                <Download className="w-4 h-4 mb-1 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">PNG</span>
                <span className="text-[10px] text-slate-400">High-Res</span>
              </button>

              <button
                onClick={() => handleDownload('jpg')}
                className="flex flex-col items-center justify-center p-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/70 rounded-xl text-slate-200 transition-colors group"
              >
                <Download className="w-4 h-4 mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">JPG</span>
                <span className="text-[10px] text-slate-400">Standard</span>
              </button>

              <button
                onClick={() => handleDownload('svg')}
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all group relative ${
                  isPro 
                    ? 'bg-slate-800/80 hover:bg-slate-700 border-indigo-500/40 text-slate-200' 
                    : 'bg-indigo-950/20 hover:bg-indigo-900/30 border-indigo-500/30 text-indigo-300'
                }`}
              >
                {!isPro && (
                  <span className="absolute -top-2 -right-1 px-1.5 py-0.2 bg-gradient-to-r from-amber-500 to-orange-500 text-[9px] font-bold text-slate-950 rounded-full">
                    PRO
                  </span>
                )}
                <Sparkles className="w-4 h-4 mb-1 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">SVG</span>
                <span className="text-[10px] text-slate-400">Inf-Vector</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
