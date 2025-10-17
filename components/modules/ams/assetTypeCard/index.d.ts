import { AssetCategory } from "../../../../store/api/modules/ams/amsTypes";

export interface AssetTypeCardProps {
  assetCategory: AssetCategory;
  onPress?: (assetCategory: AssetCategory) => void;
  onEdit?: (assetCategory: AssetCategory) => void;
  onDelete?: (assetCategory: AssetCategory) => void;
}
