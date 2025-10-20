import { Badge } from "@/components/ui";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PresentAbsentEmployeeCardProps } from "./index.d";

export default function PresentAbsentEmployeeCard({
  data,
  error,
  onPress,
  onDatePress,
}: PresentAbsentEmployeeCardProps) {
  const { palette } = useTheme();

  const handlePress = () => {
    onPress?.();
  };

  const handleDatePress = (date: string) => {
    onDatePress?.(date);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getTotalPresent = () => {
    return data?.reduce((total, item) => total + item.presentCount, 0) || 0;
  };

  const getTotalAbsent = () => {
    return data?.reduce((total, item) => total + item.absentCount, 0) || 0;
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
    summaryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    summaryItem: {
      alignItems: "center",
      flex: 1,
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    attendanceList: {
      gap: 8,
    },
    attendanceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: palette.background.primary,
      padding: 12,
      borderRadius: 8,
    },
    dateInfo: {
      flex: 1,
    },
    dateText: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
    },
    attendanceStats: {
      flexDirection: "row",
      gap: 12,
    },
    presentBadge: {
      backgroundColor: palette.success.light,
    },
    absentBadge: {
      backgroundColor: palette.error.light,
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
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    emptyText: {
      fontSize: 14,
      color: palette.text.secondary,
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
          <Text style={styles.errorText}>Failed to load attendance data</Text>
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Attendance Overview</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={palette.secondary.main}
            />
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No attendance data available</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Overview</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={palette.secondary.main}
          />
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: palette.success.main }]}>
            {getTotalPresent()}
          </Text>
          <Text style={styles.summaryLabel}>Total Present</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: palette.error.main }]}>
            {getTotalAbsent()}
          </Text>
          <Text style={styles.summaryLabel}>Total Absent</Text>
        </View>
      </View>

      <View style={styles.attendanceList}>
        {data.slice(0, 5).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.attendanceItem}
            onPress={() => handleDatePress(item.fromDate)}
          >
            <View style={styles.dateInfo}>
              <Text style={styles.dateText}>{formatDate(item.fromDate)}</Text>
            </View>
            <View style={styles.attendanceStats}>
              <Badge variant="success" style={styles.presentBadge}>
                {item.presentCount} Present
              </Badge>
              <Badge variant="error" style={styles.absentBadge}>
                {item.absentCount} Absent
              </Badge>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
}
