import { Stack } from "expo-router";

export default function LeaveManagementLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="leave-request" />
      <Stack.Screen name="approval-request" />
    </Stack>
  );
}
