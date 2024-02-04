// alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    open: false,
    message: "",
    severity: "", // 'error', 'warning', 'info', 'success'
  },
  reducers: {
    setAlert: (state, action) => {
      console.log("setAlert");
      state.open = true;
      console.log(state.open);
      const default_message = "An error occurred. Please try again.";
      const default_severity = "danger";
      if (action.payload) {
        console.log("action.payload detected...");
        //message
        if (action.payload.message) {
          console.log("message detected...", action.payload.message);
          state.message = action.payload.message;
        }
        //status
        if (action.payload.status) {
          console.log("status detected...", action.payload.status);
          let statusCode = action.payload.status;
          if (statusCode >= 100 && statusCode < 200) {
            state.severity = "primary";
          } else if (statusCode >= 200 && statusCode < 300) {
            state.severity = "success";
          } else if (statusCode >= 300 && statusCode < 400) {
            state.severity = "warning";
          } else if (statusCode >= 400 && statusCode < 500) {
            state.severity = "danger";
          } else {
            state.severity = "danger";
          }
          console.log("state severy done", state.severity);
        } else {
          state.severity = "primary";
        }
      } else {
        //defaults
        state.message = default_message;
        state.severity = default_severity;
      }
    },
    clearAlert: (state) => {
      state.open = false;
      state.message = "";
      state.severity = "";
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
