# 21-access-modifiers-and-readonly

## Amaç

Bu milestone’da TypeScript class’larında access modifier ve `readonly` kullanımını öğreneceğiz.

Odak konular:

- `public`
- `private`
- `protected`
- `readonly`
- constructor parameter properties
- class içinde encapsulation mantığı
- hangi property dışarı açılmalı, hangisi class içinde kalmalı?
- service/client/logger gibi gerçek proje örneklerinde güvenli class tasarımı

Ana fikir:

> Class sadece veri ve methodları bir araya getirmez; aynı zamanda hangi bilginin dışarı açılacağını da kontrol eder.

Bu konu gerçek projelerde özellikle şu alanlarda önemlidir:

- API client config
- AuthService internal state
- AuditLogger log listesi
- Session object
- SDK client
- test automation Page Object Model temeli
- domain service
- custom error class
- güvenli object state yönetimi

---

## Neden access modifier gerekir?

Önceki milestone’da şöyle bir class yazmıştık:

```ts
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
}
```

Bu çalışır.

Ama dışarıdan şunu yapmak mümkündür:

```ts
auditLogger.logs = [];
```

veya:

```ts
auditLogger.logs.push({
  userId: "attacker",
  action: "fake_log",
  createdAt: new Date(),
});
```

Bu iyi değildir.

Çünkü `logs` class’ın internal state’idir. Dışarıdan doğrudan değiştirilmemelidir.

Daha iyi yaklaşım:

```ts
class AuditLogger {
  private logs: AuditLog[];

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
}
```

Artık `logs` sadece class içinden erişilebilir.

Bu yaklaşıma encapsulation denir.

---

## Encapsulation nedir?

Encapsulation, bir class’ın internal detaylarını dış dünyadan saklamasıdır.

Dış dünya class’ı sadece public methodlar üzerinden kullanır.

Örnek:

```ts
auditLogger.log("u1", "login_success");
auditLogger.getLogs();
```

Ama dış dünya şunu yapamamalıdır:

```ts
auditLogger.logs = [];
```

Bu neden önemlidir?

Çünkü class bazı kuralları korumak isteyebilir.

Mesela `AuditLogger` log eklerken her zaman `createdAt` üretir.

```ts
this.logs.push({
  userId,
  action,
  createdAt: new Date(),
});
```

Ama dışarıdan `logs` array’ine doğrudan erişim varsa bu kural bypass edilebilir.

Encapsulation bize şunu sağlar:

- internal state korunur
- class invariant’ları bozulmaz
- yanlış kullanım azalır
- refactor daha güvenli olur
- public API daha net olur

---

## `public`

`public`, property veya method’un class dışından erişilebilir olduğunu belirtir.

TypeScript’te default access modifier zaten `public`tır.

Yani şu iki kod benzerdir:

```ts
class User {
  email: string;
}
```

```ts
class User {
  public email: string;
}
```

Genelde `public` yazmak zorunlu değildir.

Ama bazı ekipler okunabilirlik için açıkça yazmayı tercih edebilir.

Örnek:

```ts
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
```

Kullanım:

```ts
const profile = new UserProfile("u1", " ADA@example.com ");

console.log(profile.email);
console.log(profile.getNormalizedEmail());
```

Burada `email` ve `getNormalizedEmail` dışarıdan erişilebilir.

---

## `private`

`private`, property veya method’un sadece class içinde erişilebilir olduğunu belirtir.

```ts
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
```

Kullanım:

```ts
const client = new ApiClient("https://api.example.com");

client.buildUrl("/users");
```

Ama şu compile olmaz:

```ts
client.baseUrl;
```

Çünkü `baseUrl` private’dır.

Bu iyi bir tasarımdır çünkü dış kullanıcının `baseUrl` ile doğrudan oynamasını istemeyebiliriz.

---

## Private method

Sadece class içinde kullanılacak yardımcı methodlar da private olabilir.

```ts
class AuthService {
  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public canLogin(email: string): boolean {
    const normalizedEmail = this.normalizeEmail(email);

    return normalizedEmail.length > 0;
  }
}
```

Burada `normalizeEmail` dışarıdan çağrılmamalıdır.

Çünkü bu method class’ın internal implementation detail’ıdır.

Dışarıya açılan public API:

```ts
canLogin(email: string): boolean
```

olmalıdır.

---

