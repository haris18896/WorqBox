import {
  API_ENDPOINTS,
  BaseApiResponse,
  PaginatedResult,
} from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LeaveRequest,
  LeaveRequestParams,
  LeaveStatusCount,
  LeaveStatusCountParams,
  LeaveType,
} from "./efsTypes";

export const efsLeavesApi = createApi({
  reducerPath: "efsLeaves",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TAG_TYPES.LeaveRequests,
    TAG_TYPES.LeaveTypes,
    TAG_TYPES.Dashboard,
  ] as const,
  endpoints: (builder) => ({
    // GET MY LEAVE REQUESTS
    getMyLeaveRequests: builder.query<
      PaginatedResult<LeaveRequest>,
      LeaveRequestParams
    >({
      query: (params: LeaveRequestParams = {}) => {
        const searchParams = new URLSearchParams();

        if (params.pageNumber) {
          searchParams.append("pageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("pageSize", params.pageSize.toString());
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("SortOrder", params.sortOrder.toString());
        }
        if (params.keyword) {
          searchParams.append("Keyword", params.keyword);
        }

        return {
          url: `${
            API_ENDPOINTS.GET_MY_LEAVE_REQUESTS
          }?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<LeaveRequest>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: LeaveRequestParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave requests");
        }
      },
      providesTags: (result: PaginatedResult<LeaveRequest> | undefined) => {
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: LeaveRequest) => ({
              type: TAG_TYPES.LeaveRequests,
              id,
            })),
            { type: TAG_TYPES.LeaveRequests, id: "MY_LIST" },
          ];
        }
        return [{ type: TAG_TYPES.LeaveRequests, id: "MY_LIST" }];
      },
    }),

    // GET LEAVE REQUESTS BY ADMIN
    getLeaveRequestsByAdmin: builder.query<
      PaginatedResult<LeaveRequest>,
      LeaveRequestParams
    >({
      query: (params: LeaveRequestParams = {}) => {
        const searchParams = new URLSearchParams();

        if (params.pageNumber) {
          searchParams.append("pageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("pageSize", params.pageSize.toString());
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("SortOrder", params.sortOrder.toString());
        }
        if (params.keyword) {
          searchParams.append("Keyword", params.keyword);
        }

        return {
          url: `${
            API_ENDPOINTS.GET_LEAVE_REQUESTS_BY_ADMIN
          }?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<LeaveRequest>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: LeaveRequestParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch admin leave requests");
        }
      },
      providesTags: (result: PaginatedResult<LeaveRequest> | undefined) => {
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: LeaveRequest) => ({
              type: TAG_TYPES.LeaveRequests,
              id,
            })),
            { type: TAG_TYPES.LeaveRequests, id: "ADMIN_LIST" },
          ];
        }
        return [{ type: TAG_TYPES.LeaveRequests, id: "ADMIN_LIST" }];
      },
    }),

    // GET LEAVE TYPES
    getLeaveTypes: builder.query<PaginatedResult<LeaveType>, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_LEAVE_TYPES,
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<LeaveType>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave types");
        }
      },
      providesTags: (result: PaginatedResult<LeaveType> | undefined) => {
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: LeaveType) => ({
              type: TAG_TYPES.LeaveTypes,
              id,
            })),
            { type: TAG_TYPES.LeaveTypes, id: "LIST" },
          ];
        }
        return [{ type: TAG_TYPES.LeaveTypes, id: "LIST" }];
      },
    }),

    // GET LEAVE STATUS COUNT
    getLeaveStatusCount: builder.query<
      LeaveStatusCount,
      LeaveStatusCountParams
    >({
      query: (params: LeaveStatusCountParams = {}) => {
        const searchParams = new URLSearchParams();

        if (params.employeeId) {
          searchParams.append("employeeId", params.employeeId.toString());
        }

        return {
          url: `${
            API_ENDPOINTS.GET_LEAVE_STATUS_COUNT
          }?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: BaseApiResponse<LeaveStatusCount>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: LeaveStatusCountParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave status count");
        }
      },
      providesTags: (result: LeaveStatusCount | undefined) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT" }]
          : [{ type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT" }],
    }),

    // GET LEAVE STATUS COUNT ADMIN
    getLeaveStatusCountAdmin: builder.query<LeaveStatusCount, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_LEAVE_STATUS_COUNT_ADMIN,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<LeaveStatusCount>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch admin leave status count");
        }
      },
      providesTags: (result: LeaveStatusCount | undefined) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT_ADMIN" }]
          : [{ type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT_ADMIN" }],
    }),
  }),
});
export const {
  useGetMyLeaveRequestsQuery,
  useLazyGetMyLeaveRequestsQuery,
  useGetLeaveRequestsByAdminQuery,
  useLazyGetLeaveRequestsByAdminQuery,
  useGetLeaveTypesQuery,
  useLazyGetLeaveTypesQuery,
  useGetLeaveStatusCountQuery,
  useLazyGetLeaveStatusCountQuery,
  useGetLeaveStatusCountAdminQuery,
  useLazyGetLeaveStatusCountAdminQuery,
} = efsLeavesApi;
