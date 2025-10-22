import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Toast from "react-native-toast-message";
import { storageService } from "../services/storage";
import { logout } from "../store/slices/authSlice";
import { ApiError, BaseApiResponse } from "../store/types/api";

// Base URL for the API
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://rq-worqbox-api-dev2.azurewebsites.net/api/v1";

// https://rq-worqbox-api-dev2.azurewebsites.net/api/v1

// Custom base query with automatic token injection and refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json, text/plain, */*");
    headers.set("Connection", "keep-alive");

    const apiKey = process.env.EXPO_PUBLIC_API_KEY || "";
    if (apiKey) {
      headers.set("x-api-key", apiKey);
    }

    const token = await storageService.getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with automatic token refresh and error handling
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.data &&
    typeof result.data === "object" &&
    "isSuccess" in result.data
  ) {
    const apiResponse = result.data as BaseApiResponse<any>;
    if (!apiResponse.isSuccess) {
      return {
        error: {
          status: 400,
          data: {
            message:
              apiResponse.responseMessage ||
              apiResponse.message ||
              "API request failed",
            errors: apiResponse.errors,
            isSuccess: false,
          },
        },
      };
    }
  }

  // Commented out refresh token logic since API doesn't provide refresh tokens
  if (result.error && result.error.status === 401) {
    // we don't have refresh tokens, just logout the user
    api.dispatch(logout());
    await storageService.clearTokens();
  }

  // Original refresh token logic (commented out)
  // if (result.error && result.error.status === 401) {
  //   console.log("Token expired, attempting to refresh...");

  //   // Try to refresh the token
  //   const refreshToken = await storageService.getRefreshToken();

  //   if (refreshToken) {
  //     const refreshResult = await baseQuery(
  //       {
  //         url: "/Account/RefreshToken",
  //         method: "POST",
  //         body: { refreshToken },
  //       },
  //       api,
  //       extraOptions
  //     );

  //     if (refreshResult.data) {
  //       const { token, refreshToken: newRefreshToken } = (
  //         refreshResult.data as any
  //       ).result;

  //       // Store new tokens
  //       await storageService.setAccessToken(token);
  //       await storageService.setRefreshToken(newRefreshToken);

  //       // Retry the original query
  //       result = await baseQuery(args, api, extraOptions);
  //     } else {
  //       // Refresh failed, logout user
  //       api.dispatch(logout());
  //       await storageService.clearTokens();
  //     }
  //   } else {
  //     // No refresh token, logout user
  //     api.dispatch(logout());
  //     await storageService.clearTokens();
  //   }
  // }

  return result;
};

// Transform API response to extract result data
export const transformResponse = <T>(response: BaseApiResponse<T>): T => {
  return response.result;
};

// Transform API error to a more usable format
export const transformError = (error: FetchBaseQueryError): ApiError => {
  if ("status" in error) {
    return {
      status: error.status as number,
      data: error.data as any,
    };
  }

  return {
    status: 500,
    data: {
      message: "Network error occurred",
      isSuccess: false,
    },
  };
};

// Show toast notification for API errors
export const handleApiError = (
  error: any,
  defaultMessage = "An error occurred"
) => {
  let message = defaultMessage;

  if (error?.data?.message) {
    message = error.data.message;
  } else if (error?.data?.errors && Array.isArray(error.data.errors)) {
    message = error.data.errors.join(", ");
  } else if (error?.message) {
    message = error.message;
  }

  // Show error toast notification
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
  });

  console.log("API Error:", message);
  return message;
};

// Show success notification
export const handleApiSuccess = (message: string) => {
  // Show success toast notification
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
  });

  console.log("API Success:", message);
};

// Create cache tags for RTK Query
export const createCacheKey = (type: string, id?: string | number) => {
  return id ? `${type}-${id}` : type;
};

// Common RTK Query tag types
export const TAG_TYPES = {
  User: "User",
  Dashboard: "Dashboard",
  Tasks: "Tasks",
  CalendarTasks: "CalendarTasks",
  LeaveRequests: "LeaveRequests",
  LeaveTypes: "LeaveTypes",

  // PMS
  MainProjects: "MainProjects",
  ClientProjects: "ClientProjects",
  Reports: "Reports",
  Employees: "Employees",
  TimeLogs: "TimeLogs",
} as const;

// Utility to create invalidation tags
export const createInvalidationTags = (types: string[]) => {
  return types.map((type) => ({ type }));
};

// Utility to create provision tags
export const createProvisionTags = <T extends { id: string | number }>(
  type: string,
  data: T[]
) => {
  return [{ type, id: "LIST" }, ...data.map((item) => ({ type, id: item.id }))];
};
