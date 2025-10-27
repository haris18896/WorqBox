import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// ** Theme
import { isMobile, useTheme } from "@/theme";
import { borderRadius, spacing } from "@/theme/stylingConstants";

// ** UI Components
import { Button, Modal, TextInput } from "@/components/ui";

// ** Store
import {
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation,
} from "@/store/api/modules/efs/efsLeaves";
import { LeaveRequest } from "@/store/api/modules/efs/efsTypes";

interface AcceptRejectLeaveRequestProps {
  visible: boolean;
  onClose: () => void;
  leaveRequest: LeaveRequest | null;
  action: "approve" | "reject";
}

const AcceptRejectLeaveRequest: React.FC<AcceptRejectLeaveRequestProps> = ({
  visible,
  onClose,
  leaveRequest,
  action,
}) => {
  const { palette } = useTheme();
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [approveLeaveRequest, { isLoading: isApproving }] =
    useApproveLeaveRequestMutation();
  const [rejectLeaveRequest, { isLoading: isRejecting }] =
    useRejectLeaveRequestMutation();

  const isLoading = isApproving || isRejecting;

  const handleSubmit = async () => {
    if (!leaveRequest) return;

    // Validate notes
    if (!notes.trim()) {
      setError(
        `Please provide ${
          action === "approve" ? "approval" : "rejection"
        } notes`
      );
      return;
    }

    setError("");

    try {
      if (action === "approve") {
        await approveLeaveRequest({
          requestId: leaveRequest.id,
          approvalNotes: notes.trim(),
        }).unwrap();
      } else {
        await rejectLeaveRequest({
          requestId: leaveRequest.id,
          rejectionNotes: notes.trim(),
        }).unwrap();
      }

      // Reset and close
      setNotes("");
      onClose();
    } catch (err) {
      // Error is handled by the mutation's onQueryStarted
      console.error("Error processing leave request:", err);
    }
  };

  const handleClose = () => {
    setNotes("");
    setError("");
    onClose();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.sm,
    },
    infoContainer: {
      backgroundColor: palette.surface.secondary,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      marginBottom: spacing.md,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
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
      marginBottom: spacing.md,
    },
    descriptionText: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
    textInputContainer: {
      marginBottom: 0,
    },
    errorText: {
      fontSize: 12,
      color: palette.error.main,
      marginTop: spacing.xs,
      marginBottom: spacing.sm,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: spacing.md,
      marginTop: spacing.md,
    },
    button: {
      flex: 1,
    },
  });

  if (!leaveRequest) return null;

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={
        action === "approve" ? "Approve Leave Request" : "Reject Leave Request"
      }
      subtitle={`${leaveRequest.employeeFirstName} ${leaveRequest.employeeLastName}`}
      variant="centered"
      height={isMobile() ? "60%" : "50%"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leave Details</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Leave Type:</Text>
              <Text style={styles.infoValue}>{leaveRequest.leaveTypeName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>From Date:</Text>
              <Text style={styles.infoValue}>
                {new Date(leaveRequest.fromDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>To Date:</Text>
              <Text style={styles.infoValue}>
                {new Date(leaveRequest.toDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>
                {leaveRequest.daysCount} day
                {leaveRequest.daysCount !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>

          {leaveRequest.longDescription && (
            <>
              <Text style={styles.sectionTitle}>Reason</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {leaveRequest.longDescription}
                </Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <TextInput
            title={
              action === "approve" ? "Approval Notes *" : "Rejection Notes *"
            }
            placeholder={`Enter ${
              action === "approve" ? "approval" : "rejection"
            } notes...`}
            value={notes}
            onChangeText={(text) => {
              setNotes(text);
              if (error) setError("");
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            styleData={{
              containerStyles: styles.textInputContainer,
              inputStyles: { minHeight: 100 },
            }}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            outlineColor="error"
            onPress={handleClose}
            disabled={isLoading}
            style={styles.button}
          />
          <Button
            title={action === "approve" ? "Approve" : "Reject "}
            variant={action === "approve" ? "primary" : "error"}
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AcceptRejectLeaveRequest;
