import {
  BaseApiResponse,
  PaginatedResult,
  PaginationParams,
} from "../../../types/api";

// HRM Dashboard Types

// Employee Count with Gender API Response
export interface EmployeeCountWithGender {
  totalEmployeesCount: number;
  totalDepartmentCount: number;
  totalMaleCount: number;
  totalFemaleCount: number;
}

// Department Employee Count API Response
export interface DepartmentEmployeeCount {
  id: number;
  name: string;
  employeeCount: number;
  department: any; // null in the API response
}

export interface DepartmentEmployeeCounts {
  departmentEmployeeCounts: DepartmentEmployeeCount[];
}

// Today Present Absent Employees API Response
export interface PresentAbsentEmployee {
  absentCount: number;
  presentCount: number;
  fromDate: string;
  toDate: string;
}

// HRM Employee Types

// Role interface
export interface Role {
  id: number;
  name: string;
  normalizedName: string;
  description: string;
  concurrencyStamp: string;
  isDeleted: boolean;
  userRoles: any; // null in API response
}

// Blood Group interface
export interface BloodGroup {
  id: number;
  guid: string;
  name: string;
  isDeleted: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

// Marital Status interface
export interface MaritalStatus {
  id: number;
  guid: string;
  name: string;
  tenant: any; // null in API response
  isDeleted: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

// Gender interface
export interface Gender {
  id: number;
  guid: string;
  name: string;
  isDeleted: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

// Nationality interface
export interface Nationality {
  id: number;
  guid: string;
  name: string;
  isDeleted: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

// Employee Tier interface
export interface EmployeeTier {
  id: number;
  guid: string;
  name: string;
  employeeTierLeaveAllocationConfigs: any; // null in API response
  isDeleted: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
}

// Detailed Employee interface
export interface HrmEmployee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string | null;
  fatherName: string;
  employeeNumber: string;
  passportNumber: string;
  licenceNumber: string;
  ethnicity: string;
  religion: string;
  placeOfBirth: string;
  dateOfBirth: string | null;
  profilePictureName: string | null;
  profilePictureUrl: string;
  cnic: string | null;
  createdDate: string;
  role: Role;
  bloodGroup: BloodGroup;
  maritalStatus: MaritalStatus;
  gender: Gender;
  nationality: Nationality;
  employeeTier: EmployeeTier;
  tenant: any; // null in API response
}

// Employee query parameters
export interface EmployeeQueryParams extends PaginationParams {
  role?: string;
  status?: string;
  keyword?: string;
  sortBy?: string;
  sortOrder?: boolean;
}

// API Response Types
export type GetEmployeeCountWithGenderResponse =
  BaseApiResponse<EmployeeCountWithGender>;
export type GetEmployeeCountByDepartmentResponse =
  BaseApiResponse<DepartmentEmployeeCounts>;
export type GetTodayPresentAbsentEmployeesResponse = BaseApiResponse<
  PresentAbsentEmployee[]
>;
export type GetEmployeesResponse = BaseApiResponse<
  PaginatedResult<HrmEmployee>
>;
