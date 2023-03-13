import { combineReducers, configureStore } from '@reduxjs/toolkit';

import usersReducer from './features/usersSlice';

import type { PreloadedState } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  users: usersReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
