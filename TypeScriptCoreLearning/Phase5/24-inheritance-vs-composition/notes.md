# 22-inheritance-vs-composition

## Amaç

Bu milestone’da TypeScript’te inheritance ve composition kararını öğreneceğiz.

Odak konular:

- `extends`
- base class
- subclass
- method override
- `super`
- inheritance ne zaman mantıklıdır?
- inheritance neden bazen kırılgan olabilir?
- composition nedir?
- composition neden çoğu modern TypeScript projesinde daha esnek olabilir?
- service, client, logger ve Page Object Model temeli için doğru modelleme sezgisi

Ana fikir:

> Inheritance “is-a” ilişkisi için kullanılabilir.  
> Composition ise “has-a / uses-a” ilişkisi için daha uygundur.

TypeScript’te class kullanmayı bilmek önemlidir, ama her problemi class hierarchy ile çözmek iyi mühendislik değildir.

---

## Inheritance nedir?

Inheritance, bir class’ın başka bir class’tan property ve method devralmasıdır.

```ts
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
}
```

Burada:

```ts
class UserApiClient extends BaseApiClient
```

şunu ifade eder:

> UserApiClient, BaseApiClient özelliklerini devralır.

Kullanım:

```ts
const client = new UserApiClient("https://api.example.com");

console.log(client.getUsersUrl());
```

Expected output:

```txt
https://api.example.com/users
```

---

## `super` nedir?

Subclass constructor içinde base class constructor’ını çağırmak için `super` kullanılır.

```ts
class BaseApiClient {
  constructor(protected readonly baseUrl: string) {}
}

class UserApiClient extends BaseApiClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
}
```

Eğer subclass constructor yazıyorsa ve base class constructor parametre istiyorsa, `super(...)` çağrısı gerekir.

`super`, base class’ın constructor’ını çalıştırır.

---

## Method override nedir?

Subclass, base class’taki bir method’u kendi ihtiyacına göre yeniden yazabilir.

```ts
class BaseLogger {
  public formatMessage(message: string): string {
    return message;
  }
}

class SecurityLogger extends BaseLogger {
  public override formatMessage(message: string): string {
    return `[SECURITY] ${message}`;
  }
}
```

Burada `SecurityLogger`, `formatMessage` method’unu override eder.

TypeScript’te `override` keyword’ü kullanmak iyi bir pratiktir.

Çünkü yanlışlıkla base class’ta olmayan bir method’u override etmeye çalışırsan TypeScript hata verir.

```ts
class SecurityLogger extends BaseLogger {
  public override formatMesage(message: string): string {
    return `[SECURITY] ${message}`;
  }
}
```

Burada `formatMesage` typo içeriyor. `override` kullanıldığı için TypeScript bunu yakalar.

---

## Inheritance ne zaman mantıklıdır?

Inheritance şu durumda mantıklı olabilir:

> Subclass gerçekten base class’ın özel bir türüyse.

Yani ilişki “is-a” olmalıdır.

Örnek:

```txt
SecurityAuditLogger is a BaseLogger
UserApiClient is a BaseApiClient
AdminPage is a BasePage
```

Ama bu ilişki gerçekten anlamlı olmalıdır.

İyi inheritance örneği:

```ts
class BaseApiClient {
  constructor(protected readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}

class UserApiClient extends BaseApiClient {
  public getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}
```

Burada `UserApiClient`, gerçekten API client’ın özel bir türü gibi davranır.

---

## Inheritance neden riskli olabilir?

Inheritance güçlüdür ama fazla kullanıldığında kırılgan yapılar oluşturabilir.

Özellikle şu problemler çıkar:

- subclass base class’ın internal detaylarına fazla bağımlı olur
- base class değişince birçok subclass bozulabilir
- class hierarchy büyüdükçe anlamak zorlaşır
- yanlış abstraction erken yapılabilir
- testlerde fazla setup gerekebilir
- subclass davranışı base class davranışıyla sıkı bağlı hale gelir

Örnek riskli yapı:

```ts
class BaseService {
  protected currentUserId: string | null = null;

  protected setCurrentUser(userId: string): void {
    this.currentUserId = userId;
  }
}

class AuthService extends BaseService {
  public login(userId: string): void {
    this.setCurrentUser(userId);
  }
}

class AuditService extends BaseService {
  public log(action: string): void {
    console.log(this.currentUserId, action);
  }
}
```

