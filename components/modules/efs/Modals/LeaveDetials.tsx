import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// ** Theme
import { isMobile, useTheme } from "@/theme";
import { borderRadius, spacing } from "@/theme/stylingConstants";

// ** UI Components
import { Button, Modal } from "@/components/ui";

// ** Types
import { LeaveRequest } from "@/store/api/modules/efs/efsTypes";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

interface LeaveDetailsProps {
  visible: boolean;
  onClose: () => void;
  leaveRequest: LeaveRequest | null;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  showActions?: boolean;
}

const LeaveDetails: React.FC<LeaveDetailsProps> = ({
  visible,
  onClose,
  leaveRequest,
  onApprove,
  onReject,
  showActions = false,
}) => {
  const { palette } = useTheme();

  const getStatusColor = () => {
    if (leaveRequest?.isApproved) return palette.success.main;
    if (leaveRequest?.isRejected) return palette.error.main;
    return palette.warning.main;
  };

  const getStatusText = () => {
    if (leaveRequest?.isApproved) return "Approved";
    if (leaveRequest?.isRejected) return "Rejected";
    return "Pending";
  };

  const getStatusIcon = () => {
    if (leaveRequest?.isApproved) return "checkmark-circle";
    if (leaveRequest?.isRejected) return "close-circle";
    return "time";
  };

  const handleApprove = () => {
    if (leaveRequest && onApprove) {
      onApprove(leaveRequest.id);
      onClose();
    }
  };

  const handleReject = () => {
    if (leaveRequest && onReject) {
      onReject(leaveRequest.id);
      onClose();
    }
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: spacing["lg"],
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.surface.secondary,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      marginBottom: spacing.lg,
    },
    statusIcon: {
      marginRight: spacing.sm,
    },
    statusText: {
      fontSize: 16,
      fontWeight: "600",
      color: getStatusColor(),
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.sm,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoContainer: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.md,
      borderRadius: borderRadius.md,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
    },
    infoRowLast: {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottomWidth: 0,
    },
    infoLabel: {
      fontSize: 14,
      color: palette.text.secondary,
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
      flex: 1,
      textAlign: "right",
    },
    descriptionContainer: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.md,
      borderRadius: borderRadius.md,
    },
    descriptionText: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 22,
    },
    notesContainer: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      borderLeftWidth: 3,
    },
    approvedNotes: {
      borderLeftColor: palette.success.main,
    },
    rejectedNotes: {
      borderLeftColor: palette.error.main,
    },
    notesTitle: {
      fontSize: 12,
      fontWeight: "600",
      color: palette.text.secondary,
      marginBottom: spacing.xs,
      textTransform: "uppercase",
    },
    notesText: {
      fontSize: 14,
      color: palette.text.primary,
      lineHeight: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: spacing.md,
      marginTop: spacing.lg,
    },
    button: {
      flex: 1,
    },
    singleButton: {
      width: "100%",
    },
  });

  if (!leaveRequest) return null;

  const showApprovalNotes =
    leaveRequest.isApproved && leaveRequest.approvalNotes;
  const showRejectionNotes =
    leaveRequest.isRejected && leaveRequest.rejectionNotes;
  const isPending = !leaveRequest.isApproved && !leaveRequest.isRejected;

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Leave Request Details"
      subtitle={`${leaveRequest.employeeFirstName} ${leaveRequest.employeeLastName}`}
      variant="centered"
      height={isMobile() ? "70%" : "60%"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusContainer}>
          <Ionicons
            name={getStatusIcon()}
            size={24}
            color={getStatusColor()}
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>
                {leaveRequest.employeeFirstName} {leaveRequest.employeeLastName}
              </Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{leaveRequest.employeeEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leave Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Leave Type:</Text>
              <Text style={styles.infoValue}>{leaveRequest.leaveTypeName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>From Date:</Text>
              <Text style={styles.infoValue}>
                {new Date(leaveRequest.fromDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>To Date:</Text>
              <Text style={styles.infoValue}>
                {new Date(leaveRequest.toDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>
                {leaveRequest.daysCount} day
                {leaveRequest.daysCount !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>
        </View>

        {leaveRequest.longDescription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason for Leave</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {leaveRequest.longDescription}
              </Text>
            </View>
          </View>
        )}

        {showApprovalNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Approval Information</Text>
            <View style={[styles.notesContainer, styles.approvedNotes]}>
              <Text style={styles.notesTitle}>Approval Notes</Text>
              <Text style={styles.notesText}>{leaveRequest.approvalNotes}</Text>
            </View>
          </View>
        )}

        {showRejectionNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rejection Information</Text>
            <View style={[styles.notesContainer, styles.rejectedNotes]}>
              <Text style={styles.notesTitle}>Rejection Notes</Text>
              <Text style={styles.notesText}>
                {leaveRequest.rejectionNotes}
              </Text>
            </View>
          </View>
        )}

        {showActions && isPending && (
          <View style={styles.buttonContainer}>
            <Button
              title="Reject"
              variant="outline"
              outlineColor="error"
              onPress={handleReject}
              style={styles.button}
            />
            <Button
              title="Approve"
              variant="primary"
              onPress={handleApprove}
              style={styles.button}
            />
          </View>
        )}

        {!showActions && (
          <Button
            title="Close"
            variant="primary"
            onPress={onClose}
            style={styles.singleButton}
          />
        )}
      </ScrollView>
    </Modal>
  );
};

export default LeaveDetails;
