import { useTheme } from "@/theme";
import { scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DatePickerProps } from "./DatePicker.d";

const WebCalendar: React.FC<{
  value: Date;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  palette: any;
}> = ({ value, onDateChange, minimumDate, maximumDate, palette }) => {
  const [currentMonth, setCurrentMonth] = useState(value.getMonth());
  const [currentYear, setCurrentYear] = useState(value.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (minimumDate && date < minimumDate) return true;
    if (maximumDate && date > maximumDate) return true;
    return false;
  };

  const isDateSelected = (day: number) => {
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth &&
      value.getFullYear() === currentYear
    );
  };

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      const newDate = new Date(currentYear, currentMonth, day);
      onDateChange(newDate);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const webCalendarStyles = StyleSheet.create({
    calendarContainer: {
      padding: 16,
      maxWidth: 300,
      alignSelf: "center",
    },
    calendarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    monthYearText: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text.primary,
    },
    navButton: {
      padding: 6,
      borderRadius: 4,
      backgroundColor: palette.surface.primary,
      minWidth: 32,
      alignItems: "center",
    },
    navButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.primary.main,
    },
    dayNamesRow: {
      flexDirection: "row",
      marginBottom: 8,
    },
    dayName: {
      flex: 1,
      textAlign: "center",
      fontSize: 11,
      fontWeight: "500",
      color: palette.text.secondary,
      paddingVertical: 4,
    },
    calendarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    dayCell: {
      width: "14.28%",
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 2,
    },
    dayText: {
      fontSize: 13,
      color: palette.text.primary,
    },
    selectedDay: {
      backgroundColor: palette.primary.main,
      borderRadius: 16,
    },
    selectedDayText: {
      color: palette.background.primary,
      fontWeight: "600",
    },
    disabledDay: {
      opacity: 0.3,
    },
    disabledDayText: {
      color: palette.text.tertiary,
    },
  });

  return (
    <View style={webCalendarStyles.calendarContainer}>
      <View style={webCalendarStyles.calendarHeader}>
        <TouchableOpacity
          style={webCalendarStyles.navButton}
          onPress={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          <Text style={webCalendarStyles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={webCalendarStyles.monthYearText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity
          style={webCalendarStyles.navButton}
          onPress={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          <Text style={webCalendarStyles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={webCalendarStyles.dayNamesRow}>
        {dayNames.map((day) => (
          <Text key={day} style={webCalendarStyles.dayName}>
            {day}
          </Text>
        ))}
      </View>

      <View style={webCalendarStyles.calendarGrid}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              webCalendarStyles.dayCell,
              day && isDateSelected(day) ? webCalendarStyles.selectedDay : null,
              day && isDateDisabled(day) ? webCalendarStyles.disabledDay : null,
            ]}
            onPress={() => day && handleDateSelect(day)}
            disabled={!day || isDateDisabled(day)}
          >
            {day && (
              <Text
                style={[
                  webCalendarStyles.dayText,
                  isDateSelected(day) && webCalendarStyles.selectedDayText,
                  isDateDisabled(day) && webCalendarStyles.disabledDayText,
                ]}
              >
                {day}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const momentDate = moment(dateString);

      if (!momentDate.isValid()) return "";
      return momentDate.format("M/D/YYYY");
    } catch {
      console.warn("Invalid date string:", dateString);
      return "";
    }
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
      default:
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
          borderColor: showPicker
            ? palette.primary.main
            : palette.border.primary,
        };
      case "underlined":
        return {
          ...baseStyles,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderRadius: 0,
          backgroundColor: "transparent",
          borderBottomColor: showPicker
            ? palette.primary.main
            : palette.border.primary,
        };
      default: // outlined
        return {
          ...baseStyles,
          borderColor: showPicker ? palette.primary.main : "#E5E7EB",
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: size === "small" ? spacing.sm : spacing.md,
      position: "relative",
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
    pickerContainer: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: palette.background.primary,
      borderRadius: WP(3),
      borderWidth: 1,
      borderColor: palette.border.primary,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      zIndex: 1000,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: palette.background.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 34,
      maxHeight: "60%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
    },
    cancelButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    cancelButtonText: {
      fontSize: 16,
      color: palette.text.secondary,
    },
    doneButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    doneButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.primary.main,
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (selectedDate && event.type !== "dismissed") {
        const dateString = moment(selectedDate).format("YYYY-MM-DD");
        onDateChange(dateString);
      }
    } else {
      if (selectedDate) {
        setSelectedDate(selectedDate);
      }
    }
  };

  const handleDone = () => {
    setShowPicker(false);
    if (selectedDate) {
      const dateString = moment(selectedDate).format("YYYY-MM-DD");
      onDateChange(dateString);
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    setSelectedDate(null);
  };

  const openDatePicker = () => {
    if (disabled) return;
    setShowPicker(true);
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

      {showPicker && (
        <>
          {Platform.OS === "android" ? (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode={mode}
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate ? new Date(minimumDate) : undefined}
                maximumDate={maximumDate ? new Date(maximumDate) : undefined}
                textColor={palette.text.primary}
              />
            </View>
          ) : (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showPicker}
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={handleCancel}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Date</Text>
                    <TouchableOpacity
                      onPress={handleDone}
                      style={styles.doneButton}
                    >
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  {Platform.OS === "web" ? (
                    <WebCalendar
                      value={value ? new Date(value) : new Date()}
                      onDateChange={(date) => {
                        setSelectedDate(date);

                        const dateString = moment(date).format("YYYY-MM-DD");
                        onDateChange(dateString);
                        setShowPicker(false);
                      }}
                      minimumDate={
                        minimumDate ? new Date(minimumDate) : undefined
                      }
                      maximumDate={
                        maximumDate ? new Date(maximumDate) : undefined
                      }
                      palette={palette}
                    />
                  ) : (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode={mode}
                      display={"spinner"}
                      onChange={handleDateChange}
                      minimumDate={
                        minimumDate ? new Date(minimumDate) : undefined
                      }
                      maximumDate={
                        maximumDate ? new Date(maximumDate) : undefined
                      }
                      textColor={palette.text.primary}
                    />
                  )}
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </View>
  );
};

export default DatePicker;
