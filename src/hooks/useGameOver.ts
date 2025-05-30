// Dependencies
import { useSyncExternalStore } from "react";
import { useEngine } from "./useEngine";

/** Pub-sub for working with the game over indicator from the game engine */
export const useGameOver = () => {
  const engine = useEngine();

  return useSyncExternalStore(
    engine.onGameOverChange,
    engine.getGameOverSnapshot
  );
};
