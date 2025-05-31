// Dependencies
import _ from "lodash";
import { EXPERIENCE_LEVELS } from "@/constants/ExperienceLevels";
import { getRandomEnemy } from "@/functions/battle/getRandomEnemy";
import { getRandomHero } from "@/functions/newHero/getRandomHero";
import { levelUp } from "@/functions/levelUp";
import { rollDice } from "@/functions/rollDice";

// Types
import type { AttackEffect } from "@/types/Attack";
import type { Creature } from "@/types/Creature";
import type { EnemyParty } from "@/types/EnemyParty";
import type { HeroParty } from "@/types/HeroParty";
import type { InitiativeBearer } from "@/types/InitiativeBearer";
import type { Log } from "@/types/Log";

// Basic Engine Class
export class GameEngine {
  /********************
   ***** Creature *****
   *******************/

  private _affectCreature = (creature: Creature, effect: AttackEffect) => {
    if (!creature.effects) {
      creature.effects = [];
    }

    // Only add the effect if it doesn't already exist
    if (!creature.effects.includes(effect)) {
      creature.effects.push(effect);
    }

    let effectName: string;
    switch (effect) {
      case "Stun":
        effectName = "stunned";
        break;

      case "KO":
        effectName = "knocked out";
        break;

      case "Inhibit":
        effectName = "inhibited";
        break;

      default:
        effectName = `affected by ${effect}`;
        break;
    }

    this.addLog(`${creature.name} is ${effectName}!`);
  };

  private _recoverCreature = (creature: Creature) => {
    if (!creature.effects?.length) {
      return;
    }

    // Remove the stun effect if, it exists
    if (creature.effects.includes("Stun")) {
      creature.effects = creature.effects.filter((effect) => effect !== "Stun");

      this.addLog(`${creature.name} is no longer stunned!`);
    }

    // Remove the KO effect if it exists
    if (creature.effects.includes("KO")) {
      const roll = rollDice("1d20");

      let recoveryMessage = `With a roll of ${roll}, ${creature.name} `;

      if (roll >= 13) {
        creature.effects = creature.effects.filter((effect) => effect !== "KO");

        recoveryMessage += "is no longer KOed.";
      } else {
        recoveryMessage += "is still KOed.";
      }

      this.addLog(recoveryMessage);
    }
  };

  /***********************
   ***** Enemy Party *****
   **********************/

  private _enemyParty: EnemyParty = { enemies: [] };

  private _enemyPartyInitialized = false;

  private _enemyPartySubscribers = new Set<() => void>();

  private _notifyEnemyPartySubscribers() {
    for (const fn of this._enemyPartySubscribers) fn();
  }

  onEnemyPartyChange = (callback: () => void) => {
    this._enemyPartySubscribers.add(callback);

    return () => this._enemyPartySubscribers.delete(callback);
  };

  getEnemyPartySnapshot = (): EnemyParty => {
    return this._enemyParty;
  };

  /** Generates a random enemy party */
  generateEnemyParty = () => {
    if (!this._enemyPartyInitialized) {
      this._enemyPartyInitialized = true;

      this._enemyParty = {
        enemies: Array.from({ length: rollDice("1d4") }, () =>
          getRandomEnemy(1)
        ),
      };

      this._notifyEnemyPartySubscribers();

      this.addLog(`An enemy party draws near …`);

      this._rollForInitiative();
    }
  };

  /** Apply damage to the corresponding enemy party member */
  damageEnemy = (index: number, amount: number) => {
    const updated = _.cloneDeep(this._enemyParty);

    const hp = Math.max(0, updated.enemies[index].stats.hp - amount);

    updated.enemies[index] = {
      ...updated.enemies[index],
      stats: {
        ...updated.enemies[index].stats,
        hp,
      },
    };

    this._enemyParty = updated;

    this._notifyEnemyPartySubscribers();

    if (!hp) {
      this.addLog(`${updated.enemies[index].name} has perished!`);
    }

    if (!updated.enemies.some((enemy) => enemy.stats.hp > 0)) {
      this.addLog("The enemy party has been vanquished!");
      this._enemyPartyInitialized = false;

      this.addXP(
        this._enemyParty.enemies.reduce((total, enemy) => total + enemy.xp, 0)
      );

      this.restHeroes();

      this.generateEnemyParty();
    }
  };

