export interface InitiativeBearer {
  /** The party to which the creature belongs */
  type: "Hero" | "Enemy";

  /** Hero/Enemy Party index number */
  index: number;
}
