import { useState, useEffect } from "react";

export function useDebounceValue(inputValue: string, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // Re-run this effect, and hence reset the timer every time the input value changes (i.e. user has entered a character). The debounced value is not set until the delay has elapsed (i.e. user stops typing for 1000 ms by default).
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}
