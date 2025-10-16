import { Calendar, CalendarEvent, CalendarView } from "@/components/ui";
import BarHeader from "@/components/ui/BarHeader/BarHeader";
import { useGetAdminDashboardQuery } from "@/store/api/modules/efs/efsDashboard";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function EFSDashboard() {
  const { palette } = useTheme();
  const {
    data: dashboardData,
    isLoading,
    refetch,
  } = useGetAdminDashboardQuery();

  const [view, setView] = useState<CalendarView>("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Convert API calendar events to CalendarEvent format
  const calendarEvents: CalendarEvent[] =
    dashboardData?.calendarEvents.map((event, index) => ({
      id: `event-${index}`,
      title: event.name,
      description: `${event.category} event`,
      start: new Date(event.fromDate),
      end: new Date(event.toDate),
      type: event.category.toLowerCase() as
        | "meeting"
        | "deadline"
        | "event"
        | "holiday",
      priority: "medium" as "low" | "medium" | "high",
    })) || [];

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
    console.log(`Event selected: ${event.title}`);
  };

  const handleEventLongPress = (event: CalendarEvent) => {
    console.log(`Long press on: ${event.title}`);
  };

  const handleTimeSlotPress = (date: Date) => {
    console.log(`Time slot clicked: ${date.toLocaleString()}`);
  };

  const handleTimeSlotLongPress = (date: Date) => {
    console.log(`Time slot long pressed: ${date.toLocaleString()}`);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <View style={styles.container}>
      <BarHeader title="Employee Facilitation" variant="large" />

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
          events={calendarEvents}
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
          loading={isLoading}
        />
      </ScrollView>
    </View>
  );
}
