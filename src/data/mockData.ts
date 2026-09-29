import {
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

export const historicalDemandData = [
  { day: 'Day 1', actualDemand: 1120, predictedDemand: 1140 },
  { day: 'Day 2', actualDemand: 1080, predictedDemand: 1090 },
  { day: 'Day 3', actualDemand: 1210, predictedDemand: 1195 },
  { day: 'Day 4', actualDemand: 1150, predictedDemand: 1160 },
  { day: 'Day 5', actualDemand: 980, predictedDemand: 990 },
  { day: 'Day 6', actualDemand: 890, predictedDemand: 910 },
  { day: 'Day 7', actualDemand: 1140, predictedDemand: 1130 },
  { day: 'Day 8', actualDemand: 1180, predictedDemand: 1170 },
  { day: 'Day 9', actualDemand: 1220, predictedDemand: 1205 },
  { day: 'Day 10', actualDemand: 1190, predictedDemand: 1185 },
  { day: 'Day 11', actualDemand: 1050, predictedDemand: 1060 },
  { day: 'Day 12', actualDemand: 920, predictedDemand: 940 },
  { day: 'Day 13', actualDemand: 1160, predictedDemand: 1155 },
  { day: 'Today', actualDemand: 1188, predictedDemand: 1188 }
];

export const initialPrediction: DemandPrediction = {
  id: 'pred-active',
  date: '2026-09-27',
  mealType: 'Lunch',
  expectedAttendance: 1200,
  predictedDemand: 1173,
  confidenceScore: 94.6,
  recommendedPreparation: 1188,
  actualPreparation: 1215,
  expectedSurplus: 15,
  surplusMeals: 27,
  redistributedMeals: 27,
  expectedWasteKg: 14,
  potentialWasteAvoidedKg: 18,
  weatherFactor: 'Rainy (-4.2%)',
  dayOfWeek: 'Wednesday',
  holidayEvent: 'Regular Academic Day',
  historicalConsumptionAvg: 1180,
  previousWastePercent: 3.4,
  aiInsight: 'Monsoon weather dip indicates a 45-meal attendance reduction. Recommended preparation of 1,188 meals maintains a 15-meal buffer while avoiding 18 kg of overproduction waste.'
};

export const calculateProcurement = (recommendedMeals: number): ProcurementItem[] => {
  return [
    {
      id: 'proc-1',
      name: 'Basmati Rice',
      category: 'Grains & Cereals',
      requiredPerMealKg: 0.069,
      requiredTotalKg: 82,
      currentStockKg: 91,
      suggestedProcureKg: 0,
      unit: 'kg',
      costPerUnitInr: 65,
      status: 'OPTIMAL'
    },
    {
      id: 'proc-2',
      name: 'Toor Dal',
      category: 'Pulses & Lentils',
      requiredPerMealKg: 0.030,
      requiredTotalKg: 36,
      currentStockKg: 28,
      suggestedProcureKg: 8,
      unit: 'kg',
      costPerUnitInr: 135,
      status: 'CRITICAL'
    },
    {
      id: 'proc-3',
      name: 'Seasonal Mixed Vegetables',
      category: 'Fresh Produce',
      requiredPerMealKg: 0.049,
      requiredTotalKg: 58,
      currentStockKg: 61,
      suggestedProcureKg: 0,
      unit: 'kg',
      costPerUnitInr: 45,
      status: 'OPTIMAL'
    },
    {
      id: 'proc-4',
      name: 'Whole Wheat Atta',
      category: 'Grains & Cereals',
      requiredPerMealKg: 0.035,
      requiredTotalKg: 42,
      currentStockKg: 50,
      suggestedProcureKg: 0,
      unit: 'kg',
      costPerUnitInr: 38,
      status: 'OPTIMAL'
    },
    {
      id: 'proc-5',
      name: 'Refined Sunflower Oil',
      category: 'Oils & Fats',
      requiredPerMealKg: 0.015,
      requiredTotalKg: 18,
      currentStockKg: 24,
      suggestedProcureKg: 0,
      unit: 'L',
      costPerUnitInr: 135,
      status: 'OPTIMAL'
    },
    {
      id: 'proc-6',
      name: 'Spices & Condiments',
      category: 'Seasonings',
      requiredPerMealKg: 0.008,
      requiredTotalKg: 10,
      currentStockKg: 15,
      suggestedProcureKg: 0,
      unit: 'kg',
      costPerUnitInr: 180,
      status: 'OPTIMAL'
    }
  ];
};

export const initialWasteHotspots: WasteHotspot[] = [
  {
    id: 'hotspot-1',
    category: 'Rice',
    dailyWasteKg: 14.2,
    wastePercentage: 41.8,
    severity: 'HIGH',
    trend7Days: [18.2, 16.5, 17.0, 15.4, 16.1, 14.8, 14.2],
    likelyRootCause: 'Wednesday dinner has lower consumption due to hostel canteen alternatives.',
    aiRecommendation: 'Reduce rice preparation by 7% (saves ~6 kg daily / ₹920/week).',
    estimatedCostLossInr: 920
  },
  {
    id: 'hotspot-2',
    category: 'Vegetables',
    dailyWasteKg: 8.5,
    wastePercentage: 25.0,
    severity: 'MEDIUM',
    trend7Days: [11.0, 10.2, 9.8, 9.1, 8.8, 8.4, 8.5],
    likelyRootCause: 'Peeling trim scrap inefficiency in early prep shifts.',
    aiRecommendation: 'Standardize mechanical peeling guidelines to save 3.5 kg daily.',
    estimatedCostLossInr: 382
  },
  {
    id: 'hotspot-3',
    category: 'Dal',
    dailyWasteKg: 6.1,
    wastePercentage: 17.9,
    severity: 'MEDIUM',
    trend7Days: [8.5, 7.8, 7.2, 6.9, 6.5, 6.3, 6.1],
    likelyRootCause: 'Excess tempering oil leads to unfinished bowl waste.',
    aiRecommendation: 'Implement taste-check sensor calibration before counter release.',
    estimatedCostLossInr: 854
  }
];

export const initialSurplusBatches: SurplusBatch[] = [
  {
    id: 'surplus-active-01',
    batchId: 'BATCH-2026-0927-A',
    foodItem: 'Cooked Rice + Dal Tadka + Seasonal Veg',
    quantityKg: 22.5,
    quantityMeals: 27,
    foodType: 'Vegetarian',
    preparationTime: '1:15 PM',
    safeUntilTime: '3:30 PM',
    initialMinutes: 41,
    currentMinutesRemaining: 41,
    remainingMinutes: 41,
    storageCondition: 'Hot-Holding (>65°C)',
    temperatureLogged: 68.4,
    urgency: 'URGENT',
    safetyStatus: 'URGENT',
    status: 'AVAILABLE',
    notes: 'Hot-holding Bain-Marie at 68.4°C. FSSAI safe consumption window active.'
  },
  {
    id: 'surplus-safe-02',
    batchId: 'BATCH-2026-0927-B',
    foodItem: 'Fresh Carrot & Cucumber Koshimbir Salad',
    quantityKg: 7.5,
    quantityMeals: 15,
    foodType: 'Vegetarian',
    preparationTime: '12:45 PM',
    safeUntilTime: '4:30 PM',
    initialMinutes: 105,
    currentMinutesRemaining: 105,
    remainingMinutes: 105,
    storageCondition: 'Cold-Holding (<5°C)',
    temperatureLogged: 4.2,
    urgency: 'SAFE',
    safetyStatus: 'SAFE',
    status: 'AVAILABLE',
    notes: 'Stored in walk-in cold room at 4.2°C. Excellent freshness.'
  },
  {
    id: 'surplus-expiring-03',
    batchId: 'BATCH-2026-0927-C',
    foodItem: 'Steamed White Rice (Batch 1)',
    quantityKg: 5.0,
    quantityMeals: 8,
    foodType: 'Vegetarian',
    preparationTime: '11:30 AM',
    safeUntilTime: '2:45 PM',
    initialMinutes: 12,
    currentMinutesRemaining: 12,
    remainingMinutes: 12,
    storageCondition: 'Ambient Holding',
    temperatureLogged: 54.1,
    urgency: 'EXPIRING',
    safetyStatus: 'EXPIRING',
    status: 'AVAILABLE',
    notes: 'Ambient temperature dropping. Must dispatch within 12 minutes or route to bio-composter.'
  }
];

export const initialNGOs: NGOPartner[] = [
  {
    id: 'ngo-hope',
    name: 'Hope Foundation & Shelter Home',
    location: 'Sector 58 Shelter Hub',
    distanceKm: 2.4,
    requiredMeals: 30,
    currentCapacityMeals: 72,
    foodCompatibility: ['Vegetarian', 'Jain', 'Vegan', 'Cooked Meals'],
    pickupAvailable: true,
    estimatedPickupMinutes: 18,
    matchScore: 96,
    scoreBreakdown: {
      distanceScore: 24.0,
      compatibilityScore: 25.0,
      capacityScore: 18.4,
      pickupScore: 19.6,
      urgencyScore: 9.5
    },
    contactPerson: 'Meera Deshmukh (Volunteer Lead)',
    phone: '+91 98111 22334'
  },
  {
    id: 'ngo-annapoorna',
    name: 'Robin Hood Army Chapter',
    location: 'Indirapuram Ward 4',
    distanceKm: 4.8,
    requiredMeals: 45,
    currentCapacityMeals: 60,
    foodCompatibility: ['Vegetarian', 'Cooked Meals'],
    pickupAvailable: true,
    estimatedPickupMinutes: 32,
    matchScore: 88,
    scoreBreakdown: {
      distanceScore: 20.0,
      compatibilityScore: 24.0,
      capacityScore: 18.0,
      pickupScore: 18.0,
      urgencyScore: 8.0
    },
    contactPerson: 'Karan Saxena',
    phone: '+91 97234 56789'
  }
];

export const initialRedistributionTrack: RedistributionTrack = {
  id: 'track-active-01',
  donationId: 'AN-7429',
  surplusFood: 'Cooked Rice + Dal Tadka + Seasonal Veg (27 meals)',
  quantityMeals: 27,
  quantityKg: 22.5,
  origin: 'ABC Institutional Kitchen (Loading Dock A)',
  destination: 'Hope Foundation & Shelter Home (Sector 58)',
  distanceKm: 2.4,
  etaMinutes: 18,
  status: 'PICKUP SCHEDULED',
  stageNumber: 3,
  driverName: 'Rameshwar Yadav',
  driverPhone: '+91 98231 00921',
  vehicleNumber: 'Electric Cargo Van DL-4C-8921',
  handoverOtp: 'ANNA-7429',
  temperatureAtHandover: 68.4,
  startedAt: '1:45 PM',
  beneficiariesCount: 27
};

export const initialWorkflowState: RedistributionWorkflowState = {
  stage: 3,
  stageLabel: 'NGO Matched & Route Dispatched',
  foodItem: 'Cooked Rice + Dal Tadka + Seasonal Veg (27 meals)',
  quantityMeals: 27,
  ngoName: 'Hope Foundation & Shelter Home',
  driverName: 'Rameshwar Yadav',
  vehicleNumber: 'Electric Cargo Van DL-4C-8921',
  otpCode: 'ANNA-7429',
  status: 'PICKUP SCHEDULED',
  institutionName: 'ABC Institutional Mess (Central Unit)'
};

export const initialImpactMetrics: ImpactMetrics = {
  mealsRedistributed: 4620,
  foodSavedKg: 1284,
  co2AvoidedTons: 2.7,
  waterSavedLiters: 1078560,
  peopleServed: 3850,
  economicSavingsInr: 277200,
  mealsDonatedMonth: 4620,
  foodSavedKgMonth: 1284,
  mealsSavedMonth: 4620,
  totalInstitutions: 4,
  totalNGOs: 6,
  activeRedistributions: 1
};

export const initialNotifications: OperationalNotification[] = [
  {
    id: 'notif-1',
    type: 'URGENT_SURPLUS',
    title: 'Urgent: Safe Window Alert',
    message: '27 meals cooked rice & dal has 41 minutes remaining before safe redistribution window closes.',
    timestamp: 'Just now',
    read: false,
    actionUrl: 'manage-waste',
    actionTab: 'manage-waste'
  },
  {
    id: 'notif-2',
    type: 'MATCH',
    title: 'Smart NGO Match Found',
    message: 'Hope Foundation & Shelter Home matches at 96% (2.4 km away, 27 meals required).',
    timestamp: '5 mins ago',
    read: false,
    actionUrl: 'redistribute',
    actionTab: 'redistribute'
  }
];

export const initialKitchenSettings: KitchenSettings = {
  kitchenName: 'ABC Central Institutional Kitchen',
  location: 'Sector 62, Noida, Uttar Pradesh',
  fssaiNumber: '10020011003498',
  maxCapacity: 1500,
  safetyBufferPercent: 5,
  urgentThresholdMins: 30,
  criticalThresholdMins: 15,
  defaultNgoPartner: 'Hope Foundation Shelter',
  complianceStandard: 'FSSAI_STANDARD',
  notificationsEnabled: true,
  autoOrderCriticalProcurement: false,
  institutionName: 'ABC Institutional Kitchen (Central Unit)',
  messCapacity: 1500,
  safetyWindowThresholdMins: 60,
  defaultSafetyBufferMeals: 15,
  fssaiLicenseNumber: '10020011003498',
  temperatureAlertThresholdCelsius: 60.0,
  autoDispatchUrgentSurplus: true
};
