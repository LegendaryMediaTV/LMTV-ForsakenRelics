// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Pub-sub for working with initiative from the game engine */
export const useInitiative = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onInitiativeChange,
    engine.getInitiativeSnapshot
  );
};
