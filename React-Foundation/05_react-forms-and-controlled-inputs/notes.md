# React Forms ve Controlled Inputs
Gerçek uygulamaların büyük kısmı form içerir.
- login formu
- register formu
- search input
- filtreleme
- settings ekranı
- password reset
- security policy formu
- audit filter paneli
Frontend engineering'in çok büyük bölümü form yönetimidir. Bu yüzden React'te form mantığını iyi anlamak çok önemlidir.

# Controlled Input Nedir?
React'te önerilen yaklaşım:
>>> Input değerinin React state'i tarafından kontrol edilmesidir. 
Buna controlled input denir.

# İlk Controlled Input Örneği
```tsx
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        value={username}
        onChange={(event) =>
          setUsername(event.target.value)
        }
      />
      <p>{username}</p>
    </div>
  );
}
```
Burada input değeri username state'i ile kontrol edilir.

# onChange Nasıl Çalışır?
Kullanıcı input'a yazı yazınca: onChange event'i çalışır.
```tsx
onChange={(event) =>
  setUsername(event.target.value)
}
```
Burada: event.target.value input içindeki güncel değerdir.

# React Veri Akışı
Controlled input mantığı:

User typing
      ↓
onChange event
      ↓
State update
      ↓
Component re-render
      ↓
Updated UI

Bu React'in temel veri akışıdır.

# Form Submit
Gerçek uygulamalarda form gönderimi gerekir.
```tsx
function handleSubmit() {
  console.log("Form submitted");
}
```
```tsx
<form onSubmit={handleSubmit}>
```
Ama burada önemli bir detay vardır.

# preventDefault Neden Gerekli?
HTML formu normalde sayfayı yeniler. React SPA yapısında bunu istemeyiz.

Bu yüzden: event.preventDefault(); kullanırız.
```tsx
function handleSubmit(
  event: React.FormEvent
) {
  event.preventDefault();

  console.log("submitted");
}
```
Bu gerçek React uygulamalarında standarttır.

# Birden Fazla Input
Gerçek formlar genellikle birden fazla alan içerir.
```tsx
const [email, setEmail] =
  useState("");
const [password, setPassword] =
  useState("");
```
Her input kendi state'ine bağlanır.

# React Mental Model
React'te input değeri genellikle DOM'da değil, state içinde tutulur.
Bu çok önemli bir farktır.
Eski yaklaşım:
```txt
DOM merkezli yaklaşım
```
React yaklaşımı:
```txt
State merkezli yaklaşım
```

# Controlled Input Avantajları
Controlled input sayesinde:
- validation kolaylaşır
- test etmek kolaylaşır
- state yönetimi netleşir
- UI senkronizasyonu güvenilir olur
- form davranışı öngörülebilir olur
Bu modern frontend engineering için çok önemlidir.

# Basit Validation Örneği
```tsx
{
  password.length < 8 && (
    <p>Password too short</p>
  );
}
```
Bu yaklaşım React'te çok yaygındır.