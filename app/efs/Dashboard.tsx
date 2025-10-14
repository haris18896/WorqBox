import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function EFSDashboard() {
  const { palette } = useTheme();

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
      <BarHeader title="Employee Facilitation" variant="large" />

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>EFS Dashboard</Text>
          <Text style={styles.cardDescription}>
            Access employee services, manage leave requests, and utilize various
            employee tools.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
