import { DepartmentEmployeeCounts } from "../../../../store/api/modules/hrm/hrmTypes";

export interface DepartmentEmployeeCountCardProps {
  data?: DepartmentEmployeeCounts;
  isLoading?: boolean;
  error?: any;
  onPress?: () => void;
  onDepartmentPress?: (departmentId: number) => void;
}
