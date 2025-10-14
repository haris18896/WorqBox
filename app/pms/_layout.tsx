import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PMSLayout() {
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
          <Stack.Screen name="projects" />
          <Stack.Screen name="reports" />
        </Stack>
      </SafeAreaView>
    </AuthGuard>
  );
}
