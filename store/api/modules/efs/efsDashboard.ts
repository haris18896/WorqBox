import { API_ENDPOINTS, BaseApiResponse } from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AdminDashboardData } from "./efsTypes";

export const efsDashboardApi = createApi({
  reducerPath: "efsDashboard",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET ADMIN DASHBOARD
    getAdminDashboard: builder.query<AdminDashboardData, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_ADMIN_DASHBOARD,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<AdminDashboardData>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch admin dashboard data");
        }
      },
      providesTags: (result: AdminDashboardData | undefined) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: "ADMIN_DASHBOARD" }]
          : [{ type: TAG_TYPES.Dashboard, id: "ADMIN_DASHBOARD" }],
    }),
  }),
});

export const { useGetAdminDashboardQuery, useLazyGetAdminDashboardQuery } =
  efsDashboardApi;
