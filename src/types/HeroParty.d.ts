// Types
import type { Hero } from "./Hero";
import type { InventoryItem } from "./InventoryItem";

/**
 * Hero Party data.
 */
export interface HeroParty {
  /**
   * The list of heroes in the party.
   */
  heroes: Hero[];

  /**
   * The inventory for the party.
   */
  inventory: InventoryItem[];

  /**
   * The shared XP of the party.
   */
  xp: number;
}
