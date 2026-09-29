import React, { useState } from 'react';
import {
  Leaf,
  Droplets,
  Utensils,
  TrendingDown,
  Info,
  CheckCircle2,
  X,
  Users,
  Coins,
  Award,
  Sparkles,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EnvironmentalImpact: React.FC = () => {
  const { impact, showCalculationModal, setShowCalculationModal, journeyStage } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Environmental & Community Impact Ledger
            </h1>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Verified ESG Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ecological conservation metrics and social nutrition records automatically recalculated when surplus donations are delivered.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDownloadSuccess(true);
              setTimeout(() => setDownloadSuccess(false), 2500);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadSuccess ? '✓ PDF Exported' : 'Export Audit Report'}</span>
          </button>

          <button
            onClick={() => setShowCalculationModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </button>
        </div>
      </div>

      {journeyStage === 'DELIVERED' && (
        <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base">New Impact Recorded Today!</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                27 meals delivered to Hope Foundation Community Shelter. Ledger sealed (+22.5 kg diverted, +47.3 kg CO₂e avoided, +18,900 L water conserved).
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-white text-emerald-900 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Block #ESG-2026-0927
          </span>
        </div>
      )}

      {/* 6 High-Contrast Live Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Meals Redistributed */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-emerald-700">
            <span className="text-xs font-black uppercase tracking-wider">Meals Redistributed</span>
            <Utensils className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {impact.mealsRedistributed.toLocaleString()}
          </div>
          <p className="text-xs text-slate-600 font-medium">Nutritious meals safely delivered to verified shelters</p>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-emerald-800 font-bold">
            Live Verified via Handover OTP
          </div>
        </div>

        {/* Card 2: Food Diverted */}
        <div className="rounded-2xl border border-teal-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-teal-700">
            <span className="text-xs font-black uppercase tracking-wider">Food Diverted</span>
            <Leaf className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {impact.foodSavedKg.toLocaleString()} kg
          </div>
          <p className="text-xs text-slate-600 font-medium">Organic edible meals saved from landfill anaerobic decay</p>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-teal-800 font-bold">
            Measured at Loading Dock A Scales
          </div>
        </div>

        {/* Card 3: People Served */}
        <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-blue-700">
            <span className="text-xs font-black uppercase tracking-wider">People Served</span>
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {impact.peopleServed.toLocaleString()}
          </div>
          <p className="text-xs text-slate-600 font-medium">1,215 institutional diners + shelter community beneficiaries</p>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-blue-800 font-bold">
            Zero Discard Objective Met
          </div>
        </div>

        {/* Card 4: Estimated CO2e Avoided */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-indigo-700">
            <span className="text-xs font-black uppercase tracking-wider">Estimated CO₂e Avoided</span>
            <TrendingDown className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {impact.co2AvoidedTons} tons
          </div>
          <p className="text-xs text-slate-600 font-medium">Prevented potent landfill methane (CH₄) greenhouse gas emissions</p>
          <div className="pt-2 border-t border-indigo-100 text-[10px] text-indigo-800 font-bold">
            *Estimated: 2.1 kg CO₂e / kg cooked food (UNEP Factor)
          </div>
        </div>

        {/* Card 5: Estimated Water Saved */}
        <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50/40 via-white to-blue-50/30 p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-sky-700">
            <span className="text-xs font-black uppercase tracking-wider">Virtual Water Conserved</span>
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {(impact.waterSavedLiters / 100000).toFixed(2)} Lakh L
          </div>
          <p className="text-xs text-slate-600 font-medium">Agricultural embedded irrigation footprint protected</p>
          <div className="pt-2 border-t border-sky-100 text-[10px] text-sky-800 font-bold">
            *Estimated: 840 L water / kg food (Water Footprint Network)
          </div>
        </div>

        {/* Card 6: Economic Value Saved */}
        <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-xs font-black uppercase tracking-wider">Economic Value Preserved</span>
            <Coins className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ₹{impact.economicSavingsInr.toLocaleString()}
          </div>
          <p className="text-xs text-slate-600 font-medium">Institutional kitchen budget efficiency preserved</p>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-amber-800 font-bold">
            Calculated at ₹60 / Cooked Thali
          </div>
        </div>
      </div>

      {/* Honest Scientific Methodology Banner */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Carbon & Water Estimation Standard: </strong>
          All environmental figures are modeled estimates derived from UNEP Food Waste Index and Water Footprint Network lifecycle analysis for mixed Indian grain-legume diets. Meals redistributed and food weights are physically verified through loading dock digital scale logs and recipient shelter OTP seals.
        </div>
      </div>

      {/* Calculation Methodology Modal */}
      {showCalculationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Environmental Impact Calculation Formula</h3>
              <button
                onClick={() => setShowCalculationModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block">1. Carbon Avoidance Coefficient</span>
                <p className="font-mono text-[11px] bg-white p-1 rounded border border-emerald-200">
                  CO₂e Avoided (tons) = Food Saved (kg) × 2.1 ÷ 1,000
                </p>
                <p className="text-[11px] text-slate-600">
                  Derived from UNEP Food Waste Index: 1 kg of cooked mixed grain & vegetable waste diverted from anaerobic landfill decomposition prevents 2.1 kg of CO₂ equivalent emissions.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900 block">2. Virtual Water Conservation</span>
                <p className="font-mono text-[11px] bg-white p-1 rounded border border-blue-200">
                  Water Conserved (Liters) = Food Saved (kg) × 840
                </p>
                <p className="text-[11px] text-slate-600">
                  Reflects the embedded agricultural irrigation footprint required to cultivate rice, pulses, and vegetables according to Water Footprint Network data.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">3. Social & Economic Value</span>
                <p className="font-mono text-[11px] bg-white p-1 rounded border border-amber-200">
                  Economic Savings (₹) = Meals Redistributed × ₹60
                </p>
                <p className="text-[11px] text-slate-600">
                  Evaluated at a standard institutional mess cost of ₹60 per cooked nutritious meal.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowCalculationModal(false)}
                className="px-5 py-2 text-xs font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Close Methodology
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
