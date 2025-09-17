|--Project Mangament
   |-- Dashboard
   |-- Projects
       |-- Main
       |-- Client
   |-- Reports 
|--Emplyee Facilitation
   |-- Dashboard
   |-- Leave Management
       |-- Leave Request
       |-- Approval Request
   |-- Salary Calculator
   |-- Survey
   |--
|--Profile

```json
[
  {
    "title": "Project Management",
    "screen": "ProjectManagementScreen",
    "icon": "folder",
    "permission": ["admin", "manager"],
    "default": "Dashboard",
    "active_list": ["Project Management", "Dashboard"],
    "order": 1,
    "visible": true,
    "description": "Manage all projects and related reports",
    "children": [
      {
        "title": "Dashboard",
        "screen": "ProjectDashboardScreen",
        "icon": "dashboard",
        "permission": ["admin", "manager", "employee"],
        "active_list": ["Project Management", "Dashboard"],
        "default": null,
        "order": 1,
        "visible": true
      },
      {
        "title": "Projects",
        "screen": "ProjectsScreen",
        "icon": "folder-open",
        "permission": ["admin", "manager"],
        "default": "Main",
        "active_list": ["Project Management", "Projects"],
        "order": 2,
        "visible": true,
        "children": [
          {
            "title": "Main",
            "screen": "ProjectsMainScreen",
            "icon": "file",
            "permission": ["admin", "manager"],
            "active_list": ["Project Management", "Projects", "Main"],
            "default": null,
            "order": 1,
            "visible": true
          },
          {
            "title": "Client",
            "screen": "ProjectsClientScreen",
            "icon": "users",
            "permission": ["admin", "manager"],
            "active_list": ["Project Management", "Projects", "Client"],
            "default": null,
            "order": 2,
            "visible": true
          }
        ]
      },
      {
        "title": "Reports",
        "screen": "ProjectReportsScreen",
        "icon": "bar-chart",
        "permission": ["admin", "manager"],
        "active_list": ["Project Management", "Reports"],
        "default": null,
        "order": 3,
        "visible": true
      }
    ]
  },
  {
    "title": "Employee Facilitation",
    "screen": "EmployeeFacilitationScreen",
    "icon": "users-cog",
    "permission": ["admin", "hr"],
    "default": "Dashboard",
    "active_list": ["Employee Facilitation", "Dashboard"],
    "order": 2,
    "visible": true,
    "description": "HR and employee self-service features",
    "children": [
      {
        "title": "Dashboard",
        "screen": "EmployeeDashboardScreen",
        "icon": "dashboard",
        "permission": ["admin", "hr", "employee"],
        "active_list": ["Employee Facilitation", "Dashboard"],
        "default": null,
        "order": 1,
        "visible": true
      },
      {
        "title": "Leave Management",
        "screen": "LeaveManagementScreen",
        "icon": "calendar",
        "permission": ["admin", "hr", "employee"],
        "default": "Leave Request",
        "active_list": ["Employee Facilitation", "Leave Management"],
        "order": 2,
        "visible": true,
        "children": [
          {
            "title": "Leave Request",
            "screen": "LeaveRequestScreen",
            "icon": "calendar-plus",
            "permission": ["employee"],
            "active_list": ["Employee Facilitation", "Leave Management", "Leave Request"],
            "default": null,
            "order": 1,
            "visible": true
          },
          {
            "title": "Approval Request",
            "screen": "ApprovalRequestScreen",
            "icon": "check-circle",
            "permission": ["admin", "hr"],
            "active_list": ["Employee Facilitation", "Leave Management", "Approval Request"],
            "default": null,
            "order": 2,
            "visible": true,
            "badgeCount": 3
          }
        ]
      },
      {
        "title": "Salary Calculator",
        "screen": "SalaryCalculatorScreen",
        "icon": "calculator",
        "permission": ["employee", "hr"],
        "active_list": ["Employee Facilitation", "Salary Calculator"],
        "default": null,
        "order": 3,
        "visible": true
      },
      {
        "title": "Survey",
        "screen": "SurveyScreen",
        "icon": "clipboard-list",
        "permission": ["employee", "hr"],
        "active_list": ["Employee Facilitation", "Survey"],
        "default": null,
        "order": 4,
        "visible": true
      }
    ]
  },
  {
    "title": "Profile",
    "screen": "ProfileScreen",
    "icon": "user",
    "permission": ["admin", "manager", "employee", "hr"],
    "default": null,
    "active_list": ["Profile"],
    "order": 3,
    "visible": true,
    "description": "User profile and settings"
  }
]

```

default: picks a default child when parent is clicked (e.g., Dashboard under Project Management).

active_list: shows which tabs are “lit up” in the drawer when a child is selected.

badgeCount: optional (for notifications like pending approvals).

permission: enables role-based access.

order: defines sidebar ordering.

visible: easy toggle for feature flags.