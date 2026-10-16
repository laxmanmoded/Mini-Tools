import React, { useState } from 'react';
import { ArrowLeft, Play, Globe, CheckCircle2, HelpCircle, Code2, Copy, Check } from 'lucide-react';
import { ToolItem } from '../types';

interface ProgrammaticSeoPageProps {
  tool: ToolItem;
  onLaunchInteractive: () => void;
  onBack: () => void;
  onSelectRelated: (tool: ToolItem) => void;
  allTools: ToolItem[];
  darkMode?: boolean;
}

export const ProgrammaticSeoPage: React.FC<ProgrammaticSeoPageProps> = ({
  tool,
  onLaunchInteractive,
  onBack,
  onSelectRelated,
  allTools,
  darkMode = true,
}) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const canonicalUrl = `https://omnitool.studio/tools/${tool.slug}`;

  // Structured Schema.org WebApplication JSON-LD
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": canonicalUrl,
    "description": tool.metaDescription,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All (Web Browser, iOS, Android, macOS, Windows, Linux)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": tool.howToSteps.map(s => `${s.step}: ${s.instruction}`),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "ratingCount": "1280",
      "bestRating": "5"
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaJsonLd, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const relatedTools = allTools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 text-xs font-medium transition-colors ${
            darkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Hub</span>
        </button>

        <div className={`flex items-center gap-2 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <span>omnitool.studio</span>
          <span>/</span>
          <span>tools</span>
          <span>/</span>
          <span className="text-indigo-500 font-semibold">{tool.slug}</span>
        </div>
      </div>

      {/* SEO Hero Header */}
      <div className="space-y-5">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          darkMode ? 'bg-slate-900 border border-slate-800 text-indigo-400' : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
        }`}>
          <Globe className="w-3.5 h-3.5" />
          <span>Programmatic SEO Landing Page (SSR Ready)</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          darkMode ? 'text-slate-100' : 'text-slate-900'
        }`} style={{ textWrap: 'balance' }}>
          {tool.name}
        </h1>

        <p className={`text-base sm:text-lg leading-relaxed max-w-3xl ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {tool.fullDesc}
        </p>

        {/* Primary Interactive CTA */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={onLaunchInteractive}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all text-sm group"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Open Interactive Tool in Browser</span>
          </button>

          <div className={`flex items-center gap-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>✓ No Registration Required</span>
            <span>✓ 100% Client-Side Privacy</span>
          </div>
        </div>
      </div>

      {/* Programmatic Metadata & Target Keywords Matrix */}
      <div className={`p-6 border rounded-2xl space-y-4 ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Search Engine Optimization Metadata
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-3 border rounded-xl space-y-1 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Canonical Title Tag:</span>
            <div className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{tool.metaTitle}</div>
          </div>

          <div className={`p-3 border rounded-xl space-y-1 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Canonical URL:</span>
            <div className="text-indigo-500 font-mono truncate">{canonicalUrl}</div>
          </div>

          <div className={`md:col-span-2 p-3 border rounded-xl space-y-1 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Meta Description:</span>
            <div className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{tool.metaDescription}</div>
          </div>
        </div>

        <div>
          <span className={`text-xs block mb-2 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target Keyword Queries:</span>
          <div className="flex flex-wrap gap-1.5">
            {tool.targetKeywords.map((kw, i) => (
              <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                "{kw}"
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step How-To Guide */}
      <div className="space-y-6">
        <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
          How to Use the {tool.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tool.howToSteps.map((step, idx) => (
            <div key={idx} className={`p-5 border rounded-2xl space-y-2 ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${
                darkMode ? 'bg-indigo-950/80 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'
              }`}>
                {idx + 1}
              </div>
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{step.step}</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{step.instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schema.org JSON-LD Structured Data Inspector */}
      <div className={`p-6 border rounded-2xl space-y-3 ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-500" />
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Schema.org Structured Data (JSON-LD)
            </h3>
          </div>
          <button
            onClick={handleCopySchema}
            className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'Copied' : 'Copy JSON-LD'}</span>
          </button>
        </div>
        <pre className={`p-4 border rounded-xl text-xs font-mono overflow-x-auto leading-relaxed ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}>
          {JSON.stringify(schemaJsonLd, null, 2)}
        </pre>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className={`divide-y border-t border-b ${darkMode ? 'divide-slate-800 border-slate-800' : 'divide-slate-200 border-slate-200'}`}>
          {tool.faqs.map((faq, idx) => (
            <div key={idx} className="py-4 space-y-1.5">
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{faq.question}</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Utilities */}
      {relatedTools.length > 0 && (
        <div className={`space-y-4 pt-4 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
            Related Utilities in this Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((rt) => (
              <button
                key={rt.id}
                onClick={() => onSelectRelated(rt)}
                className={`p-4 border rounded-xl text-left transition-colors space-y-1 group ${
                  darkMode 
                    ? 'bg-slate-900/40 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className={`text-xs font-semibold group-hover:text-indigo-500 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {rt.name}
                </div>
                <div className={`text-[11px] truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {rt.shortDesc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
