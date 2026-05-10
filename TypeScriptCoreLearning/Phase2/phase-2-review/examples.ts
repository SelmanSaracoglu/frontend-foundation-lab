// phase-2-review/examples.ts

// Review domain:
// Small task management + auth/security model.

// --------------------------------------------------
// 1. Const arrays + literal unions

const userRoles = ["admin", "user", "support"] as const;
type UserRole = (typeof userRoles)[number];

const permissions = [
  "tasks:read",
  "tasks:create",
  "tasks:update",
  "tasks:delete",
] as const;
type Permission = (typeof permissions)[number];

const taskStatuses = ["todo", "in_progress", "done", "blocked"] as const;
type TaskStatus = (typeof taskStatuses)[number];

const securityActions = [
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "TASK_CREATED",
  "TASK_UPDATED",
  "PERMISSION_DENIED",
] as const;
type SecurityAction = (typeof securityActions)[number];

// --------------------------------------------------
// 2. Interfaces for object models

interface AuditFields {
  createdAt: string;
  updatedAt: string;
}

interface User {
  readonly id: string;
  email: string;
  role: UserRole;
}

interface Task extends AuditFields {
  readonly id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: string;
}

// --------------------------------------------------
// 3. Type aliases for request/result/state models

type CreateTaskRequest = {
  title: string;
  description?: string;
  assigneeId?: string;
};

type UpdateTaskStatusRequest = {
  taskId: string;
  status: TaskStatus;
};

type ApiResult<TData> =
  | {
      status: "success";
      data: TData;
    }
  | {
      status: "error";
      error: string;
    };

type TaskLoadState =
  | {
      status: "idle";
    }
  | {
      status: "loading";
    }
  | {
      status: "success";
      task: Task;
    }
  | {
      status: "error";
      error: string;
    };

type PermissionCheck =
  | {
      result: "allowed";
    }
  | {
      result: "denied";
      reason: "MISSING_PERMISSION" | "ACCOUNT_DISABLED";
    };

type SecurityLog = {
  readonly id: string;
  actorUserId: string;
  action: SecurityAction;
  createdAt: string;
  metadata?: Record<string, string>;
};

// --------------------------------------------------
// 4. Runtime validation helper using const array

function isUserRole(value: string): value is UserRole {
  return userRoles.includes(value as UserRole);
}

function parseUserRole(value: string): UserRole | null {
  if (isUserRole(value)) {
    return value;
  }

  return null;
}

console.log("Parse admin:", parseUserRole("admin"));
console.log("Parse owner:", parseUserRole("owner"));

// Expected output:
// Parse admin: admin
// Parse owner: null

// --------------------------------------------------
// 5. Working with reusable domain types

const adminUser: User = {
  id: "user-1",
  email: "admin@example.com",
  role: "admin",
};

const regularUser: User = {
  id: "user-2",
  email: "user@example.com",
  role: "user",
};

const task: Task = {
  id: "task-1",
  title: "Review TypeScript Phase 2",
  status: "in_progress",
  assigneeId: regularUser.id,
  createdAt: "2026-01-01T10:00:00Z",
  updatedAt: "2026-01-01T10:00:00Z",
};

console.log("Task:", task);

// --------------------------------------------------
// 6. API result as discriminated union

function createTask(request: CreateTaskRequest): ApiResult<Task> {
  if (request.title.trim() === "") {
    return {
      status: "error",
      error: "Task title is required",
    };
  }

  return {
    status: "success",
    data: {
      id: "task-2",
      title: request.title,
      description: request.description,
      status: "todo",
      assigneeId: request.assigneeId,
      createdAt: "2026-01-01T11:00:00Z",
      updatedAt: "2026-01-01T11:00:00Z",
    },
  };
}

function printCreateTaskResult(result: ApiResult<Task>): void {
  if (result.status === "success") {
    console.log("Created task:", result.data.title);
    return;
  }

  console.log("Create task error:", result.error);
}

printCreateTaskResult(
  createTask({
    title: "Write review exercises",
    assigneeId: regularUser.id,
  }),
);

printCreateTaskResult(
  createTask({
    title: "",
  }),
);

// Expected behavior:
// Success result has data.
// Error result has error.

// --------------------------------------------------
// 7. Narrowing with literal unions

function canManageTasks(role: UserRole): boolean {
  if (role === "admin" || role === "support") {
    return true;
  }

  return false;
}

console.log("Admin can manage tasks:", canManageTasks(adminUser.role));
console.log("User can manage tasks:", canManageTasks(regularUser.role));

// Expected output:
// true
// false

// --------------------------------------------------
// 8. Permission check result

function checkPermission(
  userPermissions: Permission[],
  requiredPermission: Permission,
): PermissionCheck {
  if (userPermissions.includes(requiredPermission)) {
    return {
      result: "allowed",
    };
  }

  return {
    result: "denied",
    reason: "MISSING_PERMISSION",
  };
}

function describePermissionCheck(check: PermissionCheck): string {
  if (check.result === "allowed") {
    return "Permission allowed";
  }

  return `Permission denied: ${check.reason}`;
}

const adminPermissionCheck = checkPermission(
  ["tasks:read", "tasks:create", "tasks:update", "tasks:delete"],
  "tasks:delete",
);

const userPermissionCheck = checkPermission(["tasks:read"], "tasks:delete");

console.log(describePermissionCheck(adminPermissionCheck));
console.log(describePermissionCheck(userPermissionCheck));

// Expected output:
// Permission allowed
// Permission denied: MISSING_PERMISSION

// --------------------------------------------------
// 9. Task load state with exhaustive switch

function getTaskLoadMessage(state: TaskLoadState): string {
  switch (state.status) {
    case "idle":
      return "Task page is idle";

    case "loading":
      return "Loading task...";

    case "success":
      return `Loaded task: ${state.task.title}`;

    case "error":
      return `Failed to load task: ${state.error}`;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}

console.log(getTaskLoadMessage({ status: "idle" }));
console.log(getTaskLoadMessage({ status: "loading" }));
console.log(
  getTaskLoadMessage({
    status: "success",
    task,
  }),
);
console.log(
  getTaskLoadMessage({
    status: "error",
    error: "Task not found",
  }),
);

// Expected behavior:
// Each state is handled safely.

// --------------------------------------------------
// 10. Security log with controlled action values

function createSecurityLog(
  actorUserId: string,
  action: SecurityAction,
  metadata?: Record<string, string>,
): SecurityLog {
  return {
    id: "log-1",
    actorUserId,
    action,
    createdAt: "2026-01-01T12:00:00Z",
    metadata,
  };
}

const permissionDeniedLog = createSecurityLog(adminUser.id, "PERMISSION_DENIED", {
  requiredPermission: "tasks:delete",
  targetUserId: regularUser.id,
});

console.log("Security log:", permissionDeniedLog);

// This would cause a TypeScript error:
// createSecurityLog(adminUser.id, "RANDOM_ACTION");

// --------------------------------------------------
// 11. Weak model comparison

type WeakTaskState = {
  isLoading: boolean;
  task?: Task;
  error?: string;
};

const weakInvalidState: WeakTaskState = {
  isLoading: true,
  task,
  error: "Something failed",
};

console.log("Weak invalid state:", weakInvalidState);

// This compiles, but it is logically invalid.
// A state should not be loading, successful, and failed at the same time.

// Better model is TaskLoadState above.