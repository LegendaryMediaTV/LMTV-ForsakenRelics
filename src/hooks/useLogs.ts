// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Reactive log hook using useSyncExternalStore */
export const useLogs = () => {
  const engine = useEngine();

  return useSyncExternalStore(engine.onLogChange, engine.getLogSnapshot);
};
