import { Vendor } from "../../../../store/api/modules/ams/amsTypes";

export interface VendorCardProps {
  vendor: Vendor;
  onPress?: (vendor: Vendor) => void;
}
