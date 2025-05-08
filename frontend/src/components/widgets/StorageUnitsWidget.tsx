import React from 'react';
import { Card, Badge } from '../ui';
import { useStorageUnits } from '../../hooks';
import { useTheme } from '../../context/ThemeContext';

interface StorageUnitsWidgetProps {
  className?: string;
  title?: string;
  limit?: number;
}

const StorageUnitsWidget: React.FC<StorageUnitsWidgetProps> = ({
  className = '',
  title = 'Storage Units',
  limit = 3,
}) => {
  const { darkMode } = useTheme();
  const { data, isLoading, error } = useStorageUnits();
  
  if (isLoading) {
    return (
      <Card title={title} className={`${className} animate-pulse`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <p className="text-center text-gray-500">Failed to load storage units data.</p>
      </Card>
    );
  }
  
  // Using mock data for now, would use actual data from API in production
  const storageUnits = [
    {
      id: 'unit-a',
      name: 'Storage Unit A',
      type: 'Cold Storage',
      temperature: '4°C',
      humidity: '90%',
      crops: ['Apples', 'Carrots'],
      status: 'Optimal',
      lastCheck: '2 hours ago',
      alertLevel: 'none'
    },
    {
      id: 'unit-b',
      name: 'Storage Unit B',
      type: 'Cold Storage',
      temperature: '12°C',
      humidity: '85%',
      crops: ['Potatoes', 'Onions'],
      status: 'Warning',
      lastCheck: '1 hour ago',
      alertLevel: 'warning'
    },
    {
      id: 'unit-c',
      name: 'Storage Unit C',
      type: 'Evaporative Cooling',
      temperature: '18°C',
      humidity: '75%',
      crops: ['Tomatoes', 'Peppers'],
      status: 'Critical',
      lastCheck: '30 minutes ago',
      alertLevel: 'critical'
    },
  ];
  
  const limitedUnits = storageUnits.slice(0, limit);
  
  const getStatusVariant = (alertLevel: string) => {
    switch (alertLevel) {
      case 'none':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <Card title={title} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {limitedUnits.map(unit => (
          <div 
            key={unit.id} 
            className={`p-4 rounded-lg border ${
              unit.alertLevel === 'none' 
                ? darkMode ? 'border-gray-700' : 'border-gray-200'
                : unit.alertLevel === 'warning'
                  ? 'border-yellow-500'
                  : 'border-red-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">{unit.name}</h3>
              <Badge 
                variant={getStatusVariant(unit.alertLevel)}
                rounded
              >
                {unit.status}
              </Badge>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Type:</span>
                <span className="text-sm">{unit.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Temperature:</span>
                <span className="text-sm">{unit.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Humidity:</span>
                <span className="text-sm">{unit.humidity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Crops:</span>
                <span className="text-sm">{unit.crops.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Check:</span>
                <span className="text-sm">{unit.lastCheck}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {storageUnits.length > limit && (
        <div className="mt-4 text-center">
          <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
            View All Storage Units
          </button>
        </div>
      )}
    </Card>
  );
};

export default StorageUnitsWidget;
