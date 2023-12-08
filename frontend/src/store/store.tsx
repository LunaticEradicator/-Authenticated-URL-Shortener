import { configureStore } from "@reduxjs/toolkit";
import parentApi from "./apis/parentApi";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [parentApi.reducerPath]: parentApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parentApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
