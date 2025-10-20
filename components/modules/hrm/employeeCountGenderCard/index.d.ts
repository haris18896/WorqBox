import { EmployeeCountWithGender } from "../../../../store/api/modules/hrm/hrmTypes";

export interface EmployeeCountGenderCardProps {
  data?: EmployeeCountWithGender;
  isLoading?: boolean;
  error?: any;
  onPress?: () => void;
}
