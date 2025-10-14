import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AMSLayout() {
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
          <Stack.Screen name="index" />
          <Stack.Screen name="purchaseOrder" />
          <Stack.Screen name="AssetsManagement" />
          <Stack.Screen name="vendors" />
          <Stack.Screen name="clearance" />
        </Stack>
      </SafeAreaView>
    </AuthGuard>
  );
}
