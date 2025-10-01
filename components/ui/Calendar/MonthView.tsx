import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MonthViewProps } from "./calendar.d";

export const MonthView: React.FC<MonthViewProps> = ({
  events,
  selectedDate,
  onEventPress,
  onEventLongPress,
  onDateChange,
  theme,
  style,
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: palette.background.primary,
      borderRadius: 12,
      marginBottom: spacing.md,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    calendar: {
      backgroundColor: palette.background.secondary,
      borderRadius: 12,
    },
    monthCardsContainer: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    monthCard: {
      borderRadius: 8,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: palette.border.primary,
      backgroundColor: palette.background.secondary,
    },
    monthCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    monthCardIcon: {
      marginRight: spacing.sm,
    },
    monthCardTime: {
      flex: 1,
    },
    monthCardTimeText: {
      fontSize: 16,
      fontWeight: "700",
      color: palette.text.primary,
    },
    monthCardContent: {
      gap: spacing.xs,
    },
    monthCardTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: palette.text.primary,
    },
    monthCardDetails: {
      fontSize: 12,
      color: palette.text.secondary,
    },
    monthCardDescription: {
      fontSize: 12,
      color: palette.text.secondary,
      fontStyle: "italic",
    },
    noEventsContainer: {
      backgroundColor: palette.background.secondary,
      borderRadius: 8,
      padding: spacing.lg,
      marginTop: spacing.md,
      alignItems: "center",
    },
    noEventsText: {
      fontSize: 14,
      color: palette.text.secondary,
      fontStyle: "italic",
    },
  });

  // Get events for the entire month
  const monthEvents = useMemo(() => {
    const monthStart = moment(selectedDate).startOf("month");
    const monthEnd = moment(selectedDate).endOf("month");

    return events.filter((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return eventStart.isBefore(monthEnd) && eventEnd.isAfter(monthStart);
    });
  }, [events, selectedDate]);

  // Get events for the selected date
  const selectedDateEvents = useMemo(() => {
    const selectedDateKey = moment(selectedDate).format("YYYY-MM-DD");

    return events.filter((event) => {
      const eventStart = moment(event.start).format("YYYY-MM-DD");
      const eventEnd = moment(event.end).format("YYYY-MM-DD");
      return (
        eventStart === selectedDateKey ||
        eventEnd === selectedDateKey ||
        (moment(event.start).isBefore(moment(selectedDate)) &&
          moment(event.end).isAfter(moment(selectedDate)))
      );
    });
  }, [events, selectedDate]);

  const formatTime = (date: Date) => {
    return moment(date).format("hh:mm A");
  };

  // Convert events to react-native-calendars format
  const markedDates = useMemo(() => {
    const marked: any = {};

    monthEvents.forEach((event) => {
      const dateKey = moment(event.start).format("YYYY-MM-DD");
      if (!marked[dateKey]) {
        marked[dateKey] = {
          marked: true,
          dotColor: event.color || palette.primary.main,
          selectedColor: palette.primary.main,
        };
      }
    });

    // Mark selected date
    const selectedDateKey = moment(selectedDate).format("YYYY-MM-DD");
    if (marked[selectedDateKey]) {
      marked[selectedDateKey].selected = true;
      marked[selectedDateKey].selectedColor = palette.primary.main;
    } else {
      marked[selectedDateKey] = {
        selected: true,
        selectedColor: palette.primary.main,
      };
    }

    return marked;
  }, [monthEvents, selectedDate, palette]);

  return (
    <View style={[styles.container, style]}>
      <Calendar
        current={moment(selectedDate).format("YYYY-MM-DD")}
        onDayPress={(day) => {
          const newDate = new Date(day.dateString);
          // Call onDateChange if available
          if (onDateChange) {
            onDateChange(newDate);
          }
        }}
        markedDates={markedDates}
        theme={{
          backgroundColor: palette.background.secondary,
          calendarBackground: palette.background.secondary,
          textSectionTitleColor: palette.text.primary,
          selectedDayBackgroundColor: palette.primary.main,
          selectedDayTextColor: palette.text.inverse,
          todayTextColor: palette.primary.main,
          dayTextColor: palette.text.primary,
          textDisabledColor: palette.text.secondary,
          dotColor: palette.primary.main,
          selectedDotColor: palette.text.inverse,
          arrowColor: palette.primary.main,
          monthTextColor: palette.text.primary,
          indicatorColor: palette.primary.main,
          textDayFontWeight: "500",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      <View style={styles.monthCardsContainer}>
        {monthEvents.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events for this month</Text>
          </View>
        ) : selectedDateEvents.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events for this day</Text>
          </View>
        ) : (
          selectedDateEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.monthCard,
                {
                  backgroundColor:
                    event.backgroundColor || palette.background.secondary,
                  borderLeftColor: event.color || palette.primary.main,
                  borderLeftWidth: 3,
                },
              ]}
              onPress={() => onEventPress?.(event)}
              onLongPress={() => onEventLongPress?.(event)}
              activeOpacity={0.7}
            >
              <View style={styles.monthCardHeader}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={event.color || palette.primary.main}
                  style={styles.monthCardIcon}
                />
                <View style={styles.monthCardTime}>
                  <Text style={styles.monthCardTimeText}>
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </Text>
                </View>
              </View>

              <View style={styles.monthCardContent}>
                <Text style={styles.monthCardTitle}>{event.title}</Text>
                {event.children && (
                  <Text style={styles.monthCardDetails}>
                    {typeof event.children === "string"
                      ? event.children
                      : "Additional details"}
                  </Text>
                )}
                <Text style={styles.monthCardDescription}>
                  {moment(event.start).format("dddd, MMMM D")}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};
