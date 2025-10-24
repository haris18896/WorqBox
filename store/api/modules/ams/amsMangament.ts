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
import {
  Asset,
  AssetCategoryCreateUpdateResponse,
  AssetCategoryDeleteResponse,
  AssetCategoryParams,
  AssetCategoryRequest,
  AssetParams,
  AssetTypesCategory,
} from "./amsTypes";

export const amsManagementApi = createApi({
  reducerPath: "amsManagement",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET ASSET CATEGORIES
    getAssetCategories: builder.query<
      PaginatedResult<AssetTypesCategory>,
      AssetCategoryParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.GET_ASSET_CATEGORIES,
        method: "GET",
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 10,
          SortOrder: params.sortOrder || false,
          ...(params.keyword && { keyword: params.keyword }),
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<AssetTypesCategory>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: AssetCategoryParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch asset categories");
        }
      },
      providesTags: (result: PaginatedResult<AssetTypesCategory> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "ASSET_CATEGORIES" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Dashboard,
                id: `ASSET_CATEGORY_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "ASSET_CATEGORIES" }],
    }),

    // GET ASSETS
    getAssets: builder.query<PaginatedResult<Asset>, AssetParams>({
      query: (params) => ({
        url: API_ENDPOINTS.GET_ASSETS,
        method: "GET",
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 10,
          SortOrder: params.sortOrder || false,
          ...(params.keyword && { keyword: params.keyword }),
          ...(params.assetCategoryId && {
            assetCategoryId: params.assetCategoryId,
          }),
          ...(params.assignedEmployeeId && {
            assignedEmployeeId: params.assignedEmployeeId,
          }),
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<Asset>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: AssetParams, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch assets");
        }
      },
      providesTags: (result: PaginatedResult<Asset> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "ASSETS" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Dashboard,
                id: `ASSET_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "ASSETS" }],
    }),

    // GET ASSET CATEGORY BY ID
    getAssetCategoryById: builder.query<AssetTypesCategory, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.GET_ASSET_CATEGORIES}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<AssetTypesCategory>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch asset category details");
        }
      },
      providesTags: (result: AssetTypesCategory | undefined, error, id) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: `ASSET_CATEGORY_${id}` }]
          : [{ type: TAG_TYPES.Dashboard, id: `ASSET_CATEGORY_${id}` }],
    }),

    // CREATE/UPDATE ASSET CATEGORY
    createUpdateAssetCategory: builder.mutation<
      AssetCategoryCreateUpdateResponse,
      AssetCategoryRequest
    >({
      query: (categoryData) => {
        const url = categoryData.id
          ? `${API_ENDPOINTS.GET_ASSET_CATEGORIES}/${categoryData.id}`
          : API_ENDPOINTS.GET_ASSET_CATEGORIES;

        return {
          url,
          method: categoryData.id ? "PUT" : "POST",
          body: categoryData,
        };
      },
      transformResponse: (
        response: BaseApiResponse<AssetCategoryCreateUpdateResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: AssetCategoryRequest,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to save asset category");
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Dashboard, id: "ASSET_CATEGORIES" },
        ...(arg.id
          ? [{ type: TAG_TYPES.Dashboard, id: `ASSET_CATEGORY_${arg.id}` }]
          : []),
      ],
    }),

    // DELETE ASSET CATEGORY
    deleteAssetCategory: builder.mutation<AssetCategoryDeleteResponse, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.GET_ASSET_CATEGORIES}/${id}`,
        method: "DELETE",
      }),
      transformResponse: (
        response: BaseApiResponse<AssetCategoryDeleteResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to delete asset category");
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: TAG_TYPES.Dashboard, id: "ASSET_CATEGORIES" },
        { type: TAG_TYPES.Dashboard, id: `ASSET_CATEGORY_${id}` },
      ],
    }),
  }),
});

export const {
  useGetAssetCategoriesQuery,
  useLazyGetAssetCategoriesQuery,
  useGetAssetsQuery,
  useLazyGetAssetsQuery,
  useGetAssetCategoryByIdQuery,
  useLazyGetAssetCategoryByIdQuery,
  useCreateUpdateAssetCategoryMutation,
  useDeleteAssetCategoryMutation,
} = amsManagementApi;
