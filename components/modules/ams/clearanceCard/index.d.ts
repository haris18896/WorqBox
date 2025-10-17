import { EmployeeAssignment } from "../../../../store/api/modules/ams/amsTypes";

export interface ClearanceCardProps {
  employeeAssignment: EmployeeAssignment;
  onPress?: (employeeAssignment: EmployeeAssignment) => void;
  onConfirmClearance?: (employeeAssignment: EmployeeAssignment) => void;
}
