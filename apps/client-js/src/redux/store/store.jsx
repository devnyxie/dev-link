import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "../slices/theme.slice";

const store = configureStore({
  reducer: themeSlice.reducer,
});

export default store;
