import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: undefined,
    color: "neutral",
  },
  reducers: {
    setSnackbar: (state, action) => {
      //default message
      if (!action.payload || !action.payload.message) {
        state.message = "An error occurred. Please try again.";
      }
      //message
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      //color
      if (action.payload && action.payload.color) {
        state.color = action.payload.color;
      }
      //Enable
      state.open = true;
    },

    clearSnackbar: (state) => {
      state.open = false;
      state.color = "neutral";
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
