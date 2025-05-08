import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
  barColor?: string;
  showValues?: boolean;
  className?: string;
  title?: string;
  maxValue?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  barColor,
  showValues = true,
  className = '',
  title,
  maxValue,
}) => {
  const { darkMode } = useTheme();
  
  // Calculate the maximum value for scaling
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value)) * 1.1;
  
  // Default bar color based on theme
  const defaultBarColor = darkMode ? 'bg-blue-600' : 'bg-blue-500';
  const actualBarColor = barColor || defaultBarColor;
  
  return (
    <div className={className}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      
      <div className="h-full" style={{ height: `${height}px` }}>
        <div className="flex items-end h-full space-x-2">
          {data.map((item, index) => {
            const barHeight = (item.value / calculatedMax) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {showValues && (
                  <div className="text-xs mb-1">{item.value}</div>
                )}
                <div 
                  className={`w-full ${actualBarColor} rounded-t`} 
                  style={{ height: `${barHeight}%` }}
                ></div>
                <div className="mt-2 text-xs">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
