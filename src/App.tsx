import React, { useState, useEffect } from 'react';
import { 
  QrCode, Wifi, Contact, MessageSquare, Coins, FileText,
  PenTool, Images, Stamp, Layers, Scissors, Lock,
  Mic, Volume2, Sparkles, Maximize, RefreshCw, Film,
  Link, Code2, Key, Binary, Palette,
  Hash, Type, FileCode, Database,
  ArrowRight, Globe, CheckCircle2, ChevronRight, Share2,
  SlidersHorizontal, Sparkle
} from 'lucide-react';
import { ToolItem, UserState, ToolHistoryEntry } from './types';
import { TOOLS_REGISTRY, CATEGORY_INFO } from './data/toolsRegistry';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CommandPalette } from './components/CommandPalette';
import { ProgrammaticSeoPage } from './components/ProgrammaticSeoPage';
import { ProUpgradeModal } from './components/ProUpgradeModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Footer } from './components/Footer';

// Suite Components
import { QrCodeSuite } from './components/tools/QrCodeSuite';
import { PdfSuite } from './components/tools/PdfSuite';
import { MediaSuite } from './components/tools/MediaSuite';
import { DevSuite } from './components/tools/DevSuite';
import { TextSuite } from './components/tools/TextSuite';

import { ToolFeedback } from './components/ToolFeedback';

