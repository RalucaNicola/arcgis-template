import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Error {
  name: string | null;
  message: string | null;
}

const initialState = {
  name: null,
  message: null
} as Error | null;

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, param: PayloadAction<Error>) {
      state.name = param.payload.name;
      state.message = param.payload.message;
    }
  }
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
