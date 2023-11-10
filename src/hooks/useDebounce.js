import { useState, useEffect } from 'react'

/**
 * Debounces the given value by the specified number of milliseconds.
 *
 * @param {any} value - The value to debounce.
 * @param {number} milliSeconds - The number of milliseconds to debounce the value.
 * @return {any} The debounced value.
 */
export const useDebounce = (value, milliSeconds) => {
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedValue(value);
   }, milliSeconds);

   return () => {
     clearTimeout(handler);
   };
 }, [value, milliSeconds]);

 return debouncedValue;
};