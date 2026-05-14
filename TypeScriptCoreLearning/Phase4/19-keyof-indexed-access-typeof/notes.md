# 19 - keyof, Indexed Access, and typeof

## Amaç

Bu milestone’da TypeScript’te object type’ların key/value ilişkilerini daha güvenli şekilde kullanmayı öğreneceğiz.

Odak konular:

- `keyof`
- indexed access types
- `typeof`
- object key/value ilişkileri
- generic helper fonksiyonlarda güvenli property erişimi

Ana fikir şudur:

> Object’in key’lerini ve value type’larını elle tekrar yazmak yerine TypeScript’ten türet.

Bu konu gerçek projelerde özellikle şu alanlarda çok kullanılır:

- reusable helper fonksiyonlar
- form field modelleri
- table column tanımları
- filter/sort key type’ları
- API payload field seçimi
- test assertion helper’ları
- config objelerinden type üretme
- permission map / role map yapıları

---

## Problem: Object key’lerini string olarak yazmak risklidir

Diyelim ki elimizde bir `User` type’ı var:

```ts
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};
```

Bir property değerini almak için şöyle bir fonksiyon yazabiliriz:

```ts
function getUserValue(user: User, key: string) {
  return user[key];
}
```

Bu yaklaşım sorunludur.

Çünkü `key: string` demek, herhangi bir string kabul etmek demektir:

```ts
getUserValue(user, "email");
getUserValue(user, "wrongKey");
```

`"wrongKey"` geçerli bir `User` alanı değildir.

Ama `key` sadece `string` olarak tanımlandığında TypeScript bu hatayı güvenli şekilde yakalayamaz.

İstediğimiz şey şudur:

> key sadece User type’ındaki property isimlerinden biri olabilsin.

Bunu `keyof` ile yaparız.

---

## `keyof` nedir?

`keyof`, bir object type’ın property isimlerinden union type üretir.

```ts
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

type UserKey = keyof User;
```

`UserKey` şuna denk gelir:

```ts
type UserKey = "id" | "email" | "name" | "role";
```

Artık sadece geçerli key’leri kabul eden type yazabiliriz:

```ts
function getUserValue(user: User, key: keyof User) {
  return user[key];
}
```

Kullanım:

```ts
getUserValue(user, "email");
getUserValue(user, "role");
```

Şu compile olmaz:

```ts
getUserValue(user, "password");
```

Çünkü `"password"` User type’ında bir property değildir.

---

## `keyof` neden önemlidir?

`keyof`, string tabanlı hataları type seviyesinde yakalar.

Özellikle şu tarz yapılarda çok işe yarar:

```ts
type SortField = "email" | "name" | "createdAt";
```

Bunu elle yazmak yerine modelden türetebiliriz:

```ts
type UserSortField = keyof User;
```

Fakat gerçek projede bütün alanların sort edilebilir olmasını istemeyebilirsin.

Bu durumda utility type’larla beraber kullanabilirsin:

```ts
type UserSortableFields = keyof Pick<User, "email" | "name">;
```

Bu şuna denk gelir:

```ts
type UserSortableFields = "email" | "name";
```

Bu yaklaşım hem kontrollü hem de modelle bağlantılıdır.

---

## Indexed access type nedir?

Indexed access type, bir object type içindeki property’nin value type’ını almamızı sağlar.

Syntax:

```ts
Type["propertyName"]
```

Örnek:

```ts
type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

type UserEmail = User["email"];
```

`UserEmail` artık `string` olur.

```ts
type UserRole = User["role"];
```

`UserRole` artık şu olur:

```ts
type UserRole = "admin" | "user";
```

Bu özellikle aynı value type’ı tekrar yazmamak için kullanılır.

Kötü yaklaşım:

```ts
type Role = "admin" | "user";
```

Ama zaten `User` içinde role varsa şöyle türetmek daha tutarlı olabilir:

```ts
type Role = User["role"];
```

Böylece `User["role"]` değişirse `Role` da otomatik güncellenir.

---

## Multiple indexed access

Birden fazla property’nin value type’ını union olarak alabiliriz.

