import { useTheme } from "@/theme";
import { Stack } from "expo-router";

export default function LeaveManagementLayout() {
  const { palette } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: palette.background.primary,
        },
        headerTintColor: palette.text.primary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Leave Management",
        }}
      />
      <Stack.Screen
        name="leave-request"
        options={{
          title: "Leave Request",
        }}
      />
      <Stack.Screen
        name="approval-request"
        options={{
          title: "Approval Request",
        }}
      />
    </Stack>
  );
}
