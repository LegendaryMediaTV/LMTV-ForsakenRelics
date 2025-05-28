// Dependencies
import { getRandomClass } from "./getRandomClass";
import { getRandomGender } from "./getRandomGender";
import { getRandomRace } from "./getRandomRace";
import { setImage } from "./setImage";
import { setName } from "./setName";
import { levelUp } from "@/functions/levelUp";

// Types
import type { Hero } from "@/types/Hero";

/**
 * Generates a new random hero with populated fields using available utilities.
 *
 * @returns A newly created random Hero object.
 */
export const getRandomHero = (): Hero => {
  // Create a new hero object with random attributes
  const hero: Hero = {
    class: getRandomClass(),
    gender: getRandomGender(),
    race: getRandomRace(),
    name: "", // Will be set by setName
    nameFull: "", // Will be set by setName
    image: "", // Will be set by setImage
    stats: {
      level: 0, // Initially set to 0, then leveled up
      hp: 0,
      hpMax: 0,
      offense: 0,
      defense: 0,
      baseOffense: 0,
      baseDefense: 0,
      unarmed: "",
    },
    equipment: [], // Assuming equipment starts empty
  };

  // Set the hero's name and full name based on random attributes
  setName(hero);
  // Set the hero's image based on their class, gender, and race
  setImage(hero);
  // Level up the hero to adjust their stats according to their class and starting level
  levelUp(hero);

  return hero;
};
