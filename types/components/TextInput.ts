import {
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface TextInputStyleData {
  containerStyles?: ViewStyle;
  inputStyles?: TextStyle;
  labelStyles?: TextStyle;
  errorStyles?: TextStyle;
}

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  title?: string;
  leftIcon?: string;
  variant?: "outlined" | "filled" | "underlined";
  formikError?: string;
  formikTouched?: boolean;
  nextInputRef?: React.RefObject<any>;
  styleData?: TextInputStyleData;
}

export type TextInputVariant = "outlined" | "filled" | "underlined";

export type TextInputIconType =
  | "email"
  | "password"
  | "user"
  | "phone"
  | "search"
  | "calendar"
  | "location";
