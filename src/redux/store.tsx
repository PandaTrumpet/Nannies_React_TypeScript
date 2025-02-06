import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/slice";
import authReducer from "./auth/slice";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       ignoredActions: ["your/action/type"],
  //       // Ignore these field paths in all actions
  //       ignoredActionPaths: ["meta.arg", "payload.timestamp"],
  //       // Ignore these paths in the state
  //       ignoredPaths: ["items.dates"],
  //     },
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
