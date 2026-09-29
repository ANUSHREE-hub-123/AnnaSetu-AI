import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Building,
  Bell,
  Sliders,
  Save,
  CheckCircle2,
  Clock,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Settings: React.FC = () => {
  const { kitchenSettings, updateKitchenSettings } = useApp();
  const [form, setForm] = useState({ ...kitchenSettings });
  const [savedToast, setSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateKitchenSettings(form);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Kitchen Configuration & Compliance
            </h1>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              FSSAI Aligned
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure dynamic thresholds, kitchen capacity, automated redistribution rules, and compliance profiles.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Kitchen Profile & FSSAI Verification */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Building className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Institutional Facility Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kitchen Unit Name</label>
              <input
                type="text"
                value={form.kitchenName}
                onChange={e => setForm({ ...form, kitchenName: e.target.value })}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Address / Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">FSSAI License / Registration No.</label>
              <div className="relative">
                <input
                  type="text"
                  value={form.fssaiNumber}
                  onChange={e => setForm({ ...form, fssaiNumber: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono text-slate-800 focus:outline-emerald-500"
                  required
                />
                <ShieldCheck className="w-4 h-4 text-emerald-600 absolute right-2.5 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Production & Buffer Controls */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Operational Capacity & Safety Buffers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Max Kitchen Capacity (Meals/Service)</label>
                <span className="text-xs font-bold text-slate-900">{form.maxCapacity} meals</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="50"
                value={form.maxCapacity}
                onChange={e => setForm({ ...form, maxCapacity: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Limits AI bulk forecast and raw ingredient recommendations to cooking kettle limits.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Production Safety Buffer (%)</label>
                <span className="text-xs font-bold text-slate-900">{form.safetyBufferPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={form.safetyBufferPercent}
                onChange={e => setForm({ ...form, safetyBufferPercent: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Extra prep percentage added to baseline AI demand predictions for walk-ins and emergencies.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Safety Thresholds & Partner Routing */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Clock className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">Surplus Urgency & Partner Routing Thresholds</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Urgent Redistribution Warning (Minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="15"
                  max="120"
                  value={form.urgentThresholdMins}
                  onChange={e => setForm({ ...form, urgentThresholdMins: Number(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-emerald-500"
                />
                <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-semibold">mins remaining</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Triggers Yellow status and NGO dispatcher ping.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Critical Window Expiry (Minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="45"
                  value={form.criticalThresholdMins}
                  onChange={e => setForm({ ...form, criticalThresholdMins: Number(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-emerald-500"
                />
                <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-semibold">mins remaining</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Triggers Red pulse, driver alert, and auto-dispatch.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Redistribution Partner
              </label>
              <select
                value={form.defaultNgoPartner}
                onChange={e => setForm({ ...form, defaultNgoPartner: e.target.value })}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-emerald-500"
              >
                <option value="Hope Foundation Shelter">Hope Foundation Shelter (2.4 km)</option>
                <option value="Annapoorna Seva Trust">Annapoorna Seva Trust (3.8 km)</option>
                <option value="Feeding India Noida Unit">Feeding India Noida Unit (4.2 km)</option>
                <option value="Robin Hood Army Kitchens">Robin Hood Army Kitchens (5.1 km)</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">Pre-selected partner for 1-click surplus dispatches.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Compliance & Notification Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Award className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Food Safety Compliance Standard</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="complianceStandard"
                  checked={form.complianceStandard === 'FSSAI_STANDARD'}
                  onChange={() => setForm({ ...form, complianceStandard: 'FSSAI_STANDARD' })}
                  className="mt-0.5 accent-emerald-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800">FSSAI Standard (4-Hour Hot/Cold Chain)</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Maintains hot-holding above 65°C and refrigerated items below 5°C with a 4-hour redistribution ceiling.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="complianceStandard"
                  checked={form.complianceStandard === 'STRICT_HAACP'}
                  onChange={() => setForm({ ...form, complianceStandard: 'STRICT_HAACP' })}
                  className="mt-0.5 accent-emerald-600"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800">Strict HACCP / ISO 22000 Protocol</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Enforces 2-hour rapid cool/serve cycle with mandatory dual-OTP digital sensor verification.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Bell className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Real-Time Operational Alerts</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-700">Urgent Safe Window SMS & WhatsApp Alerts</span>
                <input
                  type="checkbox"
                  checked={form.notificationsEnabled}
                  onChange={e => setForm({ ...form, notificationsEnabled: e.target.checked })}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-700">Automated PO Dispatch to Verified Vendors</span>
                <input
                  type="checkbox"
                  checked={form.autoOrderCriticalProcurement}
                  onChange={e => setForm({ ...form, autoOrderCriticalProcurement: e.target.checked })}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
              </label>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-700">Digital Audit Trail:</span> All threshold modifications are immutably logged with timestamp, user role, and hash ID for monthly compliance reports.
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
