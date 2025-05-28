import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../query/create-api';

const isProduction = false;
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: !isProduction,
});
