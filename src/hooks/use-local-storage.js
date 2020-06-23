import useStorage from "./use-storage";
import { isBrowser } from "../util/is-browser";
import { storageShim } from "../util/storage-shim";

export default function useLocalStorage(key, initialValue) {
  return useStorage(
    isBrowser() ? window.localStorage : storageShim,
    key,
    initialValue
  );
}
