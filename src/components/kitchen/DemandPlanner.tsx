import React, { useState } from 'react';
import {
  TrendingUp,
  Sliders,
  Calendar,
  Users,
  Utensils,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  BarChart3,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { historicalDemandData } from '../../data/mockData';

export const DemandPlanner: React.FC = () => {
  const {
    prediction,
    updatePrediction,
    setActiveTab,
    applyPrepRecommendation,
    journeyStage
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'prediction' | 'whatif' | 'explainability'>('prediction');
  const [showAdvancedInputs, setShowAdvancedInputs] = useState(false);

  // Form inputs
  const [attendance, setAttendance] = useState<number>(prediction.expectedAttendance);
  const [mealType, setMealType] = useState<string>(prediction.mealType);
  const [prepDate, setPrepDate] = useState<string>('Today (Wednesday, Sept 27, 2026)');
  const [eventFactor, setEventFactor] = useState<string>('Monsoon Rain Dip (-4.2%)');
  const [safetyBufferPercent, setSafetyBufferPercent] = useState<number>(5);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // What-If Simulation State
  const [simAttendance, setSimAttendance] = useState<number>(1200);
  const [simPrepMeals, setSimPrepMeals] = useState<number>(1188);
  const [simEventFactor, setSimEventFactor] = useState<string>('Monsoon Rain Dip (-4.2%)');

  // Compute live prediction based on inputs
  const computePrediction = (att: number, event: string, bufferPct: number) => {
    let eventMod = 0;
    if (event.includes('Monsoon') || event.includes('Rain')) eventMod = -45;
    if (event.includes('Exam')) eventMod = -120;
    if (event.includes('Fest') || eventMod > 0) eventMod = 140;

    const basePredicted = Math.round(att * 0.98) + eventMod;
    const bufferMeals = Math.round(basePredicted * (bufferPct / 100));
    const recPrep = basePredicted + bufferMeals;
    const expSurplus = bufferMeals;
    const expWaste = parseFloat(((expSurplus * 0.28) + (basePredicted * 0.008)).toFixed(1));
    const wasteAvoided = Math.max(0, Math.round((att - recPrep) * 0.35));

    return {
      predictedDemand: basePredicted,
      recommendedPreparation: recPrep,
      expectedSurplus: expSurplus,
      expectedWasteKg: expWaste,
      potentialWasteAvoidedKg: wasteAvoided,
      confidenceScore: 94.6
    };
  };

  const currentComputed = computePrediction(attendance, eventFactor, safetyBufferPercent);

  // What-If computed metrics
  const simComputed = computePrediction(simAttendance, simEventFactor, 5);
  const simSurplusMeals = Math.max(0, simPrepMeals - simComputed.predictedDemand);
  const simWasteRisk = simSurplusMeals > 40 ? 'CRITICAL' : simSurplusMeals > 20 ? 'MODERATE' : 'SAFE';
  const simCostVariance = Math.round((simPrepMeals - 1188) * 55);

  const handleApplyInputs = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrediction({
      expectedAttendance: attendance,
      mealType: mealType as any,
      weatherFactor: eventFactor.includes('Monsoon') ? 'Rainy (-4.2%)' : 'Sunny (Normal)',
      predictedDemand: currentComputed.predictedDemand,
      recommendedPreparation: currentComputed.recommendedPreparation,
      expectedSurplus: currentComputed.expectedSurplus,
      expectedWasteKg: currentComputed.expectedWasteKg,
      potentialWasteAvoidedKg: currentComputed.potentialWasteAvoidedKg
    });

    setAppliedToast(`✓ Model updated: Preparation calibrated to ${currentComputed.recommendedPreparation} meals.`);
    setTimeout(() => setAppliedToast(null), 3500);
  };

  const handleApplyWhatIf = () => {
    updatePrediction({
      expectedAttendance: simAttendance,
      predictedDemand: simComputed.predictedDemand,
      recommendedPreparation: simPrepMeals,
      expectedSurplus: simSurplusMeals
    });

    setAppliedToast(`✓ Applied What-If Scenario: ${simPrepMeals} meals scheduled for kitchen production.`);
    setTimeout(() => setAppliedToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Food Demand Planner</h1>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Inference Engine v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrate daily kitchen batch sizes using historical attendance registrations, monsoon weather patterns, and ML demand projections.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('prediction')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'prediction'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Demand Forecast</span>
          </button>
          <button
            onClick={() => setActiveSubTab('whatif')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'whatif'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What-If Simulator</span>
          </button>
          <button
            onClick={() => setActiveSubTab('explainability')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'explainability'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Model Explainability</span>
          </button>
        </div>
      </div>

      {appliedToast && (
        <div className="rounded-xl bg-emerald-700 text-white p-4 shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="text-xs sm:text-sm font-bold">{appliedToast}</span>
          </div>
          <button onClick={() => setAppliedToast(null)} className="text-emerald-200 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* SUB-TAB 1: PREDICTION & 7-DAY MODEL ANALYSIS */}
      {activeSubTab === 'prediction' && (
        <div className="space-y-6">
          {/* Main 2-Column Grid: Inputs & Outputs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Form Inputs (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Forecasting Parameters</span>
              </h3>

              <form onSubmit={handleApplyInputs} className="space-y-3.5">
                {/* Expected Attendance */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Expected Attendance</label>
                    <span className="text-[10px] text-slate-400">Headcount</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={attendance}
                      onChange={e => setAttendance(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 font-bold focus:outline-emerald-500 pl-8"
                      required
                    />
                    <Users className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                  {/* Preset Pills */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setAttendance(1200)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      1,200 (Default)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance(1050)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      1,050 (Exams)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance(1350)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      1,350 (Event)
                    </button>
                  </div>
                </div>

                {/* Meal Service & Date */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Meal Service</label>
                    <select
                      value={mealType}
                      onChange={e => setMealType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500 bg-white"
                    >
                      <option value="Breakfast">Breakfast (8 AM)</option>
                      <option value="Lunch">Lunch (12:30 PM)</option>
                      <option value="Dinner">Dinner (7:30 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Date</label>
                    <select
                      value={prepDate}
                      onChange={e => setPrepDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500 bg-white"
                    >
                      <option value="Today (Wednesday, Sept 27, 2026)">Today (Sept 27)</option>
                      <option value="Tomorrow (Thursday, Sept 28, 2026)">Tomorrow (Sept 28)</option>
                      <option value="Friday (Sept 29, 2026)">Friday (Sept 29)</option>
                    </select>
                  </div>
                </div>

                {/* Event / Holiday Factor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event / Seasonal Factor</label>
                  <select
                    value={eventFactor}
                    onChange={e => setEventFactor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-semibold focus:outline-emerald-500 bg-white"
                  >
                    <option value="Monsoon Rain Dip (-4.2%)">Monsoon Rain Dip (-4.2% Attendance)</option>
                    <option value="None / Regular Academic Day">None / Regular Academic Day</option>
                    <option value="Exam Study Leave (-12%)">Exam Study Leave (-12% Headcount)</option>
                    <option value="Campus Fest (+15%)">Campus Fest / Guest Influx (+15%)</option>
                  </select>
                </div>

                {/* Historical Demand Reference */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex justify-between text-slate-500 mb-0.5">
                    <span>Historical Wednesday Average</span>
                    <strong className="text-slate-800">1,180 meals</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Baseline Consumption Rate</span>
                    <strong className="text-slate-800">97.8% plate finish</strong>
                  </div>
                </div>

                {/* Progressive Disclosure: Buffer slider */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                  >
                    <span>Advanced tuning (Buffer: {safetyBufferPercent}%)</span>
                    {showAdvancedInputs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showAdvancedInputs && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between text-xs text-slate-700 font-semibold">
                        <span>Calibrated Safety Buffer</span>
                        <span className="text-emerald-700 font-bold">{safetyBufferPercent}% ({Math.round(currentComputed.predictedDemand * (safetyBufferPercent / 100))} meals)</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={safetyBufferPercent}
                        onChange={e => setSafetyBufferPercent(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
                >
                  Recalculate AI Demand
                </button>
              </form>
            </div>

            {/* Right Column: AI Outputs (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Output Hero Card */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    AI Demand Forecast Output
                  </span>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    {currentComputed.confidenceScore}% AI Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Predicted Demand</span>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">
                      {currentComputed.predictedDemand}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Expected diners</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-100 uppercase block">Recommended Prep</span>
                    <div className="text-2xl font-black text-white mt-0.5">
                      {currentComputed.recommendedPreparation}
                    </div>
                    <span className="text-[10px] text-emerald-200 font-medium">Production Target</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Surplus</span>
                    <div className="text-2xl font-black text-amber-700 mt-0.5">
                      {currentComputed.expectedSurplus}
                    </div>
                    <span className="text-[10px] text-amber-700 font-medium">Safety cushion</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Waste Avoided</span>
                    <div className="text-2xl font-black text-emerald-700 mt-0.5">
                      {currentComputed.potentialWasteAvoidedKg} kg
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium">Overprep prevented</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Inference Rationale: </strong>
                    Monsoon rain forecast triggers a calibrated -45 meal adjustment from 1,200 registered headcount. 
                    Adding a 5% buffer (+15 meals) produces exactly <strong>{currentComputed.recommendedPreparation} meals</strong>, preventing 18 kg overproduction without stockout risk.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-emerald-100">
                  <span className="text-xs text-slate-500 font-medium">
                    Batch Status: <strong>{journeyStage !== 'PREP_PENDING' ? 'Applied to Kitchen' : 'Awaiting Confirmation'}</strong>
                  </span>

                  <button
                    onClick={applyPrepRecommendation}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Apply Recommendation ({currentComputed.recommendedPreparation} Meals)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Link to Smart Procurement */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Ingredient Requisition Requirements</span>
                  <span className="text-slate-500">82 kg Rice, 36 kg Dal (8 kg Shortage), 58 kg Vegetables</span>
                </div>
                <button
                  onClick={() => setActiveTab('procurement')}
                  className="px-4 py-2 rounded-lg font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1"
                >
                  <span>Open Smart Procurement</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 7-DAY DEMAND CHART: ACTUAL VS PREDICTED */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>7-Day Historical Demand: Actual Consumption vs AI Prediction</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tracks actual dining hall tray counts against model estimates to verify predictive convergence.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span>AI Predicted</span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                  <span>Actual Diners</span>
                </span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  96.8% Model Accuracy
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={historicalDemandData.slice(-7)}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[800, 1300]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                  <ReferenceLine y={1200} stroke="#cbd5e1" strokeDasharray="3 3" label={{ value: 'Headcount 1,200', fill: '#94a3b8', fontSize: 10 }} />
                  <Area
                    type="monotone"
                    dataKey="predictedDemand"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#predictedGrad)"
                    name="AI Predicted Demand"
                  />
                  <Area
                    type="monotone"
                    dataKey="actualDemand"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#actualGrad)"
                    name="Actual Diners"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">7-DAY AVG ACCURACY</span>
                <span className="font-bold text-slate-900">96.8%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">MEAN ABSOLUTE ERROR</span>
                <span className="font-bold text-slate-900">±14 meals</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PEAK OVERPRODUCTION AVOIDED</span>
                <span className="font-bold text-emerald-700">18.2 kg/day</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CORRELATION (R²)</span>
                <span className="font-bold text-slate-900">0.941</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WHAT-IF SIMULATOR */}
      {activeSubTab === 'whatif' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Interactive What-If Kitchen Simulator</h3>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  Real-Time Scenario Testing
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Drag the sliders to test how varying attendance, planned prep volumes, and weather disruptions impact food surplus and waste risk.
              </p>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {/* Attendance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>1. Projected Attendance</span>
                  <span className="font-mono text-base text-emerald-700">{simAttendance} Diners</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="1600"
                  step="25"
                  value={simAttendance}
                  onChange={e => setSimAttendance(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>800 (Low exam day)</span>
                  <span>1,200 (Normal)</span>
                  <span>1,600 (Mega fest)</span>
                </div>
              </div>

              {/* Planned Prep Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>2. Planned Preparation Quantity</span>
                  <span className="font-mono text-base text-blue-700">{simPrepMeals} Meals</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="1600"
                  step="25"
                  value={simPrepMeals}
                  onChange={e => setSimPrepMeals(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>800 Meals</span>
                  <span>1,188 (AI Target)</span>
                  <span>1,600 Meals</span>
                </div>
              </div>
            </div>

            {/* Event Factor Quick Toggles */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">3. Apply Environmental / Event Factor</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  'Monsoon Rain Dip (-4.2%)',
                  'Sunny / Regular Day',
                  'Exam Study Leave (-12%)',
                  'Campus Fest (+15%)'
                ].map(evt => (
                  <button
                    key={evt}
                    type="button"
                    onClick={() => setSimEventFactor(evt)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      simEventFactor === evt
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {evt}
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Dynamic Results Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Simulated Demand</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{simComputed.predictedDemand}</div>
                <span className="text-[10px] text-slate-500 font-medium">Estimated eaters</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Prep Target</span>
                <div className="text-2xl font-black text-blue-900 mt-1">{simPrepMeals}</div>
                <span className="text-[10px] text-blue-700 font-medium">Planned batch</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Surplus</span>
                <div className="text-2xl font-black text-amber-700 mt-1">{simSurplusMeals} meals</div>
                <span className="text-[10px] text-amber-700 font-medium">{simSurplusMeals > 0 ? 'Unserved margin' : 'Zero Surplus'}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Waste Risk Level</span>
                <div className={`text-xl font-black mt-1 ${
                  simWasteRisk === 'CRITICAL' ? 'text-rose-700 animate-pulse' : simWasteRisk === 'MODERATE' ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {simWasteRisk}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Overproduction risk</span>
              </div>
            </div>

            {/* Cost & Operational Assessment */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Scenario Cost Variance vs AI Baseline (1,188 Meals):</span>
                <p className="text-slate-600 mt-0.5">
                  {simCostVariance === 0 ? 'Exact AI baseline alignment (₹0 variance)' : simCostVariance > 0 ? `+₹${simCostVariance.toLocaleString()} potential raw ingredient overspend` : `-₹${Math.abs(simCostVariance).toLocaleString()} expenditure reduction (monitor stockout risk)`}
                </p>
              </div>

              <button
                onClick={handleApplyWhatIf}
                className="px-6 py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                <span>Apply Scenario to Kitchen Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MODEL EXPLAINABILITY & WEIGHTS */}
      {activeSubTab === 'explainability' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Model Explainability & Feature Importance</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Transparent SHAP feature contributions determining the 1,188 meal recommendation for Wednesday lunch service.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { name: '1. Registered Hostel & Mess Attendance', weight: 48, desc: '1,200 active student & faculty biometric registrations on campus.', contribution: '+1,176 meals' },
                { name: '2. Day-of-Week Consumption Pattern (Wednesday)', weight: 22, desc: 'Historical Wednesday lunch attendance consistently dips by 2.1%.', contribution: '-25 meals' },
                { name: '3. Meteorological Radar & Rainfall Sensor', weight: 14, desc: 'Monsoon showers forecast causes 4.2% walk-in reduction to dining hall.', contribution: '-20 meals' },
                { name: '4. Academic Calendar & Exam Schedules', weight: 11, desc: 'Normal teaching week with no conflicting lab exams or off-campus trips.', contribution: '0 meals' },
                { name: '5. Calibrated Food Safety Stockout Buffer', weight: 5, desc: 'Calibrated buffer prevents hunger complaints while restricting surplus.', contribution: '+15 meals' }
              ].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{feat.name}</span>
                    <span className="font-mono font-bold text-emerald-800">{feat.contribution} ({feat.weight}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${feat.weight * 2}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-500">{feat.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Final Predictive Equation: </strong>
                <span>Recommended Prep = Base Headcount (1,200) - Weather &amp; Day Modifiers (45) + Calibrated Buffer (33) = 1,188 meals.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
