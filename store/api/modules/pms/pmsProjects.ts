import {
  API_ENDPOINTS,
  BaseApiResponse,
  PaginatedResult,
  PaginationParams,
} from "@/store/types/api";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "@/utils/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ClientProject,
  CreateClientProjectRequest,
  CreateClientProjectResponse,
  Project,
} from "./pmsTypes";

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
    getClientProjects: builder.query<
      PaginatedResult<ClientProject>,
      PaginationParams
    >({
      query: (params: PaginationParams = {}) => {
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

        return {
          url: `${
            API_ENDPOINTS.GET_CLIENT_PROJECTS
          }?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<ClientProject>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: PaginationParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch client projects");
        }
      },
      providesTags: (result: PaginatedResult<ClientProject> | undefined) => {
        // Defensive check to ensure result has items array
        if (result && Array.isArray(result.items)) {
          return [
            ...result.items.map(({ id }: ClientProject) => ({
              type: TAG_TYPES.ClientProjects,
              id,
            })),
            { type: TAG_TYPES.ClientProjects, id: "LIST" },
          ];
        }
        return [{ type: TAG_TYPES.ClientProjects, id: "LIST" }];
      },
    }),

    // CREATE/UPDATE CLIENT PROJECT
    createClientProject: builder.mutation<
      CreateClientProjectResponse,
      CreateClientProjectRequest
    >({
      query: (clientData: CreateClientProjectRequest) => ({
        url: API_ENDPOINTS.CREATE_UPDATE_CLIENT_PROJECT,
        method: "POST",
        body: clientData,
      }),
      transformResponse: (
        response: BaseApiResponse<CreateClientProjectResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: CreateClientProjectRequest,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to create client project");
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.ClientProjects, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMainProjectsQuery,
  useLazyGetMainProjectsQuery,
  useGetClientProjectsQuery,
  useLazyGetClientProjectsQuery,
  useCreateClientProjectMutation,
} = pmsProjectsApi;
