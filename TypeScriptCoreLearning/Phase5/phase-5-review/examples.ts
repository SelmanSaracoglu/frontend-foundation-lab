// phase-5-review/examples.ts

// --------------------------------------------------
// Phase 5 Review:
// Class, access modifiers, readonly, inheritance and composition
// --------------------------------------------------

// --------------------------------------------------
// Domain models
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  isActive: boolean;
};

type AuditLog = {
  userId: string;
  action: string;
  createdAt: Date;
};

// --------------------------------------------------
// Composition contract
// --------------------------------------------------

type AuditLogger = {
  log(userId: string, action: string): void;
};

// --------------------------------------------------
// Class with private state
// --------------------------------------------------

class MemoryAuditLogger implements AuditLogger {
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

// --------------------------------------------------
// Class with dependency injection and encapsulation
// --------------------------------------------------

class AuthService {
  constructor(
    private readonly users: User[],
    private readonly auditLogger: AuditLogger
  ) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public login(email: string): boolean {
    const normalizedEmail = this.normalizeEmail(email);

    const user = this.users.find(
      (candidate) => candidate.email === normalizedEmail
    );

    if (user === undefined || !user.isActive) {
      return false;
    }

    this.auditLogger.log(user.id, "login_success");

    return true;
  }
}

// --------------------------------------------------
// Class with readonly identity
// --------------------------------------------------

class Session {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private expiresAt: Date
  ) {}

  public isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }

  public extend(newExpiresAt: Date): void {
    this.expiresAt = newExpiresAt;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }
}

// --------------------------------------------------
// Inheritance example
// --------------------------------------------------

class BaseApiClient {
  constructor(protected readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class UserApiClient extends BaseApiClient {
  public getUsersUrl(): string {
    return this.buildUrl("/users");
  }

  public getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}

// --------------------------------------------------
// Method override example
// --------------------------------------------------

class BaseLogger {
  public formatMessage(message: string): string {
    return message;
  }

  public log(message: string): void {
    console.log(this.formatMessage(message));
  }
}

class SecurityLogger extends BaseLogger {
  public override formatMessage(message: string): string {
    return `[SECURITY] ${message}`;
  }
}

// --------------------------------------------------
// Composition example with TokenProvider
// --------------------------------------------------

type TokenProvider = {
  getToken(): string;
};

class StaticTokenProvider implements TokenProvider {
  constructor(private readonly token: string) {}

  public getToken(): string {
    return this.token;
  }
}

class SecureApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly tokenProvider: TokenProvider
  ) {}

  public buildAuthorizedRequest(path: string): {
    url: string;
    authorizationHeader: string;
  } {
    return {
      url: `${this.baseUrl}${path}`,
      authorizationHeader: `Bearer ${this.tokenProvider.getToken()}`,
    };
  }
}

// --------------------------------------------------
// Example usage
// --------------------------------------------------

const auditLogger = new MemoryAuditLogger();

const authService = new AuthService(
  [
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
  ],
  auditLogger
);

console.log(authService.login(" ADA@example.com "));
// Expected output: true

console.log(authService.login("disabled@example.com"));
// Expected output: false

console.log(auditLogger.count());
// Expected output: 1

console.log(auditLogger.getLogs()[0]?.action);
// Expected output: "login_success"

const session = new Session("s1", "u1", new Date("2030-01-01T00:00:00Z"));

console.log(session.id);
// Expected output: "s1"

console.log(session.isExpired());
// Expected output: false

session.extend(new Date("2031-01-01T00:00:00Z"));

console.log(session.getExpiresAt().getFullYear());
// Expected output: 2031

const userApiClient = new UserApiClient("https://api.example.com");

console.log(userApiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

const securityLogger = new SecurityLogger();

securityLogger.log("users:delete");
// Expected output: "[SECURITY] users:delete"

const tokenProvider = new StaticTokenProvider("test-token");

const secureApiClient = new SecureApiClient(
  "https://api.example.com",
  tokenProvider
);

console.log(secureApiClient.buildAuthorizedRequest("/users"));
// Expected output:
// {
//   url: "https://api.example.com/users",
//   authorizationHeader: "Bearer test-token"
// }

// --------------------------------------------------
// These would not compile:
//
// session.id = "s2";
//
// authService.users;
//
// authService.normalizeEmail(" TEST@example.com ");
//
// auditLogger.logs;
//
// userApiClient.baseUrl;
// --------------------------------------------------