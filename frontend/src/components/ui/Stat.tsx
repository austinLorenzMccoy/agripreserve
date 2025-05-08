import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface StatProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive?: boolean;
  };
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({
  title,
  value,
  change,
  description,
  className = '',
  icon,
}) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'} ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">{value}</p>
            {change && (
              <p className={`ml-2 text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change.isPositive ? '+' : ''}{change.value}
              </p>
            )}
          </div>
          {description && <p className="mt-4 text-sm text-gray-500">{description}</p>}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
};

export default Stat;
