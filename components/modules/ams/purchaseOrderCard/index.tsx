import { Badge } from "@/components/ui";
import { PurchaseOrder } from "@/store/api/modules/ams/amsTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PurchaseOrderCardProps {
  purchaseOrder: PurchaseOrder;
  onPress?: (purchaseOrder: PurchaseOrder) => void;
}

export default function PurchaseOrderCard({
  purchaseOrder,
  onPress,
}: PurchaseOrderCardProps) {
  const { palette } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
    titleContainer: {
      flex: 1,
      marginRight: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 4,
    },
    amount: {
      fontSize: 18,
      fontWeight: "bold",
      color: palette.success.main,
    },
    vendorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    vendorIcon: {
      marginRight: 8,
    },
    vendorText: {
      fontSize: 14,
      color: palette.text.secondary,
      flex: 1,
    },
    vendorName: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    dateIcon: {
      marginRight: 8,
    },
    dateText: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    attachmentContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
    },
    attachmentIcon: {
      marginRight: 8,
    },
    attachmentText: {
      fontSize: 12,
      color: palette.text.secondary,
      fontStyle: "italic",
    },
    statusBadge: {
      backgroundColor: palette.success.light,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: "flex-start",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "500",
      color: palette.success.main,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(purchaseOrder)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {purchaseOrder.name}
          </Text>
        </View>
        <Badge variant="warning" size={"small"}>
          Active
        </Badge>
      </View>

      <View style={styles.vendorContainer}>
        <Ionicons
          name="business-outline"
          size={16}
          color={palette.text.secondary}
          style={styles.vendorIcon}
        />
        <Text style={styles.vendorText}>Vendor: </Text>
        <Text style={styles.vendorName}>{purchaseOrder.vendor.name}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color={palette.text.secondary}
          style={styles.dateIcon}
        />
        <Text style={styles.dateText}>
          Order Date: {formatDate(purchaseOrder.orderDate)}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.amount}>
          {formatAmount(purchaseOrder.totalAmount)}
        </Text>
        {purchaseOrder.attachmentURL && (
          <View style={styles.attachmentContainer}>
            <Ionicons
              name="attach-outline"
              size={16}
              color={palette.text.secondary}
              style={styles.attachmentIcon}
            />
            <Text style={styles.attachmentText}>Attachment available</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
