import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface AlertProps {
  children: ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  title,
  variant = 'info',
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const { darkMode } = useTheme();
  
  // Variant styles
  const variantStyles = {
    info: {
      bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-100',
      border: 'border-blue-500',
      text: darkMode ? 'text-blue-300' : 'text-blue-800',
      title: darkMode ? 'text-blue-400' : 'text-blue-700',
    },
    success: {
      bg: darkMode ? 'bg-green-900/30' : 'bg-green-100',
      border: 'border-green-500',
      text: darkMode ? 'text-green-300' : 'text-green-800',
      title: darkMode ? 'text-green-400' : 'text-green-700',
    },
    warning: {
      bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100',
      border: 'border-yellow-500',
      text: darkMode ? 'text-yellow-300' : 'text-yellow-800',
      title: darkMode ? 'text-yellow-400' : 'text-yellow-700',
    },
    error: {
      bg: darkMode ? 'bg-red-900/30' : 'bg-red-100',
      border: 'border-red-500',
      text: darkMode ? 'text-red-300' : 'text-red-800',
      title: darkMode ? 'text-red-400' : 'text-red-700',
    },
  };
  
  const style = variantStyles[variant];
  
  return (
    <div className={`p-4 rounded-lg ${style.bg} border-l-4 ${style.border} ${style.text} ${className}`}>
      <div className="flex">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
        <div className="flex-1">
          {title && <div className={`font-medium ${style.title}`}>{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${style.bg} ${style.text} rounded-lg focus:ring-2 focus:ring-offset-2 p-1.5 inline-flex h-8 w-8 hover:bg-opacity-75`}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
