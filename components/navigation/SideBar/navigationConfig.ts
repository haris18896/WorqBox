export interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  permission: string[];
  default?: string | null;
  active_list: string[];
  order: number;
  visible: boolean;
  description?: string;
  children?: NavigationItem[];
  badgeCount?: number;
}

export const navigationConfig: NavigationItem[] = [
  {
    title: "Project Management",
    href: "/pms",
    icon: "folder",
    permission: ["Superadmin", "manager"],
    default: "Dashboard",
    active_list: ["Project Management", "Dashboard"],
    order: 1,
    visible: true,
    description: "Manage all projects and related reports",
    children: [
      {
        title: "Dashboard",
        href: "/pms/Dashboard",
        icon: "grid",
        permission: ["Superadmin", "manager", "Employee"],
        active_list: ["Project Management", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Projects",
        href: "/pms/projects",
        icon: "layers",
        permission: ["Superadmin", "manager"],
        default: "Main",
        active_list: ["Project Management", "Projects"],
        order: 2,
        visible: true,
        children: [
          {
            title: "Main",
            href: "/pms/projects/main",
            icon: "file",
            permission: ["Superadmin", "manager"],
            active_list: ["Project Management", "Projects", "Main"],
            default: null,
            order: 1,
            visible: true,
          },
          {
            title: "Client",
            href: "/pms/projects/client",
            icon: "users",
            permission: ["Superadmin", "manager"],
            active_list: ["Project Management", "Projects", "Client"],
            default: null,
            order: 2,
            visible: true,
          },
        ],
      },
      {
        title: "Reports",
        href: "/pms/reports",
        icon: "bar-chart",
        permission: ["Superadmin", "manager"],
        active_list: ["Project Management", "Reports"],
        default: null,
        order: 3,
        visible: true,
      },
    ],
  },
  {
    title: "Employee Facilitation",
    href: "/efs/Dashboard",
    icon: "user-check",
    permission: ["Superadmin", "hr", "Employee"],
    default: "Dashboard",
    active_list: ["Employee Facilitation", "Dashboard"],
    order: 2,
    visible: true,
    description: "HR and Employee self-service features",
    children: [
      {
        title: "Dashboard",
        href: "/efs/Dashboard",
        icon: "grid",
        permission: ["Superadmin", "hr", "Employee"],
        active_list: ["Employee Facilitation", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Leave Management",
        href: "/efs/leave-management",
        icon: "calendar",
        permission: ["Superadmin", "hr", "Employee"],
        default: "Leave Request",
        active_list: ["Employee Facilitation", "Leave Management"],
        order: 2,
        visible: true,
        children: [
          {
            title: "Leave Request",
            href: "/efs/leave-management/leave-request",
            icon: "plus-circle",
            permission: ["Employee", "hr", "Superadmin"],
            active_list: [
              "Employee Facilitation",
              "Leave Management",
              "Leave Request",
            ],
            default: null,
            order: 1,
            visible: true,
          },
          {
            title: "Approval Request",
            href: "/efs/leave-management/approval-request",
            icon: "check-circle",
            permission: ["Superadmin", "hr"],
            active_list: [
              "Employee Facilitation",
              "Leave Management",
              "Approval Request",
            ],
            default: null,
            order: 2,
            visible: true,
            // badgeCount: 5,
          },
        ],
      },
      {
        title: "Salary Calculator",
        href: "/efs/salary-calculator",
        icon: "dollar-sign",
        permission: ["Employee", "hr", "Superadmin"],
        active_list: ["Employee Facilitation", "Salary Calculator"],
        default: null,
        order: 3,
        visible: true,
      },
      {
        title: "Survey",
        href: "/efs/survey-forms",
        icon: "clipboard",
        permission: ["Employee", "hr", "Superadmin"],
        active_list: ["Employee Facilitation", "Survey"],
        default: null,
        order: 4,
        visible: true,
      },
    ],
  },
  {
    title: "Asset Management",
    href: "/ams/Dashboard",
    icon: "box",
    permission: ["Superadmin", "manager"],
    default: "Dashboard",
    active_list: ["Asset Management", "Dashboard"],
    order: 3,
    visible: true,
    description: "Asset management features",
    children: [
      {
        title: "Dashboard",
        href: "/ams/Dashboard",
        icon: "grid",
        permission: ["Superadmin", "manager"],
        active_list: ["Asset Management", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Purchase Order",
        href: "/ams/purchaseOrder",
        icon: "shopping-cart",
        permission: ["Superadmin", "manager"],
        default: null,
        active_list: ["Asset Management", "Purchase Order"],
        order: 2,
        visible: true,
      },
      {
        title: "Assets Management",
        href: "/ams/assetsManagement",
        icon: "package",
        permission: ["Employee", "hr", "Superadmin"],
        active_list: ["Asset Management", "Assets Management"],
        default: null,
        order: 3,
        visible: true,
        children: [
          {
            title: "Assets",
            href: "/ams/AssetsManagement/assets",
            icon: "box",
            permission: ["Superadmin", "manager"],
            active_list: ["Asset Management", "Assets Management", "Assets"],
            default: null,
            order: 1,
            visible: true,
          },
          {
            title: "Asset Types",
            href: "/ams/AssetsManagement/assetTypes",
            icon: "list",
            permission: ["Superadmin", "manager"],
            active_list: [
              "Asset Management",
              "Assets Management",
              "Asset Types",
            ],
            default: null,
            order: 2,
            visible: true,
          },
        ],
      },
      {
        title: "Vendors",
        href: "/ams/vendors",
        icon: "clipboard",
        permission: ["Employee", "hr", "Superadmin"],
        active_list: ["Asset Management", "Vendors"],
        default: null,
        order: 4,
        visible: true,
      },
      {
        title: "Clearance",
        href: "/ams/clearance",
        icon: "check-circle",
        permission: ["Superadmin", "hr"],
        active_list: ["Asset Management", "Clearance"],
        default: null,
        order: 5,
        visible: true,
      },
    ],
  },
  {
    title: "Human Resource",
    href: "/hrm/Dashboard",
    icon: "users",
    permission: ["Superadmin", "manager"],
    default: "Dashboard",
    active_list: ["Human Resource", "Dashboard"],
    order: 4,
    visible: true,
    description: "Human resource features",
    children: [
      {
        title: "Dashboard",
        href: "/hrm/Dashboard",
        icon: "grid",
        permission: ["Superadmin", "manager"],
        active_list: ["Human Resource", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Employees",
        href: "/hrm/employees",
        icon: "users",
        permission: ["Superadmin", "manager"],
        active_list: ["Human Resource", "Employees"],
        default: null,
        order: 2,
        visible: true,
      },
      {
        title: "Recruitment",
        href: "/hrm/recruitment",
        icon: "user-plus",
        permission: ["Superadmin", "manager"],
        active_list: ["Human Resource", "Recruitment"],
        default: null,
        order: 3,
        visible: true,
      },
      {
        title: "Resume Bank",
        href: "/hrm/resumeBank",
        icon: "file-text",
        permission: ["Superadmin", "manager"],
        active_list: ["Human Resource", "Resume Bank"],
        default: null,
        order: 4,
        visible: true,
      },
      // {
      //   title: "Configurations",
      //   href: "/hrm/Configuration",
      //   icon: "settings",
      //   permission: ["Superadmin", "manager"],
      //   active_list: ["Human Resource", "Configurations"],
      //   default: null,
      //   order: 5,
      //   visible: true,
      //   children: [
      //     {
      //       title: "Roles",
      //       href: "/hrm/configurations/roles",
      //       icon: "user-check",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Roles"],
      //       default: null,
      //       order: 1,
      //       visible: true,
      //     },
      //     {
      //       title: "Holidays",
      //       href: "/hrm/configurations/holidays",
      //       icon: "calendar",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Holidays"],
      //       default: null,
      //       order: 2,
      //       visible: true,
      //     },
      //     {
      //       title: "Departments",
      //       href: "/hrm/configurations/departments",
      //       icon: "copy",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Departments"],
      //       default: null,
      //       order: 3,
      //       visible: true,
      //     },
      //     {
      //       title: "Country",
      //       href: "/hrm/configurations/country",
      //       icon: "globe",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Country"],
      //       default: null,
      //       order: 4,
      //       visible: true,
      //     },
      //     {
      //       title: "Region",
      //       href: "/hrm/configurations/Region",
      //       icon: "map-pin",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Region"],
      //       default: null,
      //       order: 5,
      //       visible: true,
      //     },

      //     {
      //       title: "Employee Category",
      //       href: "/hrm/configurations/EmployeeCategory",
      //       icon: "users",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Employee Category",
      //       ],
      //       default: null,
      //       order: 7,
      //       visible: true,
      //     },
      //     {
      //       title: "Employee Designation",
      //       href: "/hrm/configurations/EmployeeDesignation",
      //       icon: "award",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Employee Designation",
      //       ],
      //       default: null,
      //       order: 8,
      //       visible: true,
      //     },
      //     {
      //       title: "Employee Paygrade",
      //       href: "/hrm/configurations/EmployeePaygrade",
      //       icon: "dollar-sign",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Employee Paygrade",
      //       ],
      //       default: null,
      //       order: 9,
      //       visible: true,
      //     },
      //     {
      //       title: "Employee Tier",
      //       href: "/hrm/configurations/EmployeeTier",
      //       icon: "bar-chart-2",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Employee Tier"],
      //       default: null,
      //       order: 10,
      //       visible: true,
      //     },
      //     {
      //       title: "Employment Type",
      //       href: "/hrm/configurations/EmploymentType",
      //       icon: "briefcase",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Employment Type",
      //       ],
      //       default: null,
      //       order: 11,
      //       visible: true,
      //     },
      //     {
      //       title: "Employee Evaluation",
      //       href: "/hrm/configurations/EmployeeEvaluation",
      //       icon: "clipboard",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Employee Evaluation",
      //       ],
      //       default: null,
      //       order: 12,
      //       visible: true,
      //     },
      //     {
      //       title: "Medical Reimbursement",
      //       href: "/hrm/configurations/MedicalReimbursment",
      //       icon: "heart",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Medical Reimbursement",
      //       ],
      //       default: null,
      //       order: 13,
      //       visible: true,
      //     },
      //     {
      //       title: "Approve Medical Reimbursement",
      //       href: "/hrm/configurations/ApproveMedicalReimbursment",
      //       icon: "check-circle",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Approve Medical Reimbursement",
      //       ],
      //       default: null,
      //       order: 14,
      //       visible: true,
      //     },
      //     {
      //       title: "Leave Type",
      //       href: "/hrm/configurations/LeaveType",
      //       icon: "clock",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Leave Type"],
      //       default: null,
      //       order: 15,
      //       visible: true,
      //     },
      //     {
      //       title: "Relation",
      //       href: "/hrm/configurations/Relation",
      //       icon: "link",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Relation"],
      //       default: null,
      //       order: 16,
      //       visible: true,
      //     },
      //     {
      //       title: "Attendance Device",
      //       href: "/hrm/configurations/AttendanceDevice",
      //       icon: "monitor",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Attendance Device",
      //       ],
      //       default: null,
      //       order: 17,
      //       visible: true,
      //     },
      //     {
      //       title: "Late Arrival Policy",
      //       href: "/hrm/configurations/LateArriavalPolicy",
      //       icon: "watch",
      //       permission: ["Superadmin", "manager"],
      //       active_list: [
      //         "Human Resource",
      //         "Configurations",
      //         "Late Arrival Policy",
      //       ],
      //       default: null,
      //       order: 18,
      //       visible: true,
      //     },
      //     {
      //       title: "Survey Form",
      //       href: "/hrm/configurations/SurveyForms",
      //       icon: "file-text",
      //       permission: ["Superadmin", "manager"],
      //       active_list: ["Human Resource", "Configurations", "Survey Form"],
      //       default: null,
      //       order: 19,
      //       visible: true,
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "user",
    permission: ["Superadmin", "manager", "Employee", "hr"],
    default: null,
    active_list: ["Profile"],
    order: 5,
    visible: true,
    description: "User profile and settings",
  },
];

export const getVisibleNavigationItems = (
  userRole: string
): NavigationItem[] => {
  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    return items
      .filter((item) => {
        if (!item.visible || !item.permission.includes(userRole)) {
          return false;
        }
        return true;
      })
      .map((item) => {
        const filteredChildren = item.children
          ? filterItems(item.children)
          : undefined;

        return {
          ...item,
          children:
            filteredChildren && filteredChildren.length > 0
              ? filteredChildren
              : undefined,
        };
      })
      .filter((item) => {
        if (
          item.children !== undefined &&
          (!item.children || item.children.length === 0)
        ) {
          return true;
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);
  };

  return filterItems(navigationConfig);
};

export const getScreenRoutes = (): Record<string, string> => {
  const routes: Record<string, string> = {};

  const processItems = (items: NavigationItem[], parentPath = "") => {
    items.forEach((item) => {
      const screenPath = parentPath ? `${parentPath}/${item.href}` : item.href;
      routes[item.href] = screenPath;

      if (item.children) {
        processItems(item.children, screenPath);
      }
    });
  };

  processItems(navigationConfig);
  return routes;
};
