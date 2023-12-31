import { useEffect, useState } from "react";
function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setdebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
