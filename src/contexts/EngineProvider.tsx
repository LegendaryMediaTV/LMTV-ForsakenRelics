// Dependencies
import { EngineContext } from "./EngineContext";
import { GameEngine } from "@/classes/GameEngine";
import { useRef } from "react";

export const EngineProvider = ({ children }: { children: React.ReactNode }) => {
  const engineRef = useRef(new GameEngine());

  return (
    <EngineContext.Provider value={engineRef.current}>
      {children}
    </EngineContext.Provider>
  );
};
