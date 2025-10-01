import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  handleApiSuccess,
  TAG_TYPES,
  transformResponse,
} from "../../utils/api";
import {
  API_ENDPOINTS,
  BaseApiResponse,
  LeaveRequest,
  LeaveRequestListItem,
  LeaveRequestListParams,
  LeaveType,
  PaginatedResult,
} from "../types/api";

export const leaveApi = createApi({
  reducerPath: "leaveApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.LeaveRequests, TAG_TYPES.LeaveTypes],
  endpoints: (builder) => ({
    // GET MY LEAVE REQUEST LIST
    getMyLeaveRequestList: builder.query<
      PaginatedResult<LeaveRequestListItem>,
      LeaveRequestListParams
    >({
      query: ({
        pageNumber = 1,
        pageSize = 10,
        employeeId,
        sortOrder = true,
        fromDate,
        toDate,
        status,
      }) => ({
        url: API_ENDPOINTS.MY_LEAVE_REQUESTS,
        method: "GET",
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          EmployeeId: employeeId,
          SortOrder: sortOrder,
          FromDate: fromDate,
          ToDate: toDate,
          Status: status,
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<LeaveRequestListItem>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave requests");
        }
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.LeaveRequests,
                id: id || "unknown",
              })),
              { type: TAG_TYPES.LeaveRequests, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.LeaveRequests, id: "LIST" }],
      // Enable automatic refetching when parameters change
      serializeQueryArgs: ({ queryArgs }) => {
        const { pageNumber, ...otherArgs } = queryArgs;
        return otherArgs;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageNumber === 1) {
          return newItems; // replace cache when refresh page or first page
        } else {
          return {
            ...newItems, // append to existing cache
            items: [...(currentCache.items || []), ...(newItems.items || [])],
          };
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // GET LEAVE TYPES
    getLeaveTypes: builder.query<LeaveType[], void>({
      query: () => ({
        url: API_ENDPOINTS.LEAVE_TYPES,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<LeaveType[]>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave types");
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TAG_TYPES.LeaveTypes, id })),
              { type: TAG_TYPES.LeaveTypes, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.LeaveTypes, id: "LIST" }],
    }),

    // CREATE LEAVE REQUEST
    createLeaveRequest: builder.mutation<
      LeaveRequest,
      Omit<LeaveRequest, "id">
    >({
      query: (leaveData) => ({
        url: API_ENDPOINTS.CREATE_LEAVE_REQUEST,
        method: "POST",
        body: leaveData,
      }),
      transformResponse: (response: BaseApiResponse<LeaveRequest>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request submitted successfully");
        } catch (error) {
          handleApiError(error, "Failed to submit leave request");
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.LeaveRequests, id: "LIST" }],
    }),

    // UPDATE LEAVE REQUEST
    updateLeaveRequest: builder.mutation<LeaveRequest, LeaveRequest>({
      query: (leaveData) => ({
        url: API_ENDPOINTS.UPDATE_LEAVE_REQUEST,
        method: "PUT",
        body: leaveData,
      }),
      transformResponse: (response: BaseApiResponse<LeaveRequest>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request updated successfully");
        } catch (error) {
          handleApiError(error, "Failed to update leave request");
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_TYPES.LeaveRequests, id },
        { type: TAG_TYPES.LeaveRequests, id: "LIST" },
      ],
    }),

    // CANCEL LEAVE REQUEST
    cancelLeaveRequest: builder.mutation<void, string>({
      query: (leaveId) => ({
        url: `${API_ENDPOINTS.CANCEL_LEAVE_REQUEST}/${leaveId}`,
        method: "POST",
      }),
      transformResponse: (response: BaseApiResponse<void>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request cancelled successfully");
        } catch (error) {
          handleApiError(error, "Failed to cancel leave request");
        }
      },
      invalidatesTags: (result, error, leaveId) => [
        { type: TAG_TYPES.LeaveRequests, id: leaveId },
        { type: TAG_TYPES.LeaveRequests, id: "LIST" },
      ],
    }),

    // GET LEAVE REQUEST BY ID
    getLeaveRequestById: builder.query<LeaveRequest, string>({
      query: (leaveId) => ({
        url: `/Leave/GetLeaveRequest/${leaveId}`,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<LeaveRequest>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave request details");
        }
      },
      providesTags: (result, error, leaveId) => [
        { type: TAG_TYPES.LeaveRequests, id: leaveId },
      ],
    }),
  }),
});

export const {
  useGetMyLeaveRequestListQuery,
  useLazyGetMyLeaveRequestListQuery,
  useGetLeaveTypesQuery,
  useLazyGetLeaveTypesQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useCancelLeaveRequestMutation,
  useGetLeaveRequestByIdQuery,
  useLazyGetLeaveRequestByIdQuery,
} = leaveApi;
