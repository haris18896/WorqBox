import { EmployeeCard } from "@/components/modules/hrm";
import { BarHeader, Loading, ResponsiveFlatList } from "@/components/ui";
import { useGetEmployeeCountWithGenderQuery } from "@/store/api/modules/hrm/hrmDashboard";
import { useGetEmployeesQuery } from "@/store/api/modules/hrm/hrmEmployees";
import { HrmEmployee } from "@/store/api/modules/hrm/hrmTypes";
import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Employees() {
  const { palette } = useTheme();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage] = useState(1);
  const pageSize = 10;

  // Fetch employee statistics
  const {
    data: genderStats,
    isLoading: genderLoading,
    refetch: refetchGender,
  } = useGetEmployeeCountWithGenderQuery();

  // Fetch employees list
  const {
    data: employeesData,
    isLoading: employeesLoading,
    error: employeesError,
    refetch: refetchEmployees,
  } = useGetEmployeesQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    keyword: searchKeyword,
    sortBy: "firstName",
    sortOrder: true,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleRefresh = () => {
    refetchGender();
    refetchEmployees();
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log("Export CSV clicked");
  };

  const isLoading = genderLoading || employeesLoading;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      marginBottom: spacing.md,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },
    actionButtons: {
      flexDirection: "row",
      gap: spacing.md,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    sectionTitleText: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
    },

    exportButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      justifyContent: "center",
      backgroundColor: palette.success.light,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      borderRadius: spacing.sm,
    },
    addButton: {
      backgroundColor: palette.secondary.light,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      justifyContent: "center",
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      borderRadius: spacing.sm,
    },
    buttonText: {
      fontSize: 12,
      fontWeight: "500",
      color: palette.text.primary,
    },
    statusCardsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
      gap: 12,
    },
    statusCard: {
      flex: 1,
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: palette.border.primary,
    },
    statusCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    statusCardCount: {
      fontSize: 24,
      fontWeight: "700",
      marginLeft: 8,
    },
    statusCardTitle: {
      fontSize: 10,
      color: palette.text.secondary,
      textAlign: "center",
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
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.background.secondary,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
    },
    searchIcon: {
      fontSize: 16,
      color: palette.text.tertiary,
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: palette.text.primary,
      paddingVertical: spacing.xs,
    },
    clearButton: {
      padding: spacing.xs,
    },
    clearIcon: {
      fontSize: 16,
      color: palette.text.tertiary,
    },
  });

  const renderStatusCards = () => {
    if (genderLoading) return null;

    const statusCards = [
      {
        title: "Employees",
        count: genderStats?.totalEmployeesCount || 0,
        color: palette.primary.main,
        icon: "people-outline",
      },
      {
        title: "Departments",
        count: genderStats?.totalDepartmentCount || 0,
        color: palette.secondary.main,
        icon: "business-outline",
      },
      {
        title: "Male",
        count: genderStats?.totalMaleCount || 0,
        color: palette.info.main,
        icon: "male-outline",
      },
      {
        title: "Female",
        count: genderStats?.totalFemaleCount || 0,
        color: palette.warning.main,
        icon: "female-outline",
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

  const renderEmployeeCard = ({ item }: { item: HrmEmployee }) => (
    <EmployeeCard
      employee={item}
      onPress={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  const renderHeader = () => (
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitleText}>Employee Statistics</Text>
      </View>
      {renderStatusCards()}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Employee List</Text>
        {/* <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportCSV}
          >
            <Ionicons
              name="download-outline"
              size={spacing.lg}
              color={palette.text.primary}
            />
            <Text style={styles.buttonText}>Export CSV</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Ionicons
              name="add-outline"
              size={spacing.lg}
              color={palette.text.primary}
            />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by employee name or email..."
          placeholderTextColor={palette.text.tertiary}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchText("")}
          >
            <Ionicons name="close-circle" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      <Loading size="small" visible={isLoading} text={"Loading employees"} />
    </View>
  );

  const renderFooter = () => {
    if (employeesError) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={24}
            color={palette.error.main}
          />
          <Text style={styles.errorText}>Failed to load employees</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <BarHeader title="Employees" variant="default" />
      <ResponsiveFlatList
        data={employeesData?.items || []}
        renderItem={renderEmployeeCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
