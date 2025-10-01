import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../utils/api";
import {
  API_ENDPOINTS,
  BaseApiResponse,
  CalendarTask,
  DashboardData,
  TaskItem,
} from "../types/api";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard, TAG_TYPES.Tasks, TAG_TYPES.CalendarTasks],
  endpoints: (builder) => ({
    // GET MY DASHBOARD
    getMyDashboard: builder.query<DashboardData, void>({
      query: () => ({
        url: API_ENDPOINTS.MY_DASHBOARD,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<DashboardData>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch dashboard data");
        }
      },
      providesTags: [{ type: TAG_TYPES.Dashboard, id: "OVERVIEW" }],
    }),

    // GET MY TASKS
    getMyTasks: builder.query<TaskItem[], void>({
      query: () => ({
        url: API_ENDPOINTS.MY_TASKS,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<TaskItem[]>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch tasks");
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TAG_TYPES.Tasks, id })),
              { type: TAG_TYPES.Tasks, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.Tasks, id: "LIST" }],
    }),

    // GET MY CALENDAR TASKS
    getMyCalendarTasks: builder.query<CalendarTask[], void>({
      query: () => ({
        url: API_ENDPOINTS.MY_CALENDAR_TASKS,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<CalendarTask[]>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch calendar tasks");
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: TAG_TYPES.CalendarTasks,
                id,
              })),
              { type: TAG_TYPES.CalendarTasks, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.CalendarTasks, id: "LIST" }],
    }),

    // UPDATE TASK STATUS
    updateTaskStatus: builder.mutation<
      TaskItem,
      { taskId: string; status: TaskItem["status"] }
    >({
      query: ({ taskId, status }) => ({
        url: `/Tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: BaseApiResponse<TaskItem>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to update task status");
        }
      },
      invalidatesTags: (result, error, { taskId }) => [
        { type: TAG_TYPES.Tasks, id: taskId },
        { type: TAG_TYPES.Tasks, id: "LIST" },
        { type: TAG_TYPES.Dashboard, id: "OVERVIEW" },
      ],
    }),

    // MARK TASK COMPLETE
    completeTask: builder.mutation<TaskItem, string>({
      query: (taskId) => ({
        url: `/Tasks/${taskId}/complete`,
        method: "POST",
      }),
      transformResponse: (response: BaseApiResponse<TaskItem>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to complete task");
        }
      },
      invalidatesTags: (result, error, taskId) => [
        { type: TAG_TYPES.Tasks, id: taskId },
        { type: TAG_TYPES.Tasks, id: "LIST" },
        { type: TAG_TYPES.Dashboard, id: "OVERVIEW" },
      ],
    }),
  }),
});

export const {
  useGetMyDashboardQuery,
  useLazyGetMyDashboardQuery,
  useGetMyTasksQuery,
  useLazyGetMyTasksQuery,
  useGetMyCalendarTasksQuery,
  useLazyGetMyCalendarTasksQuery,
  useUpdateTaskStatusMutation,
  useCompleteTaskMutation,
} = dashboardApi;
