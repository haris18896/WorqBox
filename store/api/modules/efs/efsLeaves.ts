import {
  API_ENDPOINTS,
  BaseApiResponse,
  PaginatedResult,
} from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  handleApiSuccess,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateUpdateLeaveRequestRequest,
  CreateUpdateLeaveRequestResponse,
  LeaveRequest,
  LeaveRequestDetailsResponse,
  LeaveRequestParams,
  LeaveStatusCount,
  LeaveStatusCountParams,
  LeaveType,
  LeaveTypesResponse,
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
    getLeaveTypes: builder.query<LeaveTypesResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_LEAVE_TYPES,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<LeaveTypesResponse>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave types");
        }
      },
      providesTags: (result: LeaveTypesResponse | undefined) => {
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

    // GET LEAVE REQUEST DETAILS
    getLeaveRequestDetails: builder.query<LeaveRequestDetailsResponse, number>({
      query: (leaveRequestId: number) => ({
        url: `${API_ENDPOINTS.GET_LEAVE_REQUEST_DETAILS}?LeaveRequestId=${leaveRequestId}`,
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<LeaveRequestDetailsResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch leave request details");
        }
      },
      providesTags: (
        result: LeaveRequestDetailsResponse | undefined,
        error,
        arg
      ) => (result ? [{ type: TAG_TYPES.LeaveRequests, id: arg }] : []),
    }),

    // CREATE/UPDATE LEAVE REQUEST
    createUpdateLeaveRequest: builder.mutation<
      CreateUpdateLeaveRequestResponse,
      CreateUpdateLeaveRequestRequest
    >({
      query: (leaveData: CreateUpdateLeaveRequestRequest) => {
        const requestBody = {
          ...leaveData,
          id: leaveData.id || undefined,
        };

        return {
          url: API_ENDPOINTS.CREATE_UPDATE_LEAVE_REQUEST,
          method: "POST",
          body: requestBody,
        };
      },
      transformResponse: (
        response: BaseApiResponse<CreateUpdateLeaveRequestResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: CreateUpdateLeaveRequestRequest,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiSuccess(
            isUpdate
              ? "Leave request updated successfully"
              : "Leave request created successfully"
          );
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : `Failed to ${isUpdate ? "update" : "create"} leave request`
          );
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.LeaveRequests, id: "MY_LIST" },
        ...(arg.id ? [{ type: TAG_TYPES.LeaveRequests, id: arg.id }] : []),
        { type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT" },
      ],
    }),

    // DELETE LEAVE REQUEST
    deleteLeaveRequest: builder.mutation<boolean, number>({
      query: (leaveRequestId: number) => ({
        url: `${API_ENDPOINTS.DELETE_LEAVE_REQUEST}?requestId=${leaveRequestId}`,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request deleted successfully");
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : "Failed to delete leave request"
          );
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.LeaveRequests, id: "MY_LIST" },
        { type: TAG_TYPES.LeaveRequests, id: arg },
        { type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT" },
      ],
    }),

    // APPROVE LEAVE REQUEST
    approveLeaveRequest: builder.mutation<
      boolean,
      { requestId: number; approvalNotes: string }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.APPROVE_LEAVE_REQUEST,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request approved successfully");
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : "Failed to approve leave request"
          );
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.LeaveRequests, id: "ADMIN_LIST" },
        { type: TAG_TYPES.LeaveRequests, id: arg.requestId },
        { type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT_ADMIN" },
      ],
    }),

    // REJECT LEAVE REQUEST
    rejectLeaveRequest: builder.mutation<
      boolean,
      { requestId: number; rejectionNotes: string }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.REJECT_LEAVE_REQUEST,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Leave request rejected successfully");
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : "Failed to reject leave request"
          );
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.LeaveRequests, id: "ADMIN_LIST" },
        { type: TAG_TYPES.LeaveRequests, id: arg.requestId },
        { type: TAG_TYPES.Dashboard, id: "LEAVE_STATUS_COUNT_ADMIN" },
      ],
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
  useGetLeaveRequestDetailsQuery,
  useLazyGetLeaveRequestDetailsQuery,
  useCreateUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation,
} = efsLeavesApi;
