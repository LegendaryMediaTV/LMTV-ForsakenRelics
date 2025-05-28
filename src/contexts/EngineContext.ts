// Dependencies
import { createContext } from "react";
import type { GameEngine } from "@/classes/GameEngine";

export const EngineContext = createContext<GameEngine | null>(null);
