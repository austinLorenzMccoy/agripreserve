/**
 * Utility functions for data validation
 */

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value Value to check
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
};

/**
 * Validate an email address
 * @param email Email to validate
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
 * @param password Password to validate
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber;
};

/**
 * Validate a URL
 * @param url URL to validate
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate a phone number (simple validation)
 * @param phone Phone number to validate
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Check if it has at least 10 digits
  return digits.length >= 10;
};

/**
 * Check if a number is within a range
 * @param value Number to check
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Check if a date is in the future
 * @param date Date to check
 */
export const isFutureDate = (date: Date): boolean => {
  const now = new Date();
  return date > now;
};

/**
 * Check if a date is in the past
 * @param date Date to check
 */
export const isPastDate = (date: Date): boolean => {
  const now = new Date();
  return date < now;
};
