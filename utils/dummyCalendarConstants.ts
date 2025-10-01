import { CalendarEvent } from "@/components/ui/Calendar/calendar.d";

// Sample events and tasks for the calendar
export const DUMMY_CALENDAR_EVENTS: CalendarEvent[] = [
  // October 2025 Events (Current Month)
  {
    id: "event-current-1",
    title: "Morning Standup",
    start: new Date(2025, 9, 1, 9, 0), // October 1, 2025, 9:00 AM
    end: new Date(2025, 9, 1, 9, 30), // October 1, 2025, 9:30 AM
    color: "#7367F0",
    backgroundColor: "#7367F020",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-2",
    title: "Project Planning",
    start: new Date(2025, 9, 1, 14, 0), // October 1, 2025, 2:00 PM
    end: new Date(2025, 9, 1, 15, 30), // October 1, 2025, 3:30 PM
    color: "#22c55e",
    backgroundColor: "#22c55e20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-3",
    title: "Client Meeting",
    start: new Date(2025, 9, 2, 10, 0), // October 2, 2025, 10:00 AM
    end: new Date(2025, 9, 2, 11, 0), // October 2, 2025, 11:00 AM
    color: "#f59e0b",
    backgroundColor: "#f59e0b20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-4",
    title: "Code Review",
    start: new Date(2025, 9, 2, 15, 0), // October 2, 2025, 3:00 PM
    end: new Date(2025, 9, 2, 16, 0), // October 2, 2025, 4:00 PM
    color: "#8b5cf6",
    backgroundColor: "#8b5cf620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-5",
    title: "Team Retrospective",
    start: new Date(2025, 9, 3, 9, 0), // October 3, 2025, 9:00 AM
    end: new Date(2025, 9, 3, 10, 0), // October 3, 2025, 10:00 AM
    color: "#06b6d4",
    backgroundColor: "#06b6d420",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-6",
    title: "Design Workshop",
    start: new Date(2025, 9, 3, 14, 0), // October 3, 2025, 2:00 PM
    end: new Date(2025, 9, 3, 16, 0), // October 3, 2025, 4:00 PM
    color: "#ef4444",
    backgroundColor: "#ef444420",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-7",
    title: "Sprint Planning",
    start: new Date(2025, 9, 4, 9, 0), // October 4, 2025, 9:00 AM
    end: new Date(2025, 9, 4, 11, 0), // October 4, 2025, 11:00 AM
    color: "#10b981",
    backgroundColor: "#10b98120",
    textColor: "#FFFFFF",
  },
  {
    id: "event-current-8",
    title: "Product Demo",
    start: new Date(2025, 9, 4, 15, 0), // October 4, 2025, 3:00 PM
    end: new Date(2025, 9, 4, 16, 0), // October 4, 2025, 4:00 PM
    color: "#f97316",
    backgroundColor: "#f9731620",
    textColor: "#FFFFFF",
  },
  // December 2024 Events
  {
    id: "event-1",
    title: "Team Standup",
    start: new Date(2024, 11, 2, 9, 0), // December 2, 2024, 9:00 AM
    end: new Date(2024, 11, 2, 9, 30), // December 2, 2024, 9:30 AM
    color: "#7367F0",
    backgroundColor: "#7367F020",
    textColor: "#FFFFFF",
  },
  {
    id: "event-2",
    title: "Client Presentation",
    start: new Date(2024, 11, 2, 14, 0), // December 2, 2024, 2:00 PM
    end: new Date(2024, 11, 2, 15, 0), // December 2, 2024, 3:00 PM
    color: "#22c55e",
    backgroundColor: "#22c55e20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-3",
    title: "Code Review Session",
    start: new Date(2024, 11, 3, 10, 0), // December 3, 2024, 10:00 AM
    end: new Date(2024, 11, 3, 11, 30), // December 3, 2024, 11:30 AM
    color: "#f59e0b",
    backgroundColor: "#f59e0b20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-4",
    title: "Sprint Planning",
    start: new Date(2024, 11, 4, 9, 0), // December 4, 2024, 9:00 AM
    end: new Date(2024, 11, 4, 11, 0), // December 4, 2024, 11:00 AM
    color: "#8b5cf6",
    backgroundColor: "#8b5cf620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-5",
    title: "Design Workshop",
    start: new Date(2024, 11, 4, 14, 0), // December 4, 2024, 2:00 PM
    end: new Date(2024, 11, 4, 16, 0), // December 4, 2024, 4:00 PM
    color: "#06b6d4",
    backgroundColor: "#06b6d420",
    textColor: "#FFFFFF",
  },
  {
    id: "event-6",
    title: "One-on-One Meeting",
    start: new Date(2024, 11, 5, 15, 0), // December 5, 2024, 3:00 PM
    end: new Date(2024, 11, 5, 16, 0), // December 5, 2024, 4:00 PM
    color: "#ef4444",
    backgroundColor: "#ef444420",
    textColor: "#FFFFFF",
  },
  {
    id: "event-7",
    title: "Product Demo",
    start: new Date(2024, 11, 6, 10, 0), // December 6, 2024, 10:00 AM
    end: new Date(2024, 11, 6, 11, 0), // December 6, 2024, 11:00 AM
    color: "#10b981",
    backgroundColor: "#10b98120",
    textColor: "#FFFFFF",
  },
  {
    id: "event-8",
    title: "Bug Fix Session",
    start: new Date(2024, 11, 6, 13, 0), // December 6, 2024, 1:00 PM
    end: new Date(2024, 11, 6, 15, 0), // December 6, 2024, 3:00 PM
    color: "#f97316",
    backgroundColor: "#f9731620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-9",
    title: "All Hands Meeting",
    start: new Date(2024, 11, 9, 9, 0), // December 9, 2024, 9:00 AM
    end: new Date(2024, 11, 9, 10, 0), // December 9, 2024, 10:00 AM
    color: "#6366f1",
    backgroundColor: "#6366f120",
    textColor: "#FFFFFF",
  },
  {
    id: "event-10",
    title: "Technical Architecture Review",
    start: new Date(2024, 11, 9, 14, 0), // December 9, 2024, 2:00 PM
    end: new Date(2024, 11, 9, 16, 0), // December 9, 2024, 4:00 PM
    color: "#84cc16",
    backgroundColor: "#84cc1620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-11",
    title: "Client Feedback Session",
    start: new Date(2024, 11, 10, 11, 0), // December 10, 2024, 11:00 AM
    end: new Date(2024, 11, 10, 12, 0), // December 10, 2024, 12:00 PM
    color: "#ec4899",
    backgroundColor: "#ec489920",
    textColor: "#FFFFFF",
  },
  {
    id: "event-12",
    title: "Security Audit",
    start: new Date(2024, 11, 11, 9, 0), // December 11, 2024, 9:00 AM
    end: new Date(2024, 11, 11, 12, 0), // December 11, 2024, 12:00 PM
    color: "#dc2626",
    backgroundColor: "#dc262620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-13",
    title: "Feature Planning",
    start: new Date(2024, 11, 12, 10, 0), // December 12, 2024, 10:00 AM
    end: new Date(2024, 11, 12, 12, 0), // December 12, 2024, 12:00 PM
    color: "#059669",
    backgroundColor: "#05966920",
    textColor: "#FFFFFF",
  },
  {
    id: "event-14",
    title: "Team Building Activity",
    start: new Date(2024, 11, 13, 15, 0), // December 13, 2024, 3:00 PM
    end: new Date(2024, 11, 13, 17, 0), // December 13, 2024, 5:00 PM
    color: "#7c3aed",
    backgroundColor: "#7c3aed20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-15",
    title: "Performance Testing",
    start: new Date(2024, 11, 16, 9, 0), // December 16, 2024, 9:00 AM
    end: new Date(2024, 11, 16, 11, 0), // December 16, 2024, 11:00 AM
    color: "#ea580c",
    backgroundColor: "#ea580c20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-16",
    title: "Documentation Review",
    start: new Date(2024, 11, 16, 14, 0), // December 16, 2024, 2:00 PM
    end: new Date(2024, 11, 16, 15, 30), // December 16, 2024, 3:30 PM
    color: "#0891b2",
    backgroundColor: "#0891b220",
    textColor: "#FFFFFF",
  },
  {
    id: "event-17",
    title: "Retrospective Meeting",
    start: new Date(2024, 11, 17, 10, 0), // December 17, 2024, 10:00 AM
    end: new Date(2024, 11, 17, 11, 0), // December 17, 2024, 11:00 AM
    color: "#be185d",
    backgroundColor: "#be185d20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-18",
    title: "Database Migration",
    start: new Date(2024, 11, 18, 8, 0), // December 18, 2024, 8:00 AM
    end: new Date(2024, 11, 18, 10, 0), // December 18, 2024, 10:00 AM
    color: "#b45309",
    backgroundColor: "#b4530920",
    textColor: "#FFFFFF",
  },
  {
    id: "event-19",
    title: "Holiday Party Planning",
    start: new Date(2024, 11, 19, 15, 0), // December 19, 2024, 3:00 PM
    end: new Date(2024, 11, 19, 16, 0), // December 19, 2024, 4:00 PM
    color: "#be123c",
    backgroundColor: "#be123c20",
    textColor: "#FFFFFF",
  },
  {
    id: "event-20",
    title: "Year-End Review",
    start: new Date(2024, 11, 20, 9, 0), // December 20, 2024, 9:00 AM
    end: new Date(2024, 11, 20, 12, 0), // December 20, 2024, 12:00 PM
    color: "#1d4ed8",
    backgroundColor: "#1d4ed820",
    textColor: "#FFFFFF",
  },
  // Overlapping events for testing
  {
    id: "event-21",
    title: "Morning Sync",
    start: new Date(2024, 11, 23, 9, 0), // December 23, 2024, 9:00 AM
    end: new Date(2024, 11, 23, 9, 30), // December 23, 2024, 9:30 AM
    color: "#7c2d12",
    backgroundColor: "#7c2d1220",
    textColor: "#FFFFFF",
  },
  {
    id: "event-22",
    title: "Overlapping Meeting",
    start: new Date(2024, 11, 23, 9, 15), // December 23, 2024, 9:15 AM
    end: new Date(2024, 11, 23, 9, 45), // December 23, 2024, 9:45 AM
    color: "#374151",
    backgroundColor: "#37415120",
    textColor: "#FFFFFF",
  },
  {
    id: "event-23",
    title: "Another Overlap",
    start: new Date(2024, 11, 23, 9, 20), // December 23, 2024, 9:20 AM
    end: new Date(2024, 11, 23, 9, 50), // December 23, 2024, 9:50 AM
    color: "#6b7280",
    backgroundColor: "#6b728020",
    textColor: "#FFFFFF",
  },
  // All-day events
  {
    id: "event-24",
    title: "Company Holiday",
    start: new Date(2024, 11, 25, 0, 0), // December 25, 2024, 12:00 AM
    end: new Date(2024, 11, 25, 0, 0), // December 25, 2024, 12:00 AM (same day)
    color: "#dc2626",
    backgroundColor: "#dc262620",
    textColor: "#FFFFFF",
  },
  {
    id: "event-25",
    title: "New Year Holiday",
    start: new Date(2025, 0, 1, 0, 0), // January 1, 2025, 12:00 AM
    end: new Date(2025, 0, 1, 0, 0), // January 1, 2025, 12:00 AM (same day)
    color: "#059669",
    backgroundColor: "#05966920",
    textColor: "#FFFFFF",
  },
];

