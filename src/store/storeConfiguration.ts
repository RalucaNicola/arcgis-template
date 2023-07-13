import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countryReducer from './services/country-selection/countrySlice';
import loadingReducer from './services/app-loading/loadingSlice';

export const getPreloadedState = () => {
  return {};
};

const rootReducer = combineReducers({
  appLoading: loadingReducer,
  country: countryReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState()
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
