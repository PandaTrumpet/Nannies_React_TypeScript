import { createSlice } from "@reduxjs/toolkit";

import { loginUser, logoutUser, registerUser } from "./operation";
type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  accessToken: string | null;
};
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLogged: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLogged: false,
};

// Регистрация

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLogged = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