Burada `AuthService` ve `AuditService` aynı base state’e bağlı gibi görünür ama aslında farklı sorumluluklara sahiptir.

Bu tarz inheritance, zamanla “her şey BaseService’e eklensin” problemine dönüşebilir.

---

## Composition nedir?

Composition, bir class’ın başka bir class’tan miras almak yerine onu dependency olarak kullanmasıdır.

Yani:

```txt
AuthService extends AuditLogger
```

yerine:

```txt
AuthService has an AuditLogger
```

veya:

```txt
AuthService uses an AuditLogger
```

Örnek:

```ts
class AuditLogger {
  public log(userId: string, action: string): void {
    console.log(`${userId}: ${action}`);
  }
}

class AuthService {
  constructor(private readonly auditLogger: AuditLogger) {}

  public login(userId: string): void {
    this.auditLogger.log(userId, "login_success");
  }
}
```

Burada `AuthService`, `AuditLogger`’dan inherit etmiyor.

Onu kullanıyor.

Bu daha doğru bir modeldir çünkü:

```txt
AuthService bir AuditLogger değildir.
AuthService bir AuditLogger kullanır.
```

---

## Composition neden daha esnektir?

Composition genelde daha esnektir çünkü dependency değiştirilebilir.

Örneğin:

```ts
class ConsoleAuditLogger {
  public log(userId: string, action: string): void {
    console.log(`[AUDIT] ${userId}: ${action}`);
  }
}
```

İleride başka bir logger kullanmak istersek:

```ts
class MemoryAuditLogger {
  private logs: string[] = [];

  public log(userId: string, action: string): void {
    this.logs.push(`${userId}: ${action}`);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}
```

`AuthService` sadece `log` method’una ihtiyaç duyuyorsa interface/type ile daha esnek hale getirilebilir:

```ts
type AuditLogger = {
  log(userId: string, action: string): void;
};

class AuthService {
  constructor(private readonly auditLogger: AuditLogger) {}

  public login(userId: string): void {
    this.auditLogger.log(userId, "login_success");
  }
}
```

Artık `AuthService`, concrete class’a değil davranış contract’ına bağımlıdır.

Bu test edilebilirlik ve maintainability açısından daha iyidir.

---

## Inheritance vs composition farkı

Inheritance:

```ts
class UserApiClient extends BaseApiClient {}
```

Şunu söyler:

```txt
UserApiClient is a BaseApiClient
```

Composition:

```ts
class AuthService {
  constructor(private readonly auditLogger: AuditLogger) {}
}
```

Şunu söyler:

```txt
AuthService has/uses an AuditLogger
```

Pratik ayrım:

```txt
is-a ilişkisi varsa inheritance düşünülebilir.
has-a / uses-a ilişkisi varsa composition daha uygundur.
```

---

## Composition ve dependency injection

Composition genelde constructor üzerinden dependency alma ile birlikte kullanılır.

```ts
class AuthService {
  constructor(private readonly auditLogger: AuditLogger) {}
}
```

Bu yaklaşıma basit anlamda dependency injection denebilir.

Yani `AuthService`, kendi içinde logger yaratmak yerine dışarıdan alır.

Daha az esnek yaklaşım:

```ts
class AuthService {
  private auditLogger = new ConsoleAuditLogger();
}
```

Bu çalışır ama testlerde değiştirmesi zordur.

Daha esnek yaklaşım:

```ts
class AuthService {
  constructor(private readonly auditLogger: AuditLogger) {}
}
```

Böylece testte fake logger verebiliriz.

```ts
const fakeLogger: AuditLogger = {
  log(userId, action) {
    console.log(`fake: ${userId} ${action}`);
  },
};

const authService = new AuthService(fakeLogger);
```

Bu yapı ileride testing ve automation tarafında çok işimize yarayacak.

---

## Gerçek proje örneği: AuthService + AuditLogger

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};

type AuditLogger = {
  log(userId: string, action: string): void;
};

class ConsoleAuditLogger implements AuditLogger {
  public log(userId: string, action: string): void {
    console.log(`[AUDIT] ${userId}: ${action}`);
  }
}

class AuthService {
  constructor(
    private readonly users: User[],
    private readonly auditLogger: AuditLogger
  ) {}

