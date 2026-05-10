# 11 - Enums vs Literal Unions

Gerçek projelerde birçok alan sınırsız string olmamalıdır. Örneğin kullanıcı rolü:
```ts
type User = {
  id: string;
  email: string;
  role: string;
};
```

Bu model zayıftır. Çünkü şunların hepsi TypeScript açısından geçerli olur:
```ts
const user1: User = {
  id: "u1",
  email: "admin@example.com",
  role: "admin",
};

const user2: User = {
  id: "u2",
  email: "user@example.com",
  role: "superhero",
};
```

Ama gerçek sistemde `superhero` diye bir role olmayabilir. Daha güvenli model:
```ts
type UserRole = "admin" | "user" | "support";

type User = {
  id: string;
  email: string;
  role: UserRole;
};
```
Artık role sadece izin verilen değerlerden biri olabilir.

## Literal union nedir?
Literal union, belirli sabit değerlerden oluşan type'tır.
```ts
type UserRole = "admin" | "user" | "support";
```

Bu şu anlama gelir:
>>> UserRole sadece "admin", "user" veya "support" olabilir.

```ts
const role: UserRole = "admin"; // OK
```
```ts
const invalidRole: UserRole = "owner"; // Error
```

## Enum nedir?
Enum, TypeScript'te isimlendirilmiş sabit değerler grubu tanımlamak için kullanılan bir yapıdır.

```ts
enum UserRole {
  Admin = "admin",
  User = "user",
  Support = "support",
}
```
```ts
const role: UserRole = UserRole.Admin;
```

Enum, literal union'dan farklı olarak JavaScript runtime çıktısında gerçek bir object üretir.
Yani şu TypeScript kodu:

```ts
enum UserRole {
  Admin = "admin",
  User = "user",
}
```

JavaScript tarafında kabaca şöyle bir yapıya dönüşür:
```ts
const UserRole = {
  Admin: "admin",
  User: "user",
};
```
Bu fark önemlidir.

## Literal union runtime'da var mı?
Hayır.
```ts
type UserRole = "admin" | "user" | "support";
```
Bu sadece TypeScript compile-time kontrolüdür.
JavaScript çıktısında `UserRole` diye bir şey kalmaz.

Bu yüzden şunu yapamayız:
```ts
console.log(UserRole);
```
Çünkü `UserRole` bir runtime value değildir.

## Enum runtime'da var mı?
Evet.
```ts
enum UserRole {
  Admin = "admin",
  User = "user",
  Support = "support",
}

console.log(UserRole.Admin);
```

Bu çalışır çünkü enum JavaScript çıktısında bir value üretir.
Bu yüzden enum hem type hem de runtime object gibi davranabilir.

## Literal union ile modelleme

```ts
type OrderStatus = "created" | "paid" | "shipped" | "cancelled";

type Order = {
  readonly id: string;
  status: OrderStatus;
};
```

Bu oldukça sade ve okunabilirdir.
```ts
const order: Order = {
  id: "order-1",
  status: "paid",
};
```
Bu model özellikle API contract için doğaldır çünkü JSON içinde zaten string değerler taşınır.

Backend response genelde şöyle gelir:
```json
{
  "id": "order-1",
  "status": "paid"
}
```

Bu JSON enum object değil, string literal taşır.
Bu yüzden literal union, API modelleriyle çok uyumludur.

## Enum ile modelleme
```ts
enum OrderStatus {
  Created = "created",
  Paid = "paid",
  Shipped = "shipped",
  Cancelled = "cancelled",
}

type Order = {
  readonly id: string;
  status: OrderStatus;
};
```

```ts
const order: Order = {
  id: "order-1",
  status: OrderStatus.Paid,
};
```

Bu da geçerlidir. Enum kullanımı bazı ekiplerde tercih edilir çünkü sabit değerlere merkezi bir object üzerinden erişilir.

## String enum tercih et, numeric enum'a dikkat et
TypeScript'te enum değerleri string veya number olabilir.

Numeric enum:
```ts
enum PaymentStatus {
  Pending,
  Paid,
  Failed,
}
```

Bu değerler otomatik olarak number olur:
```ts
PaymentStatus.Pending // 0
PaymentStatus.Paid // 1
PaymentStatus.Failed // 2
```

Bu gerçek uygulamalarda bazen risklidir çünkü API'de `0`, `1`, `2` gibi değerlerin anlamı açık değildir.
Daha okunabilir olan string enum'dur:
```ts
enum PaymentStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
}
```
Bu yüzden enum kullanılacaksa çoğu uygulama modelinde string enum tercih etmek daha güvenlidir.

