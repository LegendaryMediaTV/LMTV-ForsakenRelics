// Dependencies
import { createTheme } from "@mui/material/styles";
import { amber, blueGrey, grey, red } from "@mui/material/colors";

export const getTheme = createTheme({
  palette: {
    background: {
      default: blueGrey[900],
    },
    text: {
      primary: "#ffffff",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        style: { width: "100%" },
      },
    },

    MuiButtonGroup: {
      defaultProps: {
        orientation: "vertical",
        variant: "contained",
        style: { width: "100%" },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: { lineHeight: 1.25 },
        "h1, h2, h3, h4, h5, h6": {
          lineHeight: 1,
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            sx: {
              backgroundColor: blueGrey[800],
            },
          },
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: { padding: "0.75rem 0.75rem" },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: { color: amber[500], padding: "0.75rem 0.75rem" },
      },
    },
  },

  typography: {
    fontFamily: '"Texturina", serif',

    h1: {
      fontFamily: '"Lavishly Yours", cursive',
      fontSize: "4.17rem",
      color: red[900],
      lineHeight: 0.75,
      textAlign: "center",
      WebkitTextStroke: `0.25px ${amber[500]}`,
    },

    h2: {
      color: amber[600],
      fontSize: "1.61rem",
      textAlign: "center",
    },

    h3: { fontSize: "2.10rem", marginBottom: 16 },

    h4: { color: grey[400], fontSize: "1.31rem", marginBottom: 16 },

    h5: { color: amber[500], fontSize: "1rem" },
  },
});
