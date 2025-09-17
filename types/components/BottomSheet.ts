import { ViewStyle } from "react-native";

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number | string;
  maxHeight?: number | string;
  snapPoints?: number[];
  enablePanDownToClose?: boolean;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  showHandle?: boolean;
  showHeader?: boolean;
  variant?: BottomSheetVariant;
}

export type BottomSheetVariant = "default" | "modal" | "drawer";
