import AuthGuard from "@/components/auth/AuthGuard";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function EFSLayout() {
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
            headerTitle: "EFS Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="leave-management"
          options={{
            title: "Leave Management",
            tabBarLabel: "Leave",
            headerTitle: "Leave Management",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="salary-calculator"
          options={{
            title: "Salary Calculator",
            tabBarLabel: "Salary",
            headerTitle: "Salary Calculator",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="survey-forms"
          options={{
            title: "Survey Forms",
            tabBarLabel: "Survey",
            headerTitle: "Survey Forms",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
