import { LoginResponse } from "../types/api";

// Mock database for user authentication
export class MockDatabase {
  private static users: Record<string, LoginResponse> = {
    "admin@gmail.com": {
      id: 1,
      employeeId: 1001,
      fullName: "Super Admin",
      email: "admin@gmail.com",
      imageUrl: undefined,
      username: "admin@gmail.com",
      token: "mock_admin_token_12345",
      lastPasswordChange: "2024-01-01T00:00:00Z",
      allowedRoles: ["SuperAdmin"],
      allowedModules: [
        { id: 1, name: "Dashboard" },
        { id: 2, name: "PMS" },
        { id: 3, name: "EFS" },
        { id: 4, name: "Leave Management" },
        { id: 5, name: "Salary Calculator" },
        { id: 6, name: "Survey Forms" },
        { id: 7, name: "Projects" },
        { id: 8, name: "Reports" },
      ],
      allowedPagePermissions: [
        {
          id: 1,
          systemModule: { id: 1, name: "Dashboard" },
          name: "View Dashboard",
          canView: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          id: 2,
          systemModule: { id: 2, name: "PMS" },
          name: "Project Management",
          canView: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          id: 3,
          systemModule: { id: 3, name: "EFS" },
          name: "Employee Functions",
          canView: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
        },
      ],
    },
    "manager@gmail.com": {
      id: 2,
      employeeId: 1002,
      fullName: "Manager User",
      email: "manager@gmail.com",
      imageUrl: undefined,
      username: "manager@gmail.com",
      token: "mock_manager_token_12345",
      lastPasswordChange: "2024-01-01T00:00:00Z",
      allowedRoles: ["Manager"],
      allowedModules: [
        { id: 1, name: "Dashboard" },
        { id: 2, name: "PMS" },
        { id: 3, name: "EFS" },
        { id: 4, name: "Leave Management" },
      ],
      allowedPagePermissions: [
        {
          id: 1,
          systemModule: { id: 1, name: "Dashboard" },
          name: "View Dashboard",
          canView: true,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
        {
          id: 2,
          systemModule: { id: 2, name: "PMS" },
          name: "Project Management",
          canView: true,
          canCreate: true,
          canUpdate: true,
          canDelete: false,
        },
        {
          id: 3,
          systemModule: { id: 3, name: "EFS" },
          name: "Employee Functions",
          canView: true,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
      ],
    },
    "employee@gmail.com": {
      id: 3,
      employeeId: 1003,
      fullName: "Employee User",
      email: "employee@gmail.com",
      imageUrl: undefined,
      username: "employee@gmail.com",
      token: "mock_employee_token_12345",
      lastPasswordChange: "2024-01-01T00:00:00Z",
      allowedRoles: ["Employee"],
      allowedModules: [
        { id: 1, name: "Dashboard" },
        { id: 3, name: "EFS" },
        { id: 4, name: "Leave Management" },
      ],
      allowedPagePermissions: [
        {
          id: 1,
          systemModule: { id: 1, name: "Dashboard" },
          name: "View Dashboard",
          canView: true,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
        {
          id: 3,
          systemModule: { id: 3, name: "EFS" },
          name: "Employee Functions",
          canView: true,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
      ],
    },
  };

  // Simulate network delay
  private static async delay(ms: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mock login endpoint
  static async login(
    username: string,
    password: string
  ): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    await this.delay(); // Simulate network delay

    const user = this.users[username];

    if (user && password === "Test@123") {
      return {
        success: true,
        data: user,
      };
    }

    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  // Mock user details endpoint
  static async getUserDetails(token: string): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    await this.delay(500); // Simulate network delay

    // Find user by token
    const user = Object.values(this.users).find((u) => u.token === token);

    if (user) {
      return {
        success: true,
        data: user,
      };
    }

    return {
      success: false,
      error: "Invalid token",
    };
  }

  // Add more mock endpoints as needed
  static async register(userData: any): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    await this.delay();

    // Mock registration - just return success for now
    return {
      success: true,
      data: {
        id: 999,
        employeeId: 9999,
        fullName: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        username: userData.email,
        token: "mock_new_user_token_12345",
        allowedRoles: ["Employee"],
        allowedModules: [
          { id: 1, name: "Dashboard" },
          { id: 3, name: "EFS" },
        ],
        allowedPagePermissions: [
          {
            id: 1,
            systemModule: { id: 1, name: "Dashboard" },
            name: "View Dashboard",
            canView: true,
            canCreate: false,
            canUpdate: false,
            canDelete: false,
          },
        ],
      },
    };
  }

  // Get all users (for admin purposes)
  static getAllUsers(): LoginResponse[] {
    return Object.values(this.users);
  }

  // Add a new user to the mock database
  static addUser(username: string, userData: LoginResponse): void {
    this.users[username] = userData;
  }

  // Remove a user from the mock database
  static removeUser(username: string): boolean {
    if (this.users[username]) {
      delete this.users[username];
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const mockDatabase = MockDatabase;
