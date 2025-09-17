import { useCallback } from "react";
import {
  useCompleteTaskMutation,
  useGetMyCalendarTasksQuery,
  useGetMyDashboardQuery,
  useGetMyTasksQuery,
  useUpdateTaskStatusMutation,
} from "../store/api/dashboardApi";
import { TaskItem } from "../types/api";

/**
 * Custom hook for dashboard data and actions
 * Provides easy access to dashboard data and task management
 */
export const useDashboard = () => {
  // Queries
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useGetMyDashboardQuery();

  const {
    data: tasks,
    isLoading: isTasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useGetMyTasksQuery();

  const {
    data: calendarTasks,
    isLoading: isCalendarTasksLoading,
    error: calendarTasksError,
    refetch: refetchCalendarTasks,
  } = useGetMyCalendarTasksQuery();

  // Mutations
  const [updateTaskStatus, { isLoading: isUpdatingTaskStatus }] =
    useUpdateTaskStatusMutation();
  const [completeTask, { isLoading: isCompletingTask }] =
    useCompleteTaskMutation();

  /**
   * Update task status
   */
  const updateStatus = useCallback(
    async (taskId: string, status: TaskItem["status"]) => {
      try {
        await updateTaskStatus({ taskId, status }).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [updateTaskStatus]
  );

  /**
   * Mark task as completed
   */
  const markTaskComplete = useCallback(
    async (taskId: string) => {
      try {
        await completeTask(taskId).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [completeTask]
  );

  /**
   * Refresh all dashboard data
   */
  const refreshAll = useCallback(async () => {
    await Promise.all([
      refetchDashboard(),
      refetchTasks(),
      refetchCalendarTasks(),
    ]);
  }, [refetchDashboard, refetchTasks, refetchCalendarTasks]);

  /**
   * Get tasks by status
   */
  const getTasksByStatus = useCallback(
    (status: TaskItem["status"]) => {
      return tasks?.filter((task) => task.status === status) || [];
    },
    [tasks]
  );

  /**
   * Get tasks by priority
   */
  const getTasksByPriority = useCallback(
    (priority: TaskItem["priority"]) => {
      return tasks?.filter((task) => task.priority === priority) || [];
    },
    [tasks]
  );

  /**
   * Get overdue tasks
   */
  const getOverdueTasks = useCallback(() => {
    const now = new Date();
    return (
      tasks?.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) < now &&
          task.status !== "completed"
      ) || []
    );
  }, [tasks]);

  /**
   * Get upcoming tasks (due within next 7 days)
   */
  const getUpcomingTasks = useCallback(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return (
      tasks?.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) >= now &&
          new Date(task.dueDate) <= nextWeek &&
          task.status !== "completed"
      ) || []
    );
  }, [tasks]);

  return {
    // Data
    dashboardData,
    tasks,
    calendarTasks,

    // Loading states
    isDashboardLoading,
    isTasksLoading,
    isCalendarTasksLoading,
    isUpdatingTaskStatus,
    isCompletingTask,

    // Errors
    dashboardError,
    tasksError,
    calendarTasksError,

    // Actions
    updateStatus,
    markTaskComplete,
    refreshAll,

    // Utility methods
    getTasksByStatus,
    getTasksByPriority,
    getOverdueTasks,
    getUpcomingTasks,

    // Refetch methods
    refetchDashboard,
    refetchTasks,
    refetchCalendarTasks,
  };
};
