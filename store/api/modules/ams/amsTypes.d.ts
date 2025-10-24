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

export interface VendorRequest {
  id?: number;
  name: string;
  contactPerson?: string;
  contactEmail?: string;
  contactphone1?: string;
  contactphone2?: string;
  vendorAddress?: string;
}

export interface VendorCreateUpdateResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: {
    id: number;
  };
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

// Clearance Types
export interface AssignedAsset {
  id: number;
  assetId: number;
  assetName: string;
  assetSerialNumber: string;
  remarks?: string;
  assetCategoryName: string;
  isCurrent: boolean;
  assignedDate: string;
}

export interface EmployeeAssignment {
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  employeeNumber: string;
  assignedAssets: AssignedAsset[];
  totalAssetsCount: number;
  currentAssetsCount: number;
}

export interface ClearanceParams extends PaginationParams {
  keyword?: string;
  employeeId?: number;
  assetCategoryId?: number;
  hasCurrentAssets?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: boolean;
}

export interface ClearanceResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: PaginatedResult<EmployeeAssignment>;
}

// Asset Category Types
export interface AssetTypesCategory {
  id: number;
  name: string;
}

export interface AssetCategoryRequest {
  id?: number;
  name: string;
}

export interface AssetCategoryCreateUpdateResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: {
    id: number;
  };
}

export interface AssetCategoryDeleteResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: boolean;
}

export interface AssetCategoryParams extends PaginationParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: boolean;
}

export interface AssetCategoryResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: PaginatedResult<AssetCategory>;
}

// Asset Types
export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  shortDescription: string;
  purchaseData: string;
  purchaseCost: number;
  assetCategoryId: number;
  assetCategory: {
    id: number;
    name: string;
  };
  assignedEmployee: {
    id: number;
    employeeNumber: string;
    profilePictureUrl?: string;
    fullName: string;
  } | null;
  purchaseOrder: any | null;
}

export interface AssetParams extends PaginationParams {
  keyword?: string;
  assetCategoryId?: number;
  assignedEmployeeId?: number;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: boolean;
}

export interface AssetResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: PaginatedResult<Asset>;
}
