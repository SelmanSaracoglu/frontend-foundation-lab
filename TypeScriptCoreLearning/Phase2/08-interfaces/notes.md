# 08 - Interfaces: Gerçek projelerde birçok veri object olarak modellenir:

{
id: "user-1",
email: "admin@example.com",
isActive: true
}

Bu object shape'i tekrar tekrar kullanmak yerine ona bir isim veririz. Bunu `type alias` ile yapabiliyorduk:

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};
```

Aynı şeyi `interface` ile de yapabiliriz:

```ts
interface User {
  id: string;
  email: string;
  isActive: boolean;
}
```

## Basit interface

```ts
interface User {
  id: string;
  email: string;
  isActive: boolean;
}

const user: User = {
  id: "u1",
  email: "admin@example.com",
  isActive: true,
};
```

Burada `User`, object'in sahip olması gereken alanları tanımlar. Eksik alan varsa TypeScript hata verir:

```ts
const invalidUser: User = {
  id: "u1",
  email: "admin@example.com",
};
```

Bu object'te `isActive` eksik olduğu için geçerli değildir.

## Interface içinde optional property

Type alias'ta olduğu gibi interface içinde de optional property kullanabiliriz.

```ts
interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl?: string;
}
```

`avatarUrl` opsiyoneldir.

```ts
const profile: UserProfile = {
  id: "profile-1",
  displayName: "Ada",
};
```

Bu geçerlidir.

```ts
const profileWithAvatar: UserProfile = {
  id: "profile-2",
  displayName: "Grace",
  avatarUrl: "https://example.com/avatar.png",
};
```

Bu da geçerlidir.

Optional property gerçek projelerde çok yaygındır çünkü API'den gelen her field her zaman dolu olmayabilir.

## Interface içinde readonly property: Interface içinde `readonly` kullanabiliriz.

```ts
interface Product {
  readonly id: string;
  name: string;
  price: number;
}
```

```ts
const product: Product = {
  id: "product-1",
  name: "Keyboard",
  price: 120,
};

product.name = "Mechanical Keyboard"; // OK
product.id = "product-2"; // Error
```

## Interface function parameter olarak kullanılabilir

```ts
interface User {
  id: string;
  email: string;
  isActive: boolean;
}

function sendPasswordResetEmail(user: User): void {
  console.log(`Password reset email sent to ${user.email}`);
}
```

Bu function açıkça bir `User` beklediğini söyler. Inline type yerine interface kullanmak okunabilirliği artırır. Daha zor okunan versiyon:

```ts
function sendPasswordResetEmail(user: {
  id: string;
  email: string;
  isActive: boolean;
}): void {
  console.log(user.email);
}
```

Daha okunabilir versiyon:

```ts
function sendPasswordResetEmail(user: User): void {
  console.log(user.email);
}
```

## Interface return type olarak kullanılabilir

```ts
interface ApiResponse {
  success: boolean;
  message: string;
}

function createSuccessResponse(message: string): ApiResponse {
  return {
    success: true,
    message,
  };
}
```

Bu pattern ileride API response, backend handler, test assertion ve security logging konularında çok kullanılacak.

## Nested interface: Interface başka interface'leri kullanabilir.

```ts
interface Address {
  city: string;
  country: string;
}
interface Customer {
  id: string;
  email: string;
  address: Address;
}
```

```ts
const customer: Customer = {
  id: "customer-1",
  email: "customer@example.com",
  address: {
    city: "Berlin",
    country: "Germany",
  },
};
```

Bu yapı domain modelini daha okunabilir hale getirir.
`address: { city: string; country: string }` yerine `address: Address` yazmak daha anlamlıdır.

## Interface array içinde kullanılabilir

```ts
interface Course {
  id: string;
  title: string;
  isPublished: boolean;
}
const courses: Course[] = [
  {
    id: "course-1",
    title: "TypeScript Core",
    isPublished: true,
  },
  {
    id: "course-2",
    title: "React Testing",
    isPublished: false,
  },
];
```

Burada `courses`, sadece `Course` shape'ine uygun object'lerden oluşabilir.

## Interface extends: Interface'lerin güçlü yanlarından biri `extends` kullanarak genişletilebilmesidir.

```ts
interface AuditFields {
  createdAt: string;
  updatedAt: string;
}
interface User extends AuditFields {
  id: string;
  email: string;
}
```

Bu durumda `User`, hem kendi alanlarını hem de `AuditFields` alanlarını ister.

```ts
const user: User = {
  id: "user-1",
  email: "admin@example.com",
  createdAt: "2026-01-01",
  updatedAt: "2026-01-02",
};
```

Type alias tarafında bunu intersection ile yapmıştık:

```ts
type User = {
  id: string;
  email: string;
} & AuditFields;
```

Interface tarafında ise genelde `extends` daha okunabilir olur.

## Interface declaration merging: Interface'lerin type alias'tan önemli bir farkı vardır: aynı isimde birden fazla interface tanımlanırsa TypeScript bunları birleştirir.

```ts
interface User {
  id: string;
}
interface User {
  email: string;
}
```

TypeScript bunu şöyle yorumlar:

```ts
interface User {
  id: string;
  email: string;
}
```

Bu davranışa declaration merging denir.

```ts
const user: User = {
  id: "u1",
  email: "admin@example.com",
};
```

Bu geçerlidir. Bu özellik bazı library veya framework type genişletmelerinde faydalıdır. Ama uygulama kodunda bilinçsiz kullanılırsa kafa karıştırabilir. Başlangıçta aynı interface'i farklı yerlerde tekrar açmak yerine tek yerde net tanımlamak daha iyidir.

## Type alias ile interface arasındaki pratik fark: İkisi de object shape tanımlayabilir.

```ts
type UserType = {
  id: string;
  email: string;
};

