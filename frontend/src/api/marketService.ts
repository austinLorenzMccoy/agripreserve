import apiClient from './apiClient';

// Types for market data
export interface MarketOpportunity {
  id: string;
  buyer: string;
  cropType: string;
  quantity: string;
  price: string;
  location: string;
  distance: string;
  deadline: string;
  requirements: string;
  contactPerson: string;
  contactEmail: string;
  type: 'retail' | 'restaurant' | 'processor' | 'cooperative' | 'institutional';
}

export interface Transaction {
  id: string;
  date: string;
  buyer: string;
  cropType: string;
  quantity: string;
  totalValue: string;
  status: string;
}

export interface PriceTrend {
  crop: string;
  currentPrice: number;
  lastWeek: number;
  lastMonth: number;
}

// Service for market connections data
const marketService = {
  // Get all market opportunities
  getAllOpportunities: async () => {
    const response = await apiClient.get('/market/opportunities');
    return response.data as MarketOpportunity[];
  },
  
  // Get filtered market opportunities
  getFilteredOpportunities: async (filters: {
    cropType?: string;
    buyerType?: string;
    maxDistance?: number;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (filters.cropType) queryParams.append('cropType', filters.cropType);
    if (filters.buyerType) queryParams.append('buyerType', filters.buyerType);
    if (filters.maxDistance) queryParams.append('maxDistance', filters.maxDistance.toString());
    
    const response = await apiClient.get(`/market/opportunities?${queryParams.toString()}`);
    return response.data as MarketOpportunity[];
  },
  
  // Get opportunity by id
  getOpportunityById: async (id: string) => {
    const response = await apiClient.get(`/market/opportunities/${id}`);
    return response.data as MarketOpportunity;
  },
  
  // Contact buyer for an opportunity
  contactBuyer: async (opportunityId: string, message: string) => {
    const response = await apiClient.post(`/market/contact/${opportunityId}`, { message });
    return response.data;
  },
  
  // List produce for sale
  listProduce: async (produceData: {
    cropType: string;
    quantity: string;
    price: string;
    location: string;
    availableUntil: string;
    description: string;
  }) => {
    const response = await apiClient.post('/market/listings', produceData);
    return response.data;
  },
  
  // Get recent transactions
  getRecentTransactions: async () => {
    const response = await apiClient.get('/market/transactions');
    return response.data as Transaction[];
  },
  
  // Get market price trends
  getPriceTrends: async () => {
    const response = await apiClient.get('/market/price-trends');
    return response.data as PriceTrend[];
  }
};

export default marketService;
