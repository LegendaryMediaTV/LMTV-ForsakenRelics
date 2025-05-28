// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

export const useHeroParty = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onHeroPartyChange,
    engine.getHeroPartySnapshot
  );
};