## `protected`

`protected`, property veya method’un class içinde ve o class’tan türeyen child class’larda erişilebilir olduğunu belirtir.

```ts
class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}

class UserApiClient extends BaseApiClient {
  public getUsersUrl(): string {
    return `${this.baseUrl}/users`;
  }
}
```

Burada `UserApiClient`, `baseUrl` değerine erişebilir çünkü `baseUrl` protected’dır.

Ama class dışından erişilemez:

```ts
const client = new UserApiClient("https://api.example.com");

client.baseUrl;
```

Bu compile olmaz.

---

## `private` ve `protected` farkı

`private` sadece tanımlandığı class içinde erişilebilir.

`protected` tanımlandığı class içinde ve subclass içinde erişilebilir.

```txt
public:
Class dışından erişilebilir.

private:
Sadece aynı class içinde erişilebilir.

protected:
Aynı class + subclass içinde erişilebilir.
```

Başlangıç için pratik kural:

> Bir şeyi dışarı açmak istemiyorsan önce `private` düşün.  
> Sadece inheritance gerçekten gerekiyorsa `protected` düşün.

Çünkü `protected`, subclass’lara internal detaylara erişim verir. Bu bazen inheritance hiyerarşisini kırılgan hale getirebilir.

---

## `readonly`

`readonly`, property’nin constructor’dan sonra yeniden atanmasını engeller.

```ts
class Session {
  public readonly id: string;
  public readonly userId: string;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
```

Kullanım:

```ts
const session = new Session("s1", "u1");

console.log(session.id);
```

Ama şu compile olmaz:

```ts
session.id = "s2";
```

Bu özellikle identity alanları için faydalıdır:

- `id`
- `createdAt`
- `requestId`
- `baseUrl`
- config değerleri
- session owner bilgisi

---

## `readonly` neyi korur?

`readonly`, property’nin yeniden atanmasını engeller.

Ama object veya array içindeki nested değerleri her zaman deep şekilde korumaz.

Örnek:

```ts
type AuditLog = {
  userId: string;
  action: string;
};

class AuditLogger {
  public readonly logs: AuditLog[] = [];
}
```

Şu compile olmaz:

```ts
logger.logs = [];
```

Ama şu mümkün olabilir:

```ts
logger.logs.push({
  userId: "u1",
  action: "login_success",
});
```

Çünkü `readonly logs` array referansının değişmesini engeller, array’in içeriğinin değişmesini değil.

Bu yüzden mutable collection’larda `readonly` tek başına yeterli değildir.

Daha güvenli yaklaşım:

```ts
class AuditLogger {
  private logs: AuditLog[] = [];

  public getLogs(): AuditLog[] {
    return [...this.logs];
  }
}
```

Burada dışarıya array’in kopyası verilir.

---

## Constructor parameter properties

TypeScript class’larında constructor içinde property tanımlamayı kısaltan bir syntax vardır.

Normal yazım:

```ts
class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
```

Kısa yazım:

```ts
class ApiClient {
  constructor(private readonly baseUrl: string) {}
}
```

Bu syntax şunu yapar:

- `baseUrl` property’sini oluşturur
- `private` yapar
- `readonly` yapar
- constructor parametresinden değer atar

Bu gerçek projelerde çok yaygındır.

Ama başlangıçta normal uzun syntax’ı anlamak önemlidir. Kısa syntax sadece daha az tekrar içindir.

---

## Gerçek proje örneği: ApiClient

```ts
class ApiClient {
  constructor(private readonly baseUrl: string) {}

  public buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  public getUserUrl(userId: string): string {
    return this.buildUrl(`/users/${userId}`);
  }
}
```

Burada `baseUrl`:

- constructor’dan gelir
- dışarıdan değiştirilemez
- class içinde kullanılabilir
- API client’ın sabit config bilgisidir

Bu yüzden `private readonly` mantıklıdır.

---

## Gerçek proje örneği: AuthService

```ts
type AuthUser = {
  id: string;
  email: string;
  isActive: boolean;
};

class AuthService {
  constructor(private readonly users: AuthUser[]) {}

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
```

Burada:

- `users` dışarıdan değiştirilmemeli
- `normalizeEmail` internal helper
- `findUserByEmail` public olabilir
- `canLogin` public kullanım methodu

Bu tasarım dışarıya sadece gerekli davranışı açar.

