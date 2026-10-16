import React, { useState } from 'react';
import { 
  Hash, Type, FileCode, Database, 
  Copy, Check, FileDown, RefreshCw
} from 'lucide-react';
import { ToolHistoryEntry } from '../../types';

interface TextSuiteProps {
  initialToolId?: string;
  onAddHistory: (entry: Omit<ToolHistoryEntry, 'id' | 'timestamp'>) => void;
  isPro: boolean;
  onOpenUpgrade: () => void;
}

export const TextSuite: React.FC<TextSuiteProps> = ({
  initialToolId = 'text-word-counter',
  onAddHistory,
  isPro,
  onOpenUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'counter' | 'case' | 'markdown' | 'dummy'>(
    initialToolId === 'text-case-converter' ? 'case' :
    initialToolId === 'text-markdown-html' ? 'markdown' :
    initialToolId === 'text-dummy-data' ? 'dummy' : 'counter'
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // --- 1. WORD & PROSE COUNTER STATE ---
  const [proseText, setProseText] = useState(
    "OmniTool Studio is an all-in-one web utility platform engineered for high performance and privacy. With thirty digital utilities spanning QR generation, document signing, media transcription, and developer tools, it streamlines repetitive workflows into seconds."
  );

  // Computations
  const wordCount = proseText.trim() ? proseText.trim().split(/\s+/).length : 0;
  const charCount = proseText.length;
  const charNoSpaces = proseText.replace(/\s+/g, '').length;
  const sentenceCount = proseText.split(/[.!?]+/).filter(Boolean).length || 1;
  const paragraphCount = proseText.split(/\n+/).filter(Boolean).length || 1;
  const readingTimeMin = (wordCount / 225).toFixed(1);
  const speakingTimeMin = (wordCount / 140).toFixed(1);
  // Flesch Reading Ease approximation
  const fleschScore = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (1.4))));

  // --- 2. CASE CONVERTER STATE ---
  const [caseInput, setCaseInput] = useState('user authentication microservice payload');

  const toCamelCase = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  const toPascalCase = (str: string) => str.replace(/(^\w|-\w|\s+\w)/g, (c) => c.replace(/[-\s]/g, '').toUpperCase());
  const toSnakeCase = (str: string) => str.toLowerCase().trim().replace(/[\s-]+/g, '_');
  const toKebabCase = (str: string) => str.toLowerCase().trim().replace(/[\s_]+/g, '-');
  const toConstantCase = (str: string) => str.toUpperCase().trim().replace(/[\s-]+/g, '_');
  const toTitleCase = (str: string) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const toMockCase = (str: string) => str.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join('');

  // --- 3. MARKDOWN TO HTML STATE ---
  const [markdownInput, setMarkdownInput] = useState(
    `# OmniTool Studio\n\nThis is a **live Markdown editor** compiling straight to clean HTML.\n\n### Core Highlights\n- Zero-latency client rendering\n- Programmatic SEO routes\n- Fully responsive glassmorphism UI\n\n> "Efficiency is doing better what is already being done."`
  );

  const compileMarkdownToHtml = (md: string) => {
    return md
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold my-3">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold my-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold my-2">$1</h3>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic my-3 text-slate-300">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n$/gim, '<br />');
  };

  // --- 4. DUMMY DATA STATE ---
  const [dummyMode, setDummyMode] = useState<'lorem' | 'json' | 'csv'>('json');
  const [dummyCount, setDummyCount] = useState(3);

  const getDummyOutput = () => {
    if (dummyMode === 'lorem') {
      return Array(dummyCount).fill(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ).join('\n\n');
    } else if (dummyMode === 'json') {
      const users = Array.from({ length: dummyCount }, (_, i) => ({
        id: `usr_${1000 + i}`,
        name: ['Sophia Chen', 'Liam Vance', 'Elena Rostova', 'Marcus Thorne'][i % 4],
        email: `user.${i + 1}@omnitool.io`,
        role: ['Software Engineer', 'Product Designer', 'VP Architecture', 'DevOps Lead'][i % 4],
        plan: i % 2 === 0 ? 'pro' : 'enterprise',
        createdAt: '2026-04-12T08:30:00Z'
      }));
      return JSON.stringify(users, null, 2);
    } else {
      return "id,name,email,role,plan\n" + 
        Array.from({ length: dummyCount }, (_, i) => 
          `usr_${1000 + i},Alex Mercer,alex.${i+1}@domain.com,Engineer,Pro`
        ).join('\n');
    }
  };

  return (
    <div className="space-y-8">
      {/* Sub-tool tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('counter')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'counter' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Hash className="w-3.5 h-3.5" />
          <span>Word & Readability Counter</span>
        </button>

        <button
          onClick={() => setActiveTab('case')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'case' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Smart Case Converter</span>
        </button>

        <button
          onClick={() => setActiveTab('markdown')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'markdown' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Markdown to HTML Live</span>
        </button>

        <button
          onClick={() => setActiveTab('dummy')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'dummy' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Lorem Ipsum & Synthetic Data</span>
        </button>
      </div>

      {/* --- TAB 1: WORD COUNTER & READABILITY --- */}
      {activeTab === 'counter' && (
        <div className="space-y-6">
          {/* Key Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Words</span>
              <span className="text-2xl font-bold font-mono text-sky-400 tabular-nums">{wordCount}</span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Characters</span>
              <span className="text-2xl font-bold font-mono text-sky-400 tabular-nums">{charCount}</span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">No Spaces</span>
              <span className="text-2xl font-bold font-mono text-slate-200 tabular-nums">{charNoSpaces}</span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Sentences</span>
              <span className="text-2xl font-bold font-mono text-slate-200 tabular-nums">{sentenceCount}</span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Read Time</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{readingTimeMin}m</span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Flesch Ease</span>
              <span className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">{fleschScore}/100</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Enter or Paste Article / Prose Draft</span>
              <button
                onClick={() => setProseText('')}
                className="text-rose-400 hover:underline"
              >
                Clear Text
              </button>
            </div>
            <textarea
              rows={8}
              value={proseText}
              onChange={(e) => setProseText(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 leading-relaxed focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      )}

      {/* --- TAB 2: SMART CASE CONVERTER --- */}
      {activeTab === 'case' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Original String</label>
            <input
              type="text"
              value={caseInput}
              onChange={(e) => setCaseInput(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'camelCase', val: toCamelCase(caseInput) },
              { label: 'PascalCase', val: toPascalCase(caseInput) },
              { label: 'snake_case', val: toSnakeCase(caseInput) },
              { label: 'kebab-case', val: toKebabCase(caseInput) },
              { label: 'CONSTANT_CASE', val: toConstantCase(caseInput) },
              { label: 'Title Case', val: toTitleCase(caseInput) },
              { label: 'UPPERCASE', val: caseInput.toUpperCase() },
              { label: 'lowercase', val: caseInput.toLowerCase() },
            ].map((c) => (
              <div
                key={c.label}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{c.label}</div>
                  <div className="font-mono text-xs text-slate-200 truncate max-w-[220px] sm:max-w-xs">{c.val}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(c.val, c.label)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-medium transition-colors"
                >
                  {copiedKey === c.label ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: MARKDOWN TO HTML --- */}
      {activeTab === 'markdown' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
              Synchronized Dual-Pane Markdown Compiler
            </h3>
            <button
              onClick={() => copyToClipboard(compileMarkdownToHtml(markdownInput), 'md-html')}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              {copiedKey === 'md-html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'md-html' ? 'Copied HTML!' : 'Copy Compiled HTML'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-400">Markdown Source</label>
              <textarea
                rows={12}
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-400">Rendered HTML Output</label>
              <div
                className="w-full p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 min-h-[260px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: compileMarkdownToHtml(markdownInput) }}
              />
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: LOREM IPSUM & DUMMY DATA --- */}
      {activeTab === 'dummy' && (
        <div className="max-w-2xl mx-auto p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['json', 'csv', 'lorem'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setDummyMode(fmt)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase ${
                    dummyMode === fmt ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>Count:</span>
              <input
                type="number"
                min="1"
                max="10"
                value={dummyCount}
                onChange={(e) => setDummyCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-16 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-center"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <button
                onClick={() => copyToClipboard(getDummyOutput(), 'dummy')}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1"
              >
                {copiedKey === 'dummy' ? 'Copied to Clipboard!' : 'Copy Data'}
              </button>
            </div>
            <textarea
              readOnly
              rows={10}
              value={getDummyOutput()}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};
