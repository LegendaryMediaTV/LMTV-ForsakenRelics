// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Pub-sub for working with adventure logs from the game engine */
export const useLogs = () => {
  const engine = useEngine();

  return useSyncExternalStore(engine.onLogChange, engine.getLogSnapshot);
};
