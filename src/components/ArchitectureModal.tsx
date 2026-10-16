import React, { useState } from 'react';
import { X, FolderTree, Cpu, Database, Shield, Zap, Copy, Check, Server } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose, darkMode = true }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'stack' | 'seo' | 'database'>('tree');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const directoryTree = `omnitool-platform/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx   # Clerk / NextAuth passwordless flow
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (marketing)/
│   │   ├── page.tsx                          # High-converting Hero & Tools directory
│   │   ├── pricing/page.tsx                  # Freemium vs Pro tier comparison
│   │   └── sitemap.xml/route.ts              # Dynamic programmatic XML sitemap
│   ├── (dashboard)/
│   │   ├── history/page.tsx                  # User execution logs & saved assets
│   │   ├── settings/page.tsx                 # Account, API keys & billing portal
│   │   └── api-keys/page.tsx                 # Pro developer token manager
│   ├── tools/
│   │   ├── [slug]/                           # Programmatic SEO & interactive tool
│   │   │   ├── page.tsx                      # Server-rendered SEO landing + Schema.org
│   │   │   ├── opengraph-image.tsx           # Dynamic OG image generator
│   │   │   └── twitter-image.tsx             # Social share card
│   │   ├── category/
│   │   │   └── [category]/page.tsx           # Category hub (QR, PDF, Media, Dev, Text)
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts               # Stripe subscription lifecycle (checkout, invoice)
│   │   │   └── clerk/route.ts                # User sync webhook
│   │   ├── v1/
│   │   │   ├── qr/generate/route.ts          # Server-side SVG vector generation
│   │   │   ├── transcribe/route.ts           # Whisper speech-to-text proxy
│   │   │   ├── pdf/merge/route.ts            # High-throughput PDF assembler
│   │   │   └── shorten/route.ts              # URL shortener & analytics redirect
│   ├── layout.tsx                            # Root layout with Schema.org & fonts
│   ├── globals.css                           # Tailwind CSS v4 setup & glassmorphism
│   └── robots.ts                             # Search crawler routing & directives
├── components/
│   ├── ui/                                   # Shadcn UI primitives (button, dialog, slider)
│   ├── tools/
│   │   ├── qr/QrCodeGenerator.tsx            # Full-featured QR generator with logo & eyes
│   │   ├── pdf/PdfSigner.tsx                 # Canvas signature pad & document stamper
│   │   ├── media/WhisperTranscribe.tsx       # Audio speech-to-text with mic recorder
│   │   ├── dev/UrlShortener.tsx              # Analytics dashboard & click counters
│   │   └── text/WordCounter.tsx              # Live readability & syllable metrics
│   ├── seo/
│   │   ├── JsonLdSchema.tsx                  # WebApplication Schema.org generator
│   │   └── Breadcrumbs.tsx                   # Crawlable breadcrumb structured markup
│   └── layout/
│       ├── TopNav.tsx                        # 3-zone standard top bar
│       ├── CommandPalette.tsx                # Cmd+K global search modal
│       └── ProModal.tsx                      # Stripe checkout modal
├── lib/
│   ├── db/
│   │   ├── schema.ts                         # PostgreSQL schema (Drizzle ORM)
│   │   └── index.ts                          # Supabase / Postgres connection pool
│   ├── stripe/
│   │   └── client.ts                         # Stripe SDK & customer portal helpers
│   ├── seo/
│   │   └── registry.ts                       # 30+ tools metadata & keywords catalog
│   └── utils.ts
├── drizzle.config.ts                         # Drizzle migration config
├── next.config.mjs                           # Next.js optimization & security headers
└── package.json                              # Modern dependency manifest`;

  const techStackManifest = {
    framework: "Next.js 15 (App Router, Server Components & Streaming SSR)",
    styling: "Tailwind CSS v4 with glassmorphism & soft diffused light gradients",
    icons: "Lucide React (v0.546)",
    motion: "Motion (v12) for 60fps micro-interactions",
    qrSuite: "qrcode + svg-path-parser for infinite vector SVG rendering",
    pdfEngine: "pdf-lib (browser client manipulation) + pdfjs-dist",
    audioSpeech: "Web Speech API (client TTS) + Whisper OpenAI API proxy",
    fileProcessing: "react-dropzone + canvas alpha extraction for AI background eraser",
    auth: "Clerk / NextAuth (Passwordless Magic Links + Google/GitHub OAuth)",
    database: "PostgreSQL with Drizzle ORM / Supabase Database",
    payments: "Stripe Subscriptions ($9.99/mo Pro Tier with Webhook Sync)",
    analytics: "Custom Clickstream Telemetry + OpenGraph dynamic edge generation"
  };

  const copyTree = () => {
    navigator.clipboard.writeText(directoryTree);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
              darkMode ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}>
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                System Architecture & Next.js Specification
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Lead Full-Stack Architectural Blueprint · Programmatic SEO & Freemium Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              darkMode ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className={`flex items-center gap-2 p-1 border rounded-xl text-xs font-medium ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'tree' ? 'bg-indigo-600 text-white font-semibold' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Project Directory Tree</span>
          </button>

          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'stack' ? 'bg-indigo-600 text-white font-semibold' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Tech Stack & Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'seo' ? 'bg-indigo-600 text-white font-semibold' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Programmatic SEO Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'database' ? 'bg-indigo-600 text-white font-semibold' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database & Stripe Schema</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {activeTab === 'tree' && (
            <div className="space-y-3">
              <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Complete Production Directory Tree (Next.js App Router)</span>
                <button
                  onClick={copyTree}
                  className="flex items-center gap-1 text-indigo-500 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Tree'}</span>
                </button>
              </div>
              <pre className={`p-4 border rounded-xl font-mono text-xs leading-relaxed overflow-x-auto ${
                darkMode ? 'bg-slate-950 border-slate-800 text-indigo-300' : 'bg-slate-900 border-slate-800 text-indigo-200'
              }`}>
                {directoryTree}
              </pre>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(techStackManifest).map(([key, val]) => (
                <div key={key} className={`p-3.5 border rounded-xl space-y-1 ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`font-semibold uppercase text-[10px] tracking-wider block ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className={`p-5 border rounded-xl space-y-4 text-xs ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className={`font-semibold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                Programmatic SEO Pipeline & Google Ranking Strategy
              </h4>
              <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                To dominate high-intent search terms like "link to qr code", "free vector qr code generator", or "sign pdf online free", the system employs dynamic App Router static generation:
              </p>
              <ul className={`space-y-2 list-disc list-inside ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <li><strong className="text-indigo-500">generateStaticParams():</strong> Pre-renders static HTML for all 30+ tools at build time for instant TTFB.</li>
                <li><strong className="text-indigo-500">Schema.org WebApplication:</strong> Each page injects structured JSON-LD defining software category, operating system, free pricing offer, and aggregate ratings.</li>
                <li><strong className="text-indigo-500">Dynamic Edge OG Images:</strong> Utilizes `@vercel/og` to generate social preview cards with the specific tool name and live icon.</li>
                <li><strong className="text-indigo-500">Sitemap XML:</strong> Programmatic `sitemap.xml` automatically synchronizes newly deployed utility tools with Google Search Console.</li>
              </ul>
            </div>
          )}

          {activeTab === 'database' && (
            <div className={`p-5 border rounded-xl space-y-4 text-xs font-mono ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`font-sans text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                PostgreSQL Schema Definition with Drizzle ORM (User Quotas, Subscriptions & Saved History)
              </div>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto p-3 bg-slate-900 rounded-lg">
{`// schema.ts
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  tier: varchar('tier', { length: 50 }).default('free').notNull(),
  dailyUsageCount: integer('daily_usage_count').default(0).notNull(),
  lastResetAt: timestamp('last_reset_at').defaultNow().notNull(),
});

export const shortLinks = pgTable('short_links', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id),
  slug: varchar('slug', { length: 64 }).notNull().unique(),
  destinationUrl: text('destination_url').notNull(),
  clicks: integer('clicks').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
