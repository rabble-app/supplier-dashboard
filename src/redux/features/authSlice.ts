/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userId: string;
  id: string;
  businessName: string;
  businessEmail: string;
  isVerified: boolean;
  role: string;
  stripeConnectId: string | null;
}

const initialState: AuthState = {
  userId: '',
  id: '',
  businessName: '',
  businessEmail: '',
  isVerified: false,
  role: '',
  stripeConnectId: null
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
        isVerified: action.payload.isVerified,
        role: action.payload.role,
        stripeConnectId: action.payload.stripeConnectId,
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
