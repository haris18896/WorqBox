import { LeaveRequest } from "../../../store/api/modules/efs/efsTypes";

export interface LeaveRequestCardProps {
  leaveRequest: LeaveRequest;
  onPress?: () => void;
}
