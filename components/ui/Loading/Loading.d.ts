import { TextStyle, ViewStyle } from "react-native";

export interface LoadingProps {
  visible: boolean;
  text?: string;
  overlay?: boolean;
  size?: LoadingSize;
  variant?: LoadingVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export type LoadingSize = "small" | "medium" | "large";
export type LoadingVariant = "spinner" | "dots" | "pulse" | "skeleton";
