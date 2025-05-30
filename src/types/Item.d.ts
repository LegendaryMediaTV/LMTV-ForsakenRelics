// Types
import type { HeroClass } from "./HeroClass";

/**
 * Represents an item with various properties.
 */
export interface Item {
  /**
   * The name of the item.
   */
  name: string;

  /**
   * The description of the item.
   */
  description: string;

  /**
   * An array of valid classes that can equip the item.
   * Only valid class names in lowercase are allowed.
   */
  canEquip?: Array<HeroClass> | boolean;

  /**
   * An array of valid classes that can use the item.
   * Only valid class names in lowercase are allowed.
   */
  canUse?: Array<HeroClass> | boolean;
}
