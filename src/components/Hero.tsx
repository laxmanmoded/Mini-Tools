import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Zap, Sparkles, Command } from 'lucide-react';
import { ToolItem } from '../types';

interface HeroProps {
  onSearchSelect: (tool: ToolItem) => void;
  allTools: ToolItem[];
  onOpenUpgrade: () => void;
  onExploreCategory: (category: string) => void;
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSelect,
  allTools,
  onOpenUpgrade,
  onExploreCategory,
  darkMode = true,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filtered = query.trim()
    ? allTools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
          t.targetKeywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <section className={`relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b transition-colors ${
      darkMode ? 'border-slate-800/80' : 'border-slate-200'
    }`}>
      {/* Background Soft Ambient Light Gradients */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[120px] pointer-events-none ${
        darkMode 
          ? 'bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/10' 
          : 'bg-gradient-to-tr from-indigo-300/30 via-purple-200/25 to-pink-200/20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Subtle Lead-in Kicker */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            darkMode 
              ? 'bg-slate-900/90 border border-slate-800 text-slate-300' 
              : 'bg-white/90 border border-slate-200 text-slate-700 shadow-xs'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium">The Swiss Army Knife of Daily Digital Tools</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">30+ Utilities</span>
          </div>

          {/* Display Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            darkMode ? 'text-slate-100' : 'text-slate-900'
          }`} style={{ textWrap: 'balance' }}>
            Every digital utility you need.
            <span className={`block mt-1 bg-clip-text text-transparent ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300' 
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
            }`}>
              Zero bloat. Instant execution.
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`} style={{ textWrap: 'balance' }}>
            Generate vector QR codes, sign PDFs, transcribe audio, format code, and process images directly in your browser. Encrypted, offline-capable, and private.
          </p>

          {/* Live Search Interactive Box */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className={`relative flex items-center border rounded-2xl shadow-xl transition-all ${
              darkMode 
                ? isFocused ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20' : 'bg-slate-900/90 border-slate-700/80'
                : isFocused ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20' : 'bg-white border-slate-300 shadow-sm'
            }`}>
              <Search className={`w-5 h-5 ml-4 shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search tools: QR code, PDF signer, Whisper, Base64..."
                className={`w-full px-3 py-3.5 bg-transparent text-sm placeholder-slate-400 focus:outline-none ${
                  darkMode ? 'text-slate-100 placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                }`}
              />
              <div className="hidden sm:flex items-center gap-1 mr-3 shrink-0">
                <kbd className={`px-2 py-0.5 border rounded-md text-[11px] font-mono ${
                  darkMode ? 'bg-slate-950 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-500'
                }`}>
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Live Autocomplete Dropdown */}
            {query.trim() && filtered.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-2 border rounded-2xl shadow-2xl overflow-hidden z-30 divide-y text-left ${
                darkMode ? 'bg-slate-900 border-slate-700 divide-slate-800' : 'bg-white border-slate-200 divide-slate-100 shadow-lg'
              }`}>
                {filtered.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSearchSelect(tool);
                      setQuery('');
                    }}
                    className={`w-full p-3.5 transition-colors flex items-center justify-between group ${
                      darkMode ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-semibold ${
                        darkMode ? 'text-slate-100 group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                      }`}>
                        {tool.name}
                      </div>
                      <div className={`text-[11px] truncate max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {tool.shortDesc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Category Jump Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'qr', label: 'QR Generator' },
              { id: 'pdf', label: 'PDF Sign & Merge' },
              { id: 'media', label: 'Audio & Image AI' },
              { id: 'dev', label: 'Dev Formatters' },
              { id: 'text', label: 'Word Counter' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onExploreCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs transition-colors ${
                  darkMode 
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white' 
                    : 'bg-white hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quantitative Proof Strip (Adjacency & Precision) */}
          <div className={`pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-center ${
            darkMode ? 'border-slate-800/60' : 'border-slate-200'
          }`}>
            <div>
              <div className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>30+</div>
              <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Engineered Utilities</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-500 tabular-nums">100%</div>
              <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Client-Side Privacy</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-indigo-500 tabular-nums">&lt;15ms</div>
              <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Execution Latency</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-purple-500 tabular-nums">4.9/5</div>
              <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Developer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
