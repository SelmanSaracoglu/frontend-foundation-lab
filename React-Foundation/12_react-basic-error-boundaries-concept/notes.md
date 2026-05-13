# React Error Handling Mantığı
React uygulamalarında hata yönetimi sadece API error state değildir. Bazı hatalar render sırasında oluşabilir. Bu milestone'da amaç Error Boundary implementasyonu yapmak değil;
React'te hata türlerini ayırt etmeyi öğrenmek.

# API Error ve Render Error Farkı
API error: Backend çağrısı başarısız oldu.
```tsx
if (status === "error") {
  return <p>Could not load users</p>;
}
```
Render error: Component render edilirken JavaScript hatası oluştu.
```tsx
const user = undefined;
return <p>{user.name}</p>;
```
Bu kod patlar çünkü `user` undefined.

# Neden Ayırıyoruz?
Çünkü çözüm yaklaşımları farklıdır.

API error:
- loading/error/success state ile yönetilir
- kullanıcıya güvenli mesaj gösterilir

Render error:
- defensive rendering
- doğru TypeScript tipi
- null kontrolü
- Error Boundary

# Defensive Rendering
UI render etmeden önce verinin güvenli olup olmadığını kontrol etmektir.
```tsx
type User = {
  name: string;
};

type UserProfileProps = {
  user: User | null;
};

function UserProfile({ user }: UserProfileProps) {
  if (!user) {
    return <p>No user selected</p>;
  }

  return <p>{user.name}</p>;
}
```
Burada component `null` kullanıcı durumunda patlamaz.

# Optional Chaining
Bazen veri gelmeyebilir.

user?.name
--> user varsa name oku, yoksa undefined dön anlamına gelir.
```tsx
<p>{user?.name}</p>
```

Ama dikkat:
Optional chaining her zaman en iyi çözüm değildir.
Bazı durumlarda açık fallback UI daha iyidir:
```tsx
if (!user) {
  return <p>No user selected</p>;
}
```
# Fallback UI
> Normal veri yokken kullanıcıya gösterilen güvenli alternatif ekrandır.
- No user selected
- No courses found
- Could not load dashboard
- You do not have access
- Invalid session
Fallback UI, uygulamanın patlamasını engeller ve kullanıcı deneyimini iyileştirir.

# TypeScript Burada Neden Önemli?
TypeScript bize şunu zorlatır:
```tsx
user: User | null
```
Eğer user null olabilir diyorsak, TypeScript bizi kontrol yapmaya iter.
Bu, runtime hatalarını azaltır.

Kötü yaklaşım:
```tsx
type Props = {
  user: User;
};
```
Ama gerçekte user null gelebiliyorsa bu tip yalandır.

İyi yaklaşım:
```tsx
type Props = {
  user: User | null;
};
```
Tipler gerçek davranışı temsil etmelidir.

# Error Boundary Nedir?
> Render sırasında oluşan bazı React hatalarını yakalayıp fallback UI gösteren özel yapıdır.

Şimdilik detaylı implement etmiyoruz. Ama mental model şu:

Component patlarsa, 
tüm uygulama beyaz ekran olmak yerine güvenli fallback ekran gösterilir.

Modern React projelerinde Error Boundary genellikle route/page seviyesinde kullanılır.

# Error Boundary Ne İçin Değildir?
Error Boundary her şeyi yakalamaz.
- API response error
- event handler içindeki hata
- async function içindeki hata
- validation hatası
bunlar genelde normal state/error handling ile yönetilir.

# Güvenli Hata Mesajı
Frontend kullanıcıya hassas teknik detay göstermemelidir.

-> Kötü: Cannot read property token of internalAuthSession at line 42
-> Daha iyi: Something went wrong. Please try again.

Detaylar loglama sisteminde tutulur.
Kullanıcıya sade ve güvenli mesaj gösterilir.
