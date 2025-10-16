import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ** Utils
import { ColorPalette, useTheme } from "@/theme";

// ** Components
import { Badge, ResponsiveFlatList } from "@/components/ui";
import { TimeLogCard } from "../TimeLogCard";

// ** Types
import { TimeLog } from "@/store/api/modules/pms/pmsTypes";
import { ProjectGroupedReportsProps } from "./index.d";

export const ProjectGroupedReports: React.FC<ProjectGroupedReportsProps> = ({
  groupedTimeLogs,
}) => {
  const { palette } = useTheme();

  const calculateProjectTotalHours = (logs: TimeLog[]): number => {
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

  const renderProjectGroup = (projectName: string, logs: TimeLog[]) => {
    const totalHours = calculateProjectTotalHours(logs);

    return (
      <View key={projectName} style={styles(palette).projectGroup}>
        {/* Project Header */}
        <View style={styles(palette).projectHeader}>
          <View style={styles(palette).projectHeaderLeft}>
            <View style={styles(palette).projectIcon}>
              <Ionicons
                name="folder-outline"
                size={24}
                color={palette.primary.main}
              />
            </View>
            <View style={styles(palette).projectInfo}>
              <Text style={styles(palette).projectName} numberOfLines={1}>
                {projectName}
              </Text>
              <Text style={styles(palette).projectCount}>
                {logs.length} {logs.length === 1 ? "log" : "logs"}
              </Text>
            </View>
          </View>
          <View style={styles(palette).projectTotal}>
            <Text style={styles(palette).totalLabel}>Total</Text>
            <Badge variant="secondary" size="small">
              {formatTotalHours(totalHours)}
            </Badge>
          </View>
        </View>

        {/* Time Logs Grid */}
        <View style={styles(palette).logsContainer}>
          <ResponsiveFlatList
            data={logs}
            renderItem={({ item, index }) => (
              <TimeLogCard key={index} timeLog={item} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            contentContainerStyle={styles(palette).logsGrid}
            itemSpacing={12}
            columnSpacing={16}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles(palette).container}>
      {Object.entries(groupedTimeLogs).map(([projectName, logs]) =>
        renderProjectGroup(projectName, logs)
      )}
    </View>
  );
};

const styles = (palette: ColorPalette) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    projectGroup: {
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
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.border?.primary || "rgba(0,0,0,0.05)",
    },
    projectHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    projectIcon: {
      marginRight: 12,
    },
    projectInfo: {
      flex: 1,
    },
    projectName: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 4,
    },
    projectCount: {
      fontSize: 14,
      color: palette.text.secondary,
      fontWeight: "500",
    },
    projectTotal: {
      alignItems: "flex-end",
    },
    totalLabel: {
      fontSize: 12,
      color: palette.text.tertiary,
      marginBottom: 4,
      fontWeight: "500",
    },
    logsContainer: {
      marginTop: 1,
    },
    logsGrid: {
      paddingHorizontal: 0,
    },
  });

export default ProjectGroupedReports;
