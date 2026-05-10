# TypeScript Phase 1 Review

## Bu phase'de ne öğrendik?

Phase 1'in amacı TypeScript'in temel type mantığını ve gerçek veri işleme araçlarını öğrenmekti.

Bu phase'de şunları işledik:

```txt
01-typescript-intro/
02-primitive-types/
03-arrays-and-objects/
04-functions/
05-array-methods/
06-collections-map-set-record/
```

Artık şunları anlayabiliyor olmalısın:

- TypeScript neden var?
- Compile-time ve runtime farkı nedir?
- Primitive type'lar nasıl kullanılır?
- `null` ve `undefined` farkı nedir?
- Array ve object nasıl tiplenir?
- Optional property nasıl çalışır?
- `readonly` ne işe yarar?
- Fonksiyon parametreleri ve return type nasıl yazılır?
- Callback function type nedir?
- Array methodları ne zaman kullanılır?
- `Array`, `Set`, `Map`, `Record` farkları nelerdir?

---

## 1. TypeScript'in ana değeri

TypeScript'in ana amacı JavaScript kodunu daha güvenli ve okunabilir hale getirmektir.

Örneğin:

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

Bu fonksiyon artık açık bir contract'a sahiptir:

```txt
price number olmalı
quantity number olmalı
return number olmalı
```

Yanlış kullanım erkenden yakalanır:

```ts
calculateTotal("100", 2);
```

Bu kod TypeScript hatası verir.

Ama önemli nokta:

TypeScript runtime validation değildir.

API'den gelen veri, user input veya database verisi runtime'da hâlâ yanlış olabilir. Bu yüzden ileride `unknown`, type guards ve validation konuları önemli olacak.

---

## 2. Primitive types

En temel tipler:

```ts
const email: string = "admin@example.com";
const price: number = 99.99;
const isActive: boolean = true;
```

Ama çoğu basit `const` değer için type inference yeterlidir:

```ts
const email = "admin@example.com";
const price = 99.99;
const isActive = true;
```

Fonksiyon parametrelerinde ise type yazmak önemlidir:

```ts
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

---

## 3. null ve undefined

Pratik mental model:

```txt
null       -> bilinçli boşluk
undefined  -> henüz yok / atanmadı / property mevcut değil
```

Örnek:

```ts
let sessionToken: string | null = null;

sessionToken = "token-abc";
sessionToken = null;
```

Bu auth tarafında çok yaygındır.

Optional property ise genelde `undefined` ihtimali taşır:

```ts
const user: {
  email: string;
  lastLoginAt?: string;
} = {
  email: "new-user@example.com",
};
```

Kullanırken kontrol gerekir:

```ts
if (user.lastLoginAt !== undefined) {
  console.log(user.lastLoginAt);
}
```

---

## 4. Arrays and objects

Array aynı türden çoklu veri taşır:

```ts
const roles: string[] = ["admin", "manager", "user"];
```

Object ilişkili verileri bir arada tutar:

```ts
const user: {
  id: string;
  email: string;
  isActive: boolean;
} = {
  id: "user-1",
  email: "admin@example.com",
  isActive: true,
};
```

Object array gerçek projelerde çok yaygındır:

```ts
const users: {
  id: string;
  email: string;
  isActive: boolean;
}[] = [
  { id: "user-1", email: "admin@example.com", isActive: true },
  { id: "user-2", email: "user@example.com", isActive: false },
];
```

---

## 5. Optional ve readonly properties

Optional property:

```ts
const user: {
  email: string;
  lastLoginAt?: string;
} = {
  email: "admin@example.com",
};
```

`lastLoginAt` olabilir ama olmak zorunda değildir.

Readonly property:

```ts
const auditLog: {
  readonly id: string;
  action: string;
} = {
  id: "log-1",
  action: "LOGIN",
};
```

Bu hatalıdır:

```ts
auditLog.id = "log-2";
```

`readonly` özellikle id, createdAt, audit log id, permission key gibi değişmemesi gereken alanlarda faydalıdır.

---

## 6. Functions

Fonksiyonlar typed input alır ve typed output üretir.

```ts
function canLogin(isActive: boolean, failedAttempts: number): boolean {
  return isActive && failedAttempts < 5;
}
```

Object parametre:

```ts
function printUser(user: { email: string; isActive: boolean }): void {
  console.log(`${user.email} active: ${user.isActive}`);
}
```

Object return:

```ts
function createUser(email: string): {
  email: string;
  isActive: boolean;
} {
  return {
    email,
    isActive: true,
  };
}
```

Callback function type:

```ts
function processEmail(
  email: string,
  formatter: (email: string) => string
): string {
  return formatter(email);
}
```

Bu temel ileride array methods, React event handlers, Cypress callbacks ve reusable utility fonksiyonları için çok önemli.

---

## 7. Array methods

Method seçme rehberi:

```txt
Dönüştürmek       -> map
Filtrelemek       -> filter
İlk eşleşeni bul  -> find
Var mı kontrol et -> some / includes
Hepsi uygun mu    -> every
Özet çıkarmak     -> reduce
Yan etki yapmak   -> forEach
```

Örnekler:

```ts
const activeUsers = users.filter(function (user) {
  return user.isActive;
});

