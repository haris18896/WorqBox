import React, { useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Utils
import { spacing, useTheme } from "@/theme";

// ** Third Party Package
import { Ionicons } from "@expo/vector-icons";

// ** UI
import ClearanceCard from "@/components/modules/ams/clearanceCard";
import ClearanceFilter from "@/components/modules/ams/Modals/ClearanceFilter";
import {
  BarHeader,
  Loading,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";

// ** Store
import { useGetEmployeeAssignmentsQuery } from "@/store/api/modules/ams/amsClearance";
import { EmployeeAssignment as EmployeeAssignmentType } from "@/store/api/modules/ams/amsTypes";
import { useGetEmployeesQuery } from "@/store/api/modules/pms/pmsReportingApi";

export default function Clearance() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<{
    employeeId?: number;
    hasCurrentAssets?: boolean;
  }>({});

  const {
    data: assignmentsData,
    isLoading: isLoadingAssignments,
    refetch: refetchAssignments,
  } = useGetEmployeeAssignmentsQuery({
    pageNumber,
    pageSize: 10,
    keyword: searchQuery,
    ...filters,
  });

  const { data: employees } = useGetEmployeesQuery();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAssignments();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleEmployeeAssignmentPress = (
    assignment: EmployeeAssignmentType
  ) => {
    console.log("Employee assignment pressed:", assignment);
    // TODO: Navigate to employee assignment details
  };

  const handleApplyFilters = (newFilters: {
    employeeId?: number;
    hasCurrentAssets?: boolean;
  }) => {
    setFilters(newFilters);
    setPageNumber(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery("");
    setPageNumber(1);
  };

  const renderClearanceCard = ({ item }: { item: EmployeeAssignmentType }) => (
    <ClearanceCard
      employeeAssignment={item}
      onPress={handleEmployeeAssignmentPress}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      paddingTop: spacing.md,
    },
    headerSection: {
      marginBottom: 20,
      flexDirection: "row",
      gap: spacing["sm"],
      paddingHorizontal: spacing["md"],
    },
    searchContainer: {
      flex: 1,
    },
    resetButton: {
      backgroundColor: palette.error.main,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    filtersButton: {
      backgroundColor: palette.background.secondary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    filtersButtonText: {
      color: palette.text.primary,
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    loadingText: {
      color: palette.text.secondary,
      marginTop: 10,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      color: palette.text.secondary,
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Asset Clearance" variant="default" />
      <Loading
        visible={isLoadingAssignments}
        text={"Loading Employee Assignments"}
      />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search employees..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          <TouchableOpacity
            style={styles.filtersButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons
              name="filter-outline"
              size={20}
              color={palette.text.primary}
            />
            <Text style={styles.filtersButtonText}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetFilters}
          >
            <Ionicons name="refresh-outline" size={20} color={"white"} />
          </TouchableOpacity>
        </View>

        <ResponsiveFlatList
          data={assignmentsData?.items || []}
          renderItem={renderClearanceCard}
          keyExtractor={(item) => item.employeeId.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[palette.primary.main]}
              tintColor={palette.primary.main}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={64}
                color={palette.text.secondary}
              />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No employees found matching your search"
                  : "No employee assignments available"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <ClearanceFilter
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        employees={employees?.items || []}
        currentFilters={filters}
      />
    </View>
  );
}
