import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Users,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SecurityCompliance: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Security, Privacy & FSSAI Food Safety Compliance
          </h1>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            FSSAI Certified Framework
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Role-based access control, cryptographic verification, and strict adherence to food safety standards.
        </p>
      </div>

      {/* Grid of Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict isolation between Kitchen Managers, NGO Coordinators, and Ministry Administrators. Kitchen operators cannot modify NGO logs, and donors cannot tamper with consumption audit trails.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">FSSAI Hygiene Standards</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mandatory temperature logging for cooked food (above 65°C hot-holding) and automated expiration locking to eliminate risk of foodborne illnesses during donation.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Data Privacy & Minimal PII</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            No personal beneficiary identities are collected. Redistribution metrics record only anonymized portion quantities, dietary flags, and aggregate community counts.
          </p>
        </div>
      </div>

      {/* FSSAI Protocol Checklist */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3">FSSAI Safe Food Donation Checklist (Verified in Prototype)</h3>
        <div className="space-y-2.5 text-xs text-slate-700">
          {[
            'Temperature of hot-holding cooked food exceeds 65°C prior to vehicle handover',
            'Safe redistribution window dynamically calculated to prevent bacterial growth',
            'Insulated thermal containers used during electric cargo van transit',
            'Digital OTP handoff ensures verified chain of custody and zero leakage',
            'Surplus items exceeding time-temperature thresholds automatically flagged RED for compost conversion'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
