import useStorage from "./use-storage";
import { isBrowser } from "../util/is-browser";
import { storageShim } from "../util/storage-shim";

export default function useSessionStorage(key, initialValue) {
  return useStorage(
    isBrowser() ? window.sessionStorage : storageShim,
    key,
    initialValue
  );
}
