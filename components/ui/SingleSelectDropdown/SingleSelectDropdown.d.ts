import { TextStyle, ViewStyle } from "react-native";

export interface SingleSelectOption {
  id: string | number;
  label: string;
  value: any;
}

export interface SingleSelectDropdownProps {
  title?: string;
  options: SingleSelectOption[];
  selectedValue: string | number;
  onSelectionChange: (selectedValue: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: "outlined" | "filled" | "underlined";
  size?: "small" | "medium" | "large";
  styleData?: {
    containerStyles?: ViewStyle;
    labelStyles?: TextStyle;
    dropdownStyles?: ViewStyle;
    optionStyles?: ViewStyle;
    optionTextStyles?: TextStyle;
    errorStyles?: TextStyle;
  };
  searchable?: boolean;
  maxHeight?: number;
  formikError?: string;
  formikTouched?: boolean;
}
