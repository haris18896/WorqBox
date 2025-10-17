import { Badge } from "@/components/ui";
import { Vendor } from "@/store/api/modules/ams/amsTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VendorCardProps {
  vendor: Vendor;
  onPress?: (vendor: Vendor) => void;
}

export default function VendorCard({ vendor, onPress }: VendorCardProps) {
  const { palette } = useTheme();

  const hasContactInfo =
    vendor.contactPerson || vendor.contactEmail || vendor.contactphone1;
  const hasAddress = vendor.vendorAddress;

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
    contactContainer: {
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    contactIcon: {
      marginRight: 8,
      width: 16,
    },
    contactText: {
      fontSize: 14,
      color: palette.text.secondary,
      flex: 1,
    },
    contactValue: {
      fontSize: 14,
      color: palette.text.primary,
      fontWeight: "500",
    },
    addressContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
    },
    addressIcon: {
      marginRight: 8,
      marginTop: 2,
    },
    addressText: {
      fontSize: 14,
      color: palette.text.secondary,
      flex: 1,
      lineHeight: 20,
    },
    statusBadge: {
      alignSelf: "flex-start",
    },
    noContactContainer: {
      backgroundColor: `${palette.warning.light}20`,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    noContactText: {
      fontSize: 12,
      color: palette.warning.main,
      textAlign: "center",
      fontStyle: "italic",
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(vendor)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {vendor.name}
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Badge variant="success" size="small">
            Active
          </Badge>
        </View>
      </View>

      {hasContactInfo ? (
        <View style={styles.contactContainer}>
          {vendor.contactPerson && (
            <View style={styles.contactRow}>
              <Ionicons
                name="person-outline"
                size={16}
                color={palette.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>Contact: </Text>
              <Text style={styles.contactValue}>{vendor.contactPerson}</Text>
            </View>
          )}

          {vendor.contactEmail && (
            <View style={styles.contactRow}>
              <Ionicons
                name="mail-outline"
                size={16}
                color={palette.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>Email: </Text>
              <Text style={styles.contactValue}>{vendor.contactEmail}</Text>
            </View>
          )}

          {vendor.contactphone1 && (
            <View style={styles.contactRow}>
              <Ionicons
                name="call-outline"
                size={16}
                color={palette.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>Phone: </Text>
              <Text style={styles.contactValue}>{vendor.contactphone1}</Text>
            </View>
          )}

          {vendor.contactphone2 && (
            <View style={styles.contactRow}>
              <Ionicons
                name="call-outline"
                size={16}
                color={palette.text.secondary}
                style={styles.contactIcon}
              />
              <Text style={styles.contactText}>Alt Phone: </Text>
              <Text style={styles.contactValue}>{vendor.contactphone2}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noContactContainer}>
          <Text style={styles.noContactText}>
            No contact information available
          </Text>
        </View>
      )}

      {hasAddress && (
        <View style={styles.addressContainer}>
          <Ionicons
            name="location-outline"
            size={16}
            color={palette.text.secondary}
            style={styles.addressIcon}
          />
          <Text style={styles.addressText}>{vendor.vendorAddress}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
