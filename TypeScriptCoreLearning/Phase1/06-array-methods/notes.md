# 05 - Array Methods

## forEach

`forEach`, array içindeki her eleman için bir işlem yapar.
Genelde return değeri üretmek için değil, yan etki için kullanılır.
Örneğin log basmak:

```ts
const users = ["admin@example.com", "user@example.com"];

users.forEach(function (email: string): void {
  console.log(email);
});
```

Expected output:

```txt
admin@example.com
user@example.com
```

`forEach` genelde şuralarda kullanılır:

- console log
- her eleman için işlem tetikleme
- test assertion listesi gezme
- migration/script tarzı işler

Ama yeni array üretmek için `forEach` yerine genelde `map` kullanılır.

## map

`map`, array'deki her elemanı başka bir değere dönüştürür ve yeni array döndürür.

```ts
const prices = [100, 200, 300];

const pricesWithTax = prices.map(function (price: number): number {
  return price * 1.2;
});
```

Sonuç:

```ts
[120, 240, 360];
```

`map` gerçek projede çok kullanılır:

- user listesinden email listesi çıkarmak
- product listesinden label listesi üretmek
- API response'u UI modeline çevirmek
- React'te liste render etmek
- test data dönüştürmek

Önemli mental model:

```txt id="6caq7r"
map = dönüştür
```

Array uzunluğu genelde aynı kalır.

---

## filter

`filter`, array içinden koşula uyan elemanları seçer.

```ts
const users = [
  { email: "admin@example.com", isActive: true },
  { email: "disabled@example.com", isActive: false },
];

const activeUsers = users.filter(function (user): boolean {
  return user.isActive;
});
```

Sonuç sadece aktif kullanıcıları içerir.

Mental model:

```txt id="ptffo3"
filter = seç / ele
```

Gerçek projede:

- aktif kullanıcıları bulmak
- stokta olan ürünleri listelemek
- başarısız logları filtrelemek
- permission listesinde sensitive permissionları seçmek
- test sonuçlarından failed olanları bulmak

---

## find

`find`, koşula uyan ilk elemanı döndürür.

```ts
const user = users.find(function (user) {
  return user.email === "admin@example.com";
});
```

Eğer eleman bulunursa object döner.
Bulunmazsa `undefined` döner.

Bu yüzden `find` sonucu kullanmadan önce kontrol etmek gerekir:

```ts
if (user === undefined) {
  console.log("User not found");
} else {
  console.log(user.email);
}
```

Mental model:

```txt id="2iokib"
find = ilk eşleşeni bul
```

Gerçek projede:

- id ile user bulmak
- slug ile course bulmak
- token ile session bulmak
- permission key ile permission bulmak

---

## some

`some`, array içinde en az bir eleman koşulu sağlıyor mu diye kontrol eder.

```ts
const hasAdmin = users.some(function (user): boolean {
  return user.role === "admin";
});
```

Sonuç boolean döner.

Mental model:

```txt id="8ot6s1"
some = en az bir tane var mı?
```

Gerçek projede:

- admin kullanıcı var mı?
- failed test var mı?
- sensitive permission var mı?
- sepet içinde indirimli ürün var mı?
- audit log içinde başarısız login var mı?

---

## every

`every`, array içindeki tüm elemanlar koşulu sağlıyor mu diye kontrol eder.

```ts
const allUsersActive = users.every(function (user): boolean {
  return user.isActive;
});
```

Mental model:

```txt id="76zt2j"
every = hepsi uygun mu?
```

Gerçek projede:

- tüm testler geçti mi?
- tüm kullanıcılar aktif mi?
- tüm ürünler stokta mı?
- tüm inputlar valid mi?
- tüm permissions geçerli mi?

---

## includes

`includes`, primitive array içinde bir değer var mı diye kontrol eder.

```ts
const permissions = ["read:user", "update:user"];

const canReadUser = permissions.includes("read:user");
```

Sonuç boolean döner.

Gerçek projede özellikle permission ve role kontrolünde basit ama yaygındır.

```ts
function hasPermission(
  userPermissions: string[],
  requiredPermission: string,
): boolean {
  return userPermissions.includes(requiredPermission);
}
```

---

## reduce

