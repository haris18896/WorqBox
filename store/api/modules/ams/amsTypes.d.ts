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
