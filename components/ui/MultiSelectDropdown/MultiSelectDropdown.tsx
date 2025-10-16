import { useTheme } from "@/theme";
import { scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MultiSelectDropdownProps,
  MultiSelectOption,
} from "./MultiSelectDropdown.d";

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  title,
  options = [],
  selectedValues = [],
  onSelectionChange,
  placeholder = "Select items...",
  disabled = false,
  variant = "outlined",
  size = "medium",
  styleData,
  searchable = true,
  maxHeight = 200,
  renderOption,
  renderSelectedItems,
}) => {
  const { palette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, options]);

  // Click outside to close is handled by the Pressable wrapper

  const selectedItems = options.filter((option) =>
    selectedValues.includes(option.id)
  );

  const toggleSelection = (optionId: number | string) => {
    if (disabled) return;

    const newSelection = selectedValues.includes(optionId)
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId];

    onSelectionChange(newSelection);
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: scaleSize(8),
          paddingHorizontal: inputSize.sm.paddingHorizontal,
          minHeight: inputSize.sm.height,
        };
      case "large":
        return {
          paddingVertical: scaleSize(12),
          paddingHorizontal: inputSize.lg.paddingHorizontal,
          minHeight: inputSize.lg.height,
        };
      default: // medium
        return {
          paddingVertical: scaleSize(10),
          paddingHorizontal: inputSize.md.paddingHorizontal,
          minHeight: inputSize.md.height,
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderWidth: 1,
      borderRadius: WP(3),
      flexDirection: "row" as const,
      alignItems: "center" as const,
      backgroundColor: "transparent",
      opacity: disabled ? 0.6 : 1,
      ...getSizeStyles(),
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: palette.surface.primary,
        borderColor: palette.border.primary,
      };
    }

    switch (variant) {
      case "filled":
        return {
          ...baseStyles,
          backgroundColor: palette.background.primary,
          borderColor: isOpen ? palette.primary.main : palette.border.primary,
        };
      case "underlined":
        return {
          ...baseStyles,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderRadius: 0,
          backgroundColor: "transparent",
          borderBottomColor: isOpen
            ? palette.primary.main
            : palette.border.primary,
        };
      default: // outlined
        return {
          ...baseStyles,
          borderColor: isOpen ? palette.primary.main : "#E5E7EB",
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: size === "small" ? spacing.sm : spacing.md,
      ...styleData?.containerStyles,
    },
    label: {
      fontSize: size === "small" ? 12 : 14,
      fontWeight: "500",
      color: disabled ? palette.text.tertiary : palette.text.secondary,
      marginBottom: size === "small" ? 4 : spacing.xs,
      ...styleData?.labelStyles,
    },
    dropdownContainer: {
      position: "relative",
    },
    dropdownTrigger: {
      ...getVariantStyles(),
      ...styleData?.dropdownStyles,
    },
    selectedItemsContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    selectedItem: {
      backgroundColor: palette.primary.main,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 4,
      marginBottom: 2,
    },
    selectedItemText: {
      color: palette.text.inverse,
      fontSize: 12,
      fontWeight: "500",
    },
    placeholder: {
      color: palette.text.tertiary,
      fontSize: size === "small" ? 14 : size === "large" ? 18 : 16,
    },
    chevronIcon: {
      marginLeft: spacing.sm,
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: palette.border.primary,
      zIndex: 9999,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: palette.border.primary,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 14,
      color: palette.text.primary,
      margin: 8,
    },
    optionsList: {
      maxHeight: maxHeight,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
      ...styleData?.optionStyles,
    },
    optionText: {
      flex: 1,
      fontSize: 14,
      color: palette.text.primary,
      ...styleData?.optionTextStyles,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 3,
      borderWidth: 2,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: {
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.main,
    },
    checkboxUnchecked: {
      backgroundColor: "transparent",
      borderColor: palette.border.primary,
    },
    footer: {
      padding: 8,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
      backgroundColor: palette.background.secondary,
    },
    footerText: {
      fontSize: 12,
      color: palette.text.secondary,
      textAlign: "center",
    },
  });

  const renderDefaultOption = (
    option: MultiSelectOption,
    isSelected: boolean
  ) => (
    <View style={styles.optionItem}>
      <View
        style={[
          styles.checkbox,
          isSelected ? styles.checkboxChecked : styles.checkboxUnchecked,
        ]}
      >
        {isSelected && (
          <Ionicons name="checkmark" size={10} color={palette.text.inverse} />
        )}
      </View>
      <Text style={styles.optionText}>{option.label}</Text>
    </View>
  );

  const renderDefaultSelectedItems = (items: MultiSelectOption[]) => {
    if (items.length === 0) {
      return <Text style={styles.placeholder}>{placeholder}</Text>;
    }

    if (items.length <= 2) {
      return (
        <View style={styles.selectedItemsContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.selectedItem}>
              <Text style={styles.selectedItemText}>{item.label}</Text>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.selectedItemsContainer}>
        <View style={styles.selectedItem}>
          <Text style={styles.selectedItemText}>{items[0].label}</Text>
        </View>
        <View style={styles.selectedItem}>
          <Text style={styles.selectedItemText}>+{items.length - 1} more</Text>
        </View>
      </View>
    );
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => isOpen && setIsOpen(false)}
    >
      {title && <Text style={styles.label}>{title}</Text>}

      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={(e) => {
            e.stopPropagation();
            !disabled && setIsOpen(!isOpen);
          }}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <View style={styles.selectedItemsContainer}>
            {renderSelectedItems
              ? renderSelectedItems(selectedItems)
              : renderDefaultSelectedItems(selectedItems)}
          </View>

          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={disabled ? palette.text.tertiary : palette.text.secondary}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        {isOpen && (
          <Pressable
            style={styles.dropdown}
            onPress={(e) => e.stopPropagation()}
          >
            {searchable && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor={palette.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )}

            <View style={styles.optionsList}>
              {filteredOptions.map((item) => {
                const isSelected = selectedValues.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id.toString()}
                    onPress={() => toggleSelection(item.id)}
                    activeOpacity={0.7}
                  >
                    {renderOption
                      ? renderOption(item, isSelected)
                      : renderDefaultOption(item, isSelected)}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {selectedValues.length} selected
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default MultiSelectDropdown;