---

## Gerçek proje örneği: AuditLogger

```ts
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
```

Burada önemli karar:

```ts
private logs
```

Çünkü dışarıdan log listesi doğrudan değiştirilmemeli.

Ayrıca:

```ts
return [...this.logs];
```

ile dışarıya array’in kopyası verilir.

Bu sayede dış kullanıcı `getLogs()` sonucunu değiştirse bile internal `logs` array’i bozulmaz.

---

## `#private` JavaScript private field farkı

TypeScript’te iki farklı private yaklaşımı görebilirsin:

```ts
private baseUrl: string;
```

ve JavaScript private field:

```ts
#baseUrl: string;
```

Bu milestone’da TypeScript `private` kullanacağız.

Temel fark:

- TypeScript `private`, compile-time seviyesinde kontrol sağlar.
- `#private`, JavaScript runtime seviyesinde gerçek private field’dır.

Başlangıç ve çoğu TypeScript codebase’i için `private` syntax’ını iyi öğrenmek yeterlidir.

`#private` daha sonra ihtiyaç olursa öğrenilebilir.

---

## Access modifier kullanırken pratik kurallar

Başlangıç için şu kurallar iyi çalışır:

```txt
Dışarıdan kullanılması gereken method:
public

Sadece class içinde kullanılan helper:
private

Dışarıdan değiştirilmemesi gereken config/identity:
private readonly veya public readonly

Subclass kullanımı gerçekten gerekiyorsa:
protected

Emin değilsen:
public yapmak yerine private başla, ihtiyaç oldukça dışarı aç.
```

---

## Public API düşüncesi

Bir class’ın public property ve methodları onun public API’sidir.

Örneğin:

```ts
class AuthService {
  public canLogin(email: string): boolean {
    return true;
  }
}
```

Dış dünya bu method’a bağımlı hale gelir.

Bu yüzden public API dikkatli tasarlanmalıdır.

Şunları public yapmak genelde iyidir:

- anlamlı davranışlar
- dış kullanıcının gerçekten çağırması gereken methodlar
- güvenli read-only bilgiler

Şunları public yapmak genelde risklidir:

- internal arrays
- internal maps
- temporary state
- validation helper’ları
- private config
- implementation detail methodları

---

## OOP ve güvenli state yönetimi

Access modifier’lar OOP’nin önemli bir parçasıdır ama amaç sadece “saklamak” değildir.

Amaç class’ın doğru kullanılmasını kolaylaştırmak, yanlış kullanılmasını zorlaştırmaktır.

Kötü örnek:

```ts
class SessionManager {
  public sessions: Session[] = [];
}
```

Dışarıdan herkes session ekleyebilir, silebilir, bozabilir.

Daha iyi:

```ts
class SessionManager {
  private sessions: Session[] = [];

  public addSession(session: Session): void {
    this.sessions.push(session);
  }

  public getSessionCount(): number {
    return this.sessions.length;
  }
}
```

Burada dış dünya session yönetimini class’ın sunduğu methodlar üzerinden yapar.

Bu daha kontrollü ve maintainable’dır.

---

## Bu milestone’da bilmen gerekenler

Bu milestone sonunda şunları anlayabilmelisin:

- `public`, class dışından erişilebilir demektir.
- TypeScript’te default access modifier `public`tır.
- `private`, sadece class içinde erişilebilir demektir.
- `protected`, class ve subclass içinde erişilebilir demektir.
- `readonly`, property’nin yeniden atanmasını engeller.
- `readonly` deep immutability sağlamaz.
- `private readonly`, config ve dependency property’leri için çok yaygındır.
- Constructor parameter property syntax’ı tekrar azaltır.
- Class’ın public API’sini dikkatli tasarlamak gerekir.
- Internal state’i public yapmak genelde risklidir.
- Encapsulation, yanlış kullanımı azaltır ve refactor güvenliğini artırır.

---

## Kısa özet

Access modifier’lar class’ın sınırlarını belirler.

- `public`: dışarıya açık
- `private`: sadece class içinde
- `protected`: class ve subclass içinde
- `readonly`: yeniden atanamaz

Gerçek projelerde amaç her şeyi saklamak değil, doğru public API tasarlamaktır.

İyi class tasarımı şunu yapar:

> Dışarıya gerekli davranışı açar, internal state’i korur.