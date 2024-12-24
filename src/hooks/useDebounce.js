import { useRef } from "react";

export const useDebounce = (fn, delay = 400) => {
  let timer = useRef();

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, delay, ...args);
  };
};
