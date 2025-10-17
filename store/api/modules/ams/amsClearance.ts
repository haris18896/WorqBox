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
import { ClearanceParams, EmployeeAssignment } from "./amsTypes";

export const amsClearanceApi = createApi({
  reducerPath: "amsClearance",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET EMPLOYEE ASSIGNMENTS FOR CLEARANCE
    getEmployeeAssignments: builder.query<
      PaginatedResult<EmployeeAssignment>,
      ClearanceParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.GET_CLEARANCE_ASSIGNMENTS,
        method: "GET",
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 10,
          SortOrder: params.sortOrder || false,
          ...(params.keyword && { keyword: params.keyword }),
          ...(params.employeeId && { employeeId: params.employeeId }),
          ...(params.assetCategoryId && {
            assetCategoryId: params.assetCategoryId,
          }),
          ...(params.isCurrent !== undefined && {
            isCurrent: params.isCurrent,
          }),
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<EmployeeAssignment>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: ClearanceParams, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch employee assignments");
        }
      },
      providesTags: (result: PaginatedResult<EmployeeAssignment> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "EMPLOYEE_ASSIGNMENTS" },
              ...result.items.map(({ employeeId }) => ({
                type: TAG_TYPES.Dashboard,
                id: `EMPLOYEE_ASSIGNMENT_${employeeId}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "EMPLOYEE_ASSIGNMENTS" }],
    }),
  }),
});

export const {
  useGetEmployeeAssignmentsQuery,
  useLazyGetEmployeeAssignmentsQuery,
} = amsClearanceApi;
