import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const { darkMode } = useTheme();
  
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  // Color classes
  const colorClasses = {
    primary: darkMode ? 'bg-blue-600' : 'bg-blue-500',
    success: darkMode ? 'bg-green-600' : 'bg-green-500',
    warning: darkMode ? 'bg-yellow-600' : 'bg-yellow-500',
    danger: darkMode ? 'bg-red-600' : 'bg-red-500',
    default: darkMode ? 'bg-gray-600' : 'bg-gray-500',
  };
  
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && <span className="text-sm font-medium">{value}{max !== 100 && `/${max}`}</span>}
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
