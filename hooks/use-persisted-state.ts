import { useState } from "react";

export const usePersistedState = <T>(
  key: string,
  initialValue?: T,
): [T, (value: T) => void] => {
  if (typeof window === "undefined") {
    throw new Error("localstorage is not available");
  }

  const [state, setState] = useState<T>(() => {
    let persisted = localStorage.getItem(key);

    if (!persisted) {
      return initialValue;
    }

    return JSON.parse(persisted);
  });

  const setNewState = (value: T) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setNewState];
};
