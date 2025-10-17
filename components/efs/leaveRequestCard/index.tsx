import { LeaveRequest } from "@/store/api/modules/efs/efsTypes";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LeaveRequestCardProps {
  leaveRequest: LeaveRequest;
  onPress?: () => void;
}

export default function LeaveRequestCard({
  leaveRequest,
  onPress,
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
    return new Date(dateString).toLocaleDateString();
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
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    leaveType: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "500",
      color: getStatusColor(),
      marginLeft: 4,
    },
    content: {
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    value: {
      fontSize: 14,
      color: palette.text.primary,
      fontWeight: "400",
    },
    description: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
      marginTop: 8,
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
        <Text style={styles.leaveType}>{leaveRequest.leaveTypeName}</Text>
        <View style={styles.statusContainer}>
          <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>{formatDate(leaveRequest.fromDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>{formatDate(leaveRequest.toDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Days:</Text>
          <Text style={styles.value}>{leaveRequest.daysCount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Employee:</Text>
          <Text style={styles.value}>
            {leaveRequest.employeeFirstName} {leaveRequest.employeeLastName}
          </Text>
        </View>
      </View>

      {leaveRequest.longDescription && (
        <Text style={styles.description}>{leaveRequest.longDescription}</Text>
      )}

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
