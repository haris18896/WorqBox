import { ClientProject } from "@/store/api/modules/pms/pmsTypes";

export interface ClientsCardProps {
  project: ClientProject;
  onDelete?: (project: ClientProject) => void;
  onUpdate?: (project: ClientProject) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}