// Dynamic Icon Resolver
const getToolIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'QrCode': return <QrCode className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Contact': return <Contact className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'PenTool': return <PenTool className={className} />;
    case 'Images': return <Images className={className} />;
    case 'Stamp': return <Stamp className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Scissors': return <Scissors className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Mic': return <Mic className={className} />;
    case 'Volume2': return <Volume2 className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Maximize': return <Maximize className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Film': return <Film className={className} />;
    case 'Link': return <Link className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Key': return <Key className={className} />;
    case 'Binary': return <Binary className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Hash': return <Hash className={className} />;
    case 'Type': return <Type className={className} />;
    case 'FileCode': return <FileCode className={className} />;
    case 'Database': return <Database className={className} />;
    default: return <Sparkle className={className} />;
  }
};

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'hub' | 'tool' | 'seo'>('hub');
  const [activeTool, setActiveTool] = useState<ToolItem>(TOOLS_REGISTRY[0]); // default to Link to QR Code
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // User & Theme state
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<UserState>({
    tier: 'free',
    name: 'Developer Guest',
    email: 'guest@omnitool.io',
    dailyUsageCount: 4,
    maxFreeDailyLimit: 25,
    isAuthenticated: false,
  });

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [history, setHistory] = useState<ToolHistoryEntry[]>([
    {
      id: 'init-1',
      toolId: 'qr-url',
      toolName: 'Link to QR Code Generator',
      timestamp: 'Today, 10:24 AM',
      summary: 'Generated High-Res QR for https://omnitool.studio',
      previewData: 'https://omnitool.studio',
      category: 'qr',
    },
    {
      id: 'init-2',
      toolId: 'pdf-sign',
      toolName: 'Digital PDF Signer',
      timestamp: 'Today, 09:15 AM',
      summary: 'Signed Mutual_NDA_2026.pdf with touch signature',
      category: 'pdf',
    }
  ]);

  // Global keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddHistory = (entry: Omit<ToolHistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: ToolHistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: 'Just now',
    };
    setHistory((prev) => [newEntry, ...prev]);
    setUser((prev) => ({ ...prev, dailyUsageCount: prev.dailyUsageCount + 1 }));
  };

  const handleUpgradeSuccess = () => {
    setUser((prev) => ({
      ...prev,
      tier: 'pro',
      maxFreeDailyLimit: 999999,
    }));
  };

  const handleSelectTool = (tool: ToolItem) => {
    setActiveTool(tool);
    setCurrentView('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToolForSeo = (tool: ToolItem) => {
    setActiveTool(tool);
    setCurrentView('seo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToolById = (toolId: string) => {
    const found = TOOLS_REGISTRY.find((t) => t.id === toolId);
    if (found) {
      handleSelectTool(found);
    }
  };

  // Filter tools for the Hub Grid
  const filteredTools = TOOLS_REGISTRY.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      categorySearchQuery.trim() === '' ||
      tool.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      tool.targetKeywords.some((k) => k.toLowerCase().includes(categorySearchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      {/* Top Bar Contract (3 Zones) */}
      <Navbar
        user={user}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenArchitecture={() => setIsArchOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setCurrentView('hub');
        }}
        onGoHome={() => setCurrentView('hub')}
      />

      <main className="min-h-[calc(100vh-16rem)]">
        {/* --- VIEW 1: HUB / EXPLORER --- */}
        {currentView === 'hub' && (
          <div>
            <Hero
              allTools={TOOLS_REGISTRY}
              darkMode={darkMode}
              onSearchSelect={(tool) => handleSelectTool(tool)}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              onExploreCategory={(cat) => {
                setSelectedCategory(cat);
                const el = document.getElementById('arsenal');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Tool Arsenal Section */}
            <section id="arsenal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              {/* Category Filter Tabs & Filter Search */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className={`flex flex-wrap items-center gap-1.5 p-1 border rounded-xl ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Utilities (30+)
                  </button>
                  {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        selectedCategory === key 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {info.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    placeholder="Filter current view..."
                    className={`px-3.5 py-1.5 border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-colors ${
                      darkMode 
                        ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
                    }`}
                  />
                  <span className={`text-xs font-mono tabular-nums whitespace-nowrap ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {filteredTools.length} tools
                  </span>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`group relative p-6 border rounded-2xl transition-all duration-200 flex flex-col justify-between ${
                      darkMode 
                        ? 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5' 
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:scale-105 ${
                          darkMode 
                            ? 'bg-slate-800 text-indigo-400 border-slate-700/80 group-hover:border-indigo-500/50' 
                            : 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:border-indigo-300'
                        }`}>
                          {getToolIcon(tool.icon)}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {tool.isPopular && (
                            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              Popular
                            </span>
                          )}
                          {tool.isPro && (
                            <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              Pro
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-bold transition-colors ${
                          darkMode ? 'text-slate-100 group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                        }`}>
                          {tool.name}
                        </h3>
                        <p className={`text-xs mt-1.5 leading-relaxed ${
                          darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {tool.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className={`pt-5 mt-4 border-t flex items-center justify-between ${
                      darkMode ? 'border-slate-800/60' : 'border-slate-100'
                    }`}>
                      <button
                        onClick={() => handleSelectToolForSeo(tool)}
                        className={`text-[11px] flex items-center gap-1 transition-colors ${
                          darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="View Programmatic SEO Landing Page"
                      >
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>SEO Page</span>
                      </button>

                      <button
                        onClick={() => handleSelectTool(tool)}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-500 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Launch Tool</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --- VIEW 2: INTERACTIVE TOOL WORKSPACE --- */}
        {currentView === 'tool' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Contextual Breadcrumb & Quick Actions Header */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <button
                  onClick={() => setCurrentView('hub')}
                  className={`transition-colors ${darkMode ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}
                >
                  Utilities Hub
                </button>
                <ChevronRight className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                <button
                  onClick={() => {
                    setSelectedCategory(activeTool.category);
                    setCurrentView('hub');
                  }}
                  className={`capitalize transition-colors ${darkMode ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}
                >
                  {CATEGORY_INFO[activeTool.category]?.name || activeTool.category}
                </button>
                <ChevronRight className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                <span className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{activeTool.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('seo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-medium transition-colors ${
                    darkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span>View SEO Metadata</span>
                </button>

                <button
                  onClick={() => setIsUpgradeOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-500 dark:text-amber-300 rounded-xl text-xs font-semibold hover:brightness-110"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{user.tier === 'pro' ? 'Pro Member' : 'Get Pro ($9.99)'}</span>
                </button>
              </div>
            </div>

            {/* Tool Execution Container */}
            <div className={`p-6 sm:p-8 border rounded-3xl transition-colors ${
              darkMode ? 'bg-slate-900/40 border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              {activeTool.category === 'qr' && (
                <QrCodeSuite
                  onAddHistory={handleAddHistory}
                  isPro={user.tier === 'pro'}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}

              {activeTool.category === 'pdf' && (
                <PdfSuite
                  initialToolId={activeTool.id}
                  onAddHistory={handleAddHistory}
                  isPro={user.tier === 'pro'}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}

              {activeTool.category === 'media' && (
                <MediaSuite
                  initialToolId={activeTool.id}
                  onAddHistory={handleAddHistory}
                  isPro={user.tier === 'pro'}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}

              {activeTool.category === 'dev' && (
                <DevSuite
                  initialToolId={activeTool.id}
                  onAddHistory={handleAddHistory}
                  isPro={user.tier === 'pro'}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}

              {activeTool.category === 'text' && (
                <TextSuite
                  initialToolId={activeTool.id}
                  onAddHistory={handleAddHistory}
                  isPro={user.tier === 'pro'}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}

              {/* Star-Rating and Feedback Component (Persisted in Local State) */}
              <ToolFeedback
                toolId={activeTool.id}
                toolName={activeTool.name}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* --- VIEW 3: PROGRAMMATIC SEO LANDING PAGE --- */}
        {currentView === 'seo' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProgrammaticSeoPage
              tool={activeTool}
              darkMode={darkMode}
              onLaunchInteractive={() => setCurrentView('tool')}
              onBack={() => setCurrentView('hub')}
              onSelectRelated={(related) => {
                setActiveTool(related);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              allTools={TOOLS_REGISTRY}
            />
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS_REGISTRY}
        darkMode={darkMode}
        onSelectTool={(tool) => handleSelectTool(tool)}
      />

      <ProUpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
        isPro={user.tier === 'pro'}
        darkMode={darkMode}
      />

      <ArchitectureModal
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
        darkMode={darkMode}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        darkMode={darkMode}
        onClearHistory={() => setHistory([])}
        onSelectToolById={handleSelectToolById}
      />

      {/* Clean Footer */}
      <Footer
        darkMode={darkMode}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setCurrentView('hub');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchitecture={() => setIsArchOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
      />
    </div>
  );
}

