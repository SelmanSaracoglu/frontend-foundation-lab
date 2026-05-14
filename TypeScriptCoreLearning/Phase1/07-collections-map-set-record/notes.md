# 07 - Collections: Map, Set, Record

## Bu konu neden önemli?

Önceki milestone’da array methodlarını öğrendik.

Array, TypeScript/JavaScript’te en yaygın collection yapısıdır. Ama gerçek projelerde her problem array ile en temiz şekilde çözülmez.

Bazen şunlara ihtiyaç duyarız:

- Aynı değerden sadece bir tane tutmak
- Bir key ile hızlı lookup yapmak
- Permission map oluşturmak
- Role bazlı yetki listesi tutmak
- ID’ye göre user bulmak
- Kategoriye göre ürünleri gruplamak
- Duplicate verileri temizlemek

Bu noktada üç yapı çok önemlidir:

```txt id="a1jh17"
Array   -> sıralı liste
Set     -> unique değer koleksiyonu
Map     -> key-value koleksiyonu
Record  -> TypeScript tarafında typed object dictionary
```

Java geçmişin varsa şöyle düşünebilirsin:

```txt id="1ms9tb"
Java                         TypeScript / JavaScript
----------------------------------------------------
ArrayList<T> / List<T>        T[]
HashSet<T>                    Set<T>
HashMap<K, V>                 Map<K, V>
Map<String, Value>            Record<string, Value>
```

Birebir aynı değiller ama problem çözme mantığı benzerdir.

---

## Array tekrar hatırlatma

Array sıralı bir listedir.

```ts
const roles: string[] = ["admin", "manager", "user"];
```

Array kullanmak mantıklıdır çünkü:

- sıralama önemlidir
- aynı elemandan birden fazla olabilir
- liste üzerinde `map`, `filter`, `find` gibi işlemler yapılır
- UI’da liste render edilir
- API response genelde array döner

Ama array ile lookup bazen maliyetli veya gereksiz karmaşık olabilir.

Örneğin:

```ts
const users = [
  { id: "user-1", email: "admin@example.com" },
  { id: "user-2", email: "user@example.com" },
];

const user = users.find(function (user) {
  return user.id === "user-2";
});
```

Bu doğru çalışır. Ama sürekli ID ile user arıyorsan `Map` veya `Record` daha uygun olabilir.

---

## Set nedir?

`Set`, aynı değerden sadece bir tane tutan collection’dır.

```ts
const uniqueRoles = new Set<string>();

uniqueRoles.add("admin");
uniqueRoles.add("user");
uniqueRoles.add("admin");

console.log(uniqueRoles);
```

Burada `"admin"` iki kere eklenmeye çalışıldı ama Set içinde bir kere tutulur.

Mental model:

```txt id="j9drzo"
Set = unique değerler koleksiyonu
```

---

## Set ne zaman kullanılır?

Set özellikle şuralarda kullanışlıdır:

- duplicate email temizlemek
- unique role listesi oluşturmak
- permission var mı hızlı kontrol etmek
- tag/category listesi tutmak
- daha önce işlenmiş ID’leri takip etmek

Örnek:

```ts
const emails = ["admin@example.com", "user@example.com", "admin@example.com"];

const uniqueEmails = new Set<string>(emails);

console.log(uniqueEmails);
```

Set sonucu:

```txt id="bya6oo"
Set { 'admin@example.com', 'user@example.com' }
```

Array’e çevirmek için:

```ts
const uniqueEmailList = Array.from(uniqueEmails);
```

Sonuç:

```ts
["admin@example.com", "user@example.com"];
```

---

## Set ile has kontrolü

`Set` üzerinde bir değer var mı diye `has` ile kontrol ederiz.

```ts
const permissions = new Set<string>(["read:user", "update:user"]);

console.log(permissions.has("read:user"));
console.log(permissions.has("delete:user"));
```

Sonuç:

```txt id="w22ufp"
true
false
```

Permission kontrolünde bu mantık çok faydalıdır.

Array ile:

```ts
permissionsArray.includes("read:user");
```

Set ile:

```ts
permissionsSet.has("read:user");
```

İkisi de okunabilir. Çok sık lookup yapıyorsan Set daha uygun olabilir.

