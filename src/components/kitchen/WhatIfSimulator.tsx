import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  TrendingDown,
  CookingPot,
  PackageCheck,
  Trash2,
  CheckCircle2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatIfSimulator: React.FC = () => {
  const { prediction, updatePrediction, setActiveTab } = useApp();

  const [attendance, setAttendance] = useState<number>(prediction.expectedAttendance);
  const [prepQuantity, setPrepQuantity] = useState<number>(prediction.recommendedPreparation);
  const [mealType, setMealType] = useState<string>(prediction.mealType);
  const [historicalWaste, setHistoricalWaste] = useState<number>(prediction.previousWastePercent);
  const [eventFactor, setEventFactor] = useState<string>('Rainy Monsoon (-4.2%)');
  const [appliedToast, setAppliedToast] = useState(false);

  // Dynamic reactive simulation formulas
  let eventMultiplier = 1.0;
  if (eventFactor.includes('Rainy')) eventMultiplier = 0.958;
  if (eventFactor.includes('Campus Fest')) eventMultiplier = 1.08;
  if (eventFactor.includes('Holiday')) eventMultiplier = 0.85;

  const simPredictedDemand = Math.round(attendance * eventMultiplier);
  const simRecommendedPrep = simPredictedDemand + 15;
  const simExpectedSurplus = Math.max(0, prepQuantity - simPredictedDemand);
  const simExpectedWasteKg = parseFloat(((simExpectedSurplus * 0.35) + (simPredictedDemand * (historicalWaste / 100) * 0.15)).toFixed(1));
  const simWasteAvoidedKg = Math.max(0, parseFloat(((attendance - simRecommendedPrep) * 0.35).toFixed(1)));
  const simWasteReductionPercent = Math.min(95, Math.max(10, Math.round((simWasteAvoidedKg / (simWasteAvoidedKg + simExpectedWasteKg)) * 100)));

  const handleApplyToActiveSchedule = () => {
    updatePrediction({
      expectedAttendance: attendance,
      predictedDemand: simPredictedDemand,
      recommendedPreparation: simRecommendedPrep,
      expectedSurplus: simExpectedSurplus,
      expectedWasteKg: simExpectedWasteKg,
      potentialWasteAvoidedKg: simWasteAvoidedKg,
      mealType: mealType as any,
      aiInsight: `What-If scenario applied: Attendance adjusted to ${attendance} with ${eventFactor}. Recommended preparation locked at ${simRecommendedPrep} meals.`
    });

    setAppliedToast(true);
    setTimeout(() => {
      setAppliedToast(false);
      setActiveTab('procurement');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            AI What-If Kitchen Simulator
          </h1>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            Real-Time Inference
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Adjust headcount, planned batch sizes, and weather factors to simulate surplus generation and waste reduction before firing up kitchen burners.
        </p>
      </div>

      {appliedToast && (
        <div className="rounded-xl bg-emerald-600 text-white p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="text-sm font-bold">
              Applied scenario to active kitchen schedule! Recalculating smart procurement...
            </span>
          </div>
        </div>
      )}

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Simulation Levers & Operational Controls</span>
          </h3>

          {/* Slider 1: Expected Attendance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">1. Expected Mess Attendance</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={attendance}
                  onChange={e => setAttendance(Number(e.target.value))}
                  className="w-20 rounded border border-slate-200 px-2 py-0.5 text-right font-mono font-bold text-emerald-800 text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-400 font-medium">people</span>
              </div>
            </div>
            <input
              type="range"
              min={600}
              max={1800}
              step={25}
              value={attendance}
              onChange={e => setAttendance(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>600 (Min)</span>
              <span>1,200 (Baseline)</span>
              <span>1,800 (Max Capacity)</span>
            </div>
          </div>

          {/* Slider 2: Planned Preparation Quantity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">2. Planned Preparation Quantity</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={prepQuantity}
                  onChange={e => setPrepQuantity(Number(e.target.value))}
                  className="w-20 rounded border border-slate-200 px-2 py-0.5 text-right font-mono font-bold text-blue-800 text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="text-slate-400 font-medium">meals</span>
              </div>
            </div>
            <input
              type="range"
              min={600}
              max={2000}
              step={25}
              value={prepQuantity}
              onChange={e => setPrepQuantity(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>600 meals</span>
              <span>1,190 meals</span>
              <span>2,000 meals</span>
            </div>
          </div>

          {/* Slider 3: Historical Plate Waste % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800">3. Estimated Plate Waste Rate</label>
              <span className="font-mono font-bold text-amber-800 text-sm">{historicalWaste}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={historicalWaste}
              onChange={e => setHistoricalWaste(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1% (Minimal)</span>
              <span>3.4% (Current Avg)</span>
              <span>15% (Heavy Wastage)</span>
            </div>
          </div>

          {/* Selectors: Meal Type & Event Factor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="font-bold text-slate-700 block text-xs mb-1">Meal Service</label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none bg-slate-50 font-semibold"
              >
                <option value="Breakfast">Breakfast Service</option>
                <option value="Lunch">Lunch Service (Peak)</option>
                <option value="Dinner">Dinner Service</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block text-xs mb-1">Weather & Campus Event</label>
              <select
                value={eventFactor}
                onChange={e => setEventFactor(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none bg-slate-50 font-semibold"
              >
                <option value="Sunny / Normal (0%)">Sunny / Normal Day (0%)</option>
                <option value="Rainy Monsoon (-4.2%)">Heavy Rain / Monsoon (-4.2%)</option>
                <option value="Campus Fest (+8%)">College Fest / Guests (+8%)</option>
                <option value="Holiday Weekend (-15%)">Pre-Holiday Departure (-15%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Calculated Outputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                Live Scenario Projections
              </span>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                {simWasteReductionPercent}% Waste Prevented
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-3.5 border border-emerald-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Predicted Demand</span>
                <span className="text-2xl font-extrabold text-emerald-800 font-mono">
                  {simPredictedDemand}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">meals required</span>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-blue-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Recommended Prep</span>
                <span className="text-2xl font-extrabold text-blue-800 font-mono">
                  {simRecommendedPrep}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">+15 safety buffer</span>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-amber-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Expected Surplus</span>
                <span className="text-2xl font-extrabold text-amber-800 font-mono">
                  {simExpectedSurplus}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">unserved portions</span>
              </div>

              <div className="rounded-xl bg-white p-3.5 border border-teal-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Food Waste Avoided</span>
                <span className="text-2xl font-extrabold text-teal-800 font-mono">
                  {simWasteAvoidedKg} kg
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">saved before cooking</span>
              </div>
            </div>

            {/* AI Dynamic Advice based on delta */}
            <div className="rounded-xl bg-white/90 border border-emerald-200 p-3 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-emerald-900 block mb-0.5">AI Simulation Diagnosis:</span>
              {prepQuantity > simRecommendedPrep ? (
                <span>
                  Current planned prep ({prepQuantity} meals) exceeds AI recommendation by{' '}
                  <strong>{prepQuantity - simRecommendedPrep} meals</strong>. Reducing to {simRecommendedPrep} will save approx ₹{((prepQuantity - simRecommendedPrep) * 45).toLocaleString()} in raw ingredients.
                </span>
              ) : (
                <span>
                  Planned prep is aligned with predicted attendance. Safety buffer provides adequate margin for unexpected guest swipes.
                </span>
              )}
            </div>

            {/* Commit Button */}
            <button
              onClick={handleApplyToActiveSchedule}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Apply Simulation to Active Kitchen Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
