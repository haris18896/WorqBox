import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../../../utils/api";
import {
  BaseApiResponse,
  PaginatedResult,
  PaginationParams,
} from "../../../types/api";

// PMS API Types
export interface PMSTask {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "completed" | "cancelled";
  dueDate?: string;
  assignedTo: string;
  assignedBy: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId?: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  status: "active" | "completed" | "on_hold" | "cancelled";
  isActive: boolean;
}

export interface CalendarTask {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  type: "task" | "meeting" | "event";
  priority: "low" | "medium" | "high";
  status: "scheduled" | "completed" | "cancelled";
  projectId?: string;
  projectName?: string;
}

export interface ProjectCredential {
  id: string;
  projectId: string;
  projectName: string;
  credentialType: string;
  credentialValue: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Query Parameters
export interface GetMyTasksParams extends PaginationParams {
  lateTodayUpcomming?: string;
  sortBy?: string;
  name?: string;
}

export interface GetMyCalendarTasksParams {
  startDate: string;
  endDate: string;
  dateField?: string;
}

export interface GetProjectCredentialsParams extends PaginationParams {
  projectId?: string;
}

export const pmsApi = createApi({
  reducerPath: "pmsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TAG_TYPES.Tasks,
    TAG_TYPES.CalendarTasks,
    "Projects",
    "ProjectCredentials",
  ] as const,
  endpoints: (builder) => ({
    // GET MY TASKS
    getMyTasks: builder.query<PaginatedResult<PMSTask>, GetMyTasksParams>({
      query: (params: GetMyTasksParams) => {
        const searchParams = new URLSearchParams();

        if (params.lateTodayUpcomming) {
          searchParams.append("lateTodayUpcomming", params.lateTodayUpcomming);
        }
        if (params.sortBy) {
          searchParams.append("sortBy", params.sortBy);
        }
        if (params.sortOrder !== undefined) {
          searchParams.append("sortOrder", params.sortOrder.toString());
        }
        if (params.pageNumber) {
          searchParams.append("pageNumber", params.pageNumber.toString());
        }
        if (params.name) {
          searchParams.append("name", params.name);
        }
        if (params.pageSize) {
          searchParams.append("pageSize", params.pageSize.toString());
        }

        return {
          url: `/Dashboard/GetMyTasks?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<PMSTask>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: GetMyTasksParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch PMS tasks");
        }
      },
      providesTags: (result: PaginatedResult<PMSTask> | undefined) => {
        // Defensive check to ensure result has items array
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: PMSTask) => ({
              type: TAG_TYPES.Tasks,
              id,
            })),
            { type: TAG_TYPES.Tasks, id: "LIST" },
          ];
        }
        return [{ type: TAG_TYPES.Tasks, id: "LIST" }];
      },
    }),

    // GET PROJECTS LOOKUP
    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/Lookup/GetProjects",
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<Project[]>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch projects");
        }
      },
      providesTags: (result: Project[] | undefined) => {
        // Defensive check to ensure result is an array
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }: Project) => ({
              type: "Projects" as const,
              id,
            })),
            { type: "Projects" as const, id: "LIST" },
          ];
        }
        return [{ type: "Projects" as const, id: "LIST" }];
      },
    }),

    // GET MY CALENDAR TASKS
    getMyCalendarTasks: builder.query<
      PaginatedResult<CalendarTask>,
      GetMyCalendarTasksParams
    >({
      query: (params: GetMyCalendarTasksParams) => {
        const searchParams = new URLSearchParams();
        searchParams.append("startDate", params.startDate);
        searchParams.append("endDate", params.endDate);
        if (params.dateField) {
          searchParams.append("dateField", params.dateField);
        }

        return {
          url: `/Dashboard/GetMyCalenderTasks?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<CalendarTask>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: GetMyCalendarTasksParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch calendar tasks");
        }
      },
      providesTags: (result: PaginatedResult<CalendarTask> | undefined) => {
        // Defensive check to ensure result has items array
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: CalendarTask) => ({
              type: TAG_TYPES.CalendarTasks,
              id,
            })),
            { type: TAG_TYPES.CalendarTasks, id: "LIST" },
          ];
        }
        return [{ type: TAG_TYPES.CalendarTasks, id: "LIST" }];
      },
    }),

    // GET PROJECT CREDENTIALS
    getProjectCredentials: builder.query<
      PaginatedResult<ProjectCredential>,
      GetProjectCredentialsParams
    >({
      query: (params: GetProjectCredentialsParams) => {
        const searchParams = new URLSearchParams();

        if (params.sortOrder !== undefined) {
          searchParams.append("SortOrder", params.sortOrder.toString());
        }
        if (params.pageNumber) {
          searchParams.append("PageNumber", params.pageNumber.toString());
        }
        if (params.pageSize) {
          searchParams.append("PageSize", params.pageSize.toString());
        }
        if (params.projectId) {
          searchParams.append("ProjectId", params.projectId);
        }

        return {
          url: `/ProjectCredential/GetProjectCredentials?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<ProjectCredential>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: GetProjectCredentialsParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch project credentials");
        }
      },
      providesTags: (
        result: PaginatedResult<ProjectCredential> | undefined
      ) => {
        // Defensive check to ensure result has items array
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: ProjectCredential) => ({
              type: "ProjectCredentials" as const,
              id,
            })),
            { type: "ProjectCredentials" as const, id: "LIST" },
          ];
        }
        return [{ type: "ProjectCredentials" as const, id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useLazyGetMyTasksQuery,
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useGetMyCalendarTasksQuery,
  useLazyGetMyCalendarTasksQuery,
  useGetProjectCredentialsQuery,
  useLazyGetProjectCredentialsQuery,
} = pmsApi;
