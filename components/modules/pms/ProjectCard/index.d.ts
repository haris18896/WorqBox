import { Project } from "@/store/api/modules/pms/pmsTypes";

export interface ProjectCardProps {
  project: Project;
  onPress?: (project: Project) => void;
  onLongPress?: (project: Project) => void;
}
