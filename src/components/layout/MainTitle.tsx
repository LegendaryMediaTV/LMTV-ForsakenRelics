// Dependencies
import { Box, Typography } from "@mui/material";

export const MainTitle = (): React.ReactElement => {
  return (
    <Box component="header" sx={{ mb: 2 }}>
      <Typography variant="h1">Forsaken Relics</Typography>
      <Typography variant="h2">adventure awaits</Typography>
    </Box>
  );
};
