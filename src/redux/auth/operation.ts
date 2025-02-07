// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// interface IAuth {
//   email: string;
//   password: string;
// }
// export const registerAuth = createAsyncThunk(
//   "auth/register",
//   async ({ email, password }: IAuth, thunkAPI) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("User registered", userCredential.user);
//       return userCredential.user;
//     } catch (error: unknown) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   console.log("User registered", userCredential.user);
      const user = userCredential.user;
      // console.log(user);
      const accessToken = await user.getIdToken();
      await updateProfile(user, { displayName: name });
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Вход
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const accessToken = await user.getIdToken();
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Выход
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});
