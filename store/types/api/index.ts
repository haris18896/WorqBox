// Base API Types
export interface BaseApiResponse<T = any> {
  result: T;
  isSuccess: boolean;
  errors?: string[];
  message?: string;
  responseMessage?: string;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  paginationInfo: PaginationInfo;
}

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: boolean;
}

// Auth API Types
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  id: number;
  employeeId: number;
  fullName: string;
  email: string;
  imageUrl?: string;
  username: string;
  token: string;
  lastPasswordChange?: string;
  allowedRoles: string[];
  allowedModules: {
    id: number;
    name: string;
  }[];
  allowedPagePermissions: {
    id: number;
    systemModule: {
      id: number;
      name: string;
    };
    name: string;
    canView: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
}

export interface UserDetails {
  id: number;
  employeeId: number;
  fullName: string;
  email: string;
  imageUrl?: string;
  username: string;
  allowedRoles: string[];
  allowedModules: {
    id: number;
    name: string;
  }[];
  allowedPagePermissions: {
    id: number;
    systemModule: {
      id: number;
      name: string;
    };
    name: string;
    canView: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

// Dashboard API Types
export interface DashboardData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalLeaves: number;
  approvedLeaves: number;
  pendingLeaves: number;
  rejectedLeaves: number;
  upcomingEvents: DashboardEvent[];
  recentActivities: DashboardActivity[];
}

export interface DashboardEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: "meeting" | "deadline" | "event" | "holiday";
  priority: "low" | "medium" | "high";
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "task" | "leave" | "system";
  status: "info" | "success" | "warning" | "error";
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "completed" | "cancelled";
  dueDate?: string;
  assignedTo: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarTask {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  type: "task" | "meeting" | "event";
  priority: "low" | "medium" | "high";
  status: "scheduled" | "completed" | "cancelled";
}

// Leave Management API Types
export interface LeaveRequest {
  id?: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status?: LeaveStatus;
  appliedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedReason?: string;
}

export interface LeaveType {
  id: string;
  name: string;
  description?: string;
  maxDaysPerYear: number;
  carryForward: boolean;
  isActive: boolean;
  color?: string;
}

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface LeaveRequestListItem extends LeaveRequest {
  leaveTypeName: string;
  employeeName: string;
  statusLabel: string;
  canCancel: boolean;
  canEdit: boolean;
}

export interface LeaveRequestListParams extends PaginationParams {
  employeeId?: string;
  fromDate?: string;
  toDate?: string;
  status?: LeaveStatus;
}

// Error Types
export interface ApiError {
  status: number;
  data: {
    message?: string;
    errors?: string[];
    isSuccess: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// Employee API Types

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/Account/login",
  REGISTER: "/Account/Register",
  USER_DETAILS: "/Account/GetUserDetails",
  FORGOT_PASSWORD: "/Account/ForgotPassword",
  RESET_PASSWORD: "/Account/ChangePassword",
  REFRESH_TOKEN: "/Account/RefreshToken",

  // Dashboard endpoints
  MY_DASHBOARD: "/Dashboard/GetMyDashboard",
  MY_TASKS: "/Dashboard/GetMyTasks",
  MY_CALENDAR_TASKS: "/Dashboard/GetMyCalenderTasks",

  // Leave endpoints
  MY_LEAVE_REQUESTS: "/Leave/GetMyRequestListing",
  LEAVE_TYPES: "/LeaveType/GetLeaveTypes",
  CREATE_LEAVE_REQUEST: "/Leave/CreateUpdateLeaveRequest",
  UPDATE_LEAVE_REQUEST: "/Leave/CreateUpdateLeaveRequest",
  CANCEL_LEAVE_REQUEST: "/Leave/CancelLeaveRequest",

  // PMS (Project Management System)
  GET_MAIN_PROJECTS: "/Project/GetProjects",
  GET_PROJECT_DETAILS: "/Project/GetProjectDetails",
  GET_CLIENT_PROJECTS: "/ProjectClient/GetProjectClients",
  GET_PROJECT_CLIENTS: "/ProjectClient/GetProjectClients",
  CREATE_UPDATE_CLIENT_PROJECT: "/ProjectClient/CreateUpdateProjectClient",
  DELETE_PROJECT_CLIENT: "/ProjectClient/DeleteProjectClient",
  CREATE_UPDATE_PROJECT: "/Project/CreateUpdateProject",
  DELETE_PROJECT: "/Project/DeleteProject",
  GET_PROJECTS_LOOKUP: "/Lookup/GetProjects",
  GET_EMPLOYEES_LOOKUP: "/Lookup/GetEmployees",
  REPORTING_STATS: "/Reporting/ReportingStats",
  GET_TIME_LOGS_REPORTING: "/Reporting/GetTimeLogsReporting",
  EXPORT_TIME_LOGS_CSV: "/Reporting/ExportTimeLogsReporting",
  EXPORT_TIME_LOGS_PDF: "/Reporting/ExportTimeLogsReportingPdf",

  // EFS (Employee Facilitation System)
  GET_ADMIN_DASHBOARD: "/Dashboard/GetAdminDashboard",
  GET_MY_LEAVE_REQUESTS: "/Leave/GetMyRequestListing",
  GET_LEAVE_REQUESTS_BY_ADMIN: "/Leave/GetLeaveRequestsByAdmin",
  GET_LEAVE_TYPES: "/Lookup/GetLeaveTypes",
  GET_LEAVE_STATUS_COUNT: "/Dashboard/GetLeaveStatusCount",
  GET_LEAVE_STATUS_COUNT_ADMIN: "/Dashboard/GetLeaveStatusCountAdmin",
  GET_LEAVE_REQUEST_DETAILS: "/Leave/GetLeaveRequestDetails",
  CREATE_UPDATE_LEAVE_REQUEST: "/Leave/CreateUpdateLeaveRequest",
  DELETE_LEAVE_REQUEST: "/Leave/DeleteLeaveRequest",

  // AMS (Asset Management System)
  GET_AMS_DASHBOARD: "/Asset/stats",
  GET_PURCHASE_ORDERS: "/PurchaseOrder",
  GET_VENDORS: "/Vendor/Get",
  GET_VENDOR_BY_ID: "/Vendor/GetById",
  CREATE_UPDATE_VENDOR: "/Vendor/CreateUpdate",
  GET_CLEARANCE_ASSIGNMENTS: "/Clearance/employee-assignments",
  GET_ASSET_CATEGORIES: "/AssetCategory",
  GET_ASSETS: "/Asset/GetAssets",
  GET_ASSET_BY_ID: "/Asset",
  VALIDATE_SERIAL: "/Asset/validate-serial",
  CREATE_UPDATE_ASSET: "/Asset/CreateUpdateAsset",
  ASSIGN_ASSET: "/Asset",

  // HRM (Human Resource Management)
  GET_EMPLOYEE_COUNT_WITH_GENDER: "/Dashboard/GetCountEmployeeWithGender",
  GET_EMPLOYEE_COUNT_BY_DEPARTMENT: "/Dashboard/GetEmployeeCountByDepartment",
  GET_TODAY_PRESENT_ABSENT_EMPLOYEES:
    "/Dashboard/GetTodayPresentAbsentEmployees",
  GET_HOLIDAYS: "/Holiday/GetHolidays",
  GET_EMPLOYEES: "/Employee/GetEmployees",
};
