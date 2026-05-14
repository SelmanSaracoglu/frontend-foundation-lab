# 25 - Type Modeling for Real Apps

## Amaç

Bu milestone’da TypeScript Core boyunca öğrendiğimiz konuları gerçek projeye daha yakın bir type modelleme pratiğinde birleştireceğiz.

Odak konular:

- domain model tasarlamak
- request/response type’ları üretmek
- public/internal model ayrımı yapmak
- role ve permission modellemek
- API result pattern kullanmak
- audit log modellemek
- runtime constant'lardan type üretmek
- `Pick`, `Omit`, `Partial`, `Record`, `Readonly`
- `as const`, `satisfies`
- strict TypeScript düşüncesiyle `undefined` ihtimalini doğru modellemek

Ana fikir:

> TypeScript’te iyi modelleme, sadece property type yazmak değil; domain kurallarını, veri sınırlarını ve güvenli kullanım şeklini type sistemine mümkün olduğunca doğru yansıtmaktır.

---

## Type modeling nedir?

Type modeling, uygulamadaki gerçek kavramları TypeScript type’larıyla ifade etmektir.

Örneğin bir auth sisteminde şu kavramlar olabilir:

```txt
User
Session
Role
Permission
ApiResult
AuditLog
LoginRequest
PublicUser
```

Bunların hepsi sadece “object shape” değildir. Her biri uygulamanın bir kuralını temsil eder.

Örnek:

```ts
type User = {
  id: string;
  email: string;
  role: Role;
  passwordHash: string;
  isActive: boolean;
  createdAt: string;
};
```

Bu internal model olabilir.

Ama public response içinde `passwordHash` olmamalıdır.

```ts
type PublicUser = Pick<User, "id" | "email" | "role" | "isActive">;
```

Bu küçük ayrım gerçek projede çok önemlidir.

---

## Internal model ve public model ayrımı

Internal model genelde sistemin içeride ihtiyaç duyduğu tüm alanları içerir.

```ts
type User = {
  id: string;
  email: string;
  role: Role;
  passwordHash: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

Ama client’a döneceğimiz model daha sınırlı olmalıdır:

```ts
type PublicUser = Pick<User, "id" | "email" | "role" | "isActive">;
```

Bu ayrım özellikle güvenlik için önemlidir.

Yanlış yaklaşım:

```ts
type UserResponse = User;
```

Bu durumda response içinde `passwordHash` sızabilir.

Daha doğru yaklaşım:

```ts
type UserResponse = PublicUser;
```

Genel kural:

> Internal domain model ile dışarı dönen response modelini aynı kabul etme.

---

## Request model tasarlamak

Create/update request type’ları domain modelden türetilebilir ama dikkatli olunmalıdır.

Örnek:

```ts
type CreateUserRequest = Pick<User, "email"> & {
  password: string;
};
```

Burada client:

- `email`
- `password`

gönderir.

Ama şunları göndermez:

- `id`
- `passwordHash`
- `role`
- `createdAt`
- `updatedAt`

Özellikle `role` dikkat edilmesi gereken bir alandır. Normal kullanıcı kayıt olurken kendi role değerini belirlememelidir.

Riskli yaklaşım:

```ts
type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">;
```

Bu type içinde `role` ve `passwordHash` gibi alanlar kalabilir. Bu güvenli bir create request modeli değildir.

Daha güvenli yaklaşım:

```ts
type CreateUserRequest = Pick<User, "email"> & {
  password: string;
};
```

Security-sensitive request modellerinde genelde `Pick` daha güvenlidir çünkü sadece izin verilen alanları açıkça seçersin.

---

## Update model tasarlamak

Update request’lerde `Partial` sık kullanılır.

```ts
type UpdateUserRequest = Partial<Pick<User, "email" | "isActive">>;
```

Bu şu anlama gelir:

```txt
email güncellenebilir.
isActive güncellenebilir.
İkisi de zorunlu değildir.
```

Ama burada da dikkat gerekir.

Normal kullanıcı kendi `isActive` değerini değiştirememelidir. Bu yüzden farklı use-case’ler için farklı request type gerekebilir:

```ts
type UpdateOwnProfileRequest = Partial<Pick<User, "email">>;

type AdminUpdateUserRequest = Partial<Pick<User, "email" | "isActive" | "role">>;
```

Bu daha doğru modellemedir çünkü yetki farkını type seviyesinde görünür yapar.

---

## Role modelleme

Role değerlerini sabit listeden üretmek iyi bir pratiktir.

```ts
const ROLES = ["admin", "user", "support"] as const;

type Role = (typeof ROLES)[number];
```

Bunun avantajı:

- runtime’da role listesi vardır
- compile-time’da Role type vardır
- ikisi aynı kaynaktan gelir

Role label map’i de güvenli yapılabilir:

```ts
const roleLabels = {
  admin: "Administrator",
  user: "User",
  support: "Support",
} satisfies Record<Role, string>;
```

Eğer yeni role eklenirse TypeScript label map’in de güncellenmesini ister.

---

## Permission modelleme

Permission sistemleri genelde string literal değerlerle modellenir.

```ts
const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:update",
  "users:delete",
] as const;

