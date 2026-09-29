import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface AIInsightCardProps {
  title?: string;
  insight: string;
  recommendation?: string;
  onApply?: () => void;
  appliedLabel?: string;
  badge?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title = 'AI Optimization Insight',
  insight,
  recommendation,
  onApply,
  badge = 'Active Prediction Engine'
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-white p-4 shadow-sm">
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />
      <div className="flex items-start gap-3.5">
        <div className="rounded-lg bg-emerald-600 p-2 text-white shadow-sm flex-shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
              <span>{title}</span>
            </h4>
            <span className="text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
          {recommendation && (
            <div className="mt-2 flex items-start gap-2 rounded-lg bg-white/80 border border-emerald-100 p-2.5 text-xs text-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-900">Recommended Action: </span>
                {recommendation}
              </div>
            </div>
          )}
          {onApply && (
            <button
              onClick={onApply}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>Apply Recommendation to Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
