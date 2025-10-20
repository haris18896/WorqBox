import { BottomBarTab } from "@/types";

export const EFSBottomTabs: BottomBarTab[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "grid",
    activeIcon: "grid",
    disabled: false,
  },
  {
    id: "leave-management/leave-request",
    label: "Request",
    icon: "plus-circle",
    activeIcon: "plus-circle",
    disabled: false,
  },
  {
    id: "leave-management/approval-request",
    label: "Aprroval",
    icon: "check-circle",
    activeIcon: "check-circle",
    disabled: false,
  },
  {
    id: "salary-calculator",
    label: "Calculator",
    icon: "dollar-sign",
    activeIcon: "dollar-sign",
    disabled: false,
  },
  {
    id: "survey-forms",
    label: "Survey",
    icon: "clipboard",
    activeIcon: "clipboard",
    disabled: false,
  },
];
