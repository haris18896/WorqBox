import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { MonthViewProps } from "./calendar.d";

export const MonthView: React.FC<MonthViewProps> = ({
  events,
  selectedDate,
  onEventPress,
  onEventLongPress,
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
      backgroundColor: palette.background.primary,
      borderRadius: 12,
    },
    monthCardsContainer: {
      padding: spacing.md,
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

  // Get events for the selected date
  const selectedDateEvents = useMemo(() => {
    const selectedDateKey = dayjs(selectedDate).format("YYYY-MM-DD");

    return events.filter((event) => {
      const eventStart = dayjs(event.start).format("YYYY-MM-DD");
      const eventEnd = dayjs(event.end).format("YYYY-MM-DD");
      return (
        eventStart === selectedDateKey ||
        eventEnd === selectedDateKey ||
        (dayjs(event.start).isBefore(dayjs(selectedDate)) &&
          dayjs(event.end).isAfter(dayjs(selectedDate)))
      );
    });
  }, [events, selectedDate]);

  // Calendar theme
  const calendarTheme = useMemo(
    () => ({
      palette: {
        primary: {
          main: palette.primary.main,
          contrastText: palette.text.inverse,
        },
        nowIndicator: palette.primary.main,
        gray: {
          100: palette.background.secondary,
          200: palette.border.primary,
          300: palette.text.secondary,
          500: palette.text.primary,
          800: palette.text.primary,
        },
        moreLabel: palette.text.secondary,
      },
      isRTL: false,
      typography: {
        fontFamily: "Poppins-Regular",
        xs: {
          fontSize: 10,
          fontWeight: "500" as const,
        },
        sm: {
          fontSize: 12,
          fontWeight: "500" as const,
        },
        xl: {
          fontSize: 14,
          fontWeight: "600" as const,
        },
        moreLabel: {
          fontSize: 10,
          fontWeight: "600" as const,
        },
      },
      eventCellOverlappings: [
        { main: palette.success.main, contrastText: palette.text.inverse },
        { main: palette.warning.main, contrastText: palette.text.inverse },
        { main: palette.error.main, contrastText: palette.text.inverse },
        { main: palette.info.main, contrastText: palette.text.inverse },
      ],
      moreLabel: {
        fontSize: 10,
        fontWeight: "600" as const,
        color: palette.text.secondary,
      },
    }),
    [palette]
  );

  const formatTime = (date: Date) => {
    return dayjs(date).format("HH:mm");
  };

  if (selectedDateEvents.length === 0) {
    return (
      <View style={[styles.container, style]}>
        <Calendar
          events={[]}
          height={300}
          mode="month"
          date={selectedDate}
          theme={calendarTheme}
        />
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events for this day</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Calendar
        events={events}
        height={300}
        mode="month"
        date={selectedDate}
        theme={calendarTheme}
        onPressEvent={onEventPress}
      />

      <View style={styles.monthCardsContainer}>
        {selectedDateEvents.map((event) => (
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
                {dayjs(event.start).format("dddd, MMMM D")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
