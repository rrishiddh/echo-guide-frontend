"use client";

import { useState, useCallback, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../utils/localStorage";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getLocalStorage<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setLocalStorage(key, valueToStore);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      removeLocalStorage(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};
