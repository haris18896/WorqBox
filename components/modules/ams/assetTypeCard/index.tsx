import { AssetTypesCategory } from "@/store/api/modules/ams/amsTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AssetTypeCardProps {
  assetCategory: AssetTypesCategory;
  onPress?: (assetCategory: AssetTypesCategory) => void;
  onEdit?: (assetCategory: AssetTypesCategory) => void;
  onDelete?: (assetCategory: AssetTypesCategory) => void;
}

export default function AssetTypeCard({
  assetCategory,
  onPress,
  onEdit,
  onDelete,
}: AssetTypeCardProps) {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: spacing["xs"],
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftSection: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${palette.secondary.light}20`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    categoryName: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 2,
    },
    categoryId: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
    },
    editButton: {
      backgroundColor: `${palette.success.light}20`,
    },
    deleteButton: {
      backgroundColor: `${palette.error.light}20`,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(assetCategory)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="folder-outline"
              size={20}
              color={palette.secondary.main}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.categoryName}>{assetCategory.name}</Text>
            <Text style={styles.categoryId}>ID: {assetCategory.id}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {onEdit && (
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => onEdit(assetCategory)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="pencil-outline"
                size={16}
                color={palette.success.main}
              />
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(assetCategory)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color={palette.error.main}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
