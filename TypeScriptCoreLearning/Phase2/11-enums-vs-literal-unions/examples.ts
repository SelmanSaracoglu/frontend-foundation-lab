// 11-enums-vs-literal-unions/examples.ts

// Example 1: Weak string model

type WeakUser = {
  readonly id: string;
  email: string;
  role: string;
};

const weakUser: WeakUser = {
  id: "user-1",
  email: "admin@example.com",
  role: "superhero",
};

console.log("Weak user:", weakUser);

// Expected behavior:
// TypeScript accepts this, but role is not controlled.

// --------------------------------------------------

// Example 2: Literal union

type UserRole = "admin" | "user" | "support";

type User = {
  readonly id: string;
  email: string;
  role: UserRole;
};

const adminUser: User = {
  id: "user-2",
  email: "admin@example.com",
  role: "admin",
};

console.log("Admin user:", adminUser);

// This would cause a TypeScript error:
// const invalidUser: User = {
//   id: "user-3",
//   email: "bad@example.com",
//   role: "superhero",
// };

// --------------------------------------------------

// Example 3: Enum

enum UserRoleEnum {
  Admin = "admin",
  User = "user",
  Support = "support",
}

type EnumUser = {
  readonly id: string;
  email: string;
  role: UserRoleEnum;
};

const enumUser: EnumUser = {
  id: "user-4",
  email: "support@example.com",
  role: UserRoleEnum.Support,
};

console.log("Enum user:", enumUser);
console.log("Enum role value:", UserRoleEnum.Support);

// Expected output:
// Enum role value: support

// --------------------------------------------------

// Example 4: String enum for order status

enum OrderStatusEnum {
  Created = "created",
  Paid = "paid",
  Shipped = "shipped",
  Cancelled = "cancelled",
}

type EnumOrder = {
  readonly id: string;
  status: OrderStatusEnum;
};

const enumOrder: EnumOrder = {
  id: "order-1",
  status: OrderStatusEnum.Paid,
};

console.log("Enum order:", enumOrder);

// --------------------------------------------------

// Example 5: Literal union for order status

type OrderStatus = "created" | "paid" | "shipped" | "cancelled";

type Order = {
  readonly id: string;
  status: OrderStatus;
};

const order: Order = {
  id: "order-2",
  status: "shipped",
};

console.log("Literal union order:", order);

// --------------------------------------------------

// Example 6: Const array pattern

const paymentStatuses = ["pending", "paid", "failed"] as const;

type PaymentStatus = (typeof paymentStatuses)[number];

type Payment = {
  readonly id: string;
  status: PaymentStatus;
};

const payment: Payment = {
  id: "payment-1",
  status: "paid",
};

console.log("Payment:", payment);
console.log("Allowed payment statuses:", paymentStatuses);

// Expected behavior:
// paymentStatuses exists at runtime.
// PaymentStatus exists only at compile-time.

// --------------------------------------------------

// Example 7: Runtime check with const array

const userRoles = ["admin", "user", "support"] as const;

type SafeUserRole = (typeof userRoles)[number];

function isUserRole(value: string): value is SafeUserRole {
  return userRoles.includes(value as SafeUserRole);
}

function parseUserRole(value: string): SafeUserRole | null {
  if (isUserRole(value)) {
    return value;
  }

  return null;
}

console.log("Parsed admin:", parseUserRole("admin"));
console.log("Parsed owner:", parseUserRole("owner"));

// Expected output:
// Parsed admin: admin
// Parsed owner: null

// --------------------------------------------------

// Example 8: Security action literal union

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

// --------------------------------------------------

// Example 9: Permission literal union

type Permission =
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete";

type RolePermission = {
  role: UserRole;
  permissions: Permission[];
};

const adminPermissions: RolePermission = {
  role: "admin",
  permissions: ["users:read", "users:create", "users:update", "users:delete"],
};

console.log("Admin permissions:", adminPermissions);

// This would cause a TypeScript error:
// const invalidPermission: Permission = "user:reed";

// --------------------------------------------------

// Example 10: Literal union in discriminated union

type UploadState =
  | {
      status: "idle";
    }
  | {
      status: "uploading";
      progress: number;
    }
  | {
      status: "uploaded";
      fileUrl: string;
    }
  | {
      status: "failed";
      error: string;
    };

function getUploadMessage(state: UploadState): string {
  switch (state.status) {
    case "idle":
      return "Upload idle";

    case "uploading":
      return `Uploading: ${state.progress}%`;

    case "uploaded":
      return `Uploaded: ${state.fileUrl}`;

    case "failed":
      return `Upload failed: ${state.error}`;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}

console.log(getUploadMessage({ status: "idle" }));
console.log(getUploadMessage({ status: "uploading", progress: 50 }));
console.log(getUploadMessage({ status: "uploaded", fileUrl: "https://example.com/file.pdf" }));

// Expected behavior:
// Literal values make discriminated union narrowing possible.