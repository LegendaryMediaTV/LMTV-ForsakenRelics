/**
 * Represents an item in the inventory.
 */
export interface InventoryItem {
  /**
   * The unique identifier for the item.
   */
  _id: string;

  /**
   * The quantity of the item in the inventory.
   */
  quantity: number;
}
