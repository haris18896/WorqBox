import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EventModalProps } from "./calendar.d";

export const EventModal: React.FC<EventModalProps> = ({
  visible,
  event,
  onClose,
  onEdit,
  onDelete,
  theme,
}) => {
  const { palette, isDark } = useTheme();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: isDark
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: palette.background.primary,
      borderRadius: 16,
      padding: spacing.lg,
      margin: spacing.lg,
      maxWidth: "90%",
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
      flex: 1,
    },
    closeButton: {
      padding: spacing.sm,
      borderRadius: 8,
      backgroundColor: palette.background.secondary,
    },
    content: {
      marginBottom: spacing.lg,
    },
    eventInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    eventIcon: {
      marginRight: spacing.sm,
    },
    eventDetails: {
      flex: 1,
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: spacing.xs,
    },
    eventTime: {
      fontSize: 14,
      color: palette.text.secondary,
      marginBottom: spacing.xs,
    },
    eventDate: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    eventDescription: {
      fontSize: 14,
      color: palette.text.primary,
      lineHeight: 20,
      marginTop: spacing.sm,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: spacing.sm,
    },
    actionButton: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: 8,
      minWidth: 80,
      alignItems: "center",
    },
    editButton: {
      backgroundColor: palette.primary.main,
    },
    deleteButton: {
      backgroundColor: palette.error.main,
    },
    cancelButton: {
      backgroundColor: palette.background.secondary,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.inverse,
    },
    cancelButtonText: {
      color: palette.text.primary,
    },
  });

  if (!event) return null;

  const formatTime = (date: Date) => {
    return moment(date).format("HH:mm");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Event Details</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={palette.text.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.eventInfo}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={event.color || palette.primary.main}
                style={styles.eventIcon}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>
                  {formatTime(event.start)} - {formatTime(event.end)}
                </Text>
                <Text style={styles.eventDate}>
                  {moment(event.start).format("dddd, MMMM D, YYYY")}
                </Text>
              </View>
            </View>

            {event.children && (
              <Text style={styles.eventDescription}>
                {typeof event.children === "string"
                  ? event.children
                  : "Additional event details"}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
                Close
              </Text>
            </TouchableOpacity>

            {onEdit && (
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => onEdit(event)}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => onDelete(event)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
