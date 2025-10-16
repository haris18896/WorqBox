import { TimeLog } from "@/store/api/modules/pms/pmsTypes";

export interface EmployeeGroupedReportsProps {
  groupedTimeLogs: { [key: string]: TimeLog[] };
}
