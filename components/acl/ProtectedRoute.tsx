import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Permission, Role } from "../../acl/types";
import { useACL } from "../../hooks/useACL";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requiredRole?: Role;
  requiredRoles?: Role[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredPermissions = [],
  requiredRole,
  requiredRoles = [],
  requireAll = false,
  fallback,
  showFallback = true,
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
    if (requiredPermission) {
      hasAccess = hasPermission(requiredPermission);
    } else if (requiredPermissions.length > 0) {
      hasAccess = requireAll
        ? hasAllPermissions(requiredPermissions)
        : hasAnyPermission(requiredPermissions);
    }

    if (hasAccess && requiredRole) {
      hasAccess = isRole(requiredRole);
    } else if (hasAccess && requiredRoles.length > 0) {
      hasAccess = isAnyRole(requiredRoles);
    }
  }

  if (!hasAccess) {
    if (!showFallback) return null;

    return (
      fallback || (
        <View style={styles.accessDeniedContainer}>
          <Text style={styles.accessDeniedText}>Access Denied</Text>
          <Text style={styles.accessDeniedSubtext}>
            You don&apos;t have permission to access this resource
          </Text>
        </View>
      )
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  accessDeniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  accessDeniedText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  accessDeniedSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
});
