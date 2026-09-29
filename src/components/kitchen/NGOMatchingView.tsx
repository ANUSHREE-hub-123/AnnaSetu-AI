import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Clock,
  Truck,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NGOMatchingView: React.FC = () => {
  const { ngos, redistributeNow } = useApp();
  const [showOtherNgos, setShowOtherNgos] = useState(false);

  const topNgo = ngos[0]; // Hope Foundation (96% match)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Smart NGO Recommendation</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          AnnaSetu AI automatically determines the optimal recipient so kitchen staff don't have to compare multiple options manually.
        </p>
      </div>

      {/* RECOMMENDED BY ANNASETU AI CARD */}
      <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Recommended by AnnaSetu AI
          </span>
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
            {topNgo.matchScore}% Optimal Match
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">{topNgo.name}</h2>
          <p className="text-xs text-slate-600 mt-1">
            {topNgo.location} • Contact: {topNgo.contactPerson} ({topNgo.phone})
          </p>
        </div>

        {/* Why this match? 5 Clear Factors */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Why this match?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold">DISTANCE</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{topNgo.distanceKm} km</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Closest shelter</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold">COMPATIBILITY</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">100% Match</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Veg & Hot-Holding</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold">REQUIRED</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{topNgo.requiredMeals} meals</span>
              <span className="text-[10px] text-slate-500">Perfect size fit</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold">LOGISTICS</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">Van Ready</span>
              <span className="text-[10px] text-emerald-700 font-semibold">ETA: 18 minutes</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold">CAPACITY</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{topNgo.currentCapacityMeals} meals</span>
              <span className="text-[10px] text-slate-500">Verified safe storage</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => redistributeNow(undefined, topNgo.name)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Accept Match & Schedule Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progressive Disclosure: Other NGOs */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <button
          onClick={() => setShowOtherNgos(!showOtherNgos)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <span>Other Verified NGOs in Network ({ngos.length - 1})</span>
          {showOtherNgos ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showOtherNgos && (
          <div className="mt-4 space-y-3 pt-3 border-t border-slate-100">
            {ngos.slice(1).map(n => (
              <div key={n.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">{n.name}</span>
                  <span className="text-slate-500 block">{n.distanceKm} km away • Requires {n.requiredMeals} meals</span>
                </div>
                <button
                  onClick={() => redistributeNow(undefined, n.name)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold"
                >
                  Select This NGO
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
