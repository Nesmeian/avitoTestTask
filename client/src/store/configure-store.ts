import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../query/create-api';
import { BoardSlice } from './boardStore';
import { usersSlice } from './usersStore';
import { TasksSlice } from './tasksStore';
import { queryState } from './queryState';

const isProduction = false;
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [BoardSlice.name]: BoardSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [TasksSlice.name]: TasksSlice.reducer,
  [queryState.name]: queryState.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: !isProduction,
});
export type AppDispatch = typeof store.dispatch;
