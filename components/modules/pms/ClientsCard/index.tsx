import { ColorPalette, useTheme } from "@/theme";
import { stripHtmlTags } from "@/utils/textUtils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ClientsCardProps } from "./index.d";

export const ClientsCard: React.FC<ClientsCardProps> = ({
  project,
  onDelete,
  onUpdate,
  isUpdating,
  isDeleting,
}) => {
  const { palette } = useTheme();

  return (
    <TouchableOpacity style={styles(palette).card} activeOpacity={0.7}>
      {/* Header with Company Name and Actions */}
      <View style={styles(palette).header}>
        <View style={styles(palette).headerContent}>
          <Text style={styles(palette).companyName} numberOfLines={1}>
            {project.companyName}
          </Text>
          <Text style={styles(palette).projectName} numberOfLines={1}>
            {project.name}
          </Text>
        </View>
        <View style={styles(palette).actionsContainer}>
          <TouchableOpacity
            disabled={isUpdating}
            style={styles(palette).actionButton}
            onPress={() => onUpdate?.(project)}
            activeOpacity={0.7}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color={palette.success.main} />
            ) : (
              <Ionicons
                name="create-outline"
                size={20}
                color={palette.success.main}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isDeleting}
            style={styles(palette).actionButton}
            onPress={() => onDelete?.(project)}
            activeOpacity={0.7}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color={palette.error.main} />
            ) : (
              <Ionicons
                name="trash-outline"
                size={20}
                color={palette.error?.main || "#ef4444"}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Information - Prominent */}
      <View style={styles(palette).contactSection}>
        <View style={styles(palette).contactRow}>
          <View style={styles(palette).contactItem}>
            <Ionicons
              name="mail-outline"
              size={16}
              color={palette.text.secondary}
            />
            <Text style={styles(palette).contactValue} numberOfLines={1}>
              {project.email}
            </Text>
          </View>
        </View>

        <View style={styles(palette).contactRow}>
          <View style={styles(palette).contactItem}>
            <Ionicons
              name="call-outline"
              size={16}
              color={palette.text.secondary}
            />
            <Text style={styles(palette).contactValue} numberOfLines={1}>
              {project.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* Secondary Information - Less Prominent */}
      <View style={styles(palette).secondarySection}>
        <View style={styles(palette).descriptionContainer}>
          {project.description ? (
            <Text style={styles(palette).description} numberOfLines={2}>
              {stripHtmlTags(project.description, 100)}
            </Text>
          ) : (
            <Text
              style={styles(palette).descriptionPlaceholder}
              numberOfLines={2}
            >
              No description available
            </Text>
          )}
        </View>

        <View style={styles(palette).locationContainer}>
          <View style={styles(palette).locationItem}>
            <Ionicons
              name="location-outline"
              size={14}
              color={palette.text.tertiary}
            />
            <Text style={styles(palette).locationValue} numberOfLines={1}>
              {project.address}
            </Text>
          </View>
          <Text style={styles(palette).timezoneValue}>{project.timeZone}</Text>
        </View>
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
      marginBottom: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: palette.border?.secondary || "rgba(0,0,0,0.05)",
      minHeight: 180, // Reduced height since no avatar
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    headerContent: {
      flex: 1,
      marginRight: 12,
    },
    companyName: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    projectName: {
      fontSize: 16,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    actionButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: palette.background.primary,
      borderWidth: 1,
      borderColor: palette.border?.secondary || "rgba(0,0,0,0.1)",
    },
    contactSection: {
      marginBottom: 16,
    },
    contactRow: {
      marginBottom: 8,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    contactValue: {
      fontSize: 15,
      color: palette.text.primary,
      fontWeight: "500",
      flex: 1,
    },
    secondarySection: {
      flex: 1,
    },
    descriptionContainer: {
      marginBottom: 12,
    },
    description: {
      fontSize: 13,
      color: palette.text.tertiary,
      lineHeight: 18,
    },
    descriptionPlaceholder: {
      fontSize: 13,
      color: palette.text.tertiary,
      lineHeight: 18,
      fontStyle: "italic",
    },
    locationContainer: {
      borderTopWidth: 1,
      borderTopColor: palette.border?.secondary || "rgba(0,0,0,0.05)",
      paddingTop: 12,
    },
    locationItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 4,
    },
    locationValue: {
      fontSize: 12,
      color: palette.text.tertiary,
      fontWeight: "400",
      flex: 1,
    },
    timezoneValue: {
      fontSize: 11,
      color: palette.text.tertiary,
      fontStyle: "italic",
    },
  });

export default ClientsCard;
