import React from 'react';
import { Card, Button, Badge } from '../ui';
import { useMarketOpportunities } from '../../hooks';
import { useTheme } from '../../context/ThemeContext';

interface MarketOpportunitiesWidgetProps {
  className?: string;
  title?: string;
  limit?: number;
  filters?: {
    cropType?: string;
    buyerType?: string;
    maxDistance?: number;
  };
  onViewDetails?: (opportunityId: string) => void;
}

const MarketOpportunitiesWidget: React.FC<MarketOpportunitiesWidgetProps> = ({
  className = '',
  title = 'Market Opportunities',
  limit = 3,
  filters,
  onViewDetails,
}) => {
  const { darkMode } = useTheme();
  const { data, isLoading, error } = useMarketOpportunities(filters);
  
  if (isLoading) {
    return (
      <Card title={title} className={`${className} animate-pulse`}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="h-24"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (error || !data) {
    return (
      <Card title={title} className={className}>
        <p className="text-center text-gray-500">Failed to load market opportunities data.</p>
      </Card>
    );
  }
  
  // Using mock data for now, would use actual data from API in production
  const opportunities = [
    {
      id: 'opp-1',
      buyer: 'FreshMart Supermarkets',
      cropType: 'Tomatoes',
      quantity: '500 kg',
      price: '$2.30/kg',
      location: 'Urban',
      distance: '15 km',
      deadline: '3 days',
      type: 'retail'
    },
    {
      id: 'opp-2',
      buyer: 'GreenLeaf Restaurants',
      cropType: 'Mixed Vegetables',
      quantity: '200 kg',
      price: '$2.80/kg',
      location: 'Urban',
      distance: '8 km',
      deadline: '2 days',
      type: 'restaurant'
    },
    {
      id: 'opp-3',
      buyer: 'HarvestCo Processing',
      cropType: 'Potatoes',
      quantity: '2000 kg',
      price: '$0.95/kg',
      location: 'Rural',
      distance: '35 km',
      deadline: '7 days',
      type: 'processor'
    },
  ];
  
  const limitedOpportunities = opportunities.slice(0, limit);
  
  return (
    <Card title={title} className={className}>
      <div className="space-y-4">
        {limitedOpportunities.map(opportunity => (
          <div 
            key={opportunity.id} 
            className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">{opportunity.buyer}</h3>
              <Badge variant="primary" rounded>
                {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
              </Badge>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Crop:</span>
                <span className="ml-2">{opportunity.cropType}</span>
              </div>
              <div>
                <span className="text-gray-500">Quantity:</span>
                <span className="ml-2">{opportunity.quantity}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-2">{opportunity.price}</span>
              </div>
              <div>
                <span className="text-gray-500">Distance:</span>
                <span className="ml-2">{opportunity.distance}</span>
              </div>
              <div>
                <span className="text-gray-500">Deadline:</span>
                <span className="ml-2">{opportunity.deadline}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                size="sm" 
                fullWidth
                onClick={() => onViewDetails && onViewDetails(opportunity.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {opportunities.length > limit && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View All Opportunities
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MarketOpportunitiesWidget;