  /** Apply an effect to the corresponding enemy party member */
  affectEnemy = (index: number, effect: AttackEffect) => {
    const enemy = this._enemyParty.enemies[index];

    this._affectCreature(enemy, effect);

    this._notifyEnemyPartySubscribers();
  };

  /** Attempt to recover an enemy */
  recoverEnemy = (index: number) => {
    const updated = _.cloneDeep(this._enemyParty);

    const enemy = updated.enemies[index];

    this._recoverCreature(enemy);

    this._enemyParty = updated;

    this._notifyEnemyPartySubscribers();
  };

  /*********************
   ***** Game Over *****
   ********************/

  private _isGameOver = false;

  private _gameOverSubscribers = new Set<() => void>();

  private _notifyGameOverSubscribers() {
    for (const fn of this._gameOverSubscribers) fn();
  }

  onGameOverChange = (callback: () => void) => {
    this._gameOverSubscribers.add(callback);
    return () => this._gameOverSubscribers.delete(callback);
  };

  getGameOverSnapshot = (): boolean => {
    return this._isGameOver;
  };

  private _gameOver = () => {
    this._isGameOver = true;

    this.addLog("The hero party has been vanquished! Game over.");

    this._notifyGameOverSubscribers();
  };

  /**********************
   ***** Hero Party *****
   *********************/

  private _heroParty: HeroParty = {
    heroes: [],
    inventory: [],
    xp: 0,
  };

  private _heroPartyInitialized = false;

  private _heroPartySubscribers = new Set<() => void>();

  private _notifyHeroPartySubscribers() {
    for (const fn of this._heroPartySubscribers) fn();
  }

  onHeroPartyChange = (callback: () => void) => {
    this._heroPartySubscribers.add(callback);

    return () => this._heroPartySubscribers.delete(callback);
  };

  getHeroPartySnapshot = (): HeroParty => {
    return this._heroParty;
  };

  /** Generates a random hero party */
  generateHeroParty = () => {
    if (!this._heroPartyInitialized) {
      this._heroPartyInitialized = true;

      this._heroParty = {
        heroes: Array.from({ length: 4 }, () => getRandomHero()),
        inventory: [],
        xp: 0,
      };

      this._notifyHeroPartySubscribers();

      this.addLog("Generated a random hero party.");
    }
  };

  /** Apply damage to the corresponding hero party member */
  damageHero = (index: number, amount: number) => {
    const updated = _.cloneDeep(this._heroParty);

    const hp = Math.max(0, updated.heroes[index].stats.hp - amount);

    updated.heroes[index] = {
      ...updated.heroes[index],
      stats: {
        ...updated.heroes[index].stats,
        hp,
      },
    };

    this._heroParty = updated;

    if (!hp) {
      this.addLog(`${updated.heroes[index].nameFull} has perished!`);
    }

    if (!updated.heroes.some((hero) => hero.stats.hp > 0)) {
      this._gameOver();
    }

    this._notifyHeroPartySubscribers();
  };

  /** Apply an effect to the corresponding hero party member */
  affectHero = (index: number, effect: AttackEffect) => {
    const hero = this._heroParty.heroes[index];

    this._affectCreature(hero, effect);

    this._notifyHeroPartySubscribers();
  };

  /** Attempt to recover a hero */
  recoverHero = (index: number) => {
    const updated = _.cloneDeep(this._heroParty);

    const hero = updated.heroes[index];

    this._recoverCreature(hero);

    this._heroParty = updated;

    this._notifyHeroPartySubscribers();
  };

  /** Adds earned XP to the hero party */
  addXP = (amount: number) => {
    this._heroParty.xp += amount;

    this._notifyHeroPartySubscribers();

    this.addLog(
      `The hero party gained ${amount} XP, for a total of ${this._heroParty.xp} XP!`
    );

    // Check if any heroes can level up
    for (let index = 0; index < this._heroParty.heroes.length; index++) {
      const hero = this._heroParty.heroes[index];

      // Check if the hero can level up
      while (
        hero.stats.level < EXPERIENCE_LEVELS.length - 1 &&
        this._heroParty.xp >= EXPERIENCE_LEVELS[hero.stats.level]
      ) {
        // Level up the hero
        levelUp(hero);

        this.addLog(
          `${hero.nameFull} has leveled up to level ${hero.stats.level}!`
        );
      }
    }
  };

