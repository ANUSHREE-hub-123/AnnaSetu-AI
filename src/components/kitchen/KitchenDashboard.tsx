import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KitchenDashboard: React.FC = () => {
  const {
    prediction,
    journeyStage,
    applyPrepRecommendation,
    detectSurplus,
    acceptAndSchedulePickup,
    markCollected,
    markDelivered,
    resetJourney,
    setActiveTab
  } = useApp();

  const [showWhySection, setShowWhySection] = useState(false);

  const timelineSteps = [
    { label: 'Demand predicted', done: true, current: journeyStage === 'PREP_PENDING' },
    { label: 'Preparation recommended', done: journeyStage !== 'PREP_PENDING', current: journeyStage === 'PREP_CONFIRMED' },
    { label: 'Surplus detected', done: ['SURPLUS_DETECTED', 'PICKUP_SCHEDULED', 'COLLECTED', 'DELIVERED'].includes(journeyStage), current: journeyStage === 'SURPLUS_DETECTED' },
    { label: 'NGO matched', done: ['PICKUP_SCHEDULED', 'COLLECTED', 'DELIVERED'].includes(journeyStage), current: journeyStage === 'PICKUP_SCHEDULED' },
    { label: 'Pickup scheduled', done: ['COLLECTED', 'DELIVERED'].includes(journeyStage), current: journeyStage === 'COLLECTED' },
    { label: 'Redistributed', done: journeyStage === 'DELIVERED', current: journeyStage === 'DELIVERED' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ABC Central Mess • Today's Command Center
        </span>
        <button
          onClick={resetJourney}
          className="hover:text-slate-800 flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo Journey</span>
        </button>
      </div>

      {/* 1. TOP SECTION: TODAY'S AI RECOMMENDATION */}
      <section className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
              Today's AI Recommendation
            </span>

            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Prepare {prediction.recommendedPreparation} meals
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
              <span>Expected attendance: <strong className="text-slate-800">{prediction.expectedAttendance.toLocaleString()}</strong></span>
              <span>•</span>
              <span>AI confidence: <strong className="text-emerald-700">{prediction.confidenceScore}%</strong></span>
              <span>•</span>
              <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                Potential waste avoided: {prediction.potentialWasteAvoidedKg} kg
              </span>
            </div>
          </div>

          <button
            onClick={applyPrepRecommendation}
            disabled={journeyStage !== 'PREP_PENDING'}
            className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-sm ${
              journeyStage !== 'PREP_PENDING'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {journeyStage !== 'PREP_PENDING' ? (
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
        </div>

        {/* 3. EXPANDABLE “Why this recommendation?” SECTION */}
        <div className="mt-4 pt-3 border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <button
            onClick={() => setShowWhySection(!showWhySection)}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 transition-colors"
          >
            <span>Why this recommendation?</span>
            {showWhySection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
          >
            <span>Open Advanced Planner & 7-Day Model</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {showWhySection && (
          <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fade-in">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Historical Demand</span>
              <p className="text-slate-700 mt-0.5 font-medium">Average 1,180 meals on rainy Wednesdays in past 6 weeks.</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Expected Attendance</span>
              <p className="text-slate-700 mt-0.5 font-medium">1,200 students & staff active on campus today.</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Typical Surplus</span>
              <p className="text-slate-700 mt-0.5 font-medium">15–20 meals surplus under uncalibrated static prep.</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Relevant Meal Pattern</span>
              <p className="text-slate-700 mt-0.5 font-medium">4.2% dip during monsoon showers; 15-meal safety buffer added.</p>
            </div>
          </div>
        )}
      </section>

      {/* URGENT SURPLUS SPOTLIGHT CARD */}
      <section className="rounded-2xl border-2 border-rose-300 bg-gradient-to-r from-rose-50/90 via-amber-50/70 to-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-200 px-2 py-0.5 rounded">
                Urgent Surplus Detected
              </span>
              <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>41 mins remaining</span>
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              27 Meals Ready for Redistribution
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Cooked Rice + Dal Tadka • Held at <strong className="text-slate-900">68.4°C</strong> in Bain-Marie warmer (Probe #SN-774).
            </p>
            <p className="text-xs text-emerald-800 font-semibold mt-1">
              Top Match: <strong>Hope Foundation</strong> (96% Match • 2.4 km • Van ETA 18 min)
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
            <button
              onClick={() => acceptAndSchedulePickup('Hope Foundation & Shelter Home')}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all hover:scale-[1.02]"
            >
              Redistribute Now
            </button>
            <button
              onClick={() => setActiveTab('surplus')}
              className="text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              View Full Surplus & Sensors →
            </button>
          </div>
        </div>
      </section>

      {/* 2. NEXT ACTION CARD (CHANGES DYNAMICALLY WITH STATE) */}
      <section className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
            Next Action Required
          </span>
          <span className="text-xs text-amber-800 font-semibold">• AnnaSetu Decision Flow</span>
        </div>

        {journeyStage === 'PREP_PENDING' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Confirm preparation quantity</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Lock in 1,188 meals for today's lunch to prevent 18 kg overproduction before cooking fires.
              </p>
            </div>
            <button
              onClick={applyPrepRecommendation}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex-shrink-0"
            >
              Confirm 1,188 Meals
            </button>
          </div>
        )}

        {journeyStage === 'PREP_CONFIRMED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Kitchen cooking underway (1,215 actual prep)</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Once lunch concludes, detect remaining unserved trays to verify safe redistribution window.
              </p>
            </div>
            <button
              onClick={detectSurplus}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex-shrink-0"
            >
              Lunch Over: Detect Surplus (27 meals)
            </button>
          </div>
        )}

        {journeyStage === 'SURPLUS_DETECTED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Redistribute 27 surplus meals</h3>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.2 rounded-full">
                  41 min window left
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Best NGO matched: <strong>Hope Foundation</strong> (96% match, 2.4 km away, van ready).
              </p>
            </div>
            <button
              onClick={() => acceptAndSchedulePickup('Hope Foundation & Shelter Home')}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex-shrink-0"
            >
              Accept Match & Schedule Pickup
            </button>
          </div>
        )}

        {journeyStage === 'PICKUP_SCHEDULED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Electric Cargo Van DL-4C-8921 Arrived</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Driver Rameshwar Yadav at Loading Dock A. Handover OTP: <strong className="font-mono text-emerald-800">ANNA-7429</strong> (Temp: 68.4°C).
              </p>
            </div>
            <button
              onClick={markCollected}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex-shrink-0"
            >
              Mark Collected (Verify OTP)
            </button>
          </div>
        )}

        {journeyStage === 'COLLECTED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">In Transit to Hope Foundation Shelter</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                27 meals in insulated thermal carrier. 2.4 km distance. ETA: 8 minutes.
              </p>
            </div>
            <button
              onClick={markDelivered}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex-shrink-0"
            >
              Mark Delivered
            </button>
          </div>
        )}

        {journeyStage === 'DELIVERED' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-base">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>27 Meals Successfully Delivered!</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Received by Hope Foundation. Impact ledger sealed (+27 meals, +47.6 kg CO2 avoided).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('impact')}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex-shrink-0"
            >
              View Updated Impact
            </button>
          </div>
        )}
      </section>

      {/* 4. TODAY'S FOOD STATUS CARD */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
          Today's Food Status
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Demand</span>
            <div className="text-xl font-black text-slate-900 mt-0.5">{prediction.recommendedPreparation}</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">AI Calibrated</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Preparation</span>
            <div className="text-xl font-black text-blue-900 mt-0.5">{prediction.actualPreparation}</div>
            <span className="text-[10px] text-slate-500 font-medium block">Actual Prepped</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Waste</span>
            <div className="text-xl font-black text-rose-700 mt-0.5">14 kg</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">Down 18%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Surplus</span>
            <div className="text-xl font-black text-amber-700 mt-0.5">27 meals</div>
            <span className="text-[10px] text-amber-800 font-semibold block">In Safe Warmer</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Redistribution</span>
            <div className="text-xl font-black text-purple-700 mt-0.5">27 meals</div>
            <span className={`text-[10px] font-bold block ${
              journeyStage === 'DELIVERED' ? 'text-emerald-700' : 'text-blue-700'
            }`}>
              {journeyStage === 'DELIVERED' ? '✓ Delivered' : journeyStage === 'COLLECTED' ? 'In Transit' : 'Scheduled'}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 font-medium">Batch Basis: 1,215 Actual Prep • 14 kg plate residue</span>
          <button
            onClick={() => setActiveTab('waste')}
            className="text-emerald-700 font-bold hover:text-emerald-900 flex items-center gap-1 hover:underline"
          >
            <span>View Waste Intelligence & Hotspots</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* 5. VISUAL TODAY TIMELINE */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
          Today's Operational Timeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                step.done
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                  : step.current
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-black animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {step.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                )}
              </div>
              <span className="block text-[11px] leading-tight">{step.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ANNASETU DAILY BRIEF */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
          AnnaSetu Daily Brief
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">💡 Biggest Savings Opportunity Today</span>
            <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
              Calibrated 160g ladles avoid 18 kg overproduction and save ₹920 on rice plate waste.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">⚠️ Expected Peak Waste Risk</span>
            <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
              Post-lunch 1:30 PM plate residue window; monitor dal and rice counter batches closely.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">🤝 Redistribution Readiness</span>
            <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
              Hope Foundation van on standby; thermal carrier active at 68°C with verified FSSAI hygiene pass.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
