# Phase 5 Review

## Amaç

Bu review milestone’da Phase 5 boyunca öğrendiğimiz OOP ve class temellerini tekrar edeceğiz.

Phase 5 konuları:

- `20-classes-and-oop-basics`
- `21-access-modifiers-and-readonly`
- `22-inheritance-vs-composition`

Bu phase’in ana amacı şuydu:

> TypeScript’te class kullanımını gerçek proje bakışıyla öğrenmek, ama her şeyi class’a çevirmemek.

Bu phase sonunda class syntax’ını, constructor mantığını, property/method yapısını, access modifier’ları, `readonly` kullanımını ve inheritance/composition kararını temel seviyede biliyoruz.

---

## Phase 5 büyük resmi

TypeScript’te class kullanmak mümkündür ama zorunlu değildir.

Modern TypeScript projelerinde genelde şu yaklaşımlar birlikte kullanılır:

```txt
Plain object + function
Class-based service/client/logger
Composition-based dependency usage
Type alias / interface / union models
Module-based organization
```

Yani class, TypeScript içinde güçlü bir araçtır ama tek mimari yaklaşım değildir.

İyi mühendislik kararı şudur:

> Basit veri için plain object/type kullan.  
> Basit stateless işlem için function kullan.  
> State, dependency veya birlikte davranış gerekiyorsa class düşün.  
> Class’lar arasında ilişki kurarken önce composition düşün, inheritance’ı bilinçli kullan.

---

## Class review

Class, object üretmek için kullanılan bir şablondur.

```ts
class ApiClient {
  constructor(private readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
```

Kullanım:

```ts
const client = new ApiClient("https://api.example.com");

console.log(client.buildUrl("/users"));
```

Expected output:

```txt
https://api.example.com/users
```

Bu class mantıklıdır çünkü:

- `baseUrl` dependency/config olarak tutulur
- birçok method aynı baseUrl bilgisini kullanabilir
- instance oluşturmak anlamlıdır

---

## Constructor review

Constructor, class’tan yeni instance oluşturulurken çalışan özel method’dur.

```ts
class Session {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private expiresAt: Date
  ) {}
}
```

Şu satır constructor’ı çalıştırır:

```ts
const session = new Session("s1", "u1", new Date("2030-01-01"));
```

Constructor genellikle şunları yapmak için kullanılır:

- başlangıç state’i vermek
- dependency almak
- config almak
- identity alanlarını belirlemek

---

## Property ve method review

Property, instance’ın tuttuğu veridir.

```ts
private readonly baseUrl: string
```

Method, instance davranışıdır.

```ts
public buildUrl(path: string): string
```

Class’ın iyi tasarlanmış olması için property ve methodlar rastgele eklenmemelidir.

Bir class’ın net sorumluluğu olmalıdır.

Örnek:

```ts
class AuditLogger {
  private logs: AuditLog[] = [];

  public log(userId: string, action: string): void {
    this.logs.push({
      userId,
      action,
      createdAt: new Date(),
    });
  }
}
```

Bu class’ın sorumluluğu nettir:

```txt
Audit log kayıtlarını yönetmek.
```

---

## Access modifiers review

Access modifier’lar class sınırlarını belirler.

```txt
public:
Class dışından erişilebilir.

private:
Sadece aynı class içinde erişilebilir.

protected:
Aynı class ve subclass içinde erişilebilir.
```

Örnek:

```ts
class AuthService {
  constructor(private readonly users: User[]) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public canLogin(email: string): boolean {
    const normalizedEmail = this.normalizeEmail(email);

    return this.users.some((user) => user.email === normalizedEmail);
  }
}
```

Burada:

- `users` dışarıdan erişilemez
- `normalizeEmail` internal helper’dır
- `canLogin` public API’dir

İyi class tasarımı şunu yapar:

> Dışarıya gerekli davranışı açar, internal state’i korur.

---

## `readonly` review

`readonly`, property’nin constructor’dan sonra yeniden atanmasını engeller.

```ts
class Session {
  constructor(
    public readonly id: string,
    public readonly userId: string
  ) {}
}
```

Şu compile olmaz:

```ts
session.id = "s2";
```

`readonly` özellikle şu alanlarda mantıklıdır:

- `id`
- `userId`
- `requestId`
- `createdAt`
- `baseUrl`
- constructor dependency
- config değerleri

Dikkat:

`readonly` deep immutability sağlamaz.

```ts
class AuditLogger {
  public readonly logs: AuditLog[] = [];
}
```

Bu durumda array referansı değiştirilemez ama array içine `push` yapılabilir.

Daha güvenli yaklaşım:

```ts
class AuditLogger {
  private logs: AuditLog[] = [];

  public getLogs(): AuditLog[] {
    return [...this.logs];
  }
}
```

---

## Encapsulation review

Encapsulation, class’ın internal detaylarını dış dünyadan saklamasıdır.

Kötü örnek:

```ts
class AuditLogger {
  public logs: AuditLog[] = [];
}
```

