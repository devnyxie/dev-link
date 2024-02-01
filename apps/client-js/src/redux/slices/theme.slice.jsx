import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggle: (state) => {
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    },
  },
});

export const selectTheme = (state) => state.theme.theme;

export const { toggle } = themeSlice.actions;
