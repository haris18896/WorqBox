import { ResponsiveFlatList } from "@/components/ui";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DepartmentEmployeeCountCardProps } from "./index.d";

export default function DepartmentEmployeeCountCard({
  data,
  error,
  onPress,
  onDepartmentPress,
}: DepartmentEmployeeCountCardProps) {
  const { palette } = useTheme();

  const handlePress = () => {
    onPress?.();
  };

  const handleDepartmentPress = (departmentId: number) => {
    onDepartmentPress?.(departmentId);
  };

  const renderDepartmentItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.departmentItem}
      onPress={() => handleDepartmentPress(item.id)}
    >
      <View style={styles.departmentInfo}>
        <Text style={styles.departmentName}>{item.name}</Text>
        <Text style={styles.departmentId}>ID: {item.id}</Text>
      </View>
      <Text style={styles.employeeCount}>{item.employeeCount}</Text>
    </TouchableOpacity>
  );

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
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${palette.secondary.light}30`,
      justifyContent: "center",
      alignItems: "center",
    },
    departmentList: {
      flex: 1,
    },
    departmentItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: palette.background.primary,
      padding: 12,
      borderRadius: 8,
    },
    departmentInfo: {
      flex: 1,
    },
    departmentName: {
      fontSize: 14,
      fontWeight: "500",
      color: palette.text.primary,
      marginBottom: 2,
    },
    departmentId: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    employeeCount: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.primary.main,
    },
    errorContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    errorText: {
      fontSize: 14,
      color: palette.error.main,
      textAlign: "center",
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    emptyText: {
      fontSize: 14,
      color: palette.text.secondary,
      textAlign: "center",
    },
  });

  if (error) {
    return (
      <View style={styles.card}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={palette.error.main}
          />
          <Text style={styles.errorText}>Failed to load department data</Text>
        </View>
      </View>
    );
  }

  if (!data || !data.departmentEmployeeCounts?.length) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Department Overview</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name="business-outline"
              size={20}
              color={palette.secondary.main}
            />
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No department data available</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>Department Overview</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="business-outline"
            size={20}
            color={palette.secondary.main}
          />
        </View>
      </View>

      <ResponsiveFlatList
        data={data.departmentEmployeeCounts}
        renderItem={renderDepartmentItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.departmentList}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 1 }}
      />
    </TouchableOpacity>
  );
}
