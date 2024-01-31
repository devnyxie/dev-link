import { ThemeOptions, createTheme } from "@mui/material";
import { getTheme } from "./ThemeToggler";

const isDarkTheme = true;

export const themeOptions = createTheme({
  palette: {
    mode: getTheme(),
    primary: {
      main: "#2196F3",
      dark: "#1565C0", //different dark for light/dark theme.
      light: "#64B5F6",
      contrastText: isDarkTheme == true ? "#ffffff" : "#000000",
    },
    background: isDarkTheme
      ? {
          default: "#121212",
          paper: "#1E1E1E",
        }
      : {
          default: "#f0f0f0",
          paper: "#ffffff",
        },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px", // Set the desired border width for focused state
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: false, // No more ripple, on the whole application 💣!
      },
    },
  },
});
