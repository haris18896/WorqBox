import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ** Utils
import { ColorPalette, useTheme } from "@/theme";

// ** Components
import { Avatar, Badge, ResponsiveFlatList } from "@/components/ui";
import { TimeLogCard } from "../TimeLogCard";

// ** Types
import { TimeLog } from "@/store/api/modules/pms/pmsTypes";
import { EmployeeGroupedReportsProps } from "./index.d";

export const EmployeeGroupedReports: React.FC<EmployeeGroupedReportsProps> = ({
  groupedTimeLogs,
  employeeProfilePictureMap,
}) => {
  const { palette } = useTheme();

  const calculateEmployeeTotalHours = (logs: TimeLog[]): number => {
    return logs.reduce((total, log) => total + log.timeSpent, 0);
  };

  const formatTotalHours = (hours: number): string => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes}m`;
    }
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  };

  const renderEmployeeGroup = (employeeName: string, logs: TimeLog[]) => {
    const totalHours = calculateEmployeeTotalHours(logs);

    return (
      <View key={employeeName} style={styles(palette).employeeGroup}>
        {/* Employee Header */}
        <View style={styles(palette).employeeHeader}>
          <View style={styles(palette).employeeHeaderLeft}>
            <View style={styles(palette).employeeAvatar}>
              <Avatar imageUrl={undefined} name={employeeName} size={48} />
            </View>
            <View style={styles(palette).employeeInfo}>
              <Text style={styles(palette).employeeName} numberOfLines={1}>
                {employeeName}
              </Text>
              <Text style={styles(palette).employeeCount}>
                {logs.length} {logs.length === 1 ? "log" : "logs"}
              </Text>
            </View>
          </View>
          <View style={styles(palette).employeeTotal}>
            <Text style={styles(palette).totalLabel}>Total</Text>
            <Badge variant="primary" size="medium">
              {formatTotalHours(totalHours)}
            </Badge>
          </View>
        </View>

        {/* Time Logs Grid */}
        <View style={styles(palette).logsContainer}>
          <ResponsiveFlatList
            data={logs}
            renderItem={({ item, index }) => (
              <TimeLogCard
                key={index}
                timeLog={item}
                employeeProfilePictureUrl={
                  employeeProfilePictureMap[item.employeeId]
                }
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            contentContainerStyle={styles(palette).logsGrid}
            itemSpacing={12}
            columnSpacing={16}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles(palette).container}>
      {Object.entries(groupedTimeLogs).map(([employeeName, logs]) =>
        renderEmployeeGroup(employeeName, logs)
      )}
    </View>
  );
};

const styles = (palette: ColorPalette) =>
  StyleSheet.create({
    container: {
      gap: 24,
    },
    employeeGroup: {
      backgroundColor: palette.background.primary,
      borderRadius: 16,
      padding: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: palette.border?.primary || "rgba(0,0,0,0.05)",
    },
    employeeHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.border?.primary || "rgba(0,0,0,0.05)",
    },
    employeeHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    employeeAvatar: {
      marginRight: 16,
    },
    employeeInfo: {
      flex: 1,
    },
    employeeName: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    employeeCount: {
      fontSize: 14,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    employeeTotal: {
      alignItems: "flex-end",
    },
    totalLabel: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginBottom: 4,
      fontWeight: "500",
    },
    logsContainer: {
      marginTop: 8,
    },
    logsGrid: {
      paddingHorizontal: 0,
    },
  });

export default EmployeeGroupedReports;
