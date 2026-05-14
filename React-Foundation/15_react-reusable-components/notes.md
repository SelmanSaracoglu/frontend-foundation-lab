# React Reusable Components
React'te güçlü component yazmak sadece UI'ı parçalamak değildir. 
Aynı component'i farklı durumlarda güvenli ve okunabilir şekilde kullanabilmek

Yani reusable component yazabilmektir.
Gerçek projelerde sık gördüğümüz reusable component örnekleri:
- Button
- Card
- Badge
- Alert
- Input
- EmptyState
- ErrorMessage
- PageHeader
- Panel
Bu component'ler uygulamanın her yerinde tekrar kullanılır.

# Reusable Component Nedir?
> Farklı veri veya davranışlarla tekrar kullanılabilen component'tir.

Örneğin kötü yaklaşım:
```tsx
function AdminButton() {
  return <button>Delete User</button>;
}
```
Bu sadece tek iş yapar. 

Daha reusable yaklaşım:
```tsx
type ButtonProps = {
  label: string;
};

function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}
```

Artık farklı yerlerde kullanılabilir:
```tsx
<Button label="Delete User" />
<Button label="Save Course" />
<Button label="Login" />
```

# Reusable Component Ne Zaman Mantıklı?
Bir component'i reusable yapmak genelde mantıklıdır, eğer:
- aynı UI pattern'i birden fazla yerde varsa
- aynı style veya davranış tekrar ediyorsa
- props ile anlamlı şekilde özelleştirilebiliyorsa
- test edilmesi ayrı değer taşıyorsa
- kod tekrarını azaltıyorsa
Ama her component reusable olmak zorunda değildir.

# Fazla Genelleştirme Riski

Başlangıçta yapılan yaygın hata:
-- Daha ihtiyaç oluşmadan çok generic component yazmak

Bu bazen kodu basitleştirmek yerine zorlaştırır.

İyi mühendislik yaklaşımı:
-- Önce açık ve basit yaz.
-- Tekrar eden pattern oluşunca reusable hale getir.

# Variant Mantığı
Reusable component'lerde sık kullanılan pattern:
```tsx
type BadgeVariant =
  | "success"
  | "warning"
  | "danger";
```

Örnek:
```tsx
type BadgeProps = {
  label: string;
  variant: BadgeVariant;
};
```
Bu sayede component farklı anlamlarda kullanılabilir.
```tsx
<Badge label="Active" variant="success" />
<Badge label="Pending" variant="warning" />
<Badge label="Blocked" variant="danger" />
```

# Optional Props
Bazı props'lar zorunlu olmayabilir.
```tsx
type AlertProps = {
  title: string;
  message?: string;
};
```
Burada `message` optional'dır.

Kullanım:
```tsx
<Alert title="Saved successfully" />
```

veya:
```tsx
<Alert
  title="Login failed"
  message="Please check your credentials."
/>
```
Component optional prop'u güvenli şekilde render etmelidir.

# children ile Reusable Container
Reusable component'lerde `children` çok önemlidir.

Örneğin `Card` component'i:
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
  <p>Suspicious login detected</p>
</Card>
```
Burada Card içeriğin ne olduğunu bilmez. Sadece reusable container sağlar.

# Reusable Component Tasarım Soruları

Bu component'in sorumluluğu net mi?
Props isimleri anlaşılır mı?
Gereksiz generic mi?
Çok fazla işi aynı anda mı yapıyor?
children kullanmak mı daha doğru?
variant prop'u gerekiyor mu?

# Test Edilebilirlik Açısından Önemi

Reusable component'ler test automation için önemlidir.

Örneğin ortak `Button`, `Alert`, `Badge` component'leri tutarlı olursa:
- UI davranışı daha predictable olur
- Cypress selector stratejisi kolaylaşır
- hata ayıklama kolaylaşır
- farklı sayfalarda aynı pattern korunur
