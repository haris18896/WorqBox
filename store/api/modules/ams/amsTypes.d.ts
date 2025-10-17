export interface AssetCategory {
  assetCategoryId: number;
  assetCategoryName: string;
  count: number;
}

export interface AmsDashboardData {
  totalAssets: number;
  unassignedAssets: number;
  categories: AssetCategory[];
}

export interface AmsDashboardResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: AmsDashboardData;
}

// Purchase Order Types
export interface Vendor {
  id: number;
  name: string;
  contactPerson?: string;
  contactEmail?: string;
  contactphone1?: string;
  contactphone2?: string;
  vendorAddress?: string;
}

export interface PurchaseOrder {
  id: number;
  name: string;
  orderDate: string;
  totalAmount: number;
  attachmentURL: string;
  vendorId: number;
  vendor: Vendor;
}

export interface PurchaseOrderParams extends PaginationParams {
  keyword?: string;
  vendorId?: number;
  fromDate?: string;
  toDate?: string;
  minAmount?: number;
  maxAmount?: number;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: boolean;
}

export interface VendorParams extends PaginationParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PurchaseOrderResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: PaginatedResult<PurchaseOrder>;
}

export interface VendorResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: PaginatedResult<Vendor>;
}
