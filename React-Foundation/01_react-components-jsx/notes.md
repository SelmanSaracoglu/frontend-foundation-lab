# React Components ve JSX

>>> UI'ın bağımsız bir parçasıdır. En basit haliyle bir function'dır.
```tsx
function Header() {
  return <h1>Education Platform</h1>;
}
```
Bu component ekrana bir başlık render eder.

# JSX Nedir?
```tsx
<h1>Hello</h1>
```
normal HTML değildir. Bu yapı JSX'tir.
- JavaScript içinde UI yazmayı sağlar
- React component'lerinin temelidir

React sonunda bunu normal JavaScript'e çevirir.

# JSX neden faydalı?
React'te UI ve davranış aynı yerde bulunur.

```tsx
function Welcome() {
  const userName = "Ayşe";

  return <h1>Welcome {userName}</h1>;
}
```
UI ve veri aynı component içinde. Bu yaklaşım modern frontend geliştirmeyi ciddi şekilde kolaylaştırır.

# JSX Kuralları
## 1. Tek parent element dönmelidir

>>> HATALI:
```tsx
return (
  <h1>Hello</h1>
  <p>World</p>
);
```

>>> DOĞRU:
```tsx
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

>>> Alternatif:
```tsx
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
```
Bu yapı Fragment'tir.

## 2. JavaScript ifadeleri {} içine yazılır
```tsx
const role = "SDET";

return <p>{role}</p>;
```

## 3. class yerine className kullanılır
HTML:
```html
<div class="card"></div>
```

React:
```tsx
<div className="card"></div>
```

Çünkü class JavaScript keyword'üdür.

## 4. Component isimleri büyük harfle başlar
DOĞRU:
```tsx
function UserCard() {}
```

YANLIŞ:
```tsx
function userCard() {}
```
React küçük harfli şeyleri HTML tag'i sanır.

# Component Composition
Gerçek React uygulamalarında component'ler birbirini kullanır.
```tsx
function Header() {
  return <header>Dashboard</header>;
}

function App() {
  return (
    <main>
      <Header />
    </main>
  );
}
```
Bu yaklaşım büyük uygulamaların yönetilebilir olmasını sağlar.

# React Mental Model
React'te düşünme şekli şudur:
"Bu ekran hangi küçük parçalara ayrılabilir?"

Bir e-ticaret sayfası:
- ProductCard
- PriceTag
- CartButton
- ReviewList

Bir dashboard:
- Sidebar
- Navbar
- AuditLogTable
- SecurityAlertCard
