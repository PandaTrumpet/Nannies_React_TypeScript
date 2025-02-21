import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/slice";
import authReducer from "./auth/slice";
import nanniesReducer from "./nannies/slice";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    nannies: nanniesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
