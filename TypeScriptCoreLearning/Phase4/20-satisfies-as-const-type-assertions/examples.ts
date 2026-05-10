// 23-satisfies-as-const-type-assertions/examples.ts

// --------------------------------------------------
// Example 1: as const with arrays
// --------------------------------------------------

const COURSE_STATUSES = ["draft", "published", "archived"] as const;

type CourseStatus = (typeof COURSE_STATUSES)[number];

const status: CourseStatus = "published";

console.log(status);
// Expected output: "published"

// This would not compile:
//
// const invalidStatus: CourseStatus = "deleted";

// --------------------------------------------------
// Example 2: as const with object values
// --------------------------------------------------

const USER_ROLE = {
  Admin: "admin",
  User: "user",
  Support: "support",
} as const;

type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

const role: UserRole = "support";

console.log(role);
// Expected output: "support"

// This would not compile:
//
// const invalidRole: UserRole = "guest";

// --------------------------------------------------
// Example 3: satisfies with Record
// --------------------------------------------------

const courseStatusLabels = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
} satisfies Record<CourseStatus, string>;

console.log(courseStatusLabels.archived);
// Expected output: "Archived"

// These would not compile:
//
// const missingCourseStatusLabels = {
//   draft: "Draft",
//   published: "Published",
// } satisfies Record<CourseStatus, string>;
//
// const extraCourseStatusLabels = {
//   draft: "Draft",
//   published: "Published",
//   archived: "Archived",
//   deleted: "Deleted",
// } satisfies Record<CourseStatus, string>;

// --------------------------------------------------
// Example 4: permission config with as const + satisfies
// --------------------------------------------------

const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:delete",
] as const;

type Permission = (typeof PERMISSIONS)[number];

type RiskLevel = "low" | "medium" | "high";

type PermissionConfig = {
  label: string;
  risk: RiskLevel;
  auditRequired: boolean;
};

const permissionConfig = {
  "users:read": {
    label: "Read users",
    risk: "low",
    auditRequired: false,
  },
  "users:create": {
    label: "Create users",
    risk: "medium",
    auditRequired: true,
  },
  "users:delete": {
    label: "Delete users",
    risk: "high",
    auditRequired: true,
  },
} satisfies Record<Permission, PermissionConfig>;

console.log(permissionConfig["users:delete"].risk);
// Expected output: "high"

console.log(permissionConfig["users:create"].auditRequired);
// Expected output: true

// --------------------------------------------------
// Example 5: auth event risk map
// --------------------------------------------------

const AUTH_EVENTS = [
  "login_success",
  "login_failed",
  "logout",
] as const;

type AuthEvent = (typeof AUTH_EVENTS)[number];

const authEventRisk = {
  login_success: "low",
  login_failed: "medium",
  logout: "low",
} satisfies Record<AuthEvent, RiskLevel>;

function logAuthEvent(event: AuthEvent): void {
  console.log(`Auth event: ${event}, risk: ${authEventRisk[event]}`);
}

logAuthEvent("login_failed");
// Expected output: "Auth event: login_failed, risk: medium"

// This would not compile:
//
// logAuthEvent("password_reset");

// --------------------------------------------------
// Example 6: routes config
// --------------------------------------------------

type RouteConfig = {
  path: string;
  requiresAuth: boolean;
};

const routes = {
  home: {
    path: "/",
    requiresAuth: false,
  },
  dashboard: {
    path: "/dashboard",
    requiresAuth: true,
  },
  admin: {
    path: "/admin",
    requiresAuth: true,
  },
} satisfies Record<string, RouteConfig>;

type RouteName = keyof typeof routes;

const routeName: RouteName = "dashboard";

console.log(routes[routeName].path);
// Expected output: "/dashboard"

// This would not compile:
//
// const invalidRouteName: RouteName = "settings";

// --------------------------------------------------
// Example 7: test fixture with satisfies
// --------------------------------------------------

type TestUser = {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

const testSupportUser = {
  id: "u-test-1",
  email: "support@example.com",
  role: "support",
  isActive: true,
} satisfies TestUser;

console.log(testSupportUser.role);
// Expected output: "support"

// This would not compile:
//
// const invalidTestUser = {
//   id: "u-test-2",
//   email: "broken@example.com",
//   role: "superadmin",
//   isActive: true,
// } satisfies TestUser;

// --------------------------------------------------
// Example 8: type assertion with JSON.parse
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  role: UserRole;
};

const parsedUser = JSON.parse(
  '{"id":"u1","email":"ada@example.com","role":"admin"}'
) as User;

console.log(parsedUser.email);
// Expected output: "ada@example.com"

// Warning:
// "as User" does not validate runtime data.

const unsafeUser = JSON.parse('{"id":"u2"}') as User;

console.log(unsafeUser.id);
// Expected output: "u2"

// This would be risky at runtime:
//
// console.log(unsafeUser.email.toUpperCase());

// --------------------------------------------------
// Example 9: dangerous assertion
// --------------------------------------------------

type BasicRole = "admin" | "user";

const unsafeRole = "superadmin" as BasicRole;

console.log(unsafeRole);
// Expected output: "superadmin"
//
// This compiles but is logically wrong.
// Assertion forced TypeScript to accept the value.

// --------------------------------------------------
// Example 10: safer object config than assertion
// --------------------------------------------------

type AuditActionConfig = {
  risk: RiskLevel;
  auditRequired: boolean;
};

const auditActionConfig = {
  login_success: {
    risk: "low",
    auditRequired: true,
  },
  login_failed: {
    risk: "medium",
    auditRequired: true,
  },
  logout: {
    risk: "low",
    auditRequired: true,
  },
} satisfies Record<AuthEvent, AuditActionConfig>;

console.log(auditActionConfig.logout.auditRequired);
// Expected output: true