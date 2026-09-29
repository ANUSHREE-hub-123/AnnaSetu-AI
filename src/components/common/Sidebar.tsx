import React from 'react';
import {
  Home,
  TrendingUp,
  ShoppingCart,
  Trash2,
  PackageCheck,
  Route,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { activeTab, setActiveTab, surplusBatches, procurementItems } = useApp();

  const urgentCount = surplusBatches.filter(s => s.urgency === 'URGENT' || s.urgency === 'EXPIRING').length;
  const criticalProcureCount = procurementItems.filter(p => p.status === 'CRITICAL').length;

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 'forecast',
      label: 'Demand Planner',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 'procurement',
      label: 'Smart Procurement',
      icon: <ShoppingCart className="w-4 h-4" />,
      count: criticalProcureCount > 0 ? criticalProcureCount : undefined,
      countType: 'warning'
    },
    {
      id: 'waste',
      label: 'Waste Analytics',
      icon: <Trash2 className="w-4 h-4" />,
      badge: 'Hotspot'
    },
    {
      id: 'surplus',
      label: 'Surplus Intelligence',
      icon: <PackageCheck className="w-4 h-4" />,
      count: urgentCount > 0 ? urgentCount : undefined,
      countType: 'urgent'
    },
    {
      id: 'redistribute',
      label: 'Redistribution',
      icon: <Route className="w-4 h-4" />,
      badge: '96% Match'
    },
    {
      id: 'impact',
      label: 'Live Impact',
      icon: <Leaf className="w-4 h-4" />
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200 bg-white transition-all duration-300 z-20 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5">
        {!collapsed && (
          <h5 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            Operations Engine
          </h5>
        )}
        {menuItems.map(item => {
          const isActive =
            activeTab === item.id ||
            (item.id === 'home' && (activeTab === 'dashboard' || activeTab === '')) ||
            (item.id === 'forecast' && (activeTab === 'demand-planner' || activeTab === 'plan-food')) ||
            (item.id === 'procurement' && activeTab === 'procure') ||
            (item.id === 'waste' && activeTab === 'manage-waste') ||
            (item.id === 'surplus' && activeTab === 'surplus-mgmt') ||
            (item.id === 'redistribute' && activeTab === 'ngo-matching');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <span className={isActive ? 'text-emerald-700' : 'text-slate-500'}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                  {item.badge}
                </span>
              )}
              {!collapsed && item.count && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    item.countType === 'urgent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-3 space-y-1">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Kitchen Settings"
        >
          <Settings className="w-3.5 h-3.5" />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
