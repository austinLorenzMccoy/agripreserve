import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '../api/marketService';
import type { MarketOpportunity, Transaction, PriceTrend } from '../api/marketService';

export const useMarketOpportunities = (filters?: {
  cropType?: string;
  buyerType?: string;
  maxDistance?: number;
}) => {
  return useQuery<MarketOpportunity[]>(
    ['marketOpportunities', filters],
    () => filters 
      ? marketService.getFilteredOpportunities(filters) 
      : marketService.getAllOpportunities()
  );
};

export const useMarketOpportunity = (id: string) => {
  return useQuery<MarketOpportunity>(
    ['marketOpportunity', id],
    () => marketService.getOpportunityById(id),
    {
      enabled: !!id, // Only fetch if id is provided
    }
  );
};

export const useContactBuyer = () => {
  return useMutation(
    ({ opportunityId, message }: { opportunityId: string; message: string }) => 
      marketService.contactBuyer(opportunityId, message)
  );
};

export const useListProduce = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (produceData: {
      cropType: string;
      quantity: string;
      price: string;
      location: string;
      availableUntil: string;
      description: string;
    }) => marketService.listProduce(produceData),
    {
      onSuccess: () => {
        // Invalidate and refetch market opportunities
        queryClient.invalidateQueries(['marketOpportunities']);
      }
    }
  );
};

export const useRecentTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ['recentTransactions'],
    queryFn: () => marketService.getRecentTransactions(),
  });
};

export const usePriceTrends = () => {
  return useQuery<PriceTrend[]>({
    queryKey: ['priceTrends'],
    queryFn: () => marketService.getPriceTrends(),
    refetchInterval: 3600000, // Refetch every hour
  });
};
