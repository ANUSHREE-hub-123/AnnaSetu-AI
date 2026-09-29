import React from 'react';
import {
  Route,
  CheckCircle2,
  Clock,
  Truck,
  Building,
  Users,
  ShieldCheck,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RedistributionTracker: React.FC = () => {
  const { redistributionTrack, markCollected, markDelivered, resetRedistribution } = useApp();

  const isDelivered = redistributionTrack.status === 'DELIVERED';
  const isCollected = redistributionTrack.status === 'COLLECTED';
  const isScheduled = redistributionTrack.status === 'PICKUP SCHEDULED' || redistributionTrack.status === 'NGO MATCHED' || redistributionTrack.status === 'SURPLUS DETECTED';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Redistribution Route</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time delivery verification from kitchen loading dock to community shelter.
          </p>
        </div>

        <button
          onClick={resetRedistribution}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center gap-1 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Route</span>
        </button>
      </div>

      {/* Main Status Stepper Card */}
      <div className="rounded-2xl border-2 border-emerald-400 bg-white p-6 shadow-sm space-y-6">
        {/* Status Pills */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className={`p-2.5 rounded-xl border ${
            isScheduled || isCollected || isDelivered ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 text-slate-400'
          }`}>
            1. Pickup Scheduled
          </div>
          <div className={`p-2.5 rounded-xl border ${
            isCollected || isDelivered ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}>
            2. Food Collected (OTP)
          </div>
          <div className={`p-2.5 rounded-xl border ${
            isDelivered ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}>
            3. Delivered & Impact Recorded
          </div>
        </div>

        {/* Route Details Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-semibold text-[10px]">ORIGIN KITCHEN</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">{redistributionTrack.origin}</span>
            <span className="text-slate-500">Food: {redistributionTrack.surplusFood}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold text-[10px]">RECIPIENT SHELTER</span>
            <span className="font-bold text-emerald-800 text-sm mt-0.5 block">{redistributionTrack.destination}</span>
            <span className="text-slate-500">Driver: {redistributionTrack.driverName} ({redistributionTrack.vehicleNumber})</span>
          </div>
        </div>

        {/* Verification OTP Box */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Chef Handover Verification OTP</span>
            <div className="font-mono text-xl font-black text-emerald-900">{redistributionTrack.handoverOtp}</div>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-500 block">Temperature Log</span>
            <span className="font-bold text-slate-900">{redistributionTrack.temperatureAtHandover}°C (FSSAI Pass)</span>
          </div>
        </div>

        {/* PRIMARY WORKFLOW BUTTON */}
        <div className="pt-2">
          {isScheduled && (
            <button
              onClick={markCollected}
              className="w-full py-4 rounded-xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Mark Collected (Verify Handover)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isCollected && (
            <button
              onClick={markDelivered}
              className="w-full py-4 rounded-xl text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Mark Delivered to Hope Foundation</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}

          {isDelivered && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-center space-y-1">
              <div className="text-emerald-900 font-black text-sm flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Delivery Completed Successfully!</span>
              </div>
              <p className="text-xs text-emerald-800">
                +30 meals delivered to beneficiaries • 25 kg food saved • Impact ledger permanently sealed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
