// Dependencies
import _ from "lodash";
import { getRandomEnemy } from "@/functions/battle/getRandomEnemy";
import { getRandomHero } from "@/functions/newHero/getRandomHero";
import { rollDice } from "@/functions/rollDice";

// Types
import type { Creature } from "@/types/Creature";
import type { Enemy } from "@/types/Enemy";
import type { HeroParty } from "@/types/HeroParty";
import type { InitiativeBearer } from "@/types/InitiativeBearer";
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

      this._rollForInitiative();
    }
  };

  /** Apply damage to the corresponding enemy party member */
  damageEnemy = (index: number, amount: number) => {
    const updated = _.cloneDeep(this._enemyParty);

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
      this.addLog(`${updated[index].name} has perished!`);
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

      this._heroParty.heroes = Array.from({ length: 4 }, () => getRandomHero());

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

  /** Adds earned XP to the hero party */
  addXP = (amount: number) => {
    this._heroParty.xp += amount;

    this._notifyHeroPartySubscribers();

    this.addLog(
      `The hero party gained ${amount} XP, for a total of ${this._heroParty.xp} XP!`
    );
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
    Array.from({ length: this._enemyParty.length }, (_, index) => {
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
          : this._enemyParty[
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
