import { BarHeader, ComingUp } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
    containerStyling: {
      justifyContent: "center",
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Salary Calculator" variant="large" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.containerStyling}
      >
        <ComingUp
          title="Coming Up Soon"
          subtitle="We're working on something amazing!"
          icon="rocket-outline"
          estimatedDate="2025-12-31"
          features={[
            "Salary Lists",
            "Add Salary",
            "Edit Salary",
            "Delete Salary",
          ]}
          progress={10}
          variant="detailed"
        />
      </ScrollView>
    </View>
  );
}
