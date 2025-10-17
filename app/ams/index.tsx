import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// ** Utils
import { useTheme } from "@/theme";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";

// ** UI Components
import { BarHeader, Loading } from "@/components/ui";

// ** Store
import { useGetAmsDashboardQuery } from "@/store/api/modules/ams/amsDashboard";

export default function AMSDashboard() {
  const { palette } = useTheme();
  const { data: dashboardData, isLoading } = useGetAmsDashboardQuery();

  const renderStatusCards = () => {
    if (isLoading) return null;

    const assignedAssets = dashboardData
      ? dashboardData.totalAssets - dashboardData.unassignedAssets
      : 0;

    const statusCards = [
      {
        title: "Total Assets",
        count: dashboardData?.totalAssets || 0,
        color: palette.primary.main,
        icon: "cube-outline",
      },
      {
        title: "Assigned Assets",
        count: assignedAssets,
        color: palette.success.main,
        icon: "checkmark-circle-outline",
      },
      {
        title: "Unassigned Assets",
        count: dashboardData?.unassignedAssets || 0,
        color: palette.warning.main,
        icon: "time-outline",
      },
    ];

    return (
      <View style={styles.statusCardsContainer}>
        {statusCards.map((card, index) => (
          <View key={index} style={styles.statusCard}>
            <View style={styles.statusCardHeader}>
              <Ionicons name={card.icon as any} size={24} color={card.color} />
              <Text style={[styles.statusCardCount, { color: card.color }]}>
                {card.count}
              </Text>
            </View>
            <Text style={styles.statusCardTitle}>{card.title}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderKPISummary = () => {
    if (isLoading) return null;

    const assignedAssets = dashboardData
      ? dashboardData.totalAssets - dashboardData.unassignedAssets
      : 0;
    const assignmentRate = dashboardData?.totalAssets
      ? ((assignedAssets / dashboardData.totalAssets) * 100).toFixed(0)
      : "0";
    const categoriesCount = dashboardData?.categories.length || 0;

    const kpiCards = [
      {
        title: "Assignment Rate",
        value: `${assignmentRate}%`,
        color: palette.success.main,
        icon: "trending-up-outline",
      },
      {
        title: "Available Assets",
        value: dashboardData?.unassignedAssets?.toString() || "0",
        color: palette.warning.main,
        icon: "cube-outline",
      },
      {
        title: "Categories",
        value: categoriesCount.toString(),
        color: palette.info.main,
        icon: "list-outline",
      },
    ];

    return (
      <View style={styles.kpiContainer}>
        <Text style={styles.kpiTitle}>Key Performance Indicators</Text>
        <View style={styles.kpiCardsContainer}>
          {kpiCards.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiCardContent}>
                <View style={styles.kpiIconContainer}>
                  <Ionicons
                    name={kpi.icon as any}
                    size={20}
                    color={kpi.color}
                  />
                </View>
                <View style={styles.kpiTextContainer}>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <Text style={styles.kpiLabel}>{kpi.title}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderCircularChart = () => {
    if (isLoading || !dashboardData?.categories.length) return null;

    const totalAssets = dashboardData.totalAssets;
    const colors = [
      palette.primary.main,
      palette.success.main,
      palette.warning.main,
      palette.error.main,
      palette.info.main,
    ];

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Asset Categories</Text>
        <View style={styles.chartContent}>
          <View style={styles.pieChart}>
            {dashboardData.categories.map((category, index) => {
              const percentage =
                totalAssets > 0 ? (category.count / totalAssets) * 100 : 0;
              const angle = (category.count / totalAssets) * 360;
              const color = colors[index % colors.length];

              return (
                <View
                  key={category.assetCategoryId}
                  style={styles.chartSegment}
                >
                  <View style={styles.chartLegend}>
                    <View
                      style={[styles.legendDot, { backgroundColor: color }]}
                    />
                    <Text style={styles.legendText}>
                      {category.assetCategoryName} ({category.count})
                    </Text>
                  </View>
                  <Text style={styles.percentageText}>
                    {percentage.toFixed(1)}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    statusCardsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    statusCard: {
      flex: 1,
      backgroundColor: palette.background.secondary,
      padding: 15,
      borderRadius: 12,
      marginHorizontal: 5,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statusCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    statusCardCount: {
      fontSize: 20,
      fontWeight: "bold",
    },
    statusCardTitle: {
      fontSize: 12,
      color: palette.text.secondary,
      textAlign: "center",
    },
    kpiContainer: {
      backgroundColor: palette.background.secondary,
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    kpiTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 15,
      textAlign: "center",
    },
    kpiCardsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    kpiCard: {
      flex: 1,
      backgroundColor: palette.background.primary,
      padding: 15,
      borderRadius: 8,
      marginHorizontal: 5,
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    kpiCardContent: {
      alignItems: "center",
    },
    kpiIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: palette.background.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    kpiTextContainer: {
      alignItems: "center",
    },
    kpiValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: 4,
    },
    kpiLabel: {
      fontSize: 11,
      color: palette.text.secondary,
      textAlign: "center",
    },
    chartContainer: {
      backgroundColor: palette.background.secondary,
      padding: 20,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 15,
      textAlign: "center",
    },
    chartContent: {
      alignItems: "center",
    },
    pieChart: {
      width: "100%",
    },
    chartSegment: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
    },
    chartLegend: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
    },
    legendText: {
      fontSize: 14,
      color: palette.text.primary,
      flex: 1,
    },
    percentageText: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Asset Management" variant="default" />
      <Loading visible={isLoading} text="Loading dashboard data..." />
      <ScrollView style={styles.content}>
        {renderStatusCards()}
        {renderKPISummary()}
        {renderCircularChart()}
      </ScrollView>
    </View>
  );
}
