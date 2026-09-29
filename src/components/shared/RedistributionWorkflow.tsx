import React from 'react';
import {
  Route,
  CheckCircle2,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Truck,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RedistributionWorkflow: React.FC = () => {
  const { workflow, advanceWorkflowStage, resetWorkflow } = useApp();

  const stages = [
    { num: 1, title: 'Surplus Detected', desc: 'Kitchen flags 25 kg unserved rice & dal after lunch service.' },
    { num: 2, title: 'AI Urgency Assessed', desc: 'Logged at 68.4°C. System flags 52-minute safe window (Yellow).' },
    { num: 3, title: 'Suitable NGO Matched', desc: 'Algorithm selects Hope Foundation (2.4 km, 96% match).' },
    { num: 4, title: 'NGO Accepts Offer', desc: 'Coordinator confirms acceptance within 90 seconds.' },
    { num: 5, title: 'Pickup Scheduled', desc: 'Route locked for Electric Cargo Van DL-4C-8921 (ETA 18 min).' },
    { num: 6, title: 'Food Handover (OTP)', desc: 'Chef verifies OTP (ANNA-7429); temperature logged before transit.' },
    { num: 7, title: 'Delivery Confirmed', desc: 'Cargo van arrives safely at Hope Foundation shelter intake.' },
    { num: 8, title: 'Impact Recorded', desc: '72 meals served, 52.5 kg CO2 avoided, ESG audit sealed.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              End-to-End Redistribution Workflow
            </h1>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              Stage {workflow.stage} of 8
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Auditable lifecycle tracking food surplus from initial kitchen detection to community beneficiary receipt.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetWorkflow}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
          <button
            disabled={workflow.stage === 8}
            onClick={advanceWorkflowStage}
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Advance Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Stage Callout Card */}
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
              Active Stage: {workflow.stage} of 8
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {workflow.stageLabel}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Food: {workflow.foodItem} • Recipient: {workflow.ngoName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-emerald-200 px-3 py-1.5 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">VERIFICATION OTP</span>
              <span className="font-mono text-sm font-bold text-emerald-800">{workflow.otpCode}</span>
            </div>
            <div className="bg-white border border-emerald-200 px-3 py-1.5 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">BENEFICIARIES</span>
              <span className="font-bold text-sm text-slate-900">{workflow.quantityMeals} People</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Stage Timeline Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-6">Interactive 8-Stage Milestone Tracker</h3>
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-slate-200">
          {stages.map(st => {
            const isCompleted = workflow.stage >= st.num;
            const isCurrent = workflow.stage === st.num;

            return (
              <div key={st.num} className="relative flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all z-10 ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    st.num
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-emerald-900'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
