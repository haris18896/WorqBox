import { router, Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

// ** Utils
import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";

// ** Third Party packages
import BottomBar from "@/components/navigation/BottomBar/BottomBar";
import { HRMBottomTabs } from "@/components/navigation/BottomBar/tabs/HRMBottomTab";
import { SafeAreaView } from "react-native-safe-area-context";

// ** Components

export default function HRMLayout() {
  const { palette } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  useEffect(() => {
    const currentPath = pathname.replace("/hrm/", "");

    if (currentPath === "" || currentPath === "Dashboard") {
      setActiveTab("Dashboard");
    } else if (currentPath === "employees") {
      setActiveTab("employees");
    } else if (currentPath === "recruitment") {
      setActiveTab("recruitment");
    } else if (currentPath === "resumeBank") {
      setActiveTab("resumeBank");
    } else if (currentPath === "configurations") {
      setActiveTab("configurations/roles");
    }
  }, [pathname]);
  
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
          <Stack.Screen name="employees" />
          <Stack.Screen name="recruitment" />
          <Stack.Screen name="resumeBank" />
        </Stack>
        <BottomBar
          tabs={HRMBottomTabs}
          activeTab={activeTab}
          onTabPress={(tabId: string) => {
            setActiveTab(tabId);
            router.push(`/hrm/${tabId}` as any);
          }}
        />
      </SafeAreaView>
    </AuthGuard>
  );
}
