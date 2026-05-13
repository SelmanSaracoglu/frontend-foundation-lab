# React Basic Auth UI State

Gerçek uygulamalarda kullanıcı arayüzü çoğu zaman authentication durumuna göre değişir.
--> Kullanıcı giriş yaptı mı?
--> Rolü ne?
--> Session geçerli mi?
--> Admin paneli görebilir mi?
--> Logout butonu görünmeli mi?
Bu milestone'da gerçek backend auth kurmuyoruz.
Sadece React tarafında auth state'in UI'ı nasıl etkilediğini öğreniyoruz.

# Auth State Nedir?
Auth state, kullanıcının giriş durumunu temsil eder.
```tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
```
Bu state'e göre UI değişir.

# Basit Auth UI
```tsx
{
  isAuthenticated ? <Dashboard /> : <LoginPrompt />;
}
```
Bu React'te çok temel ama gerçek dünyada çok önemli bir pattern'dir.

# User State
Sadece giriş yapıldı mı bilgisi çoğu zaman yetmez. Genelde kullanıcı bilgisi de gerekir:
```tsx
type User = {
  id: number;
  name: string;
  role: "admin" | "user";
};
```

State:
```tsx
const [user, setUser] = useState<User | null>(null);
```

Burada önemli mental model:
--> user null ise kullanıcı giriş yapmamıştır.
--> user doluysa kullanıcı giriş yapmıştır.

# Gereksiz State Tutma
Kötü yaklaşım:
```tsx
const [user, setUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
```
Bu bazen gereksiz olabilir. Çünkü `isAuthenticated` şundan derive edilebilir:

```tsx
const isAuthenticated = user !== null;
```
Bu daha temizdir.

# Role Based UI
Kullanıcının rolüne göre UI göstermek çok yaygındır.
```tsx
{
  user?.role === "admin" && <button>Open Admin Panel</button>;
}
```
Bu sadece UI görünürlüğüdür.

Çok önemli güvenlik notu:
--> Frontend role kontrolü güvenlik için yeterli değildir.
Backend de authorization kontrolü yapmak zorundadır.

# Frontend Authorization Yanılgısı
Kötü varsayım:
--> Butonu gizledim, artık kullanıcı bunu yapamaz.
Yanlış.
Kullanıcı frontend kodunu değiştirebilir veya API'ye direkt istek atabilir.

Doğru yaklaşım:
--> Frontend iyi kullanıcı deneyimi sağlar.
--> Backend gerçek güvenlik kontrolünü yapar.

Bu AppSec ve RBAC için temel prensiptir.

# Login ve Logout UI
Basit login:
```tsx
function login() {
  setUser({
    id: 1,
    name: "Ayşe",
    role: "admin",
  });
}
```

Basit logout:
```tsx
function logout() {
  setUser(null);
}
```

Bu gerçek auth değildir. 
Ama UI state mantığını öğretmek için yeterlidir.

# React Mental Model
Auth UI aslında derived UI'dır.

user state'i değişir
      ↓
isAuthenticated derive edilir
      ↓
UI değişir