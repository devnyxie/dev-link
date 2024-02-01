import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "../slices/theme.slice";
import { userSlice } from "../slices/user.slice";

const store = configureStore({
  reducer: themeSlice.reducer,
  reducer: userSlice.reducer,
});

export default store;
