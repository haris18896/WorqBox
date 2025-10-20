import {
  DepartmentEmployeeCountCard,
  EmployeeCountGenderCard,
  PresentAbsentEmployeeCard,
} from "@/components/modules/hrm";
import { BarHeader, Loading } from "@/components/ui";
import {
  useGetEmployeeCountByDepartmentQuery,
  useGetEmployeeCountWithGenderQuery,
  useGetTodayPresentAbsentEmployeesQuery,
} from "@/store/api/modules/hrm/hrmDashboard";
import { useTheme } from "@/theme";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HRMDashboard() {
  const { palette } = useTheme();

  // Fetch HRM dashboard data
  const {
    data: genderStats,
    isLoading: genderLoading,
    error: genderError,
    refetch: refetchGender,
  } = useGetEmployeeCountWithGenderQuery();

  const {
    data: departmentStats,
    isLoading: departmentLoading,
    error: departmentError,
    refetch: refetchDepartment,
  } = useGetEmployeeCountByDepartmentQuery();

  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    error: attendanceError,
    refetch: refetchAttendance,
  } = useGetTodayPresentAbsentEmployeesQuery();

  const handleRefresh = () => {
    refetchGender();
    refetchDepartment();
    refetchAttendance();
  };

  const isLoading = genderLoading || departmentLoading || attendanceLoading;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: palette.text.primary,
      marginBottom: 16,
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="HRM Dashboard" variant="default" />
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Employee Statistics</Text>
        <Loading size="small" visible={isLoading} />
        <EmployeeCountGenderCard
          data={genderStats}
          isLoading={genderLoading}
          error={genderError}
          onPress={() => {
            // Handle card press - could navigate to detailed view
            console.log("Employee count gender card pressed");
          }}
        />

        <DepartmentEmployeeCountCard
          data={departmentStats}
          isLoading={departmentLoading}
          error={departmentError}
          onPress={() => {
            // Handle card press - could navigate to department view
            console.log("Department employee count card pressed");
          }}
          onDepartmentPress={(departmentId) => {
            // Handle department press - could navigate to department details
            console.log("Department pressed:", departmentId);
          }}
        />

        <PresentAbsentEmployeeCard
          data={attendanceData}
          isLoading={attendanceLoading}
          error={attendanceError}
          onPress={() => {
            // Handle card press - could navigate to attendance view
            console.log("Present/absent employee card pressed");
          }}
          onDatePress={(date) => {
            // Handle date press - could navigate to daily attendance details
            console.log("Date pressed:", date);
          }}
        />
      </ScrollView>
    </View>
  );
}
