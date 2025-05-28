/**
 * Creature data used for both heroes and enemies in battle.
 */
export interface Creature {
  /**
   * The creature's name.
   */
  name: string;

  /**
   * Identifier for the creature's image.
   */
  image: string;

  /**
   * The creature's current stats, including health, offense, defense, and level.
   */
  stats: {
    /**
     * The current level of the creature.
     */
    level: number;

    /**
     * The current health points of the creature.
     */
    hp: number;

    /**
     * The maximum health points the creature can have.
     */
    hpMax: number;

    /**
     * The current total offense stat of the creature.
     */
    offense: number;

    /**
     * The current total defense stat of the creature.
     */
    defense: number;
  };
}
