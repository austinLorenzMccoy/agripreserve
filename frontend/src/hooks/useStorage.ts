import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import storageService from '../api/storageService';
import type { StorageUnit, StorageCondition } from '../api/storageService';

export const useStorageSolutions = (cropType?: string) => {
  return useQuery(
    ['storageSolutions', cropType],
    () => cropType 
      ? storageService.getSolutionsByCrop(cropType) 
      : storageService.getAllSolutions()
  );
};

export const useStorageSolution = (id: string) => {
  return useQuery(
    ['storageSolution', id],
    () => storageService.getSolutionById(id),
    {
      enabled: !!id // Only fetch if id is provided
    }
  );
};

export const useStorageUnits = () => {
  return useQuery<StorageUnit[]>(
    ['storageUnits'],
    () => storageService.getAllUnits()
  );
};

export const useStorageUnit = (id: string) => {
  return useQuery<StorageUnit>(
    ['storageUnit', id],
    () => storageService.getUnitById(id),
    {
      enabled: !!id // Only fetch if id is provided
    }
  );
};

export const useStorageConditions = (unitId: string, timeFrame: string = '24h') => {
  return useQuery<StorageCondition[]>(
    ['storageConditions', unitId, timeFrame],
    () => storageService.getUnitConditions(unitId, timeFrame),
    {
      enabled: !!unitId, // Only fetch if unitId is provided
      refetchInterval: 60000 // Refetch every minute
    }
  );
};

export const useUpdateStorageUnit = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ unitId, settings }: { unitId: string; settings: Partial<StorageUnit> }) => 
      storageService.updateUnitSettings(unitId, settings),
    {
      onSuccess: (_, variables) => {
        // Invalidate and refetch storage unit data
        queryClient.invalidateQueries(['storageUnit', variables.unitId]);
        queryClient.invalidateQueries(['storageUnits']);
      }
    }
  );
};

export const useCalculateROI = (solutionId: string) => {
  return useMutation(
    (params: {
      cropType: string;
      quantity: number;
      currentLossRate: number;
      implementationCost: number;
    }) => storageService.calculateROI(solutionId, params)
  );
};
