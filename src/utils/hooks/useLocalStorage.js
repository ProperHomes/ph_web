import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const value = window.localStorage.getItem(key);
        if (value) {
          setStoredValue(JSON.parse(value));
        } else if (initialValue) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
          setStoredValue(initialValue);
        }
      } catch (err) {
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = (value) => {
    if (typeof window !== "undefined") {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeKey = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    }
  };

  return [storedValue, setValue, removeKey];
}

export default useLocalStorage;