// Task categories for different types of work
export const TASK_CATEGORIES = {
  DEVELOPMENT: {
    color: "#7367F0",
    backgroundColor: "#7367F020",
    label: "Development",
  },
  DESIGN: {
    color: "#06b6d4",
    backgroundColor: "#06b6d420",
    label: "Design",
  },
  MEETING: {
    color: "#22c55e",
    backgroundColor: "#22c55e20",
    label: "Meeting",
  },
  REVIEW: {
    color: "#f59e0b",
    backgroundColor: "#f59e0b20",
    label: "Review",
  },
  PLANNING: {
    color: "#8b5cf6",
    backgroundColor: "#8b5cf620",
    label: "Planning",
  },
  TESTING: {
    color: "#ea580c",
    backgroundColor: "#ea580c20",
    label: "Testing",
  },
  DOCUMENTATION: {
    color: "#0891b2",
    backgroundColor: "#0891b220",
    label: "Documentation",
  },
  MAINTENANCE: {
    color: "#ef4444",
    backgroundColor: "#ef444420",
    label: "Maintenance",
  },
} as const;

// Helper function to generate random events
export const generateRandomEvents = (count: number): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const categories = Object.values(TASK_CATEGORIES);

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const startHour = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
    const duration = Math.floor(Math.random() * 3) + 1; // 1-3 hours
    const startDate = new Date(
      2024,
      11,
      Math.floor(Math.random() * 30) + 1,
      startHour,
      0
    );
    const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);

    events.push({
      id: `random-event-${i}`,
      title: `${category.label} Task ${i + 1}`,
      start: startDate,
      end: endDate,
      color: category.color,
      backgroundColor: category.backgroundColor,
      textColor: "#FFFFFF",
      // children: `Random ${category.label.toLowerCase()} task`,
    });
  }

  return events;
};

