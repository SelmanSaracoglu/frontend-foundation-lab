# React Props
Component'leri gerçekten tekrar kullanılabilir yapan şey props yapısıdır. Şu anda component yazabiliyoruz ama henüz sabit içerikler render ediyoruz.
```tsx
function UserCard() {
  return (
    <div>
      <h2>Ayşe</h2>
      <p>SDET</p>
    </div>
  );
}
```

Bu component yalnızca tek kullanıcı gösterebilir. Gerçek uygulamalarda ise aynı component farklı verilerle tekrar tekrar kullanılır.
- farklı kullanıcılar
- farklı kurslar
- farklı ürünler
- farklı log kayıtları
- farklı security alerts
İşte bunu sağlayan yapı props'tur.

# Props Nedir?
>>> Bir component'e dışarıdan verilen verilerdir. 
Props sayesinde component:
- dinamik olur
- tekrar kullanılabilir olur
- gerçek uygulama davranışı kazanır

# İlk Props Örneği
```tsx
type UserCardProps = {
  name: string;
  role: string;
};

function UserCard(props: UserCardProps) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.role}</p>
    </div>
  );
}
```

Kullanımı:
```tsx
<UserCard
  name="Ayşe"
  role="SDET"
/>
```

Burada:
```tsx
name="Ayşe"
role="SDET"
```
component'e veri gönderir.

# Props Mental Model
Bir component küçük bir UI template'idir. Props ise o template'e verilen veridir.
```tsx
<UserCard
  name="Mehmet"
  role="Platform Engineer"
/>
```
```tsx
<UserCard
  name="Zeynep"
  role="Application Security Engineer"
/>
```
aynı component'i farklı verilerle kullanır. Bu React'in en önemli gücüdür.

# TypeScript ile Props
TypeScript burada çok önemli.
- yanlış veri gönderimini engeller
- component contract'ını netleştirir
- büyük frontend codebase'lerini güvenli hale getirir

```tsx
type UserCardProps = {
  name: string;
  role: string;
};
```
>>> Bu component çalışmak için name ve role bekliyor.

# Props Destructuring
Gerçek projelerde genellikle şöyle yazılır:
```tsx
type UserCardProps = {
  name: string;
  role: string;
};

function UserCard({ name, role }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```
Bu daha okunabilirdir. Çok sık kullanılır.

# Multiple Components ile Kullanım
```tsx
function App() {
  return (
    <main>
      <UserCard
        name="Ayşe"
        role="SDET"
      />

      <UserCard
        name="Mehmet"
        role="DevSecOps Engineer"
      />

      <UserCard
        name="Zeynep"
        role="Frontend Developer"
      />
    </main>
  );
}
```
Tek component, farklı veriler.

# Props neden frontend engineering için kritik?
Modern frontend tamamen reusable UI mantığıyla çalışır.
- Button
- Modal
- Table
- Input
- Alert
- AuditLogCard
- PermissionBadge gibi yapılar props ile kontrol edilir.

Ayrıca:
- component testing
- Cypress testing
- UI automation
- accessibility testing
gibi alanlarda da component davranışı props üzerinden test edilir.

# React Veri Akışı

Başlangıç için önemli mental model:
```txt
Parent Component
        ↓
      Props
        ↓
Child Component
```
Veri yukarıdan aşağı akar. Bu React'in temel mimarisidir.
