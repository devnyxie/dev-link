import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { userSlice } from "../slices/user.slice";
import teamsSlice from "../slices/teams.slice";
import loadingSlice from "../slices/loading.slice";
import alertSlice from "../slices/alertSlice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["error", "user"], // 'error' will not be persisted
};

const rootReducer = {
  user: persistReducer(userPersistConfig, userSlice.reducer),
  teams: teamsSlice.reducer,
  loading: loadingSlice,
  alert: alertSlice,
  // Add more reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
