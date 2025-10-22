import { Project } from "@/store/api/modules/pms/pmsTypes";

export interface ProjectCardProps {
  project: Project;
  onPress?: (project: Project) => void;
  onLongPress?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onView?: (project: Project) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}
