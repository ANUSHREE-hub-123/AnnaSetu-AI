import React, { useState } from 'react';
import {
  Trash2,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  BarChart3,
  Flame,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { WasteHotspot } from '../../types';

export const WasteAnalytics: React.FC = () => {
  const { wasteHotspots, selectedHotspot, setSelectedHotspot, prediction, updatePrediction } = useApp();

  const [appliedHotspotRec, setAppliedHotspotRec] = useState(false);
  const [showDataReview, setShowDataReview] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const weeklyTrendData = [
    { day: 'Thu', wasteKg: 21.4, normalLimit: 18 },
    { day: 'Fri', wasteKg: 19.2, normalLimit: 18 },
    { day: 'Sat', wasteKg: 16.5, normalLimit: 18 },
    { day: 'Sun', wasteKg: 12.0, normalLimit: 18 },
    { day: 'Mon', wasteKg: 18.1, normalLimit: 18 },
    { day: 'Tue', wasteKg: 16.4, normalLimit: 18 },
    { day: 'Today (Wed)', wasteKg: 14.0, normalLimit: 18 }
  ];

  const handleApplyHotspot = () => {
    setAppliedHotspotRec(true);
    setToastMessage('✓ Applied: Rice preparation factor reduced by 7% for Wednesday dinner service (saves ~6 kg daily / ₹920/week).');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Waste Intelligence & Hotspot Detection</h1>
            <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-300">
              Audit Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Identifies dining hall prep stations and food categories with disproportionate plate waste patterns for targeted portion calibration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Waste Today: <strong className="text-slate-900">14 kg</strong> (Down 18%)
          </span>
        </div>
      </div>

      {toastMessage && (
        <div className="rounded-xl bg-emerald-700 text-white p-4 shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase block">Daily Food Waste Recorded</span>
          <div className="mt-1 text-3xl font-black text-rose-700">14 kg</div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">1.1% of prepared food (Industry benchmark: 3.5%)</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase block">Highest Waste Category</span>
          <div className="mt-1 text-3xl font-black text-slate-900">Cooked Rice (41.8%)</div>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">Plate return residue on self-serve lines</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase block">Weekly Financial Loss Avoided</span>
          <div className="mt-1 text-3xl font-black text-emerald-700">₹6,460</div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Through calibrated portion control</span>
        </div>
      </div>

      {/* AI WASTE HOTSPOT (EXACT REQUIREMENT: PATTERN + RECOMMENDATION + APPLY + REVIEW) */}
      <div className="rounded-2xl border-2 border-rose-400 bg-gradient-to-r from-rose-50/90 via-amber-50/60 to-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 bg-rose-200 px-2.5 py-0.5 rounded">
                AI Waste Hotspot Detected
              </span>
              <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Station: Main Rice Line 1</span>
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900">
              “Rice waste increased 14% this week.”
            </h3>

            <div className="space-y-1 text-xs text-slate-700">
              <p>
                <strong className="text-slate-900">Likely pattern: </strong>
                Wednesday dinner has lower consumption due to hostel canteen alternative food choices and self-portioning over-scooping.
              </p>
              <p className="text-emerald-900 font-bold">
                <strong className="text-emerald-800">Recommendation: </strong>
                Reduce rice preparation by 7% (calibrates daily volume by -6 kg, saving ₹920 weekly).
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
            <button
              onClick={handleApplyHotspot}
              disabled={appliedHotspotRec}
              className={`px-6 py-3 rounded-xl text-xs font-black shadow-xs transition-all flex items-center gap-1.5 ${
                appliedHotspotRec
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20 hover:scale-[1.02]'
              }`}
            >
              {appliedHotspotRec ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Recommendation Applied</span>
                </>
              ) : (
                <>
                  <span>Apply Recommendation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => setShowDataReview(!showDataReview)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
            >
              <span>{showDataReview ? 'Hide Review' : 'Review Data'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDataReview ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expandable Data Review */}
        {showDataReview && (
          <div className="mt-4 pt-4 border-t border-rose-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-xl border border-rose-200 animate-fade-in">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Wednesday Historical Plate Scrap</span>
              <p className="font-bold text-slate-900 mt-0.5">14.2 kg/day (vs 12.1 kg weekly avg)</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Portion Size Mismatch</span>
              <p className="font-bold text-slate-900 mt-0.5">220g dispensed vs 165g consumed avg</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Target Intervention</span>
              <p className="font-bold text-emerald-700 mt-0.5">Deploy 160g calibrated ladles</p>
            </div>
          </div>
        )}
      </div>

      {/* 7-DAY WASTE TREND CHART */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>7-Day Facility Waste Trend (kg/day)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Daily organic plate scrap and prep residue logged at dock weighing scales.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Current Week Avg: 16.8 kg/day
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="wasteKg" radius={[6, 6, 0, 0]}>
                {weeklyTrendData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.wasteKg > 18 ? '#f43f5e' : entry.wasteKg > 15 ? '#f59e0b' : '#10b981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Food Category Waste Ranking Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Waste Breakdown by Food Category</h3>
            <p className="text-xs text-slate-500">Click any row to inspect root-cause diagnostics.</p>
          </div>
          <span className="text-xs text-slate-400">Sorted by Waste Share</span>
        </div>

        <div className="space-y-2.5">
          {wasteHotspots.map(hotspot => (
            <div
              key={hotspot.id}
              onClick={() => setSelectedHotspot(hotspot)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                    hotspot.severity === 'HIGH'
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : hotspot.severity === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {hotspot.severity} HOTSPOT
                </span>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                    {hotspot.category}
                  </h4>
                  <p className="text-xs text-slate-500 truncate max-w-md">
                    {hotspot.likelyRootCause}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Daily Waste</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{hotspot.dailyWasteKg} kg/day</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Waste Share</span>
                  <span className="font-mono font-bold text-rose-700 text-sm">{hotspot.wastePercentage}%</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Diagnostic Modal */}
      {selectedHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  {selectedHotspot.severity} Hotspot
                </span>
                <h3 className="font-bold text-base text-slate-900">{selectedHotspot.category} Diagnostics</h3>
              </div>
              <button onClick={() => setSelectedHotspot(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">DAILY WASTE RATE</span>
                <span className="font-bold text-base text-slate-900">{selectedHotspot.dailyWasteKg} kg/day</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SHARE OF TOTAL WASTE</span>
                <span className="font-bold text-base text-rose-700">{selectedHotspot.wastePercentage}%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-800 block">Root Cause Pattern:</span>
              <p className="text-slate-600">{selectedHotspot.likelyRootCause}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold block">AI Suggested Intervention:</span>
              <p>{selectedHotspot.aiRecommendation}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedHotspot(null);
                  handleApplyHotspot();
                }}
                className="px-5 py-2 text-xs font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Apply Intervention
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
