// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Pub-sub for working with the enemy party from the game engine */
export const useEnemyParty = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onEnemyPartyChange,
    engine.getEnemyPartySnapshot
  );
};
