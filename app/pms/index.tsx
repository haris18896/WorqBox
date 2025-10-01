import { Calendar, CalendarEvent, CalendarView } from "@/components/ui";
import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useToast } from "@/hooks/useToast";
import { spacing, useTheme } from "@/theme";
import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function PMSDashboard() {
  const { palette } = useTheme();
  const { showSuccess, showError } = useToast();
  const [view, setView] = useState<CalendarView>("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { events, addEvent, deleteEvent, loading } = useCalendarEvents();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: spacing.md,
    },
  });

  const handleEventPress = (event: CalendarEvent) => {
    showSuccess(`Event selected: ${event.title}`);
    Alert.alert(
      "Event Details",
      `${
        event.title
      }\n\nStart: ${event.start.toLocaleString()}\nEnd: ${event.end.toLocaleString()}`,
      [{ text: "OK" }]
    );
  };

  const handleEventLongPress = (event: CalendarEvent) => {
    showError(`Long press on: ${event.title}`);
    Alert.alert(
      "Event Actions",
      `What would you like to do with "${event.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => showSuccess("Edit event") },
        {
          text: "Delete",
          onPress: () => {
            deleteEvent(event.id);
            showSuccess("Event deleted");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleTimeSlotPress = (date: Date) => {
    showSuccess(`Time slot clicked: ${date.toLocaleString()}`);
    Alert.alert(
      "Add Event",
      `Would you like to add an event at ${date.toLocaleTimeString()}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add Event",
          onPress: () => {
            const newEvent: CalendarEvent = {
              id: Date.now().toString(),
              title: "New PMS Event",
              start: date,
              end: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour later
              color: palette.primary.main,
              backgroundColor: palette.primary.main + "20",
              textColor: "#FFFFFF",
            };
            addEvent(newEvent);
            showSuccess("Event added");
          },
        },
      ]
    );
  };

  const handleTimeSlotLongPress = (date: Date) => {
    showError(`Time slot long pressed: ${date.toLocaleString()}`);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      showSuccess("Calendar refreshed");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <BarHeader title="Project Management" variant="large" />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={palette.primary.main}
            colors={["transparent"]}
          />
        }
      >
        <Calendar
          events={events}
          view={view}
          day={true}
          week={true}
          month={true}
          defaultView="week"
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onViewChange={setView}
          onEventPress={handleEventPress}
          onEventLongPress={handleEventLongPress}
          onTimeSlotPress={handleTimeSlotPress}
          onTimeSlotLongPress={handleTimeSlotLongPress}
          showHeader={true}
          showNavigation={true}
          showTodayButton={true}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
}
