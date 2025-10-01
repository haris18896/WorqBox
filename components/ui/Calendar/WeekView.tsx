import { spacing, useTheme } from "@/theme";
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CalendarEvent, WeekViewProps } from "./calendar.d";
import { EventItem } from "./EventItem";

export const WeekView: React.FC<WeekViewProps> = ({
  events,
  selectedDate,
  onEventPress,
  onEventLongPress,
  onDateChange,
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
      flexDirection: "row",
      backgroundColor: palette.background.primary,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      padding: spacing.sm,
      marginTop: spacing.md,
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
    weekHeader: {
      paddingHorizontal: spacing.md,
      alignItems: "center",
    },
    weekTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
    },
  });

  // Get events for the week
  const weekEvents = useMemo(() => {
    const weekStart = moment(selectedDate).startOf("week");
    const weekEnd = moment(selectedDate).endOf("week");

    return events.filter((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return eventStart.isBefore(weekEnd) && eventEnd.isAfter(weekStart);
    });
  }, [events, selectedDate]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: { [day: string]: CalendarEvent[] } = {};

    weekEvents.forEach((event) => {
      const dayKey = moment(event.start).format("YYYY-MM-DD");
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(event);
    });

    return grouped;
  }, [weekEvents]);

  const weekStart = moment(selectedDate).startOf("week");

  return (
    <View style={[styles.container, style]}>
      {/* Week Header */}
      <View style={styles.weekHeader}>
        <Text style={styles.weekTitle}>
          {moment(weekStart).format("MMM D")} -{" "}
          {moment(weekStart).add(6, "days").format("MMM D, YYYY")}
        </Text>
      </View>

      {/* Weekly Grid */}
      {weekEvents.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events for this week</Text>
        </View>
      ) : (
        <View style={styles.weeklyGrid}>
          {Array.from({ length: 7 }).map((_, index) => {
            const dayDate = moment(weekStart).add(index, "days");
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
      )}
    </View>
  );
};
