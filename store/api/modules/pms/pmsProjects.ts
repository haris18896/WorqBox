import {
  API_ENDPOINTS,
  BaseApiResponse,
  PaginatedResult,
  PaginationParams,
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
  ClientProject,
  CreateClientProjectRequest,
  CreateClientProjectResponse,
  CreateUpdateProjectRequest,
  CreateUpdateProjectResponse,
  Project,
  ProjectDetailsResponse,
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

    // GET PROJECT DETAILS
    getProjectDetails: builder.query<ProjectDetailsResponse, number>({
      query: (projectId: number) => ({
        url: `${API_ENDPOINTS.GET_PROJECT_DETAILS}/?ProjectId=${projectId}`,
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<ProjectDetailsResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch project details");
        }
      },
      providesTags: (result: ProjectDetailsResponse | undefined) =>
        result ? [{ type: TAG_TYPES.MainProjects, id: result.id }] : [],
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
      query: (clientData: CreateClientProjectRequest) => {
        const requestBody = {
          ...clientData,
          id: clientData.id || undefined,
        };

        return {
          url: API_ENDPOINTS.CREATE_UPDATE_CLIENT_PROJECT,
          method: "POST",
          body: requestBody,
        };
      },
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
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiSuccess(
            isUpdate
              ? "Client updated successfully"
              : "Client created successfully"
          );
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : `Failed to ${isUpdate ? "update" : "create"} client project`
          );
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.ClientProjects, id: "LIST" }],
    }),

    // DELETE CLIENT PROJECT
    deleteProjectClient: builder.mutation<boolean, number>({
      query: (clientId: number) => ({
        url: `${API_ENDPOINTS.DELETE_PROJECT_CLIENT}?id=${clientId}`,
        method: "POST",
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Client deleted successfully");
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : "Failed to delete client project"
          );
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.ClientProjects, id: "LIST" }],
    }),

    // CREATE/UPDATE PROJECT
    createUpdateProject: builder.mutation<
      CreateUpdateProjectResponse,
      CreateUpdateProjectRequest
    >({
      query: (projectData: CreateUpdateProjectRequest) => {
        const formData = new FormData();

        if (projectData.id !== null && projectData.id !== undefined) {
          formData.append("id", projectData.id.toString());
        }
        formData.append("name", projectData.name);
        formData.append("description", projectData.description);
        formData.append("startDate", projectData.startDate);
        formData.append("endDate", projectData.endDate);
        formData.append("leadId", projectData.leadId.toString());
        formData.append("ownerId", projectData.ownerId.toString());

        if (
          projectData.businessAnalystId !== null &&
          projectData.businessAnalystId !== undefined
        ) {
          formData.append(
            "businessAnalystId",
            projectData.businessAnalystId.toString()
          );
        }

        formData.append(
          "projectClientId",
          projectData.projectClientId.toString()
        );

        projectData.projectMemberIds.forEach((memberId, index) => {
          formData.append(`projectMemberIds[${index}]`, memberId.toString());
        });

        if (projectData.file) {
          formData.append("file", {
            uri: projectData.file.uri,
            type: projectData.file.mimeType || "image/jpeg",
            name:
              projectData.file.fileName || `project_image_${Date.now()}.jpg`,
          } as any);
        }

        return {
          url: API_ENDPOINTS.CREATE_UPDATE_PROJECT,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      transformResponse: (
        response: BaseApiResponse<CreateUpdateProjectResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: CreateUpdateProjectRequest,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiSuccess(
            isUpdate
              ? "Project updated successfully"
              : "Project created successfully"
          );
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          const isUpdate = arg.id !== null && arg.id !== undefined;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : `Failed to ${isUpdate ? "update" : "create"} project`
          );
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.MainProjects, id: "LIST" }],
    }),

    // DELETE PROJECT
    deleteProject: builder.mutation<boolean, number>({
      query: (projectId: number) => ({
        url: API_ENDPOINTS.DELETE_PROJECT,
        method: "POST",
        body: { id: projectId },
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
          handleApiSuccess("Project deleted successfully");
        } catch (error: any) {
          const serverErrorMessage = error?.error?.data?.message;
          handleApiError(
            error,
            serverErrorMessage
              ? `${serverErrorMessage}`
              : "Failed to delete project"
          );
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.MainProjects, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMainProjectsQuery,
  useLazyGetMainProjectsQuery,
  useGetProjectDetailsQuery,
  useLazyGetProjectDetailsQuery,
  useGetClientProjectsQuery,
  useLazyGetClientProjectsQuery,
  useCreateClientProjectMutation,
  useDeleteProjectClientMutation,
  useCreateUpdateProjectMutation,
  useDeleteProjectMutation,
} = pmsProjectsApi;
