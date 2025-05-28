// Types
import type { Hero } from "@/types/Hero";

/**
 * Sets the image for a hero based on their class, gender, and race.
 *
 * @param hero - The hero object whose image will be updated.
 */
export const setImage = (hero: Hero): void => {
  // Generate the image string based on the hero's class, gender, and race
  hero.image = [hero.class, hero.gender, hero.race].join("-").toLowerCase();
};
