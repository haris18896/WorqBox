import { BottomBarTab } from "@/types";

export const AMSBottomTabs: BottomBarTab[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "grid",
    activeIcon: "grid",
    disabled: false,
  },
  {
    id: "purchaseOrder",
    label: "Orders",
    icon: "shopping-cart",
    activeIcon: "shopping-cart",
    disabled: false,
  },
  {
    id: "AssetsManagement/assets",
    label: "Assets",
    icon: "box",
    activeIcon: "box",
    disabled: false,
  },
  {
    id: "AssetsManagement/assetTypes",
    label: "Types",
    icon: "list",
    activeIcon: "list",
    disabled: false,
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: "clipboard",
    activeIcon: "clipboard",
    disabled: false,
  },
  {
    id: "clearance",
    label: "Clearance",
    icon: "check-circle",
    activeIcon: "check-circle",
    disabled: false,
  },
];
