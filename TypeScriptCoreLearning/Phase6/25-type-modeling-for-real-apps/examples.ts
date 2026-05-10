// 25-type-modeling-for-real-apps/examples.ts

// --------------------------------------------------
// Runtime constants + derived union types
// --------------------------------------------------

const ROLES = ["admin", "user", "support"] as const;

type Role = (typeof ROLES)[number];

const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:update",
  "users:delete",
] as const;

type Permission = (typeof PERMISSIONS)[number];

type RiskLevel = "low" | "medium" | "high";

// --------------------------------------------------
// Config maps with satisfies
// --------------------------------------------------

const roleLabels = {
  admin: "Administrator",
  user: "User",
  support: "Support",
} satisfies Record<Role, string>;

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
  "users:update": {
    label: "Update users",
    risk: "medium",
    auditRequired: true,
  },
  "users:delete": {
    label: "Delete users",
    risk: "high",
    auditRequired: true,
  },
} satisfies Record<Permission, PermissionConfig>;

const rolePermissions = {
  admin: ["users:read", "users:create", "users:update", "users:delete"],
  support: ["users:read", "users:update"],
  user: ["users:read"],
} as const satisfies Record<Role, readonly Permission[]>;

// --------------------------------------------------
// Domain models
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  role: Role;
  passwordHash: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PublicUser = Pick<User, "id" | "email" | "role" | "isActive">;

type Session = {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
};

type CreateUserRequest = Pick<User, "email"> & {
  password: string;
};

type UpdateOwnProfileRequest = Partial<Pick<User, "email">>;

type AdminUpdateUserRequest = Partial<Pick<User, "email" | "role" | "isActive">>;

// --------------------------------------------------
// API result and errors
// --------------------------------------------------

type ApiErrorCode = "NOT_FOUND" | "VALIDATION_ERROR" | "FORBIDDEN";

type ApiError = {
  code: ApiErrorCode;
  message: string;
};

type ApiResult<TData, TError = ApiError> =
  | {
      success: true;
      data: TData;
      requestId: string;
    }
  | {
      success: false;
      error: TError;
      requestId: string;
    };

// --------------------------------------------------
// Audit log models
// --------------------------------------------------

const AUDIT_ACTIONS = [
  "login_success",
  "login_failed",
  "users:read",
  "users:create",
  "users:update",
  "users:delete",
] as const;

type AuditAction = (typeof AUDIT_ACTIONS)[number];

type AuditLog = {
  id: string;
  actorUserId: string;
  action: AuditAction;
  targetUserId?: string;
  requestId: string;
  createdAt: string;
};

type AuditLogger = {
  log(entry: Omit<AuditLog, "id" | "createdAt">): void;
};

// --------------------------------------------------
// Utility functions
// --------------------------------------------------

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}

function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// --------------------------------------------------
// Class for behavior + dependency
// --------------------------------------------------

class MemoryAuditLogger implements AuditLogger {
  private logs: AuditLog[] = [];

  public log(entry: Omit<AuditLog, "id" | "createdAt">): void {
    this.logs.push({
      ...entry,
      id: `log-${this.logs.length + 1}`,
      createdAt: new Date().toISOString(),
    });
  }

  public getLogs(): AuditLog[] {
    return [...this.logs];
  }
}

class UserService {
  constructor(
    private readonly usersById: Record<string, User>,
    private readonly auditLogger: AuditLogger
  ) {}

  public getUserById(
    actor: PublicUser,
    targetUserId: string,
    requestId: string
  ): ApiResult<PublicUser> {
    if (!hasPermission(actor.role, "users:read")) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Missing users:read permission",
        },
        requestId,
      };
    }

    const user = this.usersById[targetUserId];

    if (user === undefined) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "User not found",
        },
        requestId,
      };
    }

    this.auditLogger.log({
      actorUserId: actor.id,
      action: "users:read",
      targetUserId: user.id,
      requestId,
    });

    return {
      success: true,
      data: toPublicUser(user),
      requestId,
    };
  }

  public createUser(
    actor: PublicUser,
    request: CreateUserRequest,
    requestId: string
  ): ApiResult<PublicUser> {
    if (!hasPermission(actor.role, "users:create")) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Missing users:create permission",
        },
        requestId,
      };
    }

    const now = new Date().toISOString();

    const user: User = {
      id: "u-new",
      email: normalizeEmail(request.email),
      role: "user",
      passwordHash: `hashed:${request.password}`,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.auditLogger.log({
      actorUserId: actor.id,
      action: "users:create",
      targetUserId: user.id,
      requestId,
    });

    return {
      success: true,
      data: toPublicUser(user),
      requestId,
    };
  }
}

// --------------------------------------------------
// Example usage
// --------------------------------------------------

const adminUser: User = {
  id: "u1",
  email: "admin@example.com",
  role: "admin",
  passwordHash: "hashed-admin-password",
  isActive: true,
  createdAt: "2026-05-10T10:00:00Z",
  updatedAt: "2026-05-10T10:00:00Z",
};

const normalUser: User = {
  id: "u2",
  email: "user@example.com",
  role: "user",
  passwordHash: "hashed-user-password",
  isActive: true,
  createdAt: "2026-05-10T10:00:00Z",
  updatedAt: "2026-05-10T10:00:00Z",
};

const auditLogger = new MemoryAuditLogger();

const userService = new UserService(
  {
    u1: adminUser,
    u2: normalUser,
  },
  auditLogger
);

const readResult = userService.getUserById(
  toPublicUser(adminUser),
  "u2",
  "req-1"
);

if (readResult.success) {
  console.log(readResult.data.email);
} else {
  console.log(readResult.error.message);
}
// Expected output: "user@example.com"

const createResult = userService.createUser(
  toPublicUser(adminUser),
  {
    email: " NEW@example.com ",
    password: "safe-password",
  },
  "req-2"
);

if (createResult.success) {
  console.log(createResult.data);
} else {
  console.log(createResult.error);
}
// Expected output:
// {
//   id: "u-new",
//   email: "new@example.com",
//   role: "user",
//   isActive: true
// }

console.log(auditLogger.getLogs().map((log) => log.action));
// Expected output:
// ["users:read", "users:create"]

console.log(roleLabels.admin);
// Expected output: "Administrator"

console.log(permissionConfig["users:delete"].risk);
// Expected output: "high"

console.log(hasPermission("support", "users:delete"));
// Expected output: false

// These would not compile:
//
// const invalidRole: Role = "superadmin";
//
// const invalidPermission: Permission = "users:export";
//
// const unsafePublicUser: PublicUser = {
//   id: "u1",
//   email: "admin@example.com",
//   role: "admin",
//   isActive: true,
//   passwordHash: "should-not-leak",
// };