import { router, Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

// ** Utils
import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";

// ** Third Party packages
import { SafeAreaView } from "react-native-safe-area-context";

// ** Components
import BottomBar from "@/components/navigation/BottomBar/BottomBar";
import { AMSBottomTabs } from "@/components/navigation/BottomBar/tabs/AMSBottomTab";

export default function AMSLayout() {
  const { palette } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  useEffect(() => {
    const currentPath = pathname.replace("/ams/", "");

    if (currentPath === "" || currentPath === "Dashboard") {
      setActiveTab("Dashboard");
    } else if (currentPath === "purchaseOrder") {
      setActiveTab("purchaseOrder");
    } else if (currentPath === "AssetsManagement/assets") {
      setActiveTab("AssetsManagement/assets");
    } else if (currentPath === "AssetsManagement/assetTypes") {
      setActiveTab("AssetsManagement/assetTypes");
    } else if (currentPath === "vendors") {
      setActiveTab("vendors");
    } else if (currentPath === "clearance") {
      setActiveTab("clearance");
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
          <Stack.Screen name="purchaseOrder" />
          <Stack.Screen name="AssetsManagement" />
          <Stack.Screen name="vendors" />
          <Stack.Screen name="clearance" />
        </Stack>
        <BottomBar
          tabs={AMSBottomTabs}
          activeTab={activeTab}
          onTabPress={(tabId: string) => {
            setActiveTab(tabId);
            router.push(`/ams/${tabId}` as any);
          }}
        />
      </SafeAreaView>
    </AuthGuard>
  );
}