interface UserInterface {
  id: string;
  email: string;
}
```

## Type alias daha genel amaçlıdır: Type alias sadece object için değildir.

```ts
type UserId = string;
type Status = "active" | "inactive";
type StringOrNumber = string | number;
```

Interface bunlar için kullanılmaz. Şu interface ile yapılamaz:

```ts
interface Status = "active" | "inactive"; // geçersiz
```

Bu yüzden union, literal union, primitive alias gibi konularda `type` kullanırız.

## Interface object modellerde okunabilir olabilir

Object model tanımlarken interface çok doğal görünür:

```ts
interface User {
  id: string;
  email: string;
  isActive: boolean;
}
```

Özellikle `extends` ile genişletme okunaklıdır:

```ts
interface AdminUser extends User {
  permissions: string[];
}
```

Bu yüzden birçok codebase object domain modellerinde interface kullanır.

## Hangisini kullanmalıyım?: Object shape tanımlıyorsan ikisi de olur.

```ts
type User = {
  id: string;
  email: string;
};
```

```ts
interface User {
  id: string;
  email: string;
}
```

Ama şu ayrım işine yarar:
`type` kullan:

- union type yazıyorsan
- literal union yazıyorsan
- primitive alias yazıyorsan
- intersection composition tercih ediyorsan
- complex type expression gerekiyorsa

`interface` kullan:

- sadece object shape tanımlıyorsan
- `extends` ile genişletme okunabilir olacaksa
- bir library type'ını genişletmen gerekiyorsa
- takım standardı interface ise

Gerçek projelerde en önemlisi tutarlılıktır.
Bir ekip object modeller için interface kullanıyorsa ona uy.
Bir ekip her şey için type alias kullanıyorsa ona uy.
Kod standardı, kişisel tercihten daha önemlidir.

## Interface validation yapar mı?

Hayır. Interface sadece compile-time type kontrolü sağlar.

```ts
interface EmailLoginRequest {
  email: string;
  password: string;
}
```

Bu interface, email'in gerçekten email formatında olduğunu garanti etmez.

```ts
const request: EmailLoginRequest = {
  email: "not-an-email",
  password: "123456",
};
```

TypeScript buna izin verir çünkü `email` teknik olarak string'dir.
Gerçek validation için runtime validation gerekir. Buna ileride backend/API konularında geleceğiz.

## Interface runtime'da var mı?

Hayır. Interface JavaScript çıktısında yoktur.

```ts
interface User {
  id: string;
  email: string;
}
```

Bu sadece TypeScript compiler için vardır. Runtime'da `User` diye bir şey yoktur.
Bu yüzden şunu yapamayız:

```ts
if (user instanceof User) {
  // geçersiz
}
```

Çünkü `User` bir JavaScript class veya runtime value değildir. Bu ayrım çok önemlidir:
TypeScript type sistemi compile-time'dadır. JavaScript kodu runtime'da çalışır.

## Gerçek proje bakışı

Bir backend API düşünelim.

```ts
interface CreateUserRequest {
  email: string;
  password: string;
  displayName: string;
}

interface User {
  readonly id: string;
  email: string;
  displayName: string;
  isActive: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
}
```

Bu interface'ler sadece type kontrolü sağlamaz. Aynı zamanda uygulamanın domain dilini görünür hale getirir. Kod okuyan biri şunu daha hızlı anlar:

- kullanıcı oluşturmak için hangi veri gerekir
- user modelinde hangi alanlar vardır
- API response nasıl görünür
  Bu okunabilirlik büyük projelerde çok değerlidir.

## Kısa özet

Interface, object shape tanımlamak için kullanılan TypeScript yapısıdır. Şunlar için kullanılır:

- domain modelleri
- request modelleri
- response modelleri
- nested object modelleri
- function parameter ve return type'ları
- genişletilebilir object yapıları

Type alias ile interface çoğu object modelde benzer işi yapabilir.
