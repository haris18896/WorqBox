import { useTheme } from "@/theme";
import { scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    dropdown: {
      backgroundColor: palette.background.primary,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.border.primary,
      width: "90%",
      maxHeight: 400,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 15,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    closeButton: {
      padding: 4,
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
      flexGrow: 0,
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

        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.dropdown}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {title || "Select Items"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsOpen(false)}
                      style={styles.closeButton}
                    >
                      <Ionicons
                        name="close"
                        size={20}
                        color={palette.text.secondary}
                      />
                    </TouchableOpacity>
                  </View>

                  {searchable && (
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search..."
                      placeholderTextColor={palette.text.tertiary}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  )}

                  <ScrollView
                    style={styles.optionsList}
                    showsVerticalScrollIndicator={true}
                  >
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
                  </ScrollView>

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      {selectedValues.length} selected
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </Pressable>
  );
};

export default MultiSelectDropdown;
