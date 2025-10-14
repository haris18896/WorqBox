import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import API slices
import { authApi } from "./api/authApi";
import { baseApi } from "./api/baseApi";
import { dashboardApi } from "./api/dashboardApi";
import { leaveApi } from "./api/leaveApi";
import { pmsApi } from "./api/modules/pms/pmsApi";

// Import regular slices
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // API slices
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,
    [pmsApi.reducerPath]: pmsApi.reducer,

    // Regular slices
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(
      baseApi.middleware,
      authApi.middleware,
      dashboardApi.middleware,
      leaveApi.middleware,
      pmsApi.middleware
    ),
  devTools: __DEV__,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from "./hooks";
