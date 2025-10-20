import { BottomBarTab } from "@/types";

export const HRMSettingsBottomTabs: BottomBarTab[] = [
  {
    id: "configurations/roles",
    label: "Roles",
    icon: "user-check",
    activeIcon: "user-check",
    disabled: false,
  },
  {
    id: "configurations/holidays",
    label: "Calendar",
    icon: "calendar",
    activeIcon: "calendar",
    disabled: false,
  },
  {
    id: "configurations/EmployeeTier",
    label: "Tier",
    icon: "bar-chart-2",
    activeIcon: "bar-chart-2",
    disabled: false,
  },
  {
    id: "configurations/EmployeeEvaluation",
    label: "Evaluation",
    icon: "clipboard",
    activeIcon: "clipboard",
    disabled: false,
  },
  {
    id: "configurations/MedicalReimbursment",
    label: "Medical",
    icon: "heart",
    activeIcon: "heart",
    disabled: false,
  },
];
