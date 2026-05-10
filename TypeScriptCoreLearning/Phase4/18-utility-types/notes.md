# 17-utility-types

Bu milestone’da TypeScript’in hazır utility type’larını öğreneceğiz.

Utility types, mevcut type’lardan yeni type’lar üretmemizi sağlar.

Ana fikir şudur:

> Var olan type’ı tekrar yazma; ihtiyacına göre dönüştür.

Gerçek projelerde utility types özellikle şu alanlarda çok kullanılır:

- API request/response modelleri
- form modelleri
- update payload type’ları
- DTO yapıları
- auth/session modelleri
- test data builder yapıları
- frontend/backend shared types
- güvenli refactor süreçleri

---

## Neden utility types var?

Diyelim ki elimizde bir `User` type’ı var:

```ts
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};
```

Yeni kullanıcı oluştururken client şunları göndermemeli:

```ts
id
createdAt
updatedAt
```

Çünkü bunlar genelde backend tarafından oluşturulur.

Create request için ayrıca şöyle bir type yazabiliriz:

```ts
type CreateUserRequest = {
  email: string;
  name: string;
  role: "admin" | "user";
};
```

Bu çalışır ama bir problem var:

`User` değişirse, `CreateUserRequest` manuel olarak güncellenmek zorunda kalır.

Utility types ile şöyle yazabiliriz:

```ts
type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">;
```

Bu şu anlama gelir:

> User type’ından `id`, `createdAt`, `updatedAt` alanlarını çıkar ve yeni type üret.

Böylece type’lar birbirinden kopmaz.

---

## `Partial<T>`

`Partial<T>`, verilen type’ın bütün property’lerini optional yapar.

```ts
type User = {
  id: string;
  email: string;
  name: string;
};

type PartialUser = Partial<User>;
```

`PartialUser` şuna denk gelir:

```ts
type PartialUser = {
  id?: string;
  email?: string;
  name?: string;
};
```

Gerçek projede en yaygın kullanım alanlarından biri update payload’dır.

```ts
type UpdateUserRequest = Partial<{
  email: string;
  name: string;
}>;
```

Ya da:

```ts
type UpdateUserRequest = Partial<Pick<User, "email" | "name">>;
```

Bu sayede kullanıcı sadece değiştirmek istediği alanları gönderebilir.

```ts
const updateEmail: UpdateUserRequest = {
  email: "new@example.com",
};

const updateName: UpdateUserRequest = {
  name: "Ada Lovelace",
};
```

Dikkat:

`Partial<T>` bütün alanları optional yapar. Bu her zaman doğru olmayabilir.

Mesela `id` alanının optional olması bazı durumlarda risklidir.

Bu yüzden genelde `Partial` tek başına değil, `Pick` veya `Omit` ile beraber kullanılır.

---

## `Required<T>`

`Required<T>`, verilen type’ın bütün optional property’lerini required yapar.

```ts
type UserProfileForm = {
  email?: string;
  name?: string;
  bio?: string;
};

type CompleteUserProfileForm = Required<UserProfileForm>;
```

Bu şuna denk gelir:

```ts
type CompleteUserProfileForm = {
  email: string;
  name: string;
  bio: string;
};
```

Gerçek projelerde şu durumda kullanışlıdır:

- form submit öncesi bütün alanların dolu olduğunu temsil etmek
- config objesinin normalize edilmiş halini modellemek
- optional gelen input’u validation sonrası required hale getirmek

Örnek:

```ts
type RawConfig = {
  apiUrl?: string;
  timeoutMs?: number;
};

type AppConfig = Required<RawConfig>;
```

Burada `RawConfig` eksik gelebilir, ama validation/default işlemlerinden sonra `AppConfig` tam olmalıdır.

---

## `Pick<T, K>`

`Pick<T, K>`, bir type içinden sadece seçilen property’lerle yeni type üretir.

```ts
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

type UserSummary = Pick<User, "id" | "email">;
```

Bu şuna denk gelir:

```ts
type UserSummary = {
  id: string;
  email: string;
};
```

Gerçek projelerde `Pick` özellikle şu alanlarda kullanılır:

