import Loading from "@/components/ui/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  initializeAuth,
  selectIsAuthenticated,
  selectIsInitialized,
} from "@/store/slices/authSlice";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
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

  if (isAuthenticated) {
    return <Redirect href="/pms" />;
  }

  return <Redirect href="/auth/login" />;
}