## Literal union mı enum mu?
İkisi de kullanılabilir ama farklı trade-off'ları vardır. Literal union:
```ts
type UserRole = "admin" | "user" | "support";
```

Avantajları:
- sade
- runtime çıktı üretmez
- API string değerleriyle doğal uyumludur
- discriminated union ile çok iyi çalışır
- frontend/backend shared types için pratiktir
- test data yazarken kolaydır

Dezavantajı:
- runtime'da `UserRole.Admin` gibi bir object yoktur
- tüm izinli değerleri runtime'da listelemek istiyorsan ayrıca array tanımlaman gerekir

Enum:
```ts
enum UserRole {
  Admin = "admin",
  User = "user",
  Support = "support",
}
```

Avantajları:
- runtime'da gerçek object üretir
- `UserRole.Admin` gibi merkezi erişim sağlar
- bazı codebase'lerde daha standarttır

Dezavantajları:
- JavaScript çıktısına ek kod üretir
- API string modellerinde bazen gereksiz ağırdır
- numeric enum yanlış kullanılırsa okunabilirlik düşer
- bazı build/tooling senaryolarında literal union kadar sade değildir

## Modern pratik: literal union + const array
Çoğu gerçek projede iyi bir pattern şudur:
```ts
const userRoles = ["admin", "user", "support"] as const;

type UserRole = (typeof userRoles)[number];
```

Bu biraz yeni syntax içeriyor, parçalayalım.
```ts
const userRoles = ["admin", "user", "support"] as const;
```
`as const`, bu array'in değerlerini geniş `string[]` olarak değil, sabit literal değerler olarak tutar.

Yani TypeScript bunu yaklaşık şöyle görür:
```ts
readonly ["admin", "user", "support"]
```

Sonra:
```ts
type UserRole = (typeof userRoles)[number];
```

Bu array içindeki değerlerden union type üretir:
```ts
type UserRole = "admin" | "user" | "support";
```

Bu pattern'in avantajı şudur:
- runtime'da izinli değerlerin listesi vardır
- compile-time'da literal union type vardır
- tek source of truth oluşur

## Neden const array pattern faydalı?
Şu ihtiyaç sık görülür:
```ts
type UserRole = "admin" | "user" | "support";
```

Ama aynı zamanda runtime'da şunu yapmak isteriz:
```ts
const allowedRoles = ["admin", "user", "support"];
```

Eğer bunları ayrı ayrı yazarsak iki farklı kaynak oluşur. Risk:
```ts
type UserRole = "admin" | "user" | "support";

const allowedRoles = ["admin", "user"];
```

Burada `support` type içinde var ama runtime listede yok. Daha iyi:
```ts
const userRoles = ["admin", "user", "support"] as const;

type UserRole = (typeof userRoles)[number];
```

Artık hem type hem runtime liste aynı yerden gelir.
Bu özellikle validation, form select options, test data ve API input kontrolü için değerlidir.

## includes ile runtime kontrol
TypeScript type sistemi runtime validation yapmaz. Dışarıdan gelen veri hâlâ bilinmeyen string olabilir.
```ts
const input = "admin";
```

Bunun gerçekten `UserRole` olup olmadığını runtime'da kontrol etmek isteyebiliriz.
```ts
const userRoles = ["admin", "user", "support"] as const;

type UserRole = (typeof userRoles)[number];

function isUserRole(value: string): value is UserRole {
  return userRoles.includes(value as UserRole);
}
```

Buradaki return type önemlidir:
```ts
value is UserRole
```

Bu bir type predicate'tir. Şunu söyler:
>>> Bu function true dönerse, value artık UserRole olarak kabul edilebilir.

Kullanım:
```ts
function parseUserRole(value: string): UserRole | null {
  if (isUserRole(value)) {
    return value;
  }

  return null;
}
```
Bu küçük pattern gerçek API input handling için çok faydalıdır.

## Type predicate'e çok takılma
Bu milestone'da type predicate'i derinlemesine öğrenmek zorunda değiliz.

Şimdilik mental model yeterli:
```ts
function isUserRole(value: string): value is UserRole
```

Bu function sadece boolean dönmez. TypeScript'e narrowing bilgisi de verir.
İleride validation ve API güvenliği tarafında bu fikri daha çok kullanacağız.

