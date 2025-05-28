// Types
import type { Enemy } from "@/types/Enemy";

/**
 * Level 1 enemies with their respective stats, images, alignment, frequency, and experience points.
 */
export const ENEMIES_01: Enemy[] = [
  {
    name: "Giant Rat",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-giant-rat-01",
    alignment: "Neutral",
    frequency: "Common",
    xp: 5,
  },
  {
    name: "Slime",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-slime-01",
    alignment: "Neutral",
    frequency: "Common",
    xp: 5,
  },
  {
    name: "Dusk Raven",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-dusk-raven-01",
    alignment: "Evil",
    frequency: "Common",
    xp: 5,
  },
  {
    name: "Marauder",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-marauder-01",
    alignment: "Evil",
    frequency: "Uncommon",
    xp: 5,
  },
  {
    name: "Burrowing Wasp",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-burrowing-wasp-01",
    alignment: "Neutral",
    frequency: "Uncommon",
    xp: 5,
  },
  {
    name: "Wild Boar",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-wild-boar-01",
    alignment: "Neutral",
    frequency: "Rare",
    xp: 5,
  },
  {
    name: "Goblin Scout",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-goblin-scout-01",
    alignment: "Evil",
    frequency: "Rare",
    xp: 5,
  },
  {
    name: "Goblin Warrior",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-goblin-warrior-01",
    alignment: "Evil",
    frequency: "Common",
    xp: 5,
  },
  {
    name: "Dire Wolf",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-dire-wolf-01",
    alignment: "Neutral",
    frequency: "Very Rare",
    xp: 5,
  },
  {
    name: "Bandit Leader",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-bandit-leader-01",
    alignment: "Evil",
    frequency: "Very Rare",
    xp: 5,
  },
  {
    name: "Goblin Warrior",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 8,
      defense: 2,
    },
    image: "01-goblin-warrior-01",
    alignment: "Evil",
    frequency: "Uber",
    xp: 5,
  },
];

// Add image variants by pushing copies of the enemies with modified image names
ENEMIES_01.push(
  ...ENEMIES_01.map((e) => ({
    ...e,
    image: `${e.image.substring(0, e.image.length - 3)}-02`,
  }))
);
