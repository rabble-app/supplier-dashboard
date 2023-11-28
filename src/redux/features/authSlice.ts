/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userId: string;
  id: string;
  businessName: string;
  businessEmail: string;
}

const initialState: AuthState = {
  userId: '',
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
        userId: action.payload.userId,
        id: action.payload.id,
        businessName: action.payload.businessName,
        businessEmail: action.payload.businessEmail,
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
