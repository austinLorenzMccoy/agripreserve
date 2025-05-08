// Common types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Crop Loss types
export interface CropLossData {
  id: string;
  crop: string;
  state: string;
  region: string;
  year: number;
  lossPercentage: number;
  lossTonnage: number;
  value: number;
}

export interface LossTrend {
  year: number;
  lossPercentage: number;
  lossTonnage: number;
}

export interface LossFactor {
  factor: string;
  percentage: number;
  description: string;
}

export interface CropLossStats {
  totalLoss: number;
  averageLossPercentage: number;
  highestLossRegion: string;
  lowestLossRegion: string;
  yearOverYearChange: number;
}

// Storage types
export interface StorageSolution {
  id: string;
  name: string;
  type: string;
  capacity: number;
  costPerTon: number;
  effectivenessRating: number;
  description: string;
  imageUrl?: string;
}

export interface StorageUnit {
  id: string;
  solutionId: string;
  location: string;
  capacity: number;
  currentUsage: number;
  temperature: number;
  humidity: number;
  status: 'operational' | 'maintenance' | 'offline';
  lastUpdated: string;
}

export interface StorageCondition {
  temperature: number;
  humidity: number;
  co2Level: number;
  ethyleneLevel: number;
  isOptimal: boolean;
}

// Market types
export interface MarketOpportunity {
  id: string;
  buyerName: string;
  buyerType: 'processor' | 'retailer' | 'exporter' | 'wholesaler';
  crop: string;
  quantity: number;
  pricePerTon: number;
  location: string;
  distance: number;
  deadline: string;
  requirements: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface Transaction {
  id: string;
  date: string;
  crop: string;
  quantity: number;
  price: number;
  buyer: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface PriceTrend {
  date: string;
  price: number;
  volume: number;
}

// ML Model types
export interface MLModel {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  accuracy: number;
  lastUpdated: string;
  status: 'active' | 'training' | 'deprecated';
}

export interface PerformanceMetric {
  metricName: string;
  value: number;
  description: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
}

export interface PredictionInput {
  crop: string;
  state: string;
  harvestMonth: number;
  storageType: string;
  temperature: number;
  humidity: number;
  duration: number;
}

export interface PredictionResult {
  predictedLoss: number;
  confidence: number;
  recommendations: string[];
}
