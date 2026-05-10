// 10-discriminated-unions/examples.ts

// Example 1: Basic discriminated union

type ApiResult =
  | {
      status: "success";
      data: string;
    }
  | {
      status: "error";
      error: string;
    };

function printApiResult(result: ApiResult): void {
  if (result.status === "success") {
    console.log("Data:", result.data);
    return;
  }

  console.log("Error:", result.error);
}

printApiResult({
  status: "success",
  data: "User loaded",
});

printApiResult({
  status: "error",
  error: "User not found",
});

// Expected output:
// Data: User loaded
// Error: User not found

// --------------------------------------------------

// Example 2: UI loading state

type User = {
  readonly id: string;
  email: string;
};

type UserPageState =
  | {
      status: "idle";
    }
  | {
      status: "loading";
    }
  | {
      status: "success";
      user: User;
    }
  | {
      status: "error";
      error: string;
    };

function renderUserPage(state: UserPageState): string {
  switch (state.status) {
    case "idle":
      return "User page is idle";

    case "loading":
      return "Loading user...";

    case "success":
      return `User email: ${state.user.email}`;

    case "error":
      return `Error: ${state.error}`;
  }
}

console.log(renderUserPage({ status: "idle" }));
console.log(renderUserPage({ status: "loading" }));
console.log(
  renderUserPage({
    status: "success",
    user: {
      id: "user-1",
      email: "admin@example.com",
    },
  }),
);
console.log(
  renderUserPage({
    status: "error",
    error: "Failed to load user",
  }),
);

// Expected behavior:
// Each state is handled safely.

// --------------------------------------------------

// Example 3: Auth state

type AuthState =
  | {
      status: "checking";
    }
  | {
      status: "authenticated";
      user: User;
    }
  | {
      status: "anonymous";
    }
  | {
      status: "error";
      error: string;
    };

function getAuthMessage(state: AuthState): string {
  switch (state.status) {
    case "checking":
      return "Checking session";

    case "authenticated":
      return `Logged in as ${state.user.email}`;

    case "anonymous":
      return "No user logged in";

    case "error":
      return `Auth error: ${state.error}`;
  }
}

console.log(getAuthMessage({ status: "checking" }));
console.log(
  getAuthMessage({
    status: "authenticated",
    user: {
      id: "user-1",
      email: "user@example.com",
    },
  }),
);
console.log(getAuthMessage({ status: "anonymous" }));

// Expected behavior:
// Auth state cannot accidentally contain both user and error.

// --------------------------------------------------

// Example 4: Payment state with different fields

type PaymentState =
  | {
      status: "pending";
    }
  | {
      status: "paid";
      paidAt: string;
    }
  | {
      status: "failed";
      reason: string;
    };

function getPaymentMessage(payment: PaymentState): string {
  switch (payment.status) {
    case "pending":
      return "Payment is pending";

    case "paid":
      return `Payment paid at ${payment.paidAt}`;

    case "failed":
      return `Payment failed: ${payment.reason}`;
  }
}

console.log(getPaymentMessage({ status: "pending" }));
console.log(getPaymentMessage({ status: "paid", paidAt: "2026-01-01" }));
console.log(getPaymentMessage({ status: "failed", reason: "Card declined" }));

// Expected behavior:
// Each payment state carries only the fields it needs.

// --------------------------------------------------

// Example 5: Permission check result

type DenyReason =
  | "MISSING_ROLE"
  | "INSUFFICIENT_PERMISSION"
  | "ACCOUNT_DISABLED";

type PermissionCheck =
  | {
      result: "allowed";
    }
  | {
      result: "denied";
      reason: DenyReason;
    };

function describePermission(check: PermissionCheck): string {
  if (check.result === "allowed") {
    return "Permission granted";
  }

  return `Permission denied: ${check.reason}`;
}

console.log(describePermission({ result: "allowed" }));
console.log(
  describePermission({
    result: "denied",
    reason: "INSUFFICIENT_PERMISSION",
  }),
);

// Expected output:
// Permission granted
// Permission denied: INSUFFICIENT_PERMISSION

// --------------------------------------------------

// Example 6: Login request discriminated union

type EmailLoginRequest = {
  type: "email";
  email: string;
  password: string;
};

type SsoLoginRequest = {
  type: "sso";
  provider: "google" | "github";
  token: string;
};

type LoginRequest = EmailLoginRequest | SsoLoginRequest;

function describeLogin(request: LoginRequest): string {
  switch (request.type) {
    case "email":
      return `Email login for ${request.email}`;

    case "sso":
      return `SSO login with ${request.provider}`;
  }
}

