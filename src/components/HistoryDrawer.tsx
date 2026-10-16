import React from 'react';
import { X, Clock, Trash2, ExternalLink } from 'lucide-react';
import { ToolHistoryEntry } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ToolHistoryEntry[];
  onClearHistory: () => void;
  onSelectToolById: (toolId: string) => void;
  darkMode?: boolean;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectToolById,
  darkMode = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`relative w-full max-w-md border-l shadow-2xl z-10 flex flex-col h-full transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className={`p-5 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Recent Session History</h3>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button onClick={onClose} className={`p-1 ${darkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-800'}`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className={`h-full flex flex-col items-center justify-center text-center p-8 space-y-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Clock className="w-8 h-8 opacity-40" />
              <p className="text-xs">No recent actions logged yet.</p>
              <p className="text-[11px]">
                Generated QR codes, signed PDFs, and formatted codes will appear here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 border rounded-xl space-y-1.5 transition-colors ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.toolName}</span>
                  <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.timestamp}</span>
                </div>
                <div className="text-xs text-indigo-500 font-medium">{item.summary}</div>
                {item.previewData && (
                  <div className={`text-[11px] font-mono truncate p-1.5 rounded ${
                    darkMode ? 'bg-slate-900/60 text-slate-400' : 'bg-slate-200/60 text-slate-600'
                  }`}>
                    {item.previewData}
                  </div>
                )}
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => {
                      onSelectToolById(item.toolId);
                      onClose();
                    }}
                    className={`text-[11px] flex items-center gap-1 transition-colors ${
                      darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>Re-open tool</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={`p-4 border-t text-[11px] text-center ${
          darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          Session data stored safely in local browser memory.
        </div>
      </div>
    </div>
  );
};
