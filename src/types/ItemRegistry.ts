// Types
import type { Item } from "./Item";

/**
 * Represents a registry of items where each key is a string and the value is an Item.
 */
export interface ItemRegistry {
  [key: string]: Item;
}
