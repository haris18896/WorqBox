import { TimeLog } from "@/store/api/modules/pms/pmsTypes";

export interface TimeLogCardProps {
  timeLog: TimeLog;
  onPress?: (timeLog: TimeLog) => void;
}
