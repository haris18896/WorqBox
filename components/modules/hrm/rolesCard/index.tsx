import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { RolesCardProps } from "./index.d";

export default function RolesCard({
  role,
  modulePageLookup,
  onPress,
  onEdit,
  onDelete,
}: RolesCardProps) {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: palette.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftSection: {
      flex: 1,
    },
    title: {
      color: palette.text.primary,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 6,
    },
    desc: {
      color: palette.text.secondary,
      fontSize: 13,
      marginBottom: 10,
    },
    perm: {
      color: palette.text.secondary,
      fontSize: 12,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(role)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>{role.name}</Text>
          {!!role.description && (
            <Text style={styles.desc}>{role.description}</Text>
          )}
          <Text style={styles.perm}>
            Permissions: {role.pagePermissions?.length ?? 0}
            {modulePageLookup && role.pagePermissions?.length
              ? ` · ` +
                role.pagePermissions
                  .slice(0, 3)
                  .map(
                    (p) =>
                      modulePageLookup[p.systemModulePageId]?.name ||
                      `#${p.systemModulePageId}`
                  )
                  .join(", ") +
                (role.pagePermissions.length > 3 ? " …" : "")
              : ""}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {onEdit && (
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `${palette.success.light}20`,
                marginLeft: 8,
              }}
              onPress={() => onEdit(role)}
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
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `${palette.error.light}20`,
                marginLeft: 8,
              }}
              onPress={() => onDelete(role)}
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
