# 19-modules-imports-exports

## Amaç

Bu milestone’da TypeScript projelerinde kodu dosyalara bölmeyi ve module sistemiyle organize etmeyi öğreneceğiz.

Odak konular:

- `export`
- `import`
- named export
- default export
- type-only import/export
- barrel export
- public/internal module ayrımı
- gerçek projeye uygun dosya organizasyonu

Ana fikir şudur:

> Kod büyüdükçe her şeyi tek dosyada tutmak yerine, sorumluluklara göre modüllere ayırırız.

Gerçek projelerde module organizasyonu özellikle şu alanlarda önemlidir:

- frontend/backend shared types
- API model dosyaları
- reusable helper fonksiyonlar
- test helper’ları
- auth/RBAC modelleri
- validation ve request/response type’ları
- maintainable folder structure
- güvenli public/internal sınırlar

---

## Module nedir?

TypeScript’te bir dosya, içinde `import` veya `export` varsa module kabul edilir.

Örnek:

```ts
export type User = {
  id: string;
  email: string;
};
```

Bu dosya artık başka dosyalardan import edilebilir.

```ts
import type { User } from "./user";
```

Module sistemi sayesinde büyük bir codebase’i daha küçük, anlaşılır parçalara bölebiliriz.

---

## Neden module kullanırız?

Küçük örneklerde her şeyi tek dosyada yazmak kolaydır.

Ama gerçek projelerde şu dosyada her şeyin olduğunu düşün:

```txt
app.ts
```

İçinde:

- User type’ları
- Product type’ları
- API response type’ları
- helper fonksiyonlar
- auth type’ları
- permission map
- validation logic
- test data builders

Bu yapı bir süre sonra zor yönetilir.

Module organizasyonu bize şunları sağlar:

- daha okunabilir dosyalar
- daha net sorumluluklar
- daha kolay refactor
- daha kolay test yazımı
- tekrar kullanılabilir type ve helper’lar
- internal ve public API ayrımı
- ekip içinde daha anlaşılır proje yapısı

---

## Named export

Named export, bir dosyadan birden fazla şeyi isimleriyle export etmemizi sağlar.

```ts
export type User = {
  id: string;
  email: string;
};

export type UserRole = "admin" | "user";

export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}
```

Başka dosyada import:

```ts
import { isAdmin } from "./user";
import type { User, UserRole } from "./user";
```

Named export gerçek projelerde genellikle tercih edilir çünkü:

- import edilen şeyin adı nettir
- refactor daha güvenlidir
- bir dosyadan birden fazla şey export edilebilir
- tooling/autocomplete ile iyi çalışır

---

## Default export

Default export, bir dosyadan varsayılan tek export verir.

```ts
export default function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

Import ederken ismi sen seçebilirsin:

```ts
import formatEmail from "./format-email";
```

Hatta teknik olarak şöyle de yazılabilir:

```ts
import cleanEmail from "./format-email";
```

Bu esneklik bazen okunabilirliği azaltır. Çünkü export edilen şeyin gerçek ismi import tarafında değiştirilebilir.

Bu yüzden birçok TypeScript codebase’inde özellikle shared type/helper dosyalarında named export daha çok tercih edilir.

Bu track’te önerimiz:

> TypeScript core ve shared type/helper dosyalarında named export kullan.

Default export tamamen yanlış değildir. React component dosyalarında veya tek ana export içeren bazı dosyalarda kullanılabilir. Ama şu aşamada named export daha tutarlı ve öğrenmesi daha güvenlidir.

---

## Type-only import

TypeScript’te bazı import’lar sadece type için kullanılır.

```ts
import type { User } from "./user";
```

Bu, runtime JavaScript çıktısında kullanılmaz.

Örnek:

```ts
import type { User } from "./user";

