import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const { darkMode } = useTheme();
  
  // Base classes
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: darkMode 
      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
      : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: darkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
    outline: darkMode 
      ? 'border border-blue-600 text-blue-400 hover:bg-blue-900/30 focus:ring-blue-500' 
      : 'border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: darkMode 
      ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500' 
      : 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = (disabled || isLoading) 
    ? 'opacity-50 cursor-not-allowed' 
    : '';
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
