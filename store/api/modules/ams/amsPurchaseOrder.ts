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
  PurchaseOrder,
  PurchaseOrderParams,
  Vendor,
  VendorCreateUpdateResponse,
  VendorParams,
  VendorRequest,
} from "./amsTypes";

export const amsPurchaseOrderApi = createApi({
  reducerPath: "amsPurchaseOrder",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.Dashboard] as const,
  endpoints: (builder) => ({
    // GET PURCHASE ORDERS
    getPurchaseOrders: builder.query<
      PaginatedResult<PurchaseOrder>,
      PurchaseOrderParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.GET_PURCHASE_ORDERS,
        method: "GET",
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 10,
          SortOrder: params.sortOrder || false,
          ...(params.keyword && { keyword: params.keyword }),
          ...(params.vendorId && { vendorId: params.vendorId }),
          ...(params.fromDate && { fromDate: params.fromDate }),
          ...(params.toDate && { toDate: params.toDate }),
          ...(params.minAmount && { minAmount: params.minAmount }),
          ...(params.maxAmount && { maxAmount: params.maxAmount }),
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<PurchaseOrder>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (
        arg: PurchaseOrderParams,
        { queryFulfilled }: any
      ) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch purchase orders");
        }
      },
      providesTags: (result: PaginatedResult<PurchaseOrder> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "PURCHASE_ORDERS" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Dashboard,
                id: `PURCHASE_ORDER_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "PURCHASE_ORDERS" }],
    }),

    // GET VENDORS
    getVendors: builder.query<PaginatedResult<Vendor>, VendorParams>({
      query: (params) => ({
        url: API_ENDPOINTS.GET_VENDORS,
        method: "GET",
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 1000,
          ...(params.keyword && { keyword: params.keyword }),
        },
      }),
      transformResponse: (
        response: BaseApiResponse<PaginatedResult<Vendor>>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: VendorParams, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch vendors");
        }
      },
      providesTags: (result: PaginatedResult<Vendor> | undefined) =>
        result
          ? [
              { type: TAG_TYPES.Dashboard, id: "VENDORS" },
              ...result.items.map(({ id }) => ({
                type: TAG_TYPES.Dashboard,
                id: `VENDOR_${id}`,
              })),
            ]
          : [{ type: TAG_TYPES.Dashboard, id: "VENDORS" }],
    }),

    // GET VENDOR BY ID
    getVendorById: builder.query<Vendor, number>({
      query: (id) => ({
        url: API_ENDPOINTS.GET_VENDOR_BY_ID,
        method: "GET",
        params: { id },
      }),
      transformResponse: (response: BaseApiResponse<Vendor>) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: number, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to fetch vendor details");
        }
      },
      providesTags: (result: Vendor | undefined, error, id) =>
        result
          ? [{ type: TAG_TYPES.Dashboard, id: `VENDOR_${id}` }]
          : [{ type: TAG_TYPES.Dashboard, id: `VENDOR_${id}` }],
    }),

    // CREATE/UPDATE VENDOR
    createUpdateVendor: builder.mutation<
      VendorCreateUpdateResponse,
      VendorRequest
    >({
      query: (vendorData) => ({
        url: API_ENDPOINTS.CREATE_UPDATE_VENDOR,
        method: "POST",
        body: vendorData,
      }),
      transformResponse: (
        response: BaseApiResponse<VendorCreateUpdateResponse>
      ) => {
        return transformResponse(response);
      },
      onQueryStarted: async (arg: VendorRequest, { queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {
          handleApiError(error, "Failed to save vendor");
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Dashboard, id: "VENDORS" },
        ...(arg.id
          ? [{ type: TAG_TYPES.Dashboard, id: `VENDOR_${arg.id}` }]
          : []),
      ],
    }),
  }),
});

export const {
  useGetPurchaseOrdersQuery,
  useLazyGetPurchaseOrdersQuery,
  useGetVendorsQuery,
  useLazyGetVendorsQuery,
  useGetVendorByIdQuery,
  useLazyGetVendorByIdQuery,
  useCreateUpdateVendorMutation,
} = amsPurchaseOrderApi;
