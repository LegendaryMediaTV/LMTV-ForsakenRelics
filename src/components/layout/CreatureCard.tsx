// Dependencies
import { Box, Grid, Stack, Typography } from "@mui/material";
import { amber, blueGrey, grey, red } from "@mui/material/colors";

// Types
import type { Creature } from "@/types/Creature";

export const CreatureCard = ({
  creature,
  isHero,
}: {
  creature: Creature;
  isHero?: boolean;
}) => {
  // Determine the image folder path
  const imageFolder = isHero ? "heroes" : "enemies";

  const status =
    creature.stats.hp >= creature.stats.hpMax * 0.5
      ? "ok"
      : creature.stats.hp
      ? "critical"
      : "dead";

  return (
    <Stack
      spacing={0.25}
      sx={{ opacity: status === "dead" ? 0.35 : undefined }}
    >
      <Box
        component="img"
        src={
          "/images/" +
          imageFolder +
          "/" +
          creature.image +
          (isHero ? "-headshot" : "") +
          ".png"
        }
        sx={{
          border: `2px solid ${
            status === "dead"
              ? red[500]
              : status === "critical"
              ? amber[900]
              : blueGrey[600]
          }`,
          borderRadius: 1,
          width: 1,
        }}
      />

      <Typography variant="h5">{creature.name}</Typography>

      <Grid
        container
        spacing={0.25}
        sx={{ color: grey[400], fontSize: "small" }}
      >
        <Grid size={{ xs: 6 }}>HP:</Grid>
        <Grid size={{ xs: 6 }}>
          {creature.stats.hp} / {creature.stats.hpMax}
        </Grid>

        <Grid size={{ xs: 6 }}>Off / Def:</Grid>
        <Grid size={{ xs: 6 }}>
          {creature.stats.offense} / {creature.stats.defense}
        </Grid>
      </Grid>
    </Stack>
  );
};
