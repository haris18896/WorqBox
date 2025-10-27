import { BottomBarTab } from "@/types";

export const HRMBottomTabs: BottomBarTab[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "grid",
    activeIcon: "grid",
    disabled: false,
  },
  {
    id: "employees",
    label: "Employees",
    icon: "users",
    activeIcon: "users",
    disabled: false,
  },
  {
    id: "recruitment",
    label: "Recruitment",
    icon: "user-plus",
    activeIcon: "user-plus",
    disabled: false,
  },
  {
    id: "resumeBank",
    label: "Resume Bank",
    icon: "file-text",
    activeIcon: "file-text",
    disabled: false,
  },
  // {
  //   id: "configurations/roles",
  //   label: "Settings",
  //   icon: "settings",
  //   activeIcon: "settings",
  //   disabled: false,
  // },
];
