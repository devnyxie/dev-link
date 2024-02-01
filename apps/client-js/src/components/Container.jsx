// import CssBaseline from "@mui/material/CssBaseline";
import CssBaseline from "@mui/joy/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Container as MUIContainer } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/theme.slice";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

function Container({ children }) {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            //L Cyan
            50: "#E1F5FE",
            100: "#B3E5FC",
            200: "#81D4FA",
            300: "#4FC3F7",
            400: "#29B6F6",
            500: "#03A9F4",
            600: "#039BE5",
            700: "#0288D1",
            800: "#0277BD",
            900: "#01579B",
            //indigo
            // 50: "#E8EAF6",
            // 100: "#C5CAE9",
            // 200: "#9FA8DA",
            // 300: "#7986CB",
            // 400: "#5C6BC0",
            // 500: "#3F51B5",
            // 600: "#3949AB",
            // 700: "#303F9F",
            // 800: "#283593",
            // 900: "#1A237E",
            //cyber
            // 50: "#fdf2f8",
            // 100: "#fce7f3",
            // 200: "#fbcfe8",
            // 300: "#f9a8d4",
            // 400: "#f472b6",
            // 500: "#ec4899",
            // 600: "#db2777",
            // 700: "#be185d",
            // 800: "#9d174d",
            // 900: "#831843",
            // Credit:
            // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
            // 50: "#F3E5F5",
            // 100: "#E1BEE7",
            // 200: "#CE93D8",
            // 300: "#BA68C8",
            // 400: "#AB47BC",
            // 500: "#9C27B0",
            // 600: "#8E24AA",
            // 700: "#7B1FA2",
            // 800: "#6A1B9A",
            // 900: "#4A148C",
            // Adjust the global variant tokens as you'd like.
            // The tokens should be the same for all color schemes.
            // solidBg: "var(--joy-palette-primary-400)",
            // solidActiveBg: "var(--joy-palette-primary-500)",
            // outlinedBorder: "var(--joy-palette-primary-500)",
            // outlinedColor: "var(--joy-palette-primary-700)",
            // outlinedActiveBg: "var(--joy-palette-primary-100)",
            // softColor: "var(--joy-palette-primary-800)",
            // softBg: "var(--joy-palette-primary-200)",
            // softActiveBg: "var(--joy-palette-primary-300)",
            // plainColor: "var(--joy-palette-primary-700)",
            // plainActiveBg: "var(--joy-palette-primary-100)",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            //L Cyan
            50: "#E1F5FE",
            100: "#B3E5FC",
            200: "#81D4FA",
            300: "#4FC3F7",
            400: "#29B6F6",
            500: "#03A9F4",
            600: "#039BE5",
            700: "#0288D1",
            800: "#0277BD",
            900: "#01579B",

            // Credit:
            // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
            // 50: "#F3E5F5",
            // 100: "#E1BEE7",
            // 200: "#CE93D8",
            // 300: "#BA68C8",
            // 400: "#AB47BC",
            // 500: "#9C27B0",
            // 600: "#8E24AA",
            // 700: "#7B1FA2",
            // 800: "#6A1B9A",
            // 900: "#4A148C",
            // Adjust the global variant tokens as you'd like.
            // The tokens should be the same for all color schemes.
            // solidBg: "var(--joy-palette-primary-400)",
            // solidActiveBg: "var(--joy-palette-primary-500)",
            // outlinedBorder: "var(--joy-palette-primary-700)",
            // outlinedColor: "var(--joy-palette-primary-600)",
            // outlinedActiveBg: "var(--joy-palette-primary-900)",
            // softColor: "var(--joy-palette-primary-500)",
            // softBg: "var(--joy-palette-primary-900)",
            // softActiveBg: "var(--joy-palette-primary-800)",
            // plainColor: "var(--joy-palette-primary-500)",
            // plainActiveBg: "var(--joy-palette-primary-900)",
          },
        },
      },
    },
  });
  return (
    <>
      <CssVarsProvider>
        {/* <ThemeProvider theme={themeOpts}> */}
        <CssBaseline />
        <MUIContainer maxWidth="md"> {children}</MUIContainer>
        {/* </ThemeProvider> */}
      </CssVarsProvider>
    </>
  );
}

export default Container;
