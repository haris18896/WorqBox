import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../../../utils/api";
import {
  DepartmentEmployeeCounts,
  EmployeeCountWithGender,
  GetEmployeeCountByDepartmentResponse,
  GetEmployeeCountWithGenderResponse,
  GetTodayPresentAbsentEmployeesResponse,
  PresentAbsentEmployee,
} from "./hrmTypes";

export const hrmDashboardApi = createApi({
  reducerPath: "hrmDashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard, TAG_TYPES.Employees] as const,
  endpoints: (builder) => ({
    // GET EMPLOYEE COUNT WITH GENDER
    getEmployeeCountWithGender: builder.query<EmployeeCountWithGender, void>({
      query: () => ({
        url: "/Dashboard/GetCountEmployeeWithGender",
        method: "GET",
      }),
      transformResponse: (response: GetEmployeeCountWithGenderResponse) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch employee count with gender");
        }
      },
      providesTags: [
        { type: TAG_TYPES.Dashboard, id: "EMPLOYEE_COUNT_GENDER" },
      ],
    }),

    // GET EMPLOYEE COUNT BY DEPARTMENT
    getEmployeeCountByDepartment: builder.query<DepartmentEmployeeCounts, void>(
      {
        query: () => ({
          url: "/Dashboard/GetEmployeeCountByDepartment",
          method: "GET",
        }),
        transformResponse: (response: GetEmployeeCountByDepartmentResponse) => {
          return transformResponse(response);
        },
        onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
          try {
            await queryFulfilled;
          } catch (error) {
            handleApiError(
              error,
              "Failed to fetch employee count by department"
            );
          }
        },
        providesTags: [
          { type: TAG_TYPES.Dashboard, id: "EMPLOYEE_COUNT_DEPARTMENT" },
        ],
      }
    ),

    // GET TODAY PRESENT ABSENT EMPLOYEES
    getTodayPresentAbsentEmployees: builder.query<
      PresentAbsentEmployee[],
      void
    >({
      query: () => ({
        url: "/Dashboard/GetTodayPresentAbsentEmployees",
        method: "GET",
      }),
      transformResponse: (response: GetTodayPresentAbsentEmployeesResponse) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch present/absent employees");
        }
      },
      providesTags: [
        { type: TAG_TYPES.Dashboard, id: "PRESENT_ABSENT_EMPLOYEES" },
      ],
    }),
  }),
});

export const {
  useGetEmployeeCountWithGenderQuery,
  useLazyGetEmployeeCountWithGenderQuery,
  useGetEmployeeCountByDepartmentQuery,
  useLazyGetEmployeeCountByDepartmentQuery,
  useGetTodayPresentAbsentEmployeesQuery,
  useLazyGetTodayPresentAbsentEmployeesQuery,
} = hrmDashboardApi;
