import { useState, useEffect } from "react";

export function useDebouncedValue(input: string, time = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(input);

  // every time input value has changed - set interval before it's actually commited
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debouncedValue;
}
