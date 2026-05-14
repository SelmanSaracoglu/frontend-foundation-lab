# 15 - Generics

## Amaç

Bu milestone’da TypeScript generics konusunu öğreneceğiz. Generics, aynı kod yapısını farklı type’larla güvenli şekilde tekrar kullanmamızı sağlar.

Ana fikir şudur:

> Kod aynı kalsın, type dışarıdan gelsin.

Gerçek projelerde generics özellikle şu alanlarda çok kullanılır:

- API response modelleri
- pagination yapıları
- reusable helper fonksiyonlar
- form state modelleri
- frontend/backend shared types
- async result yapıları
- test helper’ları
- service/repository katmanları

---

## Problem: Aynı mantığı farklı type’lar için tekrar yazmak

Diyelim ki elimizde iki model var:

```ts
type User = {
  id: string;
  email: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};
```

İlk kullanıcıyı almak için şöyle yazabiliriz:

```ts
function getFirstUser(users: User[]): User | undefined {
  return users[0];
}
```

İlk ürünü almak için tekrar benzer fonksiyon yazarız:

```ts
function getFirstProduct(products: Product[]): Product | undefined {
  return products[0];
}
```

Mantık aynı:

```ts
return items[0];
```

Ama type farklı olduğu için kodu tekrar ettik.

Bu küçük örnekte büyük sorun gibi görünmez. Fakat gerçek projelerde bu tarz tekrarlar şunlara yol açar:

- duplicate code
- daha zor bakım
- daha fazla hata ihtimali
- reusable olmayan helper’lar
- genişledikçe karmaşıklaşan type yapıları

Generics bu problemi çözer.

---

## Generic function nedir?

Generic function, type’ı dışarıdan alabilen fonksiyondur.

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
```

Buradaki `T`, type parameter’dır.

`T` runtime’da çalışan bir JavaScript değeri değildir. Sadece TypeScript’in compile-time type kontrolü için vardır.

Bu fonksiyon şunu söyler:
> Bana hangi type’tan array verirsen, sana aynı type’tan bir değer veya undefined dönerim.

Örnek:

```ts
const firstNumber = getFirst([10, 20, 30]);
// type: number | undefined

const firstName = getFirst(["Ada", "Linus", "Grace"]);
// type: string | undefined
```

TypeScript çoğu zaman generic type’ı kendisi tahmin eder. Buna type inference denir.

Yani genelde şöyle yazmana gerek kalmaz:

```ts
const firstNumber = getFirst<number>([10, 20, 30]);
```

Bunun yerine şu yeterlidir:

```ts
const firstNumber = getFirst([10, 20, 30]);
```

---

## Generic type alias

Generics sadece fonksiyonlarda kullanılmaz. Type alias içinde de kullanılabilir.

Gerçek projelerde en yaygın örneklerden biri API response modelidir.

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
```

Bu type şunu ifade eder:

> Response yapısı aynı, ama `data` alanının type’ı değişebilir.

Kullanım:

```ts
type User = {
  id: string;
  email: string;
};

type Product = {
  id: string;
  name: string;
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: "u1",
    email: "ada@example.com",
  },
};

const productResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: "p1",
    name: "Keyboard",
  },
};
```

Burada response formatı reusable oldu.

Aynı `ApiResponse<T>` yapısı hem user hem product için kullanılabiliyor.

---

## Generic interface

Generic yapılar interface ile de yazılabilir.

```ts
interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
}
```

Bu yapı özellikle API’lerde çok yaygındır.

```ts
type User = {
  id: string;
  email: string;
};

const usersPage: PaginatedResult<User> = {
  items: [
    { id: "u1", email: "ada@example.com" },
    { id: "u2", email: "linus@example.com" },
  ],
  totalItems: 2,
  page: 1,
  pageSize: 10,
};
```

Bu model React’te listeleme ekranlarında, Node/Express API response’larında ve API testlerinde çok işe yarar.

---

## Multiple generic parameters

Bir generic yapı birden fazla type parameter alabilir.

Örnek:

```ts
type Pair<TKey, TValue> = {
  key: TKey;
  value: TValue;
};
```

Kullanım:

```ts
const userRole: Pair<string, "admin" | "user"> = {
  key: "u1",
  value: "admin",
};
```

Daha gerçekçi bir örnek:

```ts
type ApiResult<TData, TError> = {
  data?: TData;
  error?: TError;
};
```

Kullanım:

```ts
type User = {
  id: string;
  email: string;
};

type ValidationError = {
  field: string;
  message: string;
};

const result: ApiResult<User, ValidationError> = {
  error: {
    field: "email",
    message: "Invalid email format",
  },
};
```