// Helper function to get events for a specific date range
export const getEventsForDateRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return (
      (eventStart >= startDate && eventStart <= endDate) ||
      (eventEnd >= startDate && eventEnd <= endDate) ||
      (eventStart <= startDate && eventEnd >= endDate)
    );
  });
};

// Helper function to get events for a specific date
export const getEventsForDate = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return getEventsForDateRange(events, startOfDay, endOfDay);
};

// Helper function to get events for current week
export const getEventsForCurrentWeek = (
  events: CalendarEvent[]
): CalendarEvent[] => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return getEventsForDateRange(events, startOfWeek, endOfWeek);
};

// Helper function to get events for current month
export const getEventsForCurrentMonth = (
  events: CalendarEvent[]
): CalendarEvent[] => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  return getEventsForDateRange(events, startOfMonth, endOfMonth);
};

// Sample tasks for different departments
export const DEPARTMENT_TASKS = {
  ENGINEERING: [
    "Code Review",
    "Bug Fixing",
    "Feature Development",
    "Performance Optimization",
    "API Integration",
    "Database Migration",
    "Security Audit",
    "Testing",
  ],
  DESIGN: [
    "UI/UX Design",
    "Prototype Creation",
    "Design System Update",
    "User Research",
    "Wireframing",
    "Visual Design",
    "Design Review",
    "Asset Creation",
  ],
  PRODUCT: [
    "Feature Planning",
    "User Story Writing",
    "Product Roadmap",
    "Market Research",
    "Competitor Analysis",
    "Product Demo",
    "Stakeholder Meeting",
    "Requirements Gathering",
  ],
  MARKETING: [
    "Campaign Planning",
    "Content Creation",
    "Social Media Management",
    "SEO Optimization",
    "Analytics Review",
    "Brand Strategy",
    "Event Planning",
    "Lead Generation",
  ],
} as const;

// Export all constants
export default {
  DUMMY_CALENDAR_EVENTS,
  TASK_CATEGORIES,
  DEPARTMENT_TASKS,
  generateRandomEvents,
  getEventsForDateRange,
  getEventsForDate,
  getEventsForCurrentWeek,
  getEventsForCurrentMonth,
};
