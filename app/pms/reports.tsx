import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Reports() {
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
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Reports</Text>
          <Text style={styles.cardDescription}>
            Generate comprehensive reports on project progress, resource
            utilization, and team performance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Reports</Text>
          <Text style={styles.cardDescription}>
            Track project budgets, expenses, and profitability across all your
            projects.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Time Reports</Text>
          <Text style={styles.cardDescription}>
            Monitor time spent on projects, track billable hours, and analyze
            productivity metrics.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client Reports</Text>
          <Text style={styles.cardDescription}>
            Generate client-specific reports showing project status,
            deliverables, and milestones.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
