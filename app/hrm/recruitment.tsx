import { BarHeader, ComingUp } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Recruitment() {
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
      <BarHeader title="Survey" variant="default" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.containerStyling}
      >
        <ComingUp
          title="Recuritment"
          subtitle="Manage your recruitment process with ease."
          icon="rocket-outline"
          estimatedDate="2025-12-31"
          features={[
            "Recuritment Lists",
            "Add Recuritment",
            "Edit Recuritment",
            "Delete Recuritment",
          ]}
          progress={10}
          variant="detailed"
        />
      </ScrollView>
    </View>
  );
}
