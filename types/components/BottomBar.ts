import { ViewStyle } from "react-native";

export interface BottomBarProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
  tabs: BottomBarTab[];
  style?: ViewStyle;
}

export interface BottomBarTab {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
  badge?: number;
  disabled?: boolean;
}

export type BottomBarVariant = "default" | "floating" | "minimal";
