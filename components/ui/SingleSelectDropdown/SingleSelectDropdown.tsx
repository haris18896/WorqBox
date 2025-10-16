import { useTheme } from "@/theme";
import { scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SingleSelectDropdownProps } from "./SingleSelectDropdown.d";

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  title,
  options = [],
  selectedValue,
  onSelectionChange,
  placeholder = "Select item...",
  disabled = false,
  variant = "outlined",
  size = "medium",
  styleData,
  searchable = true,
  maxHeight = 200,
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

  const selectedItem = options.find((option) => option.id === selectedValue);

  const handleSelection = (optionId: string | number) => {
    if (disabled) return;
    onSelectionChange(optionId);
    setIsOpen(false);
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
    selectedText: {
      flex: 1,
      fontSize:
        size === "small"
          ? inputSize.sm.fontSize
          : size === "large"
          ? inputSize.lg.fontSize
          : inputSize.md.fontSize,
      color: disabled ? palette.text.tertiary : palette.text.secondary,
      paddingVertical: 0,
    },
    placeholder: {
      color: palette.text.tertiary,
    },
    chevronIcon: {
      marginLeft: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdown: {
      backgroundColor: palette.background.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: palette.border.primary,
      minWidth: 200,
      maxWidth: "90%",
      maxHeight: 300,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
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
    radioButton: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    radioButtonSelected: {
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.main,
    },
    radioButtonUnselected: {
      backgroundColor: "transparent",
      borderColor: palette.border.primary,
    },
    radioButtonInner: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.text.inverse,
    },
  });

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
          <Text
            style={[styles.selectedText, !selectedItem && styles.placeholder]}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </Text>

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
                      const isSelected = selectedValue === item.id;
                      return (
                        <TouchableOpacity
                          key={item.id.toString()}
                          onPress={() => handleSelection(item.id)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.optionItem}>
                            <View
                              style={[
                                styles.radioButton,
                                isSelected
                                  ? styles.radioButtonSelected
                                  : styles.radioButtonUnselected,
                              ]}
                            >
                              {isSelected && (
                                <View style={styles.radioButtonInner} />
                              )}
                            </View>
                            <Text style={styles.optionText}>{item.label}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
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

export default SingleSelectDropdown;
