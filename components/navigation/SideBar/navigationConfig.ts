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
        href: "/pms",
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
            href: "/pms/projects",
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
    href: "/efs",
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
        href: "/efs",
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
            badgeCount: 3,
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
    title: "Profile",
    href: "/profile",
    icon: "user",
    permission: ["Superadmin", "manager", "Employee", "hr"],
    default: null,
    active_list: ["Profile"],
    order: 3,
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
