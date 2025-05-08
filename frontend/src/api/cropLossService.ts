import apiClient from './apiClient';

// Types for crop loss data
export interface CropLossData {
  id: string;
  cropType: string;
  lossPercentage: number;
  quantity: number;
  value: number;
  date: string;
  location: string;
  cause: string;
  preventable: boolean;
}

export interface LossTrend {
  period: string;
  lossPercentage: number;
}

export interface LossFactor {
  factor: string;
  percentage: number;
}

// Service for crop loss data
const cropLossService = {
  // Get overall loss statistics
  getOverallStats: async (timeFrame: string = '6months') => {
    const response = await apiClient.get(`/crop-loss/stats?timeFrame=${timeFrame}`);
    return response.data;
  },
  
  // Get loss data for a specific crop
  getCropLossData: async (cropType: string, timeFrame: string = '6months') => {
    const response = await apiClient.get(`/crop-loss/crop/${cropType}?timeFrame=${timeFrame}`);
    return response.data;
  },
  
  // Get loss trends over time
  getLossTrends: async (timeFrame: string = '6months', cropType: string = 'all') => {
    const response = await apiClient.get(`/crop-loss/trends?timeFrame=${timeFrame}&cropType=${cropType}`);
    return response.data as LossTrend[];
  },
  
  // Get loss factors
  getLossFactors: async (cropType: string = 'all') => {
    const response = await apiClient.get(`/crop-loss/factors?cropType=${cropType}`);
    return response.data as LossFactor[];
  },
  
  // Submit new loss data
  submitLossData: async (lossData: Omit<CropLossData, 'id'>) => {
    const response = await apiClient.post('/crop-loss', lossData);
    return response.data;
  },
  
  // Update existing loss data
  updateLossData: async (id: string, lossData: Partial<CropLossData>) => {
    const response = await apiClient.put(`/crop-loss/${id}`, lossData);
    return response.data;
  },
  
  // Delete loss data
  deleteLossData: async (id: string) => {
    const response = await apiClient.delete(`/crop-loss/${id}`);
    return response.data;
  },
  
  // Get recommendations for reducing loss
  getRecommendations: async (cropType: string = 'all') => {
    const response = await apiClient.get(`/crop-loss/recommendations?cropType=${cropType}`);
    return response.data;
  }
};

export default cropLossService;
