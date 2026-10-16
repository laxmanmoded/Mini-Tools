import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ToolItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
  darkMode?: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tools,
  onSelectTool,
  darkMode = true,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      t.targetKeywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden z-10 space-y-0 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className={`flex items-center px-4 py-3.5 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <Search className={`w-5 h-5 mr-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a tool name or action (e.g. 'qr', 'pdf', 'speech', 'hash')..."
            className={`w-full bg-transparent text-sm placeholder-slate-400 focus:outline-none ${
              darkMode ? 'text-slate-100 placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
            }`}
          />
          <button onClick={onClose} className={`p-1 ${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`max-h-96 overflow-y-auto divide-y p-2 ${darkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
          {filtered.length === 0 ? (
            <div className={`p-8 text-center text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              No utilities matching "{search}"
            </div>
          ) : (
            filtered.map((tool, index) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                  selectedIndex === index 
                    ? darkMode ? 'bg-indigo-600/20 text-white' : 'bg-indigo-50 text-indigo-950'
                    : darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className={`text-xs font-semibold flex items-center gap-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    <span>{tool.name}</span>
                    <span className="text-[10px] text-indigo-500 uppercase tracking-wider font-mono">
                      {tool.category}
                    </span>
                  </div>
                  <div className={`text-[11px] truncate max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tool.shortDesc}
                  </div>
                </div>
                <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            ))
          )}
        </div>

        <div className={`px-4 py-2 border-t flex items-center justify-between text-[11px] ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className={`px-1 py-0.5 border rounded text-[9px] ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}>↑</kbd> <kbd className={`px-1 py-0.5 border rounded text-[9px] ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}>↓</kbd></span>
            <span>Select: <kbd className={`px-1 py-0.5 border rounded text-[9px] ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}>↵</kbd></span>
          </div>
          <span>30 Utilities Available</span>
        </div>
      </div>
    </div>
  );
};
