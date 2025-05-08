/**
 * Utility functions for formatting data
 */

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency symbol
 * @param decimals Number of decimal places
 */
export const formatCurrency = (
  value: number, 
  currency: string = '$', 
  decimals: number = 2
): string => {
  return `${currency}${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format a number as percentage
 * @param value Number to format (0-1 or 0-100)
 * @param decimals Number of decimal places
 * @param includeSymbol Whether to include the % symbol
 */
export const formatPercentage = (
  value: number, 
  decimals: number = 1, 
  includeSymbol: boolean = true
): string => {
  // If value is between 0 and 1, multiply by 100
  const normalizedValue = value > 0 && value <= 1 ? value * 100 : value;
  return `${normalizedValue.toFixed(decimals)}${includeSymbol ? '%' : ''}`;
};

/**
 * Format a date
 * @param date Date to format
 * @param format Format to use
 */
export const formatDate = (
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | 'relative' = 'medium'
): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'medium':
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    case 'long':
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
    case 'relative':
      return formatRelativeTime(dateObj);
    default:
      return dateObj.toLocaleDateString();
  }
};

/**
 * Format a date as relative time (e.g. "2 hours ago")
 * @param date Date to format
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format a file size
 * @param bytes Size in bytes
 * @param decimals Number of decimal places
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};
