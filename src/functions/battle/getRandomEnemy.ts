// Dependencies
import { rollDice } from "@/functions/rollDice";

// Types
import type { Enemy } from "@/types/Enemy";
import type { Frequency } from "@/types/Frequency";

// Import all the enemy files by level
import { ENEMIES_01 } from "@/constants/enemies/Enemies_01";
// import { ENEMIES_02 } from "@/constants/enemies/Enemies_02";
// import { ENEMIES_03 } from "@/constants/enemies/Enemies_03";

/**
 * Map levels to their respective enemy arrays
 */
const enemiesByLevel: Record<number, Enemy[]> = {
  1: ENEMIES_01,
  // 2: ENEMIES_02,
  // 3: ENEMIES_03,
  // Continue mapping up to the required number of levels
};

/**
 * Maps the dice roll result to a frequency.
 *
 * @param roll - The result of the 2d10 roll.
 * @returns The corresponding enemy frequency.
 */
const getFrequencyFromRoll = (roll: number): Frequency => {
  if ([2, 20].includes(roll)) return "Uber";
  if ([3, 4, 18, 19].includes(roll)) return "Very Rare";
  if ([5, 6, 16, 17].includes(roll)) return "Rare";
  if ([7, 8, 14, 15].includes(roll)) return "Uncommon";
  return "Common"; // 9-13
};

/**
 * Retrieves a random enemy based on the provided level.
 * Rolls 2d10 to determine the enemy's rarity and selects accordingly.
 *
 * @param level - The level of the enemy to retrieve.
 * @returns A random enemy for the specified level and frequency.
 */
export const getRandomEnemy = (level: number): Enemy => {
  // Get the array of enemies for the given level
  const enemies =
    level in enemiesByLevel ? enemiesByLevel[level] : enemiesByLevel[1];

  // Roll 2d10 to determine the frequency
  const roll = rollDice("2d10");
  const frequency = getFrequencyFromRoll(roll);

  // Filter the enemies by the determined frequency
  const filteredEnemies = enemies.filter(
    (enemy) => enemy.frequency === frequency
  );

  // If no enemies are found for that frequency, return a common enemy as a fallback
  const finalEnemies =
    filteredEnemies.length > 0
      ? filteredEnemies
      : enemies.filter((enemy) => enemy.frequency === "Common");

  // Select a random enemy from the filtered array
  const randomIndex = Math.floor(Math.random() * finalEnemies.length);
  return finalEnemies[randomIndex];
};
