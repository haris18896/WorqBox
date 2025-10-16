import { useTheme } from "@/theme";
import { scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DatePickerProps } from "./DatePicker.d";

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  value,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
  variant = "outlined",
  size = "medium",
  styleData,
  mode = "date",
  minimumDate,
  maximumDate,
}) => {
  const { palette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
    inputContainer: {
      ...getVariantStyles(),
      ...styleData?.inputStyles,
    },
    inputText: {
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
    calendarIcon: {
      marginLeft: spacing.sm,
    },
    modal: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: palette.background.primary,
      borderRadius: 12,
      padding: 20,
      width: "90%",
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 20,
      textAlign: "center",
    },
    datePickerContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: palette.neutral.light,
    },
    confirmButton: {
      backgroundColor: palette.primary.main,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    cancelButtonText: {
      color: palette.text.secondary,
    },
    confirmButtonText: {
      color: palette.text.inverse,
    },
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleConfirm = () => {
    const dateString = selectedDate.toISOString().split("T")[0];
    onDateChange(dateString);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const openDatePicker = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.label}>{title}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={openDatePicker}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={20}
          color={disabled ? palette.text.tertiary : palette.text.secondary}
          style={styles.calendarIcon}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Select {mode}</Text>

            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={selectedDate}
                mode={mode}
                display="default"
                onChange={handleDateChange}
                minimumDate={minimumDate ? new Date(minimumDate) : undefined}
                maximumDate={maximumDate ? new Date(maximumDate) : undefined}
                textColor={palette.text.primary}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DatePicker;
