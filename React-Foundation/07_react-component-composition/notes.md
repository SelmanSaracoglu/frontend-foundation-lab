# React Component Composition
React'te güçlü UI mimarisi sadece component yazmak değildir. Asıl önemli konu Component'leri doğru şekilde birleştirmektir. Buna component composition denir. 

Gerçek projelerde ekranlar küçük parçalardan oluşur:
- Layout
- Header
- Sidebar
- Card
- List
- Form
- Button
- EmptyState
- ErrorMessage
Bu parçaları doğru ayırmak uygulamayı daha okunabilir, test edilebilir ve sürdürülebilir yapar.

# Component Composition Nedir?
Component composition Küçük component'leri bir araya getirerek daha büyük UI yapıları oluşturmaktır.
```tsx
function PageHeader() {
  return <h1>Dashboard</h1>;
}

function DashboardPage() {
  return (
    <main>
      <PageHeader />
    </main>
  );
}
```
Burada `DashboardPage`, `PageHeader` component'ini kullanır.

# Neden Tek Büyük Component Yazmıyoruz?

Kötü örnek:
```tsx
function DashboardPage() {
  return (
    <main>
      <header>
        <h1>Security Dashboard</h1>
      </header>

      <section>
        <h2>Alerts</h2>
        <p>Unauthorized login attempt</p>
        <p>High</p>
      </section>

      <section>
        <h2>User</h2>
        <p>Ayşe</p>
        <p>SDET</p>
      </section>
    </main>
  );
}
```

Bu küçük örnekte bile sorumluluklar karışmaya başladı.

Daha iyi yaklaşım:
```tsx
function PageHeader() {
  return <h1>Security Dashboard</h1>;
}

function AlertCard() {
  return (
    <section>
      <h2>Alerts</h2>
      <p>Unauthorized login attempt</p>
      <p>High</p>
    </section>
  );
}

function UserSummary() {
  return (
    <section>
      <h2>User</h2>
      <p>Ayşe</p>
      <p>SDET</p>
    </section>
  );
}

function DashboardPage() {
  return (
    <main>
      <PageHeader />
      <AlertCard />
      <UserSummary />
    </main>
  );
}
```
Bu daha okunabilir ve yönetilebilir hale gelir.

# İyi Component Ayırma Mantığı
Bir parçayı component yapmak genelde mantıklıdır, eğer:
- tekrar kullanılacaksa
- kendi anlamı varsa
- dosya okunabilirliğini artırıyorsa
- test edilmesi ayrı anlam taşıyorsa
- farklı props alarak farklı durumları gösterecekse
Ama her `<div>` için component açmak da doğru değildir.
Amaç component sayısını artırmak değil, kodu anlaşılır hale getirmektir.

# Parent ve Child Component
React'te sık göreceğin ilişki:

Parent Component
        ↓
Child Component

```tsx
function AlertCard() {
  return <p>Unauthorized login attempt</p>;
}

function DashboardPage() {
  return (
    <main>
      <AlertCard />
    </main>
  );
}
```
Burada:
- `DashboardPage` parent component
- `AlertCard` child component

# Props ile Composition
Composition çoğu zaman props ile birlikte kullanılır.

```tsx
type AlertCardProps = {
  message: string;
  severity: string;
};

function AlertCard({
  message,
  severity,
}: AlertCardProps) {
  return (
    <section>
      <p>{message}</p>
      <p>Severity: {severity}</p>
    </section>
  );
}
```
Kullanım:
```tsx
<AlertCard
  message="Unauthorized login attempt"
  severity="High"
/>
```
Böylece component hem küçük hem de reusable olur.

# children Prop'u
React'te özel bir prop vardır `children`, component'in içine yazılan içeriği temsil eder.
```tsx
type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <section className="card">
      {children}
    </section>
  );
}
```
Kullanım:
```tsx
<Card>
  <h2>Security Alert</h2>
  <p>Unauthorized login attempt</p>
</Card>
```
Burada `Card`, içeriğin ne olduğunu bilmez. Sadece ortak bir container sağlar.
Bu çok güçlü bir composition tekniğidir.

# children Ne Zaman Kullanılır?
`children` şu durumlarda çok işe yarar:
- Card
- Modal
- Layout
- PageSection
- FormSection
- Panel
- Sidebar
Yani component dış kabı sağlar, içerik dışarıdan verilir.

# Gerçek Engineering Mantığı
İyi React component yapısı şuna benzer:
```txt
DashboardPage
 ├─ PageHeader
 ├─ SecuritySummary
 ├─ AlertList
 │   └─ AlertCard
 └─ UserAccessPanel
```
Bu yapı:
- okunabilirliği artırır
- test yazmayı kolaylaştırır
- hata ayıklamayı kolaylaştırır
- sorumlulukları netleştirir

# Aşırı Parçalama Riski
Her şeyi component yapmak da iyi değildir.

Kötü sinyal:
- component ismi anlamlı değilse
- sadece bir satır için açıldıysa
- okumayı kolaylaştırmak yerine zorlaştırıyorsa
- sürekli dosyalar arasında zıplatıyorsa
burada fazla parçalamış olabilirsin. İyi component ayırma engineering judgment ister.
