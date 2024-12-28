import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import messageReducer from "./reducers/messageReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    message: messageReducer
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
