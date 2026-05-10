// phase-5-review/exercises.ts

// Goal:
// Phase 5 konularını küçük bir auth/audit/api client senaryosunda tekrar et.

// --------------------------------------------------
// Exercise 1:
// User ve AuditLog type'larını oluştur.
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
// Exercise 2:
// AuditLogger contract'ı oluştur.
// log(userId: string, action: string): void
// --------------------------------------------------

type AuditLogger = {
  log(userId: string, action: string): void;
};

// --------------------------------------------------
// Exercise 3:
// MemoryAuditLogger class oluştur.
//
// implements AuditLogger
//
// private logs: AuditLog[] = []
//
// public methods:
// log(userId: string, action: string): void
// getLogs(): AuditLog[]
// count(): number
//
// getLogs kopya dönmeli.
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
// Exercise 4:
// AuthService class oluştur.
//
// Constructor:
// private readonly users: User[]
// private readonly auditLogger: AuditLogger
//
// private normalizeEmail(email: string): string
//
// public login(email: string): boolean
//
// Başarılı login'de auditLogger.log(user.id, "login_success") çağır.
// User yoksa veya inactive ise false dön.
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
// Exercise 5:
// Session class oluştur.
//
// Constructor parameter properties kullan:
//
// public readonly id: string
// public readonly userId: string
// private expiresAt: Date
//
// Methods:
// isExpired(): boolean
// extend(newExpiresAt: Date): void
// getExpiresAt(): Date
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
// Exercise 6:
// BaseApiClient oluştur.
//
// Constructor:
// protected readonly baseUrl: string
//
// public buildUrl(path: string): string
//
// UserApiClient extends BaseApiClient oluştur.
//
// Methods:
// getUsersUrl(): string
// getUserUrl(userId: string): string
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
// Exercise 7:
// BaseLogger ve SecurityLogger oluştur.
//
// BaseLogger:
// formatMessage(message: string): string
// log(message: string): void
//
// SecurityLogger:
// formatMessage'i override et.
// Mesaj başına "[SECURITY]" ekle.
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
// Exercise 8:
// TokenProvider contract'ı oluştur.
// StaticTokenProvider ve SecureApiClient class'larını composition ile yaz.
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
// Exercise 9:
// Yukarıdaki yapıları birlikte kullan.
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

console.log(session.isExpired());
// Expected output: false

session.extend(new Date("2031-01-01T00:00:00Z"));

console.log(session.getExpiresAt().getFullYear());
// Expected output: 2031

const userApiClient = new UserApiClient("https://api.example.com");

console.log(userApiClient.getUsersUrl());
// Expected output: "https://api.example.com/users"

console.log(userApiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

const securityLogger = new SecurityLogger();

securityLogger.log("login_failed");
// Expected output: "[SECURITY] login_failed"

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
// Exercise 10:
// Aşağıdaki kararları yorum olarak açıkla.
// --------------------------------------------------

/*
Class ne zaman mantıklı?
- State tutuyorsa
- Constructor ile dependency/config alıyorsa
- Birden fazla method aynı internal state veya dependency ile çalışıyorsa
- Service, client, logger, session manager gibi davranış odaklı yapı varsa

Function ne zaman yeterli?
- Stateless küçük bir işlem varsa
- Dependency veya internal state gerekmiyorsa
- Basit input -> output dönüşümü yapılıyorsa

private ne zaman?
- Internal state
- Internal helper method
- Dışarıdan doğrudan kullanılmaması gereken detaylar

readonly ne zaman?
- Constructor sonrası değişmemesi gereken identity/config/dependency alanları

inheritance ne zaman?
- Gerçek is-a ilişkisi varsa
- Base class stabil ve anlamlı ortak davranış içeriyorsa

composition ne zaman?
- Bir class başka bir davranışı kullanıyorsa
- İlişki has-a / uses-a ise
- Dependency testte değiştirilecekse
- Daha esnek ve maintainable yapı isteniyorsa

AuthService neden AuditLogger'dan extends almamalı?
- AuthService bir AuditLogger değildir.
- AuthService audit logger kullanır.
- Bu yüzden composition daha doğru ilişkidir.
*/