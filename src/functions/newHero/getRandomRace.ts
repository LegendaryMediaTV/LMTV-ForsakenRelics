// Dependencies
import { HERO_RACES } from "@/constants/HeroRaces";

// Types
import type { HeroRace } from "@/types/HeroRace";

/**
 * Randomly selects a race from the predefined HERO_RACES array.
 *
 * @returns A randomly selected hero race.
 */
export const getRandomRace = (): HeroRace => {
  const randomIndex = Math.floor(Math.random() * HERO_RACES.length);
  return HERO_RACES[randomIndex];
};
