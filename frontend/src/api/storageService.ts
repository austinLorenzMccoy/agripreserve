import apiClient from './apiClient';

// Types for storage data
export interface StorageSolution {
  id: string;
  name: string;
  description: string;
  suitableCrops: string[];
  costRange: string;
  efficiency: number;
  implementationTime: string;
  maintenanceCost: string;
  imageUrl?: string;
}

export interface StorageUnit {
  id: string;
  name: string;
  type: string;
  temperature: string;
  humidity: string;
  crops: string[];
  status: 'Optimal' | 'Warning' | 'Critical';
  lastCheck: string;
  alertLevel: 'none' | 'warning' | 'critical';
}

export interface StorageCondition {
  temperature: number;
  humidity: number;
  timestamp: string;
  unitId: string;
}

// Service for storage solutions data
const storageService = {
  // Get all storage solutions
  getAllSolutions: async () => {
    const response = await apiClient.get('/storage/solutions');
    return response.data as StorageSolution[];
  },
  
  // Get storage solutions filtered by crop type
  getSolutionsByCrop: async (cropType: string) => {
    const response = await apiClient.get(`/storage/solutions?crop=${cropType}`);
    return response.data as StorageSolution[];
  },
  
  // Get storage solution by id
  getSolutionById: async (id: string) => {
    const response = await apiClient.get(`/storage/solutions/${id}`);
    return response.data as StorageSolution;
  },
  
  // Get all storage units
  getAllUnits: async () => {
    const response = await apiClient.get('/storage/units');
    return response.data as StorageUnit[];
  },
  
  // Get storage unit by id
  getUnitById: async (id: string) => {
    const response = await apiClient.get(`/storage/units/${id}`);
    return response.data as StorageUnit;
  },
  
  // Get storage conditions for a unit
  getUnitConditions: async (unitId: string, timeFrame: string = '24h') => {
    const response = await apiClient.get(`/storage/conditions/${unitId}?timeFrame=${timeFrame}`);
    return response.data as StorageCondition[];
  },
  
  // Update storage unit settings
  updateUnitSettings: async (unitId: string, settings: Partial<StorageUnit>) => {
    const response = await apiClient.put(`/storage/units/${unitId}`, settings);
    return response.data;
  },
  
  // Calculate ROI for a storage solution
  calculateROI: async (solutionId: string, params: {
    cropType: string;
    quantity: number;
    currentLossRate: number;
    implementationCost: number;
  }) => {
    const response = await apiClient.post(`/storage/roi/${solutionId}`, params);
    return response.data;
  }
};

export default storageService;
