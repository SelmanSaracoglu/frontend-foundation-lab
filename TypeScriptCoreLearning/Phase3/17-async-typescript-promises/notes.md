# 15 - Async TypeScript & Promises

Bu milestone’da TypeScript ile async işlemleri güvenli modellemeyi öğreneceğiz.

Gerçek projelerde birçok işlem async çalışır:
- API isteği
- database sorgusu
- dosya okuma
- authentication kontrolü
- token yenileme
- external servis çağrısı

TypeScript burada bize şunu gösterir:
>>> “Bu fonksiyon hemen değer döndürmüyor. Gelecekte bir değer döndürecek.”

Bunun tipi `Promise<T>` ile ifade edilir.

# Promise<T> nedir?
```ts
Promise<User>
```

şu anlama gelir:
> “Bu işlem tamamlandığında User dönecek.”

```ts
type User = {
  id: number;
  email: string;
};

async function getUser(): Promise<User> {
  return {
    id: 1,
    email: "admin@example.com",
  };
}
```

`async` fonksiyonlar her zaman Promise döner.
Bu yüzden bu fonksiyonun gerçek dönüş tipi `User` değil, `Promise<User>` olur.

# await
Promise içindeki değere ulaşmak için `await` kullanırız.

```ts
const user = await getUser();
console.log(user.email);
```

Burada `user` artık `User` tipindedir.
Ama `await` sadece async fonksiyon içinde kullanılmalıdır.
```ts
async function main(): Promise<void> {
  const user = await getUser();
  console.log(user.email);
}
```
# Async return type
Şu iki fonksiyon benzer sonucu üretir:

```ts
async function getName(): Promise<string> {
  return "Ada";
}
```

```ts
function getName(): Promise<string> {
  return Promise.resolve("Ada");
}
```

`async` kullandığımızda TypeScript dönüşü otomatik Promise içine sarar.

# Async error handling
Async fonksiyon içinde hata fırlatılırsa Promise reject olur.
```ts
async function getUserOrThrow(id: number): Promise<User> {
  if (id <= 0) {
    throw new Error("Invalid user id");
  }

  return {
    id,
    email: "user@example.com",
  };
}
```

Bunu kullanırken `try/catch` gerekir:
```ts
try {
  const user = await getUserOrThrow(0);
  console.log(user.email);
} catch {
  console.log("Something went wrong");
}
```

# Async Result modeli

Beklenen hata durumlarında `throw` yerine typed result kullanabiliriz.
```ts
type AppError = {
  code: "INVALID_INPUT" | "USER_NOT_FOUND";
  message: string;
};

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };
```

Async fonksiyonlarda bu şöyle olur:
```ts
async function findUserById(id: number): Promise<Result<User>> {
  if (id <= 0) {
    return {
      success: false,
      error: {
        code: "INVALID_INPUT",
        message: "User id must be positive",
      },
    };
  }

  return {
    success: true,
    data: {
      id,
      email: "user@example.com",
    },
  };
}
```

Burada return type:
```ts
Promise<Result<User>>
```

Yani:
>>> “Bu async işlem tamamlandığında ya başarılı User sonucu ya da typed error dönecek.”

# Promise<Result<T>> nasıl okunur?

```ts
Promise<Result<User>>
```

Bunu dıştan içe oku:

1. `Promise<...>`: Bu işlem async.
2. `Result<User>`: İşlem bitince success/error sonucu gelecek.
3. Success ise `User`.
4. Error ise `AppError`.

Bu yapı gerçek projelerde çok kullanışlıdır. Özellikle:
- API client fonksiyonları
- auth işlemleri
- permission checks
- validation işlemleri
- external service wrapper’ları

için uygundur.

# Throw mu, Result mı?
## Throw
Beklenmeyen, teknik veya kritik hatalarda daha uygundur. Örnekler:
- database bağlantısı tamamen çöktü
- config okunamadı
- beklenmeyen sistem hatası oluştu

## Result
Beklenen iş kuralı hatalarında daha uygundur. Örnekler:
- kullanıcı bulunamadı
- input geçersiz
- yetki yok
- ürün stokta yok
- login bilgileri yanlış

# Promise<void>
Bazı async işlemler veri döndürmez.

```ts
async function writeAuditLog(action: string): Promise<void> {
  console.log(`Audit log written: ${action}`);
}
```

Bu fonksiyon sadece işi yapar, sonuç verisi döndürmez.

# Kısa özet

- `async` fonksiyonlar her zaman Promise döner.
- `Promise<T>`, gelecekte T dönecek işlem demektir.
- `await`, Promise içindeki değeri çıkarır.
- Async hatalar `try/catch` ile yakalanır.
- Beklenen hata durumları için `Promise<Result<T>>` çok kullanışlıdır.
- Throw ve Result farklı amaçlara hizmet eder.