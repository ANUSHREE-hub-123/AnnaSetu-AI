import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlanFoodView: React.FC = () => {
  const {
    prediction,
    updatePrediction,
    procurementItems,
    generatePurchaseOrder
  } = useApp();

  const [activeTab, setActiveTab] = useState<'forecast' | 'whatif' | 'procurement'>('forecast');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [poDispatched, setPoDispatched] = useState(false);

  const [attendance, setAttendance] = useState(prediction.expectedAttendance);
  const [mealType, setMealType] = useState(prediction.mealType);
  const [prepDate, setPrepDate] = useState('Tomorrow (Sept 28, 2026)');

  const [simAttendance, setSimAttendance] = useState(1200);
  const [simPrepMeals, setSimPrepMeals] = useState(1188);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedDemand = Math.round(attendance * 0.98) - 45;
    const recommended = calculatedDemand + 15;
    updatePrediction({
      expectedAttendance: attendance,
      mealType,
      predictedDemand: calculatedDemand,
      recommendedPreparation: recommended,
      actualPreparation: recommended + 27,
      expectedSurplus: 15,
      surplusMeals: 27
    });
  };

  const simDemand = Math.round(simAttendance * 0.98) - 45;
  const simSurplus = Math.max(0, simPrepMeals - simDemand);
  const simRisk = simSurplus > 40 ? 'CRITICAL' : simSurplus > 15 ? 'MODERATE' : 'SAFE';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Plan Food Production</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrate preparation volume and raw ingredient purchase orders.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'forecast' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Demand Planner
          </button>
          <button
            onClick={() => setActiveTab('whatif')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'whatif' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            What-If Simulator
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'procurement' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Raw Procurement
          </button>
        </div>
      </div>

      {activeTab === 'forecast' && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <form onSubmit={handlePredict} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Attendance</label>
                  <input
                    type="number"
                    value={attendance}
                    onChange={e => setAttendance(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meal Service</label>
                  <select
                    value={mealType}
                    onChange={e => setMealType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                  >
                    <option value="Breakfast">Breakfast (8:00 AM)</option>
                    <option value="Lunch">Lunch (12:30 PM)</option>
                    <option value="Dinner">Dinner (7:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <select
                    value={prepDate}
                    onChange={e => setPrepDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500"
                  >
                    <option value="Today (Sept 27, 2026)">Today (Sept 27, 2026)</option>
                    <option value="Tomorrow (Sept 28, 2026)">Tomorrow (Sept 28, 2026)</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                >
                  <span>Advanced inputs</span>
                  {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showAdvanced && (
                  <div className="mt-2 p-3 bg-slate-50 rounded-xl border text-xs text-slate-600">
                    Weather modifier: Monsoon Rain (-4.2%) • Safety Buffer: 15 meals (5%)
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-1">
                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs">
                  Predict Demand
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/50 p-6 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-emerald-200">
              <span className="text-xs text-slate-500 font-medium block">AI Recommended Preparation</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{prediction.recommendedPreparation} meals</div>
              <span className="text-[11px] text-slate-400 font-medium">Optimal 15-meal buffer</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-emerald-200">
              <span className="text-xs text-slate-500 font-medium block">Expected Surplus</span>
              <div className="text-3xl font-black text-amber-700 mt-1">15 meals</div>
              <span className="text-[11px] text-slate-400 font-medium">Within safe holding limit</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-emerald-200">
              <span className="text-xs text-slate-500 font-medium block">Potential Waste Avoided</span>
              <div className="text-3xl font-black text-emerald-700 mt-1">{prediction.potentialWasteAvoidedKg} kg</div>
              <span className="text-[11px] text-slate-400 font-medium">Prevented before cooking</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'whatif' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-slate-900">What-If Attendance & Prep Variation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Simulated Attendance</span>
                <span className="text-emerald-700">{simAttendance} people</span>
              </div>
              <input
                type="range"
                min="900"
                max="1500"
                step="25"
                value={simAttendance}
                onChange={e => setSimAttendance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Preparation Volume</span>
                <span className="text-blue-700">{simPrepMeals} meals</span>
              </div>
              <input
                type="range"
                min="900"
                max="1500"
                step="25"
                value={simPrepMeals}
                onChange={e => setSimPrepMeals(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 block font-semibold">Predicted Demand</span>
              <span className="text-lg font-black text-slate-800">{simDemand} meals</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 block font-semibold">Expected Surplus</span>
              <span className="text-lg font-black text-amber-700">{simSurplus} meals</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 block font-semibold">Waste Risk</span>
              <span className={`text-lg font-black ${simRisk === 'CRITICAL' ? 'text-rose-700' : 'text-emerald-700'}`}>{simRisk}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'procurement' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Ingredients Required for {prediction.recommendedPreparation} Meals</h3>
              <p className="text-xs text-slate-500">Shortages highlighted based on current pantry stock.</p>
            </div>
            <button
              onClick={() => setShowPOModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
            >
              Generate Procurement Plan
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {procurementItems.map(item => {
              const isShortage = item.suggestedProcureKg > 0;
              return (
                <div key={item.id} className={`p-3.5 rounded-xl border ${isShortage ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{item.name}</span>
                    {isShortage && <span className="text-rose-700 font-black">Shortage: {item.suggestedProcureKg} {item.unit}</span>}
                  </div>
                  <div className="text-xs text-slate-500">
                    Required: <strong>{item.requiredTotalKg} {item.unit}</strong> | Available: {item.currentStockKg} {item.unit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showPOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Purchase Order Requisition</h3>
            <p className="text-xs text-slate-600">Dispatches automated replenishment for 8 kg Toor Dal shortage.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowPOModal(false)} className="px-4 py-2 text-xs text-slate-600">Cancel</button>
              <button
                onClick={() => {
                  generatePurchaseOrder();
                  setPoDispatched(true);
                  setTimeout(() => { setPoDispatched(false); setShowPOModal(false); }, 1200);
                }}
                className="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg"
              >
                {poDispatched ? '✓ Dispatched to Vendors' : 'Confirm Purchase Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
