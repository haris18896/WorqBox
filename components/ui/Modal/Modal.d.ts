import { TextStyle, ViewStyle } from "react-native";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  height?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  variant?: ModalVariant;
  animationType?: ModalAnimationType;
}

export type ModalVariant = "default" | "fullscreen" | "centered" | "bottom";
export type ModalAnimationType = "slide" | "fade" | "none";

export interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  subtitle: string;
  description: string;
  height?: string;
  isLoading: boolean;
}
