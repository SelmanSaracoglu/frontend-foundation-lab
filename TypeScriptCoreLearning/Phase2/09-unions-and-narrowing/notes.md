# 09 - Unions and Narrowing
JavaScript'te bir değer farklı şekillerde gelebilir. Örneğin bir search input'tan gelen değer:
```ts
const value = "keyboard";
```

Ama bazen bir ID number olabilir:
```ts
const value = 42;
```

TypeScript'te bunu şöyle ifade ederiz:
```ts
type SearchValue = string | number;
```

Bu şu anlama gelir:
>>> SearchValue ya string olabilir ya number olabilir.
`|` sembolü "veya" anlamına gelir.

## Basit union type

```ts
type Id = string | number;

const userId: Id = "user-1";
const productId: Id = 1001;
```
İkisi de geçerlidir çünkü `Id`, `string` veya `number` olabilir.

Ama şu geçerli değildir:
```ts
const invalidId: Id = true;
```
Çünkü `boolean`, `Id` union'ında yoktur.


## Literal union type
Union type sadece primitive type'larla değil, spesifik değerlerle de kullanılabilir.
```ts
type UserRole = "admin" | "user" | "support";
```

Bu şu anlama gelir:
>>> UserRole sadece "admin", "user" veya "support" olabilir.
```ts
const role1: UserRole = "admin";
const role2: UserRole = "support";
```

Ama şu hata verir:
```ts
const role3: UserRole = "owner";
```

Bu gerçek projelerde çok önemlidir. Çünkü birçok değer aslında sınırsız string olmamalıdır.

Kötü model:
```ts
type User = {
  id: string;
  role: string;
};
```

Bu durumda şunların hepsi geçerli olur:
```ts
const user = {
  id: "u1",
  role: "anything",
};
```

Daha iyi model:
```ts
type UserRole = "admin" | "user" | "support";

type User = {
  id: string;
  role: UserRole;
};
```
Artık role sadece izin verilen değerlerden biri olabilir.

## Union type ile gerçek domain model

Örneğin bir task status modelleyelim:

```ts
type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
```

Bu model, `status` alanını güvenli hale getirir.
```ts
const task: Task = {
  id: "task-1",
  title: "Write tests",
  status: "in_progress",
};
```

Ama şu geçersizdir:
```ts
const invalidTask: Task = {
  id: "task-2",
  title: "Deploy app",
  status: "almost_done",
};
```
TypeScript bu hatayı compile-time'da yakalar.

## Union kullanınca neden narrowing gerekir?
Şu function'a bakalım:

```ts
type Id = string | number;

function printId(id: Id): void {
  console.log(id.toUpperCase());
}
```

Bu hata verir. Neden?
Çünkü `id` bazen `string`, bazen `number` olabilir.
`toUpperCase()` sadece string üzerinde vardır. Number üzerinde yoktur.
TypeScript burada bizi korur.

Doğru yaklaşım:
```ts
function printId(id: Id): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}
```

Burada TypeScript `if` bloğunun içinde `id` değerinin string olduğunu anlar.
Buna **narrowing** denir.

## Narrowing nedir?
Narrowing, geniş bir type'ı daha spesifik bir type'a daraltmaktır.
```ts
id: string | number
```

Kontrolden sonra:
```ts
if (typeof id === "string") {
  // burada id artık string
}
```

Else tarafında:
```ts
else {
  // burada id artık number
}
```

TypeScript kod akışını analiz eder ve ilgili blok içinde type'ı daraltır.
Bu, güvenli kod yazmak için çok önemlidir.

## typeof ile narrowing: 
Primitive union'larda en yaygın narrowing yöntemi `typeof` kullanmaktır.

```ts
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  return value.toFixed(2);
}
```

Burada:
- string ise trim ve toLowerCase kullanabiliriz
- number ise toFixed kullanabiliriz

TypeScript her branch içinde doğru method'lara izin verir.

## Literal union ile condition kullanımı
Literal union'larda doğrudan değer karşılaştırması yapabiliriz.

```ts
type UserRole = "admin" | "user" | "support";

function getDashboardPath(role: UserRole): string {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "support") {
    return "/support";
  }

  return "/dashboard";
}
```
Burada TypeScript her condition içinde role değerini daha spesifik anlar.

## Boolean union değildir
Bazen şu karışır:
```ts
type IsActive = true | false;
```
Bu teknik olarak mümkündür ama pratikte genelde gerek yoktur. Çünkü zaten:
```ts
boolean
```
aynı anlama gelir.
Ama bazı özel durumlarda sadece `true` veya sadece `false` literal type olarak kullanılabilir. Şimdilik buna ihtiyacımız yok.

## null ile union
Gerçek projelerde bazı değerler henüz yok olabilir.

```ts
type CurrentUser = {
  id: string;
  email: string;
};

let currentUser: CurrentUser | null = null;
```

Bu model şu anlama gelir:
>>> currentUser ya bir User object'idir ya da null'dır.
Bu React, auth, session ve API state konularında çok yaygındır. Kullanırken narrowing gerekir:

```ts
function printCurrentUserEmail(user: CurrentUser | null): void {
  if (user === null) {
    console.log("No user logged in");
    return;
  }

  console.log(user.email);
}
```
Burada `if (user === null)` ile null durumu ayrılır.
Return sonrası TypeScript bilir ki function'ın kalan kısmında `user` artık `CurrentUser` tipindedir.

## undefined ile union: Optional property'ler aslında undefined ihtimali taşır.

```ts
type UserProfile = {
  id: string;
  displayName: string;
  avatarUrl?: string;
};
```

