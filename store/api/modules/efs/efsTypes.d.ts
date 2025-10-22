import { PaginationParams } from "@/store/types/api";

// EFS Dashboard Types

export interface CalendarEvent {
  category: string;
  name: string;
  fromDate: string;
  toDate: string;
}

export interface EmployeeListing {
  id: number;
  firstName: string;
  lastName: string;
}

export interface LeaveBalance {
  leaveType?: string;
  balance?: number;
  used?: number;
  remaining?: number;
}

export interface LeaveTypeCountDTO {
  leaveType?: string;
  count?: number;
}

export interface AdminDashboardData {
  leavesBalances: LeaveBalance[];
  calendarEvents: CalendarEvent[];
  employeeListing: EmployeeListing[];
  leaveTypeCountDTO: LeaveTypeCountDTO | null;
}

export interface AdminDashboardResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  result: AdminDashboardData;
}

export interface LeaveType {
  id: number;
  name: string;
}

export interface LeaveTypesResponse {
  isSuccess: boolean;
  responseMessage: string;
  errors: any;
  items: LeaveType[];
}

export interface LeaveRequest {
  id: number;
  fromDate: string;
  toDate: string;
  daysCount: number;
  leaveTypeId: number;
  leaveTypeName: string;
  leaveType: LeaveType;
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  isApproved: boolean;
  isRejected: boolean;
  approvalNotes: string;
  rejectionNotes: string;
  longDescription: string;
}

export interface LeaveStatusCount {
  pendingRequestCount: number;
  approveRequestCount: number;
  rejectedRequestCount: number;
}

export interface LeaveRequestParams extends PaginationParams {
  keyword?: string;
  employeeId?: number;
}

export interface LeaveStatusCountParams {
  employeeId?: number;
}

// Leave Request Details Types
export interface LeaveRequestDetailsResponse {
  fromDate: string;
  toDate: string;
  daysCount: number;
  isApproved: boolean;
  isRejected: boolean;
  approvedDateTime: string | null;
  rejectedDateTime: string | null;
  shortDescription: string;
  longDescription: string;
  approvalNotes: string;
  rejectionNotes: string;
  approvedByEmployeeId: number | null;
  approvedByEmployeeName: string | null;
  rejectedByEmployeeId: number | null;
  rejectedByEmployeeName: string | null;
  leaveTypeId: number;
  leaveTypeName: string;
}

// Create/Update Leave Request Types
export interface CreateUpdateLeaveRequestRequest {
  id?: number | null;
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  isHalfDay: boolean;
  longDescription: string;
}

export interface CreateUpdateLeaveRequestResponse {
  id: number;
}
