import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Truck,
  ShoppingCart,
  Filter,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'URGENT' | 'DELIVERY' | 'PROCUREMENT'>('ALL');

  const filtered = notifications.filter(n => {
    if (filter === 'ALL') return true;
    if (filter === 'URGENT') return n.type === 'URGENT_SURPLUS';
    if (filter === 'DELIVERY') return n.type === 'REDISTRIBUTION_STAGE';
    if (filter === 'PROCUREMENT') return n.type === 'PROCUREMENT';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Operational Notification Center
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time operational alerts for kitchen dispatchers, logistics drivers, and inventory managers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'ALL', label: `All Alerts (${notifications.length})` },
          { id: 'URGENT', label: 'Urgent Surplus' },
          { id: 'DELIVERY', label: 'Deliveries & Logistics' },
          { id: 'PROCUREMENT', label: 'Procurement POs' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No notifications in this category</p>
            <p className="text-xs text-slate-400 mt-1">All kitchen systems and redistributions are currently normal.</p>
          </div>
        ) : (
          filtered.map(item => {
            const isUrgent = item.type === 'URGENT_SURPLUS';
            const isDelivery = item.type === 'REDISTRIBUTION_STAGE';
            const isProcurement = item.type === 'PROCUREMENT';

            return (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`rounded-xl border p-4 transition-all cursor-pointer ${
                  !item.read
                    ? isUrgent
                      ? 'bg-rose-50/80 border-rose-200 shadow-xs'
                      : 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-700'
                          : isDelivery
                          ? 'bg-blue-100 text-blue-700'
                          : isProcurement
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {isUrgent && <AlertTriangle className="w-4 h-4" />}
                      {isDelivery && <Truck className="w-4 h-4" />}
                      {isProcurement && <ShoppingCart className="w-4 h-4" />}
                      {!isUrgent && !isDelivery && !isProcurement && <Bell className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        {!item.read && (
                          <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                        <span className="font-semibold uppercase tracking-wider text-slate-500">
                          {item.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.actionTab && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(item.id);
                        setActiveTab(item.actionTab as any);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex-shrink-0 shadow-2xs"
                    >
                      <span>Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
