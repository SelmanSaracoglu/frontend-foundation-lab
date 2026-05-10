# 20-classes-and-oop-basics

## Amaç

Bu milestone’da TypeScript’te class ve temel OOP mantığını öğreneceğiz.

Odak konular:

- Class neden vardır?
- Constructor nedir?
- Property ve method nedir?
- Class’tan object/instance üretmek ne demektir?
- Function/object-based yaklaşım ile class-based yaklaşım farkı nedir?
- TypeScript’te class ne zaman mantıklıdır, ne zaman gereksizdir?

Bu milestone’da henüz access modifiers detayına girmeyeceğiz. `public`, `private`, `protected`, `readonly` konularını bir sonraki milestone’da işleyeceğiz.

Ana fikir:

> Class, veri ve o veriyle çalışan davranışları tek bir yapı içinde toplamak için kullanılan bir araçtır.

Ama TypeScript’te her şeyi class yapmak zorunda değiliz.

TypeScript hem object/function-oriented hem de class-based yazıma izin verir. Bu yüzden class’ı “tek doğru yol” değil, uygun yerde kullanılacak bir araç olarak düşünmeliyiz.

---

## Class neden gerekli olabilir?

Şimdiye kadar genelde type, object ve function ağırlıklı ilerledik.

Örneğin bir session modelimiz olsun:

```ts
type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

function isSessionExpired(session: Session): boolean {
  return session.expiresAt.getTime() < Date.now();
}
```

Bu gayet geçerli bir yaklaşımdır.

Veri ayrı, davranış ayrı duruyor.

Bazı durumlarda ise veri ve davranışı birlikte modellemek daha okunabilir olabilir:

```ts
class UserSession {
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
```

Burada `isExpired` davranışı doğrudan session nesnesinin içinde yer alır.

Yani şu şekilde kullanabiliriz:

```ts
const session = new UserSession("s1", "u1", new Date("2030-01-01"));

session.isExpired();
```

Bu yaklaşım özellikle şuralarda işe yarayabilir:

- API client class
- AuthService
- AuditLogger
- SDK client
- Page Object Model temeli
- domain service
- custom error class
- stateful helper object

---

## Class nedir?

Class, object üretmek için kullanılan bir şablondur.

```ts
class User {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}
```

Bu class’tan object üretmek için `new` kullanırız:

```ts
const user = new User("u1", "ada@example.com");
```

Buradaki `user`, `User` class’ının bir instance’ıdır.

```ts
console.log(user.email);
```

Expected output:

```txt
ada@example.com
```

---

## Constructor nedir?

Constructor, class’tan yeni bir instance oluşturulduğunda çalışan özel method’dur.

```ts
class User {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}
```

Şu satır çalıştığında:

```ts
const user = new User("u1", "ada@example.com");
```

constructor çağrılır.

Constructor genelde instance’ın başlangıç değerlerini hazırlar:

```ts
this.id = id;
this.email = email;
```

Buradaki `this`, oluşturulan instance’ı temsil eder.

---

## Property nedir?

Property, class instance’ının tuttuğu veridir.

```ts
class User {
  id: string;
  email: string;
}
```

Burada `id` ve `email` property’dir.

Property’ler object’in durumunu temsil eder.

Gerçek proje örnekleri:

```ts
class ApiClient {
  baseUrl: string;
}
```

```ts
class AuditLog {
  action: string;
  userId: string;
  createdAt: Date;
}
```

```ts
class AuthService {
  currentUserId: string | null;
}
```

---

## Method nedir?

Method, class içinde tanımlanan function’dır.

```ts
class User {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  getDisplayEmail(): string {
    return this.email.toLowerCase();
  }
}
```

Kullanım:

```ts
const user = new User("u1", "ADA@example.com");

console.log(user.getDisplayEmail());
```

Expected output:

```txt
ada@example.com
```

Method’lar genelde instance property’leri üzerinde işlem yapar.

---

## `this` nedir?

`this`, class instance’ının kendisini temsil eder.

```ts
class User {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  normalizeEmail(): string {
    return this.email.trim().toLowerCase();
  }
}
```

Burada:

```ts
this.email
```

oluşturulan instance’ın `email` property’sidir.

Örnek:

```ts
const user = new User(" ADA@example.com ");

console.log(user.normalizeEmail());
```

Expected output:

```txt
ada@example.com
```

---

## Function/object-based yaklaşım

TypeScript’te class kullanmadan da gayet temiz kod yazabiliriz.

Örnek:

```ts
type User = {
  id: string;
  email: string;
};

function normalizeUserEmail(user: User): string {
  return user.email.trim().toLowerCase();
}
```

Bu yaklaşım basit, okunabilir ve test edilmesi kolaydır.

Kullanım:

```ts
const user: User = {
  id: "u1",
  email: " ADA@example.com ",
};

console.log(normalizeUserEmail(user));
```

