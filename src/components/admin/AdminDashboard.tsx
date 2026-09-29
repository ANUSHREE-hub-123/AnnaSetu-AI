import React from 'react';
import {
  ShieldCheck,
  Building,
  HeartHandshake,
  Trash2,
  Leaf,
  Route,
  TrendingDown,
  ArrowUpRight,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SimulatedRouteMap } from './SimulatedRouteMap';

export const AdminDashboard: React.FC = () => {
  const { impact, setActiveTab } = useApp();

  const ecosystemKPIs = [
    { label: 'Registered Institutions', val: impact.totalInstitutions.toString(), sub: 'University & Corporate Messes', icon: <Building className="w-4 h-4 text-emerald-700" /> },
    { label: 'Verified NGO Partners', val: impact.totalNGOs.toString(), sub: 'With active pickup logistics', icon: <HeartHandshake className="w-4 h-4 text-amber-700" /> },
    { label: 'Food Waste Diverted', val: `${impact.foodSavedKgMonth} kg`, sub: 'Saved this cycle', icon: <Trash2 className="w-4 h-4 text-rose-700" /> },
    { label: 'Meals Redistributed', val: impact.mealsSavedMonth.toLocaleString(), sub: 'Nutritious meals delivered', icon: <Leaf className="w-4 h-4 text-teal-700" /> },
    { label: 'CO₂ Emissions Offset', val: `${impact.co2AvoidedTons} tons`, sub: 'Environmental compliance', icon: <ShieldCheck className="w-4 h-4 text-indigo-700" /> },
    { label: 'Active Transit Dispatches', val: impact.activeRedistributions.toString(), sub: 'Real-time routes in flight', icon: <Route className="w-4 h-4 text-blue-700" /> }
  ];

  const institutionsTable = [
    { name: 'ABC Institutional Mess (Central Unit)', type: 'University', mealsRedist: '1,280', wasteAvoided: '320 kg', compliance: '98.5% (A+)' },
    { name: 'Knowledge Park Cafeteria 2', type: 'Tech Campus', mealsRedist: '940', wasteAvoided: '240 kg', compliance: '96.2% (A)' },
    { name: 'Metro Health Hospital Kitchen', type: 'Healthcare', mealsRedist: '1,120', wasteAvoided: '310 kg', compliance: '99.1% (A+)' },
    { name: 'Green Valley Food Processing Unit', type: 'Processing', mealsRedist: '1,280', wasteAvoided: '414 kg', compliance: '94.0% (B+)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              MoFPI National Ecosystem Overview
            </h1>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full border border-indigo-300">
              Ministry Administrator
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated real-time oversight of institutional food waste prevention and redistribution across regional clusters.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('reports')}
          className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
        >
          Export Ministry Audit Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ecosystemKPIs.map((kpi, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[11px] font-semibold text-slate-500 truncate">{kpi.label}</span>
              <div className="p-1 rounded bg-slate-50">{kpi.icon}</div>
            </div>
            <div className="mt-2 text-xl font-extrabold text-slate-900 tracking-tight">{kpi.val}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Live Route Dispatch Map */}
      <SimulatedRouteMap />

      {/* Institutional Compliance Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Institutional Kitchen Performance & FSSAI Compliance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Institution</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Meals Saved</th>
                <th className="py-2.5 px-3">Food Diverted</th>
                <th className="py-2.5 px-3">FSSAI Hygiene & Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {institutionsTable.map((inst, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-800">{inst.name}</td>
                  <td className="py-3 px-3 text-slate-600">{inst.type}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">{inst.mealsRedist} meals</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{inst.wasteAvoided}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">{inst.compliance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
