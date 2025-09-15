import { router } from "expo-router";
import { useCallback } from "react";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} from "../store/api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearError, logoutUser, setUser } from "../store/slices/authSlice";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "../types/api";

/**
 * Custom hook for authentication actions
 * Provides easy-to-use methods for login, register, logout, etc.
 */
export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  // API mutations
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();

  /**
   * Login user with credentials
   */
  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        dispatch(clearError());
        const result = await loginMutation(credentials).unwrap();

        // Set user in state
        dispatch(setUser(result.user));

        // Navigate to main app (you can update this path as needed)
        router.replace("/");

        return result;
      } catch (error) {
        throw error;
      }
    },
    [loginMutation, dispatch]
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (userData: RegisterRequest) => {
      try {
        dispatch(clearError());
        const result = await registerMutation(userData).unwrap();

        // Set user in state
        dispatch(setUser(result.user));

        // Navigate to main app (you can update this path as needed)
        router.replace("/");

        return result;
      } catch (error) {
        throw error;
      }
    },
    [registerMutation, dispatch]
  );

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      // Navigate to auth screen
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, navigate to auth
      router.replace("/auth/login");
    }
  }, [dispatch]);

  /**
   * Send forgot password email
   */
  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      try {
        await forgotPasswordMutation(data).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [forgotPasswordMutation]
  );

  /**
   * Reset password with token
   */
  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      try {
        await resetPasswordMutation(data).unwrap();

        // Navigate to login after successful password reset
        router.replace("/auth/login");
      } catch (error) {
        throw error;
      }
    },
    [resetPasswordMutation]
  );

  /**
   * Clear authentication errors
   */
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    ...authState,

    // Loading states
    isLoginLoading,
    isRegisterLoading,
    isForgotPasswordLoading,
    isResetPasswordLoading,

    // Actions
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearAuthError,
  };
};
