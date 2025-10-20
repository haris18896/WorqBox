import { AuthGuard } from "@/acl";
import { Stack } from "expo-router";

export default function ConfigurationsLayout() {
  return (
    <AuthGuard requireAuth={true}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="roles" />
        <Stack.Screen name="holidays" />
        <Stack.Screen name="departments" />
        <Stack.Screen name="country" />
        <Stack.Screen name="Region" />
        <Stack.Screen name="EmployeeCategory" />
        <Stack.Screen name="EmployeeDesignation" />
        <Stack.Screen name="EmployeePaygrade" />
        <Stack.Screen name="EmployeeTier" />
        <Stack.Screen name="EmploymentType" />
        <Stack.Screen name="EmployeeEvaluation" />
        <Stack.Screen name="MedicalReimbursment" />
        <Stack.Screen name="ApproveMedicalReimbursment" />
        <Stack.Screen name="LeaveType" />
        <Stack.Screen name="Relation" />
        <Stack.Screen name="AttendanceDevice" />
        <Stack.Screen name="LateArriavalPolicy" />
        <Stack.Screen name="SurveyForms" />
      </Stack>
    </AuthGuard>
  );
}
