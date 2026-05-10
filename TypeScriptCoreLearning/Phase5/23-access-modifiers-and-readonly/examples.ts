// 21-access-modifiers-and-readonly/examples.ts

// --------------------------------------------------
// Example 1: public properties and methods
// --------------------------------------------------

class UserProfile {
  public id: string;
  public email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  public getNormalizedEmail(): string {
    return this.email.trim().toLowerCase();
  }
}

const userProfile = new UserProfile("u1", " ADA@example.com ");

console.log(userProfile.id);
// Expected output: "u1"

console.log(userProfile.getNormalizedEmail());
// Expected output: "ada@example.com"

// --------------------------------------------------
// Example 2: private property
// --------------------------------------------------

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

const apiClient = new ApiClient("https://api.example.com");

console.log(apiClient.buildUrl("/users"));
// Expected output: "https://api.example.com/users"

// This would not compile:
//
// console.log(apiClient.baseUrl);

// --------------------------------------------------
// Example 3: private helper method
// --------------------------------------------------

type AuthUser = {
  id: string;
  email: string;
  isActive: boolean;
};

class AuthService {
  private users: AuthUser[];

  constructor(users: AuthUser[]) {
    this.users = users;
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public findUserByEmail(email: string): AuthUser | undefined {
    const normalizedEmail = this.normalizeEmail(email);

    return this.users.find((user) => user.email === normalizedEmail);
  }

  public canLogin(email: string): boolean {
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

// This would not compile:
//
// authService.normalizeEmail(" TEST@example.com ");

// --------------------------------------------------
// Example 4: readonly identity fields
// --------------------------------------------------

class Session {
  public readonly id: string;
  public readonly userId: string;
  public expiresAt: Date;

  constructor(id: string, userId: string, expiresAt: Date) {
    this.id = id;
    this.userId = userId;
    this.expiresAt = expiresAt;
  }

  public isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }
}

const session = new Session("s1", "u1", new Date("2030-01-01T00:00:00Z"));

console.log(session.id);
// Expected output: "s1"

console.log(session.isExpired());
// Expected output: false

// This would not compile:
//
// session.id = "s2";

// This is allowed because expiresAt is not readonly:
session.expiresAt = new Date("2031-01-01T00:00:00Z");

console.log(session.isExpired());
// Expected output: false

// --------------------------------------------------
// Example 5: private readonly with constructor parameter property
// --------------------------------------------------

class BetterApiClient {
  constructor(private readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  public getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}

const betterApiClient = new BetterApiClient("https://api.example.com");

console.log(betterApiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

// This would not compile:
//
// betterApiClient.baseUrl = "https://evil.example.com";

// --------------------------------------------------
// Example 6: protected property
// --------------------------------------------------

class BaseClient {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}

class UserClient extends BaseClient {
  public getUsersUrl(): string {
    return `${this.baseUrl}/users`;
  }
}

const userClient = new UserClient("https://api.example.com");

console.log(userClient.getUsersUrl());
// Expected output: "https://api.example.com/users"

// This would not compile:
//
// console.log(userClient.baseUrl);

// --------------------------------------------------
// Example 7: private state with safe read method
// --------------------------------------------------

type AuditLog = {
  userId: string;
  action: string;
  createdAt: Date;
};

class AuditLogger {
  private logs: AuditLog[] = [];

  public log(userId: string, action: string): void {
    this.logs.push({
      userId,
      action,
      createdAt: new Date(),
    });
  }

  public getLogs(): AuditLog[] {
    return [...this.logs];
  }

  public count(): number {
    return this.logs.length;
  }
}

const auditLogger = new AuditLogger();

auditLogger.log("u1", "login_success");
auditLogger.log("u1", "profile_update");

console.log(auditLogger.count());
// Expected output: 2

const logs = auditLogger.getLogs();

logs.push({
  userId: "attacker",
  action: "fake_log",
  createdAt: new Date(),
});

console.log(logs.length);
// Expected output: 3

console.log(auditLogger.count());
// Expected output: 2
// Internal logs did not change because getLogs returned a copy.

// --------------------------------------------------
// Example 8: readonly array reference is not deep immutable
// --------------------------------------------------

class UnsafeReadonlyAuditLogger {
  public readonly logs: AuditLog[] = [];
}

const unsafeLogger = new UnsafeReadonlyAuditLogger();

unsafeLogger.logs.push({
  userId: "u1",
  action: "login_success",
  createdAt: new Date(),
});

console.log(unsafeLogger.logs.length);
// Expected output: 1

// This would not compile:
//
// unsafeLogger.logs = [];

// But push is still allowed because readonly protects reassignment,
// not array contents.