- liste ekranında sade data göstermek
- public profile type üretmek
- request payload oluşturmak
- test assertion için küçük type oluşturmak

Örnek:

```ts
type LoginRequest = Pick<User, "email"> & {
  password: string;
};
```

Burada `email` alanı `User` type’ından alınır, `password` ayrıca eklenir.

---

## `Omit<T, K>`

`Omit<T, K>`, bir type içinden seçilen property’leri çıkarır.

```ts
type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

type CreateUserRequest = Omit<User, "id" | "createdAt">;
```

Bu şuna denk gelir:

```ts
type CreateUserRequest = {
  email: string;
  name: string;
};
```

Gerçek projelerde `Omit` çok yaygındır.

Özellikle backend tarafından üretilen alanları request type’ından çıkarmak için kullanılır:

```ts
type CreateProductRequest = Omit<Product, "id" | "createdAt" | "updatedAt">;
```

Bu yaklaşım tekrar yazımı azaltır.

Ama dikkat:

`Omit` kullanırken domain mantığını düşünmek gerekir.

Her `User` alanı create request için uygun olmayabilir. Mesela `role` alanını client’ın göndermesi güvenlik açısından riskli olabilir.

```ts
type UnsafeCreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">;
```

Bu type içinde `role` kalıyorsa ve role client tarafından gönderiliyorsa, bu yetki yükseltme riskine yol açabilir.

Daha güvenli yaklaşım:

```ts
type CreateUserRequest = Pick<User, "email" | "name">;
```

Yani utility type kullanmak tek başına güvenlik sağlamaz. Doğru alanları seçmek gerekir.

---

## `Readonly<T>`

`Readonly<T>`, verilen type’ın bütün property’lerini readonly yapar.

```ts
type Session = {
  userId: string;
  role: "admin" | "user";
};

type ReadonlySession = Readonly<Session>;
```

Bu şuna denk gelir:

```ts
type ReadonlySession = {
  readonly userId: string;
  readonly role: "admin" | "user";
};
```

Kullanım:

```ts
const session: ReadonlySession = {
  userId: "u1",
  role: "admin",
};

session.role = "user";
```

Bu assignment compile error verir.

Gerçek projelerde `Readonly<T>` şu alanlarda faydalıdır:

- session bilgisini yanlışlıkla değiştirmemek
- config objelerini korumak
- test fixture’larını sabit tutmak
- application state’in bazı bölümlerini immutable modellemek

Dikkat:

`Readonly<T>` shallow çalışır.

Yani sadece ilk seviye property’leri readonly yapar.

```ts
type AppState = {
  user: {
    id: string;
    email: string;
  };
};

const state: Readonly<AppState> = {
  user: {
    id: "u1",
    email: "ada@example.com",
  },
};

state.user.email = "new@example.com";
```

Bu bazı durumlarda hâlâ mümkün olabilir çünkü nested object otomatik olarak deep readonly olmaz.

---

## `Record<K, T>`

`Record<K, T>`, key/value yapısı oluşturur.

```ts
type Role = "admin" | "user" | "guest";

type RoleLabels = Record<Role, string>;
```

Bu şuna denk gelir:

```ts
type RoleLabels = {
  admin: string;
  user: string;
  guest: string;
};
```

Kullanım:

```ts
const roleLabels: RoleLabels = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
};
```

Eğer bir role eksik bırakılırsa TypeScript hata verir.

Bu yüzden `Record` özellikle enum/literal union mapping için çok kullanışlıdır.

Gerçek proje örneği:

```ts
type Permission = "users:read" | "users:create" | "users:delete";

const permissionDescriptions: Record<Permission, string> = {
  "users:read": "Can view users",
  "users:create": "Can create users",
  "users:delete": "Can delete users",
};
```

Bu yapı RBAC ve permission sistemlerinde çok işe yarar.

---

## `NonNullable<T>`

`NonNullable<T>`, bir type içinden `null` ve `undefined` değerlerini çıkarır.

```ts
type MaybeUserId = string | null | undefined;

type UserId = NonNullable<MaybeUserId>;
```

`UserId` artık sadece `string` olur.

Gerçek projelerde özellikle validation sonrası type’ı netleştirmek için kullanılır.

