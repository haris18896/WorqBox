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
  AssetCreateUpdateResponse,
  AssetParams,
  AssetRequest,
  AssetTypesCategory,
  AssignAssetRequest,
  AssignAssetResponse,
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

    // VALIDATE SERIAL NUMBER
    validateSerialNumber: builder.query<boolean, string>({
      query: (serialNumber) => ({
        url: API_ENDPOINTS.VALIDATE_SERIAL,
        method: "GET",
        params: { serialNumber },
      }),
      transformResponse: (response: BaseApiResponse<boolean>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: string, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // Silent error handling for validation
        }
      },
    }),

    // GET ASSET BY ID
    getAssetById: builder.query<Asset, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.GET_ASSET_BY_ID}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<Asset>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch asset details");
        }
      },
      providesTags: (result: Asset | undefined, error, id) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: `ASSET_${id}` }]
          : [{ type: TAG_TYPES.Dashboard, id: `ASSET_${id}` }],
    }),

    // CREATE/UPDATE ASSET
    createUpdateAsset: builder.mutation<
      AssetCreateUpdateResponse,
      { data: AssetRequest; isUpdate?: boolean }
    >({
      query: ({ data, isUpdate }) => {
        // Format data as FormData
        const formData = new FormData();

        if (data.id) {
          formData.append("id", data.id.toString());
        }
        formData.append("name", data.name);
        formData.append("serialNumber", data.serialNumber);
        formData.append("shortDescription", data.shortDescription);
        formData.append("purchaseData", data.purchaseData);
        formData.append("purchaseCost", data.purchaseCost.toString());
        formData.append("assetCategoryId", data.assetCategoryId.toString());
        formData.append("purchaseOrderId", data.purchaseOrderId.toString());

        return {
          url: isUpdate
            ? `${API_ENDPOINTS.CREATE_UPDATE_ASSET}/${data.id}`
            : API_ENDPOINTS.CREATE_UPDATE_ASSET,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (
        response: BaseApiResponse<AssetCreateUpdateResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: { data: AssetRequest; isUpdate?: boolean },
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to save asset");
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Dashboard, id: "ASSETS" },
        ...(arg.data.id
          ? [{ type: TAG_TYPES.Dashboard, id: `ASSET_${arg.data.id}` }]
          : []),
      ],
    }),

    // ASSIGN ASSET
    assignAsset: builder.mutation<
      AssignAssetResponse,
      { assetId: number; data: AssignAssetRequest }
    >({
      query: ({ assetId, data }) => ({
        url: `${API_ENDPOINTS.ASSIGN_ASSET}/${assetId}/assign`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseApiResponse<AssignAssetResponse>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: { assetId: number; data: AssignAssetRequest },
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to assign asset");
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Dashboard, id: "ASSETS" },
        { type: TAG_TYPES.Dashboard, id: `ASSET_${arg.assetId}` },
      ],
    }),

    // UNASSIGN ASSET
    unassignAsset: builder.mutation<AssignAssetResponse, number>({
      query: (assetId) => ({
        url: `${API_ENDPOINTS.ASSIGN_ASSET}/${assetId}/unassign`,
        method: "POST",
      }),
      transformResponse: (response: BaseApiResponse<AssignAssetResponse>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to unassign asset");
        }
      },
      invalidatesTags: (result, error, assetId) => [
        { type: TAG_TYPES.Dashboard, id: "ASSETS" },
        { type: TAG_TYPES.Dashboard, id: `ASSET_${assetId}` },
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
  useValidateSerialNumberQuery,
  useLazyValidateSerialNumberQuery,
  useGetAssetByIdQuery,
  useLazyGetAssetByIdQuery,
  useCreateUpdateAssetMutation,
  useAssignAssetMutation,
  useUnassignAssetMutation,
} = amsManagementApi;
