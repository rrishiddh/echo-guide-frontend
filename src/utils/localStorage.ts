export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

export const clearLocalStorage = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const hasLocalStorage = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(key) !== null;
};

export const getLocalStorageKeys = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  return Object.keys(window.localStorage);
};

export const getLocalStorageSize = (): number => {
  if (typeof window === "undefined") {
    return 0;
  }

  let size = 0;
  for (const key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      size += window.localStorage[key].length + key.length;
    }
  }
  return size;
};