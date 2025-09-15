import { useCallback, useMemo } from "react";
import {
  useCancelLeaveRequestMutation,
  useCreateLeaveRequestMutation,
  useGetLeaveRequestByIdQuery,
  useGetLeaveTypesQuery,
  useGetMyLeaveRequestListQuery,
  useUpdateLeaveRequestMutation,
} from "../store/api/leaveApi";
import { LeaveRequest, LeaveRequestListParams } from "../types/api";

/**
 * Custom hook for leave management
 * Provides easy access to leave data and management actions
 */
export const useLeaveManagement = (params?: LeaveRequestListParams) => {
  // Queries
  const {
    data: leaveRequestsData,
    isLoading: isLeaveRequestsLoading,
    error: leaveRequestsError,
    refetch: refetchLeaveRequests,
    isFetching: isFetchingLeaveRequests,
  } = useGetMyLeaveRequestListQuery(params || {});

  const {
    data: leaveTypes,
    isLoading: isLeaveTypesLoading,
    error: leaveTypesError,
    refetch: refetchLeaveTypes,
  } = useGetLeaveTypesQuery();

  // Mutations
  const [createLeaveRequest, { isLoading: isCreatingLeaveRequest }] =
    useCreateLeaveRequestMutation();
  const [updateLeaveRequest, { isLoading: isUpdatingLeaveRequest }] =
    useUpdateLeaveRequestMutation();
  const [cancelLeaveRequest, { isLoading: isCancellingLeaveRequest }] =
    useCancelLeaveRequestMutation();

  /**
   * Create a new leave request
   */
  const createLeave = useCallback(
    async (leaveData: Omit<LeaveRequest, "id">) => {
      try {
        const result = await createLeaveRequest(leaveData).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [createLeaveRequest]
  );

  /**
   * Update an existing leave request
   */
  const updateLeave = useCallback(
    async (leaveData: LeaveRequest) => {
      try {
        const result = await updateLeaveRequest(leaveData).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [updateLeaveRequest]
  );

  /**
   * Cancel a leave request
   */
  const cancelLeave = useCallback(
    async (leaveId: string) => {
      try {
        await cancelLeaveRequest(leaveId).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [cancelLeaveRequest]
  );

  /**
   * Load more leave requests (pagination)
   */
  const loadMore = useCallback(async () => {
    if (leaveRequestsData?.paginationInfo?.hasNext) {
      const nextPage = (leaveRequestsData.paginationInfo.currentPage || 1) + 1;
      return refetchLeaveRequests();
    }
  }, [leaveRequestsData, refetchLeaveRequests]);

  /**
   * Refresh all leave data
   */
  const refreshAll = useCallback(async () => {
    await Promise.all([refetchLeaveRequests(), refetchLeaveTypes()]);
  }, [refetchLeaveRequests, refetchLeaveTypes]);

  // Computed values
  const leaveRequests = useMemo(
    () => leaveRequestsData?.items || [],
    [leaveRequestsData]
  );
  const paginationInfo = useMemo(
    () => leaveRequestsData?.paginationInfo,
    [leaveRequestsData]
  );
  const hasMore = useMemo(
    () => paginationInfo?.hasNext || false,
    [paginationInfo]
  );

  /**
   * Get leave requests by status
   */
  const getLeavesByStatus = useCallback(
    (status: LeaveRequest["status"]) => {
      return leaveRequests.filter((leave) => leave.status === status);
    },
    [leaveRequests]
  );

  /**
   * Get pending leave requests
   */
  const getPendingLeaves = useCallback(() => {
    return getLeavesByStatus("pending");
  }, [getLeavesByStatus]);

  /**
   * Get approved leave requests
   */
  const getApprovedLeaves = useCallback(() => {
    return getLeavesByStatus("approved");
  }, [getLeavesByStatus]);

  /**
   * Get rejected leave requests
   */
  const getRejectedLeaves = useCallback(() => {
    return getLeavesByStatus("rejected");
  }, [getLeavesByStatus]);

  /**
   * Get upcoming approved leaves
   */
  const getUpcomingLeaves = useCallback(() => {
    const now = new Date();
    return leaveRequests.filter(
      (leave) => leave.status === "approved" && new Date(leave.startDate) > now
    );
  }, [leaveRequests]);

  /**
   * Get current active leaves
   */
  const getCurrentLeaves = useCallback(() => {
    const now = new Date();
    return leaveRequests.filter(
      (leave) =>
        leave.status === "approved" &&
        new Date(leave.startDate) <= now &&
        new Date(leave.endDate) >= now
    );
  }, [leaveRequests]);

  /**
   * Calculate total leave days by type
   */
  const getLeaveBalanceByType = useCallback(
    (leaveTypeId: string) => {
      const typeLeaves = leaveRequests.filter(
        (leave) =>
          leave.leaveTypeId === leaveTypeId && leave.status === "approved"
      );

      return typeLeaves.reduce((total, leave) => total + leave.totalDays, 0);
    },
    [leaveRequests]
  );

  /**
   * Check if user can create leave request
   */
  const canCreateLeave = useCallback(() => {
    // Add business logic here (e.g., check if user has available leave days)
    return true;
  }, []);

  /**
   * Get leave type by ID
   */
  const getLeaveTypeById = useCallback(
    (leaveTypeId: string) => {
      return leaveTypes?.find((type) => type.id === leaveTypeId);
    },
    [leaveTypes]
  );

  return {
    // Data
    leaveRequests,
    leaveTypes,
    paginationInfo,
    hasMore,

    // Loading states
    isLeaveRequestsLoading,
    isLeaveTypesLoading,
    isFetchingLeaveRequests,
    isCreatingLeaveRequest,
    isUpdatingLeaveRequest,
    isCancellingLeaveRequest,

    // Errors
    leaveRequestsError,
    leaveTypesError,

    // Actions
    createLeave,
    updateLeave,
    cancelLeave,
    loadMore,
    refreshAll,

    // Utility methods
    getLeavesByStatus,
    getPendingLeaves,
    getApprovedLeaves,
    getRejectedLeaves,
    getUpcomingLeaves,
    getCurrentLeaves,
    getLeaveBalanceByType,
    canCreateLeave,
    getLeaveTypeById,

    // Refetch methods
    refetchLeaveRequests,
    refetchLeaveTypes,
  };
};

/**
 * Hook to get specific leave request details
 */
export const useLeaveRequestDetails = (leaveId: string) => {
  const {
    data: leaveRequest,
    isLoading,
    error,
    refetch,
  } = useGetLeaveRequestByIdQuery(leaveId, {
    skip: !leaveId,
  });

  return {
    leaveRequest,
    isLoading,
    error,
    refetch,
  };
};
