/**
 * Rolls dice based on D&D-style notation and returns the total result, applying optional constraints.
 *
 * @param diceNotation - The D&D-style dice notation (e.g., "3d6+2d4+3" or "d20") or a straight number.
 * @param options - Optional configuration for dice rolling.
 * @param options.isCritical - If true, the result will be the maximum possible value of the dice rolls.
 * @param options.min - The minimum value the result can be, if specified.
 * @param options.max - The maximum value the result can be, if specified.
 * @returns The total result of the dice rolls and adjustments, with constraints applied.
 */
export const rollDice = (
  diceNotation: string | number,
  options: { isCritical?: boolean; min?: number; max?: number } = {}
): number => {
  const { isCritical, min, max } = options;

  // If it's a number, just return the number as the result
  if (typeof diceNotation === "number") {
    let result = diceNotation;

    // Apply minimum and maximum constraints if they exist
    if (min !== undefined) result = Math.max(result, min);
    if (max !== undefined) result = Math.min(result, max);

    return result;
  }

  // Split dice notation into individual components (e.g., "1d8+2d4+3" or "d20")
  const diceSets = diceNotation.match(/(\d*d\d+|[+-]?\d+)/g);

  if (!diceSets) {
    throw new Error("Invalid dice notation");
  }

  // Initialize total
  let total = 0;

  // Process each set of dice or adjustment
  diceSets.forEach((diceSet) => {
    if (diceSet.includes("d")) {
      // Handle cases like "d20" (defaults to "1d20")
      const [numDice, numSides] = diceSet.split("d").map(Number);

      // Roll the dice
      for (let i = 0; i < (numDice || 1); i++) {
        const roll = isCritical
          ? numSides
          : Math.floor(Math.random() * numSides) + 1;
        total += roll;
      }
    } else {
      // Handle adjustment or just a number (e.g., "3" or "-2")
      total += parseInt(diceSet, 10);
    }
  });

  // Apply minimum and maximum constraints if they exist
  if (min !== undefined) total = Math.max(total, min);
  if (max !== undefined) total = Math.min(total, max);

  return total;
};
