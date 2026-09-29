import React, { useState } from 'react';
import {
  PackageCheck,
  AlertTriangle,
  Clock,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Plus,
  Thermometer,
  Layers,
  Filter,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CountdownTimer } from '../common/CountdownTimer';
import { SurplusBatch } from '../../types';

export const SurplusManagement: React.FC = () => {
  const { surplusBatches, ngos, acceptAndSchedulePickup, addSurplusBatch, setActiveTab } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterUrgency, setFilterUrgency] = useState<'ALL' | 'URGENT' | 'SAFE' | 'EXPIRING'>('ALL');

  // Form state
  const [foodItem, setFoodItem] = useState('');
  const [quantityKg, setQuantityKg] = useState(20);
  const [foodType, setFoodType] = useState<'Vegetarian' | 'Non-Vegetarian' | 'Jain'>('Vegetarian');
  const [storageCond, setStorageCond] = useState<string>('Hot-Holding (>65°C)');
  const [tempLogged, setTempLogged] = useState(68.0);

  // Automatically prioritize urgent surplus
  const sortedBatches = [...surplusBatches].sort((a, b) => {
    const priority = { EXPIRING: 1, URGENT: 2, SAFE: 3 };
    return (priority[a.urgency] || 4) - (priority[b.urgency] || 4);
  });

  const filteredBatches = filterUrgency === 'ALL'
    ? sortedBatches
    : sortedBatches.filter(b => b.urgency === filterUrgency);

  const urgentHero = surplusBatches.find(s => s.urgency === 'URGENT' || s.urgency === 'EXPIRING') || surplusBatches[0];
  const bestNgo = ngos[0]; // Hope Foundation (96% match)

  const handleCreateSurplus = (e: React.FormEvent) => {
    e.preventDefault();
    addSurplusBatch({
      foodItem,
      quantityKg,
      quantityMeals: Math.round(quantityKg * 1.2),
      foodType: foodType as any,
      preparationTime: 'Just now',
      safeUntilTime: 'Within 3 hours',
      initialMinutes: 60,
      storageCondition: storageCond as any,
      temperatureLogged: tempLogged
    });
    setShowAddModal(false);
    setFoodItem('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Surplus Food Intelligence</h1>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              Safe-Window Tracker
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time IoT temperature telemetry, microbial safety thresholds, and automated shelter matching for unserved institutional meals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Log Surplus Tray</span>
        </button>
      </div>

      {/* 1. AUTO-PRIORITIZED URGENT SURPLUS HERO CARD */}
      {urgentHero && (
        <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50/90 via-white to-rose-50/40 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded">
                  Top Priority • {urgentHero.urgency}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Batch: {urgentHero.batchId || 'BATCH-2026-0927-A'}
                </span>
              </div>

              <div className="text-3xl font-black text-slate-900">
                {urgentHero.quantityMeals} meals ({urgentHero.quantityKg} kg)
              </div>
              <p className="text-base font-bold text-slate-800 mt-0.5">
                {urgentHero.foodItem}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                <span>Prep: <strong className="text-slate-800">{urgentHero.preparationTime}</strong></span>
                <span>•</span>
                <span>Safe Until: <strong className="text-slate-800">{urgentHero.safeUntilTime}</strong></span>
                <span>•</span>
                <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  {urgentHero.storageCondition} @ {urgentHero.temperatureLogged}°C
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
              <CountdownTimer initialMinutes={urgentHero.currentMinutesRemaining} isUrgent={true} />
              <span className="text-[11px] text-slate-400 font-medium">Safe redistribution window remaining</span>
            </div>
          </div>

          {/* Integrated Best NGO Match & 1-Click Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-5 rounded-xl border border-amber-200 shadow-2xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Recommended by AnnaSetu AI
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">{bestNgo.name}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                <span className="font-black text-emerald-700">{bestNgo.matchScore}% Optimal Match</span>
                <span>•</span>
                <span>{bestNgo.distanceKm} km away</span>
                <span>•</span>
                <span>Requires {bestNgo.requiredMeals} meals</span>
                <span>•</span>
                <span className="text-emerald-800 font-bold">Electric cargo van ready (ETA 18 min)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setActiveTab('redistribute')}
                className="px-4 py-3 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Inspect Matching Formula
              </button>

              <button
                onClick={() => acceptAndSchedulePickup(bestNgo.name)}
                className="px-6 py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Accept & Schedule Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. LIVE TEMPERATURE SENSOR TELEMETRY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase block">Dock A Bain-Marie Warmer</span>
            <div className="text-2xl font-black text-emerald-800 mt-0.5">68.4°C</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Sensor Probe #SN-774 (FSSAI Safe &gt;65°C)</span>
          </div>
          <Thermometer className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase block">Walk-In Cold Room #C-2</span>
            <div className="text-2xl font-black text-blue-800 mt-0.5">4.2°C</div>
            <span className="text-[11px] text-blue-700 font-semibold">Chiller Probe #SN-302 (FSSAI Safe &lt;5°C)</span>
          </div>
          <Thermometer className="w-8 h-8 text-blue-600" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase block">Microbial Risk Index</span>
            <div className="text-2xl font-black text-emerald-800 mt-0.5">0.02% (Safe)</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Thermal preservation active</span>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* 3. SURPLUS INVENTORY TABLE WITH SAFE / URGENT / EXPIRING STATUSES */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active Surplus Food Inventory</h3>
            <p className="text-xs text-slate-500">
              Prioritized by remaining safe consumption window (EXPIRING $\rightarrow$ URGENT $\rightarrow$ SAFE).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'URGENT', 'SAFE', 'EXPIRING'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterUrgency(tab)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterUrgency === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Batch & Food Item</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Prep Time</th>
                <th className="py-2.5 px-3">Safe Deadline</th>
                <th className="py-2.5 px-3">Window Left</th>
                <th className="py-2.5 px-3">Urgency Status</th>
                <th className="py-2.5 px-3">Storage Condition</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBatches.map(b => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{b.foodItem}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.batchId || b.id}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {b.quantityMeals} meals ({b.quantityKg} kg)
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    {b.preparationTime}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">
                    {b.safeUntilTime}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-rose-700">
                    {b.currentMinutesRemaining} mins
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                        b.urgency === 'EXPIRING'
                          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                          : b.urgency === 'URGENT'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {b.urgency}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-slate-700 font-medium block">{b.storageCondition}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{b.temperatureLogged}°C logged</span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => acceptAndSchedulePickup(bestNgo.name)}
                      className="px-3.5 py-1.5 rounded-lg text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all"
                    >
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Surplus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Log Surplus Batch Tray</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateSurplus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Food Item Description</label>
                <input
                  type="text"
                  placeholder="e.g. Steamed Rice + Chana Masala"
                  value={foodItem}
                  onChange={e => setFoodItem(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={e => setQuantityKg(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Food Dietary Type</label>
                  <select
                    value={foodType}
                    onChange={e => setFoodType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500 bg-white"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Jain">Jain (No Onion/Garlic)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Storage Condition</label>
                  <select
                    value={storageCond}
                    onChange={e => setStorageCond(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500 bg-white"
                  >
                    <option value="Hot-Holding (>65°C)">Hot-Holding (&gt;65°C Bain-Marie)</option>
                    <option value="Cold-Storage (<4°C)">Cold-Storage (&lt;4°C Chiller)</option>
                    <option value="Room Temperature">Room Temperature</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Logged Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempLogged}
                    onChange={e => setTempLogged(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Register Surplus Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
