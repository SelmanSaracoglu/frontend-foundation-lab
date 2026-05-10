# 23-satisfies-as-const-type-assertions

## Amaç

Bu milestone’da TypeScript’te runtime değerleri type sistemiyle daha güvenli bağlamayı öğreneceğiz.

Odak konular:

- `as const`
- type assertion: `as SomeType`
- `satisfies`
- runtime constant'lardan union type üretmek
- config/map object'lerini güvenli modellemek
- assertion kullanımının risklerini anlamak

Ana fikir:

> TypeScript’e bir değeri anlatırken mümkün olduğunca type güvenliğini koru.

Bu konu gerçek projelerde özellikle şu alanlarda çok kullanılır:

- role/status listeleri
- permission map’leri
- route config’leri
- API response mock’ları
- test fixture data
- auth event listeleri
- audit log action map’leri
- frontend/backend shared constants
- güvenli config object’leri

---

## Neden bu konu önemli?

Diyelim ki uygulamada course status değerleri var:

```ts
const COURSE_STATUSES = ["draft", "published", "archived"];
```

Bu liste runtime’da kullanılabilir.

Ama TypeScript tarafında ayrıca şöyle bir type da isteyebiliriz:

```ts
type CourseStatus = "draft" | "published" | "archived";
```

Bunu elle yazarsak iki kaynak oluşur:

```ts
const COURSE_STATUSES = ["draft", "published", "archived"];

type CourseStatus = "draft" | "published" | "archived";
```

Bu kötü değildir ama bakım riski vardır.

Eğer liste değişirse type da ayrıca güncellenmelidir.

Daha iyi yaklaşım:

```ts
const COURSE_STATUSES = ["draft", "published", "archived"] as const;

type CourseStatus = (typeof COURSE_STATUSES)[number];
```

Böylece runtime value ve compile-time type aynı kaynaktan gelir.

---

## `as const` nedir?

`as const`, TypeScript’e şu mesajı verir:

> Bu değeri mümkün olan en dar literal type olarak değerlendir ve readonly yap.

Örnek:

```ts
const status = "published";
```

Burada `status` zaten `"published"` literal type olabilir.

Ama array ve object içinde TypeScript genelde değerleri genişletir:

```ts
const course = {
  status: "published",
};
```

Burada `course.status` çoğu durumda `string` olarak değerlendirilir.

`as const` kullanırsak:

```ts
const course = {
  status: "published",
} as const;
```

Artık `course.status` type’ı `"published"` olur.

Ayrıca object readonly hale gelir.

```ts
course.status = "draft";
```

Bu compile olmaz.

---

## Array’den union type üretmek

En yaygın `as const` kullanımı sabit listeden union type üretmektir.

```ts
const USER_ROLES = ["admin", "user", "support"] as const;

type UserRole = (typeof USER_ROLES)[number];
```

`UserRole` artık şuna denk gelir:

```ts
type UserRole = "admin" | "user" | "support";
```

Bu pattern gerçek projelerde çok değerlidir.

Çünkü aynı liste:

- runtime validation için kullanılabilir
- dropdown/select option üretmek için kullanılabilir
- test data için kullanılabilir
- type üretmek için kullanılabilir

Tek kaynak, iki kullanım.

---

## Object value’larından union type üretmek

Array yerine object constant da kullanılabilir.

```ts
const USER_ROLE = {
  Admin: "admin",
  User: "user",
  Support: "support",
} as const;

type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
```

Adım adım:

```ts
typeof USER_ROLE
```

object’in type’ını alır.

```ts
keyof typeof USER_ROLE
```

object key’lerini union yapar:

```ts
"Admin" | "User" | "Support"
```

```ts
(typeof USER_ROLE)[keyof typeof USER_ROLE]
```

object value’larını union yapar:

```ts
"admin" | "user" | "support"
```

Bu pattern enum yerine literal object kullanmak istediğimizde faydalıdır.

---

## Type assertion nedir?

Type assertion, TypeScript’e şunu söylemektir:

> Bu değeri şu type olarak kabul et.

Syntax:

```ts
const value = something as SomeType;
```

Örnek:

```ts
type User = {
  id: string;
  email: string;
};

const user = JSON.parse('{"id":"u1","email":"ada@example.com"}') as User;
```

