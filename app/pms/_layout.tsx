import AuthGuard from "@/components/auth/AuthGuard";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function PMSLayout() {
  const { palette } = useTheme();

  return (
    <AuthGuard requireAuth={true}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: palette.background.primary,
          },
          tabBarActiveTintColor: palette.primary.main,
          tabBarInactiveTintColor: palette.text.secondary,
          headerStyle: {
            backgroundColor: palette.background.primary,
          },
          headerTintColor: palette.text.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarLabel: "Dashboard",
            headerTitle: "PMS Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: "Projects",
            tabBarLabel: "Projects",
            headerTitle: "Projects",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="folder-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            tabBarLabel: "Reports",
            headerTitle: "Reports",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
