import { PaginationParams } from "@/types";

// PMS API Types
export interface PMSTask {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "completed" | "cancelled";
  dueDate?: string;
  assignedTo: string;
  assignedBy: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId?: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  status: "active" | "completed" | "on_hold" | "cancelled";
  isActive: boolean;
}

export interface CalendarTask {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  type: "task" | "meeting" | "event";
  priority: "low" | "medium" | "high";
  status: "scheduled" | "completed" | "cancelled";
  projectId?: string;
  projectName?: string;
}

export interface ProjectCredential {
  id: string;
  projectId: string;
  projectName: string;
  credentialType: string;
  credentialValue: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Query Parameters
export interface GetMyTasksParams extends PaginationParams {
  lateTodayUpcomming?: string;
  sortBy?: string;
  name?: string;
}

export interface GetMyCalendarTasksParams {
  startDate: string;
  endDate: string;
  dateField?: string;
}

export interface GetProjectCredentialsParams extends PaginationParams {
  projectId?: string;
}
