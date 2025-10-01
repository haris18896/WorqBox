import { spacing, useTheme } from "@/theme";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { CalendarEvent, WeekViewProps } from "./calendar.d";
import { EventItem } from "./EventItem";

export const WeekView: React.FC<WeekViewProps> = ({
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
    weeklyGrid: {
      marginTop: -4,
      flexDirection: "row",
      backgroundColor: palette.background.primary,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      padding: spacing.sm,
    },
    dayColumn: {
      flex: 1,
      borderRightWidth: 1,
      borderColor: palette.border.primary,
      paddingHorizontal: spacing.xs,
      backgroundColor: palette.background.primary,
    },
    dayColumnLast: {
      borderRightWidth: 0,
    },
    dayHeader: {
      alignItems: "center",
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderColor: palette.border.primary,
    },
    dayName: {
      fontSize: 12,
      fontWeight: "600",
      color: palette.text.primary,
    },
    dayDate: {
      fontSize: 10,
      color: palette.text.secondary,
      marginTop: 2,
    },
    dayContent: {
      paddingVertical: spacing.sm,
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

  // Get events for the week
  const weekEvents = useMemo(() => {
    const weekStart = dayjs(selectedDate).startOf("week");
    const weekEnd = dayjs(selectedDate).endOf("week");

    return events.filter((event) => {
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);
      return eventStart.isBefore(weekEnd) && eventEnd.isAfter(weekStart);
    });
  }, [events, selectedDate]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: { [day: string]: CalendarEvent[] } = {};

    weekEvents.forEach((event) => {
      const dayKey = dayjs(event.start).format("YYYY-MM-DD");
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(event);
    });

    return grouped;
  }, [weekEvents]);

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

  const weekStart = dayjs(selectedDate).startOf("week");

  if (weekEvents.length === 0) {
    return (
      <View style={[styles.container, style]}>
        <Calendar
          events={[]}
          height={200}
          mode="week"
          date={selectedDate}
          theme={calendarTheme}
        />
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events for this week</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Calendar
        events={weekEvents}
        height={200}
        mode="week"
        date={selectedDate}
        theme={calendarTheme}
        onPressEvent={onEventPress}
      />

      <View style={styles.weeklyGrid}>
        {Array.from({ length: 7 }).map((_, index) => {
          const dayDate = dayjs(weekStart).add(index, "days");
          const dayKey = dayDate.format("YYYY-MM-DD");
          const dayEvents = eventsByDay[dayKey] || [];

          return (
            <View
              key={index}
              style={[styles.dayColumn, index === 6 && styles.dayColumnLast]}
            >
              <View style={styles.dayHeader}>
                <Text style={styles.dayName}>{dayDate.format("ddd")}</Text>
                <Text style={styles.dayDate}>{dayDate.format("D")}</Text>
              </View>
              <View style={styles.dayContent}>
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onPress={onEventPress}
                    onLongPress={onEventLongPress}
                    compact
                  />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
