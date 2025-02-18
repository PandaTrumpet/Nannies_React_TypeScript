import { RootState } from "../store";
export const userInfo = (state: RootState) => state.auth.user;
export const isLogged = (state: RootState) => state.auth.isLogged;
export const authError = (state: RootState) => state.auth.error;
