// Dependencies
import { rollDice } from "@/functions/rollDice";

// Types
import type { Creature } from "@/types/Creature";

/**
 * Determines if the first creature hits the second creature.
 *
 * @param attacker - The attacking creature.
 * @param defender - The defending creature.
 * @param modifier - Additional modifier applied to the "to hit" number.
 * @returns A tuple containing a boolean indicating if the hit was successful and the rolled number.
 */
export const attemptHit = (
  attacker: Creature,
  defender: Creature,
  modifier: number = 0
): [boolean, number] => {
  // Calculate the "to hit" number
  const toHit = attacker.stats.offense + defender.stats.defense + modifier;

  // Do the attack roll
  const roll = rollDice("d20", { max: 20 });

  // Determine if the roll is equal to or greater than the "to hit" number
  return [roll >= toHit, roll];
};
