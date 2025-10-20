import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const stableInitialValue = useRef(initialValue).current;

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : stableInitialValue);
    } catch {
      setStoredValue(stableInitialValue);
    }
  }, [key, stableInitialValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch {}
  };

  return [storedValue, setValue] as const;
}