type Permission = (typeof PERMISSIONS)[number];
```

Permission config için `satisfies` çok uygundur:

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
  "users:create": {
    label: "Create users",
    risk: "medium",
    auditRequired: true,
  },
  "users:update": {
    label: "Update users",
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

Bu model şunu garanti eder:

- her permission için config vardır
- risk sadece izin verilen değerlerden biridir
- auditRequired unutulmaz
- yanlış permission key’i eklenemez

---

## Role-permission mapping

RBAC için role -> permission mapping kurulabilir.

```ts
const rolePermissions = {
  admin: ["users:read", "users:create", "users:update", "users:delete"],
  support: ["users:read", "users:update"],
  user: ["users:read"],
} satisfies Record<Role, Permission[]>;
```

Bu güzel bir başlangıçtır.

Ama daha sıkı bir readonly model için şöyle de yazılabilir:

```ts
const rolePermissions = {
  admin: ["users:read", "users:create", "users:update", "users:delete"],
  support: ["users:read", "users:update"],
  user: ["users:read"],
} as const satisfies Record<Role, readonly Permission[]>;
```

Burada:

- `as const` literal değerleri ve readonly array yapısını korur
- `satisfies` role ve permission uygunluğunu kontrol eder

Bu pattern gerçek RBAC modelleme için çok faydalıdır.

---

## API Result pattern

Gerçek projede API veya service function’ları her zaman başarılı olmayabilir.

Bu yüzden discriminated union kullanmak iyi bir modeldir.

```ts
type ApiResult<TData, TError = ApiError> =
  | {
      success: true;
      data: TData;
      requestId: string;
    }
  | {
      success: false;
      error: TError;
      requestId: string;
    };
```

Kullanım:

```ts
const result = getUserById("u1");

if (result.success) {
  console.log(result.data.email);
} else {
  console.log(result.error.message);
}
```

Burada TypeScript `success` alanına göre narrowing yapar.

Bu pattern Phase 2, Phase 3 ve Phase 4 konularını birlikte kullanır.

---

## Error modelleme

Basit error string yerine structured error kullanmak daha iyi olabilir.

```ts
type ApiError = {
  code: "NOT_FOUND" | "VALIDATION_ERROR" | "FORBIDDEN";
  message: string;
};
```

Bu sayede error handling daha kontrollü olur.

```ts
if (result.error.code === "FORBIDDEN") {
  console.log("User does not have permission");
}
```

String mesajlar kullanıcıya veya loglara gidebilir ama karar mekanizmaları için `code` daha güvenilirdir.

---

## Audit log modelleme

Audit log güvenlik ve izlenebilirlik için önemlidir.

```ts
type AuditAction =
  | "login_success"
  | "login_failed"
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete";

type AuditLog = {
  id: string;
  actorUserId: string;
  action: AuditAction;
  targetUserId?: string;
  createdAt: string;
  requestId: string;
};
```

Burada `targetUserId?` optional’dır çünkü her audit event bir target user içermeyebilir.

Örneğin:

```txt
login_success:
actor var, target yok.

users:delete:
actor var, target var.
```

Bu tarz modelleme domain davranışını daha doğru yansıtır.

---

## Type guard ile permission check

Permission check için küçük helper’lar yazılabilir.

```ts
function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}
```

Bu fonksiyon domain kuralını merkezi hale getirir.

Kullanım:

```ts
if (!hasPermission(currentUser.role, "users:delete")) {
  return {
    success: false,
    error: {
      code: "FORBIDDEN",
      message: "Missing permission",
    },
    requestId,
  };
}
```

Böylece permission check her yerde elle yazılmaz.

---

## Strict TypeScript düşüncesi

Strict TypeScript ile şu ihtimalleri açıkça ele almak gerekir:

```ts
const user = usersById[userId];
```

Bu user gerçekten var mı?

`noUncheckedIndexedAccess` açıkken bu değer:

```ts
User | undefined
```

gibi düşünülmelidir.

Daha güvenli:

```ts
const user = usersById[userId];

if (user === undefined) {
  return {
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "User not found",
    },
    requestId,
  };
}
```

Bu, TypeScript’in seni daha iyi runtime error handling yazmaya itmesidir.

---

## Class kullanmalı mıyız?

Bu milestone type modeling odaklıdır. Her şeyi class yapmak gerekmez.

Şu modeller type olarak kalabilir:

```ts
type User
type Session
type Permission
type ApiResult
type AuditLog
```

Ama davranış ve dependency gerekiyorsa class mantıklı olabilir:

```ts
class UserService {
  constructor(
    private readonly usersById: Record<string, User>,
    private readonly auditLogger: AuditLogger
  ) {}
}
```

Yani:

- data shape için type
- domain behavior + dependency için class
- küçük stateless işlem için function

Bu TypeScript için sağlıklı bir dengedir.

---

## Bu milestone’da beklenen mühendislik düşüncesi

Artık type yazarken şu soruları sormalısın:

```txt
Bu model internal mı public mi?
Bu alan client'tan gelebilir mi?
Bu alan server/system tarafından mı üretilmeli?
Bu işlem başarısız olabilir mi?
Undefined ihtimali var mı?
Bu permission gerçekten bu role için geçerli mi?
Bu response içinde hassas veri sızıyor mu?
Bu type fazla geniş mi, fazla dar mı?
Assertion kullanmadan modelleyebilir miyim?
```

Bu sorular seni sadece TypeScript bilen biri değil, daha güvenli ve maintainable software yazan biri yapar.

---

## Kısa özet

- Real app type modeling domain kurallarını type sistemine yansıtmaktır.
- Internal model ile public response model ayrılmalıdır.
- Request type’ları güvenlik açısından dikkatli tasarlanmalıdır.
- `Pick` security-sensitive request modellerinde genelde daha kontrollüdür.
- `Partial` update request’lerde faydalıdır ama yetki farkını düşünmek gerekir.
- Role/permission listeleri `as const` ile üretilebilir.
- Config map’leri `satisfies` ile güvenli hale getirilebilir.
- API/service sonuçları için discriminated union `ApiResult` güçlü bir modeldir.
- Strict TypeScript, `undefined` ihtimalini ele almaya zorlar.
- Class sadece behavior/dependency gerektiğinde kullanılmalıdır.
