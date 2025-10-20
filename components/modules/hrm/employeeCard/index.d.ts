import { HrmEmployee } from "../../../../store/api/modules/hrm/hrmTypes";

export interface EmployeeCardProps {
  employee: HrmEmployee;
  onPress?: (employee: HrmEmployee) => void;
  onEdit?: (employee: HrmEmployee) => void;
  onDelete?: (employee: HrmEmployee) => void;
}
