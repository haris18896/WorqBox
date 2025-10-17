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
  isCurrent?: boolean;
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
