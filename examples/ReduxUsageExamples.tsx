/**
 * Redux Usage Examples
 *
 * This file contains comprehensive examples of how to use the Redux setup
 * in your components. These examples demonstrate best practices and common patterns.
 */

import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import { useAuthActions } from "../hooks/useAuthActions";
import { useDashboard } from "../hooks/useDashboard";
import { useLeaveManagement } from "../hooks/useLeaveManagement";

// ============================================================================
// AUTHENTICATION EXAMPLES
// ============================================================================

/**
 * Example: Login Component
 * Shows how to handle user authentication
 */
export const LoginExample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoginLoading, error, clearAuthError } = useAuthActions();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      // User is automatically navigated to main app
    } catch (error) {
      // Error is automatically shown via toast
      console.error("Login failed:", error);
    }
  };

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearAuthError();
  }, [clearAuthError]);

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoginLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoginLoading}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

/**
 * Example: Registration Component
 * Shows how to handle user registration
 */
export const RegisterExample: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, isRegisterLoading } = useAuthActions();

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(formData);
      // User is automatically navigated to main app
    } catch (error) {
      // Error handling is automatic
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, firstName: text }))
        }
      />
      <TextInput
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, lastName: text }))
        }
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, confirmPassword: text }))
        }
        secureTextEntry
      />
      <Button
        title={isRegisterLoading ? "Registering..." : "Register"}
        onPress={handleRegister}
        disabled={isRegisterLoading}
      />
    </View>
  );
};

// ============================================================================
// DASHBOARD EXAMPLES
// ============================================================================

/**
 * Example: Dashboard Overview
 * Shows how to display dashboard data and handle loading states
 */
export const DashboardExample: React.FC = () => {
  const {
    dashboardData,
    tasks,
    isDashboardLoading,
    isTasksLoading,
    markTaskComplete,
    getOverdueTasks,
    getUpcomingTasks,
    refreshAll,
  } = useDashboard();

  const overdueTasks = getOverdueTasks();
  const upcomingTasks = getUpcomingTasks();

  const handleRefresh = () => {
    refreshAll();
  };

  if (isDashboardLoading) {
    return <Text>Loading dashboard...</Text>;
  }

  return (
    <View>
      <Text>Dashboard Overview</Text>

      {/* Dashboard Statistics */}
      {dashboardData && (
        <View>
          <Text>Total Tasks: {dashboardData.totalTasks}</Text>
          <Text>Completed: {dashboardData.completedTasks}</Text>
          <Text>Pending: {dashboardData.pendingTasks}</Text>
          <Text>Overdue: {dashboardData.overdueTasks}</Text>
        </View>
      )}

      {/* Overdue Tasks */}
      <Text>Overdue Tasks ({overdueTasks.length})</Text>
      <FlatList
        data={overdueTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>Due: {item.dueDate}</Text>
            <Button
              title="Mark Complete"
              onPress={() => markTaskComplete(item.id)}
            />
          </View>
        )}
      />

      {/* Upcoming Tasks */}
      <Text>Upcoming Tasks ({upcomingTasks.length})</Text>
      <FlatList
        data={upcomingTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>Due: {item.dueDate}</Text>
            <Text>Priority: {item.priority}</Text>
          </View>
        )}
      />

      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
};

/**
 * Example: Task Management
 * Shows how to manage tasks with different actions
 */
export const TaskManagementExample: React.FC = () => {
  const {
    tasks,
    isTasksLoading,
    updateStatus,
    getTasksByStatus,
    getTasksByPriority,
  } = useDashboard();

  const todoTasks = getTasksByStatus("todo");
  const inProgressTasks = getTasksByStatus("in_progress");
  const highPriorityTasks = getTasksByPriority("high");

  const handleStatusChange = async (taskId: string, newStatus: any) => {
    try {
      await updateStatus(taskId, newStatus);
      Alert.alert("Success", "Task status updated");
    } catch (error) {
      Alert.alert("Error", "Failed to update task status");
    }
  };

  if (isTasksLoading) {
    return <Text>Loading tasks...</Text>;
  }

  return (
    <View>
      <Text>Task Management</Text>

      {/* Todo Tasks */}
      <Text>Todo ({todoTasks.length})</Text>
      <FlatList
        data={todoTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="Start"
              onPress={() => handleStatusChange(item.id, "in_progress")}
            />
          </View>
        )}
      />

      {/* In Progress Tasks */}
      <Text>In Progress ({inProgressTasks.length})</Text>
      <FlatList
        data={inProgressTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="Complete"
              onPress={() => handleStatusChange(item.id, "completed")}
            />
          </View>
        )}
      />

      {/* High Priority Tasks */}
      <Text>High Priority ({highPriorityTasks.length})</Text>
      <FlatList
        data={highPriorityTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#ffebee" }}>
            <Text>{item.title}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

// ============================================================================
// LEAVE MANAGEMENT EXAMPLES
// ============================================================================

/**
 * Example: Leave Request List
 * Shows how to display and manage leave requests with pagination
 */
export const LeaveListExample: React.FC = () => {
  const {
    leaveRequests,
    isLeaveRequestsLoading,
    hasMore,
    loadMore,
    cancelLeave,
    getPendingLeaves,
    getApprovedLeaves,
    refreshAll,
  } = useLeaveManagement();

  const pendingLeaves = getPendingLeaves();
  const approvedLeaves = getApprovedLeaves();

  const handleCancelLeave = async (leaveId: string) => {
    Alert.alert(
      "Cancel Leave",
      "Are you sure you want to cancel this leave request?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await cancelLeave(leaveId);
              Alert.alert("Success", "Leave request cancelled");
            } catch (error) {
              Alert.alert("Error", "Failed to cancel leave request");
            }
          },
        },
      ]
    );
  };

  const handleLoadMore = () => {
    if (hasMore && !isLeaveRequestsLoading) {
      loadMore();
    }
  };

  return (
    <View>
      <Text>Leave Requests</Text>

      {/* Summary */}
      <View>
        <Text>Pending: {pendingLeaves.length}</Text>
        <Text>Approved: {approvedLeaves.length}</Text>
      </View>

      {/* Leave Requests List */}
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id || ""}
        renderItem={({ item }) => (
          <View>
            <Text>{item.reason}</Text>
            <Text>
              From: {item.startDate} To: {item.endDate}
            </Text>
            <Text>Days: {item.totalDays}</Text>
            <Text>Status: {item.status}</Text>

            {item.status === "pending" && (
              <Button
                title="Cancel"
                onPress={() => handleCancelLeave(item.id!)}
                color="red"
              />
            )}
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLeaveRequestsLoading ? <Text>Loading more...</Text> : null
        }
        refreshing={isLeaveRequestsLoading}
        onRefresh={refreshAll}
      />
    </View>
  );
};

