import { useAppDispatch, useAppSelector } from "@/store";
import {
  initializeAuth,
  selectIsAuthenticated,
  selectIsInitialized,
} from "@/store/slices/authSlice";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { Loading } from "../ui";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <Loading visible={true} />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Redirect href="/pms" />;
  }

  return <>{children}</>;
}
