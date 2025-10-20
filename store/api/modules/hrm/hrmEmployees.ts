import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../../../utils/api";
import {
  EmployeeQueryParams,
  GetEmployeesResponse,
  HrmEmployee,
} from "./hrmTypes";

export const hrmEmployeesApi = createApi({
  reducerPath: "hrmEmployeesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Employees] as const,
  endpoints: (builder) => ({
    // GET EMPLOYEES
    getEmployees: builder.query<
      { items: HrmEmployee[]; paginationInfo: any },
      EmployeeQueryParams
    >({
      query: (params: EmployeeQueryParams) => {
        const searchParams = new URLSearchParams();

        if (params.pageNumber) {
          searchParams.append("pageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("pageSize", params.pageSize.toString());
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("sortOrder", params.sortOrder.toString());
        }
        if (params.role) {
          searchParams.append("role", params.role);
        }
        if (params.status) {
          searchParams.append("status", params.status);
        }
        if (params.keyword) {
          searchParams.append("keyword", params.keyword);
        }
        if (params.sortBy) {
          searchParams.append("sortBy", params.sortBy);
        }

        return {
          url: `/Employee/GetEmployees?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: GetEmployeesResponse) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: EmployeeQueryParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch employees");
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }: HrmEmployee) => ({
                type: TAG_TYPES.Employees,
                id,
              })),
              { type: TAG_TYPES.Employees, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.Employees, id: "LIST" }],
    }),
  }),
});

export const { useGetEmployeesQuery, useLazyGetEmployeesQuery } =
  hrmEmployeesApi;
