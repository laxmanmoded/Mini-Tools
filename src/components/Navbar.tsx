import React from 'react';
import { Search, Sparkles, Sun, Moon, History, Cpu } from 'lucide-react';
import { UserState } from '../types';

interface NavbarProps {
  user: UserState;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenUpgrade: () => void;
  onOpenHistory: () => void;
  onOpenArchitecture: () => void;
  onSelectCategory: (catId: string) => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode,
  onToggleTheme,
  onOpenSearch,
  onOpenUpgrade,
  onOpenHistory,
  onOpenArchitecture,
  onSelectCategory,
  onGoHome,
}) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
      darkMode 
        ? 'bg-slate-950/80 border-slate-800/80 text-slate-100' 
        : 'bg-white/85 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              Ω
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-bold tracking-tight whitespace-nowrap ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                OmniTool Studio
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className={`hidden md:flex items-center gap-6 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <button 
            onClick={() => onSelectCategory('all')} 
            className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
          >
            All Utilities
          </button>
          <button 
            onClick={() => onSelectCategory('qr')} 
            className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
          >
            QR Suite
          </button>
          <button 
            onClick={() => onSelectCategory('pdf')} 
            className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
          >
            PDF Studio
          </button>
          <button 
            onClick={() => onSelectCategory('media')} 
            className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
          >
            Media & AI
          </button>
          <button 
            onClick={() => onSelectCategory('dev')} 
            className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
          >
            Dev Tools
          </button>
          <button 
            onClick={onOpenArchitecture} 
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Specs</span>
          </button>
        </nav>

        {/* Zone 3: Search, Utilities & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 border rounded-xl text-xs transition-colors ${
              darkMode 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800' 
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 border-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search 30+ tools...</span>
            <kbd className={`px-1.5 py-0.5 border rounded text-[10px] font-mono ${
              darkMode ? 'bg-slate-950 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-500'
            }`}>
              ⌘K
            </kbd>
          </button>

          {/* User History Button */}
          <button
            onClick={onOpenHistory}
            className={`p-2 rounded-xl border border-transparent transition-colors ${
              darkMode 
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-800' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200'
            }`}
            title="Saved Outputs & History"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border border-transparent transition-colors ${
              darkMode 
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-800' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200'
            }`}
            title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Tier / Upgrade CTA */}
          {user.tier === 'pro' ? (
            <div className={`px-3 py-1.5 border rounded-xl flex items-center gap-1.5 text-xs font-semibold ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>PRO ACTIVE</span>
            </div>
          ) : (
            <button
              onClick={onOpenUpgrade}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-xl hover:brightness-105 transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Upgrade ($9.99)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
