import { BarHeader } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SalaryCalculator() {
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
      <BarHeader title="Salary Calculator" variant="large" />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Salary Calculator</Text>
          <Text style={styles.cardDescription}>
            Calculate your net salary based on various parameters including
            basic salary, allowances, and deductions.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tax Calculations</Text>
          <Text style={styles.cardDescription}>
            Understand tax implications and get detailed breakdown of tax
            calculations based on current tax slabs.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Allowances & Deductions</Text>
          <Text style={styles.cardDescription}>
            Configure various allowances like HRA, transport, and medical
            allowances along with applicable deductions.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Salary Slip Generation</Text>
          <Text style={styles.cardDescription}>
            Generate detailed salary slips with all components clearly itemized
            for your records.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
