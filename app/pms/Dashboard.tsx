import { Calendar, CalendarEvent, CalendarView } from "@/components/ui";
import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useToast } from "@/hooks/useToast";
import { spacing, useTheme } from "@/theme";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function PMSDashboard() {
  const { palette } = useTheme();
  const { showSuccess, showError } = useToast();
  const [view, setView] = useState<CalendarView>("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { events, addEvent, deleteEvent, loading } = useCalendarEvents();

  console.log("events : ", events);
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
  };

  const handleEventLongPress = (event: CalendarEvent) => {
    showError(`Long press on: ${event.title}`);
  };

  const handleTimeSlotPress = (date: Date) => {
    showSuccess(`Time slot clicked: ${date.toLocaleString()}`);
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
