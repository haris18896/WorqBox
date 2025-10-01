import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarEvent, DayViewProps } from "./calendar.d";
import { EventItem } from "./EventItem";

export const DayView: React.FC<DayViewProps> = ({
  events,
  selectedDate,
  onEventPress,
  onEventLongPress,
  onTimeSlotPress,
  onTimeSlotLongPress,
  onDateChange,
  theme,
  style,
}) => {
  const { palette } = useTheme();
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: palette.background.primary,
      borderRadius: 12,
      padding: spacing.md,
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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    dateText: {
      fontSize: 18,
      fontWeight: "700",
      color: palette.text.primary,
    },
    timelineContainer: {
      flex: 1,
    },
    timeSlot: {
      flexDirection: "row",
      height: 60,
      borderBottomWidth: 1,
      borderColor: palette.border.primary,
    },
    timeText: {
      width: 60,
      textAlign: "center",
      fontSize: 12,
      color: palette.text.secondary,
      fontWeight: "500",
      paddingTop: spacing.sm,
    },
    timeSlotContent: {
      flex: 1,
      borderLeftWidth: 1,
      borderColor: palette.border.primary,
      paddingLeft: spacing.sm,
      position: "relative",
    },
    eventContainer: {
      width: "100%",
    },
    dropdownContainer: {
      marginTop: spacing.xs,
      backgroundColor: palette.background.secondary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: palette.border.primary,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 8,
      zIndex: 1000,
    },
    dropdownItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
    },
    dropdownItemLast: {
      borderBottomWidth: 0,
    },
    dropdownIcon: {
      marginRight: spacing.sm,
    },
    dropdownInfo: {
      flex: 1,
    },
    dropdownTime: {
      fontSize: 12,
      fontWeight: "600",
      color: palette.text.primary,
    },
    dropdownTitle: {
      fontSize: 11,
      color: palette.text.secondary,
      marginTop: 2,
    },
    overlapButton: {
      backgroundColor: palette.primary.main,
      borderRadius: 12,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      minWidth: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    overlapCount: {
      color: palette.text.inverse,
      fontSize: 10,
      fontWeight: "700",
    },
    noEventsContainer: {
      backgroundColor: palette.background.secondary,
      borderRadius: 8,
      padding: spacing.lg,
      marginBottom: spacing.md,
      alignItems: "center",
    },
    noEventsText: {
      fontSize: 14,
      color: palette.text.secondary,
      fontStyle: "italic",
    },
  });

  // Get events for the selected date
  const dayEvents = useMemo(() => {
    const startOfDay = moment(selectedDate).startOf("day");
    const endOfDay = moment(selectedDate).endOf("day");

    return events.filter((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return eventStart.isBefore(endOfDay) && eventEnd.isAfter(startOfDay);
    });
  }, [events, selectedDate]);

  // Group events by hour
  const eventsByHour = useMemo(() => {
    const grouped: { [hour: number]: CalendarEvent[] } = {};

    dayEvents.forEach((event) => {
      const hour = moment(event.start).hour();
      if (!grouped[hour]) {
        grouped[hour] = [];
      }
      grouped[hour].push(event);
    });

    return grouped;
  }, [dayEvents]);

  // Handle overlapping events
  const handleOverlaps = useCallback((hourEvents: CalendarEvent[]) => {
    if (hourEvents.length === 0) return { visible: null, hidden: [] };

    const sortedEvents = [...hourEvents].sort((a, b) => {
      return moment(a.start).diff(moment(b.start));
    });

    if (sortedEvents.length === 1) {
      return { visible: sortedEvents[0], hidden: [] };
    }

    return {
      visible: sortedEvents[0],
      hidden: sortedEvents.slice(1),
    };
  }, []);

  const handleTimeSlotPress = useCallback(
    (hour: number) => {
      const timeSlotDate = moment(selectedDate)
        .hour(hour)
        .minute(0)
        .second(0)
        .toDate();
      onTimeSlotPress?.(timeSlotDate);
    },
    [selectedDate, onTimeSlotPress]
  );

  const handleTimeSlotLongPress = useCallback(
    (hour: number) => {
      const timeSlotDate = moment(selectedDate)
        .hour(hour)
        .minute(0)
        .second(0)
        .toDate();
      onTimeSlotLongPress?.(timeSlotDate);
    },
    [selectedDate, onTimeSlotLongPress]
  );

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {moment(selectedDate).format("dddd, MMMM D")}
        </Text>
      </View>

      <ScrollView
        style={styles.timelineContainer}
        showsVerticalScrollIndicator={false}
      >
        {dayEvents.length === 0 && (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events for this day</Text>
          </View>
        )}
        {Array.from({ length: 24 }).map((_, hour) => {
          const hourEvents = eventsByHour[hour] || [];
          const { visible, hidden } = handleOverlaps(hourEvents);
          const dropdownKey = `${moment(selectedDate).format(
            "YYYY-MM-DD"
          )}-${hour}`;
          const isDropdownOpen = expandedDropdown === dropdownKey;

          return (
            <View key={hour} style={styles.timeSlot}>
              <Text style={styles.timeText}>{formatHour(hour)}</Text>
              <TouchableOpacity
                style={styles.timeSlotContent}
                onPress={() => handleTimeSlotPress(hour)}
                onLongPress={() => handleTimeSlotLongPress(hour)}
                activeOpacity={0.7}
              >
                {visible && (
                  <View style={styles.eventContainer}>
                    <EventItem
                      event={visible}
                      onPress={onEventPress}
                      onLongPress={onEventLongPress}
                    />

                    {hidden.length > 0 && (
                      <TouchableOpacity
                        style={styles.overlapButton}
                        onPress={() =>
                          setExpandedDropdown(
                            isDropdownOpen ? null : dropdownKey
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <Text style={styles.overlapCount}>
                          +{hidden.length}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Dropdown for hidden events */}
                    {isDropdownOpen && hidden.length > 0 && (
                      <View style={styles.dropdownContainer}>
                        {hidden.map((event, index) => (
                          <TouchableOpacity
                            key={event.id}
                            style={[
                              styles.dropdownItem,
                              index === hidden.length - 1 &&
                                styles.dropdownItemLast,
                            ]}
                            onPress={() => {
                              onEventPress?.(event);
                              setExpandedDropdown(null);
                            }}
                            activeOpacity={0.7}
                          >
                            <Ionicons
                              name="calendar-outline"
                              size={16}
                              color={event.color || palette.primary.main}
                              style={styles.dropdownIcon}
                            />
                            <View style={styles.dropdownInfo}>
                              <Text style={styles.dropdownTime}>
                                {moment(event.start).format("hh:mm a")} -{" "}
                                {moment(event.end).format("hh:mm a")}
                              </Text>
                              <Text style={styles.dropdownTitle}>
                                {event.title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
