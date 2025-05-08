import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import cropLossService from '../api/cropLossService';
import type { CropLossData, LossTrend, LossFactor } from '../api/cropLossService';

// Type for the crop loss data input to ensure compatibility with service
type CropLossInput = Omit<CropLossData, 'id'>;

export const useCropLossStats = (timeFrame: string = '6months') => {
  return useQuery(
    ['cropLossStats', timeFrame],
    () => cropLossService.getOverallStats(timeFrame)
  );
};

export const useCropLossData = (cropType: string, timeFrame: string = '6months') => {
  return useQuery(
    ['cropLossData', cropType, timeFrame],
    () => cropLossService.getCropLossData(cropType, timeFrame),
    {
      enabled: !!cropType && cropType !== 'all', // Only fetch if a specific crop is selected
    }
  );
};

export const useLossTrends = (timeFrame: string = '6months', cropType: string = 'all') => {
  return useQuery<LossTrend[]>(
    ['lossTrends', timeFrame, cropType],
    () => cropLossService.getLossTrends(timeFrame, cropType)
  );
};

export const useLossFactors = (cropType: string = 'all') => {
  return useQuery<LossFactor[]>(
    ['lossFactors', cropType],
    () => cropLossService.getLossFactors(cropType)
  );
};

export const useRecommendations = (cropType: string = 'all') => {
  return useQuery(
    ['recommendations', cropType],
    () => cropLossService.getRecommendations(cropType)
  );
};

// Hook for submitting loss data
export const useSubmitLossData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const submitLossData = async (lossData: CropLossInput) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      
      await cropLossService.submitLossData(lossData);
      setSuccess(true);
      
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitLossData, isSubmitting, error, success };
};
