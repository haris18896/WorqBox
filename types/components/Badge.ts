import { TextStyle, ViewStyle } from "react-native";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type BadgeSize = "small" | "medium" | "large";

export interface BadgeStyleData {
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
}
