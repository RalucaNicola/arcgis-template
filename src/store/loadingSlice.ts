import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppLoadingStatus {
  viewLoaded?: boolean;
  countryDataLoaded?: boolean;
}

const initialState = {
  viewLoaded: false,
  countryDataLoaded: false
} as AppLoadingStatus;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setViewLoaded(state, param: PayloadAction<boolean>) {
      state.viewLoaded = param.payload;
    },
    setCountryDataLoaded(state, param: PayloadAction<boolean>) {
      state.countryDataLoaded = param.payload;
    }
  }
});

export const { setViewLoaded, setCountryDataLoaded } = loadingSlice.actions;
export default loadingSlice.reducer;
