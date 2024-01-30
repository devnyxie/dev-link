import { ThemeOptions, createTheme } from "@mui/material";

const isDarkTheme = false;

export const themeOptions = createTheme({
  palette: {
    mode: isDarkTheme == true ? "dark" : "light",
    primary: {
      main: "#2196F3", // Main shade of blue
      dark: "#1565C0", // Darker shade of blue
      light: "#64B5F6", // Lighter shade of blue
      contrastText: "#2196F3",
    },
    secondary: isDarkTheme
      ? {
          main: "#ffffff", // Main shade of blue
        }
      : {
          main: "#000000", // Main shade of blue
        },
    background: isDarkTheme
      ? {
          default: "#121212", // Dark theme default background color
          paper: "#1E1E1E", // Dark theme paper background color
        }
      : {
          default: "#f0f0f0", // Light theme default background color
          paper: "#ffffff", // Light theme paper background color
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
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});