## Discriminated union ile literal union ilişkisi
Önceki milestone'daki discriminated union'lar zaten literal union değerleri üzerine kuruluydu.
```ts
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```

Burada `status` alanı aslında literal değerlerden oluşur:
```ts
"loading" | "success" | "error"
```
Bu yüzden literal union, TypeScript'in state modelleme gücünün temel parçalarından biridir.

## Security action için literal union
Security logging tarafında rastgele action string'leri istemeyiz.

Zayıf model:
```ts
type SecurityLog = {
  action: string;
};
```
Bu her şeye izin verir:
```ts
const log: SecurityLog = {
  action: "SOMETHING_RANDOM",
};
```

Daha iyi model:
```ts
type SecurityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "PASSWORD_RESET_REQUESTED"
  | "PERMISSION_DENIED";

type SecurityLog = {
  readonly id: string;
  actorUserId: string;
  action: SecurityAction;
  createdAt: string;
};
```

Bu model log kalitesini artırır. Gerçek sistemlerde log action değerlerinin kontrollü olması önemlidir çünkü:
- arama kolaylaşır
- alert rule yazmak kolaylaşır
- test assertion daha güvenilir olur
- dashboard ve raporlama daha tutarlı olur

## Permission için literal union
RBAC tarafında permission değerleri de sınırsız string olmamalıdır.

```ts
type Permission =
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete";
```

Bu şekilde typo hataları yakalanır.
```ts
const permission: Permission = "users:read"; // OK
```

```ts
const invalidPermission: Permission = "user:reed"; // Error
```

Bu küçük güvenlik kalitesi farkı gerçek projelerde önemlidir.

## Ne zaman enum kullanmak mantıklı?
Enum tamamen kötü değildir. Şu durumlarda mantıklı olabilir:
- ekip standardı enum ise
- mevcut codebase enum kullanıyorsa
- runtime'da merkezi sabit object isteniyorsa
- backend veya başka sistem enum karşılığıyla açıkça eşleşiyorsa
```ts
enum AuditAction {
  LoginSuccess = "LOGIN_SUCCESS",
  LoginFailed = "LOGIN_FAILED",
  PermissionDenied = "PERMISSION_DENIED",
}
```

Kullanım:
```ts
const action = AuditAction.LoginSuccess;
```

Bu okunabilir olabilir. Ama yeni TypeScript application code yazarken, özellikle API modelleri ve shared types için literal union çoğu zaman daha hafif ve doğrudandır.

## Ne zaman literal union kullanmak mantıklı?
Literal union özellikle şu durumlarda çok iyi seçimdir:

- API request/response modelleri
- status değerleri
- role değerleri
- permission değerleri
- discriminated union field'ları
- frontend/backend shared types
- test fixture data
- küçük ve orta büyüklükte sabit değer setleri

Örnek:
```ts
type Environment = "development" | "test" | "production";
```
Bu enum'a göre daha sade olabilir.

## Pratik karar kuralı
Yeni kod yazarken şu kuralı kullanabilirsin:

Önce literal union düşün.
```ts
type OrderStatus = "created" | "paid" | "shipped" | "cancelled";
```

Runtime'da izinli değerlerin listesi gerekiyorsa const array pattern kullan:
```ts
const orderStatuses = ["created", "paid", "shipped", "cancelled"] as const;

type OrderStatus = (typeof orderStatuses)[number];
```

Mevcut codebase enum kullanıyorsa veya ekip standardı buysa enum'a uy:
```ts
enum OrderStatus {
  Created = "created",
  Paid = "paid",
  Shipped = "shipped",
  Cancelled = "cancelled",
}
```

En önemli şey tutarlılıktır.

## Kısa özet

Literal union ve enum, sabit değer kümelerini modellemek için kullanılır.

Literal union:
```ts
type Role = "admin" | "user";
```

Enum:
```ts
enum Role {
  Admin = "admin",
  User = "user",
}
```

Modern TypeScript uygulamalarında literal union genellikle daha sade ve API modelleriyle daha uyumludur.
Enum runtime'da gerçek object üretir. Literal union runtime'da yoktur.
Runtime liste de gerekiyorsa iyi pattern:

```ts
const roles = ["admin", "user"] as const;
type Role = (typeof roles)[number];
```

Gerçek projede karar verirken:
- takım standardına uy
- API contract uyumunu düşün
- runtime liste ihtiyacı var mı bak
- numeric enum'lardan özellikle kaçın
- status, role, permission, action gibi alanları sınırsız string bırakma