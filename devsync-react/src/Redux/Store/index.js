import { configureStore } from '@reduxjs/toolkit';
// import secondReducer from "../reducers/secondReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import Reducer from '../Reducers/reducer';
import users_reducer from '../Reducers/users_reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
