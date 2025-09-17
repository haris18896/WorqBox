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
    permission: ["admin", "manager"],
    default: "Dashboard",
    active_list: ["Project Management", "Dashboard"],
    order: 1,
    visible: true,
    description: "Manage all projects and related reports",
    children: [
      {
        title: "Dashboard",
        href: "/pms",
        icon: "grid",
        permission: ["admin", "manager", "employee"],
        active_list: ["Project Management", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Projects",
        href: "/pms/projects",
        icon: "folder-open",
        permission: ["admin", "manager"],
        default: "Main",
        active_list: ["Project Management", "Projects"],
        order: 2,
        visible: true,
        children: [
          {
            title: "Main",
            href: "/pms/projects",
            icon: "file",
            permission: ["admin", "manager"],
            active_list: ["Project Management", "Projects", "Main"],
            default: null,
            order: 1,
            visible: true,
          },
          {
            title: "Client",
            href: "/pms/projects/client",
            icon: "users",
            permission: ["admin", "manager"],
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
        permission: ["admin", "manager"],
        active_list: ["Project Management", "Reports"],
        default: null,
        order: 3,
        visible: true,
      },
    ],
  },
  {
    title: "Employee Facilitation",
    href: "/efs",
    icon: "user-check",
    permission: ["admin", "hr", "employee"],
    default: "Dashboard",
    active_list: ["Employee Facilitation", "Dashboard"],
    order: 2,
    visible: true,
    description: "HR and employee self-service features",
    children: [
      {
        title: "Dashboard",
        href: "/efs",
        icon: "grid",
        permission: ["admin", "hr", "employee"],
        active_list: ["Employee Facilitation", "Dashboard"],
        default: null,
        order: 1,
        visible: true,
      },
      {
        title: "Leave Management",
        href: "/efs/leave-management",
        icon: "calendar",
        permission: ["admin", "hr", "employee"],
        default: "Leave Request",
        active_list: ["Employee Facilitation", "Leave Management"],
        order: 2,
        visible: true,
        children: [
          {
            title: "Leave Request",
            href: "/efs/leave-management/leave-request",
            icon: "plus-circle",
            permission: ["employee", "hr", "admin"],
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
            permission: ["admin", "hr"],
            active_list: [
              "Employee Facilitation",
              "Leave Management",
              "Approval Request",
            ],
            default: null,
            order: 2,
            visible: true,
            badgeCount: 3,
          },
        ],
      },
      {
        title: "Salary Calculator",
        href: "/efs/salary-calculator",
        icon: "calculator",
        permission: ["employee", "hr", "admin"],
        active_list: ["Employee Facilitation", "Salary Calculator"],
        default: null,
        order: 3,
        visible: true,
      },
      {
        title: "Survey",
        href: "/efs/survey-forms",
        icon: "clipboard",
        permission: ["employee", "hr", "admin"],
        active_list: ["Employee Facilitation", "Survey"],
        default: null,
        order: 4,
        visible: true,
      },
    ],
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "user",
    permission: ["admin", "manager", "employee", "hr"],
    default: null,
    active_list: ["Profile"],
    order: 3,
    visible: true,
    description: "User profile and settings",
  },
];

// Helper function to get visible items based on user permissions
export const getVisibleNavigationItems = (
  userRole: string
): NavigationItem[] => {
  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    return items
      .filter((item) => {
        // Item must be visible and user must have permission
        if (!item.visible || !item.permission.includes(userRole)) {
          return false;
        }
        return true;
      })
      .map((item) => {
        // Process children if they exist
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
        // If item has children but no visible children after filtering, hide the parent
        // Unless the parent item itself is navigable (has its own href that's different from children)
        if (
          item.children !== undefined &&
          (!item.children || item.children.length === 0)
        ) {
          // Keep parent if it's navigable on its own
          return true;
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);
  };

  return filterItems(navigationConfig);
};

// Helper function to get screen route mapping
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
