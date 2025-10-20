import { PresentAbsentEmployee } from "../../../../store/api/modules/hrm/hrmTypes";

export interface PresentAbsentEmployeeCardProps {
  data?: PresentAbsentEmployee[];
  isLoading?: boolean;
  error?: any;
  onPress?: () => void;
  onDatePress?: (date: string) => void;
}