function printUserEmail(user: User): void {
  console.log(user.email);
}
```

`User` sadece TypeScript type checking için vardır. Runtime’da gerçek JavaScript değeri değildir.

Bu yüzden `import type` kullanmak daha temizdir.

Faydaları:

- runtime import karışıklığını azaltır
- circular dependency riskini azaltmaya yardımcı olur
- type ve value ayrımını netleştirir
- build output’unu daha anlaşılır yapar

Kural olarak:

> Sadece type için import ediyorsan `import type` kullan.

---

## Type-only export

Benzer şekilde sadece type export etmek için şöyle yazabiliriz:

```ts
export type { User, UserRole } from "./user";
```

Bu özellikle `index.ts` barrel dosyalarında faydalıdır.

```ts
export type { User } from "./models/user";
export { formatEmail } from "./utils/format-email";
```

Burada `User` sadece type olarak export edilir, `formatEmail` ise runtime function olarak export edilir.

---

## Runtime value ve type farkı

TypeScript’te iki dünya vardır:

1. Type world
2. Runtime value world

Type world compile-time’da vardır:

```ts
type User = {
  id: string;
  email: string;
};
```

Runtime value world JavaScript çalışırken vardır:

```ts
const user = {
  id: "u1",
  email: "ada@example.com",
};
```

Bu ayrım import/export için çok önemlidir.

Şu sadece type’tır:

```ts
export type User = {
  id: string;
  email: string;
};
```

Şu runtime value’dur:

```ts
export const USER_ROLES = ["admin", "user"] as const;
```

Ama `USER_ROLES` üzerinden type da üretebiliriz:

```ts
export type UserRole = (typeof USER_ROLES)[number];
```

Burada:

- `USER_ROLES` runtime value’dur
- `UserRole` compile-time type’tır

Import ederken:

```ts
import { USER_ROLES } from "./user";
import type { UserRole } from "./user";
```

Bu ayrım gerçek projelerde temiz module yapısı için çok önemlidir.

---

## Relative import paths

Aynı klasördeki dosyadan import:

```ts
import { formatEmail } from "./format-email";
```

Bir üst klasörden import:

```ts
import type { User } from "../models/user";
```

Bir alt klasörden import:

```ts
import { createUser } from "./services/create-user";
```

Başlangıçta relative import kullanmak yeterlidir.

Path alias gibi konular gerçek projelerde faydalı olabilir ama bu milestone’da yeni tooling eklemiyoruz.

---

## Örnek dosya organizasyonu

Bu milestone için gerçekçi küçük bir yapı düşünebiliriz:

```txt
19-modules-imports-exports/
  notes.md
  examples.ts
  exercises.ts
```

Ama gerçek bir projede aynı kodlar şöyle bölünebilir:

```txt
src/
  models/
    user.ts
    product.ts
  types/
    api.ts
  utils/
    email.ts
  permissions/
    permissions.ts
  index.ts
```

Örnek:

```txt
src/models/user.ts
```

```ts
export const USER_ROLES = ["admin", "user"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};
```

```txt
src/types/api.ts
```

```ts
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  requestId: string;
};
```

```txt
src/utils/email.ts
```

```ts
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

```txt
src/index.ts
```

```ts
export type { User, UserRole } from "./models/user";
export { USER_ROLES } from "./models/user";
export type { ApiResponse } from "./types/api";
export { normalizeEmail } from "./utils/email";
```

---

## Barrel export nedir?

Barrel export, bir klasörün dışarıya açtığı şeyleri tek bir `index.ts` üzerinden toplamasıdır.

Örnek:

```txt
src/
  models/
    user.ts
    product.ts
    index.ts
```

`models/index.ts`:

```ts
export type { User, UserRole } from "./user";
export { USER_ROLES } from "./user";

export type { Product } from "./product";
```

Kullanım:

```ts
import type { User, Product } from "./models";
import { USER_ROLES } from "./models";
```

Barrel dosyaları import path’lerini sadeleştirebilir.

Ama aşırı kullanıldığında dependency ilişkilerini gizleyebilir.

Başlangıç için öneri:

- küçük feature klasörlerinde barrel kullanılabilir
- her şeyi tek global barrel dosyasına yığma
- internal/private helper’ları barrel üzerinden dışarı açma

---

## Public ve internal ayrımı

Her dosyadaki her şeyi export etmek iyi değildir.

Bir module içinde bazı şeyler sadece internal helper olabilir.

