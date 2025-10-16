import {
  EmployeeGroupedReports,
  ProjectGroupedReports,
  TimeLogCard,
} from "@/components/pms";
import {
  BarHeader,
  DatePicker,
  Empty,
  MultiSelectDropdown,
  ResponsiveFlatList,
  SingleSelectDropdown,
  Switch,
} from "@/components/ui";
import { MultiSelectOption } from "@/components/ui/MultiSelectDropdown/MultiSelectDropdown.d";
import { useGetMainProjectsQuery } from "@/store/api/modules/pms/pmsProjects";
import {
  useGetEmployeesQuery,
  useLazyGetReportingStatsQuery,
  useLazyGetTimeLogsReportingQuery,
} from "@/store/api/modules/pms/pmsReportingApi";
import { TimeLog } from "@/store/api/modules/pms/pmsTypes";
import { spacing, useTheme } from "@/theme";
import { isMobile } from "@/theme/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type GroupByOption = "none" | "project" | "employee";

interface GroupedTimeLogs {
  [key: string]: TimeLog[];
}

export default function Reports() {
  const { palette } = useTheme();

  // Calculate default dates
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const defaultStartDate = oneYearAgo.toISOString().split("T")[0];
  const defaultEndDate = today.toISOString().split("T")[0];

  // State for filters
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);
  const [isBillable, setIsBillable] = useState<boolean | undefined>(undefined);
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");

  // API Queries
  const { data: employees, isLoading: employeesLoading } =
    useGetEmployeesQuery();
  const { data: projects, isLoading: projectsLoading } =
    useGetMainProjectsQuery();

  const [getReportingStats, { data: reportingStats }] =
    useLazyGetReportingStatsQuery();

  const [
    getTimeLogs,
    { data: timeLogsData, isLoading: timeLogsLoading, error: timeLogsError },
  ] = useLazyGetTimeLogsReportingQuery();

  // Convert data to dropdown options
  const projectOptions: MultiSelectOption[] =
    projects?.items?.map((project) => ({
      id: project.id,
      label: project.name,
      value: project,
    })) || [];

  const employeeOptions: MultiSelectOption[] =
    employees?.items?.map((employee) => ({
      id: employee.id,
      label: `${employee.firstName || ""} ${employee.middleName || ""} ${
        employee.lastName || ""
      }`,
      value: employee.id,
    })) || [];

  // Group By options
  const groupByOptions = [
    { id: "none", label: "No Grouping", value: "none" },
    { id: "project", label: "Group by Project", value: "project" },
    { id: "employee", label: "Group by Employee", value: "employee" },
  ];

  // Fetch time logs and reporting stats when filters change
  useEffect(() => {
    const params = {
      projectIds: selectedProjects.length > 0 ? selectedProjects : undefined,
      employeeIds: selectedEmployees.length > 0 ? selectedEmployees : undefined,
      startDate: startDate,
      endDate: endDate,
      isBillable: isBillable,
      pageNumber: 1,
      pageSize: 50,
      sortOrder: true,
    };

    // Always fetch with current filter values
    getTimeLogs(params);
    getReportingStats(params);
  }, [
    selectedProjects,
    selectedEmployees,
    startDate,
    endDate,
    isBillable,
    getTimeLogs,
    getReportingStats,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedProjects([]);
    setSelectedEmployees([]);
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setIsBillable(undefined);
    setGroupBy("none");
  };

  // Group time logs based on selected option
  const getGroupedTimeLogs = (): GroupedTimeLogs => {
    if (!timeLogsData?.items || groupBy === "none") {
      return { all: timeLogsData?.items || [] };
    }

    const grouped: GroupedTimeLogs = {};

    timeLogsData.items.forEach((log: TimeLog) => {
      let key: string;

      if (groupBy === "project") {
        key = log.projectName || "Unknown Project";
      } else if (groupBy === "employee") {
        key = `${log.employeeFirstName} ${log.employeeLastName}`;
      } else {
        key = "all";
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(log);
    });

    return grouped;
  };

  const groupedTimeLogs = getGroupedTimeLogs();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    filtersContainer: {
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
    filtersTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 16,
    },
    filtersRow: {
      flexDirection: "row",
      flexWrap: isMobile() ? "nowrap" : "wrap",
      gap: 12,
      marginBottom: 16,
    },
    filterItem: {
      flex: isMobile() ? 0 : 1,
      minWidth: isMobile() ? 120 : 150,
      width: isMobile() ? "auto" : undefined,
    },
    mobileFiltersColumn: {
      gap: 12,
      marginBottom: 16,
    },
    dateRow: {
      flexDirection: "row",
      gap: 12,
    },
    dateItem: {
      flex: 1,
    },
    switchContainer: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: palette.border.primary,
    },
    switchLabel: {
      fontSize: 16,
      color: palette.text.primary,
      fontWeight: "500",
    },
    resetButton: {
      backgroundColor: palette.error.main,
      padding: spacing["sm"],

      borderRadius: 8,
      alignSelf: "center",
    },
    resetButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
    },
    statsContainer: {
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
    statsTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    statsLabel: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    statsValue: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
    },
    resultsContainer: {
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
    resultsTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 16,
    },
    timeLogDetails: {
      fontSize: 14,
      color: palette.text.secondary,
      marginBottom: 4,
    },
    loadingContainer: {
      padding: 20,
      gap: spacing["sm"],
      alignItems: "center",
    },
    errorContainer: {
      padding: 20,
      backgroundColor: palette.error.light,
      borderRadius: 8,
      marginBottom: 16,
    },
    errorText: {
      color: palette.error.main,
      fontSize: 14,
    },
    badgeReset: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing["md"],
    },
    resultsGrid: {
      paddingHorizontal: 0,
    },
  });

  const renderTimeLogItem = ({
    item,
    index,
  }: {
    item: TimeLog;
    index: number;
  }) => <TimeLogCard key={index} timeLog={item} />;

  const renderGroupedResults = () => {
    if (timeLogsLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={palette.primary.main} />
          <Text style={styles.timeLogDetails}>Loading time logs...</Text>
        </View>
      );
    }

    if (timeLogsError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error loading time logs. Please try again.
          </Text>
        </View>
      );
    }

    if (!timeLogsData?.items || timeLogsData.items.length === 0) {
      return (
        <Empty
          title="No time logs found"
          subtitle="Try adjusting your filters to see more results"
        />
      );
    }

    // Render based on grouping option
    if (groupBy === "none") {
      return (
        <ResponsiveFlatList
          data={timeLogsData.items}
          renderItem={renderTimeLogItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.resultsGrid}
          itemSpacing={12}
          columnSpacing={16}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      );
    }

    if (groupBy === "project") {
      return <ProjectGroupedReports groupedTimeLogs={groupedTimeLogs} />;
    }

    if (groupBy === "employee") {
      return <EmployeeGroupedReports groupedTimeLogs={groupedTimeLogs} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <BarHeader title="Project Management Reports" variant="default" />

      <ScrollView style={styles.content}>
        {/* Filters Section */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>

          {/* Mobile: Column layout with all filters */}
          {isMobile() ? (
            <View style={styles.mobileFiltersColumn}>
              <View style={styles.filterItem}>
                <MultiSelectDropdown
                  title="Projects"
                  options={projectOptions}
                  selectedValues={selectedProjects}
                  onSelectionChange={(values) =>
                    setSelectedProjects(values as number[])
                  }
                  placeholder="Select projects..."
                  disabled={projectsLoading}
                  size="small"
                />
              </View>

              <View style={styles.filterItem}>
                <MultiSelectDropdown
                  title="Employees"
                  options={employeeOptions}
                  selectedValues={selectedEmployees}
                  onSelectionChange={(values) =>
                    setSelectedEmployees(values as number[])
                  }
                  placeholder="Select employees..."
                  disabled={employeesLoading}
                  size="small"
                />
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateItem}>
                  <DatePicker
                    title="Start Date"
                    value={startDate}
                    onDateChange={setStartDate}
                    placeholder="Start date"
                    size="small"
                  />
                </View>

                <View style={styles.dateItem}>
                  <DatePicker
                    title="End Date"
                    value={endDate}
                    onDateChange={setEndDate}
                    placeholder="End date"
                    size="small"
                  />
                </View>
              </View>

              <View style={styles.filterItem}>
                <SingleSelectDropdown
                  title="Group By"
                  options={groupByOptions}
                  selectedValue={groupBy}
                  onSelectionChange={(value) =>
                    setGroupBy((value as GroupByOption) || "none")
                  }
                  placeholder="Select grouping..."
                  size="small"
                />
              </View>
            </View>
          ) : (
            /* Tablet/Desktop: Wrapped rows */
            <>
              <View style={styles.filtersRow}>
                <View style={styles.filterItem}>
                  <MultiSelectDropdown
                    title="Projects"
                    options={projectOptions}
                    selectedValues={selectedProjects}
                    onSelectionChange={(values) =>
                      setSelectedProjects(values as number[])
                    }
                    placeholder="Select projects..."
                    disabled={projectsLoading}
                  />
                </View>

                <View style={styles.filterItem}>
                  <MultiSelectDropdown
                    title="Employees"
                    options={employeeOptions}
                    selectedValues={selectedEmployees}
                    onSelectionChange={(values) =>
                      setSelectedEmployees(values as number[])
                    }
                    placeholder="Select employees..."
                    disabled={employeesLoading}
                  />
                </View>
              </View>

              <View style={styles.filtersRow}>
                <View style={styles.filterItem}>
                  <DatePicker
                    title="Start Date"
                    value={startDate}
                    onDateChange={setStartDate}
                    placeholder="Select start date"
                  />
                </View>

                <View style={styles.filterItem}>
                  <DatePicker
                    title="End Date"
                    value={endDate}
                    onDateChange={setEndDate}
                    placeholder="Select end date"
                  />
                </View>

                <View style={styles.filterItem}>
                  <SingleSelectDropdown
                    title="Group By"
                    options={groupByOptions}
                    selectedValue={groupBy}
                    onSelectionChange={(value) =>
                      setGroupBy((value as GroupByOption) || "none")
                    }
                    placeholder="Select grouping..."
                  />
                </View>
              </View>
            </>
          )}

          <View style={styles.badgeReset}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Billable Only</Text>
              <Switch
                value={isBillable === true}
                onValueChange={(value) =>
                  setIsBillable(value ? true : undefined)
                }
                variant="secondary"
                size="medium"
              />
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Ionicons
                name="refresh-outline"
                size={spacing["lg"]}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reporting Stats */}
        {reportingStats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Summary Statistics</Text>

            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Total Hours:</Text>
              <Text style={styles.statsValue}>
                {reportingStats.totalHours}h
              </Text>
            </View>

            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Billable Hours:</Text>
              <Text style={styles.statsValue}>
                {reportingStats.billableHours}h
              </Text>
            </View>

            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Non-Billable Hours:</Text>
              <Text style={styles.statsValue}>
                {reportingStats.nonBillableHours}h
              </Text>
            </View>
          </View>
        )}

        {/* Results Section */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            Time Logs{" "}
            {timeLogsData?.items ? `(${timeLogsData.items.length})` : ""}
          </Text>

          {renderGroupedResults()}
        </View>
      </ScrollView>
    </View>
  );
}