Expected output:

```txt
ada@example.com
```

Bu tarz kod modern TypeScript projelerinde çok yaygındır.

---

## Class-based yaklaşım

Aynı şeyi class ile şöyle yazabiliriz:

```ts
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
```

Kullanım:

```ts
const user = new UserAccount("u1", " ADA@example.com ");

console.log(user.getNormalizedEmail());
```

Expected output:

```txt
ada@example.com
```

Bu yaklaşım veri ve davranışı birlikte taşır.

---

## Hangisi daha iyi?

Tek bir cevap yok.

Function/object-based yaklaşım şu durumlarda iyidir:

- Veri basitse
- Davranış azsa
- Stateless helper yazıyorsan
- API request/response modelliyorsan
- Plain object’lerle çalışıyorsan
- React state veya JSON data ile çalışıyorsan

Class-based yaklaşım şu durumlarda iyidir:

- Instance state gerekiyorsa
- Aynı config ile birden fazla method çalışıyorsa
- Bir client/service nesnesi oluşturuyorsan
- Davranışlar aynı object etrafında gruplanıyorsa
- Testlerde Page Object Model gibi nesneler kuruyorsan
- SDK client veya API client yazıyorsan

Örnek olarak bir API client class mantıklıdır:

```ts
class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
```

Çünkü `baseUrl` bir kez verilir, sonra birçok method tarafından kullanılır.

---

## Gerçek proje örneği: AuthService

Class bazen service mantığı için kullanılabilir.

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
};

class AuthService {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  canLogin(email: string): boolean {
    const user = this.findUserByEmail(email);

    return user !== undefined;
  }
}
```

Kullanım:

```ts
const authService = new AuthService([
  {
    id: "u1",
    email: "ada@example.com",
    passwordHash: "hashed-password",
  },
]);

console.log(authService.canLogin("ada@example.com"));
```

Expected output:

```txt
true
```

Burada class mantıklı olabilir çünkü `users` dependency olarak constructor’dan veriliyor ve method’lar bu dependency ile çalışıyor.

---

## Gerçek proje örneği: AuditLogger

Bir logger class da mantıklı olabilir.

```ts
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
}
```

Kullanım:

```ts
const logger = new AuditLogger();

logger.log("u1", "login_success");

console.log(logger.getLogs().length);
```

Expected output:

```txt
1
```

Bu örnekte class internal state tutuyor: `logs`.

State tutan yapılarda class daha doğal olabilir.

---

## Class kullanırken dikkat

Class kullanmak kodu otomatik olarak daha iyi yapmaz.

Şu gereksiz olabilir:

```ts
class EmailFormatter {
  format(email: string): string {
    return email.trim().toLowerCase();
  }
}
```

Bunun yerine basit function yeterli olabilir:

```ts
function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

Eğer class sadece tek stateless method içeriyorsa ve instance state kullanmıyorsa class gereksiz olabilir.

Basit kural:

> State veya birlikte taşınması gereken davranış yoksa function genelde daha basittir.

---

## TypeScript class Java class gibi mi?

Benzerlikler var:

- `class` syntax’ı vardır
- `constructor` vardır
- property ve method vardır
- `new` ile instance üretilir
- inheritance mümkündür

Ama TypeScript/JavaScript dünyası daha esnektir.

TypeScript’te class tek merkez değildir.

Şunlarla da güçlü codebase yazılır:

- plain object
- function
- type alias
- interface
- union type
- generic helper
- module-based organization

Yani TypeScript’te OOP bir araçtır, zorunlu mimari değildir.

Bu track’te class’ı öğreneceğiz ama her şeyi class’a çevirmeyeceğiz.

---

## Bu milestone’da bilmen gerekenler

Bu milestone sonunda şunları anlayabilmelisin:

- Class object üretmek için bir şablondur.
- Constructor instance oluşturulurken çalışır.
- Property instance verisini tutar.
- Method instance davranışını temsil eder.
- `this`, mevcut instance’ı ifade eder.
- Class stateful yapılarda faydalı olabilir.
- Function/object-based yaklaşım TypeScript’te hâlâ çok normal ve güçlüdür.
- Class kullanmak için iyi sebep olmalıdır.
- Service, client, logger gibi yapılarda class mantıklı olabilir.
- Basit stateless helper’lar için function genelde daha uygundur.

---

## Kısa özet

Class, veri ve davranışı aynı yapı içinde modellemek için kullanılan bir araçtır.

TypeScript’te class özellikle service, client, logger, SDK, Page Object Model ve stateful helper yapılarında faydalı olabilir.

Ama TypeScript Java değildir. Her şeyi class yapmak zorunda değiliz.

İyi mühendislik kararı şudur:

> Basit veri ve saf helper için object/function kullan.  
> State, dependency veya birlikte davranış gerekiyorsa class düşün.