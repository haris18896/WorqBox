import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser, selectUser } from "@/store/slices/authSlice";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PMSDashboard() {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace("/auth/login");
  };

  const handleNavigateToEFS = () => {
    router.push("/efs");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: palette.background.secondary,
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 10,
    },
    cardDescription: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.primary.main,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    actionButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 10,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.error.main,
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
    },
    logoutButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Project Management" variant="large" />

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dashboard Overview</Text>
          <Text style={styles.cardDescription}>
            Get insights into your projects, track progress, and manage your
            team effectively.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Text style={styles.cardDescription}>
            Access frequently used features and navigate to different modules.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleNavigateToEFS}
        >
          <Ionicons
            name="people-outline"
            size={24}
            color={palette.text.inverse}
          />
          <Text style={styles.actionButtonText}>Switch to EFS Module</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={palette.text.inverse}
          />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
