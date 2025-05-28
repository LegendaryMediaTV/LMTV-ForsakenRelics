// Dependencies
import { readPartyFile, writePartyFile } from "./partyFile";
import { getRandomHero } from "../newHero/getRandomHero";

// Types
import type { Hero } from "@/types/Hero";
import type { HeroParty } from "@/types/HeroParty";

/**
 * Adds a randomly generated hero to the current party.
 * @returns {Promise<void>} Resolves when the hero is successfully added.
 * @throws {Error} If there is an issue reading or writing the party data.
 */
export const addRandomHero = async (): Promise<void> => {
  try {
    // Generate a new random hero
    const newHero: Hero = getRandomHero();

    // Read the current party data
    const party: HeroParty = await readPartyFile();

    // Append the new hero to the party
    party.heroes.push(newHero);

    // Write the updated party back to the file
    await writePartyFile(party);
  } catch (_error) {
    throw new Error("Error adding a random hero to the party.");
  }
};
