import React from 'react';
import { Card, BarChart } from '../ui';
import { useLossTrends } from '../../hooks';

interface LossTrendWidgetProps {
  timeFrame?: string;
  cropType?: string;
  className?: string;
  title?: string;
  height?: number;
}

const LossTrendWidget: React.FC<LossTrendWidgetProps> = ({
  timeFrame = '6months',
  cropType = 'all',
  className = '',
  title = 'Loss Trend',
  height = 200,
}) => {
  const { data, isLoading, error } = useLossTrends(timeFrame, cropType);
  
  if (isLoading) {
    return (
      <Card title={title} className={`${className} animate-pulse`}>
        <div className="h-64"></div>
      </Card>
    );
  }
  
  if (error || !data) {
    return (
      <Card title={title} className={className}>
        <p className="text-center text-gray-500">Failed to load loss trend data.</p>
      </Card>
    );
  }
  
  // Using mock data for now, would use actual data from API in production
  const trendData = [
    { label: 'Jan', value: 24 },
    { label: 'Feb', value: 28 },
    { label: 'Mar', value: 22 },
    { label: 'Apr', value: 19 },
    { label: 'May', value: 21 },
    { label: 'Jun', value: 25 },
  ];
  
  return (
    <Card title={title} className={className}>
      <BarChart 
        data={trendData} 
        height={height} 
        barColor="bg-red-500"
      />
    </Card>
  );
};

export default LossTrendWidget;
