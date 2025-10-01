import { useToast } from "@/hooks/useToast";
import { useTheme } from "@/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ToastExample: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: palette.background.default,
    },
    button: {
      backgroundColor: palette.primary.main,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      marginVertical: 8,
      minWidth: 200,
    },
    buttonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast Notifications</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: palette.success.main }]}
        onPress={() => showSuccess("Operation completed successfully!")}
      >
        <Text style={styles.buttonText}>Show Success Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: palette.error.main }]}
        onPress={() => showError("Something went wrong!")}
      >
        <Text style={styles.buttonText}>Show Error Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: palette.info.main }]}
        onPress={() => showInfo("Here's some information")}
      >
        <Text style={styles.buttonText}>Show Info Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: palette.warning.main }]}
        onPress={() => showWarning("Please be careful!")}
      >
        <Text style={styles.buttonText}>Show Warning Toast</Text>
      </TouchableOpacity>
    </View>
  );
};
