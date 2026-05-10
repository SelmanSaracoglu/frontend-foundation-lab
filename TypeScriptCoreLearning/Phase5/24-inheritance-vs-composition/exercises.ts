// 22-inheritance-vs-composition/exercises.ts

// --------------------------------------------------
// Exercise 1:
// BaseApiClient oluştur.
//
// Constructor:
// protected readonly baseUrl: string
//
// Method:
// public buildUrl(path: string): string
//
// Sonra UserApiClient extends BaseApiClient oluştur.
//
// Methods:
// public getUsersUrl(): string
// public getUserUrl(userId: string): string
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

const userApiClient = new UserApiClient("https://api.example.com");

console.log(userApiClient.getUsersUrl());
// Expected output: "https://api.example.com/users"

console.log(userApiClient.getUserUrl("u1"));
// Expected output: "https://api.example.com/users/u1"

// --------------------------------------------------
// Exercise 2:
// BaseLogger oluştur.
//
// Methods:
// public formatMessage(message: string): string
// public log(message: string): void
//
// SecurityLogger extends BaseLogger oluştur.
// formatMessage method'unu override et.
// Mesajın başına "[SECURITY]" ekle.
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

const securityLogger = new SecurityLogger();

securityLogger.log("users:delete");
// Expected output: "[SECURITY] users:delete"

// --------------------------------------------------
// Exercise 3:
// AuditLogger contract'ı oluştur.
//
// log(userId: string, action: string): void
//
// ConsoleAuditLogger class'ı bu contract'ı implements etsin.
// --------------------------------------------------

type AuditLogger = {
  log(userId: string, action: string): void;
};

class ConsoleAuditLogger implements AuditLogger {
  public log(userId: string, action: string): void {
    console.log(`[AUDIT] ${userId}: ${action}`);
  }
}

const consoleAuditLogger = new ConsoleAuditLogger();

consoleAuditLogger.log("u1", "login_success");
// Expected output: "[AUDIT] u1: login_success"

// --------------------------------------------------
// Exercise 4:
// MemoryAuditLogger class oluştur.
// AuditLogger implements etsin.
//
// private logs: string[] = []
//
// Methods:
// log(userId: string, action: string): void
// getLogs(): string[]
//
// getLogs kopya dönsün.
// --------------------------------------------------

class MemoryAuditLogger implements AuditLogger {
  private logs: string[] = [];

  public log(userId: string, action: string): void {
    this.logs.push(`${userId}:${action}`);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

const memoryAuditLogger = new MemoryAuditLogger();

memoryAuditLogger.log("u1", "login_success");

console.log(memoryAuditLogger.getLogs());
// Expected output:
// ["u1:login_success"]

// --------------------------------------------------
// Exercise 5:
// User type oluştur.
//
// AuthService class oluştur.
//
// Constructor:
// private readonly users: User[]
// private readonly auditLogger: AuditLogger
//
// Private method:
// normalizeEmail(email: string): string
//
// Public method:
// login(email: string): boolean
//
// Eğer user bulunamazsa false dön.
// Eğer user inactive ise false dön.
// Başarılı login'de auditLogger.log(user.id, "login_success") çağır.
// --------------------------------------------------

type User = {
  id: string;
  email: string;
  isActive: boolean;
};

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
  memoryAuditLogger
);

console.log(authService.login(" ADA@example.com "));
// Expected output: true

console.log(authService.login("disabled@example.com"));
// Expected output: false

console.log(memoryAuditLogger.getLogs());
// Expected output:
// ["u1:login_success", "u1:login_success"]
//
// Not:
// İlk log Exercise 4'te eklenmişti.
// İkinci log başarılı login'den geldi.

// --------------------------------------------------
// Exercise 6:
// TokenProvider contract'ı oluştur.
//
// getToken(): string
//
// StaticTokenProvider class'ı oluştur.
// Constructor token alsın.
// getToken token'ı dönsün.
//
// SecureApiClient class'ı oluştur.
// Constructor:
// private readonly baseUrl: string
// private readonly tokenProvider: TokenProvider
//
// Method:
// buildAuthorizedRequest(path: string): {
//   url: string;
//   authorizationHeader: string;
// }
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
// Exercise 7:
// Page Object Model'e hazırlık için iki yaklaşımı karşılaştır.
//
// Inheritance:
// BasePage ve LoginPage
//
// Composition:
// Navigator ve LoginPageWithNavigator
// --------------------------------------------------

class BasePage {
  constructor(protected readonly baseUrl: string) {}

  protected buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class LoginPage extends BasePage {
  public getLoginUrl(): string {
    return this.buildUrl("/login");
  }
}

const loginPage = new LoginPage("https://app.example.com");

console.log(loginPage.getLoginUrl());
// Expected output: "https://app.example.com/login"

class Navigator {
  constructor(private readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class LoginPageWithNavigator {
  constructor(private readonly navigator: Navigator) {}

  public getLoginUrl(): string {
    return this.navigator.buildUrl("/login");
  }
}

const navigator = new Navigator("https://app.example.com");

const loginPageWithNavigator = new LoginPageWithNavigator(navigator);

console.log(loginPageWithNavigator.getLoginUrl());
// Expected output: "https://app.example.com/login"

// --------------------------------------------------
// Exercise 8:
// Aşağıdaki kararları yorum olarak açıkla.
//
// Inheritance ne zaman?
// Composition ne zaman?
// AuthService neden AuditLogger'dan extends almamalı?
// --------------------------------------------------

/*
Inheritance ne zaman?
- Gerçek bir "is-a" ilişkisi varsa.
- Subclass gerçekten base class'ın özel bir türüyse.
- Ortak davranış base class'ta anlamlı ve stabil kalacaksa.
- Örnek: UserApiClient is a BaseApiClient.

Composition ne zaman?
- Bir class başka bir davranışı kullanıyorsa.
- İlişki "has-a" veya "uses-a" ise.
- Dependency testlerde değiştirilecekse.
- Farklı implementasyonlar desteklenmek isteniyorsa.
- Örnek: AuthService uses AuditLogger.

AuthService neden AuditLogger'dan extends almamalı?
- Çünkü AuthService bir AuditLogger değildir.
- AuthService login davranışını yönetir ve audit log kullanır.
- Logger davranışını inherit etmek yanlış ilişki kurar.
- Composition ile AuthService sadece ihtiyaç duyduğu log contract'ına bağımlı olur.
- Bu daha test edilebilir ve maintainable'dır.
*/

// --------------------------------------------------
// Exercise 9:
// Inheritance yerine composition seçmenin test edilebilirlik avantajını açıkla.
// --------------------------------------------------

/*
Composition test edilebilirliği artırır çünkü dependency dışarıdan verilebilir.

Örneğin AuthService, AuditLogger contract'ına bağımlıysa testte ConsoleAuditLogger yerine
MemoryAuditLogger verilebilir. Böylece gerçek console output veya dış sistem gerekmeden
hangi logların üretildiği kontrol edilebilir.

Inheritance'ta davranış base class'a gömülü olduğu için değiştirmek veya izole test etmek
daha zor olabilir.
*/