import { createApi } from "@reduxjs/toolkit/query/react";
import { storageService } from "../../services/storage";
import {
  baseQueryWithReauth,
  handleApiError,
  handleApiSuccess,
  TAG_TYPES,
  transformResponse,
} from "../../utils/api";
import {
  API_ENDPOINTS,
  BaseApiResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  UserDetails,
} from "../types/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.User],
  endpoints: (builder) => ({
    // LOGIN MOCK - Temporary mock implementation for development
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate a mock token
        const mockToken = `mock_token_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        // Mock user data
        const mockUserData: LoginResponse = {
          id: 1,
          employeeId: 1001,
          fullName: "John Doe",
          email: credentials.username.includes("@")
            ? credentials.username
            : `${credentials.username}@company.com`,
          imageUrl: "https://via.placeholder.com/150",
          username: credentials.username,
          token: mockToken,
          lastPasswordChange: new Date().toISOString(),
          allowedRoles: ["Employee", "User"],
          allowedModules: [
            { id: 1, name: "Dashboard" },
            { id: 2, name: "Leave Management" },
            { id: 3, name: "PMS" },
            { id: 4, name: "EFS" },
          ],
          allowedPagePermissions: [
            {
              id: 1,
              systemModule: { id: 1, name: "Dashboard" },
              name: "View Dashboard",
              canView: true,
              canCreate: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              id: 2,
              systemModule: { id: 2, name: "Leave Management" },
              name: "Leave Requests",
              canView: true,
              canCreate: true,
              canUpdate: true,
              canDelete: false,
            },
            {
              id: 3,
              systemModule: { id: 3, name: "PMS" },
              name: "Projects",
              canView: true,
              canCreate: true,
              canUpdate: true,
              canDelete: false,
            },
            {
              id: 4,
              systemModule: { id: 4, name: "EFS" },
              name: "Employee Forms",
              canView: true,
              canCreate: true,
              canUpdate: true,
              canDelete: false,
            },
          ],
        };

        return { data: mockUserData };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await storageService.setAccessToken(data.token);
          // await storageService.setRefreshToken(data.refreshToken); // Commented out - no refresh token in response
          // await storageService.setUserData(JSON.stringify(data));

          handleApiSuccess("Login successful");
        } catch (error) {
          handleApiError(error, "Login failed");
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.User, id: "CURRENT" }],
    }),

    // LOGIN - Commented out for now, will be uncommented later
    // login: builder.mutation<LoginResponse, LoginRequest>({
    //   query: (credentials) => ({
    //     url: API_ENDPOINTS.LOGIN,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   transformResponse: (response: BaseApiResponse<LoginResponse>) => {
    //     return transformResponse(response);
    //   },
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       await storageService.setAccessToken(data.token);
    //       // await storageService.setRefreshToken(data.refreshToken); // Commented out - no refresh token in response
    //       // await storageService.setUserData(JSON.stringify(data));

    //       handleApiSuccess("Login successful");
    //     } catch (error) {
    //       handleApiError(error, "Login failed");
    //     }
    //   },
    //   invalidatesTags: [{ type: TAG_TYPES.User, id: "CURRENT" }],
    // }),

    // REGISTER
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: API_ENDPOINTS.REGISTER,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: BaseApiResponse<LoginResponse>) => {
        return transformResponse(response);
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          await storageService.setAccessToken(data.token);
          // await storageService.setRefreshToken(data.refreshToken); // Commented out - no refresh token in response
          // await storageService.setUserData(JSON.stringify(data));

          handleApiSuccess("Registration successful");
        } catch (error) {
          handleApiError(error, "Registration failed");
        }
      },
      invalidatesTags: [{ type: TAG_TYPES.User, id: "CURRENT" }],
    }),

    // GET USER DETAILS
    getUserDetails: builder.query<UserDetails, void>({
      query: () => ({
        url: API_ENDPOINTS.USER_DETAILS,
        method: "GET",
      }),
      transformResponse: (response: BaseApiResponse<UserDetails>) => {
        return transformResponse(response);
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await storageService.setUserData(JSON.stringify(data));
        } catch (error) {
          handleApiError(error, "Failed to fetch user details");
        }
      },
      providesTags: [{ type: TAG_TYPES.User, id: "CURRENT" }],
    }),

    // FORGOT PASSWORD
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.FORGOT_PASSWORD,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseApiResponse<void>) => {
        return transformResponse(response);
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          handleApiSuccess("Password reset link sent to your email");
        } catch (error) {
          handleApiError(error, "Failed to send password reset link");
        }
      },
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: BaseApiResponse<void>) => {
        return transformResponse(response);
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          handleApiSuccess("Password reset successful");
        } catch (error) {
          handleApiError(error, "Failed to reset password");
        }
      },
    }),

    // REFRESH TOKEN - Commented out since API doesn't provide refresh tokens
    // refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
    //   query: (data) => ({
    //     url: API_ENDPOINTS.REFRESH_TOKEN,
    //     method: "POST",
    //     body: data,
    //   }),
    //   transformResponse: (response: BaseApiResponse<LoginResponse>) => {
    //     return transformResponse(response);
    //   },
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;

    //       await storageService.setAccessToken(data.token);
    //       await storageService.setRefreshToken(data.refreshToken);
    //       await storageService.setUserData(JSON.stringify(data.user));
    //     } catch {
    //       await storageService.clearTokens();
    //     }
    //   },
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  // useRefreshTokenMutation, // Commented out since refresh token endpoint is disabled
} = authApi;
