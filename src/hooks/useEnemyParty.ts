// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

export const useEnemyParty = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onEnemyPartyChange,
    engine.getEnemyPartySnapshot
  );
};
