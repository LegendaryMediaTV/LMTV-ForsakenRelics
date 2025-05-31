// Dependencies
import { attemptHit } from "@/functions/battle/attemptHit";
import { blueGrey } from "@mui/material/colors";
import { Button, ButtonGroup, Grid, Stack, Typography } from "@mui/material";
import { CreatureCard } from "../layout/CreatureCard";
import { rollDice } from "@/functions/rollDice";
import { selectRandomCreature } from "@/functions/battle/selectRandomCreature";
import { useCallback, useEffect, useState } from "react";
import { useEngine } from "@/hooks/useEngine";
import { useGameOver } from "@/hooks/useGameOver";
import { useInitiative } from "@/hooks/useInitiative";

// Types
import type { Attack, AttackEffect } from "@/types/Attack";
import type { EnemyParty } from "@/types/EnemyParty";
import type { HeroParty } from "@/types/HeroParty";

export const BattlePanel = ({
  enemyParty,
  heroParty,
}: {
  enemyParty: EnemyParty;
  heroParty: HeroParty;
}) => {
  /*********************
   ***** Constants *****
   ********************/

  /** Game engine */
  const engine = useEngine();

  /** Game over */
  const isGameOver = useGameOver();

  /** Initiative bearer */
  const initiativeBearer = useInitiative();

  /*****************
   ***** State *****
   ****************/

  /** Active hero */
  const [activeHero, setActiveHero] = useState<number>(0);

  /*******************
   ***** Methods *****
   ******************/

  /** One creature attacks another */
  const attackCreature = useCallback(
    (
      attackerType: "Hero" | "Enemy",
      attackerIndex: number,
      defenderType: "Hero" | "Enemy",
      defenderIndex: number
    ) => {
      // Get the attacker creature
      const attacker =
        attackerType === "Hero"
          ? heroParty.heroes[attackerIndex]
          : enemyParty.enemies[attackerIndex];

      // Get the defender creature
      const defender =
        defenderType === "Hero"
          ? heroParty.heroes[defenderIndex]
          : enemyParty.enemies[defenderIndex];

      // Determine the attack type
      let attack: Attack;
      if ("secondary" in attacker) {
        const attackTypeRoll = rollDice("1d6");

        attack = attackTypeRoll >= 5 ? attacker.secondary : attacker.primary;
      } else {
        attack = {
          name: "Weapon",
          damage: "1d6",
        };
      }

      engine.addLog(
        `${attacker.name} attacks ${defender.name} with ${attack.name} …`
      );

      // Attempt to hit the defender
      const [didHit, hitRoll] = attemptHit(attacker, defender);
      if (didHit) {
        // Determine if it is a critical hit
        const isCritical = hitRoll === 20;

        let hitLog = `${attacker.name} hits with a roll of ${hitRoll}`;
        if (isCritical) {
          hitLog += "—critical hit";
        }

        // Roll for damage, when applicable
        let damage = 0;
        if (attack.damage) {
          damage = rollDice(attack.damage, { isCritical });
          hitLog += (isCritical ? "—" : ", ") + `inflicting ${damage} damage`;
        }
        hitLog += "!";

        // Determine the attack effect, when applicable
        let effect: AttackEffect | undefined;
        if (isCritical && attack.criticalEffect) {
          effect = attack.criticalEffect;
        } else if (attack.effect) {
          effect = attack.effect;
        }

        engine.addLog(hitLog);

        // Apply damage to the defender
        if (defenderType === "Hero") {
          if (damage) {
            engine.damageHero(defenderIndex, damage);
          }

          if (effect) {
            engine.affectHero(defenderIndex, effect);
          }
        } else {
          if (damage) {
            engine.damageEnemy(defenderIndex!, damage);
          }

          if (effect) {
            engine.affectEnemy(defenderIndex, effect);
          }
        }
      }
      // The attack missed
      else {
        engine.addLog(`${attacker.name} misses with a roll of ${hitRoll}.`);
      }
    },
    [enemyParty, engine, heroParty]
  );

  /** Enemy's turn, attack and advance the initiative */
  const enemyTurn = useCallback(() => {
    // Don't proceed if the game is over
    if (isGameOver) return;

    // Randomly select a defender from the hero party
    const defenderIndex = selectRandomCreature(heroParty.heroes);

    // Attack the active hero
    attackCreature("Enemy", initiativeBearer.index, "Hero", defenderIndex);

    // Proceed to the next initiative bearer
    engine.advanceInitiative();
  }, [
    attackCreature,
    heroParty.heroes,
    initiativeBearer.index,
    engine,
    isGameOver,
  ]);

  /** Hero's turn, set the active hero */
  const heroTurn = useCallback(() => {
    setActiveHero(initiativeBearer.index);
  }, [initiativeBearer.index]);

  /*****************
   ***** Hooks *****
   ****************/

  /** Enemies should attack on their turn */
  useEffect(() => {
    // If the initiative is empty, return
    if (!initiativeBearer) return;

    // Route the turn based on the initiative bearer type
    if (initiativeBearer.type === "Hero") {
      heroTurn();
    }
    // Enemy's turn, attack and proceed to the next initiative
    else {
      enemyTurn();
    }
  }, [initiativeBearer, enemyTurn, heroTurn]);

  /********************
   ***** Handlers *****
   *******************/

  /** When the Attack button is clicked */
  const handleAttack = () => {
    // Randomly select a defender from the enemy party
    const defenderIndex = selectRandomCreature(enemyParty.enemies);

    // Initiate the attack
    attackCreature("Hero", activeHero, "Enemy", defenderIndex);

    // Proceed to the next initiative bearer
    engine.advanceInitiative();
  };

  /** When the Recover button is clicked */
  const handleRecover = () => {
    // Attempt to recover the active hero
    engine.recoverHero(activeHero);

    // Proceed to the next initiative bearer
    engine.advanceInitiative();
  };

  /******************
   ***** Render *****
   *****************/

  return (
    <section>
      <Typography variant="h3">Battle</Typography>

      <Grid container spacing={2}>
        <Grid size={4}>
          <Typography variant="h4">Hero Party</Typography>

          <Grid container spacing={1}>
            {heroParty.heroes.map((hero, index) => (
              <Grid size={6} key={index}>
                <CreatureCard key={index} creature={hero} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          size={2}
          sx={{
            bgcolor: blueGrey[800],
            border: `2px solid ${blueGrey[300]}`,
            borderRadius: 1,
            pb: 0.5,
            px: 0.5,
          }}
        >
          <Typography variant="h4">Actions</Typography>

          {heroParty.heroes.length && (
            <Stack spacing={1}>
              <CreatureCard creature={heroParty.heroes[activeHero]} />

              {!isGameOver && (
                <ButtonGroup>
                  {heroParty.heroes[activeHero].effects &&
                  (heroParty.heroes[activeHero].effects.includes("Stun") ||
                    heroParty.heroes[activeHero].effects.includes("KO")) ? (
                    <Button onClick={handleRecover}>Recover</Button>
                  ) : (
                    <>
                      <Button onClick={handleAttack}>Attack</Button>
                      <Button disabled>Spell</Button>
                      <Button disabled>Item</Button>
                      <Button disabled>Parry</Button>
                      <Button disabled>Flee</Button>
                    </>
                  )}
                </ButtonGroup>
              )}
            </Stack>
          )}
        </Grid>

        <Grid size={6}>
          <Typography variant="h4">Enemy Party</Typography>

          {!enemyParty.enemies.length && (
            <Typography variant="h5" color="text.secondary">
              The enemy party has been vanquished!
            </Typography>
          )}

          {enemyParty.enemies.length && (
            <Grid container spacing={1}>
              {enemyParty.enemies.map((enemy, index) => (
                <Grid size={4} key={index}>
                  <CreatureCard creature={enemy} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </section>
  );
};
