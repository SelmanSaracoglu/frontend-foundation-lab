// 09-unions-and-narrowing/examples.ts

// Example 1: Basic union type

type Id = string | number;

const userId: Id = "user-1";
const productId: Id = 1001;

console.log("User ID:", userId);
console.log("Product ID:", productId);

// Expected output:
// User ID: user-1
// Product ID: 1001

// --------------------------------------------------

// Example 2: Literal union type

type UserRole = "admin" | "user" | "support";

const adminRole: UserRole = "admin";
const supportRole: UserRole = "support";

console.log("Roles:", adminRole, supportRole);

// This would cause a TypeScript error:
// const invalidRole: UserRole = "owner";

// --------------------------------------------------

// Example 3: Literal union in a domain model

type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

type Task = {
  readonly id: string;
  title: string;
  status: TaskStatus;
};

const task: Task = {
  id: "task-1",
  title: "Write API tests",
  status: "in_progress",
};

console.log("Task:", task);

// Expected behavior:
// Task status must be one of the allowed literal values.

// --------------------------------------------------

// Example 4: typeof narrowing

function formatId(id: Id): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toFixed(0);
}

console.log(formatId("user-123"));
console.log(formatId(123));

// Expected output:
// USER-123
// 123

// --------------------------------------------------

// Example 5: Literal comparison narrowing

function getDashboardPath(role: UserRole): string {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "support") {
    return "/support";
  }

  return "/dashboard";
}

console.log(getDashboardPath("admin"));
console.log(getDashboardPath("user"));
console.log(getDashboardPath("support"));

// Expected output:
// /admin
// /dashboard
// /support

// --------------------------------------------------

// Example 6: null union

type CurrentUser = {
  readonly id: string;
  email: string;
};

function printCurrentUserEmail(user: CurrentUser | null): void {
  if (user === null) {
    console.log("No user logged in");
    return;
  }

  console.log("Current user email:", user.email);
}

printCurrentUserEmail(null);

printCurrentUserEmail({
  id: "user-1",
  email: "admin@example.com",
});

// Expected output:
// No user logged in
// Current user email: admin@example.com

// --------------------------------------------------

// Example 7: Optional property narrowing

type UserProfile = {
  readonly id: string;
  displayName: string;
  avatarUrl?: string;
};

function printAvatarUrl(profile: UserProfile): void {
  if (profile.avatarUrl === undefined) {
    console.log("No avatar URL");
    return;
  }

  console.log("Avatar URL:", profile.avatarUrl.toUpperCase());
}

printAvatarUrl({
  id: "profile-1",
  displayName: "Ada",
});

printAvatarUrl({
  id: "profile-2",
  displayName: "Grace",
  avatarUrl: "https://example.com/avatar.png",
});

// Expected behavior:
// Safely handles both missing and existing avatarUrl.

// --------------------------------------------------

// Example 8: Object union with in operator

type EmailLoginRequest = {
  email: string;
  password: string;
};

type SsoLoginRequest = {
  provider: "google" | "github";
  token: string;
};

type LoginRequest = EmailLoginRequest | SsoLoginRequest;

function handleLogin(request: LoginRequest): void {
  if ("email" in request) {
    console.log(`Email login for ${request.email}`);
    return;
  }

  console.log(`SSO login with ${request.provider}`);
}

handleLogin({
  email: "user@example.com",
  password: "secure-password",
});

handleLogin({
  provider: "github",
  token: "github-token",
});

// Expected output:
// Email login for user@example.com
// SSO login with github

// --------------------------------------------------

// Example 9: Safer API result with union

type SuccessResult = {
  success: true;
  data: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

type ApiResult = SuccessResult | ErrorResult;

function getUserDisplayName(userId: string): ApiResult {
  if (userId === "missing") {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    data: "Ada Lovelace",
  };
}

function printApiResult(result: ApiResult): void {
  if (result.success === true) {
    console.log("User display name:", result.data);
    return;
  }

  console.log("Error:", result.error);
}

printApiResult(getUserDisplayName("user-1"));
printApiResult(getUserDisplayName("missing"));

// Expected output:
// User display name: Ada Lovelace
// Error: User not found

// --------------------------------------------------

// Example 10: Security action literal union

type SecurityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "PASSWORD_RESET_REQUESTED"
  | "PERMISSION_DENIED";

type SecurityLog = {
  readonly id: string;
  actorUserId: string;
  action: SecurityAction;
  createdAt: string;
};

const securityLog: SecurityLog = {
  id: "log-1",
  actorUserId: "user-1",
  action: "PERMISSION_DENIED",
  createdAt: "2026-01-01T10:00:00Z",
};

console.log("Security log:", securityLog);

// This would cause a TypeScript error:
// const invalidSecurityLog: SecurityLog = {
//   id: "log-2",
//   actorUserId: "user-1",
//   action: "RANDOM_ACTION",
//   createdAt: "2026-01-01T10:00:00Z",
// };