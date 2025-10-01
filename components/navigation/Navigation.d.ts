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

export interface BottomBarProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
  tabs: BottomBarTab[];
  style?: ViewStyle;
}

export interface BottomBarTab {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
  badge?: number;
  disabled?: boolean;
}

export type BottomSheetVariant = "default" | "modal" | "drawer";

// export interface NavigationParams {
//   [key: string]: any;
// }

// export interface AuthStackParamList {
//   Login: undefined;
//   Register: undefined;
//   ForgotPassword: undefined;
//   ResetPassword: { token: string };
// }

// export interface MainStackParamList {
//   Home: undefined;
//   Profile: undefined;
//   Settings: undefined;
// }

// export interface RootStackParamList
//   extends AuthStackParamList,
//     MainStackParamList {}

// export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
//   navigation: any;
//   route: { params: AuthStackParamList[T] };
// };

// export type MainStackScreenProps<T extends keyof MainStackParamList> = {
//   navigation: any;
//   route: { params: MainStackParamList[T] };
// };
