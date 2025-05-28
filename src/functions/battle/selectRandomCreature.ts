// Types
import type { Creature } from "@/types/Creature";

/**
 * Selects a random living creature from the provided list of creatures.
 * If no living creatures are available, returns -1.
 * @param creatures - The list of creatures to select from.
 * @returns The index of a random living creature, or -1 if none are alive.
 */
export const selectRandomCreature = (creatures: Creature[]): number => {
  // Determine the indexes of living creatures
  const livingIndexes = creatures
    .map((creature, i) => (creature.stats.hp > 0 ? i : null))
    .filter((i): i is number => i !== null);

  // No living creatures available
  if (livingIndexes.length === 0) {
    return -1;
  }

  return livingIndexes[Math.floor(Math.random() * livingIndexes.length)];
};
