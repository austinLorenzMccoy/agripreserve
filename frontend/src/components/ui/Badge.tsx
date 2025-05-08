import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
}) => {
  const { darkMode } = useTheme();
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  // Variant classes
  const variantClasses = {
    primary: darkMode 
      ? 'bg-blue-900 text-blue-300' 
      : 'bg-blue-100 text-blue-800',
    success: darkMode 
      ? 'bg-green-900 text-green-300' 
      : 'bg-green-100 text-green-800',
    warning: darkMode 
      ? 'bg-yellow-900 text-yellow-300' 
      : 'bg-yellow-100 text-yellow-800',
    danger: darkMode 
      ? 'bg-red-900 text-red-300' 
      : 'bg-red-100 text-red-800',
    info: darkMode 
      ? 'bg-purple-900 text-purple-300' 
      : 'bg-purple-100 text-purple-800',
    default: darkMode 
      ? 'bg-gray-700 text-gray-300' 
      : 'bg-gray-200 text-gray-800',
  };
  
  // Border radius
  const radiusClasses = rounded ? 'rounded-full' : 'rounded';
  
  return (
    <span className={`inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${radiusClasses} font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
