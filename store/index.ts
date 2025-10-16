import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import API slices
import { authApi } from "./api/authApi";
import { baseApi } from "./api/baseApi";
import { dashboardApi } from "./api/dashboardApi";
import { leaveApi } from "./api/leaveApi";
import { pmsApi } from "./api/modules/pms/pmsApi";

// Import regular slices
import { efsDashboardApi } from "./api/modules/efs/efsDashboard";
import { efsLeavesApi } from "./api/modules/efs/efsLeaves";
import { pmsProjectsApi } from "./api/modules/pms/pmsProjects";
import { pmsReportingApi } from "./api/modules/pms/pmsReportingApi";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // API slices
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,

    // PMS
    [pmsApi.reducerPath]: pmsApi.reducer,
    [pmsProjectsApi.reducerPath]: pmsProjectsApi.reducer,
    [pmsReportingApi.reducerPath]: pmsReportingApi.reducer,

    // EFS
    [efsDashboardApi.reducerPath]: efsDashboardApi.reducer,
    [efsLeavesApi.reducerPath]: efsLeavesApi.reducer,

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
      pmsApi.middleware,
      pmsProjectsApi.middleware,
      pmsReportingApi.middleware,
      efsDashboardApi.middleware,
      efsLeavesApi.middleware
    ),
  devTools: __DEV__,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from "./hooks";
