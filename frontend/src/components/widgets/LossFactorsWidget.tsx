import React from 'react';
import { Card, ProgressBar } from '../ui';
import { useLossFactors } from '../../hooks';

interface LossFactorsWidgetProps {
  cropType?: string;
  className?: string;
  title?: string;
}

const LossFactorsWidget: React.FC<LossFactorsWidgetProps> = ({
  cropType = 'all',
  className = '',
  title = 'Loss Factors',
}) => {
  const { data, isLoading, error } = useLossFactors(cropType);
  
  if (isLoading) {
    return (
      <Card title={title} className={`${className} animate-pulse`}>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (error || !data) {
    return (
      <Card title={title} className={className}>
        <p className="text-center text-gray-500">Failed to load loss factors data.</p>
      </Card>
    );
  }
  
  // Using mock data for now, would use actual data from API in production
  const lossFactors = [
    { factor: 'Poor Storage Conditions', percentage: 35, color: 'primary' },
    { factor: 'Transportation Damage', percentage: 25, color: 'warning' },
    { factor: 'Pest Infestation', percentage: 15, color: 'danger' },
    { factor: 'Harvest Damage', percentage: 12, color: 'success' },
    { factor: 'Processing Inefficiency', percentage: 8, color: 'default' },
    { factor: 'Other Factors', percentage: 5, color: 'default' },
  ];
  
  return (
    <Card title={title} className={className}>
      <div className="space-y-4">
        {lossFactors.map((factor, index) => (
          <div key={index} className="flex items-center">
            <div className="w-48 text-sm">{factor.factor}</div>
            <div className="flex-1">
              <ProgressBar 
                value={factor.percentage} 
                color={factor.color as any}
                showValue={false}
              />
            </div>
            <div className="w-12 text-right text-sm">{factor.percentage}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LossFactorsWidget;
