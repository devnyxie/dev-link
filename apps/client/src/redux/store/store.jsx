import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slices/user.slice";
import teamsSlice from "../slices/teams.slice";

const rootReducer = {
  user: userSlice.reducer,
  teams: teamsSlice.reducer,
  // Add more reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
