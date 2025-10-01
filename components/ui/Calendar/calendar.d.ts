import { ReactElement } from "react";

export type CalendarView = "day" | "week" | "month";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  disabled?: boolean;
  children?: ReactElement | null;
  // Additional custom properties
  [key: string]: any;
}

export interface CalendarEventBase {
  start: Date;
  end: Date;
  title: string;
  children?: ReactElement | null;
  disabled?: boolean;
}

export interface CalendarProps {
  events: CalendarEvent[];
  view?: CalendarView;
  day?: boolean;
  week?: boolean;
  month?: boolean;
  defaultView?: CalendarView;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
  onEventPress?: (event: CalendarEvent) => void;
  onEventLongPress?: (event: CalendarEvent) => void;
  onTimeSlotPress?: (date: Date) => void;
  onTimeSlotLongPress?: (date: Date) => void;
  height?: number;
  showHeader?: boolean;
  showNavigation?: boolean;
  showTodayButton?: boolean;
  locale?: string;
  theme?: CalendarTheme;
  style?: any;
  eventStyle?: any;
  headerStyle?: any;
  loading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export interface CalendarTheme {
  palette: {
    primary: {
      main: string;
      contrastText: string;
    };
    nowIndicator: string;
    gray: {
      100: string;
      200: string;
      300: string;
      500: string;
      800: string;
    };
    moreLabel: string;
  };
  isRTL: boolean;
  typography: {
    fontFamily?: string;
    xs: TextStyle;
    sm: TextStyle;
    xl: TextStyle;
    moreLabel: TextStyle;
  };
  eventCellOverlappings: readonly Palette[];
  moreLabel: TextStyle;
}

export interface TextStyle {
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
}

export interface Palette {
  main: string;
  contrastText: string;
}

export interface DayViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventPress?: (event: CalendarEvent) => void;
  onEventLongPress?: (event: CalendarEvent) => void;
  onTimeSlotPress?: (date: Date) => void;
  onTimeSlotLongPress?: (date: Date) => void;
  theme?: CalendarTheme;
  style?: any;
}

export interface WeekViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventPress?: (event: CalendarEvent) => void;
  onEventLongPress?: (event: CalendarEvent) => void;
  theme?: CalendarTheme;
  style?: any;
}

export interface MonthViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onEventPress?: (event: CalendarEvent) => void;
  onEventLongPress?: (event: CalendarEvent) => void;
  theme?: CalendarTheme;
  style?: any;
}

export interface CalendarHeaderProps {
  view: CalendarView;
  selectedDate: Date;
  onViewChange: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  availableViews: CalendarView[];
  showNavigation?: boolean;
  showTodayButton?: boolean;
  theme?: CalendarTheme;
  style?: any;
}

export interface EventItemProps {
  event: CalendarEvent;
  onPress?: (event: CalendarEvent) => void;
  onLongPress?: (event: CalendarEvent) => void;
  style?: any;
  compact?: boolean;
}

export interface EventModalProps {
  visible: boolean;
  event?: CalendarEvent;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  theme?: CalendarTheme;
}

export interface OverlappingEventsProps {
  events: CalendarEvent[];
  onEventPress?: (event: CalendarEvent) => void;
  onShowMore?: (events: CalendarEvent[]) => void;
  maxVisible?: number;
  theme?: CalendarTheme;
}

export interface TimeSlotProps {
  hour: number;
  events: CalendarEvent[];
  onTimeSlotPress?: (date: Date) => void;
  onTimeSlotLongPress?: (date: Date) => void;
  onEventPress?: (event: CalendarEvent) => void;
  onEventLongPress?: (event: CalendarEvent) => void;
  theme?: CalendarTheme;
  style?: any;
}

export interface EventDropdownProps {
  visible: boolean;
  events: CalendarEvent[];
  onEventPress: (event: CalendarEvent) => void;
  onClose: () => void;
  theme?: CalendarTheme;
  style?: any;
}

// Utility types
export type EventRenderer<T extends CalendarEventBase> = (
  event: T,
  touchableOpacityProps: any
) => ReactElement | null;

export type HourRenderer = (props: {
  ampm: boolean;
  hour: number;
}) => ReactElement;

export interface CalendarTouchableOpacityProps {
  onPress?: () => void;
  onLongPress?: () => void;
  style?: any;
  activeOpacity?: number;
  disabled?: boolean;
}
