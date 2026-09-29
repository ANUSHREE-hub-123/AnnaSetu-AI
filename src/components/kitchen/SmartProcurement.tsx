import React, { useState } from 'react';
import {
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Package,
  Layers,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SmartProcurement: React.FC = () => {
  const { prediction, procurementItems, generatePurchaseOrder } = useApp();
  const [showPOModal, setShowPOModal] = useState(false);
  const [poDispatched, setPoDispatched] = useState(false);

  const criticalItems = procurementItems.filter(i => i.status === 'CRITICAL');
  const totalCost = procurementItems.reduce((acc, item) => acc + (item.suggestedProcureKg * item.costPerUnitInr), 0);

  const handleCreatePO = () => {
    generatePurchaseOrder();
    setShowPOModal(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Smart Ingredient Procurement</h1>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              Demand-Driven Inventory
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronizes raw ingredient requisitions directly with predicted meal preparation volume to eliminate dry-store perishability and stockouts.
          </p>
        </div>

        <button
          onClick={handleCreatePO}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Generate Purchase Order</span>
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Target Meal Batch</span>
          <div className="mt-1 text-3xl font-black text-slate-900">
            {prediction.recommendedPreparation.toLocaleString()} meals
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Derived from AI Forecast</span>
        </div>

        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-4 shadow-xs">
          <span className="text-xs font-bold text-amber-900 uppercase block">Critical Stock Shortages</span>
          <div className="mt-1 text-3xl font-black text-amber-900">
            {criticalItems.length} Shortage (8 kg Toor Dal)
          </div>
          <span className="text-[11px] text-rose-700 font-bold block mt-1">Requires immediate vendor PO</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Requisition Budget</span>
          <div className="mt-1 text-3xl font-black text-slate-900">
            ₹{totalCost.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Pre-negotiated wholesale rate</span>
        </div>
      </div>

      {/* AI PROCUREMENT RECOMMENDATION BANNER */}
      <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-white to-amber-50/50 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                AI Procurement Recommendation
              </span>
              <span className="text-xs text-amber-800 font-semibold">• For {prediction.recommendedPreparation} Meals</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              Based on the predicted demand of <strong>{prediction.recommendedPreparation} meals</strong>, all dry staples are in surplus except <strong className="text-rose-700">Toor Dal</strong> (36 kg required vs 28 kg in stock = <strong>8 kg shortage</strong>).
            </p>
            <p className="text-xs text-emerald-800 font-semibold">
              Suggested Vendor: <strong>Local Agro Wholesale Hub (Vendor #A-104)</strong> • Delivery ETA: 90 min at ₹135/kg.
            </p>
          </div>

          <button
            onClick={handleCreatePO}
            className="px-6 py-3 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
          >
            <span>Procure 8 kg Shortage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Procurement Calculation Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Ingredient Requisition Breakdown</h3>
            <p className="text-xs text-slate-500">
              Live comparison of current store inventory against calibrated recipe portion standards.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            Batch Basis: {prediction.recommendedPreparation} Meals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Ingredient</th>
                <th className="py-2.5 px-3">Portion Factor</th>
                <th className="py-2.5 px-3">Required Quantity</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Shortage / Surplus</th>
                <th className="py-2.5 px-3">Suggested Procurement</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Est. Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {procurementItems.map(item => {
                const diff = item.currentStockKg - item.requiredTotalKg;
                const isShortage = diff < 0;

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isShortage ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {item.requiredPerMealKg} {item.unit}/meal
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                      {item.requiredTotalKg} {item.unit}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700">
                      {item.currentStockKg} {item.unit}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold">
                      {isShortage ? (
                        <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          {diff} {item.unit} Shortage
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          +{diff} {item.unit} Surplus
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                      {item.suggestedProcureKg > 0 ? (
                        <span className="text-amber-800">+{item.suggestedProcureKg} {item.unit}</span>
                      ) : (
                        <span className="text-slate-400">0 kg (In Stock)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          item.status === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                            : item.status === 'LOW'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {item.status === 'CRITICAL' ? 'CRITICAL SHORTAGE' : item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">
                      ₹{(item.suggestedProcureKg * item.costPerUnitInr).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Order Modal */}
      {showPOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">Purchase Order: PO-2026-L402</h3>
                  <span className="text-xs text-slate-500">ABC Central Kitchen Requisition</span>
                </div>
              </div>
              <button
                onClick={() => setShowPOModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Designated Vendor:</span>
                <strong className="text-slate-800">Local Agro Wholesale Hub (Vendor #A-104)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Window:</span>
                <strong className="text-emerald-700">Today before 4:00 PM (Express Dock A)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Terms:</span>
                <strong className="text-slate-800">Institutional Net 30</strong>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Items to Procure:</span>
              {procurementItems.filter(i => i.suggestedProcureKg > 0).map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-slate-500">Rate: ₹{item.costPerUnitInr}/{item.unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-900 block">
                      {item.suggestedProcureKg} {item.unit}
                    </span>
                    <span className="font-mono text-slate-600">
                      ₹{item.suggestedProcureKg * item.costPerUnitInr}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold">
              <span>Total Requisition Value:</span>
              <span className="font-mono text-base text-emerald-800 font-black">₹{totalCost}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowPOModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPoDispatched(true);
                  setTimeout(() => {
                    setPoDispatched(false);
                    setShowPOModal(false);
                  }, 1200);
                }}
                className="px-5 py-2 text-xs font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                {poDispatched ? '✓ Dispatched to Vendor WhatsApp & ERP' : 'Approve & Dispatch PO'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
