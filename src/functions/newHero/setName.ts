// Types
import type { Hero } from "@/types/Hero";

/**
 * Generates a random character name for a hero based on their gender and class.
 *
 * @param hero - The hero object whose name and nameFull will be updated.
 */
export const setName = (hero: Hero): void => {
  const maleNames = [
    "Boden",
    "Gareth",
    "Thorne",
    "Lothar",
    "Eldrin",
    "Draven",
    "Drystan",
    "Airk",
    "Merrick",
    "Viktor",
    "Fenric",
    "Corvin",
    "Zarek",
    "Ulric",
    "Graywolf",
    "Darkhawk",
  ];

  const femaleNames = [
    "Alinea",
    "Everlorne",
    "Griselda",
    "Elara",
    "Seraphina",
    "Ophelia",
    "Thalia",
    "Arwen",
    "Astrielle",
    "Elowen",
    "Fiora",
    "Brienna",
    "Skylara",
    "Elysia",
    "Roswyn",
    "Sorcha",
  ];

  // Split titles by gender
  const maleTitles = [
    "Sir",
    "Lord",
    "Saint",
    "Count",
    "Baron",
    "Duke",
    "Prince",
  ];
  const femaleTitles = [
    "Lady",
    "Dame",
    "Princess",
    "Duchess",
    "Empress",
    "Knightess",
    "Saint",
  ];

  const realms = [
    "of Stormbreach",
    "of Eldoria",
    "of Windhelm",
    "of Northaven",
    "of Eastmound",
    "of Portsmouth",
    "of Darkmoor",
    "of Daggerfall",
    "of Frostvale",
    "of Bloodmire",
    "of Westcliff",
    "of Duskwood",
    "of Stormhollow",
    "of Grimlock",
    "of Starfall",
    "of Stoneridge",
    "of Brightforge",
    "of Torne",
  ];

  // Class-based nicknames as arrays of options
  const classNicknames: Record<string, string[]> = {
    Crusader: [
      "the Righteous",
      "the Unbroken",
      "the Brave",
      "the Defender",
      "the Pure",
      "Demonslayer",
      "Lightbringer",
      "Truthblade",
      "Divineheart",
      "Wolfsbane",
    ],
    Fighter: [
      "the Strong",
      "the Unstoppable",
      "the Slayer",
      "the Barbarian",
      "the Destroyer",
      "Ironfist",
      "Battleborn",
      "Grimblade",
      "Stonebreaker",
      "Battleforge",
    ],
    Mage: [
      "the Wise",
      "the Mystical",
      "the Grim",
      "the Sorcerer",
      "the Conjuror",
      "Stormbringer",
      "Spellbinder",
      "Emberstone",
      "Darkmoon",
      "Frostspire",
    ],
    Thief: [
      "the Cunning",
      "the Veiled",
      "the Silent",
      "the Elusive",
      "the Quick",
      "Shadowstrike",
      "Stealthlord",
      "Nightwalker",
      "Phantomblade",
      "Deathstalker",
    ],
  };

  // Pick a random base name based on the hero's gender
  const baseName =
    hero.gender === "Female"
      ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
      : maleNames[Math.floor(Math.random() * maleNames.length)];

  // Randomly pick either a title or a nickname/realm for the first addition
  const title =
    hero.gender === "Female"
      ? femaleTitles[Math.floor(Math.random() * femaleTitles.length)]
      : maleTitles[Math.floor(Math.random() * maleTitles.length)];

  const classNickname =
    classNicknames[hero.class][
      Math.floor(Math.random() * classNicknames[hero.class].length)
    ];
  const realm = realms[Math.floor(Math.random() * realms.length)];

  // Pick the first part to add (either a title or a suffix)
  const useTitle = Math.random() > 0.5;
  const firstExtraPart = useTitle
    ? title
    : Math.random() > 0.5
    ? classNickname
    : realm;

  // If the first part is a title, the second part can be a nickname or realm, but if it's a nickname or realm, no second part
  let generatedNameFull = useTitle
    ? `${firstExtraPart} ${baseName}` // Title goes before the base name
    : `${baseName} ${firstExtraPart}`; // Nickname or realm goes after the base name

  // If a title is used, randomly add a second suffix (nickname or realm)
  if (useTitle) {
    const secondSuffix = Math.random() > 0.5 ? classNickname : realm;
    generatedNameFull = `${generatedNameFull} ${secondSuffix}`.trim();
  }

  // Update the hero's name and nameFull fields
  hero.name = baseName; // Base name only for the name field
  hero.nameFull = generatedNameFull; // Full name including titles, realms, etc.
};