/**
 * Example: Create Leave Request
 * Shows how to create a new leave request with validation
 */
export const CreateLeaveExample: React.FC = () => {
  const [leaveData, setLeaveData] = useState({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    totalDays: 0,
  });

  const {
    leaveTypes,
    createLeave,
    isCreatingLeaveRequest,
    isLeaveTypesLoading,
  } = useLeaveManagement();

  const handleCreateLeave = async () => {
    if (
      !leaveData.leaveTypeId ||
      !leaveData.startDate ||
      !leaveData.endDate ||
      !leaveData.reason
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await createLeave({
        ...leaveData,
        employeeId: "current-user-id", // This should come from auth state
      });
      Alert.alert("Success", "Leave request submitted successfully");
      // Reset form
      setLeaveData({
        leaveTypeId: "",
        startDate: "",
        endDate: "",
        reason: "",
        totalDays: 0,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to submit leave request");
    }
  };

  if (isLeaveTypesLoading) {
    return <Text>Loading leave types...</Text>;
  }

  return (
    <View>
      <Text>Create Leave Request</Text>

      {/* Leave Type Selection */}
      <Text>Leave Type:</Text>
      {leaveTypes?.map((type) => (
        <Button
          key={type.id}
          title={type.name}
          onPress={() =>
            setLeaveData((prev) => ({ ...prev, leaveTypeId: type.id }))
          }
          color={leaveData.leaveTypeId === type.id ? "blue" : "gray"}
        />
      ))}

      <TextInput
        placeholder="Start Date (YYYY-MM-DD)"
        value={leaveData.startDate}
        onChangeText={(text) =>
          setLeaveData((prev) => ({ ...prev, startDate: text }))
        }
      />

      <TextInput
        placeholder="End Date (YYYY-MM-DD)"
        value={leaveData.endDate}
        onChangeText={(text) =>
          setLeaveData((prev) => ({ ...prev, endDate: text }))
        }
      />

      <TextInput
        placeholder="Total Days"
        value={leaveData.totalDays.toString()}
        onChangeText={(text) =>
          setLeaveData((prev) => ({ ...prev, totalDays: parseInt(text) || 0 }))
        }
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Reason"
        value={leaveData.reason}
        onChangeText={(text) =>
          setLeaveData((prev) => ({ ...prev, reason: text }))
        }
        multiline
        numberOfLines={3}
      />

      <Button
        title={
          isCreatingLeaveRequest ? "Submitting..." : "Submit Leave Request"
        }
        onPress={handleCreateLeave}
        disabled={isCreatingLeaveRequest}
      />
    </View>
  );
};

// ============================================================================
// ADVANCED PATTERNS
// ============================================================================

/**
 * Example: Real-time Data Updates
 * Shows how to handle real-time updates and background refetching
 */
export const RealTimeExample: React.FC = () => {
  const { dashboardData, refreshAll } = useDashboard();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAll();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshAll]);

  // Refresh when app comes to foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        refreshAll();
      }
    };

    // Add app state listener here
    // AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Remove listener
    };
  }, [refreshAll]);

  return (
    <View>
      <Text>Real-time Dashboard</Text>
      {/* Your UI here */}
    </View>
  );
};

/**
 * Example: Error Handling
 * Shows how to handle different types of errors
 */
export const ErrorHandlingExample: React.FC = () => {
  const {
    dashboardData,
    dashboardError,
    isDashboardLoading,
    refetchDashboard,
  } = useDashboard();

  if (isDashboardLoading) {
    return <Text>Loading...</Text>;
  }

  if (dashboardError) {
    return (
      <View>
        <Text>Failed to load dashboard data</Text>
        <Button title="Retry" onPress={refetchDashboard} />
      </View>
    );
  }

  return (
    <View>
      <Text>Dashboard loaded successfully</Text>
      {/* Your dashboard UI */}
    </View>
  );
};

export default {
  LoginExample,
  RegisterExample,
  DashboardExample,
  TaskManagementExample,
  LeaveListExample,
  CreateLeaveExample,
  RealTimeExample,
  ErrorHandlingExample,
};
