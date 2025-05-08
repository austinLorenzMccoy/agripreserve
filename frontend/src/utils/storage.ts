/**
 * Utility functions for working with localStorage
 */

/**
 * Get an item from localStorage with type safety
 * @param key The key to get
 * @param defaultValue Default value if key doesn't exist
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage with type safety
 * @param key The key to set
 * @param value The value to set
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};

/**
 * Remove an item from localStorage
 * @param key The key to remove
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Get all keys from localStorage
 */
export const getStorageKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting keys from localStorage:', error);
    return [];
  }
};
