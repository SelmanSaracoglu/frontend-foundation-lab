# 01 - TypeScript Intro

TypeScript, JavaScript'in üzerine eklenen bir type system'dir.

JavaScript çalışırken hata verir.
TypeScript ise birçok hatayı kodu çalıştırmadan önce yakalamaya çalışır.

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal("100", 2);
```

Bu kod çalışabilir gibi görünür ama aslında güvenilir değildir. Çünkü `price` sayı olması gerekirken string geldi.

TypeScript ile bunu daha güvenli hale getiririz:

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

calculateTotal("100", 2); // TypeScript hata verir
```

Burada TypeScript bize şunu söyler:

> Bu fonksiyon number bekliyor, string gönderemezsin.
> Bu hata uygulama production'a gitmeden önce yakalanır.

## Runtime ve compile-time farkı

Bu ayrım çok önemli.
Runtime, kodun gerçekten çalıştığı zamandır.
Compile-time ise TypeScript'in kodunu kontrol ettiği zamandır.

```ts
const userName: string = "Ada";

console.log(userName.toUpperCase());
```

TypeScript bu kodu çalıştırmadan önce kontrol eder:

- `userName` gerçekten string mi?
- `toUpperCase()` string üzerinde var mı?

Eğer yanlış bir şey varsa kodu çalıştırmadan önce uyarır.
Ama TypeScript runtime'da çalışmaz. TypeScript kodu JavaScript'e çevrilir.
Yani tarayıcı veya Node.js aslında TypeScript değil, JavaScript çalıştırır.

## TypeScript ne yapmaz?

TypeScript önemli ama sihirli değildir. Şunları tek başına garanti etmez:

- API'den gerçekten doğru veri geldiğini
- Kullanıcının kötü niyetli input göndermediğini
- Database verisinin her zaman doğru olduğunu
- Auth ve RBAC kurallarının doğru uygulandığını
- Runtime'da hiç hata olmayacağını

```ts
type User = {
  id: number;
  email: string;
};

const response = await fetch("/api/user");
const user = await response.json();
```

Burada TypeScript `user` değerinin gerçekten `User` olduğunu otomatik olarak bilemez.
Çünkü API'den gelen veri runtime verisidir.
Bu yüzden ileride `unknown`, type guards ve validation konuları önemli olacak.

## Type annotation nedir?

Type annotation, bir değişkene veya fonksiyona açıkça type yazmaktır.

```ts
const email: string = "admin@example.com";
const age: number = 32;
const isActive: boolean = true;
```

Burada TypeScript'e şunu söylüyoruz:

- `email` string olmalı
- `age` number olmalı
- `isActive` boolean olmalı

## Type inference nedir?

Type inference, TypeScript'in type'ı kendisinin anlamasıdır.

```ts
const email = "admin@example.com";
const age = 32;
const isActive = true;
```

Burada type yazmadık ama TypeScript şunu anlar:

- `email` string
- `age` number
- `isActive` boolean

Gerçek projelerde basit değerlerde inference kullanmak normaldir.
Ama fonksiyon parametreleri, API modelleri, domain modelleri gibi yerlerde açık type yazmak daha okunabilir ve güvenlidir.

## TypeScript gerçek projede nerede işimize yarar?

Frontend tarafında:

```ts
const userName: string = "Ada";
```

React'te component props tiplenir:

```ts
type UserCardProps = {
  name: string;
  email: string;
};
```

Backend'de request body ve response modelleri tiplenir:

```ts
type CreateUserRequest = {
  email: string;
  password: string;
};
```

Test automation'da API response beklenen yapıya göre kontrol edilir:

```ts
type LoginResponse = {
  token: string;
  userId: string;
};
```

Security tarafında role ve permission modelleri güvenli hale getirilir:

```ts
type Role = "admin" | "manager" | "user";
```

Bu yüzden TypeScript sadece frontend dili değildir. Modern full-stack, testing ve security automation için çok güçlü bir temel sağlar.
