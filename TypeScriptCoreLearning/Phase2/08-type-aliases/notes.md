# 07 - Type Aliases

Gerçek uygulamalarda aynı veri yapıları tekrar tekrar kullanılır.
Örneğin bir kullanıcı modeli:

{
id: string;
email: string;
role: string;
}

Bu yapı frontend formunda, backend response'unda, authorization logic içinde, audit log kayıtlarında veya test data oluştururken tekrar kullanılabilir. Eğer bu shape'i her yerde elle yazarsak:

- kod tekrar eder
- değişiklik yapmak zorlaşır
- bazı yerlerde shape yanlış yazılabilir
- domain model okunabilirliği azalır
- refactor riski artar

Type alias, bir tipe isim vermemizi sağlar.

```ts
type User = {
  id: string;
  email: string;
  role: string;
};
```

Artık `User` ismi, bu object shape'i temsil eder.

## Basit type alias

```ts
type UserId = string;
const userId: UserId = "user-123";
```

Burada `UserId`, aslında `string` için bir isimdir. Bu runtime'da yeni bir type oluşturmaz. JavaScript çıktısında `UserId` diye bir şey kalmaz. Type alias sadece TypeScript compile-time kontrolü içindir.

```ts
type UserId = string;
```

JavaScript tarafında gerçek bir değer üretmez.

## Object type alias: Type alias en çok object modelleri için kullanılır.

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};
const user: User = {
  id: "u1",
  email: "admin@example.com",
  isActive: true,
};
```

Bu kodda `User`, uygulamadaki kullanıcı modelinin shape'ini temsil eder.

## Type alias ile function parameter kullanımı

Aynı object shape'i function parameter olarak kullanabiliriz.

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};
function sendWelcomeEmail(user: User): void {
  console.log(`Welcome email sent to ${user.email}`);
}
```

Bu, function'ın hangi veri yapısını beklediğini daha okunabilir hale getirir.
Kötü okunabilir versiyon:

```ts
function sendWelcomeEmail(user: {
  id: string;
  email: string;
  isActive: boolean;
}): void {
  console.log(user.email);
}
```

Daha iyi versiyon:

```ts
function sendWelcomeEmail(user: User): void {
  console.log(user.email);
}
```

## Type alias ile return type kullanımı

Type alias sadece input için değil, output için de kullanılabilir.

```ts
type ApiResult = {
  success: boolean;
  message: string;
};

function createSuccessResult(message: string): ApiResult {
  return {
    success: true,
    message,
  };
}
```

Bu yapı ileride backend API response pattern'larında çok işimize yarayacak.

## Optional property kullanımı

Phase 1'de optional property görmüştük. Type alias içinde de kullanılabilir.

```ts
type UserProfile = {
  id: string;
  displayName: string;
  bio?: string;
};
```

Burada `bio` opsiyoneldir. Yani şu geçerlidir:

```ts
const profile: UserProfile = {
  id: "p1",
  displayName: "Ada",
};
```

Bu da geçerlidir:

```ts
const profileWithBio: UserProfile = {
  id: "p2",
  displayName: "Grace",
  bio: "Backend engineer",
};
```

Optional property özellikle gerçek projelerde çok yaygındır çünkü her veri her zaman gelmeyebilir.

- kullanıcı profilinde `avatarUrl`
- siparişte `discountCode`
- audit log'da `metadata`
- course modelinde `description`

## Readonly property kullanımı: Type alias içinde readonly property de yazabiliriz.

```ts
type Product = {
  readonly id: string;
  name: string;
  price: number;
};
```

Bu, `id` alanının sonradan değiştirilmesini engeller.

```ts
const product: Product = {
  id: "prod-1",
  name: "Keyboard",
  price: 120,
};
product.name = "Mechanical Keyboard"; // OK
product.id = "prod-2"; // Error
```

Gerçek projelerde bazı alanların değişmemesi gerekir. TypeScript bunu compile-time'da yakalayabilir.

