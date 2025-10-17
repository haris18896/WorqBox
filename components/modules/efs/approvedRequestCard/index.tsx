import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Theme
import { isTablet, useTheme } from "@/theme";
import { createTypographyStyle } from "@/theme/fonts";
import { borderRadius, shadow, spacing } from "@/theme/stylingConstants";

// ** Types
import { ApprovedRequestCardProps } from ".";

const ApprovedRequestCard: React.FC<ApprovedRequestCardProps> = ({
  leaveRequest,
  onApprove,
  onReject,
  onViewDetails,
  showActions = true,
  style,
  titleStyle,
  descriptionStyle,
  children,
}) => {
  const { palette } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
    return "time-outline";
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: palette.surface.primary,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.xs,
      ...shadow.sm,
      borderWidth: 1,
      borderColor: palette.border.primary,
      minHeight: isTablet() ? 300 : 250,
      justifyContent: "space-between",
      ...style,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: spacing.sm,
    },
    employeeInfo: {
      flex: 1,
    },
    employeeName: {
      fontWeight: "600",
      color: palette.text.primary,
      fontSize: 16,
      ...titleStyle,
    },
    employeeEmail: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginTop: 2,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: `${getStatusColor()}20`,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
    },
    statusIcon: {
      fontSize: 14,
      color: getStatusColor(),
      marginRight: spacing.xs,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      color: getStatusColor(),
    },
    leaveDetails: {
      //   marginBottom: spacing.sm,
    },
    leaveType: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    dateRange: {
      fontSize: 13,
      color: palette.text.secondary,
      marginBottom: spacing.xs,
    },
    daysCount: {
      fontSize: 13,
      color: palette.text.secondary,
    },
    date: {
      flex: 1,
      flexDirection: "row",
      gap: 5,
      paddingTop: 5,
    },
    leaveDescription: {
      flex: 1,
      flexDirection: "row",
      gap: 5,
    },
    description: {
      color: palette.text.secondary,
      marginBottom: spacing.sm,
      ...createTypographyStyle("body", "small"),
      fontSize: 13,
      lineHeight: 18,
      ...descriptionStyle,
    },
    notesContainer: {
      marginBottom: spacing.sm,
    },
    notesLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    notesText: {
      fontSize: 12,
      color: palette.text.secondary,
      lineHeight: 16,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: spacing.sm,
    },
    actionButtons: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    actionButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 80,
    },
    approveButton: {
      backgroundColor: palette.success.main,
    },
    rejectButton: {
      backgroundColor: palette.error.main,
    },
    viewButton: {
      backgroundColor: palette.primary.main,
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: "600",
      color: palette.text.inverse,
    },
    viewDetailsButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      backgroundColor: `${palette.secondary.main}20`,
      paddingHorizontal: spacing["md"],
      borderRadius: spacing["sm"],
    },
    viewDetailsText: {
      fontSize: 12,
      color: palette.secondary.main,
      marginLeft: spacing.xs,
    },
    childrenContainer: {
      marginTop: spacing.sm,
    },
    topSection: {
      marginBottom: spacing["xs"],
    },
    middleSection: {
      flex: 1,
      justifyContent: "flex-start",
    },
    bottomSection: {},
  });

  return (
    <View style={styles.container}>
      {/* Top Section - Header */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>
              {leaveRequest.employeeFirstName} {leaveRequest.employeeLastName}
            </Text>
            <Text style={styles.employeeEmail}>
              {leaveRequest.employeeEmail}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Ionicons name={getStatusIcon() as any} style={styles.statusIcon} />
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>

        <View style={styles.leaveDetails}>
          <Text style={styles.leaveType}>{leaveRequest.leaveTypeName}</Text>
          <View style={styles.date}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={palette.info.main}
            />
            <Text style={styles.dateRange}>
              {formatDate(leaveRequest.fromDate)} -{" "}
              {formatDate(leaveRequest.toDate)}
            </Text>
            <Text style={styles.daysCount}>
              {", "}
              {leaveRequest.daysCount}{" "}
              {leaveRequest.daysCount === 1 ? "day" : "days"}
            </Text>
          </View>
        </View>
      </View>

      {/* Middle Section - Content */}
      <View style={styles.middleSection}>
        {leaveRequest.longDescription && (
          <View style={styles.leaveDescription}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color={palette.warning.main}
            />
            <Text style={styles.description} numberOfLines={2}>
              {leaveRequest.longDescription}
            </Text>
          </View>
        )}

        {(leaveRequest.approvalNotes || leaveRequest.rejectionNotes) && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>
              {leaveRequest.isApproved ? "Approval Notes:" : "Rejection Notes:"}
            </Text>
            <Text style={styles.notesText} numberOfLines={2}>
              {leaveRequest.approvalNotes || leaveRequest.rejectionNotes}
            </Text>
          </View>
        )}
      </View>

      {/* Bottom Section - Actions */}
      <View style={styles.bottomSection}>
        <View style={styles.actionsContainer}>
          {showActions &&
            !leaveRequest.isApproved &&
            !leaveRequest.isRejected && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => onApprove?.(leaveRequest.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => onReject?.(leaveRequest.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => onViewDetails?.(leaveRequest.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name="eye-outline"
              size={16}
              color={palette.secondary.main}
            />
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};

export default ApprovedRequestCard;