`avatarUrl?: string` şu anlama yakındır:
```ts
avatarUrl: string | undefined
```

Bu yüzden direkt kullanırken dikkat gerekir.
```ts
function printAvatar(profile: UserProfile): void {
  console.log(profile.avatarUrl.toUpperCase());
}
```
Bu hata verebilir çünkü `avatarUrl` undefined olabilir.

Doğru kullanım:
```ts
function printAvatar(profile: UserProfile): void {
  if (profile.avatarUrl === undefined) {
    console.log("No avatar");
    return;
  }

  console.log(profile.avatarUrl.toUpperCase());
}
```

## in operator ile narrowing
Object union'larında bazen hangi property'nin var olduğuna göre narrowing yaparız.

```ts
type EmailLogin = {
  email: string;
  password: string;
};

type SsoLogin = {
  provider: "google" | "github";
  token: string;
};

type LoginRequest = EmailLogin | SsoLogin;
```

Burada `LoginRequest` iki farklı object shape'ten biri olabilir.

```ts
function handleLogin(request: LoginRequest): void {
  if ("email" in request) {
    console.log(`Email login for ${request.email}`);
    return;
  }

  console.log(`SSO login with ${request.provider}`);
}
```

`"email" in request` kontrolünden sonra TypeScript `request` değerinin `EmailLogin` olduğunu anlar.

Else tarafında ise `SsoLogin` olduğunu anlar.

## Union object modellerde dikkat

Şu model bazen başlangıçta cazip görünür:

```ts
type ApiResult = {
  success: boolean;
  data?: string;
  error?: string;
};
```
Ama bu model zayıftır. Çünkü şu object teknik olarak mümkün olur:
```ts
const result: ApiResult = {
  success: true,
  error: "Something failed",
};
```

Başarılı sonuçta error olmamalıydı. Bu yüzden object union kullanmak daha güvenlidir:

```ts
type SuccessResult = {
  success: true;
  data: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

type ApiResult = SuccessResult | ErrorResult;
```

Artık success true ise data gerekir. Success false ise error gerekir.
Bu yaklaşımı bir sonraki milestone'da daha güçlü şekilde işleyeceğiz: discriminated unions.

---

## Union type fazla geniş olmamalı

Şu type teknik olarak yazılabilir:
```ts
type Value = string | number | boolean | null | undefined;
```
Ama çok geniş union'lar kodu zorlaştırır. Çünkü kullanmadan önce çok fazla narrowing gerekir.

Daha iyi yaklaşım:
- Domain'i doğru modelle
- Gereksiz type ihtimallerini ekleme
- Gerçekten mümkün olmayan state'leri type'a koyma

Örneğin:
```ts
type TaskStatus = "todo" | "in_progress" | "done";
```
bu iyidir.

Ama:
```ts
type TaskStatus = string | null | undefined;
```
genelde zayıf bir modeldir.
Çünkü hangi değerlerin geçerli olduğu belirsizdir.

## Union type validation yapar mı?
Compile-time'da evet, runtime'da hayır.
```ts
type Role = "admin" | "user";

const role: Role = "owner";
```

Bu TypeScript hatasıdır. Ama dış dünyadan gelen veri için TypeScript tek başına garanti vermez.
Örneğin API'den gelen JSON runtime'da şu olabilir:
```ts
{
  "role": "owner"
}
```
TypeScript bunu otomatik doğrulamaz.
Bu yüzden backend/API aşamasında runtime validation konusunu ayrıca işleyeceğiz.

## Gerçek proje bakışı

Union type'lar özellikle şuralarda çok kullanılır:

- kullanıcı rolleri
- task/order/payment status değerleri
- API success/error sonucu
- form state
- auth state
- loading/error/success UI state
- farklı login request türleri
- feature flag değerleri
- security event action değerleri

Örnek:
```ts
type SecurityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "PASSWORD_RESET_REQUESTED"
  | "PERMISSION_DENIED";

type SecurityLog = {
  id: string;
  actorUserId: string;
  action: SecurityAction;
  createdAt: string;
};
```
Bu model, security logging tarafında rastgele action yazılmasını engeller.

```ts
const log: SecurityLog = {
  id: "log-1",
  actorUserId: "user-1",
  action: "PERMISSION_DENIED",
  createdAt: "2026-01-01T10:00:00Z",
};
```

Ama şu hata verir:
```ts
const invalidLog: SecurityLog = {
  id: "log-2",
  actorUserId: "user-1",
  action: "USER_DID_RANDOM_THING",
  createdAt: "2026-01-01T10:00:00Z",
};
```
Bu, gerçek sistemlerde log kalitesini artırır.

## Mental model
Union type şudur:
>>> Bu değer birden fazla izin verilen type veya değerden biri olabilir.

Narrowing şudur:
>>> Kullanım öncesi TypeScript'e şu anda hangi ihtimalde olduğumuzu kanıtlamak.

Union genişletir:
```ts
string | number
```

Narrowing daraltır:
```ts
typeof value === "string"
```

Bu ikisi birlikte güvenli akış kontrolü sağlar.

## Kısa özet
Union type, bir değerin birden fazla type veya literal değerden biri olabileceğini ifade eder.

Narrowing, union içindeki ihtimallerden hangisinin o anda geçerli olduğunu TypeScript'e göstermektir.
En yaygın narrowing yöntemleri:
- `typeof`
- literal comparison
- `null` / `undefined` kontrolü
- `in` operator

Gerçek projelerde union type'lar özellikle role, status, API result, auth state, UI state ve security action modellemek için çok değerlidir.

