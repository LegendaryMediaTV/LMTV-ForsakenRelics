// Types
import type { Creature } from "./Creature";
import type { Gender } from "./Gender";
import type { HeroClass } from "./HeroClass";
import type { HeroRace } from "./HeroRace";

/**
 * Hero character data, extending Creature.
 */
export interface Hero extends Creature {
  /**
   * The hero's full name.
   */
  nameFull: string;

  /**
   * The hero's race.
   */
  race: HeroRace;

  /**
   * The hero's gender.
   */
  gender: Gender;

  /**
   * The hero's class.
   */
  class: HeroClass;

  /**
   * The hero's current stats, including health, offense, defense, level, and hero-specific stats.
   */
  stats: Creature["stats"] & {
    /**
     * The base offense stat of the hero.
     */
    baseOffense: number;

    /**
     * The base defense stat of the hero.
     */
    baseDefense: number;

    /**
     * The hero's unarmed damage (dice).
     */
    unarmed: string;
  };

  /**
   * Array of item IDs representing the equipment this hero is currently using.
   */
  equipment: string[];
}
