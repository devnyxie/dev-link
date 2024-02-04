import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    startLoading: () => true,
    finishLoading: () => false,
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
