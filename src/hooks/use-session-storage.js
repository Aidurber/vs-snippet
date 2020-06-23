import useStorage from "./use-storage";

export default function useSessionStorage(key, initialValue) {
  return useStorage(window.sessionStorage, key, initialValue);
}
