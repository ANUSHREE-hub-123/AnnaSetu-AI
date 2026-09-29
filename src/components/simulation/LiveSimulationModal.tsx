import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  CookingPot,
  PackageCheck,
  AlertTriangle,
  HeartHandshake,
  Truck,
  Leaf,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveSimulationModal: React.FC = () => {
  const { isSimulating, setIsSimulating, advanceWorkflowStage, resetWorkflow } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      num: 1,
      title: 'AI Predicts Meal Demand',
      desc: 'Expected mess attendance: 1,200 people. AI analyzes historical Wednesday rainy conditions and forecasts 1,175 meals (94.6% confidence).',
      metric: 'Demand: 1,175 meals',
      badge: 'Step 1: Predict',
      icon: <TrendingDown className="w-5 h-5 text-blue-600" />
    },
    {
      num: 2,
      title: 'Kitchen Prepares Recommended Batch',
      desc: 'Chef Rajesh adjusts preparation to recommended 1,190 meals, successfully avoiding 50 meals of excess overproduction before cooking starts.',
      metric: 'Overproduction Avoided: 50 meals',
      badge: 'Step 2: Prevent Waste',
      icon: <CookingPot className="w-5 h-5 text-emerald-600" />
    },
    {
      num: 3,
      title: 'Surplus Detected After Service',
      desc: 'Lunch service concludes at 1:45 PM. 25 kg cooked rice, dal tadka, and seasonal vegetables remain unserved in Bain-Marie hot warmers.',
      metric: 'Surplus: 25 kg (72 meals)',
      badge: 'Step 3: Detect',
      icon: <PackageCheck className="w-5 h-5 text-amber-600" />
    },
    {
      num: 4,
      title: 'AI Urgency & Safety Classification',
      desc: 'Temperature logged at 68.4°C. System marks item as URGENT (Yellow) with a safe redistribution window of 52 minutes.',
      metric: 'Window: 52 min | Temp: 68.4°C',
      badge: 'Step 4: Quality & Safety',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
    },
    {
      num: 5,
      title: 'AI Finds Optimal NGO Match',
      desc: 'Algorithm evaluates 6 nearby shelters. Hope Foundation (2.4 km away) matches at 96% based on current need (70 meals) and available vehicle.',
      metric: 'Hope Foundation (96% Match)',
      badge: 'Step 5: Smart Match',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />
    },
    {
      num: 6,
      title: 'Hope Foundation Accepts Donation',
      desc: 'Volunteer coordinator Meera Deshmukh confirms acceptance via NGO portal within 90 seconds of dispatch notification.',
      metric: 'Accepted in 90 sec',
      badge: 'Step 6: NGO Confirmation',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    },
    {
      num: 7,
      title: 'Electric Cargo Van Dispatched',
      desc: 'Van DL-4C-8921 departs with insulated thermal carriers. Real-time ETA calculates 18 minutes to kitchen loading dock.',
      metric: 'Pickup ETA: 18 minutes',
      badge: 'Step 7: Logistics Transit',
      icon: <Truck className="w-5 h-5 text-indigo-600" />
    },
    {
      num: 8,
      title: 'Verification OTP & Food Handover',
      desc: 'Chef enters verification code ANNA-7429. Digital handover sealed, batch temperature verified, and food dispatched to shelter home.',
      metric: 'OTP Verified: ANNA-7429',
      badge: 'Step 8: Secure Handover',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    },
    {
      num: 9,
      title: 'Community Served & Impact Recorded',
      desc: '72 vulnerable individuals fed nutritious meals. 52.5 kg CO2 avoided, 21,000 liters virtual water saved, and audit log permanently sealed.',
      metric: '+72 Beneficiaries | 52.5 kg CO2 Saved',
      badge: 'Step 9: Realized Impact',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />
    }
  ];

  useEffect(() => {
    if (!isSimulating || !isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < 9) {
        setCurrentStep(prev => prev + 1);
        advanceWorkflowStage();
      } else {
        setIsPlaying(false);
      }
    }, 3200);

    return () => clearTimeout(timer);
  }, [isSimulating, isPlaying, currentStep]);

  if (!isSimulating) return null;

  const currentStepData = steps[currentStep - 1];

  const handleRestart = () => {
    setCurrentStep(1);
    setIsPlaying(true);
    resetWorkflow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  AnnaSetu AI Live Ecosystem Simulation
                </h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Step {currentStep} of 9
                </span>
              </div>
              <p className="text-xs text-slate-500">
                End-to-end execution of the preloaded SIH 2026 hackathon scenario
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSimulating(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
            <span>PREDICT</span>
            <span>PREVENT</span>
            <span>DETECT</span>
            <span>MATCH</span>
            <span>REDISTRIBUTE</span>
            <span>IMPACT</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
              style={{ width: `${(currentStep / 9) * 100}%` }}
            />
          </div>
        </div>

        {/* Active Step Presentation Card */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3 shadow-md border border-emerald-100 flex-shrink-0">
              {currentStepData.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  {currentStepData.badge}
                </span>
                <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-700">
                  {currentStepData.metric}
                </span>
              </div>
              <h4 className="mt-1 text-lg font-bold text-slate-900">
                {currentStepData.title}
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {currentStepData.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Completed Message on Step 9 */}
        {currentStep === 9 && (
          <div className="mt-4 rounded-xl bg-emerald-100/70 border border-emerald-300 p-3.5 text-center">
            <p className="text-xs font-bold text-emerald-900">
              Simulation Completed Successfully! 🌟
            </p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Food waste was completely avoided through AI demand forecasting & timely redistribution to Hope Foundation.
            </p>
          </div>
        )}

        {/* Modal Controls */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </>
              )}
            </button>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Flow</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
            >
              Back
            </button>
            <button
              disabled={currentStep === 9}
              onClick={() => {
                setCurrentStep(prev => Math.min(9, prev + 1));
                advanceWorkflowStage();
              }}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-colors shadow-sm"
            >
              {currentStep === 9 ? 'Finished' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
