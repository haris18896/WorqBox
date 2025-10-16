import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface MultiSelectOption {
  id: number | string;
  label: string;
  value: any;
}

export interface MultiSelectDropdownProps {
  title?: string;
  options: MultiSelectOption[];
  selectedValues: (number | string)[];
  onSelectionChange: (selectedValues: (number | string)[]) => void;
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
  };
  searchable?: boolean;
  maxHeight?: number;
  renderOption?: (option: MultiSelectOption, isSelected: boolean) => ReactNode;
  renderSelectedItems?: (selectedItems: MultiSelectOption[]) => ReactNode;
}
