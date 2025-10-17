import { TimeLog } from "@/store/api/modules/pms/pmsTypes";

export interface ProjectGroupedReportsProps {
  groupedTimeLogs: { [key: string]: TimeLog[] };
  employeeProfilePictureMap: { [key: number]: string };
}
