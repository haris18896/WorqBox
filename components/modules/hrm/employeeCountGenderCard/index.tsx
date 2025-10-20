import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeCountGenderCardProps } from "./index.d";

export default function EmployeeCountGenderCard({
  data,

  error,
  onPress,
}: EmployeeCountGenderCardProps) {
  const { palette } = useTheme();

  const handlePress = () => {
    onPress?.();
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: palette.border.primary,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${palette.secondary.light}30`,
      justifyContent: "center",
      alignItems: "center",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: palette.text.secondary,
      textAlign: "center",
    },
    genderStatsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      padding: 12,
    },
    genderStatItem: {
      alignItems: "center",
      flex: 1,
    },
    genderIcon: {
      marginBottom: 4,
    },
    genderValue: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 2,
    },
    genderLabel: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    errorContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    errorText: {
      fontSize: 14,
      color: palette.error.main,
      textAlign: "center",
    },
  });

  if (error) {
    return (
      <View style={styles.card}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={palette.error.main}
          />
          <Text style={styles.errorText}>
            Failed to load employee statistics
          </Text>
        </View>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.card}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data available</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>Employee Overview</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="people-outline"
            size={20}
            color={palette.secondary.main}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.totalEmployeesCount}</Text>
          <Text style={styles.statLabel}>Total Employees</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.totalDepartmentCount}</Text>
          <Text style={styles.statLabel}>Departments</Text>
        </View>
      </View>

      <View style={styles.genderStatsContainer}>
        <View style={styles.genderStatItem}>
          <View style={styles.genderIcon}>
            <Ionicons
              name="male-outline"
              size={20}
              color={palette.primary.main}
            />
          </View>
          <Text style={styles.genderValue}>{data.totalMaleCount}</Text>
          <Text style={styles.genderLabel}>Male</Text>
        </View>
        <View style={styles.genderStatItem}>
          <View style={styles.genderIcon}>
            <Ionicons
              name="female-outline"
              size={20}
              color={palette.secondary.main}
            />
          </View>
          <Text style={styles.genderValue}>{data.totalFemaleCount}</Text>
          <Text style={styles.genderLabel}>Female</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
