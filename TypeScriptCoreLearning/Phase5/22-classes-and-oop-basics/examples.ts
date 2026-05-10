// 20-classes-and-oop-basics/examples.ts

// --------------------------------------------------
// Example 1: Basic class
// --------------------------------------------------

class UserAccount {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  getNormalizedEmail(): string {
    return this.email.trim().toLowerCase();
  }
}

const userAccount = new UserAccount("u1", " ADA@example.com ");

console.log(userAccount.id);
// Expected output: "u1"

console.log(userAccount.getNormalizedEmail());
// Expected output: "ada@example.com"

// --------------------------------------------------
// Example 2: Object/function-based approach
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

function normalizeUserEmail(user: User): string {
  return user.email.trim().toLowerCase();
}

const plainUser: User = {
  id: "u2",
  email: " LINUS@example.com ",
  role: "user",
};

console.log(normalizeUserEmail(plainUser));
// Expected output: "linus@example.com"

// This approach is simple and useful for plain data.

// --------------------------------------------------
// Example 3: Class with simple business behavior
// --------------------------------------------------

class Session {
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

const activeSession = new Session("s1", "u1", new Date("2030-01-01T00:00:00Z"));

console.log(activeSession.isExpired());
// Expected output: false

const expiredSession = new Session("s2", "u1", new Date("2020-01-01T00:00:00Z"));

console.log(expiredSession.isExpired());
// Expected output: true

// --------------------------------------------------
// Example 4: ApiClient class
// --------------------------------------------------

class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  getUsersUrl(): string {
    return this.buildUrl("/users");
  }

  getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}

const apiClient = new ApiClient("https://api.example.com");

console.log(apiClient.getUsersUrl());
// Expected output: "https://api.example.com/users"

console.log(apiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

// --------------------------------------------------
// Example 5: AuthService class with dependency data
// --------------------------------------------------

type AuthUser = {
  id: string;
  email: string;
  passwordHash: string;
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
    passwordHash: "hashed-password-1",
    isActive: true,
  },
  {
    id: "u2",
    email: "locked@example.com",
    passwordHash: "hashed-password-2",
    isActive: false,
  },
]);

console.log(authService.canLogin(" ADA@example.com "));
// Expected output: true

console.log(authService.canLogin("locked@example.com"));
// Expected output: false

console.log(authService.canLogin("missing@example.com"));
// Expected output: false

// --------------------------------------------------
// Example 6: AuditLogger class with internal state
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
auditLogger.log("u1", "users:read");

console.log(auditLogger.count());
// Expected output: 2

console.log(auditLogger.getLogs()[0]?.action);
// Expected output: "login_success"

// --------------------------------------------------
// Example 7: When a function is enough
// --------------------------------------------------

function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}

console.log(formatEmail(" GRACE@example.com "));
// Expected output: "grace@example.com"

// A class like this may be unnecessary:
//
// class EmailFormatter {
//   format(email: string): string {
//     return email.trim().toLowerCase();
//   }
// }
//
// If there is no state or dependency, a function is often simpler.

// --------------------------------------------------
// Example 8: Class instance as a TypeScript type
// --------------------------------------------------

function printSessionStatus(session: Session): void {
  if (session.isExpired()) {
    console.log("Session expired");
  } else {
    console.log("Session active");
  }
}

printSessionStatus(activeSession);
// Expected output: "Session active"

printSessionStatus(expiredSession);
// Expected output: "Session expired"