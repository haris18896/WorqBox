import { PaginationParams } from "../../../types/api";

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  leadName: string;
  iconUrl: string | null;
  projectOwner: Employee;
  businessAnalyst: Employee | null;
}

export interface ClientProject {
  id: number;
  name: string;
  companyName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  timeZone: string;
}

export interface Employee {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string | null;
  profilePictureUrl: string;
  profilePictureName: string | null;
  cnic: string | null;
  employeeNumber: string;
  passportNumber: string;
  licenceNumber: string;
  ethnicity: string;
  religion: string;
  placeOfBirth: string;
  isActive: boolean;
  roleId: number;
  maritalStatusId: number | null;
  tenantId: number | null;
  genderId: number | null;
  bloodGroupId: number | null;
  nationalityId: number | null;
  domicileProvinceRegionId: number | null;
  applicationUserId: number;
  employeeTierId: number | null;
  id: number;
  guid: string;
  isDeleted: boolean;
  createdDate: string;
  createdBy: number | null;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

export interface EmployeeObject {
  id: number;
  employeeNumber: string;
  profilePictureUrl: string;
  fullName: string;
}

// Reporting API Types
export interface ReportingStats {
  totalHours: number;
  billableHours: number;
  nonBillableHours: number;
}

// Time Log API Types
export interface TimeLog {
  id: number;
  detailMessage: string;
  timeSpent: number;
  startDate: string;
  endDate: string;
  isBillable: boolean;
  isBilled: boolean;
  tags: string | null;
  taskId: number;
  taskName: string;
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  projectId: number;
  projectName: string;
  taskListName: string;
  parentTaskId: number | null;
  parentTaskName: string | null;
  isSubTask: boolean;
  estimatedTime: number | null;
  taskTags: string | null;
  invoiceNumber: string | null;
}

export interface TimeLogParams extends PaginationParams {
  projectIds?: number[];
  employeeIds?: number[];
  startDate?: string;
  endDate?: string;
  isBillable?: boolean;
  isBilled?: boolean;
}
