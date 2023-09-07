import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySelectionSlice';
import loadingReducer from './loadingSlice';
import errorReducer from './errorSlice';
import authenticationReducer from './authenticationSlice';
import modalOptionsReducer from './modalSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  error: errorReducer,
  loading: loadingReducer,
  country: countryReducer,
  infoModal: modalOptionsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
