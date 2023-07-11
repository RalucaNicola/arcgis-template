import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
  name: string | null;
  selectedFromMap: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialState = {
  name: null,
  selectedFromMap: false
} as CountryState;

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSelectedCountry(state, param: PayloadAction<CountryState>) {
      state.name = param.payload.name;
      state.selectedFromMap = param.payload.selectedFromMap;
      state.loading = true;
    },
    setSelectedCountrySuccess(state) {
      state.loading = false;
    },
    setSelectedCountryError(state, param: PayloadAction<string>) {
      state.loading = false;
      state.error = param.payload;
    }
  }
});

export const { setSelectedCountry, setSelectedCountryError, setSelectedCountrySuccess } = countrySlice.actions;
export default countrySlice.reducer;
