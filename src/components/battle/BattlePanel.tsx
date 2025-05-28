// Dependencies
import { attemptHit } from "@/functions/battle/attemptHit";
import { blueGrey } from "@mui/material/colors";
import { Button, ButtonGroup, Grid, Stack, Typography } from "@mui/material";
import { CreatureCard } from "../layout/CreatureCard";
import { rollDice } from "@/functions/rollDice";
import { selectRandomCreature } from "@/functions/battle/selectRandomCreature";
import { useEffect, useState } from "react";
import { useEnemyParty } from "@/hooks/useEnemyParty";
import { useEngine } from "@/hooks/useEngine";
import { useHeroParty } from "@/hooks/useHeroParty";

// Types
import type { Enemy } from "@/types/Enemy";
import type { Hero } from "@/types/Hero";

export const BattlePanel = () => {
  /*****************
   ***** State *****
   ****************/

  /** Active hero */
  const [activeHero, setActiveHero] = useState<number>(0);

  /** Target enemy */
  // const [targetEnemy, setTargetEnemy] = useState<number | null>(null);

  /*****************
   ***** Hooks *****
   ****************/

  /** Logger */
  const engine = useEngine();
  const heroParty = useHeroParty();
  const enemyParty = useEnemyParty();

  /** Component mounted */
  useEffect(() => {
    // Generate a random hero party
    engine.generateHeroParty();

    // Generate a random enemy party
    engine.generateEnemyParty();
  }, [engine]);

  /********************
   ***** Handlers *****
   *******************/

  const handleAttack = (attacker: Hero | Enemy) => {
    const defenderIndex = selectRandomCreature(enemyParty);
    const defender = enemyParty[defenderIndex];

    engine.addLog(`${attacker.name} attacks the ${defender.name} …`);

    const [didHit, hitRoll] = attemptHit(attacker, defender);
    if (didHit) {
      const damage = rollDice("1d6", { critical: hitRoll === 20 });
      engine.addLog(
        `${attacker.name} hits the ${defender.name} with a roll of ${hitRoll} for ${damage} damage!`
      );

      engine.damageEnemy(defenderIndex!, damage);
    } else {
      engine.addLog(
        `${attacker.name} misses the ${defender.name} with a roll of ${hitRoll}.`
      );
    }

    // Set the next active hero
    setActiveHero((prev) => (prev + 1) % heroParty.heroes.length);
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
                <CreatureCard key={index} creature={hero} isHero />
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
              <CreatureCard creature={heroParty.heroes[activeHero]} isHero />

              <ButtonGroup>
                <Button
                  onClick={handleAttack.bind(
                    null,
                    heroParty.heroes[activeHero]
                  )}
                >
                  Attack
                </Button>
                <Button disabled>Spell</Button>
                <Button disabled>Item</Button>
                <Button disabled>Parry</Button>
                <Button disabled>Flee</Button>
              </ButtonGroup>
            </Stack>
          )}
        </Grid>

        <Grid size={6}>
          <Typography variant="h4">Enemy Party</Typography>

          {!enemyParty.length && (
            <Typography variant="h5" color="text.secondary">
              The enemy party has been defeated!
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
