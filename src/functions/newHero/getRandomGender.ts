// Dependencies
import { GENDERS } from "@/constants/Genders";

// Types
import type { Gender } from "@/types/Gender";

/**
 * Randomly selects a gender from the predefined GENDERS array.
 *
 * @returns A randomly selected gender.
 */
export const getRandomGender = (): Gender => {
  const randomIndex = Math.floor(Math.random() * GENDERS.length);
  return GENDERS[randomIndex];
};
