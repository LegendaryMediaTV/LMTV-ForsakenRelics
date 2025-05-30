// Dependencies
import { AdventureLog } from "@/components/layout/AdventureLog";
import { BattlePanel } from "@/components/battle/BattlePanel";
import { Container } from "@mui/material";
import { MainTitle } from "@/components/layout/MainTitle";
import { useEffect } from "react";
import { useEnemyParty } from "@/hooks/useEnemyParty";
import { useEngine } from "@/hooks/useEngine";
import { useHeroParty } from "@/hooks/useHeroParty";

export const App = (): React.ReactElement => {
  /*********************
   ***** Constants *****
   ********************/

  /** Game engine */
  const engine = useEngine();

  /** Hero Party */
  const heroParty = useHeroParty();

  /** Enemy Party */
  const enemyParty = useEnemyParty();

  /*****************
   ***** Hooks *****
   ****************/

  /** Component mounted */
  useEffect(() => {
    // Generate a random hero party
    engine.generateHeroParty();

    // Generate a random enemy party
    engine.generateEnemyParty();
  }, [engine]);

  /******************
   ***** Render *****
   *****************/

  return (
    <Container component="main" sx={{ p: 2 }}>
      <MainTitle />

      {heroParty.heroes.length && enemyParty.length && (
        <BattlePanel enemyParty={enemyParty} heroParty={heroParty} />
      )}

      <AdventureLog />
    </Container>
  );
};
