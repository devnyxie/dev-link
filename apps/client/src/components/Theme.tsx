import { ThemeOptions, createTheme } from "@mui/material";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#5a5a5a",
    },
    background: {
      default: "#000000",
      paper: "rgba(24,24,24,0.7)",
    },
  },
});
