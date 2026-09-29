import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { LiveSimulationModal } from './components/simulation/LiveSimulationModal';
import { ContextualAIAssistant } from './components/common/ContextualAIAssistant';

import { KitchenDashboard } from './components/kitchen/KitchenDashboard';
import { DemandPlanner } from './components/kitchen/DemandPlanner';
import { SmartProcurement } from './components/kitchen/SmartProcurement';
import { WasteAnalytics } from './components/kitchen/WasteAnalytics';
import { SurplusManagement } from './components/kitchen/SurplusManagement';
import { RedistributeView } from './components/kitchen/RedistributeView';
import { EnvironmentalImpact } from './components/shared/EnvironmentalImpact';
import { NotificationCenter } from './components/shared/NotificationCenter';
import { Settings } from './components/shared/Settings';

const MainLayout: React.FC = () => {
  const { activeTab, showLandingPage } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (showLandingPage) {
    return <LandingPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
      case 'dashboard':
        return <KitchenDashboard />;
      case 'forecast':
      case 'demand-planner':
      case 'plan-food':
        return <DemandPlanner />;
      case 'procurement':
      case 'procure':
        return <SmartProcurement />;
      case 'waste':
      case 'waste-analytics':
      case 'manage-waste':
        return <WasteAnalytics />;
      case 'surplus':
      case 'surplus-mgmt':
        return <SurplusManagement />;
      case 'redistribute':
      case 'ngo-matching':
        return <RedistributeView />;
      case 'impact':
        return <EnvironmentalImpact />;
      case 'alerts':
        return <NotificationCenter />;
      case 'settings':
        return <Settings />;
      default:
        return <KitchenDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <ContextualAIAssistant />
      <LiveSimulationModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