Bu compile olur.

Ama burada kritik nokta şudur:

> Type assertion runtime validation yapmaz.

Yani JSON gerçekten `User` shape’ine uyuyor mu kontrol edilmez.

---

## Type assertion riski

Şu kod compile olabilir:

```ts
type User = {
  id: string;
  email: string;
};

const user = JSON.parse('{"id":"u1"}') as User;

console.log(user.email.toUpperCase());
```

Ama runtime’da hata verebilir.

Çünkü `email` gerçekten yoktur.

Benzer risk:

```ts
type UserRole = "admin" | "user";

const role = "superadmin" as UserRole;
```

Bu compile olabilir ama domain açısından yanlıştır.

`as UserRole`, `"superadmin"` değerini gerçekten güvenli hale getirmez. Sadece TypeScript’i susturur.

Bu yüzden assertion dikkatli kullanılmalıdır.

---

## Ne zaman type assertion makul olabilir?

Type assertion tamamen yasak değildir.

Şu durumlarda kontrollü kullanılabilir:

- TypeScript’in bilemediği ama senin güvenli şekilde bildiğin durumlarda
- DOM API gibi bazı external API kullanımlarında
- testlerde kontrollü fixture oluştururken
- validation sonrası TypeScript’e sonucu anlatırken
- legacy code ile geçici entegrasyon yaparken

Ama dış dünyadan gelen veri için tek başına yeterli değildir.

Riskli yaklaşım:

```ts
const requestBody = JSON.parse(rawBody) as CreateUserRequest;
```

Daha güvenli zihinsel model:

```ts
const requestBody: unknown = JSON.parse(rawBody);

// Burada runtime validation gerekir.
// Validation başarılıysa CreateUserRequest olarak kullanılmalıdır.
```

Runtime validation konusunu backend/API validation track’inde daha detaylı işleyeceğiz. Bu milestone’da önemli olan assertion’ın güvenlik sağlamadığını bilmektir.

---

## `satisfies` nedir?

`satisfies`, bir değerin belirli bir type’a uygun olup olmadığını kontrol eder.

Ama değerin kendi inferred type bilgisini mümkün olduğunca korur.

Örnek:

```ts
type CourseStatus = "draft" | "published" | "archived";

const courseStatusLabels = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
} satisfies Record<CourseStatus, string>;
```

Bu şu anlama gelir:

> Bu object, bütün CourseStatus key’lerini karşılayan bir Record<CourseStatus, string> olmalıdır.

Eksik key varsa TypeScript hata verir:

```ts
const courseStatusLabels = {
  draft: "Draft",
  published: "Published",
} satisfies Record<CourseStatus, string>;
```

Bu compile olmaz çünkü `archived` eksik.

Fazladan yanlış key varsa da hata verir:

```ts
const courseStatusLabels = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
  deleted: "Deleted",
} satisfies Record<CourseStatus, string>;
```

`deleted` geçerli bir `CourseStatus` değildir.

---

## `satisfies` ile type annotation farkı

Şu iki kullanım benzer görünür:

```ts
const labels: Record<CourseStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};
```

```ts
const labels = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
} satisfies Record<CourseStatus, string>;
```

İkisi de object’in `Record<CourseStatus, string>` shape’ine uymasını ister.

Ama fark şudur:

- Type annotation değişkenin type’ını doğrudan verilen type’a sabitler.
- `satisfies` uygunluğu kontrol eder ama object’in kendi inferred type bilgisini daha iyi korur.

Bu özellikle config object’lerinde faydalıdır.

```ts
type PermissionConfig = {
  label: string;
  risk: "low" | "medium" | "high";
  auditRequired: boolean;
};

const permissionConfig = {
  "users:read": {
    label: "Read users",
    risk: "low",
    auditRequired: false,
  },
  "users:delete": {
    label: "Delete users",
    risk: "high",
    auditRequired: true,
  },
} satisfies Record<"users:read" | "users:delete", PermissionConfig>;
```

TypeScript hem shape’i kontrol eder hem de object yapısını korur.

---

## Gerçek proje örneği: Permission config

Security/RBAC tarafında permission config çok yaygın bir pattern’dir.

