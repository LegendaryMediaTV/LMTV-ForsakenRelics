// Dependencies
import { BattlePanel } from "@/components/battle/BattlePanel";
import { Container } from "@mui/material";
import { MainTitle } from "@/components/layout/MainTitle";
import { AdventureLog } from "@/components/layout/AdventureLog";

export const App = (): React.ReactElement => {
  return (
    <Container component="main" sx={{ p: 2 }}>
      <MainTitle />

      <BattlePanel />

      <AdventureLog />
    </Container>
  );
};
