# 04 - Arrays and Objects

## Array type yazımı

TypeScript'te array type yazmanın iki yaygın yolu vardır.

```ts
const roles: string[] = ["admin", "manager", "user"];
```

```ts
const permissions: Array<string> = ["read:user", "delete:user"];
```

## Object type annotation

Bir object'in şeklini doğrudan type annotation ile yazabiliriz:

```ts
const user: {
  email: string;
  role: string;
  isActive: boolean;
} = {
  email: "admin@example.com",
  role: "admin",
  isActive: true,
};
```

Burada object için bir contract yazmış olduk. Eksik property hata verir.

## Object array

Gerçek projede çok sık object array kullanırız.

```ts
const users: {
  id: string;
  email: string;
  isActive: boolean;
}[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    isActive: true,
  },
  {
    id: "user-2",
    email: "user@example.com",
    isActive: false,
  },
];
```

Burada `users` bir array'dir.

## Optional properties

Bazı object property'leri her zaman olmayabilir.
Örneğin bir kullanıcının son login zamanı olmayabilir.

```ts
const user: {
  email: string;
  lastLoginAt?: string;
} = {
  email: "new-user@example.com",
};
```

Yani şu da geçerli:

```ts
const userWithLogin: {
  email: string;
  lastLoginAt?: string;
} = {
  email: "admin@example.com",
  lastLoginAt: "2026-05-09T10:00:00Z",
};
```

## Optional property kullanırken kontrol gerekir

Şu risklidir:

```ts
const user: {
  email: string;
  lastLoginAt?: string;
} = {
  email: "new-user@example.com",
};

console.log(user.lastLoginAt.toUpperCase());
```

Çünkü `lastLoginAt` olmayabilir. Daha güvenli yaklaşım:

```ts
if (user.lastLoginAt !== undefined) {
  console.log(user.lastLoginAt.toUpperCase());
}
```

veya:

```ts
console.log(user.lastLoginAt?.toUpperCase());
```

`?.` optional chaining olarak bilinir. Değer varsa çalışır, yoksa hata fırlatmaz.

## readonly properties

Bazı property'lerin oluşturulduktan sonra değişmesini istemeyiz.

```ts
const user: {
  readonly id: string;
  email: string;
} = {
  id: "user-1",
  email: "admin@example.com",
};
```

Şu hatalıdır:

```ts
user.id = "user-2";
```

Çünkü `id` readonly tanımlanmıştır.

Ama şu geçerlidir:

```ts
user.email = "new-admin@example.com";
```

Çünkü `email` readonly değildir.

## Nested objects

Object içinde object olabilir.

```ts
const user: {
  id: string;
  profile: {
    displayName: string;
    bio?: string;
  };
} = {
  id: "user-1",
  profile: {
    displayName: "Ada Lovelace",
  },
};
```

Nested object gerçek projede çok yaygındır:

- user.profile
- order.customer
- session.user
- auditLog.actor
- apiResponse.data

Ama nested object type'ları büyüdükçe inline yazmak zorlaşır.
İleride `type alias` ve `interface` ile bunu temizleyeceğiz.

## Object type'ları inline yazmak ne zaman mantıklı?

Küçük ve tek seferlik yapılarda inline object type kabul edilebilir:

```ts
function printUser(user: { email: string; isActive: boolean }): void {
  console.log(user.email);
}
```

Ama aynı shape birden fazla yerde kullanılacaksa inline yazmak kötüleşir.
Örneğin bunu tekrar tekrar yazmak istemeyiz:

```ts
{
  id: string;
  email: string;
  isActive: boolean;
}
```

Bunun yerine ileride şöyle yapacağız:

```ts
type User = {
  id: string;
  email: string;
  isActive: boolean;
};
```

Şimdilik object shape mantığını öğreniyoruz.

## Array ve object birlikte gerçek projede nasıl kullanılır?

Örneğin elimizde user listesi var:

```ts
const users: {
  id: string;
  email: string;
  isActive: boolean;
}[] = [
  { id: "user-1", email: "admin@example.com", isActive: true },
  { id: "user-2", email: "disabled@example.com", isActive: false },
];
```

## Security açısından object shape

Security tarafında object shape çok önemlidir.
Örneğin backend'den şöyle bir login response beklediğini düşün:

```ts
const loginResponse: {
  token: string;
  expiresInSeconds: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
} = {
  token: "jwt-token",
  expiresInSeconds: 3600,
  user: {
    id: "user-1",
    email: "admin@example.com",
    role: "admin",
  },
};
```

Bu yapı sayesinde kod içinde şunlar netleşir:

- token string olmalı
- expiration number olmalı
- user objesi id, email, role içermeli

Ama yine önemli bir not:
TypeScript runtime veriyi otomatik doğrulamaz.
API'den gelen veri gerçekten bu shape'te mi, bunu ileride validation/type guard ile kontrol edeceğiz.
