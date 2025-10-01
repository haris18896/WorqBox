import { TextStyle, ViewStyle } from "react-native";

export interface EmptyProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  actionStyle?: ViewStyle;
  children?: React.ReactNode;
}

export type EmptyVariant = "default" | "minimal" | "illustrated";
