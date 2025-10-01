import { CalendarEvent } from "@/components/ui/Calendar/calendar.d";
import {
  DUMMY_CALENDAR_EVENTS,
  generateRandomEvents,
  getEventsForDate,
} from "@/utils/dummyCalendarConstants";
import { useCallback, useState } from "react";

export interface UseCalendarEventsReturn {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (eventId: string) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForWeek: (date: Date) => CalendarEvent[];
  getEventsForMonth: (date: Date) => CalendarEvent[];
  addRandomEvents: (count: number) => void;
  clearAllEvents: () => void;
  loading: boolean;
}

export const useCalendarEvents = (
  initialEvents?: CalendarEvent[]
): UseCalendarEventsReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>(
    initialEvents || DUMMY_CALENDAR_EVENTS
  );
  const [loading, setLoading] = useState(false);

  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  }, []);

  const updateEvent = useCallback(
    (eventId: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, ...updates } : event
        )
      );
    },
    []
  );

  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const getEventsForDateCallback = useCallback(
    (date: Date) => getEventsForDate(events, date),
    [events]
  );

  const getEventsForWeek = useCallback(
    (date: Date) => {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return events.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          (eventStart >= startOfWeek && eventStart <= endOfWeek) ||
          (eventEnd >= startOfWeek && eventEnd <= endOfWeek) ||
          (eventStart <= startOfWeek && eventEnd >= endOfWeek)
        );
      });
    },
    [events]
  );

  const getEventsForMonth = useCallback(
    (date: Date) => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      return events.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          (eventStart >= startOfMonth && eventStart <= endOfMonth) ||
          (eventEnd >= startOfMonth && eventEnd <= endOfMonth) ||
          (eventStart <= startOfMonth && eventEnd >= endOfMonth)
        );
      });
    },
    [events]
  );

  const addRandomEvents = useCallback((count: number) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const randomEvents = generateRandomEvents(count);
      setEvents((prev) => [...prev, ...randomEvents]);
      setLoading(false);
    }, 1000);
  }, []);

  const clearAllEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate: getEventsForDateCallback,
    getEventsForWeek,
    getEventsForMonth,
    addRandomEvents,
    clearAllEvents,
    loading,
  };
};
