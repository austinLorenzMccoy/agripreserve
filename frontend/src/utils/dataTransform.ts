/**
 * Utility functions for data transformation
 */

/**
 * Group an array of objects by a key
 * @param array Array to group
 * @param key Key to group by
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Sort an array of objects by a key
 * @param array Array to sort
 * @param key Key to sort by
 * @param direction Sort direction
 */
export const sortBy = <T>(
  array: T[], 
  key: keyof T, 
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filter an array of objects by a key and value
 * @param array Array to filter
 * @param key Key to filter by
 * @param value Value to filter by
 */
export const filterBy = <T>(array: T[], key: keyof T, value: any): T[] => {
  return array.filter(item => item[key] === value);
};

/**
 * Search an array of objects by a key and search term
 * @param array Array to search
 * @param keys Keys to search in
 * @param searchTerm Search term
 */
export const searchBy = <T>(array: T[], keys: (keyof T)[], searchTerm: string): T[] => {
  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      if (typeof value === 'number') {
        return value.toString().includes(term);
      }
      return false;
    });
  });
};

/**
 * Calculate the sum of a key in an array of objects
 * @param array Array to sum
 * @param key Key to sum
 */
export const sumBy = <T>(array: T[], key: keyof T): number => {
  return array.reduce((sum, item) => {
    const value = item[key];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
};

/**
 * Calculate the average of a key in an array of objects
 * @param array Array to average
 * @param key Key to average
 */
export const averageBy = <T>(array: T[], key: keyof T): number => {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
};

/**
 * Find the maximum value of a key in an array of objects
 * @param array Array to search
 * @param key Key to find maximum of
 */
export const maxBy = <T>(array: T[], key: keyof T): number => {
  if (array.length === 0) return 0;
  return Math.max(...array.map(item => {
    const value = item[key];
    return typeof value === 'number' ? value : 0;
  }));
};

/**
 * Find the minimum value of a key in an array of objects
 * @param array Array to search
 * @param key Key to find minimum of
 */
export const minBy = <T>(array: T[], key: keyof T): number => {
  if (array.length === 0) return 0;
  return Math.min(...array.map(item => {
    const value = item[key];
    return typeof value === 'number' ? value : 0;
  }));
};
