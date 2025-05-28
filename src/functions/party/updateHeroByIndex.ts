// Dependencies
import { readPartyFile, writePartyFile } from "./partyFile";
import { setImage } from "@/functions/newHero/setImage";
import { setName } from "@/functions/newHero/setName";
import { levelUp } from "@/functions/levelUp";

// Types
import type { Hero } from "@/types/Hero";
import type { HeroParty } from "@/types/HeroParty";

/**
 * Updates a hero by index with the provided changes.
 * @param {number} index - The index of the hero to update.
 * @param {Partial<Hero>} changes - The changes to apply to the hero.
 * @param {boolean} isNew - Whether the hero is new or not (resets stats).
 * @returns {Promise<void>}
 * @throws {Error} If there is an issue updating the hero.
 */
export const updateHeroByIndex = async (
  index: number,
  changes: Partial<Hero>,
  isNew: boolean
) => {
  try {
    const party: HeroParty = await readPartyFile();
    if (index < 0 || index >= party.heroes.length) {
      throw new Error("Invalid hero index.");
    }

    const needsRename =
      changes.gender !== party.heroes[index].gender ||
      changes.class !== party.heroes[index].class ||
      !changes.name ||
      !changes.nameFull;

    party.heroes[index] = { ...party.heroes[index], ...changes };

    if (isNew) {
      setImage(party.heroes[index]);
      party.heroes[index].stats.level = 0;
      levelUp(party.heroes[index]);
      if (needsRename) setName(party.heroes[index]);
    }

    await writePartyFile(party);
  } catch (_error) {
    throw new Error("Error updating hero data.");
  }
};
