# 13 - Type Guards
Type guard, TypeScript’e şunu söylemenin güvenli yoludur:
>>> “Bu değeri runtime’da kontrol ettim. Artık bu tipe güvenebilirsin.”

Özellikle `unknown` veriyle çalışırken kullanılır. Gerçek kaynaklar:
- API response
- JSON.parse sonucu
- form input
- localStorage
- URL params
- third-party servislerden gelen veri

# Basit narrowing: TypeScript bazı kontrolleri kendisi anlar.
```ts
function printValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value * 2);
  }
}
```

Burada `typeof` sayesinde TypeScript değeri daraltır.

# Object kontrolü

`unknown` bir değerin object olup olmadığını kontrol ederken dikkatli olmalıyız.
```ts
function isObject(value: unknown): boolean {
  return typeof value === "object" && value !== null;
}
```

Çünkü JavaScript’te:
```ts
typeof null // "object"
```

Bu yüzden `value !== null` kontrolü önemlidir.

# Custom type guard
Custom type guard, return type olarak şu syntax’ı kullanır:

```ts
value is Type
```

```ts
type User = {
  id: number;
  email: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}
```
Bu fonksiyon `true` dönerse TypeScript artık `value` değişkenini `User` olarak görür.

```ts
const rawData: unknown = JSON.parse('{"id":1,"email":"a@test.com"}');

if (isUser(rawData)) {
  console.log(rawData.email);
}
```

# Daha doğru property kontrolü
Sadece property var mı diye bakmak çoğu zaman yetmez. Bu yeterince güvenli değildir:
```ts
"id" in value
```
Çünkü `id` olabilir ama yanlış tipte olabilir.

Daha iyi kontrol:
```ts
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "email" in value &&
    typeof value.email === "string"
  );
}
```

Bu yaklaşım gerçek projeye daha yakındır.

# Type guard neden önemli?

Çünkü `as` kullanımı TypeScript’i susturur. Riskli yaklaşım:
```ts
const user = JSON.parse(input) as User;
console.log(user.email.toLowerCase());
```

Güvenli yaklaşım:
```ts
const data: unknown = JSON.parse(input);

if (isUser(data)) {
  console.log(data.email.toLowerCase());
}
```

Birincisi sadece compile-time iddiadır.
İkincisi runtime doğrulamadır.

# Array type guard
API’den liste gelebilir.

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "price" in value &&
    typeof value.price === "number"
  );
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}
```

Burada `every(isProduct)` listedeki bütün elemanların Product olup olmadığını kontrol eder.

# Type guard yazarken dikkat
İyi bir type guard:
- `unknown` input alır
- boolean döner gibi davranır
- return type olarak `value is Type` kullanır
- object için `null` kontrolü yapar
- sadece property varlığına değil property tipine de bakar
- dış veriyi güvenilir kabul etmez

---

# Kısa özet
- Type guard, runtime kontrol ile TypeScript narrowing’i birleştirir.
- `value is Type` syntax’ı custom type guard yazmak için kullanılır.
- API/JSON/user input gibi dış veri kaynakları için çok değerlidir.
- `as Type` doğrulama yapmaz.
- Type guard gerçek kontrol yapar.