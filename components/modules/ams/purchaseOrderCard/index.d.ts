import { PurchaseOrder } from "../../../../store/api/modules/ams/amsTypes";

export interface PurchaseOrderCardProps {
  purchaseOrder: PurchaseOrder;
  onPress?: (purchaseOrder: PurchaseOrder) => void;
}
