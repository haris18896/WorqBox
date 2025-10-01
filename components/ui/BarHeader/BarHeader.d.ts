import { TextStyle, ViewStyle } from "react-native";

export interface BarHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onChatPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  variant?: BarHeaderVariant;
}

export type BarHeaderVariant = "default" | "large" | "minimal" | "search";
