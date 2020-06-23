import useStorage from "./use-storage";

export default function useLocalStorage(key, initialValue) {
  return useStorage(window.localStorage, key, initialValue);
}
