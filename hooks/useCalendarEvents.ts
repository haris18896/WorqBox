import { CalendarEvent } from "@/components/ui/Calendar/calendar.d";
import { useGetMyCalendarTasksQuery } from "@/store/api/modules/pms/pmsApi";
import { useCallback, useMemo, useState } from "react";

// Utility function to transform API calendar task to CalendarEvent
const transformCalendarTaskToEvent = (task: any): CalendarEvent => {
  return {
    id: task.id,
    title: task.title,
    start: new Date(task.startDate),
    end: new Date(task.endDate),
    color: getPriorityColor(task.priority),
    backgroundColor: getPriorityBackgroundColor(task.priority),
    borderColor: getPriorityBorderColor(task.priority),
    textColor: "#ffffff",
    disabled: task.status === "cancelled",
    // Additional properties from API
    description: task.description,
    type: task.type,
    priority: task.priority,
    status: task.status,
    projectId: task.projectId,
    projectName: task.projectName,
  };
};

// Helper functions for priority-based styling
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "#ef4444"; // red
    case "medium":
      return "#f59e0b"; // amber
    case "low":
      return "#10b981"; // emerald
    default:
      return "#6b7280"; // gray
  }
};

const getPriorityBackgroundColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "#fef2f2"; // red-50
    case "medium":
      return "#fffbeb"; // amber-50
    case "low":
      return "#ecfdf5"; // emerald-50
    default:
      return "#f9fafb"; // gray-50
  }
};

const getPriorityBorderColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "#fecaca"; // red-200
    case "medium":
      return "#fed7aa"; // amber-200
    case "low":
      return "#a7f3d0"; // emerald-200
    default:
      return "#d1d5db"; // gray-300
  }
};

// Helper function to get events for a specific date
const getEventsForDate = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(targetDate);
  nextDay.setDate(targetDate.getDate() + 1);

  return events.filter((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    return (
      (eventStart >= targetDate && eventStart < nextDay) ||
      (eventEnd >= targetDate && eventEnd < nextDay) ||
      (eventStart <= targetDate && eventEnd >= nextDay)
    );
  });
};

export interface UseCalendarEventsReturn {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (eventId: string) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForWeek: (date: Date) => CalendarEvent[];
  getEventsForMonth: (date: Date) => CalendarEvent[];
  refreshEvents: () => void;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export const useCalendarEvents = (dateRange?: {
  startDate: Date;
  endDate: Date;
}): UseCalendarEventsReturn => {
  // Default to current month if no date range provided
  const defaultStartDate = useMemo(() => {
    const date = dateRange?.startDate || new Date();
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return startOfMonth.toISOString();
  }, [dateRange?.startDate]);

  const defaultEndDate = useMemo(() => {
    const date = dateRange?.endDate || new Date();
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return endOfMonth.toISOString();
  }, [dateRange?.endDate]);

  // Fetch calendar tasks from API
  const {
    data: calendarTasks = [],
    isLoading,
    error,
    refetch,
  } = useGetMyCalendarTasksQuery({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    dateField: "startDate",
  });

  // Transform API data to CalendarEvent format
  const events = useMemo(() => {
    return calendarTasks.map(transformCalendarTaskToEvent);
  }, [calendarTasks]);

  // Local state for manually added events (if needed)
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>([]);

  // Combine API events with local events
  const allEvents = useMemo(() => {
    return [...events, ...localEvents];
  }, [events, localEvents]);

  const addEvent = useCallback((event: CalendarEvent) => {
    setLocalEvents((prev) => [...prev, event]);
  }, []);

  const updateEvent = useCallback(
    (eventId: string, updates: Partial<CalendarEvent>) => {
      // Check if it's a local event first
      const isLocalEvent = localEvents.some((event) => event.id === eventId);

      if (isLocalEvent) {
        setLocalEvents((prev) =>
          prev.map((event) =>
            event.id === eventId ? { ...event, ...updates } : event
          )
        );
      } else {
        // For API events, you might want to call an update API endpoint
        // For now, we'll just update the local state
        console.warn(
          "Updating API events requires API call - not implemented yet"
        );
      }
    },
    [localEvents]
  );

  const deleteEvent = useCallback(
    (eventId: string) => {
      // Check if it's a local event first
      const isLocalEvent = localEvents.some((event) => event.id === eventId);

      if (isLocalEvent) {
        setLocalEvents((prev) => prev.filter((event) => event.id !== eventId));
      } else {
        // For API events, you might want to call a delete API endpoint
        console.warn(
          "Deleting API events requires API call - not implemented yet"
        );
      }
    },
    [localEvents]
  );

  const getEventsForDateCallback = useCallback(
    (date: Date) => getEventsForDate(allEvents, date),
    [allEvents]
  );

  const getEventsForWeek = useCallback(
    (date: Date) => {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return allEvents.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          (eventStart >= startOfWeek && eventStart <= endOfWeek) ||
          (eventEnd >= startOfWeek && eventEnd <= endOfWeek) ||
          (eventStart <= startOfWeek && eventEnd >= endOfWeek)
        );
      });
    },
    [allEvents]
  );

  const getEventsForMonth = useCallback(
    (date: Date) => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      return allEvents.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          (eventStart >= startOfMonth && eventStart <= endOfMonth) ||
          (eventEnd >= startOfMonth && eventEnd <= endOfMonth) ||
          (eventStart <= startOfMonth && eventEnd >= endOfMonth)
        );
      });
    },
    [allEvents]
  );

  const refreshEvents = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    events: allEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate: getEventsForDateCallback,
    getEventsForWeek,
    getEventsForMonth,
    refreshEvents,
    loading: isLoading,
    error,
    refetch,
  };
};
