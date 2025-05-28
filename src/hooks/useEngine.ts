// Dependencies
import { useContext } from "react";
import { EngineContext } from "@/contexts/EngineContext";

export const useEngine = () => {
  const engine = useContext(EngineContext);

  if (!engine) throw new Error("useEngine must be used within EngineProvider");

  return engine;
};
