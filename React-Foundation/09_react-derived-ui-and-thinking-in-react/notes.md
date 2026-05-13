# React Derived UI ve Thinking in React
Bu milestone React'in en önemli engineering mental model'lerinden biridir.

Şu ana kadar öğrendiğimiz şeyler:
- component
- props
- state
- events
- forms
- useEffect
- state lifting
Şimdi bunları birleştirme zamanı.

React'te en önemli fikirlerden biri şudur: 
UI = State'in bir görüntüsüdür

Bu modern React düşünme biçiminin temelidir.

# Derived UI Nedir?

Derived UI: UI'ın mevcut state'ten türetilmesidir.
```tsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

UI:
```tsx
{ isLoggedIn ? <Dashboard /> : <LoginPage />; }
```
Burada UI tamamen state'ten türetiliyor. Bu React'in en temel fikridir.

# React'te DOM'u Manuel Yönetmeyiz

Eski yaklaşım: DOM'u elle değiştir
```js
document.getElementById(...)
```

React yaklaşımı: State değiştir --> UI otomatik güncellensin
Bu büyük engineering farkıdır.

# İlk Derived UI Örneği
```tsx
function AuthPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>

      {isLoggedIn ? <p>Welcome back</p> : <p>Please login</p>}
    </section>
  );
}
```

Burada: UI tamamen isLoggedIn state'inden türetiliyor. 

# React'te "Kaynak Gerçeklik"
Çok önemli fikir: Single source of truth 
```tsx
const [cartItems, setCartItems] =
  useState([...]);
```

Şunlar derive edilir:
- cart count
- total price
- empty state
- checkout button visibility

Yani bunları ayrı state yapmayız. State'ten hesaplarız.

# Kötü Pattern: Gereksiz State

YANLIŞ:
```tsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
```

Bu problemli olabilir. Çünkü: fullName zaten diğer state'lerden türetilebilir.

DOĞRU: const fullName = firstName + " " + lastName;
Bu yaklaşım:
- bug azaltır
- senkronizasyon problemini azaltır
- state karmaşasını azaltır

# Thinking in React

React'te düşünme biçimi şudur:

## 1. UI'ı küçük component'lere böl
```txt
DashboardPage
 ├─ Header
 ├─ FilterPanel
 ├─ AlertList
 └─ UserTable
```

## 2. Hangi veriler state olmalı?
Soru: Bu veri zamanla değişiyor mu?
Evetse: → state olabilir.
Hayırsa: → normal variable olabilir.

## 3. Hangi veriler derive edilmeli?
Soru: Bu veri başka state'lerden hesaplanabiliyor mu?
Evetse: → ayrı state yapma.

## 4. State nerede yaşamalı?
Soru: Bu state'i hangi component'ler kullanıyor?
Cevap: → en yakın ortak parent.
Bu state lifting mantığıdır.

# Derived Data Örneği
```tsx
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
];
```

Derived value:
```tsx
const activeUsers = users.filter((user) => user.active);
```
Burada: activeUsers ayrı state değildir. Veriden türetilir.

---

# React Mental Model
React engineering'de çok kritik yaklaşım: State minimum tutulur.

Mümkün olan her şey:
- derive edilir
- hesaplanır
- render sırasında oluşturulur
Bu çok önemli engineering discipline'dır.

# Gerçek Uygulama Mantığı
Örneğin bir security dashboard:

State:
- alerts
- selectedSeverity
- searchQuery

Derived UI:
- filtered alerts
- visible count
- empty state
- severity summary
Ayrı state tutmak yerine derive edilir.

# Derived UI neden önemli?

Çünkü:
- daha az bug oluşur
- stale state azalır
- UI daha öngörülebilir olur
- test etmek kolaylaşır
- component mantığı sadeleşir

Bu senior frontend engineering için temel düşünme biçimidir.

# Bu konunun senin hedeflerin için önemi
Bu yaklaşım özellikle:
- dashboard engineering
- frontend architecture
- testable UI design
- state management
- automation reliability
- predictable UI behavior için çok önemlidir.
