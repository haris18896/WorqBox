import { API_ENDPOINTS, BaseApiResponse } from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AmsDashboardData } from "./amsTypes";

export const amsDashboardApi = createApi({
  reducerPath: "amsDashboard",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET AMS DASHBOARD
    getAmsDashboard: builder.query<AmsDashboardData, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_AMS_DASHBOARD,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<AmsDashboardData>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch AMS dashboard data");
        }
      },
      providesTags: (result: AmsDashboardData | undefined) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: "AMS_DASHBOARD" }]
          : [{ type: TAG_TYPES.Dashboard, id: "AMS_DASHBOARD" }],
    }),
  }),
});

export const { useGetAmsDashboardQuery, useLazyGetAmsDashboardQuery } =
  amsDashboardApi;
