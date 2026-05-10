// 22-inheritance-vs-composition/examples.ts

// --------------------------------------------------
// Example 1: Basic inheritance with extends
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
// Example 2: super in subclass constructor
// --------------------------------------------------

class BaseService {
  constructor(protected readonly serviceName: string) {}

  public getServiceName(): string {
    return this.serviceName;
  }
}

class AuthServiceWithInheritance extends BaseService {
  constructor() {
    super("AuthService");
  }

  public getLabel(): string {
    return `Service: ${this.getServiceName()}`;
  }
}

const authServiceWithInheritance = new AuthServiceWithInheritance();

console.log(authServiceWithInheritance.getLabel());
// Expected output: "Service: AuthService"

// --------------------------------------------------
// Example 3: method override
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

securityLogger.log("login_failed");
// Expected output: "[SECURITY] login_failed"

// --------------------------------------------------
// Example 4: inheritance can be okay for shared client behavior
// --------------------------------------------------

class ProductApiClient extends BaseApiClient {
  public getProductsUrl(): string {
    return this.buildUrl("/products");
  }

  public getProductUrl(productId: string): string {
    return this.buildUrl(`/products/${productId}`);
  }
}

const productApiClient = new ProductApiClient("https://api.example.com");

console.log(productApiClient.getProductUrl("p1"));
// Expected output: "https://api.example.com/products/p1"

// --------------------------------------------------
// Example 5: composition with an audit logger
// --------------------------------------------------

type AuditLogger = {
  log(userId: string, action: string): void;
};

class ConsoleAuditLogger implements AuditLogger {
  public log(userId: string, action: string): void {
    console.log(`[AUDIT] ${userId}: ${action}`);
  }
}

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

const auditLogger = new ConsoleAuditLogger();

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
// Expected output:
// "[AUDIT] u1: login_success"
// true

console.log(authService.login("disabled@example.com"));
// Expected output:
// false

// --------------------------------------------------
// Example 6: composition improves testability
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

const memoryLogger = new MemoryAuditLogger();

const testableAuthService = new AuthService(
  [
    {
      id: "u1",
      email: "ada@example.com",
      isActive: true,
    },
  ],
  memoryLogger
);

const loginResult = testableAuthService.login("ada@example.com");

console.log(loginResult);
// Expected output: true

console.log(memoryLogger.getLogs());
// Expected output:
// ["u1:login_success"]

// --------------------------------------------------
// Example 7: inheritance is not always the right relationship
// --------------------------------------------------

// Bad idea:
//
// class AuthServiceBad extends ConsoleAuditLogger {
//   public login(userId: string): void {
//     this.log(userId, "login_success");
//   }
// }
//
// This says:
// AuthServiceBad is a ConsoleAuditLogger.
//
// But that is not accurate.
// AuthService uses a logger; it is not a logger.

// --------------------------------------------------
// Example 8: Page object style inheritance
// --------------------------------------------------

class BasePage {
  constructor(protected readonly baseUrl: string) {}

  protected buildPageUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class LoginPage extends BasePage {
  public getLoginUrl(): string {
    return this.buildPageUrl("/login");
  }
}

const loginPage = new LoginPage("https://app.example.com");

console.log(loginPage.getLoginUrl());
// Expected output: "https://app.example.com/login"

// --------------------------------------------------
// Example 9: Page object style composition
// --------------------------------------------------

class Navigator {
  constructor(private readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class LoginPageWithComposition {
  constructor(private readonly navigator: Navigator) {}

  public getLoginUrl(): string {
    return this.navigator.buildUrl("/login");
  }
}

const navigator = new Navigator("https://app.example.com");

const loginPageWithComposition = new LoginPageWithComposition(navigator);

console.log(loginPageWithComposition.getLoginUrl());
// Expected output: "https://app.example.com/login"

// --------------------------------------------------
// Example 10: composition with API token provider
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