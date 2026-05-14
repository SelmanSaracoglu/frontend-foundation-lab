// 25-type-modeling-for-real-apps/exercises.ts

// Goal:
// Küçük bir auth/audit/permission domain modelini type-safe şekilde kur.

// --------------------------------------------------
// Exercise 1:
// ROLES constant'ı oluştur.
// Değerler: "admin", "user", "support"
// Role type'ını constant'tan üret.
// --------------------------------------------------

const ROLES = ["admin", "user", "support"] as const;

type Role = (typeof ROLES)[number];

const role: Role = "support";

console.log(role);
// Expected output: "support"

// Bu compile olmamalı:
//
// const invalidRole: Role = "superadmin";

// --------------------------------------------------
// Exercise 2:
// PERMISSIONS constant'ı oluştur.
// Değerler:
// "users:read"
// "users:create"
// "users:update"
// "users:delete"
//
// Permission type'ını constant'tan üret.
// --------------------------------------------------

const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:update",
  "users:delete",
] as const;

type Permission = (typeof PERMISSIONS)[number];

const permission: Permission = "users:update";

console.log(permission);
// Expected output: "users:update"

// Bu compile olmamalı:
//
// const invalidPermission: Permission = "users:export";

// --------------------------------------------------
// Exercise 3:
// RiskLevel type'ı oluştur.
// PermissionConfig type'ı oluştur.
// permissionConfig object'ini satisfies ile güvenli yap.
// --------------------------------------------------

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

console.log(permissionConfig["users:delete"].risk);
// Expected output: "high"

// --------------------------------------------------
// Exercise 4:
// rolePermissions map'i oluştur.
// as const + satisfies kullan.
// admin tüm permission'lara sahip olsun.
// support read/update permission'larına sahip olsun.
// user sadece read permission'ına sahip olsun.
// --------------------------------------------------

const rolePermissions: Record<Role, readonly Permission[]> = {
  admin: ["users:read", "users:create", "users:update", "users:delete"],
  support: ["users:read", "users:update"],
  user: ["users:read"],
};

console.log(rolePermissions.support);
// Expected output:
// ["users:read", "users:update"]

// --------------------------------------------------
// Exercise 5:
// User type'ı oluştur.
// Alanlar:
// id, email, role, passwordHash, isActive, createdAt, updatedAt
//
// PublicUser type'ı oluştur.
// id, email, role, isActive alanlarını içersin.
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

const publicUser: PublicUser = {
  id: "u1",
  email: "ada@example.com",
  role: "admin",
  isActive: true,
};

console.log(publicUser);
// Expected output:
// { id: "u1", email: "ada@example.com", role: "admin", isActive: true }

// --------------------------------------------------
// Exercise 6:
// Request type'larını oluştur.
//
// CreateUserRequest:
// email: string
// password: string
//
// UpdateOwnProfileRequest:
// email optional
//
// AdminUpdateUserRequest:
// email, role, isActive optional
// --------------------------------------------------

type CreateUserRequest = Pick<User, "email"> & {
  password: string;
};

type UpdateOwnProfileRequest = Partial<Pick<User, "email">>;

type AdminUpdateUserRequest = Partial<Pick<User, "email" | "role" | "isActive">>;

const createUserRequest: CreateUserRequest = {
  email: "new@example.com",
  password: "safe-password",
};

const ownUpdate: UpdateOwnProfileRequest = {
  email: "new-ada@example.com",
};

const adminUpdate: AdminUpdateUserRequest = {
  role: "support",
  isActive: true,
};

console.log(createUserRequest.email);
console.log(ownUpdate.email);
console.log(adminUpdate.role);
// Expected output:
// "new@example.com"
// "new-ada@example.com"
// "support"

// --------------------------------------------------
// Exercise 7:
// ApiError, ApiResult<T> type'larını oluştur.
// ApiResult discriminated union olmalı.
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
// Exercise 8:
// AUDIT_ACTIONS constant'ı oluştur.
// AuditAction type'ını üret.
// AuditLog type'ı oluştur.
// targetUserId optional olsun.
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

// --------------------------------------------------
// Exercise 9:
// AuditLogger contract'ı oluştur.
// log method'u AuditLog içinden id ve createdAt hariç alanları alsın.
// --------------------------------------------------

type AuditLogger = {
  log(entry: Omit<AuditLog, "id" | "createdAt">): void;
};

// --------------------------------------------------
// Exercise 10:
// toPublicUser, normalizeEmail ve hasPermission fonksiyonlarını yaz.
// --------------------------------------------------

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

console.log(hasPermission("admin", "users:delete"));
// Expected output: true

console.log(hasPermission("user", "users:delete"));
// Expected output: false

// --------------------------------------------------
// Exercise 11:
// MemoryAuditLogger class oluştur.
// private logs: AuditLog[] = []
// log ve getLogs method'ları olsun.
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

// --------------------------------------------------
// Exercise 12:
// UserService class oluştur.
//
// Constructor:
// private readonly usersById: Record<string, User>
// private readonly auditLogger: AuditLogger
//
// Method:
// getUserById(actor: PublicUser, targetUserId: string, requestId: string): ApiResult<PublicUser>
//
// Kurallar:
// - actor users:read permission'a sahip değilse FORBIDDEN dön.
// - user bulunamazsa NOT_FOUND dön.
// - başarılıysa audit log yaz ve PublicUser dön.
// --------------------------------------------------

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
}

// --------------------------------------------------
// Exercise 13:
// Yukarıdaki sistemi birlikte kullan.
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

const result = userService.getUserById(toPublicUser(adminUser), "u2", "req-1");

if (result.success) {
  console.log(result.data.email);
} else {
  console.log(result.error.message);
}
// Expected output: "user@example.com"

const missingResult = userService.getUserById(
  toPublicUser(adminUser),
  "missing",
  "req-2"
);

if (missingResult.success) {
  console.log(missingResult.data.email);
} else {
  console.log(missingResult.error.code);
}
// Expected output: "NOT_FOUND"

console.log(auditLogger.getLogs().map((log) => log.action));
// Expected output:
// ["users:read"]

// --------------------------------------------------
// Exercise 14:
// Aşağıdaki kararları yorum olarak açıkla.
// --------------------------------------------------

/*
Internal User ile PublicUser neden ayrılmalı?
- Internal User passwordHash gibi hassas alanlar içerebilir.
- PublicUser client'a veya dış katmana güvenli şekilde dönebilecek alanları içerir.
- Böylece accidental data leak riski azalır.

CreateUserRequest neden Omit<User, ...> ile değil Pick ile tasarlandı?
- Çünkü create sırasında client'ın göndermesine izin verilen alanları açıkça seçmek daha güvenlidir.
- Omit kullanırsak role veya passwordHash gibi istenmeyen alanlar yanlışlıkla type içinde kalabilir.

AdminUpdateUserRequest ile UpdateOwnProfileRequest neden ayrı?
- Yetki farkı vardır.
- Normal kullanıcı sadece kendi email bilgisini değiştirebilir.
- Admin role ve isActive gibi yönetim alanlarını değiştirebilir.

ApiResult neden boolean + data/error union olarak tasarlandı?
- Başarı ve hata durumlarını type-safe şekilde ayırır.
- success kontrolü yaptıktan sonra TypeScript data veya error alanını doğru narrow eder.

Permission config için satisfies neden iyi?
- Bütün permission key'lerinin config içinde karşılandığını garanti eder.
- Yanlış key veya eksik key hatalarını compile-time'da yakalar.
*/
