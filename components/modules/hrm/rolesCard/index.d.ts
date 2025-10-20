import {
  RoleListingItem,
  SystemModulePageItem,
} from "@/store/api/modules/hrm/hrmTypes";

export interface RolesCardProps {
  role: RoleListingItem;
  modulePageLookup?: Record<number, SystemModulePageItem>;
  onPress?: (role: RoleListingItem) => void;
  onEdit?: (role: RoleListingItem) => void;
  onDelete?: (role: RoleListingItem) => void;
}
