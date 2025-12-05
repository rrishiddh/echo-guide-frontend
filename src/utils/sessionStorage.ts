export const getSessionStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading sessionStorage key "${key}":`, error);
    return null;
  }
};

export const setSessionStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error);
  }
};

export const removeSessionStorage = (key: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing sessionStorage key "${key}":`, error);
  }
};

export const clearSessionStorage = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
};

export const hasSessionStorage = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(key) !== null;
};