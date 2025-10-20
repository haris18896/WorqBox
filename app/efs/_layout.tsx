import { router, Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";

// ** Utils
import { AuthGuard } from "@/acl";
import { useTheme } from "@/theme";

// ** Third Party packages
import { SafeAreaView } from "react-native-safe-area-context";

// ** Components
import BottomBar from "@/components/navigation/BottomBar/BottomBar";
import { EFSBottomTabs } from "@/components/navigation/BottomBar/tabs/efsBottomTab";

export default function EFSLayout() {
  const { palette } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  useEffect(() => {
    const currentPath = pathname.replace("/efs/", "");

    if (currentPath === "" || currentPath === "Dashboard") {
      setActiveTab("Dashboard");
    } else if (currentPath === "leave-management/leave-request") {
      setActiveTab("leave-management/leave-request");
    } else if (currentPath === "leave-management/approval-request") {
      setActiveTab("leave-management/approval-request");
    } else if (currentPath === "salary-calculator") {
      setActiveTab("salary-calculator");
    } else if (currentPath === "survey-forms") {
      setActiveTab("survey-forms");
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
          <Stack.Screen name="leave-management" />
          <Stack.Screen name="salary-calculator" />
          <Stack.Screen name="survey-forms" />
        </Stack>

        <BottomBar
          tabs={EFSBottomTabs}
          activeTab={activeTab}
          onTabPress={(tabId: string) => {
            setActiveTab(tabId);
            router.push(`/efs/${tabId}` as any);
          }}
        />
      </SafeAreaView>
    </AuthGuard>
  );
}
