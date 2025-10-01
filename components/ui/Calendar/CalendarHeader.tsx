import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarHeaderProps } from "./calendar.d";

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  selectedDate,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  availableViews,
  showNavigation = true,
  showTodayButton = true,
  theme,
  style,
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    dateText: {
      fontSize: 18,
      fontWeight: "700",
      color: palette.text.primary,
    },
    navigationButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    navButton: {
      padding: spacing.xs,
      marginHorizontal: spacing.xs,
      borderRadius: 6,
    },
    todayButton: {
      backgroundColor: palette.primary.main,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 6,
      marginRight: spacing.sm,
    },
    todayButtonText: {
      color: palette.text.inverse,
      fontSize: 14,
      fontWeight: "600",
    },
    viewToggleContainer: {
      flexDirection: "row",
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      padding: 2,
    },
    viewToggleButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 6,
      alignItems: "center",
    },
    viewToggleButtonActive: {
      backgroundColor: palette.primary.main,
    },
    viewToggleText: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.secondary,
    },
    viewToggleTextActive: {
      color: palette.text.inverse,
    },
  });

  const formatDate = (date: Date) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  const getViewLabel = (viewType: string) => {
    switch (viewType) {
      case "day":
        return "Day";
      case "week":
        return "Week";
      case "month":
        return "Month";
      default:
        return viewType;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Date and Navigation */}
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        {showNavigation && (
          <View style={styles.navigationButtons}>
            {showTodayButton && (
              <TouchableOpacity style={styles.todayButton} onPress={onToday}>
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
              <Ionicons
                name="chevron-back"
                size={20}
                color={palette.text.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={onNext}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={palette.text.secondary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggleContainer}>
        {availableViews.map((viewType) => (
          <TouchableOpacity
            key={viewType}
            style={[
              styles.viewToggleButton,
              view === viewType && styles.viewToggleButtonActive,
            ]}
            onPress={() => onViewChange(viewType)}
          >
            <Text
              style={[
                styles.viewToggleText,
                view === viewType && styles.viewToggleTextActive,
              ]}
            >
              {getViewLabel(viewType)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
