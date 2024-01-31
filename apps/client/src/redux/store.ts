// store.ts
import { configureStore } from "@reduxjs/toolkit";

// Initial states
const initialState = {
  // Your initial state goes here
  theme: "dark",
};

// Action types
const SET_THEME = "SET_THEME";

// Action creators
export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
});

// Reducers
const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