---

## Map nedir?

`Map`, key-value tutan collection’dır.

```ts
const usersById = new Map<string, string>();

usersById.set("user-1", "admin@example.com");
usersById.set("user-2", "user@example.com");

console.log(usersById.get("user-1"));
```

Sonuç:

```txt id="cg0h4d"
admin@example.com
```

Mental model:

```txt id="nzekl9"
Map = key ile value bulma yapısı
```

---

## Map type yapısı

Map iki generic type alır:

```ts
Map<KeyType, ValueType>;
```

Örnek:

```ts
const userEmailsById = new Map<string, string>();
```

Bu şu demektir:

```txt id="0vbpr5"
key   -> string
value -> string
```

Daha gerçekçi örnek:

```ts
const usersById = new Map<
  string,
  {
    id: string;
    email: string;
    role: string;
  }
>();
```

Burada:

```txt id="dvnyci"
key   -> user id
value -> user object
```

---

## Map ne zaman kullanılır?

Map özellikle şuralarda kullanışlıdır:

- ID’ye göre hızlı lookup
- token’a göre session bulmak
- email’e göre user bulmak
- permission key’e göre metadata bulmak
- cache yapısı kurmak
- bir değeri sonradan ekleyip silmek

Örnek:

```ts
const sessionsByToken = new Map<
  string,
  {
    userId: string;
    expiresAt: string;
  }
>();

sessionsByToken.set("token-abc", {
  userId: "user-1",
  expiresAt: "2026-05-09T12:00:00Z",
});

const session = sessionsByToken.get("token-abc");
```

Ama dikkat:

`Map.get()` sonucu value veya `undefined` olabilir.

Bu yüzden kontrol gerekir:

```ts
if (session === undefined) {
  console.log("Session not found");
} else {
  console.log(session.userId);
}
```

---

## Map üzerinde gezinmek

Map üzerinde `for...of` ile gezebiliriz.

```ts
const usersById = new Map<string, string>();

usersById.set("user-1", "admin@example.com");
usersById.set("user-2", "user@example.com");

for (const [id, email] of usersById) {
  console.log(`${id}: ${email}`);
}
```

Sonuç:

```txt id="svlal3"
user-1: admin@example.com
user-2: user@example.com
```

---

## Record nedir?

`Record`, TypeScript’in object dictionary modellemek için kullandığı utility type’tır.

```ts
const roleLabels: Record<string, string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};
```

Burada şunu söylüyoruz:

```txt id="o5moah"
Bu object'in key'leri string, value'ları string.
```

Ama `Record<string, string>` biraz geniştir. Çünkü herhangi bir string key’e izin verir.

Daha güvenli kullanım:

```ts
const roleLabels: Record<"admin" | "manager" | "user", string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};
```

Burada TypeScript artık şunu bilir:

```txt id="1m6pmo"
Bu object tam olarak admin, manager, user key'lerine sahip olmalı.
```

Eksik key hata verir.
Fazla key de object literal içinde genelde hata verir.

---

## Record ne zaman kullanılır?

Record özellikle şuralarda çok kullanılır:

- role label map
- permission description map
- status message map
- config object
- route map
- feature flag map
- test data lookup table

Örnek:

```ts
const permissionDescriptions: Record<string, string> = {
  "read:user": "Can read user profiles",
  "update:user": "Can update user profiles",
  "delete:user": "Can delete users",
};
```

Daha sonra:

```ts
console.log(permissionDescriptions["delete:user"]);
```

Sonuç:

```txt id="yvdt9e"
Can delete users
```

---

## Map vs Record farkı

İkisi de key-value gibi görünür ama kullanım yerleri farklıdır.

```txt id="sc1q9o"
Record:
- plain object'tir
- JSON'a benzer
- config/constant map için çok uygundur
- key'ler genelde string/number/symbol olur
- static ve bilinen yapıdaysa çok temizdir

Map:
- gerçek runtime collection'dır
- key olarak object dahil farklı tipler kullanılabilir
- sık ekleme/silme yapılacaksa uygundur
- cache/session/lookup gibi runtime yapılarda güçlüdür
```

Pratik karar:

