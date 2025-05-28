// Types
import type { Hero } from "@/types/Hero";

// Define the StatsByLevel type representing stats of a hero at a specific level
type StatsByLevel = {
  hpMax: number; // The hero's maximum HP at this level
  baseOffense: number; // The hero's base offense at this level
  baseDefense: number; // The hero's base defense at this level
  unarmed: string; // The hero's unarmed damage at this level (dice)
};

// Function to level up a hero and apply stats based on the new level
export const levelUp = (hero: Hero): void => {
  // Object holding stats by level for each class
  const statsByLevel: { [key: string]: StatsByLevel[] } = {
    Crusader: [
      { hpMax: 16, baseOffense: 9, baseDefense: 0, unarmed: "d2" },
      { hpMax: 24, baseOffense: 9, baseDefense: 0, unarmed: "d2" },
      { hpMax: 32, baseOffense: 8, baseDefense: 0, unarmed: "d2" },
      { hpMax: 40, baseOffense: 8, baseDefense: 1, unarmed: "1d4-1" },
      { hpMax: 48, baseOffense: 7, baseDefense: 1, unarmed: "1d4-1" },
      { hpMax: 56, baseOffense: 7, baseDefense: 2, unarmed: "d4" },
      { hpMax: 64, baseOffense: 6, baseDefense: 2, unarmed: "d4" },
      { hpMax: 72, baseOffense: 6, baseDefense: 2, unarmed: "d6" },
      { hpMax: 80, baseOffense: 5, baseDefense: 3, unarmed: "d6" },
      { hpMax: 88, baseOffense: 5, baseDefense: 3, unarmed: "d8" },
    ],
    Fighter: [
      { hpMax: 20, baseOffense: 9, baseDefense: 0, unarmed: "d2" },
      { hpMax: 30, baseOffense: 8, baseDefense: 0, unarmed: "d2" },
      { hpMax: 40, baseOffense: 7, baseDefense: 0, unarmed: "1d4-1" },
      { hpMax: 50, baseOffense: 6, baseDefense: 0, unarmed: "d4" },
      { hpMax: 60, baseOffense: 5, baseDefense: 1, unarmed: "d4" },
      { hpMax: 70, baseOffense: 4, baseDefense: 1, unarmed: "d6" },
      { hpMax: 80, baseOffense: 3, baseDefense: 2, unarmed: "d6" },
      { hpMax: 90, baseOffense: 3, baseDefense: 2, unarmed: "d8" },
      { hpMax: 100, baseOffense: 2, baseDefense: 3, unarmed: "d8" },
      { hpMax: 110, baseOffense: 2, baseDefense: 4, unarmed: "d10" },
    ],
    Mage: [
      { hpMax: 10, baseOffense: 9, baseDefense: 0, unarmed: "1" },
      { hpMax: 15, baseOffense: 8, baseDefense: 0, unarmed: "1" },
      { hpMax: 20, baseOffense: 7, baseDefense: 0, unarmed: "1" },
      { hpMax: 25, baseOffense: 6, baseDefense: 0, unarmed: "d2" },
      { hpMax: 30, baseOffense: 5, baseDefense: 1, unarmed: "d2" },
      { hpMax: 35, baseOffense: 4, baseDefense: 1, unarmed: "d2" },
      { hpMax: 40, baseOffense: 3, baseDefense: 1, unarmed: "1d4-1" },
      { hpMax: 45, baseOffense: 3, baseDefense: 1, unarmed: "1d4-1" },
      { hpMax: 50, baseOffense: 2, baseDefense: 2, unarmed: "1d4-1" },
      { hpMax: 55, baseOffense: 2, baseDefense: 2, unarmed: "1d4-2" },
    ],
    Thief: [
      { hpMax: 12, baseOffense: 9, baseDefense: 1, unarmed: "1d4-1" },
      { hpMax: 18, baseOffense: 8, baseDefense: 1, unarmed: "1d4" },
      { hpMax: 24, baseOffense: 8, baseDefense: 2, unarmed: "2d2" },
      { hpMax: 30, baseOffense: 7, baseDefense: 2, unarmed: "1d4+1" },
      { hpMax: 36, baseOffense: 7, baseDefense: 2, unarmed: "2d2+1" },
      { hpMax: 42, baseOffense: 6, baseDefense: 2, unarmed: "1d4+2" },
      { hpMax: 48, baseOffense: 6, baseDefense: 3, unarmed: "1d4+2" },
      { hpMax: 54, baseOffense: 5, baseDefense: 3, unarmed: "3d2" },
      { hpMax: 60, baseOffense: 5, baseDefense: 3, unarmed: "3d2" },
      { hpMax: 66, baseOffense: 4, baseDefense: 3, unarmed: "4d2" },
    ],
  };

  const currentLevel = hero.stats.level;
  const classStats = statsByLevel[hero.class];

  if (currentLevel >= classStats.length) {
    return; // Max level reached
  }

  const newLevel = currentLevel + 1;
  const newStats = classStats[newLevel - 1];

  hero.stats.level = newLevel;
  hero.stats.hpMax = newStats.hpMax;
  hero.stats.baseOffense = newStats.baseOffense;
  hero.stats.offense = newStats.baseOffense;
  hero.stats.baseDefense = newStats.baseDefense;
  hero.stats.defense = newStats.baseDefense;
  hero.stats.unarmed = newStats.unarmed;
  hero.stats.hp = newStats.hpMax; // Reset health to max on level up
};
