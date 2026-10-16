import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Zap, CreditCard, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  isPro: boolean;
  darkMode?: boolean;
}

export const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
  isPro,
  darkMode = true,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {
        // safe
      }
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-xl border rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-1.5 rounded-lg transition-colors ${
            darkMode ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-500 dark:text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OmniTool Pro Membership</span>
          </div>

          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Supercharge your workflow.
          </h3>
          <p className={`text-xs sm:text-sm max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Unlock unlimited AI processing, vector SVG downloads, bulk operations, and ad-free priority execution.
          </p>
        </div>

        {/* Billing Cadence Toggle */}
        <div className="flex items-center justify-center">
          <div className={`flex items-center p-1 border rounded-xl text-xs font-medium ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-lg transition-colors ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className={`p-6 border rounded-2xl relative overflow-hidden ${
          darkMode ? 'bg-slate-950/80 border-indigo-500/30' : 'bg-slate-50 border-indigo-200 shadow-sm'
        }`}>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {billingCycle === 'monthly' ? '$9.99' : '$7.99'}
              </span>
              <span className={`text-xs ml-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ month</span>
            </div>
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {billingCycle === 'annual' ? 'Billed $95.88 annually' : 'Billed monthly · Cancel anytime'}
            </span>
          </div>

          {/* Feature List */}
          <div className={`space-y-2.5 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {[
              'Unlimited vector SVG & high-res QR code exports',
              'Full Whisper speech transcription & SRT subtitle exports',
              'AI background removal on unlimited photo batches',
              'Bulk PDF operations, digital signing & watermark stamps',
              'URL Shortener vanity domains & custom slugs',
              'Zero advertisements & dedicated low-latency bandwidth',
              'Developer API key with 10,000 monthly server-side requests'
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Simulation Action */}
        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 text-slate-950 font-bold rounded-2xl shadow-xl shadow-amber-500/20 transition-all text-sm"
          >
            {isProcessing ? (
              <span>Connecting to Stripe Secure Gateway...</span>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>{isPro ? 'Pro Already Active (Renew)' : 'Instant Upgrade with Stripe ($9.99)'}</span>
              </>
            )}
          </button>

          <div className={`flex items-center justify-center gap-2 text-[11px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Lock className="w-3 h-3 text-slate-400" />
            <span>256-bit encrypted checkout · 14-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
