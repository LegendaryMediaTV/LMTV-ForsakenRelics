// Dependencies
import { App } from "./App.tsx";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "@/functions/getTheme.ts";
import { EngineProvider } from "@/contexts/EngineProvider.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={getTheme}>
      <CssBaseline />

      <EngineProvider>
        <App />
      </EngineProvider>
    </ThemeProvider>
  </StrictMode>
);
