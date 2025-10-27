import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeCardProps } from "./index.d";

export default function EmployeeCard({
  employee,
  onPress,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  const { palette } = useTheme();

  const handlePress = () => {
    onPress?.(employee);
  };

  const handleEdit = () => {
    onEdit?.(employee);
  };

  const handleDelete = () => {
    onDelete?.(employee);
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
      borderWidth: 1,
      borderColor: palette.border.primary,
    },
    employeeHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    employeeAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.primary.light,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    employeeInfo: {
      flex: 1,
    },
    employeeName: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 2,
    },
    employeeNumber: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    employeeDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    detailItem: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 12,
      color: palette.text.secondary,
      marginBottom: 2,
    },
    detailValue: {
      fontSize: 14,
      color: palette.text.primary,
      fontWeight: "500",
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 8,
    },
    actionButton: {
      padding: 8,
      borderRadius: 6,
    },
    editButton: {
      backgroundColor: `${palette.primary.light}30`,
    },
    deleteButton: {
      backgroundColor: `${palette.error.light}30`,
    },
    employeeImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 12,
      backgroundColor: palette.primary.light,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} disabled={true}>
      <View style={styles.employeeHeader}>
        <View style={styles.employeeAvatar}>
          {employee.profilePictureUrl ? (
            <Image
              source={{ uri: employee.profilePictureUrl }}
              style={styles.employeeImage}
            />
          ) : (
            // <Ionicons name="person" size={24} color={palette.primary.main} />
            <Ionicons
              name="person-outline"
              size={24}
              color={palette.primary.main}
            />
          )}
        </View>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>
            {employee.firstName} {employee.lastName}
          </Text>
          <Text style={styles.employeeNumber}>{employee.employeeNumber}</Text>
        </View>
      </View>

      <View style={styles.employeeDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{employee.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Role</Text>
          <Text style={styles.detailValue}>{employee.role.name}</Text>
        </View>
      </View>

      <View style={styles.employeeDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gender</Text>
          <Text style={styles.detailValue}>{employee.gender.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tier</Text>
          <Text style={styles.detailValue}>{employee.employeeTier.name}</Text>
        </View>
      </View>

      {/* <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <Ionicons
            name="pencil-outline"
            size={16}
            color={palette.primary.main}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={16} color={palette.error.main} />
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
}
