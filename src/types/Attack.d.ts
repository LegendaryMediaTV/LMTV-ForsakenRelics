/**
 * Attack interface
 */
export interface Attack {
  /** Display name */
  name: string;

  /** Dice-based damage for a normal hit */
  damage?: string;

  /** Status effect for a normal hit */
  effect?: AttackEffect;

  /** Status effect when for a critical hit */
  criticalEffect?: AttackEffect;
}

/** Lasting effect of an attack */
export type AttackEffect = "Inhibit" | "KO" | "Stun";
