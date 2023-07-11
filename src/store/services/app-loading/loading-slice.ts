import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Error {
  name: string;
  message: string;
}

export interface AppLoadingStatus {
  viewLoaded?: boolean;
  eutrophicationDataLoaded?: boolean;
  error?: Error | null;
}

const initialState = {
  viewLoaded: false,
  eutrophicationDataLoaded: false,
  error: null
} as AppLoadingStatus;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setViewLoaded(state, param: PayloadAction<AppLoadingStatus>) {
      state.viewLoaded = param.payload.viewLoaded;
    },
    setEutrophicationDataLoaded(state, param: PayloadAction<AppLoadingStatus>) {
      state.eutrophicationDataLoaded = param.payload.eutrophicationDataLoaded;
    },
    setLoadingError(state, param: PayloadAction<AppLoadingStatus>) {
      state.error = param.payload.error;
    }
  }
});

export const { setViewLoaded, setEutrophicationDataLoaded, setLoadingError } = loadingSlice.actions;
export default loadingSlice.reducer;
