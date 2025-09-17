import { ViewStyle } from "react-native";

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  variant?: SwitchVariant;
  size?: SwitchSize;
  disabled?: boolean;
  style?: ViewStyle;
}

export type SwitchVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export type SwitchSize = "small" | "medium" | "large";

export interface SwitchStyleData {
  containerStyles?: ViewStyle;
  trackStyles?: ViewStyle;
  thumbStyles?: ViewStyle;
}
