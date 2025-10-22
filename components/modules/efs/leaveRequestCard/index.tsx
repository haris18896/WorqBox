import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LeaveRequestCardProps } from "./index.d";

export default function LeaveRequestCard({
  leaveRequest,
  onPress,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: LeaveRequestCardProps) {
  const { palette } = useTheme();

  const getStatusColor = () => {
    if (leaveRequest.isApproved) return palette.success.main;
    if (leaveRequest.isRejected) return palette.error.main;
    return palette.warning.main;
  };

  const getStatusText = () => {
    if (leaveRequest.isApproved) return "Approved";
    if (leaveRequest.isRejected) return "Rejected";
    return "Pending";
  };

  const getStatusIcon = () => {
    if (leaveRequest.isApproved) return "checkmark-circle";
    if (leaveRequest.isRejected) return "close-circle";
    return "time";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const getLeaveTypeName = () => {
    return leaveRequest.leaveType?.name || "Unknown";
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: palette.border?.secondary || "rgba(0,0,0,0.05)",
      minHeight: 120,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    headerContent: {
      flex: 1,
    },
    leaveType: {
      fontSize: 16,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: getStatusColor() + "20",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      color: getStatusColor(),
      marginLeft: 4,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    infoContainer: {
      flex: 1,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    infoLabel: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginRight: 8,
      minWidth: 60,
    },
    infoValue: {
      fontSize: 12,
      color: palette.text.secondary,
      fontWeight: "600",
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    actionButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: palette.surface.tertiary,
    },
    notes: {
      fontSize: 12,
      color: palette.text.tertiary,
      fontStyle: "italic",
      marginTop: 8,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.leaveType}>{getLeaveTypeName()}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Ionicons name={getStatusIcon()} size={14} color={getStatusColor()} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Start:</Text>
            <Text style={styles.infoValue}>
              {formatDate(leaveRequest.fromDate)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>End:</Text>
            <Text style={styles.infoValue}>
              {formatDate(leaveRequest.toDate)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Days:</Text>
            <Text style={styles.infoValue}>{leaveRequest.daysCount}</Text>
          </View>
        </View>
        {!leaveRequest.isApproved && !leaveRequest.isRejected && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              disabled={isUpdating}
              style={styles.actionButton}
              onPress={() => onEdit?.(leaveRequest)}
              activeOpacity={0.7}
            >
              {isUpdating ? (
                <ActivityIndicator size="small" color={palette.success.main} />
              ) : (
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={palette.success.main}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isDeleting}
              style={styles.actionButton}
              onPress={() => onDelete?.(leaveRequest)}
              activeOpacity={0.7}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color={palette.error.main} />
              ) : (
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={palette.error.main}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {leaveRequest.approvalNotes && (
        <Text style={styles.notes}>
          Approval Notes: {leaveRequest.approvalNotes}
        </Text>
      )}

      {leaveRequest.rejectionNotes && (
        <Text style={styles.notes}>
          Rejection Notes: {leaveRequest.rejectionNotes}
        </Text>
      )}
    </TouchableOpacity>
  );
}
