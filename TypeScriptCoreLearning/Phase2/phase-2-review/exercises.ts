// phase-2-review/exercises.ts

// Goal:
// Use Phase 2 concepts together in one small domain model.
//
// You will model a small task system with:
// - users
// - roles
// - permissions
// - tasks
// - API results
// - UI/load states
// - security logs

// --------------------------------------------------

// Exercise 1:
// Create a const array named userRoles.
//
// Values:
// - "admin"
// - "user"
// - "support"
//
// Use `as const`.
//
// Then create a type named UserRole from the array.

// Your code here:



// --------------------------------------------------

// Exercise 2:
// Create a const array named permissions.
//
// Values:
// - "tasks:read"
// - "tasks:create"
// - "tasks:update"
// - "tasks:delete"
//
// Use `as const`.
//
// Then create a type named Permission from the array.

// Your code here:



// --------------------------------------------------

// Exercise 3:
// Create a const array named taskStatuses.
//
// Values:
// - "todo"
// - "in_progress"
// - "done"
// - "blocked"
//
// Use `as const`.
//
// Then create a type named TaskStatus from the array.

// Your code here:



// --------------------------------------------------

// Exercise 4:
// Create an interface named User.
//
// Fields:
// - readonly id: string
// - email: string
// - role: UserRole

// Your code here:



// --------------------------------------------------

// Exercise 5:
// Create an interface named AuditFields.
//
// Fields:
// - createdAt: string
// - updatedAt: string
//
// Create an interface named Task that extends AuditFields.
//
// Task fields:
// - readonly id: string
// - title: string
// - description?: string
// - status: TaskStatus
// - assigneeId?: string

// Your code here:



// --------------------------------------------------

// Exercise 6:
// Create a type alias named CreateTaskRequest.
//
// Fields:
// - title: string
// - description?: string
// - assigneeId?: string
//
// Create a type alias named UpdateTaskStatusRequest.
//
// Fields:
// - taskId: string
// - status: TaskStatus

// Your code here:



// --------------------------------------------------

// Exercise 7:
// Create a generic discriminated union named ApiResult<TData>.
//
// Cases:
//
// Success:
// - status: "success"
// - data: TData
//
// Error:
// - status: "error"
// - error: string

// Your code here:



// --------------------------------------------------

// Exercise 8:
// Write a function named createTask.
//
// It should accept CreateTaskRequest.
// It should return ApiResult<Task>.
//
// If title.trim() is empty, return:
// - status: "error"
// - error: "Task title is required"
//
// Otherwise return:
// - status: "success"
// - data: a valid Task object
//
// You can hardcode id and timestamps.

// Your code here:



// --------------------------------------------------

// Exercise 9:
// Write a function named printApiResult.
//
// It should accept ApiResult<Task>.
// If success, print the task title.
// If error, print the error.

// Your code here:



// --------------------------------------------------

// Exercise 10:
// Create a discriminated union named TaskLoadState.
//
// Cases:
//
// Idle:
// - status: "idle"
//
// Loading:
// - status: "loading"
//
// Success:
// - status: "success"
// - task: Task
//
// Error:
// - status: "error"
// - error: string

// Your code here:



// --------------------------------------------------

// Exercise 11:
// Write a function named getTaskLoadMessage.
//
// It should accept TaskLoadState.
// Use switch.
// Return:
// - "Task page is idle"
// - "Loading task..."
// - "Loaded task: TASK_TITLE"
// - "Failed to load task: ERROR"
//
// Add exhaustive checking with never.

// Your code here:



// --------------------------------------------------

// Exercise 12:
// Create a discriminated union named PermissionCheck.
//
// Cases:
//
// Allowed:
// - result: "allowed"
//
// Denied:
// - result: "denied"
// - reason: "MISSING_PERMISSION" | "ACCOUNT_DISABLED"

// Your code here:



// --------------------------------------------------

// Exercise 13:
// Write a function named checkPermission.
//
// It should accept:
// - userPermissions: Permission[]
// - requiredPermission: Permission
//
// It should return PermissionCheck.
//
// If userPermissions includes requiredPermission:
// return allowed.
//
// Otherwise return denied with reason "MISSING_PERMISSION".

// Your code here:



// --------------------------------------------------

// Exercise 14:
// Create a const array named securityActions.
//
// Values:
// - "LOGIN_SUCCESS"
// - "LOGIN_FAILED"
// - "TASK_CREATED"
// - "TASK_UPDATED"
// - "PERMISSION_DENIED"
//
// Use `as const`.
//
// Create a type named SecurityAction from the array.
//
// Create a type named SecurityLog.
//
// Fields:
// - readonly id: string
// - actorUserId: string
// - action: SecurityAction
// - createdAt: string
// - metadata?: Record<string, string>

// Your code here:



// --------------------------------------------------

// Exercise 15:
// Write a function named createSecurityLog.
//
// It should accept:
// - actorUserId: string
// - action: SecurityAction
// - metadata?: Record<string, string>
//
// It should return SecurityLog.
//
// You can hardcode id and createdAt.

// Your code here:



// --------------------------------------------------

// Exercise 16:
// Create a weak type named WeakTaskState.
//
// Fields:
// - isLoading: boolean
// - task?: Task
// - error?: string
//
// Create one object that TypeScript accepts but is logically invalid.
//
// Add a comment explaining why discriminated union is better.

// Your code here:



// --------------------------------------------------

// Exercise 17:
// Create sample data:
//
// - one admin user
// - one regular user
// - one task assigned to the regular user
// - one successful createTask result
// - one failed createTask result
// - one permission check
// - one security log

// Your code here:



// --------------------------------------------------

// Exercise 18:
// Write a short comment answering:
//
// What is the most important thing Phase 2 changed in how you model data?
//
// Your answer here: