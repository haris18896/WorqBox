import React, { useEffect, useState } from "react";

// ** Utils
import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";

// ** Third Party Components
import { router, Stack, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// ** Components
import BottomBar from "@/components/navigation/BottomBar/BottomBar";
import { PMSBottomTabs } from "@/components/navigation/BottomBar/tabs/pmsBottomTab";

export default function PMSLayout() {
  const { palette } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  useEffect(() => {
    const currentPath = pathname.replace("/pms/", "");

    if (currentPath === "" || currentPath === "Dashboard") {
      setActiveTab("Dashboard");
    } else if (currentPath === "projects/main") {
      setActiveTab("projects/main");
    } else if (currentPath === "projects/client") {
      setActiveTab("projects/client");
    } else if (currentPath === "reports") {
      setActiveTab("reports");
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
          <Stack.Screen name="projects" />
          <Stack.Screen name="reports" />
        </Stack>

        <BottomBar
          tabs={PMSBottomTabs}
          activeTab={activeTab}
          onTabPress={(tabId: string) => {
            setActiveTab(tabId);
            router.push(`/pms/${tabId}` as any);
          }}
        />
      </SafeAreaView>
    </AuthGuard>
  );
}