```txt id="bl3ryc"
Sabit config veya label map mi?       -> Record
Runtime'da sürekli ekle/sil/lookup mı? -> Map
Unique değer listesi mi?              -> Set
Sıralı liste/veri akışı mı?            -> Array
```

---

## Object, Record ve Map karışıklığı

Şu object’tir:

```ts
const user = {
  id: "user-1",
  email: "admin@example.com",
};
```

Şu Record’dur:

```ts
const usersByRole: Record<string, string[]> = {
  admin: ["admin@example.com"],
  user: ["user@example.com"],
};
```

Şu Map’tir:

```ts
const usersById = new Map<string, { id: string; email: string }>();
```

Record aslında runtime’da normal object’tir. TypeScript tarafında sadece daha net bir type modelidir.

Map ise JavaScript’in runtime collection yapısıdır.

---

## Permission örneği

Array ile permission kontrolü:

```ts
const permissionsArray = ["read:user", "update:user"];

function hasPermissionArray(requiredPermission: string): boolean {
  return permissionsArray.includes(requiredPermission);
}
```

Set ile permission kontrolü:

```ts
const permissionsSet = new Set<string>(["read:user", "update:user"]);

function hasPermissionSet(requiredPermission: string): boolean {
  return permissionsSet.has(requiredPermission);
}
```

Record ile permission açıklaması:

```ts
const permissionDescriptions: Record<string, string> = {
  "read:user": "Can read user profiles",
  "update:user": "Can update user profiles",
};
```

Burada üç yapı farklı amaçlarla kullanıldı:

```txt id="awik4u"
Array  -> permission listesi
Set    -> hızlı permission var mı kontrolü
Record -> permission açıklaması lookup
```

---

## Duplicate temizleme

Array içinde duplicate değerleri temizlemek için Set kullanabiliriz.

```ts
const emails = ["admin@example.com", "user@example.com", "admin@example.com"];

const uniqueEmails = Array.from(new Set<string>(emails));

console.log(uniqueEmails);
```

Sonuç:

```txt id="n4hbsx"
[ 'admin@example.com', 'user@example.com' ]
```

Bu gerçek projede API response veya test data temizlerken işimize yarar.

---

## Array’den Map üretmek

Elimizde user array’i varsa bunu ID’ye göre Map’e çevirebiliriz.

```ts
const users = [
  { id: "user-1", email: "admin@example.com" },
  { id: "user-2", email: "user@example.com" },
];

const usersById = new Map<string, { id: string; email: string }>();

for (const user of users) {
  usersById.set(user.id, user);
}
```

Artık ID ile lookup yapabiliriz:

```ts
const user = usersById.get("user-1");
```

Ama tekrar: `get` sonucu `undefined` olabilir. Kontrol etmeyi unutmuyoruz.

---

## Security ve backend açısından collections

Bu yapılar güvenlik tarafında çok pratik kullanılır.

Örneğin:

```ts
const sensitivePermissions = new Set<string>([
  "delete:user",
  "read:audit-log",
  "manage:roles",
]);
```

Sonra:

```ts
function isSensitivePermission(permission: string): boolean {
  return sensitivePermissions.has(permission);
}
```

Bu yapı okunabilir ve hızlıdır.

Role labels:

```ts
const roleLabels: Record<string, string> = {
  admin: "Administrator",
  manager: "Manager",
  user: "User",
};
```

Session lookup:

```ts
const sessionsByToken = new Map<
  string,
  {
    userId: string;
    expiresAt: string;
  }
>();
```

Bunlar ileride auth, RBAC, security logging ve API testing tarafında sürekli karşımıza çıkar.

---

## Kısa özet

- Array sıralı listedir.
- Set unique değerler tutar.
- Map key-value runtime collection’dır.
- Record typed object dictionary modelidir.
- Java’daki `List`, `HashSet`, `HashMap` mantığı TypeScript’te sırasıyla `Array`, `Set`, `Map/Record` ile karşılanır.
- `Set.has()` permission kontrolü için kullanışlıdır.
- `Map.get()` sonucu `undefined` olabilir, kontrol gerekir.
- `Record` sabit config, label ve lookup table için çok uygundur.
- Runtime’da ekleme/silme çoksa `Map`, sabit yapıysa `Record` daha mantıklıdır.
