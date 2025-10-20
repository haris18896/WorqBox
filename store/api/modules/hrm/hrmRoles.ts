import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  handleApiError,
  TAG_TYPES,
  transformResponse,
} from "../../../../utils/api";
import { BaseApiResponse, PaginatedResult } from "../../../types/api";
import {
  GetRoleListingParams,
  RoleListingItem,
  SystemModuleGroup,
} from "./hrmTypes";

export const hrmRolesApi = createApi({
  reducerPath: "hrmRolesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Employees] as const,
  endpoints: (builder) => ({
    // GET ROLE LISTING (with optional filters and pagination)
    getRoleListing: builder.query<
      PaginatedResult<RoleListingItem>,
      GetRoleListingParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params && params.id !== undefined) {
          searchParams.append("id", String(params.id));
        }
        if (params && params.sortBy) {
          searchParams.append("SortBy", params.sortBy);
        }
        if (params && params.sortOrder !== undefined) {
          searchParams.append("SortOrder", String(params.sortOrder));
        }
        if (params && params.pageNumber !== undefined) {
          searchParams.append("PageNumber", String(params.pageNumber));
        }
        if (params && params.pageSize !== undefined) {
          searchParams.append("PageSize", String(params.pageSize));
        }

        const queryString = searchParams.toString();
        return {
          url: `/RoleToPagePermission/GetRoleListing${
            queryString ? `?${queryString}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<RoleListingItem>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: GetRoleListingParams | void,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch role listing");
        }
      },
      providesTags: (result: PaginatedResult<RoleListingItem> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Employees, id: "ROLES_LIST" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Employees as typeof TAG_TYPES.Employees,
                id: `ROLE_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Employees, id: "ROLES_LIST" }],
    }),

    // GET ALL SYSTEM MODULE PAGES
    getAllSystemModulePages: builder.query<SystemModuleGroup[], void>({
      query: () => ({
        url: "/SystemModulePage/GetAllSystemModulePages",
        method: "GET",
      }),
      transformResponse: (
        response: BaseApiResponse<{
          items: SystemModuleGroup[];
          paginationInfo: any;
        }>
      ) => {
        return transformResponse(response).items;
      },
      onQueryStarted: async (arg: void, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch system module pages");
        }
      },
      providesTags: [{ type: TAG_TYPES.Employees, id: "SYSTEM_MODULE_PAGES" }],
    }),
  }),
});

export const {
  useGetRoleListingQuery,
  useLazyGetRoleListingQuery,
  useGetAllSystemModulePagesQuery,
  useLazyGetAllSystemModulePagesQuery,
} = hrmRolesApi;
