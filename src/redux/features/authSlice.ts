/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  businessName: string;
  businessEmail: string;
}

const initialState: AuthState = {
  id: '',
  businessName: '',
  businessEmail: '',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        id: action.payload.id,
        businessName: action.payload.businessName,
        businessEmail: action.payload.businessEmail,
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
