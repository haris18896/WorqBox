import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Utils
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";

// ** Third Party Packages
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ** UI
import { Button } from "@/components/ui";
import BarHeader from "@/components/ui/BarHeader/BarHeader";

// ** Store
import { useAppSelector } from "@/store";
import { selectUser } from "@/store/slices/authSlice";

export default function Profile() {
  const { palette, toggleTheme, isDark } = useTheme();
  const user = useAppSelector(selectUser);

  const profileSections = [
    {
      title: "Personal Information",
      items: [
        { label: "Full Name", value: user?.fullName || "Not provided" },
        { label: "Email", value: user?.email || "Not provided" },
        {
          label: "Employee ID",
          value: user?.employeeId?.toString() || "Not provided",
        },
        { label: "Username", value: user?.username || "Not provided" },
      ],
    },
    {
      title: "Role & Permissions",
      items: [
        {
          label: "Primary Role",
          value: user?.allowedRoles?.[0] || "Not assigned",
        },
        { label: "All Roles", value: user?.allowedRoles?.join(", ") || "None" },
        {
          label: "Modules Access",
          value: user?.allowedModules?.map((m) => m.name).join(", ") || "None",
        },
      ],
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
    themeToggle: {
      position: "absolute",
      top: 15,
      right: 15,
    },
    profileHeader: {
      position: "relative",
      alignItems: "center",
      backgroundColor: palette.surface.secondary,
      padding: spacing.xl,
      borderRadius: 12,
      marginBottom: spacing.lg,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: palette.primary.main,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    avatarImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    profileEmail: {
      fontSize: 16,
      color: palette.text.secondary,
    },
    section: {
      backgroundColor: palette.surface.secondary,
      borderRadius: 12,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.md,
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    label: {
      fontSize: 14,
      color: palette.text.secondary,
      flex: 1,
    },
    value: {
      fontSize: 14,
      color: palette.text.primary,
      fontWeight: "500",
      flex: 2,
      textAlign: "right",
    },
    actionButton: {
      backgroundColor: palette.primary.main,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: 8,
      alignItems: "center",
      marginTop: spacing.lg,
    },
    actionButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <BarHeader title="My Profile" variant="default" />

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={24}
              color={palette.text.primary}
            />
          </TouchableOpacity>
          <View style={styles.avatar}>
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.avatarImage}
              />
            ) : (
              <Feather name="user" size={32} color={palette.text.inverse} />
            )}
          </View>
          <Text style={styles.profileName}>
            {user?.fullName || "User Name"}
          </Text>
          <Text style={styles.profileEmail}>
            {user?.email || "user@example.com"}
          </Text>
        </View>

        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                style={[
                  styles.infoItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                ]}
              >
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            ))}
          </View>
        ))}

        <Button
          title="Save Changes"
          onPress={() => console.log("update")}
          // loading={isLoginLoading}
          // disabled={isLoginLoading}
          fullWidth
          variant="secondary"
          size="medium"
          leftIcon={
            <Ionicons name="save" size={24} color={palette.text.inverse} />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
