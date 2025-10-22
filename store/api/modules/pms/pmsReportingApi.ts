import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../../../utils/api";
import {
  API_ENDPOINTS,
  BaseApiResponse,
  PaginatedResult,
} from "../../../types/api";
import {
  EmployeeObject,
  ReportingStats,
  TimeLog,
  TimeLogParams,
} from "./pmsTypes";

export const pmsReportingApi = createApi({
  reducerPath: "pmsReportingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TAG_TYPES.Employees,
    TAG_TYPES.Reports,
    TAG_TYPES.TimeLogs,
  ] as const,
  endpoints: (builder) => ({
    // GET EMPLOYEES
    getEmployees: builder.query<PaginatedResult<EmployeeObject>, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_EMPLOYEES_LOOKUP,
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<EmployeeObject>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch employees");
        }
      },
      providesTags: (result: PaginatedResult<EmployeeObject> | undefined) =>
        result
          ? [
              ...result.items.map(({ id }: EmployeeObject) => ({
                type: TAG_TYPES.Employees,
                id,
              })),
              { type: TAG_TYPES.Employees, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.Employees, id: "LIST" }],
    }),

    // GET REPORTING STATS
    getReportingStats: builder.query<ReportingStats, TimeLogParams>({
      query: (params: TimeLogParams) => {
        const searchParams = new URLSearchParams();

        if (params.pageNumber) {
          searchParams.append("PageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("PageSize", params.pageSize.toString());
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("SortOrder", params.sortOrder.toString());
        }
        if (params.projectIds && params.projectIds.length > 0) {
          params.projectIds.forEach((id) => {
            searchParams.append("projectIds", id.toString());
          });
        }
        if (params.employeeIds && params.employeeIds.length > 0) {
          params.employeeIds.forEach((id) => {
            searchParams.append("employeeIds", id.toString());
          });
        }
        if (params.startDate) {
          searchParams.append("StartDate", params.startDate);
        }
        if (params.endDate) {
          searchParams.append("EndDate", params.endDate);
        }
        if (params.isBillable !== undefined) {
          searchParams.append("IsBillable", params.isBillable.toString());
        }

        return {
          url: `/Reporting/ReportingStats?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: BaseApiResponse<ReportingStats>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: TimeLogParams, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch reporting stats");
        }
      },
      providesTags: [{ type: TAG_TYPES.Reports, id: "STATS" }],
    }),

    // GET TIME LOGS REPORTING
    getTimeLogsReporting: builder.query<
      PaginatedResult<TimeLog>,
      TimeLogParams
    >({
      query: (params: TimeLogParams) => {
        const searchParams = new URLSearchParams();

        if (params.pageNumber) {
          searchParams.append("PageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("PageSize", params.pageSize.toString());
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("SortOrder", params.sortOrder.toString());
        }
        if (params.projectIds && params.projectIds.length > 0) {
          params.projectIds.forEach((id) => {
            searchParams.append("projectIds", id.toString());
          });
        }
        if (params.employeeIds && params.employeeIds.length > 0) {
          params.employeeIds.forEach((id) => {
            searchParams.append("employeeIds", id.toString());
          });
        }
        if (params.startDate) {
          searchParams.append("StartDate", params.startDate);
        }
        if (params.endDate) {
          searchParams.append("EndDate", params.endDate);
        }
        if (params.isBillable !== undefined) {
          searchParams.append("IsBillable", params.isBillable.toString());
        }

        return {
          url: `/Reporting/GetTimeLogsReporting?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<TimeLog>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: TimeLogParams, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch time logs");
        }
      },
      providesTags: (result: PaginatedResult<TimeLog> | undefined) =>
        result
          ? [
              ...result.items.map(({ id }: TimeLog) => ({
                type: TAG_TYPES.TimeLogs,
                id,
              })),
              { type: TAG_TYPES.TimeLogs, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.TimeLogs, id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useLazyGetEmployeesQuery,
  useGetReportingStatsQuery,
  useLazyGetReportingStatsQuery,
  useGetTimeLogsReportingQuery,
  useLazyGetTimeLogsReportingQuery,
} = pmsReportingApi;
