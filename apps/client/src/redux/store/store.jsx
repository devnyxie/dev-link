import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { userSlice } from "../slices/user.slice";
import teamsSlice from "../slices/teams.slice";
import loadingSlice from "../slices/loading.slice";
import snackbarSlice from "../slices/snackbar.slice";
import technologiesSlice from "../slices/technologies.slice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["error"], // 'error' will not be persisted
};

const rootReducer = {
  user: persistReducer(userPersistConfig, userSlice.reducer),
  teams: teamsSlice.reducer,
  loading: loadingSlice,
  snackbar: snackbarSlice,
  technologies: technologiesSlice,
  // Add more reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export const getStore = () => store;

export default store;
