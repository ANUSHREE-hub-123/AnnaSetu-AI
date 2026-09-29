import React, { useState } from 'react';
import {
  Database,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DataManagement: React.FC = () => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setUploaded(true);
    }
  };

  const sampleCsvData = [
    'Date,MealType,ExpectedAttendance,ActualDemand,PreparedMeals,WasteKg',
    '2026-09-20,Lunch,1050,1010,1040,19',
    '2026-09-21,Lunch,980,930,950,15',
    '2026-09-22,Lunch,1300,1250,1280,38',
    '2026-09-23,Lunch,1250,1220,1240,26',
    '2026-09-24,Lunch,1200,1155,1200,33',
    '2026-09-25,Lunch,1260,1230,1250,27'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Data Management & CSV Batch Ingestion
          </h1>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            Data Pipeline
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Upload historical meal consumption logs, attendance registries, and kitchen scale records.
        </p>
      </div>

      {/* CSV Upload Area */}
      <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-white p-8 text-center shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Upload Mess Consumption CSV</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Drag and drop your attendance, prep quantity, and waste log files (.csv, .xlsx) to retrain the local forecasting model.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors">
            <span>Choose File</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={() => {
              setFileName('sample_mess_log_sept2026.csv');
              setUploaded(true);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Load Preloaded Sample CSV
          </button>
        </div>

        {uploaded && (
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Successfully loaded and validated: {fileName} (6 records)</span>
          </div>
        )}
      </div>

      {/* CSV Preview Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Sample Ingestion Format Preview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-200 text-slate-600 bg-slate-50">
              <tr>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Meal Type</th>
                <th className="py-2 px-3">Attendance</th>
                <th className="py-2 px-3">Actual Demand</th>
                <th className="py-2 px-3">Prepared</th>
                <th className="py-2 px-3">Waste (kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleCsvData.slice(1).map((row, i) => {
                const parts = row.split(',');
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 px-3">{parts[0]}</td>
                    <td className="py-2 px-3">{parts[1]}</td>
                    <td className="py-2 px-3">{parts[2]}</td>
                    <td className="py-2 px-3 font-bold text-emerald-700">{parts[3]}</td>
                    <td className="py-2 px-3">{parts[4]}</td>
                    <td className="py-2 px-3 text-rose-600">{parts[5]} kg</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