  /** Rest all the hero party */
  restHeroes = () => {
    for (let index = 0; index < this._heroParty.heroes.length; index++) {
      const hero = this._heroParty.heroes[index];

      // Attempt revival
      if (!hero.stats.hp) {
        // Roll a 1d20 to see if the hero can be revived
        const roll = rollDice("1d20");

        // If the roll is 15 or higher, revive the hero with 1 HP
        if (roll >= 15) {
          hero.stats.hp = Math.ceil(hero.stats.hpMax / 4);
          this.addLog(
            `With a roll of ${roll}, ${hero.name} has been revived with partial HP!`
          );
        } else {
          this.addLog(
            `With a roll of ${roll}, ${hero.name} could not be revived yet.`
          );
        }
      }
      // Rest and recover as needed
      else if (hero.stats.hp && hero.stats.hp < hero.stats.hpMax) {
        // Recover up to 25% of max HP
        hero.stats.hp = Math.min(
          hero.stats.hpMax,
          hero.stats.hp + Math.ceil(hero.stats.hpMax / 4)
        );

        this.addLog(
          `${hero.name} rests and recovers ` +
            (hero.stats.hp === hero.stats.hpMax ? "full" : "some") +
            " HP."
        );
      }

      // Reset effects
      hero.effects = hero.effects = [];
    }

    // Notify subscribers
    this._notifyHeroPartySubscribers();
  };

  /**********************
   ***** Initiative *****
   *********************/

  private _initiativeOrder: InitiativeBearer[] = [];

  private _initiativeIndex: number = 0;

  private _initiativeSubscribers = new Set<() => void>();

  private _notifyInitiativeSubscribers() {
    for (const fn of this._initiativeSubscribers) fn();
  }

  onInitiativeChange = (callback: () => void) => {
    this._initiativeSubscribers.add(callback);
    return () => this._initiativeSubscribers.delete(callback);
  };

  getInitiativeSnapshot = (): InitiativeBearer => {
    return this._initiativeOrder[this._initiativeIndex];
  };

  private _rollForInitiative = () => {
    // Reset the initiative order
    this._initiativeOrder = [];

    // Add heroes to the initiative
    Array.from({ length: this._heroParty.heroes.length }, (_, index) => {
      this._initiativeOrder.push({
        type: "Hero",
        index,
      });
    });

    // Add enemies to the initiative
    Array.from({ length: this._enemyParty.enemies.length }, (_, index) => {
      this._initiativeOrder.push({
        type: "Enemy",
        index,
      });
    });

    // Sort by initiative roll
    this._initiativeOrder.sort(() => Math.random() - 0.5);

    // Reset the initiative selection
    this._initiativeIndex = -1;

    // Advance to the first capable creature
    this.advanceInitiative();
  };

  /** Advances the initiative order to the next capable creature */
  advanceInitiative = () => {
    // If the initiative order is empty or the game is over, do nothing
    if (!this._initiativeOrder.length || this._isGameOver) return;

    // Advance the initiative index until a capable creature is found
    let initiativeCreature: Creature;
    do {
      // Go to the next initiative bearer
      this._initiativeIndex =
        (this._initiativeIndex + 1) % this._initiativeOrder.length;

      // Get the current initiative bearer creature
      initiativeCreature =
        this._initiativeOrder[this._initiativeIndex].type === "Hero"
          ? this._heroParty.heroes[
              this._initiativeOrder[this._initiativeIndex].index
            ]
          : this._enemyParty.enemies[
              this._initiativeOrder[this._initiativeIndex].index
            ];
    } while (!initiativeCreature.stats.hp);

    // Notify subscribers
    this._notifyInitiativeSubscribers();
  };

  /****************
   ***** Logs *****
   ***************/

  private _logs: Log[] = [];

  private _logsSubscribers = new Set<() => void>();

  private _notifyLogsSubscribers() {
    for (const fn of this._logsSubscribers) fn();
  }

  onLogChange = (callback: () => void) => {
    this._logsSubscribers.add(callback);
    return () => this._logsSubscribers.delete(callback);
  };

  getLogSnapshot = (): Log[] => {
    return this._logs;
  };

  /** Adds a log and notifies subscribers */
  addLog(message: string) {
    // Add an ID to the log message and only keep the last 10 logs
    this._logs = [
      ...this._logs.slice(-9),
      { _id: crypto.randomUUID(), message },
    ];

    // Notify subscribers
    this._notifyLogsSubscribers();
  }
}
