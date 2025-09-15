/**
 * API Configuration Constants
 */

// Environment-based API URL
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://your-api-url.com/api";

// API Timeout settings
export const API_TIMEOUT = 30000; // 30 seconds

// Retry configuration
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second

// Cache configuration
export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 2 * 60 * 1000; // 2 minutes

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Token refresh configuration
export const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

// API Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Your session has expired. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful",
  LOGOUT: "Logout successful",
  REGISTER: "Registration successful",
  PASSWORD_RESET: "Password reset successful",
  PASSWORD_RESET_EMAIL_SENT: "Password reset email sent",
  PROFILE_UPDATED: "Profile updated successfully",
  LEAVE_CREATED: "Leave request submitted successfully",
  LEAVE_UPDATED: "Leave request updated successfully",
  LEAVE_CANCELLED: "Leave request cancelled successfully",
  TASK_COMPLETED: "Task completed successfully",
  TASK_UPDATED: "Task updated successfully",
} as const;
