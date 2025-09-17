import { BarHeader } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LeaveRequest() {
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
          <Text style={styles.cardTitle}>Create Leave Request</Text>
          <Text style={styles.cardDescription}>
            Submit a new leave request by filling out the required information
            including dates, reason, and type of leave.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leave Types</Text>
          <Text style={styles.cardDescription}>
            Choose from various leave types including annual leave, sick leave,
            maternity/paternity leave, and emergency leave.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leave Balance</Text>
          <Text style={styles.cardDescription}>
            Check your current leave balance and ensure you have sufficient
            leave days available for your request.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
