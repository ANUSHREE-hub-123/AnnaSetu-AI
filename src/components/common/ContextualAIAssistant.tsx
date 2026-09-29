import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  X,
  Flame,
  Clock,
  HeartHandshake,
  ShoppingCart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContextualAIAssistant: React.FC = () => {
  const {
    journeyStage,
    acceptAndSchedulePickup,
    setActiveTab,
    procurementItems,
    generatePurchaseOrder
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});
  const [actionToast, setActionToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };

  const handleApplyRiceReduction = () => {
    setAppliedActions(prev => ({ ...prev, riceReduction: true }));
    triggerToast('✓ AnnaSetu AI: Applied 7% reduction to rice prep volume. Avoids ~6 kg daily scrap.');
  };

  const handleScheduleNgo = () => {
    acceptAndSchedulePickup('Hope Foundation & Shelter Home');
    setAppliedActions(prev => ({ ...prev, ngoScheduled: true }));
    triggerToast('✓ AnnaSetu AI: Scheduled Electric Van pickup with Hope Foundation (ETA 18 min).');
  };

  const handleProcureDal = () => {
    generatePurchaseOrder();
    setActiveTab('procurement');
    setAppliedActions(prev => ({ ...prev, dalProcured: true }));
    triggerToast('✓ AnnaSetu AI: Purchase Order generated for 8 kg Toor Dal shortage.');
  };

  return (
    <>
      {/* Floating Action Button (Bottom Right) */}
      <aside aria-label="AnnaSetu AI Assistant" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {actionToast && (
          <div className="mb-2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionToast}</span>
          </div>
        )}

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black rounded-2xl shadow-xl transition-all hover:scale-105 group border border-emerald-400/30"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4 text-emerald-200 fill-current" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            </div>
            <span>AnnaSetu AI Assistant</span>
            <span className="bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
              4 Contextual Insights
            </span>
          </button>
        ) : (
          <div className="w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden flex flex-col animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-tight">AnnaSetu AI Assistant</h4>
                  <p className="text-[10px] text-emerald-200">Autonomous Operational Observer</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-emerald-200 hover:text-white rounded-lg"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommendation Cards Body */}
            <div className="p-3.5 space-y-3 max-h-[26rem] overflow-y-auto text-xs bg-slate-50">
              {/* Insight 1: Rice Waste Hotspot */}
              <div className="p-3 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold text-[11px]">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Waste Hotspot Detected</span>
                </div>
                <p className="text-slate-800 font-semibold leading-snug">
                  “I detected a 14% increase in rice waste this week.”
                </p>
                <p className="text-[11px] text-slate-500">
                  Likely pattern: Wednesday dinner has lower consumption.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('waste');
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900"
                  >
                    Review Data
                  </button>
                  <button
                    onClick={handleApplyRiceReduction}
                    disabled={appliedActions.riceReduction}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all ${
                      appliedActions.riceReduction
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                    }`}
                  >
                    {appliedActions.riceReduction ? '✓ Applied (-7%)' : 'Apply (-7%)'}
                  </button>
                </div>
              </div>

              {/* Insight 2: Urgent Surplus */}
              <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Urgent Surplus Window</span>
                </div>
                <p className="text-slate-800 font-semibold leading-snug">
                  “27 meals are at risk of becoming waste.”
                </p>
                <p className="text-[11px] text-slate-500">
                  41 minutes remaining in hot-holding before thermal threshold expires.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('surplus');
                      setIsOpen(false);
                    }}
                    className="px-3 py-1 text-[11px] font-black bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs"
                  >
                    Redistribute Surplus
                  </button>
                </div>
              </div>

              {/* Insight 3: NGO Match */}
              <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Optimal Match Computed</span>
                </div>
                <p className="text-slate-800 font-semibold leading-snug">
                  “I found a 96% matching NGO 2.4 km away.”
                </p>
                <p className="text-[11px] text-slate-500">
                  Hope Foundation • Electric cargo van ready • 18 min arrival.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('redistribute');
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={handleScheduleNgo}
                    disabled={appliedActions.ngoScheduled}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all ${
                      appliedActions.ngoScheduled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                    }`}
                  >
                    {appliedActions.ngoScheduled ? '✓ Scheduled' : 'Schedule Pickup'}
                  </button>
                </div>
              </div>

              {/* Insight 4: Procurement Deficit */}
              <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px]">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Dry Store Deficit</span>
                </div>
                <p className="text-slate-800 font-semibold leading-snug">
                  “Dal inventory is 8 kg below the required quantity.”
                </p>
                <p className="text-[11px] text-slate-500">
                  36 kg needed for 1,188 meals vs 28 kg in stock.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={handleProcureDal}
                    className="px-3 py-1 text-[11px] font-black bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs"
                  >
                    Generate PO
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-[10px] text-slate-500 font-medium">
              AnnaSetu Heuristic Engine • Context-Aware Action Trigger
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
