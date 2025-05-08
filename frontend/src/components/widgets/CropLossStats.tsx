import React from 'react';
import { Card, Stat } from '../ui';
import { useCropLossStats } from '../../hooks';

interface CropLossStatsProps {
  timeFrame?: string;
  className?: string;
}

const CropLossStats: React.FC<CropLossStatsProps> = ({
  timeFrame = '6months',
  className = '',
}) => {
  const { data, isLoading, error } = useCropLossStats(timeFrame);
  
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24"></div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <Card className={className}>
        <p className="text-center text-gray-500">Failed to load crop loss statistics.</p>
      </Card>
    );
  }
  
  // Using mock data for now, would use actual data from API in production
  const stats = [
    {
      title: 'Average Loss Rate',
      value: '23.2%',
      change: { value: '-1.8%', isPositive: true },
      description: 'Compared to previous period',
    },
    {
      title: 'Financial Impact',
      value: '$34,250',
      change: { value: '2.4%', isPositive: false },
      description: 'Estimated loss value',
    },
    {
      title: 'Preventable Loss',
      value: '68%',
      change: { value: '5%', isPositive: true },
      description: 'Of total loss is preventable',
    },
  ];
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default CropLossStats;
