import { Permission, Role } from "./types";

export class ACLManager {
  private static instance: ACLManager;
  private permissionCache = new Map<string, boolean>();
  private readonly cacheTimeout = 5 * 60 * 1000;

  static getInstance(): ACLManager {
    if (!ACLManager.instance) {
      ACLManager.instance = new ACLManager();
    }
    return ACLManager.instance;
  }

  hasPermission(
    userPermissions: Permission[],
    requiredPermission: Permission
  ): boolean {
    if (!userPermissions || userPermissions.length === 0) return false;

    const cacheKey = `${userPermissions.join(",")}-${requiredPermission}`;

    if (this.permissionCache.has(cacheKey)) {
      return this.permissionCache.get(cacheKey)!;
    }

    const hasAccess = this.checkPermission(userPermissions, requiredPermission);

    this.permissionCache.set(cacheKey, hasAccess);
    setTimeout(() => this.permissionCache.delete(cacheKey), this.cacheTimeout);

    return hasAccess;
  }

  private checkPermission(
    userPermissions: Permission[],
    requiredPermission: Permission
  ): boolean {
    if (userPermissions.includes("admin.*")) return true;
    if (userPermissions.includes(requiredPermission)) return true;

    const [resource, action] = requiredPermission.split(".") as [
      string,
      string
    ];
    const wildcardPermission = `${resource}.*` as Permission;

    return userPermissions.includes(wildcardPermission);
  }

  hasAnyPermission(
    userPermissions: Permission[],
    requiredPermissions: Permission[]
  ): boolean {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    return requiredPermissions.some((permission) =>
      this.hasPermission(userPermissions, permission)
    );
  }

  hasAllPermissions(
    userPermissions: Permission[],
    requiredPermissions: Permission[]
  ): boolean {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    return requiredPermissions.every((permission) =>
      this.hasPermission(userPermissions, permission)
    );
  }

  canAccessResource(
    userPermissions: Permission[],
    resource: string,
    action: string
  ): boolean {
    const permission = `${resource}.${action}` as Permission;
    return this.hasPermission(userPermissions, permission);
  }

  isRoleHigherOrEqual(userRole: Role, requiredRole: Role): boolean {
    const roleHierarchy: Record<Role, number> = {
      admin: 100,
      manager: 80,
      hr: 70,
      supervisor: 60,
      employee: 40,
      provider: 30,
      guest: 10,
    };

    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  }

  filterByPermissions<T extends { requiredPermission?: Permission }>(
    items: T[],
    userPermissions: Permission[]
  ): T[] {
    return items.filter((item) => {
      if (!item.requiredPermission) return true;
      return this.hasPermission(userPermissions, item.requiredPermission);
    });
  }

  clearCache(): void {
    this.permissionCache.clear();
  }
}

export const aclManager = ACLManager.getInstance();
