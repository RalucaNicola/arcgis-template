import { Polygon } from '@arcgis/core/geometry';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
  name: string | null;
  loading?: boolean;
  geometry?: Polygon | null;
}

const initialState = {
  name: null,
  loading: false
} as CountryState;

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSelectedCountry(state, param: PayloadAction<CountryState>) {
      state.name = param.payload.name;
      state.loading = true;
    },
    setSelectedCountryFinishedLoading(state) {
      state.loading = false;
    }
  }
});

export const { setSelectedCountry, setSelectedCountryFinishedLoading } = countrySlice.actions;
export default countrySlice.reducer;