```ts
type UserContactValue = User["email" | "name"];
```

Eğer `email` ve `name` ikisi de `string` ise sonuç `string` olur.

Başka örnek:

```ts
type UserIdentityValue = User["id" | "role"];
```

Bu şuna denk gelir:

```ts
type UserIdentityValue = string | "admin" | "user";
```

Ama `"admin" | "user"` zaten `string` içinde eriyeceği için pratikte sonuç `string` gibi davranır.

Daha anlamlı örnek:

```ts
type Product = {
  id: string;
  price: number;
  isActive: boolean;
};

type ProductEditableValue = Product["price" | "isActive"];
```

Bu şuna denk gelir:

```ts
type ProductEditableValue = number | boolean;
```

---

## Generic property getter

`keyof` ve indexed access type birlikte çok güçlüdür.

```ts
function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}
```

Bu fonksiyonun anlamı:

- `T`: object type
- `K`: T’nin key’lerinden biri olmak zorunda
- return type: verilen key’in value type’ı

Kullanım:

```ts
const user = {
  id: "u1",
  email: "ada@example.com",
  role: "admin" as const,
};

const email = getValue(user, "email");
```

Burada `email` type’ı `string` olur.

```ts
const role = getValue(user, "role");
```

Burada `role` type’ı `"admin"` olabilir, çünkü object literal içinde `as const` kullanıldıysa TypeScript daha dar type çıkarabilir.

Bu fonksiyonun en değerli tarafı şudur:

```ts
getValue(user, "wrongKey");
```

Bu compile olmaz.

---

## Generic property setter

Benzer şekilde güvenli setter yazabiliriz.

```ts
function setValue<T, K extends keyof T>(item: T, key: K, value: T[K]): T {
  return {
    ...item,
    [key]: value,
  };
}
```

Burada kritik nokta `value: T[K]`.

Yani hangi key verildiyse, value o key’in type’ına uygun olmalıdır.

Örnek:

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};

const user: User = {
  id: "u1",
  email: "ada@example.com",
  isActive: true,
};

const updatedUser = setValue(user, "email", "new@example.com");
```

Bu geçerlidir.

Şu geçersizdir:

```ts
setValue(user, "isActive", "yes");
```

Çünkü `isActive` alanı boolean bekler.

---

## `typeof` nedir?

JavaScript’te `typeof`, runtime’da bir değerin türünü kontrol etmek için kullanılır:

```ts
console.log(typeof "hello");
// "string"
```

TypeScript’te ise `typeof`, type context içinde kullanıldığında mevcut bir value’dan type üretir.

```ts
const defaultConfig = {
  apiUrl: "https://api.example.com",
  timeoutMs: 5000,
  enableAuditLogs: true,
};

type AppConfig = typeof defaultConfig;
```

`AppConfig` şuna benzer bir type olur:

```ts
type AppConfig = {
  apiUrl: string;
  timeoutMs: number;
  enableAuditLogs: boolean;
};
```

Bu özellikle config, constants, route maps, permission maps gibi yapılarda çok işe yarar.

---

## `typeof` ve `keyof` birlikte kullanımı

Mevcut bir object’ten key union üretmek için `typeof` ve `keyof` birlikte kullanılır.

```ts
const permissionDescriptions = {
  "users:read": "Can view users",
  "users:create": "Can create users",
  "users:delete": "Can delete users",
};

