import { useCallback } from "react";
import { useACLContext } from "../acl/context";
import { aclManager } from "../acl/manager";
import { Permission, Role } from "../acl/types";

export const useACL = () => {
  const {
    userRole,
    permissions,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
    isAnyRole,
    canAccessResource,
  } = useACLContext();

  const filterByPermissions = useCallback(
    <T extends { requiredPermission?: Permission }>(items: T[]): T[] => {
      return aclManager.filterByPermissions(items, permissions);
    },
    [permissions]
  );

  const isRoleHigherOrEqual = useCallback(
    (requiredRole: Role): boolean => {
      if (!userRole) return false;
      return aclManager.isRoleHigherOrEqual(userRole, requiredRole);
    },
    [userRole]
  );

  return {
    userRole,
    permissions,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
    isAnyRole,
    canAccessResource,
    filterByPermissions,
    isRoleHigherOrEqual,
  };
};

export const usePermission = (requiredPermission: Permission): boolean => {
  const { hasPermission } = useACL();
  return hasPermission(requiredPermission);
};

export const useRole = (role: Role): boolean => {
  const { isRole } = useACL();
  return isRole(role);
};

export const useAnyRole = (roles: Role[]): boolean => {
  const { isAnyRole } = useACL();
  return isAnyRole(roles);
};

export const useCanAccessResource = (
  resource: string,
  action: string
): boolean => {
  const { canAccessResource } = useACL();
  return canAccessResource(resource, action);
};
