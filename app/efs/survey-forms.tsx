import { useTheme } from "@/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SurveyForms() {
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
          <Text style={styles.cardTitle}>Survey Forms</Text>
          <Text style={styles.cardDescription}>
            Participate in company surveys and provide valuable feedback to help
            improve workplace culture and processes.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Employee Feedback</Text>
          <Text style={styles.cardDescription}>
            Share your thoughts on various aspects of your work experience
            including management, facilities, and benefits.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance Surveys</Text>
          <Text style={styles.cardDescription}>
            Complete performance-related surveys including self-assessment and
            peer review forms.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Training Feedback</Text>
          <Text style={styles.cardDescription}>
            Provide feedback on training programs and suggest areas for
            improvement or new training topics.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
