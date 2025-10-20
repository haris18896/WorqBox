import { API_ENDPOINTS, PaginatedResult } from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetHolidaysResponse,
  HolidayItem,
  HolidayQueryParams,
} from "./hrmTypes";

export const hrmHolidayApi = createApi({
  reducerPath: "hrmHolidayApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET HOLIDAYS
    getHolidays: builder.query<
      PaginatedResult<HolidayItem>,
      HolidayQueryParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.pageNumber)
          searchParams.append("pageNumber", String(params.pageNumber));
        if (params?.pageSize)
          searchParams.append("pageSize", String(params.pageSize));
        if (params?.sortOrder !== undefined)
          searchParams.append("SortOrder", String(params.sortOrder));
        if (params?.sortBy) searchParams.append("SortBy", params.sortBy);

        return {
          url: `${API_ENDPOINTS.GET_HOLIDAYS}${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (response: GetHolidaysResponse) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: HolidayQueryParams | void,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch holidays");
        }
      },
      providesTags: (result: PaginatedResult<HolidayItem> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "HOLIDAYS" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Dashboard,
                id: `HOLIDAY_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "HOLIDAYS" }],
    }),
  }),
});

export const { useGetHolidaysQuery, useLazyGetHolidaysQuery } = hrmHolidayApi;
