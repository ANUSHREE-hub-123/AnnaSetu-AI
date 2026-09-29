import React, { useState } from 'react';
import {
  Route,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  ArrowRight,
  RotateCcw,
  MapPin,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Info,
  Navigation,
  Building,
  Users,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RedistributeView: React.FC = () => {
  const {
    ngos,
    journeyStage,
    acceptAndSchedulePickup,
    markCollected,
    markDelivered,
    redistributionTrack,
    resetJourney,
    setActiveTab
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'matching' | 'tracking'>('matching');
  const [showFormulaDetails, setShowFormulaDetails] = useState(true);

  const topNgo = ngos[0]; // Hope Foundation (96% match)

  // 6-step lifecycle stages
  const workflowStages = [
    { id: 1, label: 'Kitchen Surplus Detected', active: true, done: true },
    { id: 2, label: 'AI NGO Matched', active: true, done: true },
    { id: 3, label: 'Pickup Scheduled', active: ['PICKUP_SCHEDULED', 'COLLECTED', 'DELIVERED'].includes(journeyStage), done: ['PICKUP_SCHEDULED', 'COLLECTED', 'DELIVERED'].includes(journeyStage) },
    { id: 4, label: 'Collected (OTP ANNA-7429)', active: ['COLLECTED', 'DELIVERED'].includes(journeyStage), done: ['COLLECTED', 'DELIVERED'].includes(journeyStage) },
    { id: 5, label: 'Delivered to Shelter', active: journeyStage === 'DELIVERED', done: journeyStage === 'DELIVERED' },
    { id: 6, label: 'Community Served', active: journeyStage === 'DELIVERED', done: journeyStage === 'DELIVERED' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Redistribution & Shelter Logistics</h1>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Autonomous Dispatch
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent multi-criteria NGO matching algorithms and live GPS cold/hot chain route tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTabSub('matching')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTabSub === 'matching'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explainable NGO Matching</span>
            </button>
            <button
              onClick={() => setActiveTabSub('tracking')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTabSub === 'tracking'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Route Tracker & Map</span>
            </button>
          </div>

          <button
            onClick={resetJourney}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EXPLAINABLE NGO MATCHING */}
      {activeTabSub === 'matching' && (
        <div className="space-y-6">
          {/* TOP RECOMMENDED CARD */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 fill-current" />
                    Recommended by AnnaSetu AI
                  </span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {topNgo.matchScore}% Optimal Match
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900">{topNgo.name}</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {topNgo.location} • Lead: {topNgo.contactPerson} ({topNgo.phone})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  ✓ FSSAI Hot-Holding Certified
                </span>
              </div>
            </div>

            {/* Key Fact Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Distance</span>
                <span className="font-black text-slate-900 text-base mt-0.5 block">{topNgo.distanceKm} km</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Closest shelter hub</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Required</span>
                <span className="font-black text-slate-900 text-base mt-0.5 block">{topNgo.requiredMeals} meals</span>
                <span className="text-[10px] text-slate-500">Perfect batch absorption</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Capacity</span>
                <span className="font-black text-slate-900 text-base mt-0.5 block">{topNgo.currentCapacityMeals} meals</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Safe thermal storage</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Pickup Availability</span>
                <span className="font-black text-emerald-700 text-base mt-0.5 block">Van Ready</span>
                <span className="text-[10px] text-slate-500">Electric Cargo Van</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Estimated Arrival</span>
                <span className="font-black text-slate-900 text-base mt-0.5 block">{topNgo.estimatedPickupMinutes} min</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Under 41m deadline</span>
              </div>
            </div>

            {/* “WHY THIS MATCH?” TRANSPARENT WEIGHTED SCORING BREAKDOWN */}
            <div className="rounded-xl border border-emerald-200 bg-white p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Why this match? • Multi-Factor Scoring Breakdown
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    Σ(wi × si) = 96.5%
                  </span>
                </div>
                <button
                  onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  <span>{showFormulaDetails ? 'Hide Weights' : 'Show Weights'}</span>
                  {showFormulaDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showFormulaDetails && (
                <div className="space-y-2.5 text-xs">
                  {[
                    { factor: '1. Distance Proximity', weight: '25%', score: '96 / 100', contrib: '+24.0%', desc: '2.4 km distance fits well within the 3.0 km rapid dispatch perimeter.' },
                    { factor: '2. Dietary & Food Compatibility', weight: '25%', score: '100 / 100', contrib: '+25.0%', desc: '100% vegetarian, warm cooked grain & dal meal criteria fully aligned.' },
                    { factor: '3. Safe Storage Capacity', weight: '20%', score: '92 / 100', contrib: '+18.4%', desc: 'Shelter capacity of 72 meals easily absorbs the incoming 27 meal lot.' },
                    { factor: '4. Pickup Logistics & EV Status', weight: '20%', score: '98 / 100', contrib: '+19.6%', desc: 'Electric Cargo Van DL-4C-8921 active and standing by at Sector 58.' },
                    { factor: '5. Time Window & Urgency Fit', weight: '10%', score: '95 / 100', contrib: '+9.5%', desc: '18 min pickup ETA provides 23-minute safety buffer before expiry.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">{item.factor}</strong>
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">Weight: {item.weight}</span>
                          <span className="font-mono text-slate-500">Score: {item.score}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <span className="font-mono font-black text-emerald-800 text-sm flex-shrink-0">{item.contrib}</span>
                    </div>
                  ))}

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between font-bold">
                    <span>Final Weighted Match Score:</span>
                    <span className="font-mono text-base font-black text-emerald-800">96.5% (~96% Match)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-500 font-medium">
                Surplus Batch: <strong>27 meals</strong> • Safe window: <strong>41 min</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    acceptAndSchedulePickup(topNgo.name);
                    setActiveTabSub('tracking');
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Accept Match & Schedule Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* OTHER VERIFIED NGOS FOR COMPARISON */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Other Verified Shelters in Vicinity</h3>
            <div className="space-y-2.5">
              {ngos.slice(1).map(ngo => (
                <div
                  key={ngo.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-sm">{ngo.name}</strong>
                      <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.2 rounded-full">{ngo.matchScore}% Match</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      {ngo.location} • {ngo.distanceKm} km away • Requires {ngo.requiredMeals} meals • Capacity: {ngo.currentCapacityMeals}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      acceptAndSchedulePickup(ngo.name);
                      setActiveTabSub('tracking');
                    }}
                    className="px-4 py-2 rounded-lg font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
                  >
                    Select Alternative
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: REDISTRIBUTION TRACKING & ROUTE MAP */}
      {activeTabSub === 'tracking' && (
        <div className="space-y-6">
          {/* 6-STEP WORKFLOW STEPPER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Redistribution Lifecycle Workflow
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {workflowStages.map(st => (
                <div
                  key={st.id}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    st.done
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                      : st.active
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-black animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {st.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">0{st.id}</span>
                    )}
                  </div>
                  <span className="block text-[11px] leading-tight">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VISUAL MAP-STYLE ROUTE CANVAS */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-slate-900 text-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Live Route Telemetry: Kitchen Loading Dock A $\rightarrow$ Hope Foundation</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-400 font-mono font-bold">GPS Tracking Active</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">Distance: 2.4 km</span>
              </div>
            </div>

            {/* Stylized SVG Map Route */}
            <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid Pattern */}
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* City Blocks / Roads */}
                <path d="M 50 120 L 220 120 L 350 70 L 480 160 L 650 160" stroke="#334155" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 220 40 L 220 200" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                <path d="M 480 40 L 480 200" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />

                {/* Animated Route Polyline */}
                <path
                  d="M 50 120 L 220 120 L 350 70 L 480 160 L 650 160"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                />

                {/* Origin: ABC Central Kitchen */}
                <g transform="translate(40, 95)">
                  <circle cx="15" cy="15" r="18" fill="#047857" opacity="0.3" className="animate-ping" />
                  <circle cx="15" cy="15" r="12" fill="#10b981" />
                  <text x="15" y="42" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">ABC Kitchen (Dock A)</text>
                </g>

                {/* Moving Van Position */}
                <g transform={
                  journeyStage === 'DELIVERED'
                    ? 'translate(640, 135)'
                    : journeyStage === 'COLLECTED'
                    ? 'translate(340, 50)'
                    : 'translate(100, 100)'
                }>
                  <circle cx="15" cy="15" r="14" fill="#3b82f6" />
                  <Truck x="6" y="6" width="18" height="18" stroke="#ffffff" fill="#ffffff" />
                  <text x="15" y="-6" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {journeyStage === 'DELIVERED' ? 'Arrived' : 'Van DL-4C-8921'}
                  </text>
                </g>

                {/* Destination: Hope Foundation */}
                <g transform="translate(635, 135)">
                  <circle cx="15" cy="15" r="18" fill="#e11d48" opacity="0.3" />
                  <circle cx="15" cy="15" r="12" fill="#f43f5e" />
                  <text x="15" y="42" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">Hope Foundation</text>
                </g>
              </svg>

              {/* In-Transit Telemetry Overlay Box */}
              <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 backdrop-blur-xs p-3 rounded-xl text-xs space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Driver:</span>
                  <strong className="text-white">Rameshwar Yadav (+91 98110-44912)</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Insulated Box Temp:</span>
                  <strong className="text-emerald-400 font-mono">67.8°C (Verified Safe)</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Vehicle Speed:</span>
                  <strong className="text-white font-mono">24 km/h</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Current Status:</span>
                  <strong className="text-amber-400">
                    {journeyStage === 'DELIVERED' ? 'Delivered & Confirmed' : journeyStage === 'COLLECTED' ? 'In Transit to Shelter' : 'At Loading Dock'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Handover OTP & Interactive Status Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Chef Handover OTP Verification</span>
                  <span className="font-mono text-xl font-black text-emerald-400 tracking-wider">
                    {redistributionTrack.handoverOtp}
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  FSSAI Compliant Handover
                </span>
              </div>

              <div className="flex items-center">
                {journeyStage !== 'PICKUP_SCHEDULED' && journeyStage !== 'COLLECTED' && journeyStage !== 'DELIVERED' && (
                  <button
                    onClick={() => acceptAndSchedulePickup(topNgo.name)}
                    className="w-full py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Schedule Pickup with Hope Foundation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {journeyStage === 'PICKUP_SCHEDULED' && (
                  <button
                    onClick={markCollected}
                    className="w-full py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Mark Collected (Verify Handover OTP: ANNA-7429)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {journeyStage === 'COLLECTED' && (
                  <button
                    onClick={markDelivered}
                    className="w-full py-3 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Mark Delivered to Hope Foundation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {journeyStage === 'DELIVERED' && (
                  <button
                    onClick={() => setActiveTab('impact')}
                    className="w-full py-3 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Redistribution Complete! View Live Impact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