`reduce`, array'i tek bir sonuca indirger.

Bu sonuç:

- number olabilir
- string olabilir
- object olabilir
- array olabilir

En basit örnek toplam almaktır:

```ts
const prices = [100, 200, 300];

const total = prices.reduce(function (sum: number, price: number): number {
  return sum + price;
}, 0);
```

Sonuç:

```ts
600;
```

Mental model:

```txt id="2buf21"
reduce = özet çıkar / tek sonuca indir
```

Gerçek projede:

- toplam fiyat hesaplama
- failed test sayısı bulma
- role göre kullanıcı gruplama
- permission map üretme
- audit log özetleme

`reduce` güçlüdür ama kolayca karmaşıklaşabilir. Eğer `map`, `filter`, `find` ile daha okunabilir çözülüyorsa önce onları tercih etmek daha mantıklıdır.

---

## Method seçme rehberi

```txt id="y4l41q"
Bir şey mi dönüştüreceksin?       -> map
Bazılarını mı seçeceksin?         -> filter
İlk eşleşeni mi bulacaksın?       -> find
Var mı diye mi bakacaksın?         -> some / includes
Hepsi uygun mu diye mi bakacaksın? -> every
Tek sonuç mu çıkaracaksın?         -> reduce
Sadece her elemanda işlem mi?      -> forEach
```

---

## Callback type inference

Array methodlarında TypeScript çoğu zaman callback parametresinin type'ını kendisi anlar.

```ts
const users: {
  email: string;
  isActive: boolean;
}[] = [{ email: "admin@example.com", isActive: true }];

users.map(function (user) {
  return user.email;
});
```

Burada `user` parametresine ayrıca type yazmadık.

TypeScript `users` array'inin eleman tipinden bunu anladı.

Bu yüzden array methodlarında callback parametresine her zaman type yazmak zorunda değilsin.

Ama öğrenme aşamasında bazı örneklerde açık yazmak faydalıdır.

---

## Mutating vs non-mutating yaklaşım

Bazı array işlemleri mevcut array'i değiştirir.
Bazıları yeni array döndürür.

Genelde modern TypeScript/React projelerinde non-mutating yaklaşım tercih edilir.

Örneğin `map` ve `filter` yeni array döndürür:

```ts
const activeUsers = users.filter(function (user) {
  return user.isActive;
});
```

Bu `users` array'ini değiştirmez.

Ama `push`, `pop`, `sort`, `splice` gibi methodlar mevcut array'i değiştirebilir.

React, test reliability ve maintainable kod için veriyi mümkün olduğunca doğrudan mutate etmemek daha sağlıklıdır.

Bu konuya ileride immutability tarafında daha net döneceğiz.

---

## Security ve test automation açısından array methods

Array methods güvenlik ve test tarafında çok sık kullanılır.

Örneğin başarısız login loglarını bulmak:

```ts
const failedLoginLogs = auditLogs.filter(function (log) {
  return log.action === "LOGIN" && log.success === false;
});
```

Permission kontrolü:

```ts
const canDeleteUser = userPermissions.includes("delete:user");
```

Test sonucu kontrolü:

```ts
const allTestsPassed = testResults.every(function (result) {
  return result.status === "passed";
});
```

API response içinden beklenen user var mı kontrolü:

```ts
const hasAdminUser = users.some(function (user) {
  return user.role === "admin";
});
```

Bu yüzden array methods sadece JavaScript kolaylığı değil, gerçek mühendislikte günlük veri işleme aracıdır.

---

## Kısa özet

- `forEach`, her eleman için işlem yapar.
- `map`, array'i başka bir array'e dönüştürür.
- `filter`, koşula uyan elemanları seçer.
- `find`, ilk eşleşeni bulur veya `undefined` döner.
- `some`, en az bir eleman koşulu sağlıyor mu diye bakar.
- `every`, tüm elemanlar koşulu sağlıyor mu diye bakar.
- `includes`, primitive array içinde değer var mı diye kontrol eder.
- `reduce`, array'den tek bir sonuç üretir.
- TypeScript array methodlarında callback parametrelerini çoğu zaman infer eder.
- Modern projelerde mümkün olduğunca non-mutating data dönüşümleri tercih edilir.
