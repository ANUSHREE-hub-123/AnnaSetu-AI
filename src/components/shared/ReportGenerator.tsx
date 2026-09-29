import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportGenerator: React.FC = () => {
  const { impact, prediction, surplusList, wasteRecords } = useApp();
  const [reportType, setReportType] = useState('daily');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Audit & Sustainability Report Generator
            </h1>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              FSSAI & ESG Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Exportable regulatory reports for ministry compliance, carbon audit, and institutional records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex gap-2">
        {[
          { id: 'daily', label: 'Daily Waste & Redistribution Audit' },
          { id: 'weekly', label: 'Weekly Sustainability & ESG Summary' },
          { id: 'prediction', label: 'AI Forecasting Accuracy Benchmark' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => setReportType(r.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              reportType === r.id
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Realistic Printable Report Paper Preview */}
      <div className="rounded-2xl border border-slate-300 bg-white p-8 shadow-md max-w-4xl mx-auto space-y-6 text-slate-800 font-sans">
        {/* Report Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">AnnaSetu AI</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
              Official Food Loss & Redistribution Certificate
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Ministry of Food Processing Industries (MoFPI) Compliance Framework
            </p>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div><strong>Audit Date:</strong> September 26, 2026</div>
            <div><strong>Audit Reference:</strong> AS-2026-0926-7429</div>
            <div><strong>Institution:</strong> ABC Institutional Mess (Central Unit)</div>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Executive Summary</h4>
          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">TOTAL MEALS PREPARED</span>
              <span className="text-base font-extrabold text-slate-900">1,240</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">REDISTRIBUTED PORTIONS</span>
              <span className="text-base font-extrabold text-emerald-700">72 meals</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CO2e OFFSET</span>
              <span className="text-base font-extrabold text-indigo-700">52.5 kg</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">FSSAI SAFETY PASS</span>
              <span className="text-base font-extrabold text-emerald-800">100% Verified</span>
            </div>
          </div>
        </div>

        {/* Surplus Log Summary */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Surplus Handovers Conducted</h4>
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2">Batch Item</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Recipient Partner</th>
                <th className="p-2">Safe Window</th>
                <th className="p-2">Verification Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2 font-semibold">Cooked Rice + Dal Tadka + Seasonal Veg</td>
                <td className="p-2">25 kg (72 meals)</td>
                <td className="p-2 text-emerald-700 font-medium">Hope Foundation & Shelter Home</td>
                <td className="p-2">52 min safe window</td>
                <td className="p-2 font-mono font-bold">ANNA-7429 (Verified)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-600">
          <div>
            <div className="h-10 border-b border-slate-400 w-44" />
            <p className="mt-1 font-semibold text-slate-800">Chef Rajesh Sharma</p>
            <p className="text-[10px] text-slate-500">Head of Operations, ABC Mess</p>
          </div>
          <div>
            <div className="h-10 border-b border-slate-400 w-44" />
            <p className="mt-1 font-semibold text-slate-800">Meera Deshmukh</p>
            <p className="text-[10px] text-slate-500">Logistics Lead, Hope Foundation</p>
          </div>
        </div>
      </div>
    </div>
  );
};
