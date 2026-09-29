export type UserRole = 'kitchen' | 'ngo' | 'admin';

export type FoodCategory = 'Rice' | 'Vegetables' | 'Dal' | 'Roti' | 'Curry' | 'Dairy' | 'Packaged' | 'Other';
export type FoodType = 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan';
export type StorageCondition = 'Hot-Holding (>65°C)' | 'Cold-Storage (<4°C)' | 'Cold-Holding (<5°C)' | 'Ambient Holding' | 'Room Temperature';
export type UrgencyLevel = 'SAFE' | 'URGENT' | 'EXPIRING';
export type SafetyStatus = 'SAFE' | 'URGENT' | 'EXPIRING' | 'UNSAFE';

export type JourneyStage =
  | 'PREP_PENDING'
  | 'PREP_CONFIRMED'
  | 'SURPLUS_DETECTED'
  | 'PICKUP_SCHEDULED'
  | 'COLLECTED'
  | 'DELIVERED';

export interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  contactPerson: string;
  phone: string;
}

export interface DemandPrediction {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  expectedAttendance: number;
  predictedDemand: number;
  confidenceScore: number;
  recommendedPreparation: number;
  actualPreparation: number;
  expectedSurplus: number;
  surplusMeals: number;
  redistributedMeals: number;
  expectedWasteKg: number;
  potentialWasteAvoidedKg: number;
  weatherFactor: 'Sunny (Normal)' | 'Rainy (-4.2%)' | 'Cold Wave (-6%)' | 'Hot/Dry (+2%)';
  dayOfWeek: string;
  holidayEvent: string;
  historicalConsumptionAvg: number;
  previousWastePercent: number;
  aiInsight: string;
}

export interface ProcurementItem {
  id: string;
  name: string;
  category: string;
  requiredPerMealKg: number;
  requiredTotalKg: number;
  currentStockKg: number;
  suggestedProcureKg: number;
  unit: string;
  costPerUnitInr: number;
  status: 'OPTIMAL' | 'LOW' | 'CRITICAL';
}

export interface WasteHotspot {
  id: string;
  category: FoodCategory;
  dailyWasteKg: number;
  wastePercentage: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  trend7Days: number[];
  likelyRootCause: string;
  aiRecommendation: string;
  estimatedCostLossInr: number;
}

export interface SurplusBatch {
  id: string;
  batchId?: string;
  foodItem: string;
  quantityKg: number;
  quantityMeals: number;
  foodType: FoodType;
  preparationTime: string;
  safeUntilTime: string;
  initialMinutes: number;
  currentMinutesRemaining: number;
  remainingMinutes?: number;
  storageCondition: StorageCondition;
  temperatureLogged: number;
  urgency: UrgencyLevel;
  safetyStatus?: SafetyStatus;
  status: 'AVAILABLE' | 'MATCHED' | 'DISPATCHED' | 'DELIVERED';
  matchedNGO?: string;
  notes?: string;
}

export interface NGOPartner {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  requiredMeals: number;
  currentCapacityMeals: number;
  foodCompatibility: string[];
  pickupAvailable: boolean;
  estimatedPickupMinutes: number;
  matchScore: number;
  scoreBreakdown: {
    distanceScore: number;
    compatibilityScore: number;
    capacityScore: number;
    pickupScore: number;
    urgencyScore?: number;
  };
  contactPerson: string;
  phone: string;
}

export type RouteStage = 'SURPLUS DETECTED' | 'NGO MATCHED' | 'PICKUP SCHEDULED' | 'COLLECTED' | 'DELIVERED';

export interface RedistributionTrack {
  id: string;
  donationId: string;
  surplusFood: string;
  quantityMeals: number;
  quantityKg: number;
  origin: string;
  destination: string;
  distanceKm: number;
  etaMinutes: number;
  status: RouteStage;
  stageNumber: number;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  handoverOtp: string;
  temperatureAtHandover: number;
  startedAt: string;
  deliveredAt?: string;
  beneficiariesCount: number;
}

export interface RedistributionWorkflowState {
  stage: number;
  stageLabel: string;
  foodItem: string;
  quantityMeals: number;
  ngoName: string;
  driverName: string;
  vehicleNumber: string;
  otpCode: string;
  status: string;
  institutionName?: string;
}

export interface ImpactMetrics {
  mealsRedistributed: number;
  foodSavedKg: number;
  co2AvoidedTons: number;
  waterSavedLiters: number;
  peopleServed: number;
  economicSavingsInr: number;
  mealsDonatedMonth: number;
  foodSavedKgMonth: number;
  mealsSavedMonth: number;
  totalInstitutions: number;
  totalNGOs: number;
  activeRedistributions: number;
}

export interface OperationalNotification {
  id: string;
  type: 'URGENT' | 'AI_INSIGHT' | 'MATCH' | 'SUCCESS' | 'URGENT_SURPLUS' | 'REDISTRIBUTION_STAGE' | 'PROCUREMENT';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionTab?: string;
}

export interface KitchenSettings {
  kitchenName: string;
  location: string;
  fssaiNumber: string;
  maxCapacity: number;
  safetyBufferPercent: number;
  urgentThresholdMins: number;
  criticalThresholdMins: number;
  defaultNgoPartner: string;
  complianceStandard: 'FSSAI_STANDARD' | 'STRICT_HAACP';
  notificationsEnabled: boolean;
  autoOrderCriticalProcurement: boolean;
  institutionName?: string;
  messCapacity?: number;
  safetyWindowThresholdMins?: number;
  defaultSafetyBufferMeals?: number;
  fssaiLicenseNumber?: string;
  temperatureAlertThresholdCelsius?: number;
  autoDispatchUrgentSurplus?: boolean;
}

export interface ActionPlanItem {
  id: string;
  title: string;
  category: 'production' | 'surplus' | 'procurement' | 'waste';
  description: string;
  potentialBenefit: string;
  actionLabel: string;
  actionTab?: string;
  urgent?: boolean;
}
