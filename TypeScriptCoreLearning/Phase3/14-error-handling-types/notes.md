# 14 - Error Handling Types
Bu milestone’da hata durumlarını TypeScript ile daha güvenli modellemeyi öğreneceğiz.

Gerçek projelerde her işlem başarılı olmaz:
- API isteği başarısız olabilir
- kullanıcı verisi eksik olabilir
- JSON parse patlayabilir
- yetki kontrolü başarısız olabilir
- dış sistem beklenmeyen veri dönebilir

Bu yüzden sadece başarılı veri tipini modellemek yeterli değildir.

Kötü yaklaşım:
```ts
function getUserEmail(user: User): string {
  return user.email;
}
```

Gerçek hayatta kullanıcı bulunamayabilir, veri eksik olabilir veya işlem başarısız olabilir.

# Throwing errors
JavaScript’te hata fırlatabiliriz:
```ts
function getUserEmail(user: User | null): string {
  if (user === null) {
    throw new Error("User not found");
  }

  return user.email;
}
```

Bu yaklaşım bazen doğrudur. Özellikle:
- gerçekten beklenmeyen durumlarda
- programın devam etmesi mantıklı değilse
- framework veya runtime hata yönetimi kullanıyorsak

Ama dezavantajı şudur: Fonksiyon imzasından hata fırlatabileceği net görünmez.
```ts
const email = getUserEmail(user);
```
Bu satıra bakınca fonksiyonun hata fırlatabileceğini type üzerinden anlamayız.

# Typed Result modeli
Alternatif olarak success/error durumunu type ile modelleyebiliriz.

```ts
type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
```
Bu yapı discriminated union’dır. Başarılı durumda `data` vardır.
Başarısız durumda `error` vardır.

```ts
function findUserEmail(user: User | null): Result<string> {
  if (user === null) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    data: user.email,
  };
}
```

Kullanırken TypeScript bizi doğru kontrol yapmaya zorlar:
```ts
const result = findUserEmail(user);

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}
```

# Neden Result modeli kullanılır?
Result modeli, beklenen hata durumlarını açık hale getirir. Örnek beklenen hatalar:
- user not found
- invalid input
- unauthorized
- forbidden
- validation failed
- resource already exists

Bunlar her zaman “exception” olmak zorunda değildir. Bunlar çoğu zaman iş kuralı sonucudur.

# Throw vs Result

## Throw kullanmak mantıklı olabilir
```ts
function parseConfigFile(path: string): Config {
  // dosya yoksa veya bozuksa uygulama başlayamayabilir
}
```
Beklenmeyen veya kritik durumlarda throw mantıklıdır.

## Result kullanmak mantıklı olabilir
```ts
function login(email: string, password: string): Result<Session> {
  // yanlış şifre beklenen bir hata durumudur
}
```
Yanlış şifre uygulamanın çökmesini gerektirmez. Bu yüzden typed result daha kontrollüdür.

# Error code kullanmak
Sadece string error mesajı bazen yeterli değildir. Daha profesyonel yaklaşım:
```ts
type AppError = {
  code: "USER_NOT_FOUND" | "INVALID_INPUT" | "UNAUTHORIZED";
  message: string;
};
```

Sonra Result içinde kullanabiliriz:
```ts
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
Bu yaklaşım test, logging, UI mesajı ve API response için daha iyidir.

# Security açısından neden önemli?
Hata mesajları dikkatli tasarlanmalıdır. 

Kötü örnek:
```ts
{
  code: "LOGIN_FAILED",
  message: "Password for admin@example.com is incorrect"
}
```

Bu fazla bilgi sızdırır. Daha güvenli örnek:
```ts
{
  code: "LOGIN_FAILED",
  message: "Invalid email or password"
}
```
Hata tipleri sadece geliştirici deneyimi değil, güvenlik için de önemlidir.

# Kısa özet
- Throw, hata fırlatır ama fonksiyon tipinden açık görünmez.
- Result modeli başarı ve hatayı type seviyesinde görünür yapar.
- Beklenen hata durumları için Result modeli çok kullanışlıdır.
- Error code kullanmak string mesajlardan daha sürdürülebilirdir.
- Güvenli sistemlerde hata mesajları fazla detay sızdırmamalıdır.