```ts
const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:delete",
] as const;

type Permission = (typeof PERMISSIONS)[number];

type PermissionConfig = {
  label: string;
  risk: "low" | "medium" | "high";
  auditRequired: boolean;
};

const permissionConfig = {
  "users:read": {
    label: "Read users",
    risk: "low",
    auditRequired: false,
  },
  "users:create": {
    label: "Create users",
    risk: "medium",
    auditRequired: true,
  },
  "users:delete": {
    label: "Delete users",
    risk: "high",
    auditRequired: true,
  },
} satisfies Record<Permission, PermissionConfig>;
```

Bu yapı şunları sağlar:

- bütün permission değerleri config içinde karşılanır
- yanlış permission key’i eklenemez
- her permission config doğru shape’e sahip olur
- risk seviyesi sadece izin verilen değerlerden biri olabilir
- audit gereksinimi unutulmaz

Bu, secure coding açısından iyi bir modelleme alışkanlığıdır.

---

## `as const` ve `satisfies` birlikte kullanımı

Bu iki özellik sık sık birlikte kullanılır.

```ts
const AUTH_EVENTS = [
  "login_success",
  "login_failed",
  "logout",
] as const;

type AuthEvent = (typeof AUTH_EVENTS)[number];

const authEventRisk = {
  login_success: "low",
  login_failed: "medium",
  logout: "low",
} satisfies Record<AuthEvent, "low" | "medium" | "high">;
```

Burada:

- `as const` event listesinden literal union üretir
- `satisfies` risk map’inin bütün event’leri karşıladığını kontrol eder

Bu pattern audit logging ve security event modelleme için çok uygundur.

---

## Test fixture için `satisfies`

Test fixture data yazarken bazen object’in belirli bir type’a uyduğunu kontrol etmek isteriz.

```ts
type TestUser = {
  id: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
};

const adminUser = {
  id: "u-test-1",
  email: "admin@example.com",
  role: "admin",
  isActive: true,
} satisfies TestUser;
```

Bu sayede fixture eksik veya yanlış olursa TypeScript yakalar.

```ts
const brokenUser = {
  id: "u-test-2",
  email: "broken@example.com",
  role: "superadmin",
  isActive: true,
} satisfies TestUser;
```

Bu compile olmaz çünkü `"superadmin"` geçerli role değildir.

---

## Pratik karar tablosu

```txt
Sabit liste/object değerlerinden type üretmek istiyorsan:
as const

Bir object belirli bir shape'e uyuyor mu kontrol etmek istiyorsan:
satisfies

TypeScript'in bilemediği ama senin bildiğin sınırlı bir durumda type belirtmek istiyorsan:
as SomeType

Dış dünyadan gelen veriyi güvenli hale getirmek istiyorsan:
runtime validation
```

---

## Dikkat edilmesi gerekenler

`as const` her şeyi readonly yapar. Bu genelde constant config için iyidir ama sonradan mutate etmek istediğin yapılarda uygun olmayabilir.

`as SomeType` kolay kaçış yoludur. Çok sık kullanılıyorsa genelde type modelinde, validation’da veya fonksiyon signature’larında eksik vardır.

`satisfies` runtime’da çalışmaz. Sadece compile-time kontrol sağlar.

Yani bu kod:

```ts
const config = {
  risk: "high",
} satisfies { risk: "low" | "medium" | "high" };
```

runtime validation değildir. Sadece TypeScript’in build/type-check aşamasında kontrol yapmasını sağlar.

External input hâlâ runtime validation ister.

---

## Kısa özet

- `as const`, literal type bilgisini korur ve object/array’i readonly yapar.
- Array’den union type üretmek için `(typeof ARRAY)[number]` kullanılır.
- Object value union için `(typeof OBJECT)[keyof typeof OBJECT]` kullanılır.
- Type assertion `as SomeType`, TypeScript’e değeri belirli bir type gibi kabul ettirir.
- Type assertion runtime validation yapmaz.
- Yanlış assertion type güvenliğini zayıflatır.
- `satisfies`, object’in belirli bir type’a uyduğunu kontrol eder.
- `satisfies`, config/map/fixture object’lerinde çok faydalıdır.
- Güvenli modelleme için `as const` + `satisfies` birlikte çok güçlüdür.