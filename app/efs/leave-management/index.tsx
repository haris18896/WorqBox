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

export default function LeaveManagement() {
  const { palette } = useTheme();
  const router = useRouter();

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
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leave Management Overview</Text>
          <Text style={styles.cardDescription}>
            Manage your leave requests, view leave balance, and track approval
            status.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/efs/leave-management/leave-request")}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={palette.text.inverse}
          />
          <Text style={styles.actionButtonText}>Create Leave Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/efs/leave-management/approval-request")}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color={palette.text.inverse}
          />
          <Text style={styles.actionButtonText}>Approval Requests</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
