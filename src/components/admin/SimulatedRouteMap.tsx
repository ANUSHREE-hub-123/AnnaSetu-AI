import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Building,
  HeartHandshake,
  Navigation,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SimulatedRouteMap: React.FC = () => {
  const { workflow } = useApp();
  const [activeNode, setActiveNode] = useState<string>('courier-1');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Simulated Regional Redistribution Corridor (GIS Telemetry)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Real-time tracking of institutional hubs, partner NGO drop points, and active electric cargo vans.
          </p>
        </div>

        <span className="text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
          Active Cluster: Sector 58-62 Corridor
        </span>
      </div>

      {/* Map Canvas Simulation */}
      <div className="relative h-80 w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        {/* Subtle Map Grid Lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Route Line SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="22%"
            y1="50%"
            x2="78%"
            y2="50%"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Node 1: ABC Institutional Kitchen */}
        <div className="absolute left-[18%] top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-emerald-600/90 border-2 border-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40">
            <Building className="w-6 h-6" />
          </div>
          <span className="mt-2 text-xs font-bold text-white bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
            ABC Kitchen Mess
          </span>
          <span className="text-[10px] text-emerald-400">Loading Dock A</span>
        </div>

        {/* Moving Van: DL-4C-8921 */}
        <div className="absolute left-[50%] top-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse-subtle">
          <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-indigo-400 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40">
            <Truck className="w-5 h-5" />
          </div>
          <span className="mt-2 text-xs font-bold text-white bg-indigo-950/90 px-2 py-0.5 rounded border border-indigo-800">
            Van DL-4C-8921 (In-Transit)
          </span>
          <span className="text-[10px] text-indigo-300 font-mono">Speed: 38 km/h • 68.4°C</span>
        </div>

        {/* Node 2: Hope Foundation */}
        <div className="absolute right-[18%] top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-amber-600/90 border-2 border-amber-400 text-white flex items-center justify-center shadow-lg shadow-amber-600/40">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="mt-2 text-xs font-bold text-white bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
            Hope Foundation
          </span>
          <span className="text-[10px] text-amber-400">Shelter Intake (2.4 km)</span>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div>
          <span className="text-slate-400 block text-[10px]">CORRIDOR DISTANCE</span>
          <span className="font-bold text-slate-800">2.4 km</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">ESTIMATED ARRIVAL</span>
          <span className="font-mono font-bold text-emerald-700">18 minutes</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">CARGO TEMP</span>
          <span className="font-mono font-bold text-slate-800">68.4°C (Safe Zone)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">CHAIN VERIFICATION</span>
          <span className="font-bold text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>FSSAI Compliant</span>
          </span>
        </div>
      </div>
    </div>
  );
};
