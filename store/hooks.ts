import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to get authentication state
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

// Custom hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

// Custom hook to get current user
export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user);
};

// Custom hook to get loading states from multiple APIs
export const useApiLoading = () => {
  return useAppSelector((state) => ({
    auth: false,
    dashboard: false,
    leave: false,
  }));
};
