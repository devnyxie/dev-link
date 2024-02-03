import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import Container from "./components/Container.jsx";
import "./css/index.css";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#eceff1",
          100: "#cfd8dc",
          200: "#b0bec5",
          300: "#90a4ae",
          400: "#78909c",
          500: "#607d8b",
          600: "#546e7a",
          700: "#455a64",
          800: "#37474f",
          900: "#263238",
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
          //
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
          outlinedColor: "var(--joy-palette-primary-900)",
          // outlinedActiveBg: "var(--joy-palette-primary-100)",
          // softColor: "var(--joy-palette-primary-800)",
          // softBg: "var(--joy-palette-primary-200)",
          // softActiveBg: "var(--joy-palette-primary-300)",
          plainColor: "var(--joy-palette-primary-900)",
          // plainActiveBg: "var(--joy-palette-primary-100)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#eceff1",
          100: "#cfd8dc",
          200: "#b0bec5",
          300: "#90a4ae",
          400: "#78909c",
          500: "#607d8b",
          600: "#546e7a",
          700: "#455a64",
          800: "#37474f",
          900: "#263238",
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
          outlinedColor: "var(--joy-palette-primary-50)",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
