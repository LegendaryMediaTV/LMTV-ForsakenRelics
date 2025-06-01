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
      hp: 4,
      hpMax: 4,
      offense: 0,
      defense: 0,
    },
    image: "01-giant-rat-01",
    alignment: "Neutral",
    frequency: "Common",
    xp: 20,
    description:
      "Giant Rats thrive in places where decay has set in, growing fat on the spoils of neglect. Twice the size of any city vermin, their sharp teeth can gnaw through wood, bone, and flesh with ease. Wherever these creatures are found, disease is never far behind, and neither is the stench of death.",
    primary: { name: "Stratch", damage: "1d2" },
    secondary: { name: "Nip", damage: "1d4-1" },
  },
  {
    name: "Slime",
    stats: {
      level: 1,
      hp: 4,
      hpMax: 4,
      offense: 0,
      defense: 0,
    },
    image: "01-slime-01",
    alignment: "Neutral",
    frequency: "Common",
    xp: 20,
    description:
      "Slimes are living hunger, an insatiable force of acidic ooze that consumes flesh with terrifying efficiency. Silent and slow, they cling to dark corners and damp places, waiting for the unwary. Many adventurers have found themselves paralyzed in horror as the Slime devours skin and muscle, leaving only bones behind while armor remains eerily untouched.",
    primary: { name: "Digest", damage: "1d2+1" },
    secondary: { name: "Engulf", damage: "1", criticalEffect: "Inhibit" },
  },
  {
    name: "Dusk Raven",
    stats: {
      level: 1,
      hp: 4,
      hpMax: 4,
      offense: 0,
      defense: 0,
    },
    image: "01-dusk-raven-01",
    alignment: "Evil",
    frequency: "Common",
    xp: 20,
    description:
      "Perched high in the branches, Dusk Ravens appear as the last light fades, watching with a cold, predatory gaze. Locals claim that its cry has long been linked to imminent death, as it refuses to wait for the land to claim its next victim.",
    primary: { name: "Peck", damage: "1d4-1" },
    secondary: { name: "Swooping Strike", damage: "1d4" },
  },
  {
    name: "Marauder",
    stats: {
      level: 1,
      hp: 5,
      hpMax: 5,
      offense: 1,
      defense: 0,
    },
    image: "01-marauder-01",
    alignment: "Evil",
    frequency: "Uncommon",
    xp: 25,
    description:
      "Marauders are the scourge of the borderlands, lawless men and women who live by the blade and take what they can. Hardened by the brutality of life on the edge of civilization, these killers strike from ambush, leaving no survivors and no trace of their passing.",
    primary: { name: "Stab", damage: "1d4" },
    secondary: {
      name: "Haymaker",
      damage: "1d2",
      effect: "Stun",
      criticalEffect: "KO",
    },
  },
  {
    name: "Burrowing Wasp",
    stats: {
      level: 1,
      hp: 5,
      hpMax: 5,
      offense: 1,
      defense: 0,
    },
    image: "01-burrowing-wasp-01",
    alignment: "Neutral",
    frequency: "Uncommon",
    xp: 25,
    description:
      "Travelers hear the faint, rhythmic hum before they feel the ground beneath them shift. The Burrowing Wasp is a master of patience, waiting just below the surface until its prey is close enough to strike. Its venom doesn’t kill outright, but the burning paralysis that follows is often enough to leave even the bravest adventurer helpless before it drags them underground.",
    primary: { name: "Sting", damage: "1d4" },
    secondary: {
      name: "Venomous Sting",
      damage: "1d4-1",
      effect: "Stun",
      criticalEffect: "KO",
    },
  },
  {
    name: "Wild Boar",
    stats: {
      level: 1,
      hp: 7,
      hpMax: 7,
      offense: 1,
      defense: 1,
    },
    image: "01-wild-boar-01",
    alignment: "Neutral",
    frequency: "Rare",
    xp: 30,
    description:
      "Venture too close to the feeding grounds of a Wild Boar and they will attack in a blind fury. Territorial and aggressive, they will charge without hesitation, leaving shattered bones and gored bodies in their wake. If you’re nimble enough to dodge that, then their hide is thick enough to shrug off even the sharpest blade.",
    primary: { name: "Gore", damage: "1d4+1" },
    secondary: {
      name: "Charge",
      damage: "1d4",
      effect: "Stun",
      criticalEffect: "KO",
    },
  },
  {
    name: "Goblin Scout",
    stats: {
      level: 1,
      hp: 7,
      hpMax: 7,
      offense: 1,
      defense: 1,
    },
    image: "01-goblin-scout-01",
    alignment: "Evil",
    frequency: "Rare",
    xp: 30,
    description:
      "Villagers often speak in hushed tones of Goblin Scouts—small, sharp-eyed creatures that slip through the borderlands like whispers in the wind. People have learned to avoid the roads at dusk, as far too many children and stragglers have disappeared without a sound, taken right from under their noses. If you see one, it’s not by chance—it’s been watching you for some time.",
    primary: { name: "Shadow Strike", damage: "1d4+1" },
    secondary: { name: "Backstab", damage: "1d6" },
  },
  {
    name: "Dire Wolf",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 2,
      defense: 0,
    },
    image: "01-dire-wolf-01",
    alignment: "Neutral",
    frequency: "Very Rare",
    xp: 35,
    description:
      "Massive and merciless, no howl is feared more than that of the Dire Wolf. Farmers say it’s not the size that kills, but the cold intelligence behind those eyes. These wolves stalk the edges of the forest, silent and patient, waiting for the moment when a lone traveler dares to stray too far from the safety of the village lights.",
    primary: { name: "Thrash", damage: "1d6-1" },
    secondary: { name: "Latch On", damage: "1d4-1", effect: "Inhibit" },
  },
  {
    name: "Bandit Leader",
    stats: {
      level: 1,
      hp: 8,
      hpMax: 8,
      offense: 2,
      defense: 0,
    },
    image: "01-bandit-leader-01",
    alignment: "Evil",
    frequency: "Very Rare",
    xp: 35,
    description:
      "Some say the bandits that plague the borderlands are as brutal to their own as they are to outsiders. Their leader, however, is something else—whispers of his name travel faster than his blade. He doesn’t just take what he wants; he leaves a message, carved into the bodies of those foolish enough to cross him. The survivors, if any, are the warnings he leaves behind.",
    primary: { name: "Mutilate", damage: "2d3" },
    secondary: { name: "Cripple", damage: "1d4+2", effect: "Inhibit" },
  },
  {
    name: "Goblin Warrior",
    stats: {
      level: 1,
      hp: 14,
      hpMax: 14,
      offense: 2,
      defense: 1,
    },
    image: "01-goblin-warrior-01",
    alignment: "Evil",
    frequency: "Uber",
    xp: 50,
    description:
      "Stronger and more savage than its kin, the Goblin Warrior fights with brutal precision, showing no fear, no hesitation. Villagers whisper of those unfortunate enough to faced one, their bodies left as grim reminders of the strength hiding behind those cruel, yellow eyes.",
    primary: { name: "Skewer", damage: "1d6+1" },
    secondary: {
      name: "Skull Splitter",
      damage: "2d4",
      effect: "Stun",
      criticalEffect: "KO",
    },
  },
];

// Add image variants by pushing copies of the enemies with modified image names
ENEMIES_01.push(
  ...ENEMIES_01.map((e) => ({
    ...e,
    image: `${e.image.substring(0, e.image.length - 3)}-02`,
  }))
);
