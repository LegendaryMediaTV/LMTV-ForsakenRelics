import { Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useLogs } from "@/hooks/useLogs";

export const AdventureLog = (): React.ReactElement => {
  const logs = useLogs();

  return (
    <Box
      sx={{
        backgroundColor: blueGrey[800],
        border: `10px solid ${blueGrey[700]}`,
        borderRadius: 1,
        mt: 3,
        px: 1,
        py: 0.5,
        lineHeight: 1.25,
        height: 232,
      }}
    >
      {logs.map((log) => (
        <div key={log._id}>{log.message}</div>
      ))}
    </Box>
  );
};