Dışarıdan logs array’i bozulabilir.

Daha iyi:

```ts
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
}
```

Burada dış dünya log eklemeyi sadece `log` method’u üzerinden yapar.

Bu sayede class kendi kurallarını korur.

---

## Inheritance review

Inheritance, bir class’ın başka bir class’tan davranış devralmasıdır.

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

Inheritance şunu ifade eder:

```txt
UserApiClient is a BaseApiClient
```

Inheritance şu durumda mantıklı olabilir:

- gerçek bir “is-a” ilişkisi varsa
- base class stabilse
- ortak davranış gerçekten ortaksa
- subclass base class internal state’ine aşırı bağımlı değilse

---

## `super` ve `override` review

Subclass constructor içinde base class constructor’ını çağırmak için `super` kullanılır.

```ts
class AuthClient extends BaseApiClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
}
```

Subclass base class method’unu değiştirecekse `override` kullanmak iyi pratiktir.

```ts
class SecurityLogger extends BaseLogger {
  public override formatMessage(message: string): string {
    return `[SECURITY] ${message}`;
  }
}
```

`override`, yanlışlıkla typo yapıldığında TypeScript’in hata yakalamasına yardım eder.

---

## Composition review

Composition, bir class’ın başka bir class’tan miras almak yerine onu dependency olarak kullanmasıdır.

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

Bu ilişki şunu ifade eder:

```txt
AuthService uses an AuditLogger.
```

Bu daha doğrudur çünkü:

```txt
AuthService bir AuditLogger değildir.
AuthService bir AuditLogger kullanır.
```

Composition genelde daha esnektir çünkü dependency değiştirilebilir.

Örneğin production’da console logger, testte memory logger kullanılabilir.

---

## Inheritance vs composition karar kuralı

Basit karar kuralı:

```txt
is-a ilişkisi varsa:
inheritance düşünülebilir.

has-a / uses-a ilişkisi varsa:
composition genelde daha uygundur.
```

Örnekler:

```txt
UserApiClient is a BaseApiClient.
Bu inheritance olabilir.

AuthService uses AuditLogger.
Bu composition olmalı.

SecureApiClient uses TokenProvider.
Bu composition olmalı.

LoginPage uses Navigator.
Bu composition olabilir.

LoginPage is a BasePage.
Bu inheritance olabilir, ama dikkatli kullanılmalı.
```

Çoğu modern TypeScript projesinde composition daha güvenli başlangıçtır.

---

## TypeScript’te OOP’nin doğru yeri

TypeScript Java değildir.

Java’da class merkezli düşünmek daha yaygın olabilir. TypeScript’te ise şu araçların hepsi doğal olarak birlikte kullanılır:

```txt
type
interface
union
function
plain object
class
module
generic
utility type
composition
```

Bu yüzden iyi TypeScript kodu çoğu zaman karma yaklaşımdır.

Örnek:

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};

type AuditLogger = {
  log(userId: string, action: string): void;
};

class AuthService {
  constructor(
    private readonly users: User[],
    private readonly auditLogger: AuditLogger
  ) {}

  public login(email: string): boolean {
    // behavior
    return true;
  }
}
```

Burada:

- data model için `type`
- dependency contract için `type`
- behavior ve dependency yönetimi için `class`
- logger ilişkisi için composition kullanılıyor

Bu TypeScript için sağlıklı bir tasarımdır.

---

## Phase 5 sonunda bilmen gerekenler

Bu phase sonunda şunları yapabiliyor olmalısın:

- Basit class yazmak
- Constructor kullanmak
- Property ve method tanımlamak
- `this` kullanımını anlamak
- `public`, `private`, `protected` farkını bilmek
- `readonly` property kullanmak
- Constructor parameter property syntax’ını okumak ve yazmak
- Internal state’i public yapmanın riskini anlamak
- Encapsulation mantığını uygulamak
- `extends`, `super`, `override` kullanımını anlamak
- Inheritance’ın ne zaman mantıklı olduğunu bilmek
- Composition’ın neden genelde daha esnek olduğunu açıklamak
- Service/client/logger gibi gerçekçi class yapıları kurmak
- TypeScript’te class’ın bir araç olduğunu, zorunlu mimari olmadığını bilmek

---

## Kısa özet

Phase 5 bize TypeScript’te OOP’yi dengeli kullanmayı öğretti.

Bu phase’in özü:

```txt
Class yazmayı öğren.
Ama her şeyi class yapma.

State/dependency/davranış birlikteyse class mantıklı olabilir.
Basit data için type/object yeterlidir.
Basit işlem için function yeterlidir.

Internal state'i private tut.
Kimlik/config alanlarında readonly düşün.
Inheritance'ı sadece gerçek is-a ilişkilerinde kullan.
Uses-a ilişkilerinde composition seç.
```

Bu temel, ileride API client, AuthService, AuditLogger, SDK client, backend service ve Page Object Model gibi yapılara hazırlanmak için yeterli bir zemin oluşturur.
