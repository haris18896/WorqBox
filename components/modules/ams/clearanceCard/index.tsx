import { Badge, Button } from "@/components/ui";
import { EmployeeAssignment } from "@/store/api/modules/ams/amsTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ClearanceCardProps {
  employeeAssignment: EmployeeAssignment;
  onPress?: (employeeAssignment: EmployeeAssignment) => void;
  onConfirmClearance?: (employeeAssignment: EmployeeAssignment) => void;
}

export default function ClearanceCard({
  employeeAssignment,
  onPress,
  onConfirmClearance,
}: ClearanceCardProps) {
  const { palette } = useTheme();
  const [showAllAssets, setShowAllAssets] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const currentAssets = employeeAssignment.assignedAssets.filter(
    (asset) => asset.isCurrent
  );
  const displayedAssets = showAllAssets
    ? employeeAssignment.assignedAssets
    : employeeAssignment.assignedAssets.slice(0, 1);

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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    employeeInfo: {
      flex: 1,
      marginRight: 8,
    },
    employeeName: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 4,
    },
    employeeNumber: {
      fontSize: 14,
      color: palette.text.secondary,
      marginBottom: 2,
    },
    employeeId: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    statItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    statIcon: {
      marginRight: 4,
    },
    statText: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    statValue: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
    },
    assetsContainer: {
      marginTop: 8,
    },
    assetsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    assetsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
    },
    toggleButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    toggleText: {
      fontSize: 12,
      color: palette.text.primary,
      marginRight: 4,
    },
    assetItem: {
      backgroundColor: palette.background.primary,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
    },
    currentAsset: {
      borderLeftColor: palette.success.main,
    },
    pastAsset: {
      borderLeftColor: palette.text.primary,
    },
    assetHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    assetName: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
      flex: 1,
      marginRight: 8,
    },
    assetStatus: {
      alignSelf: "flex-start",
    },
    assetDetails: {
      marginBottom: 4,
    },
    assetDetailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 2,
    },
    assetDetailIcon: {
      marginRight: 6,
      width: 14,
    },
    assetDetailText: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    assetDetailValue: {
      fontSize: 12,
      color: palette.text.primary,
      fontWeight: "500",
    },
    remarksContainer: {
      backgroundColor: palette.warning.light + "20",
      padding: 8,
      borderRadius: 6,
      marginTop: 4,
    },
    remarksText: {
      fontSize: 11,
      color: palette.warning.main,
      fontStyle: "italic",
    },
    noAssetsContainer: {
      backgroundColor: palette.background.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    noAssetsText: {
      fontSize: 14,
      color: palette.text.secondary,
      textAlign: "center",
    },
    actionButtonContainer: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(employeeAssignment)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>
            {employeeAssignment.employeeFirstName}{" "}
            {employeeAssignment.employeeLastName}
          </Text>
          {employeeAssignment.employeeNumber && (
            <Text style={styles.employeeNumber}>
              #{employeeAssignment.employeeNumber}
            </Text>
          )}
        </View>
        <Badge
          variant={currentAssets.length > 0 ? "warning" : "success"}
          size="small"
        >
          {currentAssets.length > 0 ? "Active" : "Cleared"}
        </Badge>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons
            name="cube-outline"
            size={14}
            color={palette.text.secondary}
            style={styles.statIcon}
          />
          <Text style={styles.statText}>Total: </Text>
          <Text style={styles.statValue}>
            {employeeAssignment.totalAssetsCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons
            name="checkmark-circle-outline"
            size={14}
            color={palette.success.main}
            style={styles.statIcon}
          />
          <Text style={styles.statText}>Current: </Text>
          <Text style={styles.statValue}>
            {employeeAssignment.currentAssetsCount}
          </Text>
        </View>
      </View>

      <View style={styles.assetsContainer}>
        <View style={styles.assetsHeader}>
          <Text style={styles.assetsTitle}>Assigned Assets</Text>
          {employeeAssignment.assignedAssets.length > 3 && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowAllAssets(!showAllAssets)}
            >
              <Text style={styles.toggleText}>
                {showAllAssets ? "Show Less" : "Show All"}
              </Text>
              <Ionicons
                name={showAllAssets ? "chevron-up" : "chevron-down"}
                size={16}
                color={palette.text.primary}
              />
            </TouchableOpacity>
          )}
        </View>

        {displayedAssets.length > 0 ? (
          displayedAssets.map((asset) => (
            <View
              key={asset.id}
              style={[
                styles.assetItem,
                asset.isCurrent ? styles.currentAsset : styles.pastAsset,
              ]}
            >
              <View style={styles.assetHeader}>
                <Text style={styles.assetName} numberOfLines={2}>
                  {asset.assetName}
                </Text>
                <View style={styles.assetStatus}>
                  <Badge
                    variant={asset.isCurrent ? "info" : "error"}
                    size="small"
                  >
                    {asset.isCurrent ? "Current" : "Returned"}
                  </Badge>
                </View>
              </View>

              <View style={styles.assetDetails}>
                <View style={styles.assetDetailRow}>
                  <Ionicons
                    name="barcode-outline"
                    size={12}
                    color={palette.text.secondary}
                    style={styles.assetDetailIcon}
                  />
                  <Text style={styles.assetDetailText}>Serial: </Text>
                  <Text style={styles.assetDetailValue}>
                    {asset.assetSerialNumber}
                  </Text>
                </View>

                <View style={styles.assetDetailRow}>
                  <Ionicons
                    name="folder-outline"
                    size={12}
                    color={palette.text.secondary}
                    style={styles.assetDetailIcon}
                  />
                  <Text style={styles.assetDetailText}>Category: </Text>
                  <Text style={styles.assetDetailValue}>
                    {asset.assetCategoryName}
                  </Text>
                </View>

                <View style={styles.assetDetailRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={12}
                    color={palette.text.secondary}
                    style={styles.assetDetailIcon}
                  />
                  <Text style={styles.assetDetailText}>Assigned: </Text>
                  <Text style={styles.assetDetailValue}>
                    {formatDate(asset.assignedDate)}
                  </Text>
                </View>
              </View>

              {asset.remarks && (
                <View style={styles.remarksContainer}>
                  <Text style={styles.remarksText}>
                    Remarks: {asset.remarks}
                  </Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noAssetsContainer}>
            <Ionicons
              name="cube-outline"
              size={32}
              color={palette.text.secondary}
            />
            <Text style={styles.noAssetsText}>No assets assigned</Text>
          </View>
        )}
      </View>

      {currentAssets.length > 0 && onConfirmClearance && (
        <View style={styles.actionButtonContainer}>
          <Button
            variant="primary"
            size="small"
            onPress={() => onConfirmClearance(employeeAssignment)}
            style={{ width: "100%" }}
            title="Confirm Clearance"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
