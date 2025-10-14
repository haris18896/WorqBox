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
import { ClientProject, Project } from "./pmsTypes";

export const pmsProjectsApi = createApi({
  reducerPath: "pmsProjects",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TAG_TYPES.MainProjects,
    TAG_TYPES.ClientProjects,
    TAG_TYPES.Reports,
  ] as const,
  endpoints: (builder) => ({
    // GET MAIN PROJECTS
    getMainProjects: builder.query<PaginatedResult<Project>, void>({
      query: () => ({
        url: API_ENDPOINTS.GET_MAIN_PROJECTS,
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<Project>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch projects");
        }
      },
      providesTags: (result: PaginatedResult<Project> | undefined) =>
        result
          ? [
              ...result.items.map(({ id }: Project) => ({
                type: TAG_TYPES.MainProjects,
                id,
              })),
              { type: TAG_TYPES.MainProjects, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.MainProjects, id: "LIST" }],
    }),

    // GET CLIENT PROJECTS
    getClientProjects: builder.query<ClientProject[], void>({
      query: () => ({
        url: API_ENDPOINTS.GET_CLIENT_PROJECTS,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<ClientProject[]>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch client projects");
        }
      },
      providesTags: (result: ClientProject[] | undefined) =>
        result
          ? [
              ...result.map(({ id }: ClientProject) => ({
                type: TAG_TYPES.ClientProjects,
                id,
              })),
              { type: TAG_TYPES.ClientProjects, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.ClientProjects, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMainProjectsQuery,
  useLazyGetMainProjectsQuery,
  useGetClientProjectsQuery,
  useLazyGetClientProjectsQuery,
} = pmsProjectsApi;