console.log(
  describeLogin({
    type: "email",
    email: "user@example.com",
    password: "secure-password",
  }),
);

console.log(
  describeLogin({
    type: "sso",
    provider: "github",
    token: "github-token",
  }),
);

// Expected behavior:
// Login request type decides which fields are available.

// --------------------------------------------------

// Example 7: Security event discriminated union

type SecurityEvent =
  | {
      type: "login_success";
      actorUserId: string;
      ipAddress: string;
      createdAt: string;
    }
  | {
      type: "login_failed";
      email: string;
      reason: "INVALID_PASSWORD" | "USER_NOT_FOUND";
      ipAddress: string;
      createdAt: string;
    }
  | {
      type: "permission_denied";
      actorUserId: string;
      permission: string;
      createdAt: string;
    };

function formatSecurityEvent(event: SecurityEvent): string {
  switch (event.type) {
    case "login_success":
      return `Login success for user ${event.actorUserId} from ${event.ipAddress}`;

    case "login_failed":
      return `Login failed for ${event.email}: ${event.reason}`;

    case "permission_denied":
      return `Permission denied for user ${event.actorUserId}: ${event.permission}`;
  }
}

console.log(
  formatSecurityEvent({
    type: "login_success",
    actorUserId: "user-1",
    ipAddress: "192.168.1.10",
    createdAt: "2026-01-01T10:00:00Z",
  }),
);

console.log(
  formatSecurityEvent({
    type: "permission_denied",
    actorUserId: "user-1",
    permission: "users:delete",
    createdAt: "2026-01-01T10:05:00Z",
  }),
);

// Expected behavior:
// Each security event type has its own required fields.

// --------------------------------------------------

// Example 8: Exhaustiveness checking with never

type TaskState =
  | {
      status: "todo";
    }
  | {
      status: "in_progress";
      assignedTo: string;
    }
  | {
      status: "done";
      completedAt: string;
    };

function getTaskStateLabel(task: TaskState): string {
  switch (task.status) {
    case "todo":
      return "To do";

    case "in_progress":
      return `In progress, assigned to ${task.assignedTo}`;

    case "done":
      return `Done at ${task.completedAt}`;

    default: {
      const exhaustiveCheck: never = task;
      return exhaustiveCheck;
    }
  }
}

console.log(getTaskStateLabel({ status: "todo" }));
console.log(
  getTaskStateLabel({
    status: "in_progress",
    assignedTo: "user-1",
  }),
);
console.log(
  getTaskStateLabel({
    status: "done",
    completedAt: "2026-01-01",
  }),
);

// Expected behavior:
// If a new TaskState case is added but not handled,
// the never check helps TypeScript catch it.

// --------------------------------------------------

// Example 9: Avoiding invalid state

type WeakUploadState = {
  isLoading: boolean;
  fileUrl?: string;
  error?: string;
};

const weakInvalidUploadState: WeakUploadState = {
  isLoading: true,
  fileUrl: "https://example.com/file.pdf",
  error: "Upload failed",
};

console.log("Weak invalid upload state:", weakInvalidUploadState);

// This compiles, but it is logically wrong.

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

const validUploadState: UploadState = {
  status: "uploading",
  progress: 45,
};

console.log("Valid upload state:", validUploadState);

// This would cause a TypeScript error because uploaded requires fileUrl:
// const invalidUploadState: UploadState = {
//   status: "uploaded",
// };

// --------------------------------------------------

// Example 10: Order state

type OrderState =
  | {
      status: "created";
      createdAt: string;
    }
  | {
      status: "paid";
      paidAt: string;
    }
  | {
      status: "shipped";
      trackingNumber: string;
    }
  | {
      status: "cancelled";
      reason: string;
    };

function getOrderMessage(order: OrderState): string {
  switch (order.status) {
    case "created":
      return `Order created at ${order.createdAt}`;

    case "paid":
      return `Order paid at ${order.paidAt}`;

    case "shipped":
      return `Order shipped with tracking number ${order.trackingNumber}`;

    case "cancelled":
      return `Order cancelled: ${order.reason}`;

    default: {
      const exhaustiveCheck: never = order;
      return exhaustiveCheck;
    }
  }
}

console.log(
  getOrderMessage({
    status: "created",
    createdAt: "2026-01-01",
  }),
);

console.log(
  getOrderMessage({
    status: "shipped",
    trackingNumber: "TRACK-123",
  }),
);

// Expected behavior:
// Order state is explicit and impossible states are avoided.