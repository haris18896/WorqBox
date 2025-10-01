import { AuthGuard } from "@/acl";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <AuthGuard requireAuth={false}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </AuthGuard>
  );
}
