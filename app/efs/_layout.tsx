import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EFSLayout() {
  const { palette } = useTheme();

  return (
    <AuthGuard requireAuth={true}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: palette.background.primary,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Dashboard" />
          <Stack.Screen name="leave-management" />
          <Stack.Screen name="salary-calculator" />
          <Stack.Screen name="survey-forms" />
        </Stack>
      </SafeAreaView>
    </AuthGuard>
  );
}
