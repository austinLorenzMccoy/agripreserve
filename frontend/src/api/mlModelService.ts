import apiClient from './apiClient';

// Types for ML model data
export interface MLModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  lastUpdated: string;
  status: 'Production' | 'Testing' | 'Development';
  features: string[];
  creator: string;
  description: string;
}

export interface PerformanceMetric {
  date: string;
  accuracy: number;
  precision: number;
  recall: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PredictionInput {
  cropType: string;
  temperature: number;
  humidity: number;
  storageType: string;
  harvestMethod: string;
  [key: string]: string | number | boolean;
}

export interface PredictionResult {
  predictedLossRate: number;
  marginOfError: number;
  contributingFactors: Array<{
    factor: string;
    impact: number;
  }>;
  recommendations: string[];
}

// Service for ML model data
const mlModelService = {
  // Get all ML models
  getAllModels: async () => {
    const response = await apiClient.get('/ml/models');
    return response.data as MLModel[];
  },
  
  // Get model by id
  getModelById: async (id: string) => {
    const response = await apiClient.get(`/ml/models/${id}`);
    return response.data as MLModel;
  },
  
  // Get performance metrics for a model
  getPerformanceMetrics: async (modelId: string) => {
    const response = await apiClient.get(`/ml/models/${modelId}/performance`);
    return response.data as PerformanceMetric[];
  },
  
  // Get feature importance for a model
  getFeatureImportance: async (modelId: string) => {
    const response = await apiClient.get(`/ml/models/${modelId}/features`);
    return response.data as FeatureImportance[];
  },
  
  // Run a prediction using a model
  runPrediction: async (modelId: string, input: PredictionInput) => {
    const response = await apiClient.post(`/ml/models/${modelId}/predict`, input);
    return response.data as PredictionResult;
  },
  
  // Get model logs
  getModelLogs: async (modelId: string) => {
    const response = await apiClient.get(`/ml/models/${modelId}/logs`);
    return response.data;
  },
  
  // Get MLflow server status
  getMlflowStatus: async () => {
    const response = await apiClient.get('/ml/mlflow/status');
    return response.data;
  },
  
  // Get MLflow server URL
  getMlflowUrl: async () => {
    const response = await apiClient.get('/ml/mlflow/url');
    return response.data.url as string;
  }
};

export default mlModelService;
