import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Utils
import { ColorPalette, useTheme } from "@/theme";
import { isTablet, isWeb } from "@/theme/responsive";
import { stripHtmlTags } from "@/utils/textUtils";

// ** Components
import { Avatar, Badge } from "@/components/ui";

// ** Types
import { TimeLogCardProps } from "./index.d";

export const TimeLogCard: React.FC<TimeLogCardProps> = ({
  timeLog,
  onPress,
  employeeProfilePictureUrl,
}) => {
  const { palette } = useTheme();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTimeSpent = (hours: number): string => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes}m`;
    }
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  };

  const getStatusVariant = (
    isBillable: boolean,
    isBilled: boolean
  ): "primary" | "success" | "info" | "neutral" => {
    if (isBilled) return "info";
    if (isBillable) return "success";
    return "neutral";
  };

  const getStatusText = (isBillable: boolean, isBilled: boolean) => {
    if (isBilled) return "Billed";
    if (isBillable) return "Billable";
    return "Non-billable";
  };

  const getTimeSpentVariant = (
    hours: number
  ): "primary" | "success" | "secondary" | "neutral" => {
    if (hours >= 100) return "success";
    if (hours >= 8) return "secondary";
    return "neutral";
  };

  return (
    <TouchableOpacity
      style={styles(palette).card}
      onPress={() => onPress?.(timeLog)}
      activeOpacity={0.7}
    >
      {/* Header with Project and Time */}
      <View style={styles(palette).header}>
        <View style={styles(palette).projectInfo}>
          <View style={styles(palette).projectIcon}>
            <Ionicons
              name="folder-outline"
              size={20}
              color={palette.primary.main}
            />
          </View>
          <Text style={styles(palette).projectName} numberOfLines={1}>
            {timeLog.projectName || "Unknown Project"}
          </Text>
        </View>
        <Badge variant={getTimeSpentVariant(timeLog.timeSpent)} size="small">
          {formatTimeSpent(timeLog.timeSpent)}
        </Badge>
      </View>

      {/* Task Title */}
      <View style={styles(palette).taskContainer}>
        <Text style={styles(palette).taskTitle} numberOfLines={2}>
          {timeLog.taskName}
        </Text>
      </View>

      {/* Employee Info */}
      <View style={styles(palette).employeeContainer}>
        <Avatar
          imageUrl={employeeProfilePictureUrl}
          name={`${timeLog.employeeFirstName} ${timeLog.employeeLastName}`}
          size={32}
        />
        <View style={styles(palette).employeeInfo}>
          <Text style={styles(palette).employeeName} numberOfLines={1}>
            {timeLog.employeeFirstName} {timeLog.employeeLastName}
          </Text>
          <Text style={styles(palette).employeeRole}>Employee</Text>
        </View>
      </View>

      {/* Description */}
      {timeLog.detailMessage && (
        <View style={styles(palette).descriptionContainer}>
          <Text
            style={styles(palette).description}
            numberOfLines={isWeb() ? 3 : isTablet() ? 2 : 2}
          >
            {stripHtmlTags(timeLog.detailMessage, isWeb() ? 150 : 100)}
          </Text>
        </View>
      )}

      {/* Footer with Date and Status */}
      <View style={styles(palette).footer}>
        <View style={styles(palette).dateContainer}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={palette.text.tertiary}
          />
          <Text style={styles(palette).dateText}>
            {formatDate(timeLog.startDate)}
          </Text>
        </View>

        <Badge
          variant={getStatusVariant(timeLog.isBillable, timeLog.isBilled)}
          size="small"
        >
          {getStatusText(timeLog.isBillable, timeLog.isBilled)}
        </Badge>
      </View>
    </TouchableOpacity>
  );
};

const styles = (palette: ColorPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      borderRadius: 16,
      padding: 16,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: palette.border?.secondary || "rgba(0,0,0,0.05)",
      minHeight: 200,
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    projectInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    projectIcon: {
      marginRight: 8,
    },
    projectName: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      flex: 1,
    },
    taskContainer: {
      marginBottom: 12,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: palette.text.primary,
      lineHeight: 24,
    },
    employeeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    employeeInfo: {
      marginLeft: 12,
      flex: 1,
    },
    employeeName: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
    },
    employeeRole: {
      fontSize: 12,
      color: palette.text.secondary,
      marginTop: 2,
    },
    descriptionContainer: {
      flex: 1,
      marginBottom: 12,
    },
    description: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    dateText: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginLeft: 4,
      fontWeight: "500",
    },
  });

export default TimeLogCard;
