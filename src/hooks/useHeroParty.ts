// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Pub-sub for working with the hero party from the game engine */
export const useHeroParty = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onHeroPartyChange,
    engine.getHeroPartySnapshot
  );
};
