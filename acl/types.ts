export type Role =
  | "admin"
  | "manager"
  | "employee"
  | "hr"
  | "provider"
  | "supervisor"
  | "guest";

export type Permission =
  | "dashboard.view"
  | "dashboard.manage"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "tasks.view"
  | "tasks.create"
  | "tasks.edit"
  | "tasks.delete"
  | "tasks.assign"
  | "leaves.view"
  | "leaves.create"
  | "leaves.approve"
  | "leaves.reject"
  | "leaves.cancel"
  | "reports.view"
  | "reports.export"
  | "settings.view"
  | "settings.manage"
  | "admin.*"
  | "manager.*"
  | "hr.*";

export interface RoleData {
  name: Role;
  displayName: string;
  description?: string;
  isActive: boolean;
  permissions: Permission[];
}

export interface UserRole {
  role: Role;
  permissions: Permission[];
}

export interface ACLContext {
  userRole: Role | null;
  permissions: Permission[];
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  isRole: (role: Role) => boolean;
  isAnyRole: (roles: Role[]) => boolean;
  canAccessResource: (resource: string, action: string) => boolean;
}
