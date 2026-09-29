import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  JourneyStage,
  DemandPrediction,
  ProcurementItem,
  WasteHotspot,
  SurplusBatch,
  NGOPartner,
  RedistributionTrack,
  RedistributionWorkflowState,
  ImpactMetrics,
  OperationalNotification,
  KitchenSettings
} from '../types';
import {
  initialPrediction,
  calculateProcurement,
  initialWasteHotspots,
  initialSurplusBatches,
  initialNGOs,
  initialRedistributionTrack,
  initialWorkflowState,
  initialImpactMetrics,
  initialNotifications,
  initialKitchenSettings
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showLandingPage: boolean;
  setShowLandingPage: (val: boolean) => void;

  isSimpleMode: boolean;
  setIsSimpleMode: (val: boolean) => void;

  journeyStage: JourneyStage;
  setJourneyStage: (stage: JourneyStage) => void;

  prediction: DemandPrediction;
  updatePrediction: (updates: Partial<DemandPrediction>) => void;
  applyPrepRecommendation: () => void;
  detectSurplus: () => void;

  procurementItems: ProcurementItem[];
  generatePurchaseOrder: () => void;

  wasteHotspots: WasteHotspot[];
  wasteRecords: WasteHotspot[];
  selectedHotspot: WasteHotspot | null;
  setSelectedHotspot: (hotspot: WasteHotspot | null) => void;

  surplusBatches: SurplusBatch[];
  surplusList: SurplusBatch[];
  addSurplusBatch: (batch: Omit<SurplusBatch, 'id' | 'urgency' | 'status' | 'currentMinutesRemaining'>) => void;

  ngos: NGOPartner[];
  selectedNGO: NGOPartner;
  setSelectedNGO: (ngo: NGOPartner) => void;
  acceptAndSchedulePickup: (ngoName?: string) => void;
  redistributeNow: (surplusId?: string, ngoName?: string) => void;

  redistributionTrack: RedistributionTrack;
  workflow: RedistributionWorkflowState;
  advanceWorkflowStage: () => void;
  resetWorkflow: () => void;
  resetRedistribution: () => void;
  markCollected: () => void;
  markDelivered: () => void;
  resetJourney: () => void;

  impact: ImpactMetrics;
  showCalculationModal: boolean;
  setShowCalculationModal: (val: boolean) => void;

  notifications: OperationalNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  pushNotification: (notif: Omit<OperationalNotification, 'id' | 'timestamp' | 'read'>) => void;

  settings: KitchenSettings;
  kitchenSettings: KitchenSettings;
  updateSettings: (updates: Partial<KitchenSettings>) => void;
  updateKitchenSettings: (updates: Partial<KitchenSettings>) => void;

  runQuickEndToEndSimulation: () => void;
  triggerLiveSimulation: () => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('kitchen');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true);

  const [journeyStage, setJourneyStage] = useState<JourneyStage>('PREP_PENDING');

  const [prediction, setPrediction] = useState<DemandPrediction>(initialPrediction);
  const [procurementItems, setProcurementItems] = useState<ProcurementItem[]>(
    calculateProcurement(initialPrediction.recommendedPreparation)
  );
  const [wasteHotspots, setWasteHotspots] = useState<WasteHotspot[]>(initialWasteHotspots);
  const [selectedHotspot, setSelectedHotspot] = useState<WasteHotspot | null>(null);

  const [surplusBatches, setSurplusBatches] = useState<SurplusBatch[]>(initialSurplusBatches);
  const [ngos] = useState<NGOPartner[]>(initialNGOs);
  const [selectedNGO, setSelectedNGO] = useState<NGOPartner>(initialNGOs[0]);

  const [redistributionTrack, setRedistributionTrack] = useState<RedistributionTrack>(initialRedistributionTrack);
  const [workflow, setWorkflow] = useState<RedistributionWorkflowState>(initialWorkflowState);
  const [impact, setImpact] = useState<ImpactMetrics>(initialImpactMetrics);
  const [showCalculationModal, setShowCalculationModal] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<OperationalNotification[]>(initialNotifications);
  const [settings, setSettings] = useState<KitchenSettings>(initialKitchenSettings);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const pushNotification = (notif: Omit<OperationalNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: OperationalNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const applyPrepRecommendation = () => {
    setJourneyStage('PREP_CONFIRMED');
    pushNotification({
      type: 'SUCCESS',
      title: 'Recommendation Applied',
      message: `Production scheduled at 1,188 meals (Actual: 1,215 prepared). 18 kg overproduction avoided.`,
      actionUrl: 'home',
      actionTab: 'home'
    });
  };

  const detectSurplus = () => {
    setJourneyStage('SURPLUS_DETECTED');
    pushNotification({
      type: 'URGENT_SURPLUS',
      title: 'Surplus Detected (27 Meals)',
      message: '27 meals unserved in Bain-Marie warmer. Safe window: 41 minutes remaining.',
      actionUrl: 'manage-waste',
      actionTab: 'manage-waste'
    });
  };

  const acceptAndSchedulePickup = (ngoName = 'Hope Foundation & Shelter Home') => {
    setJourneyStage('PICKUP_SCHEDULED');
    setSurplusBatches(prev =>
      prev.map(s => ({ ...s, status: 'MATCHED' as const, matchedNGO: ngoName }))
    );
    setRedistributionTrack(prev => ({
      ...prev,
      destination: ngoName,
      status: 'PICKUP SCHEDULED',
      stageNumber: 3
    }));
    setWorkflow(prev => ({
      ...prev,
      stage: 5,
      stageLabel: 'Pickup Scheduled',
      status: 'PICKUP SCHEDULED',
      ngoName
    }));
    pushNotification({
      type: 'MATCH',
      title: `Pickup Scheduled: ${ngoName}`,
      message: `Electric Cargo Van DL-4C-8921 en route to Loading Dock A (ETA 18 min).`,
      actionUrl: 'redistribute',
      actionTab: 'redistribute'
    });
  };

  const redistributeNow = (surplusId?: string, ngoName = 'Hope Foundation & Shelter Home') => {
    acceptAndSchedulePickup(ngoName);
    setActiveTab('redistribute');
  };

  const markCollected = () => {
    setJourneyStage('COLLECTED');
    setRedistributionTrack(prev => ({
      ...prev,
      status: 'COLLECTED',
      stageNumber: 4
    }));
    setWorkflow(prev => ({
      ...prev,
      stage: 6,
      stageLabel: 'Food Handover (OTP)',
      status: 'COLLECTED'
    }));
    pushNotification({
      type: 'REDISTRIBUTION_STAGE',
      title: 'Food Collected from Kitchen Loading Dock',
      message: 'Chef OTP ANNA-7429 verified. Temperature logged at 68.4°C. Van in transit to shelter.',
      actionUrl: 'redistribute',
      actionTab: 'redistribute'
    });
  };

  const markDelivered = () => {
    setJourneyStage('DELIVERED');
    setRedistributionTrack(prev => ({
      ...prev,
      status: 'DELIVERED',
      stageNumber: 5
    }));
    setWorkflow(prev => ({
      ...prev,
      stage: 8,
      stageLabel: 'Delivery Confirmed & Impact Recorded',
      status: 'DELIVERED'
    }));

    setImpact(prev => ({
      ...prev,
      mealsRedistributed: prev.mealsRedistributed + 27,
      mealsDonatedMonth: prev.mealsDonatedMonth + 27,
      mealsSavedMonth: prev.mealsSavedMonth + 27,
      foodSavedKg: prev.foodSavedKg + 22.5,
      foodSavedKgMonth: prev.foodSavedKgMonth + 22.5,
      co2AvoidedTons: Number((prev.co2AvoidedTons + 0.047).toFixed(3)),
      waterSavedLiters: prev.waterSavedLiters + 18900,
      peopleServed: prev.peopleServed + 27,
      economicSavingsInr: prev.economicSavingsInr + 1620
    }));

    pushNotification({
      type: 'SUCCESS',
      title: 'Delivered: 27 meals received at Hope Foundation',
      message: 'OTP verified. ESG environmental impact ledger updated (+27 meals, +47.6 kg CO2 avoided).',
      actionUrl: 'impact',
      actionTab: 'impact'
    });
  };

  const resetJourney = () => {
    setJourneyStage('PREP_PENDING');
    setRedistributionTrack(initialRedistributionTrack);
    setWorkflow(initialWorkflowState);
    setPrediction(initialPrediction);
  };

  const resetWorkflow = () => {
    resetJourney();
  };

  const resetRedistribution = () => {
    resetJourney();
  };

  const advanceWorkflowStage = () => {
    setWorkflow(prev => {
      const nextStage = Math.min(8, prev.stage + 1);
      const labels = [
        'Surplus Detected',
        'AI Urgency Assessed',
        'Suitable NGO Matched',
        'NGO Accepts Offer',
        'Pickup Scheduled',
        'Food Handover (OTP)',
        'Delivery Confirmed',
        'Impact Recorded'
      ];
      return {
        ...prev,
        stage: nextStage,
        stageLabel: labels[nextStage - 1] || 'Completed'
      };
    });

    if (workflow.stage === 7) {
      markDelivered();
    }
  };

  const updatePrediction = (updates: Partial<DemandPrediction>) => {
    setPrediction(prev => {
      const next = { ...prev, ...updates };
      setProcurementItems(calculateProcurement(next.recommendedPreparation));
      return next;
    });
  };

  const generatePurchaseOrder = () => {
    pushNotification({
      type: 'SUCCESS',
      title: 'Purchase Order Generated',
      message: 'Automated PO for Basmati Rice (22 kg) and Toor Dal (8 kg shortage) dispatched to inventory suppliers.',
      actionUrl: 'plan-food',
      actionTab: 'plan-food'
    });
  };

  const addSurplusBatch = (batch: Omit<SurplusBatch, 'id' | 'urgency' | 'status' | 'currentMinutesRemaining'>) => {
    const newBatch: SurplusBatch = {
      ...batch,
      id: 'surplus-' + Date.now(),
      batchId: 'BATCH-' + Date.now().toString().slice(-4),
      currentMinutesRemaining: batch.initialMinutes,
      remainingMinutes: batch.initialMinutes,
      urgency: 'URGENT',
      safetyStatus: 'URGENT',
      status: 'AVAILABLE'
    };
    setSurplusBatches(prev => [newBatch, ...prev]);
    setJourneyStage('SURPLUS_DETECTED');
  };

  const updateSettings = (updates: Partial<KitchenSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const triggerLiveSimulation = () => {
    setIsSimulating(true);
  };

  const runQuickEndToEndSimulation = () => {
    setIsSimulating(true);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        showLandingPage,
        setShowLandingPage,
        isSimpleMode,
        setIsSimpleMode,
        journeyStage,
        setJourneyStage,
        prediction,
        updatePrediction,
        applyPrepRecommendation,
        detectSurplus,
        procurementItems,
        generatePurchaseOrder,
        wasteHotspots,
        wasteRecords: wasteHotspots,
        selectedHotspot,
        setSelectedHotspot,
        surplusBatches,
        surplusList: surplusBatches,
        addSurplusBatch,
        ngos,
        selectedNGO,
        setSelectedNGO,
        acceptAndSchedulePickup,
        redistributeNow,
        redistributionTrack,
        workflow,
        advanceWorkflowStage,
        resetWorkflow,
        resetRedistribution,
        markCollected,
        markDelivered,
        resetJourney,
        impact,
        showCalculationModal,
        setShowCalculationModal,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications,
        pushNotification,
        settings,
        kitchenSettings: settings,
        updateSettings,
        updateKitchenSettings: updateSettings,
        runQuickEndToEndSimulation,
        triggerLiveSimulation,
        isSimulating,
        setIsSimulating
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
