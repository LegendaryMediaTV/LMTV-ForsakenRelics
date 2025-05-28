// Dependencies
import { HERO_CLASSES } from "@/constants/HeroClasses";

// Types
import type { HeroClass } from "@/types/HeroClass";

/**
 * Randomly selects a class from the predefined HERO_CLASSES array.
 *
 * @returns A randomly selected hero class.
 */
export const getRandomClass = (): HeroClass => {
  const randomIndex = Math.floor(Math.random() * HERO_CLASSES.length);
  return HERO_CLASSES[randomIndex];
};