```ts
type ApiUser = {
  id: string;
  email: string | null;
};

type UserEmail = NonNullable<ApiUser["email"]>;
```

Burada `UserEmail` sadece `string` olur.

Dikkat:

`NonNullable<T>` runtime validation yapmaz.

Yani değer gerçekten null mı değil mi kontrol etmez. Sadece type seviyesinde dönüşüm yapar.

Runtime kontrol hâlâ senin sorumluluğundadır.

---

## `ReturnType<T>`

`ReturnType<T>`, bir fonksiyonun return type’ını çıkarır.

```ts
function createUser() {
  return {
    id: "u1",
    email: "ada@example.com",
    role: "admin" as const,
  };
}

type CreatedUser = ReturnType<typeof createUser>;
```

Burada `CreatedUser`, `createUser` fonksiyonunun döndürdüğü object type’ı olur.

Gerçek projelerde şu durumlarda kullanılır:

- factory fonksiyonlarının output type’ını tekrar yazmamak
- test data builder return type’ını almak
- selector/helper function output type’ını kullanmak

Özellikle `typeof` ile beraber kullanılır.

```ts
type CreatedUser = ReturnType<typeof createUser>;
```

Buradaki `typeof createUser`, fonksiyonun type’ını alır.

Sonra `ReturnType` bu fonksiyon type’ının dönüş type’ını çıkarır.

---

## `Parameters<T>`

`Parameters<T>`, bir fonksiyonun parametre type’larını tuple olarak çıkarır.

```ts
function updateUser(id: string, payload: { name?: string; email?: string }) {
  return {
    id,
    ...payload,
  };
}

type UpdateUserParams = Parameters<typeof updateUser>;
```

Bu şuna benzer:

```ts
type UpdateUserParams = [
  id: string,
  payload: {
    name?: string;
    email?: string;
  }
];
```

Kullanım alanları:

- wrapper fonksiyonlar
- logging decorator yapıları
- test helper’ları
- fonksiyon signature’ını tekrar yazmadan kullanmak

Bu Phase’te sadece temel seviyede bilmek yeterli.

---

## Utility type’lar generics üzerine kuruludur

Utility type’ların çoğu generic yapılardır.

Mesela:

```ts
Partial<T>
Pick<T, K>
Omit<T, K>
Record<K, T>
Readonly<T>
```

Bunların hepsi dışarıdan type alır ve yeni type üretir.

Yani önceki milestone’daki generics bilgisi burada doğrudan kullanılıyor.

---

## Gerçek proje sezgisi

Utility types kullanırken amaç “daha kısa yazmak” değildir.

Asıl amaç şudur:

- type tekrarını azaltmak
- refactor güvenliğini artırmak
- request/response modellerini tutarlı hale getirmek
- domain type’ları ile derived type’ları bağlı tutmak
- yanlış alan kullanımını TypeScript seviyesinde yakalamak

Ama utility type’lar dikkatli kullanılmalıdır.

Özellikle güvenlik açısından şu ayrım önemlidir:

```ts
type CreateUserRequest = Omit<User, "id" | "createdAt">;
```

Bu pratik olabilir ama fazla alan bırakabilir.

Daha kontrollü yaklaşım:

```ts
type CreateUserRequest = Pick<User, "email" | "name">;
```

Security-sensitive alanlarda genelde `Pick` daha güvenli bir tercihtir çünkü sadece izin verilen alanları seçersin.

---

## Kısa özet

- Utility types, mevcut type’lardan yeni type üretir.
- `Partial<T>` bütün alanları optional yapar.
- `Required<T>` bütün alanları required yapar.
- `Pick<T, K>` sadece seçilen alanları alır.
- `Omit<T, K>` seçilen alanları çıkarır.
- `Readonly<T>` alanları readonly yapar.
- `Record<K, T>` key/value mapping oluşturur.
- `NonNullable<T>` null ve undefined ihtimallerini çıkarır.
- `ReturnType<T>` fonksiyonun dönüş type’ını alır.
- `Parameters<T>` fonksiyon parametre type’larını tuple olarak alır.
- Utility types çok güçlüdür ama özellikle request/auth/security modellerinde dikkatli kullanılmalıdır.