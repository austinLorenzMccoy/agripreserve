import { useQuery, useMutation } from '@tanstack/react-query';
import mlModelService from '../api/mlModelService';
import type { MLModel, PerformanceMetric, FeatureImportance, PredictionInput, PredictionResult } from '../api/mlModelService';

export const useMLModels = () => {
  return useQuery<MLModel[]>(
    ['mlModels'],
    () => mlModelService.getAllModels()
  );
};

export const useMLModel = (id: string) => {
  return useQuery<MLModel>(
    ['mlModel', id],
    () => mlModelService.getModelById(id),
    {
      enabled: !!id, // Only fetch if id is provided
    }
  );
};

export const usePerformanceMetrics = (modelId: string) => {
  return useQuery<PerformanceMetric[]>(
    ['performanceMetrics', modelId],
    () => mlModelService.getPerformanceMetrics(modelId),
    {
      enabled: !!modelId, // Only fetch if modelId is provided
    }
  );
};

export const useFeatureImportance = (modelId: string) => {
  return useQuery<FeatureImportance[]>(
    ['featureImportance', modelId],
    () => mlModelService.getFeatureImportance(modelId),
    {
      enabled: !!modelId, // Only fetch if modelId is provided
    }
  );
};

export const useRunPrediction = (modelId: string) => {
  return useMutation<PredictionResult, Error, PredictionInput>(
    (input: PredictionInput) => mlModelService.runPrediction(modelId, input)
  );
};

export const useModelLogs = (modelId: string) => {
  return useQuery(
    ['modelLogs', modelId],
    () => mlModelService.getModelLogs(modelId),
    {
      enabled: !!modelId, // Only fetch if modelId is provided
    }
  );
};

export const useMLflowStatus = () => {
  return useQuery(
    ['mlflowStatus'],
    () => mlModelService.getMlflowStatus(),
    {
      refetchInterval: 60000 // Refetch every minute
    }
  );
};

export const useMLflowUrl = () => {
  return useQuery<string>({
    queryKey: ['mlflowUrl'],
    queryFn: () => mlModelService.getMlflowUrl(),
  });
};
