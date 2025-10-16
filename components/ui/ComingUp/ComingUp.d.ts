import { ReactNode, TextStyle, ViewStyle } from "react-native";

export interface ComingUpProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  customIcon?: ReactNode;
  estimatedDate?: string;
  features?: string[];
  actionText?: string;
  onActionPress?: () => void;
  variant?: "default" | "minimal" | "detailed" | "card";
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
  progress?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  actionStyle?: ViewStyle;
  actionTextStyle?: TextStyle;
  children?: ReactNode;
  animated?: boolean;
}
