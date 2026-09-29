import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Truck,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CountdownTimer } from '../common/CountdownTimer';

export const NGODashboard: React.FC = () => {
  const { workflow, advanceWorkflowStage, impact } = useApp();
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [driverAssigned, setDriverAssigned] = useState(true);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim().toUpperCase() === workflow.otpCode) {
      setOtpVerified(true);
      advanceWorkflowStage();
    } else {
      alert(`Invalid OTP. Please enter ${workflow.otpCode} for demo verification.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              NGO Redistribution Portal
            </h1>
            <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              Community Partner View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hope Foundation & Shelter Home • Sector 58 Cluster • Daily Beneficiaries: 140
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Daily Need Status</span>
            <span className="text-xs font-bold text-emerald-800">70 / 140 Meals Met</span>
          </div>
        </div>
      </div>

      {/* Incoming Donation Offer Card */}
      <div className="rounded-2xl border-2 border-emerald-400 bg-white p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg">
          AI Priority Match (96% Compatibility)
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                SURPLUS BATCH AWAITING ACCEPTANCE
              </span>
              <span className="text-xs text-slate-500">• From {workflow.institutionName}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {workflow.foodItem}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Feeds: {workflow.quantityMeals} People</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Distance: 2.4 km (Sector 62 Mess)</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-slate-400" />
                <span>Pickup ETA: ~18 mins</span>
              </div>
            </div>
          </div>

          {/* Action Handlers based on Stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CountdownTimer initialMinutes={52} isUrgent={true} />

            {workflow.stage <= 3 && (
              <div className="flex gap-2">
                <button
                  onClick={advanceWorkflowStage}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  Accept Donation
                </button>
                <button
                  onClick={() => alert('Donation declined. Offer routed to secondary partner.')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Decline
                </button>
              </div>
            )}

            {workflow.stage === 4 && (
              <button
                onClick={advanceWorkflowStage}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Truck className="w-4 h-4" />
                <span>Dispatch Cargo Van</span>
              </button>
            )}

            {workflow.stage >= 5 && workflow.stage < 7 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-200">
                  Vehicle En Route
                </span>
                <button
                  onClick={advanceWorkflowStage}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                >
                  Confirm Arrival
                </button>
              </div>
            )}

            {workflow.stage >= 7 && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Donation Received</span>
              </span>
            )}
          </div>
        </div>

        {/* Handover OTP Verification Box (Stages 5-6) */}
        {workflow.stage >= 5 && workflow.stage < 8 && (
          <div className="mt-5 pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-emerald-600" />
                <span>FSSAI Handover OTP Verification</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Driver must provide verification OTP to Kitchen Chef during loading.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center font-mono text-sm font-extrabold bg-white border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-lg shadow-2xs">
                OTP: {workflow.otpCode}
              </div>

              {workflow.stage === 6 && (
                <button
                  onClick={advanceWorkflowStage}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Verify Handover
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid: Logistics & Volunteer Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logistics & Vehicle Telemetry */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-indigo-600" />
            <span>Assigned Transport Unit</span>
          </h4>

          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle Type</span>
              <span className="font-semibold text-slate-800">Electric Cargo Van (DL-4C-8921)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Driver</span>
              <span className="font-semibold text-slate-800">Rameshwar Yadav (+91 98231 00921)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Thermal Insulation</span>
              <span className="font-semibold text-emerald-700">Active Hot Bags Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transit Status</span>
              <span className="font-semibold text-indigo-700">{workflow.stageLabel}</span>
            </div>
          </div>
        </div>

        {/* Shelter Beneficiary Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Shelter Beneficiary Distribution</span>
          </h4>

          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Community</span>
              <span className="font-semibold text-slate-800">Night Shelter Residents & Children</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Meal Service</span>
              <span className="font-semibold text-slate-800">6:30 PM Dinner Batch</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nutritional Quality</span>
              <span className="font-semibold text-emerald-700">Rice, Protein Dal & Green Veg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Monthly Food Received</span>
              <span className="font-semibold text-slate-900">1,420 meals from AnnaSetu network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
