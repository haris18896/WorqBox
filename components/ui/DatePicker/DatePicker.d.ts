import { TextStyle, ViewStyle } from "react-native";

export interface DatePickerProps {
  title?: string;
  value?: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: "outlined" | "filled" | "underlined";
  size?: "small" | "medium" | "large";
  styleData?: {
    containerStyles?: ViewStyle;
    labelStyles?: TextStyle;
    inputStyles?: ViewStyle;
  };
  mode?: "date" | "time" | "datetime";
  minimumDate?: string;
  maximumDate?: string;
}