```ts
function isValidEmailFormat(email: string): boolean {
  return email.includes("@");
}

export function normalizeEmail(email: string): string {
  if (!isValidEmailFormat(email)) {
    throw new Error("Invalid email format");
  }

  return email.trim().toLowerCase();
}
```

Burada `isValidEmailFormat` export edilmediği için sadece aynı dosya içinde kullanılabilir.

Bu iyi bir şeydir.

Çünkü module dışına sadece gerçekten public olan API açılır.

Gerçek projede bu yaklaşım bakım açısından önemlidir:

- dışarıya gereksiz detay açılmaz
- refactor daha kolay olur
- module sınırları netleşir
- yanlış kullanım riski azalır

---

## Ne export edilmeli?

Genelde export edilmesi mantıklı olanlar:

```txt
Public types
Reusable helper functions
Constants used by multiple modules
API request/response models
Shared domain models
Factory functions
```

Export edilmemesi daha iyi olanlar:

```txt
Temporary helper functions
Implementation details
Private validation helpers
Internal mapping details
Sadece tek dosyada kullanılan küçük ara değişkenler
```

Basit kural:

> Bir şeyi başka dosyanın bilmesi gerekmiyorsa export etme.

---

## Circular dependency riski

Circular dependency, iki module’ün birbirini import etmesi durumudur.

Örnek:

```txt
user.ts imports permissions.ts
permissions.ts imports user.ts
```

Bu durum bazı projelerde runtime bug’lara ve testlerde karmaşık hatalara yol açabilir.

Type-only import circular dependency riskini azaltabilir ama tamamen çözmez.

Daha iyi yaklaşım:

- shared type’ları ayrı dosyaya almak
- module sorumluluklarını net ayırmak
- düşük seviyeli dosyaların yüksek seviyeli dosyaları import etmemesine dikkat etmek
- helper dosyalarını domain logic’e bağımlı yapmamak

Bu konu ileride backend, auth/RBAC ve test architecture tarafında daha önemli olacak.

---

## Module organizasyonu için pratik kurallar

Başlangıç için şu kurallar yeterli:

1. Bir dosyanın tek ana sorumluluğu olsun.
2. Type-only import için `import type` kullan.
3. Shared type’ları tekrar yazma, export/import et.
4. Her şeyi export etme.
5. Named export’u varsayılan tercih yap.
6. Constants ve onlardan türetilen type’ları aynı dosyada tut.
7. Circular dependency oluşuyorsa sorumlulukları yeniden düşün.
8. Barrel export kullanıyorsan internal detayları dışarı açma.

---

## Gerçek proje sezgisi

Bu Phase’te öğrendiğimiz konular birlikte şöyle çalışır:

```ts
export const USER_ROLES = ["admin", "user"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type CreateUserRequest = Pick<User, "email" | "name">;

export type UpdateUserRequest = Partial<Pick<User, "email" | "name">>;
```

Bu dosya:

- `as const`
- `typeof`
- indexed access
- utility types
- export

konularını birlikte kullanır.

Başka dosyada:

```ts
import type { CreateUserRequest, User } from "./user";

export function createUser(request: CreateUserRequest): User {
  return {
    id: "u1",
    email: request.email,
    name: request.name,
    role: "user",
  };
}
```

Bu artık gerçek projeye daha yakın bir TypeScript organizasyonudur.

---

## Kısa özet

- `export`, bir dosyadaki type/value’ları başka dosyalara açar.
- `import`, başka dosyadan type/value alır.
- Named export genellikle daha okunabilir ve refactor-friendly’dir.
- Default export bazı durumlarda kullanılabilir ama bu track’te named export’u varsayılan tercih ediyoruz.
- Sadece type için `import type` kullan.
- Sadece type re-export için `export type` kullan.
- Type world ve runtime value world ayrımını bilmek önemlidir.
- Barrel export import path’lerini sadeleştirir ama aşırı kullanılmamalıdır.
- Her şeyi export etmek yerine public/internal sınırı kurmak gerekir.
- İyi module organizasyonu maintainable ve test edilebilir codebase’in temelidir.