// Dependencies
import { getRandomEnemy } from "@/functions/battle/getRandomEnemy";
import { getRandomHero } from "@/functions/newHero/getRandomHero";
import { rollDice } from "@/functions/rollDice";

// Types
import type { Enemy } from "@/types/Enemy";
import type { HeroParty } from "@/types/HeroParty";
import type { Log } from "@/types/Log";

// Basic Engine Class
export class GameEngine {
  /***********************
   ***** Enemy Party *****
   **********************/

  private _enemyParty: Enemy[] = [];

  private _enemyPartyInitialized = false;

  private _enemyPartySubscribers = new Set<() => void>();

  private _notifyEnemyPartySubscribers() {
    for (const fn of this._enemyPartySubscribers) fn();
  }

  onEnemyPartyChange = (callback: () => void) => {
    this._enemyPartySubscribers.add(callback);

    return () => this._enemyPartySubscribers.delete(callback);
  };

  getEnemyPartySnapshot = (): Enemy[] => {
    return this._enemyParty;
  };

  /** Generates a random enemy party */
  generateEnemyParty = () => {
    if (!this._enemyPartyInitialized) {
      this._enemyPartyInitialized = true;

      this._enemyParty = Array.from({ length: rollDice("1d4") }, () =>
        getRandomEnemy(1)
      );

      this._notifyEnemyPartySubscribers();

      this.addLog(`An enemy party draws near …`);
    }
  };

  damageEnemy = (index: number, amount: number) => {
    const updated = [...this._enemyParty];

    const hp = Math.max(0, updated[index].stats.hp - amount);

    updated[index] = {
      ...updated[index],
      stats: {
        ...updated[index].stats,
        hp,
      },
    };

    this._enemyParty = updated;

    if (!hp) {
      this.addLog(`The ${updated[index].name} has been defeated!`);
    }

    if (!updated.some((enemy) => enemy.stats.hp > 0)) {
      this.addLog("The enemy party has been vanquished!");
      this._enemyPartyInitialized = false;

      this.addXP(
        this._enemyParty.reduce((total, enemy) => total + enemy.xp, 0)
      );

      this.generateEnemyParty();
    }

    this._notifyEnemyPartySubscribers();
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

  generateHeroParty = () => {
    if (!this._heroPartyInitialized) {
      this._heroPartyInitialized = true;

      this._heroParty.heroes = Array.from({ length: 4 }, () => getRandomHero());

      this._notifyHeroPartySubscribers();

      this.addLog("Generated a random hero party.");
    }
  };

  addXP = (amount: number) => {
    this._heroParty.xp += amount;

    this._notifyHeroPartySubscribers();

    this.addLog(
      `The hero party gained ${amount} XP, for a total of ${this._heroParty.xp} XP!`
    );
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
    this._logs = [
      ...this._logs.slice(-9),
      { _id: crypto.randomUUID(), message },
    ];
    this._notifyLogsSubscribers();
  }
}
