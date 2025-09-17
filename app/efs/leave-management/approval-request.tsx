import { BarHeader } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ApprovalRequest() {
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
      <BarHeader title="WorqBox Dashboard" variant="large" />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pending Approvals</Text>
          <Text style={styles.cardDescription}>
            Review and approve leave requests from team members. View request
            details and make informed decisions.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Approval History</Text>
          <Text style={styles.cardDescription}>
            Track previously approved or rejected leave requests with detailed
            approval history and comments.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Team Calendar</Text>
          <Text style={styles.cardDescription}>
            View team availability and ensure adequate coverage before approving
            leave requests.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