type Permission = keyof typeof permissionDescriptions;
```

Burada:

```ts
typeof permissionDescriptions
```

object’in type’ını üretir.

Sonra:

```ts
keyof typeof permissionDescriptions
```

bu object’in key’lerinden union üretir.

Sonuç:

```ts
type Permission = "users:read" | "users:create" | "users:delete";
```

Bu gerçek projelerde çok kullanışlıdır çünkü permission listesini hem runtime value hem type source olarak kullanabiliriz.

---

## `as const` ile literal type koruma

Normalde TypeScript object value’larını geniş type olarak çıkarır.

```ts
const roles = {
  admin: "admin",
  user: "user",
};
```

Burada value’lar genelde `string` olarak yorumlanır.

Ama `as const` kullanırsak TypeScript değerleri literal olarak korur:

```ts
const roles = {
  admin: "admin",
  user: "user",
} as const;
```

Artık value’lar readonly ve literal type olur.

Value union üretmek için indexed access kullanabiliriz:

```ts
type Role = (typeof roles)[keyof typeof roles];
```

Adım adım:

```ts
typeof roles
```

object type’ını alır.

```ts
keyof typeof roles
```

key union üretir:

```ts
"admin" | "user"
```

```ts
(typeof roles)[keyof typeof roles]
```

bu key’lerin value type’larını alır:

```ts
"admin" | "user"
```

Bu pattern gerçek projelerde constant object’lerden type üretmek için çok yaygındır.

---

## Array value type üretmek

Bir array’in eleman type’ını çıkarmak için indexed access kullanabiliriz.

```ts
const allowedRoles = ["admin", "user", "guest"] as const;

type Role = (typeof allowedRoles)[number];
```

Burada `Role` şu olur:

```ts
type Role = "admin" | "user" | "guest";
```

Neden `[number]`?

Çünkü array elemanlarına number index ile erişilir:

```ts
allowedRoles[0]
allowedRoles[1]
```

Bu yüzden type seviyesinde array elemanlarının union’ını almak için `[number]` kullanılır.

Bu pattern özellikle şu alanlarda kullanılır:

- allowed status listeleri
- role listeleri
- permission listeleri
- route name listeleri
- test scenario name listeleri

---

## `keyof` her zaman string üretmez

Çoğu zaman `keyof` string literal union üretir.

Ama JavaScript object key’leri string, number veya symbol olabilir.

Örnek:

```ts
type Scores = {
  1: string;
  2: string;
};

type ScoreKey = keyof Scores;
```

Burada sonuç number literal key olabilir.

Bu milestone’da çoğunlukla string key’lerle çalışacağız. Gerçek uygulamalarda object property isimleri çoğunlukla string olduğu için başlangıçta bu yeterlidir.

---

## Gerçek proje sezgisi

Şu type’ı düşün:

```ts
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  isActive: boolean;
};
```

Bir table component veya API filter yapısında field isimlerini string yazmak cazip gelebilir:

```ts
const columns = ["email", "name", "role"];
```

Ama bu type-safe değildir.

Daha güvenli yaklaşım:

```ts
type UserColumn = keyof Pick<User, "email" | "name" | "role">;

const columns: UserColumn[] = ["email", "name", "role"];
```

Böylece yanlış field ismi compile-time’da yakalanır.

Benzer şekilde reusable helper yazarken:

```ts
function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}
```

Bu yapı frontend form field’larında, backend update helper’larında ve test assertion helper’larında çok kullanılır.

---

## Dikkat edilmesi gerekenler

`keyof`, sadece type seviyesinde güvenlik sağlar. Runtime’da gelen string’in gerçekten geçerli key olup olmadığını otomatik kontrol etmez.

Örneğin API’den gelen field adı hâlâ doğrulanmalıdır.

```ts
const fieldFromRequest = "email";
```

Bu değer dış dünyadan geliyorsa runtime validation gerekir.

TypeScript compile-time güvenlik sağlar; kullanıcı input’unu otomatik güvenli yapmaz.

Security açısından bu ayrım önemlidir:

- internal code için `keyof` çok güçlüdür
- external input için ayrıca validation gerekir

---

## Kısa özet

- `keyof`, object type’ın key’lerinden union type üretir.
- `User["email"]`, `User` type’ındaki `email` alanının value type’ını alır.
- Indexed access type, value type’larını tekrar yazmayı azaltır.
- `typeof`, mevcut value’dan type üretir.
- `keyof typeof someObject`, runtime object’in key’lerinden type üretir.
- `as const`, literal value type’larını korur.
- `(typeof array)[number]`, array elemanlarından union type üretir.
- `T[K]`, generic key’e karşılık gelen value type’ını temsil eder.
- Bu yapıların amacı string tabanlı hataları azaltmak ve modelle bağlantılı type’lar üretmektir.
