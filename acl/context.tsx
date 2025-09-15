import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated, selectUser } from "../store/slices/authSlice";
import { DEFAULT_ROLE_PERMISSIONS } from "./constants";
import { aclManager } from "./manager";
import { ACLContext, Permission, Role } from "./types";

const ACLContextProvider = createContext<ACLContext | undefined>(undefined);

interface ACLProviderProps {
  children: React.ReactNode;
}

export const ACLProvider: React.FC<ACLProviderProps> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const userRole = useMemo((): Role | null => {
    if (!isAuthenticated || !user) return null;
    return (user as any).role || "employee";
  }, [user, isAuthenticated]);

  const permissions = useMemo((): Permission[] => {
    if (!userRole) return [];

    const serverPermissions =
      ((user as any)?.permissions as Permission[]) || [];

    if (serverPermissions.length > 0) {
      return serverPermissions;
    }

    return DEFAULT_ROLE_PERMISSIONS[userRole] || [];
  }, [userRole, user]);

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      return aclManager.hasPermission(permissions, permission);
    },
    [permissions]
  );

  const hasAnyPermission = useCallback(
    (requiredPermissions: Permission[]): boolean => {
      return aclManager.hasAnyPermission(permissions, requiredPermissions);
    },
    [permissions]
  );

  const hasAllPermissions = useCallback(
    (requiredPermissions: Permission[]): boolean => {
      return aclManager.hasAllPermissions(permissions, requiredPermissions);
    },
    [permissions]
  );

  const isRole = useCallback(
    (role: Role): boolean => {
      return userRole === role;
    },
    [userRole]
  );

  const isAnyRole = useCallback(
    (roles: Role[]): boolean => {
      return userRole ? roles.includes(userRole) : false;
    },
    [userRole]
  );

  const canAccessResource = useCallback(
    (resource: string, action: string): boolean => {
      return aclManager.canAccessResource(permissions, resource, action);
    },
    [permissions]
  );

  const contextValue: ACLContext = useMemo(
    () => ({
      userRole,
      permissions,
      isLoading: false,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      isRole,
      isAnyRole,
      canAccessResource,
    }),
    [
      userRole,
      permissions,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      isRole,
      isAnyRole,
      canAccessResource,
    ]
  );

  return (
    <ACLContextProvider.Provider value={contextValue}>
      {children}
    </ACLContextProvider.Provider>
  );
};

export const useACLContext = (): ACLContext => {
  const context = useContext(ACLContextProvider);
  if (!context) {
    throw new Error("useACLContext must be used within an ACLProvider");
  }
  return context;
};
