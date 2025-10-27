import { Asset, Employee } from "../../../../store/api/modules/ams/amsTypes";

export interface AssetCardProps {
  asset: Asset;
  employees?: Employee[];
  onPress?: (asset: Asset) => void;
  onAssign?: (asset: Asset) => void;
  onUnassign?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
}
