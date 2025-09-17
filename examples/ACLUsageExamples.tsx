import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Permission, ProtectedRoute } from "../acl";
import { useACL, usePermission, useRole } from "../hooks/useACL";

// Example 1: Basic Permission Checking
const TaskManagement = () => {
  const canCreateTasks = usePermission("tasks.create");
  const canAssignTasks = usePermission("tasks.assign");
  const isManager = useRole("manager");

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Task Management</Text>

      {canCreateTasks && <Button title="Create Task" onPress={() => {}} />}

      {canAssignTasks && <Button title="Assign Task" onPress={() => {}} />}

      {isManager && <Text style={styles.info}>Manager controls available</Text>}
    </View>
  );
};

// Example 2: Using ProtectedRoute Component
const AdminPanel = () => (
  <ProtectedRoute requiredRole="admin">
    <View style={styles.section}>
      <Text style={styles.title}>Admin Panel</Text>
      <Button title="Manage Users" onPress={() => {}} />
      <Button title="System Settings" onPress={() => {}} />
    </View>
  </ProtectedRoute>
);

// Example 3: Multiple Permission Requirements
const ReportsSection = () => (
  <ProtectedRoute
    requiredPermissions={["reports.view", "reports.export"]}
    requireAll={true}
    fallback={<Text>You need both view and export permissions</Text>}
  >
    <View style={styles.section}>
      <Text style={styles.title}>Reports</Text>
      <Button title="View Reports" onPress={() => {}} />
      <Button title="Export Reports" onPress={() => {}} />
    </View>
  </ProtectedRoute>
);

// Example 4: Using Permission Component for Conditional Rendering
const UserActions = () => (
  <View style={styles.section}>
    <Text style={styles.title}>User Actions</Text>

    <Permission permission="users.view">
      <Button title="View Users" onPress={() => {}} />
    </Permission>

    <Permission permission="users.edit">
      <Button title="Edit Users" onPress={() => {}} />
    </Permission>

    <Permission
      permission="users.delete"
      fallback={<Text style={styles.disabled}>Delete (No Permission)</Text>}
    >
      <Button title="Delete Users" onPress={() => {}} color="red" />
    </Permission>
  </View>
);

// Example 5: Role-based Access with Multiple Roles
const ManagementFeatures = () => (
  <ProtectedRoute requiredRoles={["admin", "manager", "hr"]} requireAll={false}>
    <View style={styles.section}>
      <Text style={styles.title}>Management Features</Text>

      <Permission roles={["admin", "manager"]}>
        <Button title="Approve Requests" onPress={() => {}} />
      </Permission>

      <Permission role="hr">
        <Button title="HR Dashboard" onPress={() => {}} />
      </Permission>
    </View>
  </ProtectedRoute>
);

// Example 6: Advanced ACL Usage with Hooks
const AdvancedExample = () => {
  const {
    userRole,
    permissions,
    hasAnyPermission,
    hasAllPermissions,
    isRoleHigherOrEqual,
    filterByPermissions,
  } = useACL();

  const menuItems = [
    { title: "Dashboard", requiredPermission: "dashboard.view" as const },
    { title: "Users", requiredPermission: "users.view" as const },
    { title: "Tasks", requiredPermission: "tasks.view" as const },
    { title: "Reports", requiredPermission: "reports.view" as const },
  ];

  const allowedMenuItems = filterByPermissions(menuItems);
  const hasManagementAccess = hasAnyPermission(["tasks.assign"]);
  const hasFullReportAccess = hasAllPermissions([
    "reports.view",
    "reports.export",
  ]);
  const canAccessAdminFeatures = isRoleHigherOrEqual("manager");

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Advanced ACL Example</Text>

      <Text style={styles.info}>Current Role: {userRole || "None"}</Text>
      <Text style={styles.info}>Permissions: {permissions.length}</Text>

      <Text style={styles.subtitle}>Available Menu Items:</Text>
      {allowedMenuItems.map((item) => (
        <Text key={item.title} style={styles.menuItem}>
          • {item.title}
        </Text>
      ))}

      {hasManagementAccess && (
        <Text style={styles.info}>✓ Has management access</Text>
      )}

      {hasFullReportAccess && (
        <Text style={styles.info}>✓ Has full report access</Text>
      )}

      {canAccessAdminFeatures && (
        <Text style={styles.info}>✓ Can access admin features</Text>
      )}
    </View>
  );
};

// Example 7: Conditional Rendering with Render Prop
const ConditionalContent = () => (
  <View style={styles.section}>
    <Text style={styles.title}>Conditional Content</Text>

    <Permission
      permission="dashboard.manage"
      render={(hasAccess) => (
        <Text style={hasAccess ? styles.allowed : styles.denied}>
          Dashboard Management: {hasAccess ? "Allowed" : "Denied"}
        </Text>
      )}
    />

    <Permission
      roles={["admin", "manager"]}
      render={(hasAccess) => (
        <View
          style={hasAccess ? styles.enabledSection : styles.disabledSection}
        >
          <Text>Management Tools</Text>
          <Button
            title="Access Tools"
            disabled={!hasAccess}
            onPress={() => {}}
          />
        </View>
      )}
    />
  </View>
);

// Main Example Component
export const ACLUsageExamples = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.header}>ACL System Usage Examples</Text>

    <TaskManagement />
    <AdminPanel />
    <ReportsSection />
    <UserActions />
    <ManagementFeatures />
    <AdvancedExample />
    <ConditionalContent />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 8,
    color: "#555",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  menuItem: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
  },
  disabled: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  allowed: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  denied: {
    color: "#F44336",
    fontWeight: "500",
  },
  enabledSection: {
    opacity: 1,
  },
  disabledSection: {
    opacity: 0.5,
  },
});