  public login(email: string): boolean {
    const user = this.users.find((candidate) => candidate.email === email);

    if (user === undefined || !user.isActive) {
      return false;
    }

    this.auditLogger.log(user.id, "login_success");

    return true;
  }
}
```

Burada `AuthService`:

- users dependency’sini kullanır
- audit logger dependency’sini kullanır
- audit davranışını inherit etmez
- sadece ihtiyacı olan contract’a bağımlıdır

Bu composition’dır.

---

## `implements` kısa not

Bir class’ın belirli bir contract’a uyduğunu belirtmek için `implements` kullanılabilir.

```ts
type AuditLogger = {
  log(userId: string, action: string): void;
};

class ConsoleAuditLogger implements AuditLogger {
  public log(userId: string, action: string): void {
    console.log(userId, action);
  }
}
```

Burada `ConsoleAuditLogger`, `AuditLogger` shape’ine uymak zorundadır.

Bu milestone’da `implements` sadece composition örneklerini daha net göstermek için kullanılıyor.

Detaylı interface/OOP contract tasarımına girmiyoruz.

---

## Page Object Model için temel sezgi

İleride UI test automation tarafında Page Object Model görebiliriz.

Inheritance ile şöyle yapılabilir:

```ts
class BasePage {
  protected visit(path: string): void {
    console.log(`Visit ${path}`);
  }
}

class LoginPage extends BasePage {
  public open(): void {
    this.visit("/login");
  }
}
```

Bu makul olabilir çünkü `LoginPage is a BasePage` gibi düşünülebilir.

Ama her şeyi inheritance’a bağlamak risklidir.

Composition alternatifi:

```ts
class Navigator {
  public visit(path: string): void {
    console.log(`Visit ${path}`);
  }
}

class LoginPage {
  constructor(private readonly navigator: Navigator) {}

  public open(): void {
    this.navigator.visit("/login");
  }
}
```

Burada `LoginPage`, navigation davranışını inherit etmez; bir `Navigator` kullanır.

Bu yapı genelde daha test edilebilir ve değiştirilebilir olur.

---

## Inheritance kullanımında pratik kurallar

Inheritance kullanacaksan şu soruları sor:

```txt
Subclass gerçekten base class'ın özel bir türü mü?
Base class değişirse subclass'ların bozulma riski düşük mü?
Base class sadece ortak davranışı mı içeriyor?
Subclass base class internal state'ine fazla bağımlı mı?
Aynı şeyi composition ile daha basit yapabilir miyim?
```

Eğer cevaplar net değilse composition genelde daha güvenli başlangıçtır.

---

## Composition kullanımında pratik kurallar

Composition şu durumlarda güçlüdür:

```txt
Bir class başka bir davranışı kullanıyorsa
Dependency testte değiştirilecekse
Farklı implementasyonlar desteklenecekse
Sorumlulukları ayrı tutmak istiyorsan
Base class'ın şişmesini engellemek istiyorsan
```

Örnek:

```txt
AuthService uses AuditLogger
ApiClient uses TokenProvider
UserService uses UserRepository
PageObject uses Navigator
```

Bunlar genelde composition için daha uygundur.

---

## TypeScript için doğru OOP konumlandırması

TypeScript’te class önemlidir ama Java’daki gibi her şey class olmak zorunda değildir.

Modern TypeScript projelerinde genelde şu üç yaklaşım birlikte görülür:

```txt
Plain object + function
Class-based service/client
Composition-based dependency usage
```

Örnek:

- API response modelleri: type alias
- small helper: function
- API client: class
- AuthService: class + composition
- permission map: object + Record
- test page object: class
- logger dependency: interface/type contract

Yani iyi TypeScript mühendisi sadece class yazmayı değil, class’ın ne zaman gereksiz olduğunu da bilir.

---

## Kısa özet

- Inheritance, bir class’ın başka bir class’tan davranış devralmasıdır.
- `extends` ile kullanılır.
- `super`, base class constructor’ını çağırır.
- `override`, base class method’unu bilinçli şekilde yeniden yazmayı gösterir.
- Inheritance “is-a” ilişkisi için uygundur.
- Composition “has-a / uses-a” ilişkisi için uygundur.
- Composition genelde daha esnek, test edilebilir ve maintainable’dır.
- Gereksiz inheritance base class’ları şişirir ve subclass’ları kırılgan hale getirir.
- TypeScript’te OOP bir araçtır; her şeyin merkezi değildir.