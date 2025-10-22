import { TextStyle, ViewStyle } from "react-native";

export type outlineColor =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "error";
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSizeType;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  outlineColor?: outlineColor;
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "error";

export type ButtonSizeType = "small" | "medium" | "large";

export interface ButtonStyleData {
  variant: ButtonVariant;
  size: ButtonSizeType;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
}
