import { TextStyle, ViewStyle } from "react-native";

export interface BarHeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  variant?: BarHeaderVariant;
}

export type BarHeaderVariant = "default" | "large" | "minimal" | "search";
