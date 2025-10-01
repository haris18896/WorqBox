import { getVisibleNavigationItems } from "@/components/navigation/SideBar/navigationConfig";
import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useAppSelector } from "@/store";
import { selectUser } from "@/store/slices/authSlice";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const { palette } = useTheme();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  // Get user role and visible navigation items
  const userRole = user?.allowedRoles?.[0] || "employee";
  const visibleItems = getVisibleNavigationItems(userRole);

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  const quickAccessItems = [
    {
      title: "Project Management",
      subtitle: "Manage projects and reports",
      icon: "folder",
      route: "/pms",
      color: palette.primary.main,
    },
    {
      title: "Employee Services",
      subtitle: "HR and employee services",
      icon: "user-check",
      route: "/efs",
      color: palette.secondary.main,
    },
    {
      title: "My Profile",
      subtitle: "View and edit profile",
      icon: "user",
      route: "/profile",
      color: palette.info.main,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: spacing.lg,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.md,
    },
    quickAccessGrid: {
      gap: spacing.md,
    },
    quickAccessItem: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.lg,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },
    itemContent: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    itemSubtitle: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    chevron: {
      marginLeft: spacing.sm,
    },
    statsCard: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.lg,
      borderRadius: 12,
      marginTop: spacing.lg,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statsTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.sm,
    },
    statsText: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.background.primary }}
    >
      <View style={styles.container}>
        <BarHeader title="WorqBox Dashboard" variant="large" />

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickAccessItem}
                onPress={() => handleNavigate(item.route)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <Feather
                    name={item.icon as any}
                    size={24}
                    color={item.color}
                  />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={palette.text.tertiary}
                  style={styles.chevron}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Getting Started</Text>
            <Text style={styles.statsText}>
              Use the menu button (☰) in the top-left corner or swipe from the
              left edge to open the navigation drawer. From there, you can
              access all modules and features based on your permissions.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
