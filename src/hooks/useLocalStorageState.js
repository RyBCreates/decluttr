import { useEffect, useState } from "react";

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        if (saved === "true") return true;
        if (saved === "false") return false;
        return saved;
      }
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      const value = typeof state === "string" ? state : JSON.stringify(state);
      localStorage.setItem(key, value);
    } catch {}
  }, [key, state]);

  return [state, setState];
}
