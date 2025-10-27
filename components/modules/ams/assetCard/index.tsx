import { Badge, Button } from "@/components/ui";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AssetCardProps } from "./index.d";

export default function AssetCard({
  asset,
  employees = [],
  onPress,
  onAssign,
  onUnassign,
  onEdit,
}: AssetCardProps) {
  const { palette } = useTheme();

  const handlePress = () => {
    onPress?.(asset);
  };

  const handleAssign = () => {
    onAssign?.(asset);
  };

  const handleUnassign = () => {
    onUnassign?.(asset);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit?.(asset);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get complete employee information from employees array
  const getCompleteEmployeeInfo = () => {
    if (!asset.assignedEmployee) return null;

    const completeEmployee = employees.find(
      (emp) => emp.id === asset.assignedEmployee?.id
    );

    return completeEmployee || asset.assignedEmployee;
  };

  const assignedEmployee = getCompleteEmployeeInfo();

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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    titleContainer: {
      flex: 1,
      marginRight: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 4,
    },
    serialNumber: {
      fontSize: 12,
      color: palette.text.secondary,
      fontFamily: "monospace",
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    editButton: {
      padding: 4,
      borderRadius: 4,
      backgroundColor: palette.primary.main,
      justifyContent: "center",
      alignItems: "center",
    },
    statusBadge: {
      alignSelf: "flex-start",
    },
    description: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
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
    assignedEmployeeContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.background.primary,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      gap: spacing["sm"],
    },
    employeeImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 12,
      backgroundColor: palette.primary.light,
    },
    employeeInfo: {
      flex: 1,
    },
    employeeName: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
      marginBottom: 2,
    },
    employeeNumber: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    actionButtons: {
      flexDirection: "row",
      gap: 8,
    },
    assignButton: {
      flex: 1,
    },
    unassignButton: {
      flex: 1,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{asset.name}</Text>
          <Text style={styles.serialNumber}>SN: {asset.serialNumber}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Ionicons
              name="create-outline"
              size={20}
              color={palette.text.inverse}
            />
          </TouchableOpacity>
          <View style={styles.statusBadge}>
            <Badge variant={assignedEmployee ? "success" : "warning"}>
              {assignedEmployee ? "Assigned" : "Available"}
            </Badge>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{asset.shortDescription}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>{asset.assetCategory.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Purchase Cost</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(asset.purchaseCost)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Purchase Date</Text>
          <Text style={styles.detailValue}>
            {formatDate(asset.purchaseData)}
          </Text>
        </View>
      </View>

      {assignedEmployee && (
        <View style={styles.assignedEmployeeContainer}>
          <View style={styles.iconContainer}>
            {assignedEmployee.profilePictureUrl ? (
              <Image
                source={{ uri: assignedEmployee.profilePictureUrl }}
                style={styles.employeeImage}
              />
            ) : (
              <Ionicons
                name="person-outline"
                size={20}
                color={palette.primary.main}
              />
            )}
          </View>
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>{assignedEmployee.fullName}</Text>
            <Text style={styles.employeeNumber}>
              {assignedEmployee.employeeNumber}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.actionButtons}>
        {assignedEmployee ? (
          <Button
            variant="error"
            onPress={handleUnassign}
            style={styles.unassignButton}
            title="Unassign"
            leftIcon={
              <Ionicons
                name="person-remove-outline"
                size={16}
                color={palette.text.inverse}
              />
            }
          />
        ) : (
          <Button
            variant="primary"
            onPress={handleAssign}
            style={styles.assignButton}
            title="Assign"
            leftIcon={
              <Ionicons
                name="person-add-outline"
                size={16}
                color={palette.text.inverse}
              />
            }
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
