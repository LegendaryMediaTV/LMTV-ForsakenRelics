// Dependencies
import { amber, blueGrey, grey, red } from "@mui/material/colors";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

// Types
import type { Enemy } from "@/types/Enemy";
import type { Hero } from "@/types/Hero";

export const CreatureCard = ({ creature }: { creature: Enemy | Hero }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // Determine if the creature is a Hero
  const isHero = (creature as Hero).equipment !== undefined;

  // Determine the image folder path
  const imageFolder = isHero ? "heroes" : "enemies";

  const status =
    creature.stats.hp >= creature.stats.hpMax * 0.5
      ? "ok"
      : creature.stats.hp
      ? "critical"
      : "dead";

  return (
    <>
      <Stack
        spacing={0.25}
        sx={{ opacity: status === "dead" ? 0.35 : undefined }}
      >
        <Button variant="text" onClick={toggleModal} sx={{ padding: 0 }}>
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
        </Button>

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

      <Dialog onClose={toggleModal} open={showModal}>
        <DialogTitle>
          {(creature as Hero).nameFull ?? creature.name}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid size={6}>
              <Box
                component="img"
                src={"/images/" + imageFolder + "/" + creature.image + ".png"}
                sx={{ width: 1 }}
              />
            </Grid>

            <Grid size={6}>
              <Typography variant="h5">Stats</Typography>

              <Grid container spacing={0.5} sx={{ color: grey[400] }}>
                {isHero ? (
                  <>
                    <Grid size={{ xs: 6 }}>Race:</Grid>
                    <Grid size={{ xs: 6 }}>{(creature as Hero).race}</Grid>

                    <Grid size={{ xs: 6 }}>Gender:</Grid>
                    <Grid size={{ xs: 6 }}>{(creature as Hero).gender}</Grid>

                    <Grid size={{ xs: 6 }}>Class:</Grid>
                    <Grid size={{ xs: 6 }}>{(creature as Hero).class}</Grid>
                  </>
                ) : (
                  <>
                    <Grid size={{ xs: 6 }}>Alignment:</Grid>
                    <Grid size={{ xs: 6 }}>
                      {(creature as Enemy).alignment}
                    </Grid>
                  </>
                )}

                <Grid size={{ xs: 6 }}>Level:</Grid>
                <Grid size={{ xs: 6 }}>{creature.stats.level}</Grid>

                <Grid size={{ xs: 6 }}>HP:</Grid>
                <Grid size={{ xs: 6 }}>
                  {creature.stats.hp} / {creature.stats.hpMax}
                </Grid>

                <Grid size={{ xs: 6 }}>Offense:</Grid>
                <Grid size={{ xs: 6 }}>{creature.stats.offense}</Grid>

                <Grid size={{ xs: 6 }}>Defense:</Grid>
                <Grid size={{ xs: 6 }}>{creature.stats.defense}</Grid>

                {isHero ? (
                  <>
                    <Grid size={{ xs: 6 }}>Unarmed:</Grid>
                    <Grid size={{ xs: 6 }}>
                      {(creature as Hero).stats.unarmed}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid size={{ xs: 6 }}>XP:</Grid>
                    <Grid size={{ xs: 6 }}>{(creature as Enemy).xp}</Grid>
                  </>
                )}
              </Grid>

              {isHero ? (
                <>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    Equipment
                  </Typography>

                  <Box sx={{ color: grey[400] }}>
                    {(creature as Hero).equipment.length ? (
                      <ul>
                        {(creature as Hero).equipment.map((item) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    Description
                  </Typography>

                  <Box sx={{ color: grey[400] }}>
                    {(creature as Enemy).description}
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
