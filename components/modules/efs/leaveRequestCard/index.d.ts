import { LeaveRequest } from "../../../../store/api/modules/efs/efsTypes";

export interface LeaveRequestCardProps {
  leaveRequest: LeaveRequest;
  onPress?: () => void;
  onEdit?: (leaveRequest: LeaveRequest) => void;
  onDelete?: (leaveRequest: LeaveRequest) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}
