// Dependencies
import type { Alignment } from "./Alignment";
import type { Creature } from "./Creature";
import type { Frequency } from "./Frequency";

// Types
import type { Attack } from "./Attack";

/**
 * Enemy character data, extending Creature.
 */
export interface Enemy extends Creature {
  /** The enemy's alignment. */
  alignment: Alignment;

  /** The enemy's appearance frequency. */
  frequency: Frequency;

  /** Experience Points awarded for defeating the enemy. */
  xp: number;

  /** A brief description of the enemy. */
  description: string;

  /** Primary attack */
  primary: Attack;

  /** Secondary attack */
  secondary: Attack;
}
