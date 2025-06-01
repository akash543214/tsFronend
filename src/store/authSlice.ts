import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  name: string;
  email: string;
  googleId: string;
  provider: "google" | "local"; // Adjust if you support more providers
  createdAt: Date; // ISO timestamp
  updatedAt: Date; // ISO timestamp
  __v: number;
}

interface AuthState {
  status: boolean;
  userData: UserData | null;
}

const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