const userEmails = users.map(function (user) {
  return user.email;
});

const adminUser = users.find(function (user) {
  return user.role === "admin";
});

const hasAdmin = users.some(function (user) {
  return user.role === "admin";
});
```

`find` sonucu `undefined` olabilir:

```ts
const user = users.find(function (user) {
  return user.id === "missing-id";
});

if (user === undefined) {
  console.log("User not found");
}
```

Bu kontrol alışkanlığı gerçek projelerde çok önemlidir.

---

## 8. Collections: Array, Set, Map, Record

Java ile kıyas:

```txt
Java                         TypeScript / JavaScript
----------------------------------------------------
List<T> / ArrayList<T>        T[]
HashSet<T>                    Set<T>
HashMap<K, V>                 Map<K, V>
Map<String, Value>            Record<string, Value>
```

Pratik seçim:

```txt
Sıralı liste/veri akışı              -> Array
Unique değerler                      -> Set
Runtime key-value lookup             -> Map
Sabit config/label/lookup object     -> Record
```

Set:

```ts
const permissions = new Set<string>(["read:user", "update:user"]);

permissions.has("read:user"); // true
```

Map:

```ts
const usersById = new Map<string, { id: string; email: string }>();

usersById.set("user-1", {
  id: "user-1",
  email: "admin@example.com",
});

const user = usersById.get("user-1");
```

`Map.get()` sonucu `undefined` olabilir.

Record:

```ts
const roleLabels: Record<"admin" | "manager" | "user", string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};
```

---

## 9. Bu phase'den sonra ne seviyedeyiz?

Bu phase sonunda artık şunları yazabilecek temel seviyedesin:

```ts
const users: {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}[] = [
  { id: "user-1", email: "admin@example.com", role: "admin", isActive: true },
  { id: "user-2", email: "user@example.com", role: "user", isActive: false },
];

function getActiveUserEmails(
  users: { id: string; email: string; role: string; isActive: boolean }[]
): string[] {
  return users
    .filter(function (user) {
      return user.isActive;
    })
    .map(function (user) {
      return user.email;
    });
}

const activeEmails = getActiveUserEmails(users);
```

Ama burada bir problem var:

```ts
{ id: string; email: string; role: string; isActive: boolean }
```

Bu shape'i tekrar tekrar yazıyoruz.

Bu sürdürülebilir değil.

İşte sıradaki Phase 2 bunun için var.

---

## 10. Phase 2'de ne çözeceğiz?

Phase 2'de şu soruya odaklanacağız:

> Gerçek proje modellerini tekrar etmeden, daha okunabilir ve güvenli şekilde nasıl tanımlarız?

Başlayacağımız konu:

```txt
07-type-aliases/
```

Örneğin şunu yazmaya başlayacağız:

```ts
type User = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
};
```

Sonra:

```ts
function getActiveUserEmails(users: User[]): string[] {
  return users
    .filter(function (user) {
      return user.isActive;
    })
    .map(function (user) {
      return user.email;
    });
}
```

Bu daha okunabilir, tekrar kullanılabilir ve gerçek projeye daha yakındır.

---

## Kısa kapanış

Phase 1 bize TypeScript'in temel yapı taşlarını verdi.

Ama hâlâ şu eksikler var:

- tekrar kullanılabilir domain type yazmak
- role/status gibi değerleri daraltmak
- object shape'lerini merkezi hale getirmek
- union types ile daha güvenli modelleme yapmak
- API result gibi success/error yapılarını güvenli tasarlamak

Bunlar Phase 2'nin konusu olacak.