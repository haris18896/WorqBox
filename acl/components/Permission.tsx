import React from "react";
import { useACL } from "../../hooks/useACL";
import { Permission as PermissionType, Role } from "../types";

interface PermissionProps {
  children?: React.ReactNode;
  permission?: PermissionType;
  permissions?: PermissionType[];
  role?: Role;
  roles?: Role[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  render?: (hasAccess: boolean) => React.ReactNode;
}

export const Permission: React.FC<PermissionProps> = ({
  children,
  permission,
  permissions = [],
  role,
  roles = [],
  requireAll = false,
  fallback = null,
  render,
}) => {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
    isAnyRole,
    userRole,
  } = useACL();

  let hasAccess = true;

  if (!userRole) {
    hasAccess = false;
  } else {
    if (permission) {
      hasAccess = hasPermission(permission);
    } else if (permissions.length > 0) {
      hasAccess = requireAll
        ? hasAllPermissions(permissions)
        : hasAnyPermission(permissions);
    }

    if (hasAccess && role) {
      hasAccess = isRole(role);
    } else if (hasAccess && roles.length > 0) {
      hasAccess = isAnyRole(roles);
    }
  }

  if (render) {
    return <>{render(hasAccess)}</>;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
