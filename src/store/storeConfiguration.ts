import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/country-slice';

export const getPreloadedState = () => {
  return {};
};

const rootReducer = combineReducers({ country: countryReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const configureAppStore = (preloadedState: {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};
