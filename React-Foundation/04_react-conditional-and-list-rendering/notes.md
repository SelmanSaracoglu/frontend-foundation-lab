# React Conditional Rendering ve List Rendering
Gerçek uygulamalar sabit UI göstermez.
UI:
- kullanıcı durumuna göre değişir
- role göre değişir
- API sonucuna göre değişir
- loading durumuna göre değişir
- hata durumuna göre değişir
- liste verisine göre büyür

Örneğin:
- Admin kullanıcı farklı menü görür
- Unauthorized kullanıcı hata görür
- Kurs listesi API'den gelir
- Notification listesi dinamik render edilir

Bu yüzden React'te:
- conditional rendering
- list rendering
çok temel konulardır.

# Conditional Rendering Nedir?
>>> UI'ın belirli koşullara göre render edilmesidir.
```txt
Kullanıcı giriş yaptıysa:
→ Dashboard göster

Yapmadıysa:
→ Login ekranı göster
```

# İlk Conditional Rendering Örneği
```tsx
type Props = {
  isLoggedIn: boolean;
};

function AuthStatus({ isLoggedIn, }: Props) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

Burada: (condition ? true : false) ternary operator kullanılır. 

# && Kullanımı
Bazı durumlarda sadece bir şey göstermek isteriz.
```tsx
function AdminPanel() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin && <p>Admin Access</p>}
    </div>
  );
}
```

Eğer: (isAdmin === true) ise component render edilir.

# Gerçek Kullanım Senaryoları
Conditional rendering gerçek projelerde sürekli kullanılır:
- loading spinner
- error message
- role-based UI
- RBAC visibility
- empty states
- API failure screens
- success messages
- feature flags
Özellikle security/UI engineering için çok önemlidir.

# List Rendering Nedir?
>>> Bir dizideki verileri ekrana tekrar eden UI olarak basmaktır.
- kullanıcı listesi
- kurs listesi
- audit log kayıtları
- security alerts
- API results
genellikle list rendering ile gösterilir.

# map Kullanımı
React'te list render etmek için genellikle: array.map() kullanılır.
```tsx
const users = [
  "Ayşe",
  "Mehmet",
  "Zeynep",
];
```

```tsx
function UserList() {
  return (
    <ul>
      {users.map((user) => (
        <li>{user}</li>
      ))}
    </ul>
  );
}
```

# key Neden Gereklidir?
React list render ederken her elemana: " key " ister.
```tsx
<li key={user}>{user}</li>
```
Bu React'in:
- performans optimizasyonu
- doğru render davranışı
- DOM reconciliation
işlemleri için gereklidir. Gerçek projelerde çok önemlidir.

# Object List Rendering
Gerçek uygulamalarda genellikle object dizileri render edilir.
```tsx
const alerts = [
  {
    id: 1,
    message: "Unauthorized login",
  },
  {
    id: 2,
    message: "API token expired",
  },
];
```

```tsx
function AlertList() {
  return (
    <section>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <p>{alert.message}</p>
        </div>
      ))}
    </section>
  );
}
```
Bu gerçek frontend geliştirmeye çok daha yakındır.

# React Mental Model

React'te UI aslında: (state + conditions + data) kombinasyonunun sonucudur.

API başarılı mı? → Evet → Liste göster
API başarısız mı? → Hata mesajı göster
Liste boş mu? → Empty state göster

Modern frontend tamamen bu mantıkla çalışır.
