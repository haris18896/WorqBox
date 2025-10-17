import { LeaveType } from "../../../store/api/modules/efs/efsTypes";

export interface LeaveRequestModalProps {
  visible: boolean;
  onClose: () => void;
  leaveTypes: LeaveType[];
  isLoadingLeaveTypes?: boolean;
}

export interface FormValues {
  leaveTypeId: string | number | null;
  startDate: Date;
  endDate: Date;
  isHalfDay: boolean;
  reason: string;
}
