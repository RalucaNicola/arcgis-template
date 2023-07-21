import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countryReducer from './services/country-selection/countrySelectionSlice';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  country: countryReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
