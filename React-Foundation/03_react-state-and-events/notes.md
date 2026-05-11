# React State ve Event Handling
Şu ana kadar React component'leri yalnızca ekrana veri gösteriyordu. Ama gerçek uygulamalar statik değildir.

Kullanıcı:
- butona tıklar
- form doldurur
- filtre değiştirir
- modal açar
- login olur
- veri günceller
UI'ın kullanıcı etkileşimine göre değişmesi gerekir. İşte burada state devreye girer.

# State Nedir?
State: 
>>> Component içinde değişebilen veridir.
- sayaç değeri
- modal açık mı?
- kullanıcı giriş yaptı mı?
- loading durumu
- arama input değeri
- selected tab
bunların hepsi state olabilir.

# useState Hook'u
React'te state yönetmek için en temel hook:

```tsx
useState
```
```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
}
```

# useState Nasıl Çalışır?
```tsx
const [count, setCount] = useState(0);
```

count       --> state değeridir.
setCount    --> state'i güncelleyen fonksiyondur.
0           --> başlangıç değeridir.

# State Güncelleme
```tsx
<button onClick={() => setCount(count + 1)}>
  Increase
</button>
```

Butona tıklanınca: setCount(count + 1) çalışır.

React:
- state'i günceller
- component'i tekrar render eder
- ekranı yeniler

Bu React'in temel çalışma modelidir.

# Event Handling
React'te kullanıcı etkileşimlerini event'lerle yakalarız.
- onClick
- onChange
- onSubmit
- onFocus

# İlk Event Örneği
```tsx
function Button() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```
Burada: onClick bir event'tir.

# State + Event Birlikte Kullanım
Gerçek React burada başlar.

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={increaseCount}>
        Increase
      </button>
    </div>
  );
}
```

Kullanıcı butona basar →
event çalışır →
state değişir →
UI güncellenir.

Modern frontend'in temel döngüsü budur.

# React Mental Model
React'te UI aslında state'in bir görüntüsüdür.

State değişir -> 
Component tekrar render edilir -> 
UI güncellenir

# State neden önemli?

Senin hedef rollerin için state çok kritik çünkü:
- form yönetimi
- authentication UI
- RBAC görünürlüğü
- loading state
- async API davranışı
- test automation
- Cypress assertions
- UI reliability
gibi konular tamamen state davranışıyla ilgilidir.

# Immutable Update Mentality
React'te state doğrudan değiştirilmez.
YANLIŞ:
```tsx
count = count + 1;
```

DOĞRU:
```tsx
setCount(count + 1);
```
Çünkü React state değişimini takip eder.

# Birden Fazla State
Bir component birden fazla state taşıyabilir.

```tsx
const [isLoggedIn, setIsLoggedIn] =
  useState(false);

const [userName, setUserName] =
  useState("Ayşe");
```