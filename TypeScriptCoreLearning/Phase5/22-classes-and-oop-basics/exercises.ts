// 20-classes-and-oop-basics/exercises.ts

// --------------------------------------------------
// Exercise 1:
// UserProfile adında bir class oluştur.
//
// Property'ler:
// id: string
// email: string
// name: string
//
// Constructor bu üç değeri alsın.
// getDisplayName method'u name değerini dönsün.
// getNormalizedEmail method'u email'i trim + lowercase dönsün.
// --------------------------------------------------

class UserProfile {
  id: string;
  email: string;
  name: string;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  getDisplayName(): string {
    return this.name;
  }

  getNormalizedEmail(): string {
    return this.email.trim().toLowerCase();
  }
}

const userProfile = new UserProfile("u1", " ADA@example.com ", "Ada Lovelace");

console.log(userProfile.getDisplayName());
// Expected output: "Ada Lovelace"

console.log(userProfile.getNormalizedEmail());
// Expected output: "ada@example.com"

// --------------------------------------------------
// Exercise 2:
// LoginSession adında bir class oluştur.
//
// Property'ler:
// id: string
// userId: string
// expiresAt: Date
//
// Method:
// isExpired(): boolean
//
// expiresAt geçmişteyse true, gelecekteyse false dönsün.
// --------------------------------------------------

class LoginSession {
  id: string;
  userId: string;
  expiresAt: Date;

  constructor(id: string, userId: string, expiresAt: Date) {
    this.id = id;
    this.userId = userId;
    this.expiresAt = expiresAt;
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }
}

const validLoginSession = new LoginSession(
  "s1",
  "u1",
  new Date("2030-01-01T00:00:00Z")
);

const oldLoginSession = new LoginSession(
  "s2",
  "u1",
  new Date("2020-01-01T00:00:00Z")
);

console.log(validLoginSession.isExpired());
// Expected output: false

console.log(oldLoginSession.isExpired());
// Expected output: true

// --------------------------------------------------
// Exercise 3:
// SimpleApiClient adında bir class oluştur.
//
// Property:
// baseUrl: string
//
// Constructor baseUrl alsın.
//
// Methods:
// buildUrl(path: string): string
// getHealthUrl(): string
// getUserUrl(userId: string): string
//
// getHealthUrl "/health" path'ini kullansın.
// getUserUrl "/users/:userId" formatında URL dönsün.
// --------------------------------------------------

class SimpleApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  getHealthUrl(): string {
    return this.buildUrl("/health");
  }

  getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}

const simpleApiClient = new SimpleApiClient("https://api.example.com");

console.log(simpleApiClient.getHealthUrl());
// Expected output: "https://api.example.com/health"

console.log(simpleApiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

// --------------------------------------------------
// Exercise 4:
// AuthUser type'ı oluştur.
//
// Alanlar:
// id: string
// email: string
// isActive: boolean
//
// AuthService class'ı oluştur.
//
// Property:
// users: AuthUser[]
//
// Constructor users alsın.
//
// Methods:
// findUserByEmail(email: string): AuthUser | undefined
// canLogin(email: string): boolean
//
// canLogin sadece user varsa ve isActive true ise true dönsün.
// --------------------------------------------------

type AuthUser = {
  id: string;
  email: string;
  isActive: boolean;
};

class AuthService {
  users: AuthUser[];

  constructor(users: AuthUser[]) {
    this.users = users;
  }

  findUserByEmail(email: string): AuthUser | undefined {
    const normalizedEmail = email.trim().toLowerCase();

    return this.users.find((user) => user.email === normalizedEmail);
  }

  canLogin(email: string): boolean {
    const user = this.findUserByEmail(email);

    return user !== undefined && user.isActive;
  }
}

const authService = new AuthService([
  {
    id: "u1",
    email: "ada@example.com",
    isActive: true,
  },
  {
    id: "u2",
    email: "disabled@example.com",
    isActive: false,
  },
]);

console.log(authService.canLogin(" ADA@example.com "));
// Expected output: true

console.log(authService.canLogin("disabled@example.com"));
// Expected output: false

console.log(authService.canLogin("missing@example.com"));
// Expected output: false

// --------------------------------------------------
// Exercise 5:
// AuditLogger class'ı oluştur.
//
// AuditLog type'ı:
// userId: string
// action: string
// createdAt: Date
//
// AuditLogger property:
// logs: AuditLog[]
//
// Constructor logs'u boş array olarak başlatsın.
//
// Methods:
// log(userId: string, action: string): void
// getLogs(): AuditLog[]
// count(): number
// --------------------------------------------------

type AuditLog = {
  userId: string;
  action: string;
  createdAt: Date;
};

class AuditLogger {
  logs: AuditLog[];

  constructor() {
    this.logs = [];
  }

  log(userId: string, action: string): void {
    this.logs.push({
      userId,
      action,
      createdAt: new Date(),
    });
  }

  getLogs(): AuditLog[] {
    return this.logs;
  }

  count(): number {
    return this.logs.length;
  }
}

const auditLogger = new AuditLogger();

auditLogger.log("u1", "login_success");
auditLogger.log("u1", "profile_update");

console.log(auditLogger.count());
// Expected output: 2

console.log(auditLogger.getLogs()[1]?.action);
// Expected output: "profile_update"

// --------------------------------------------------
// Exercise 6:
// Aşağıdaki stateless işlemi class yerine function olarak yaz.
//
// normalizePermission(permission: string): string
//
// Baştaki/sondaki boşlukları silsin ve lowercase dönsün.
// --------------------------------------------------

function normalizePermission(permission: string): string {
  return permission.trim().toLowerCase();
}

console.log(normalizePermission(" USERS:READ "));
// Expected output: "users:read"

// Not:
// Bu örnekte class gerekmez çünkü state veya dependency yok.

// --------------------------------------------------
// Exercise 7:
// Class kullanmanın mantıklı olduğu ve gereksiz olduğu durumları
// kendi cümlelerinle yorum olarak açıkla.
// --------------------------------------------------

/*
Class kullanmak mantıklı olabilir:
- Bir nesne state tutuyorsa
- Constructor ile verilen dependency birçok method tarafından kullanılıyorsa
- API client, auth service, audit logger gibi davranışlar aynı yapı etrafında toplanıyorsa
- Page Object Model veya SDK client gibi instance tabanlı yapı kuruluyorsa

Class gereksiz olabilir:
- Sadece tek bir stateless helper function varsa
- Plain data modellemek yeterliyse
- Veri ve davranışı birlikte taşımak ekstra fayda sağlamıyorsa
- Kod function ile daha basit ve okunabilir kalıyorsa
*/