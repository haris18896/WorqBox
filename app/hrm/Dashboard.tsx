import { BarHeader } from "@/components/ui";
import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HRMDashboard() {
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
      <BarHeader title="Survey" variant="default" />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Humar Resource Dashboard</Text>
          <Text style={styles.cardDescription}>
            Participate in company surveys and provide valuable feedback to help
            improve workplace culture and processes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
