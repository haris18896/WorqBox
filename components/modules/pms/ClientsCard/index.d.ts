import { ClientProject } from "@/store/api/modules/pms/pmsTypes";

export interface ClientsCardProps {
  project: ClientProject;
  onPress?: (project: ClientProject) => void;
  onLongPress?: (project: ClientProject) => void;
}
