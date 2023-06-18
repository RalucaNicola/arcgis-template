import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
  name: string | null;
  selectedFromMap: boolean;
}

const initialState = {
  name: null,
  selectedFromMap: false
} as CountryState;

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry(state, param: PayloadAction<{ name: string; selectedFromMap: boolean }>) {
      state.name = param.payload.name;
      state.selectedFromMap = param.payload.selectedFromMap;
    }
  }
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
