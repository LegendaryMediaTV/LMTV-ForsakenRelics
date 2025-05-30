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
import type { Enemy } from "@/types/Enemy";
import type { HeroParty } from "@/types/HeroParty";

export const BattlePanel = ({
  enemyParty,
  heroParty,
}: {
  enemyParty: Enemy[];
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
          : enemyParty[attackerIndex];

      // Get the defender creature
      const defender =
        defenderType === "Hero"
          ? heroParty.heroes[defenderIndex]
          : enemyParty[defenderIndex];

      engine.addLog(`${attacker.name} attacks ${defender.name} …`);

      // Attempt to hit the defender
      const [didHit, hitRoll] = attemptHit(attacker, defender);
      if (didHit) {
        // Roll for damage
        const damage = rollDice("1d6", { critical: hitRoll === 20 });
        engine.addLog(
          `${attacker.name} hits ${defender.name} with a roll of ${hitRoll} for ${damage} damage!`
        );

        // Apply damage to the defender
        if (defenderType === "Hero") {
          engine.damageHero(defenderIndex, damage);
        } else {
          engine.damageEnemy(defenderIndex!, damage);
        }
      }
      // The attack missed
      else {
        engine.addLog(
          `${attacker.name} misses ${defender.name} with a roll of ${hitRoll}.`
        );
      }
    },
    [enemyParty, engine, heroParty]
  );

  /** Enemy's turn, attack and advance the initiative */
  const enemyTurn = useCallback(() => {
    // Don't proceed if the game is over
    if (isGameOver) return;

    // Attack the active hero
    // TODO: make this random instead of always attacking the active hero
    attackCreature("Enemy", initiativeBearer.index, "Hero", activeHero);

    // Proceed to the next initiative bearer
    engine.advanceInitiative();
  }, [attackCreature, initiativeBearer.index, activeHero, engine]);

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
    const defenderIndex = selectRandomCreature(enemyParty);

    // Initiate the attack
    attackCreature("Hero", activeHero, "Enemy", defenderIndex);

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
                  <Button onClick={handleAttack}>Attack</Button>
                  <Button disabled>Spell</Button>
                  <Button disabled>Item</Button>
                  <Button disabled>Parry</Button>
                  <Button disabled>Flee</Button>
                </ButtonGroup>
              )}
            </Stack>
          )}
        </Grid>

        <Grid size={6}>
          <Typography variant="h4">Enemy Party</Typography>

          {!enemyParty.length && (
            <Typography variant="h5" color="text.secondary">
              The enemy party has been vanquished!
            </Typography>
          )}

          {enemyParty.length && (
            <Grid container spacing={1}>
              {enemyParty.map((enemy, index) => (
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
