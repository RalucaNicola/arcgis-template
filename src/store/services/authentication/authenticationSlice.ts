import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserCredentials {
  userName: string | null;
  fullName: string | null;
  email: string | null;
  thumbnailUrl: string | null;
}

interface AuthenticationStatus extends UserCredentials {
  signedIn: boolean;
}

const initialState = {
  signedIn: false,
  userName: null,
  fullName: null,
  email: null,
  thumbnailUrl: null
} as AuthenticationStatus;

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticationInfo(state, param: PayloadAction<AuthenticationStatus>) {
      state.signedIn = param.payload.signedIn;
      state.userName = param.payload.userName;
      state.fullName = param.payload.fullName;
      state.email = param.payload.email;
      state.thumbnailUrl = param.payload.thumbnailUrl;
    }
  }
});

export const { setAuthenticationInfo } = authenticationSlice.actions;
export default authenticationSlice.reducer;
