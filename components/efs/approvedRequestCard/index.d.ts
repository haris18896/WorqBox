import { ReactNode, TextStyle, ViewStyle } from "react-native";

export interface ApprovedRequestCardProps {
  leaveRequest: {
    id: number;
    fromDate: string;
    toDate: string;
    daysCount: number;
    leaveTypeId: number;
    leaveTypeName: string;
    employeeFirstName: string;
    employeeLastName: string;
    employeeEmail: string;
    isApproved: boolean;
    isRejected: boolean;
    approvalNotes: string;
    rejectionNotes: string;
    longDescription: string;
  };
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onViewDetails?: (id: number) => void;
  showActions?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  children?: ReactNode;
}
