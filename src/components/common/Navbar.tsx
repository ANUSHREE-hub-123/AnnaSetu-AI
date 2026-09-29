import React, { useState } from 'react';
import {
  Bell,
  Search,
  Play,
  CheckCircle2,
  AlertTriangle,
  Building,
  HeartHandshake,
  ShieldCheck,
  CheckCheck,
  Trash2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setActiveTab,
    runQuickEndToEndSimulation,
    isSimulating,
    isSimpleMode,
    setIsSimpleMode
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notifId: string, actionUrl?: string) => {
    markNotificationRead(notifId);
    if (actionUrl) {
      setActiveTab(actionUrl);
      setShowNotifications(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20">
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 font-sans">
                AnnaSetu <span className="text-emerald-600">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                Kitchen Ops
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 tracking-wide">
              Predict. Prevent. Redistribute.
            </p>
          </div>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Simple Mode / Advanced Mode Toggle */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setIsSimpleMode(true)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              isSimpleMode
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simple Mode
          </button>
          <button
            onClick={() => setIsSimpleMode(false)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              !isSimpleMode
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Advanced Mode
          </button>
        </div>

        {/* Quick Simulation Trigger */}
        <button
          onClick={runQuickEndToEndSimulation}
          disabled={isSimulating}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs transition-all disabled:opacity-50"
          title="Executes the full simulated cycle"
        >
          <Play className={`w-3.5 h-3.5 text-emerald-600 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Simulating...' : 'Simulate Flow'}</span>
        </button>

        {/* Live Notification Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">Operational Alerts</span>
                  {unreadCount > 0 && (
                    <span className="bg-rose-100 text-rose-800 font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.id, notif.actionTab || notif.actionUrl)}
                      className={`cursor-pointer rounded-xl p-3 text-xs transition-all border ${
                        !notif.read
                          ? notif.type === 'URGENT' || notif.type === 'URGENT_SURPLUS'
                            ? 'bg-rose-50/80 border-rose-200'
                            : 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-white border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                        <span className="truncate">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Role Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
            KM
          </div>
          <div className="text-left text-xs leading-tight">
            <span className="font-bold text-slate-800 block">Kitchen Manager</span>
            <span className="text-[10px] text-slate-400">ABC Central Mess</span>
          </div>
        </div>
      </div>
    </header>
  );
};
