import { useTheme } from "@/theme";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { CalendarEvent, CalendarProps, CalendarView } from "./calendar.d";
import { CalendarHeader } from "./CalendarHeader";
import { DayView } from "./DayView";
import { EventModal } from "./EventModal";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

export const Calendar: React.FC<CalendarProps> = ({
  events = [],
  view: controlledView,
  day = true,
  week = true,
  month = true,
  defaultView = "week",
  selectedDate: controlledSelectedDate,
  onDateChange,
  onViewChange,
  onEventPress,
  onEventLongPress,
  onTimeSlotPress,
  onTimeSlotLongPress,
  height = 400,
  showHeader = true,
  showNavigation = true,
  showTodayButton = true,
  locale = "en",
  theme,
  style,
  loading = false,
  onRefresh,
  refreshing = false,
}) => {
  const { palette } = useTheme();

  // Internal state
  const [internalView, setInternalView] = useState<CalendarView>(defaultView);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date>(
    controlledSelectedDate || new Date()
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Use controlled or internal state
  const currentView = controlledView || internalView;
  const currentSelectedDate = controlledSelectedDate || internalSelectedDate;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
  });

  // Available views based on props
  const availableViews = useMemo(() => {
    const views: CalendarView[] = [];
    if (day) views.push("day");
    if (week) views.push("week");
    if (month) views.push("month");
    return views;
  }, [day, week, month]);

  // Handle view change
  const handleViewChange = useCallback(
    (newView: CalendarView) => {
      if (!controlledView) {
        setInternalView(newView);
      }
      onViewChange?.(newView);
    },
    [controlledView, onViewChange]
  );

  // Handle date change
  const handleDateChange = useCallback(
    (newDate: Date) => {
      if (!controlledSelectedDate) {
        setInternalSelectedDate(newDate);
      }
      onDateChange?.(newDate);
    },
    [controlledSelectedDate, onDateChange]
  );

  // Handle previous navigation
  const handlePrevious = useCallback(() => {
    const newDate = dayjs(currentSelectedDate)
      .subtract(
        1,
        currentView === "day"
          ? "day"
          : currentView === "week"
          ? "week"
          : "month"
      )
      .toDate();
    handleDateChange(newDate);
  }, [currentSelectedDate, currentView, handleDateChange]);

  // Handle next navigation
  const handleNext = useCallback(() => {
    const newDate = dayjs(currentSelectedDate)
      .add(
        1,
        currentView === "day"
          ? "day"
          : currentView === "week"
          ? "week"
          : "month"
      )
      .toDate();
    handleDateChange(newDate);
  }, [currentSelectedDate, currentView, handleDateChange]);

  // Handle today button
  const handleToday = useCallback(() => {
    handleDateChange(new Date());
  }, [handleDateChange]);

  // Handle event press
  const handleEventPress = useCallback(
    (event: CalendarEvent) => {
      setSelectedEvent(event);
      setModalVisible(true);
      onEventPress?.(event);
    },
    [onEventPress]
  );

  // Handle event long press
  const handleEventLongPress = useCallback(
    (event: CalendarEvent) => {
      onEventLongPress?.(event);
    },
    [onEventLongPress]
  );

  // Handle modal close
  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedEvent(null);
  }, []);

  // Handle event edit
  const handleEventEdit = useCallback(
    (event: CalendarEvent) => {
      setModalVisible(false);
      onEventPress?.(event); // Trigger edit action
    },
    [onEventPress]
  );

  // Handle event delete
  const handleEventDelete = useCallback(
    (event: CalendarEvent) => {
      setModalVisible(false);
      onEventLongPress?.(event); // Trigger delete action
    },
    [onEventLongPress]
  );

  // Render current view
  const renderCurrentView = useCallback(() => {
    const commonProps = {
      events,
      selectedDate: currentSelectedDate,
      onEventPress: handleEventPress,
      onEventLongPress: handleEventLongPress,
      theme,
    };

    switch (currentView) {
      case "day":
        return (
          <DayView
            {...commonProps}
            onTimeSlotPress={onTimeSlotPress}
            onTimeSlotLongPress={onTimeSlotLongPress}
          />
        );
      case "week":
        return <WeekView {...commonProps} />;
      case "month":
        return <MonthView {...commonProps} />;
      default:
        return <WeekView {...commonProps} />;
    }
  }, [
    currentView,
    events,
    currentSelectedDate,
    handleEventPress,
    handleEventLongPress,
    onTimeSlotPress,
    onTimeSlotLongPress,
    theme,
  ]);

  return (
    <View style={[styles.container, style]}>
      {showHeader && (
        <CalendarHeader
          view={currentView}
          selectedDate={currentSelectedDate}
          onViewChange={handleViewChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          availableViews={availableViews}
          showNavigation={showNavigation}
          showTodayButton={showTodayButton}
          theme={theme}
        />
      )}

      <View style={styles.content}>
        {onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.primary.main}
            colors={["transparent"]}
          >
            {renderCurrentView()}
          </RefreshControl>
        ) : (
          renderCurrentView()
        )}
      </View>

      <EventModal
        visible={modalVisible}
        event={selectedEvent || undefined}
        onClose={handleModalClose}
        onEdit={handleEventEdit}
        onDelete={handleEventDelete}
        theme={theme}
      />
    </View>
  );
};