Burada hem başarılı data type’ı hem hata type’ı dışarıdan veriliyor.

---

## Generic constraints

Bazen generic type tamamen serbest olmamalıdır.

Mesela şu fonksiyonu düşün:

```ts
function getId<T>(item: T): string {
  return item.id;
}
```

Bu kod hata verir. Çünkü TypeScript `T` içinde `id` alanı olduğunu bilemez.

Bunu constraint ile çözeriz:

```ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

Bu şu anlama gelir:

> T herhangi bir type olabilir, ama en azından `id: string` alanına sahip olmak zorunda.

Kullanım:

```ts
const user = {
  id: "u1",
  email: "ada@example.com",
};

const product = {
  id: "p1",
  name: "Keyboard",
};

getId(user);
getId(product);
```

Ama şu geçersizdir:

```ts
const logEntry = {
  message: "User logged in",
};

getId(logEntry);
```

Çünkü `logEntry` içinde `id` yoktur.

Generic constraints gerçek projelerde çok önemlidir. Çünkü reusable kod yazarken tamamen kontrolsüz type kabul etmek yerine minimum güvenli shape tanımlamamızı sağlar.

---

## Generic default type

Generic type parameter için default type da verilebilir.

```ts
type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
};
```

Bu durumda `T` verilmezse `unknown` kullanılır.

```ts
const response: ApiResponse = {
  success: true,
  data: {
    anything: "can be here",
  },
};
```

Ama çoğu gerçek projede generic type’ı açıkça vermek daha okunaklıdır:

```ts
type User = {
  id: string;
  email: string;
};

const response: ApiResponse<User> = {
  success: true,
  data: {
    id: "u1",
    email: "ada@example.com",
  },
};
```

---

## Generics ve `any` farkı

Şu fonksiyon teknik olarak çalışır:

```ts
function getFirst(items: any[]): any {
  return items[0];
}
```

Ama type güvenli değildir.

```ts
const first = getFirst(["Ada", "Linus"]);

first.toFixed();
```

TypeScript burada hata yakalayamaz çünkü `first` artık `any` olmuştur.

Generic versiyon daha güvenlidir:

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const first = getFirst(["Ada", "Linus"]);

first?.toUpperCase();
```

Burada TypeScript `first` değerinin `string | undefined` olduğunu bilir.

Yani generics, reusable kod yazarken type bilgisini kaybetmememizi sağlar.

---

## Generics ne zaman kullanılır?

Generics şu durumda mantıklıdır:

> Yapı aynı kalıyor, ama içerideki veri type’ı değişiyorsa.

İyi kullanım örnekleri:

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
};
```

```ts
type PaginatedResult<T> = {
  items: T[];
  totalItems: number;
};
```

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
```

Ama her şeyi generic yapmak doğru değildir.

Şu gereksizdir:

```ts
function getUserEmail<T>(user: T): string {
  // T'nin email içerdiğini bilmiyoruz.
  return "email";
}
```

Eğer fonksiyon sadece `User` ile çalışıyorsa generic kullanmaya gerek yoktur.

```ts
type User = {
  id: string;
  email: string;
};

function getUserEmail(user: User): string {
  return user.email;
}
```

Generic kullanmanın amacı “daha havalı type yazmak” değildir.

Amaç:

- tekrar kullanılabilirlik
- type bilgisini korumak
- güvenli abstraction kurmak
- gerçek veri modelini bozmadan ortak yapı oluşturmak

---

## Gerçek proje sezgisi

Bir backend API’de şu response’lar olabilir:

```ts
type UserResponse = {
  success: boolean;
  data: User;
};

type ProductResponse = {
  success: boolean;
  data: Product;
};

type CourseResponse = {
  success: boolean;
  data: Course;
};
```

Bu tekrar yerine şöyle yazmak daha maintainable’dır:

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
};
```

Sonra:

```ts
type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
type CourseResponse = ApiResponse<Course>;
```

Bu yaklaşım ileride React frontend, Node backend, API testing ve shared types konularında çok işimize yarayacak.

---

## Kısa özet

- Generics, type’ı dışarıdan alabilen reusable yapılardır.
- En basit generic syntax: `<T>`.
- Generic function, generic type alias ve generic interface yazılabilir.
- `T`, runtime değeri değil compile-time type bilgisidir.
- Generics, `any` kullanmadan esnek kod yazmamızı sağlar.
- Constraint ile generic type’ın minimum shape’i sınırlandırılabilir.
- Gerçek projelerde API response, pagination, result pattern ve reusable helpers için çok kullanılır.
- Gereksiz generic kullanımı kodu daha iyi yapmaz; sadece karmaşıklaştırır.
