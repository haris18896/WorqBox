import { BottomBarTab } from "@/types";

export const PMSBottomTabs: BottomBarTab[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "grid",
    activeIcon: "grid",
    disabled: false,
  },
  {
    id: "projects/main",
    label: "Projects",
    icon: "file",
    activeIcon: "file",
    disabled: false,
  },
  {
    id: "projects/client",
    label: "Clients",
    icon: "users",
    activeIcon: "users",
    disabled: false,
  },
  {
    id: "reports",
    label: "Reports",
    icon: "bar-chart",
    activeIcon: "bar-chart",
    disabled: false,
  },
];
