import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenArchitecture: () => void;
  onOpenUpgrade: () => void;
  darkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenArchitecture,
  onOpenUpgrade,
  darkMode = true,
}) => {
  return (
    <footer className={`border-t text-xs py-12 transition-colors ${
      darkMode ? 'border-slate-800/80 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                Ω
              </div>
              <span className={`font-bold text-sm ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>OmniTool Studio</span>
            </div>
            <p className={`text-xs max-w-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              The high-performance, privacy-first utility platform. 30+ browser-native digital tools engineered for speed, privacy, and seamless automation.
            </p>
            <div className="flex items-center gap-2 text-[11px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>100% Client-Side Memory Processing · Zero Data Retention</span>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-2">
            <div className={`font-semibold uppercase tracking-wider text-[11px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Core Suites
            </div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectCategory('qr')} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  QR Code Suite
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pdf')} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  Document & PDF
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('media')} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  Media & Speech AI
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dev')} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  Developer Tools
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('text')} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  Writing & Text
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className={`font-semibold uppercase tracking-wider text-[11px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Platform & SEO
            </div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenArchitecture} className={`hover:text-indigo-500 transition-colors flex items-center gap-1 ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  <Cpu className="w-3 h-3 text-indigo-500" />
                  <span>Next.js Architecture</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenUpgrade} className={`hover:text-indigo-500 transition-colors ${darkMode ? 'hover:text-slate-100' : 'hover:text-slate-900'}`}>
                  Pro Tier ($9.99/mo)
                </button>
              </li>
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Schema.org WebApplication</span>
              </li>
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>XML Sitemaps</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className={`font-semibold uppercase tracking-wider text-[11px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Legal & Standards
            </div>
            <ul className="space-y-1.5">
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>ISO/IEC 18004 QR Standard</span>
              </li>
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>AES-256 PDF Security</span>
              </li>
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Privacy Policy</span>
              </li>
              <li>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
          darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} OmniTool Studio Inc. All rights reserved. Built with Next.js, React, and Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span>Serverless Edge Runtime</span>
            <span>·</span>
            <span>Zero Telemetry Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
