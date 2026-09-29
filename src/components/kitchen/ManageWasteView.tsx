import React, { useState } from 'react';
import {
  Trash2,
  PackageCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CountdownTimer } from '../common/CountdownTimer';

export const ManageWasteView: React.FC = () => {
  const { surplusBatches, wasteHotspots, redistributeNow } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'surplus' | 'analytics'>('surplus');

  const urgentBatch = surplusBatches[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Waste & Surplus</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time surplus safe window timers and waste hotspot reduction.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('surplus')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'surplus' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Active Surplus (27 Meals)
          </button>
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'analytics' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Waste Hotspots
          </button>
        </div>
      </div>

      {activeSubTab === 'surplus' && (
        <div className="space-y-5">
          {urgentBatch && (
            <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                    Urgent Surplus Detected
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-1">
                    {urgentBatch.quantityMeals} meals ({urgentBatch.quantityKg} kg)
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{urgentBatch.foodItem}</p>
                </div>
                <div className="text-right">
                  <CountdownTimer initialMinutes={urgentBatch.currentMinutesRemaining} isUrgent={true} />
                  <span className="text-[10px] text-slate-400 block mt-1">Temp: {urgentBatch.temperatureLogged}°C in Bain-Marie</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Recommended Recipient</span>
                  <h4 className="font-bold text-sm text-slate-900">Hope Foundation & Shelter Home (96% Match)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">2.4 km away • Electric cargo van ready for pickup (ETA 18 min)</p>
                </div>
                <button
                  onClick={() => redistributeNow(urgentBatch.id, 'Hope Foundation & Shelter Home')}
                  className="px-6 py-3 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <span>Redistribute Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'analytics' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-3">Kitchen Waste Contributors</h3>
            <div className="space-y-3">
              {wasteHotspots.map(h => (
                <div key={h.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{h.category}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{h.likelyRootCause}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-rose-700 block">{h.dailyWasteKg} kg/day</span>
                    <span className="text-[10px] text-slate-400">{h.aiRecommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