## Type alias ile array kullanımı: Bir type alias array içinde de kullanılabilir.

```ts
type Course = {
  id: string;
  title: string;
  isPublished: boolean;
};

const courses: Course[] = [
  {
    id: "c1",
    title: "TypeScript Core",
    isPublished: true,
  },
  {
    id: "c2",
    title: "React Testing",
    isPublished: false,
  },
];
```

Burada `courses`, sadece `Course` shape'ine uygun object'lerden oluşabilir.

## Nested object type alias: Gerçek veriler genelde iç içe object yapısına sahiptir.

```ts
type Address = {
  city: string;
  country: string;
};

type Customer = {
  id: string;
  email: string;
  address: Address;
};
```

Burada `Customer` tipi, `Address` tipini kullanır.

```ts
const customer: Customer = {
  id: "cust-1",
  email: "customer@example.com",
  address: {
    city: "Berlin",
    country: "Germany",
  },
};
```

Bu yaklaşım kodun domain dilini güçlendirir.
`address: { city: string; country: string }` yazmak yerine `address: Address` yazmak daha okunabilirdir.

## Type alias composition: Type alias'ları birleştirebiliriz.

```ts
type AuditFields = {
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  email: string;
} & AuditFields;
```

Burada `User`, hem kendi alanlarına hem de `AuditFields` alanlarına sahip olmalıdır.

```ts
const user: User = {
  id: "u1",
  email: "admin@example.com",
  createdAt: "2026-01-01",
  updatedAt: "2026-01-02",
};
```

Bu yapı gerçek uygulamalarda tekrar eden alanlar için kullanışlıdır. Örnek tekrar eden alanlar:

- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`
- `deletedAt`
- `isDeleted`
  Ancak başlangıçta fazla composition kullanmak kodu karmaşıklaştırabilir. Önce açık ve okunabilir type'lar yazmak daha iyidir.

## Type alias ve primitive alias kullanımında dikkat

```ts
type Email = string;
type Password = string;
```

Ama TypeScript bu ikisini teknik olarak farklı özel type'lar gibi davranmaz.

```ts
type Email = string;
type Password = string;

const email: Email = "user@example.com";
const password: Password = "secret";

const anotherEmail: Email = password; // TypeScript buna izin verir
```

Çünkü ikisi de aslında `string` alias'ıdır. Yani type alias, primitive type'larda daha çok okunabilirlik sağlar. Gerçek güvenlik veya validation sağlamaz. Email'in gerçekten email formatında olup olmadığını TypeScript tek başına kontrol etmez. Bunun için ileride validation konularına geleceğiz.

## Ne zaman type alias yazmaya gerek yok?

Her küçük şey için type alias yazmak gerekmez.
Eğer aynı shape ikinci kez kullanılacaksa veya domain anlamı taşıyorsa type alias kullanmak mantıklıdır.

## Mental model

> > > Bir type shape'e anlamlı ve tekrar kullanılabilir bir isim vermek. Type alias şunları yapmaz:

- runtime'da veri üretmez
- validation yapmaz
- string formatını garanti etmez
- object'i otomatik olarak immutable yapmaz
- backend'den gelen verinin gerçekten doğru olduğunu kanıtlamaz

Type alias şunları yapar:

- kod tekrarını azaltır
- function imzalarını okunabilir yapar
- domain modellerini görünür hale getirir
- refactor güvenliği sağlar
- yanlış shape kullanımını compile-time'da yakalar

## Kısa özet

Type alias, TypeScript'te tekrar eden veya anlamlı type shape'lere isim vermek için kullanılır.

En yaygın kullanım alanları:

- domain modelleri
- request modelleri
- response modelleri
- array item modelleri
- nested object modelleri
- reusable common fields

Gerçek projelerde type alias, kodun sadece type-safe olmasını değil, aynı zamanda okunabilir ve sürdürülebilir olmasını sağlar.
