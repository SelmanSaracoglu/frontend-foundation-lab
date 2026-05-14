# React Custom Hooks Basics
Şu ana kadar React'te birçok component yazdık. Ama gerçek projelerde bazı logic'ler tekrar etmeye başlar. Aynı logic'i farklı component'lerde tekrar tekrar yazmak istemeyiz.
İşte burada: "custom hook" devreye girer.

Örneğin:
- API fetching
- loading state
- form handling
- auth state
- search input yönetimi
- toggle logic
- polling
- permission kontrolü

# Hook Nedir?
>> React özelliklerini function component içinde kullanmamızı sağlayan özel function'lardır.

-- useState
-- useEffect

zaten built-in hook'lardır.

Custom hook ise: Bizim yazdığımız "reusable hook" demektir.

# Custom Hook Nedir?
>>> Tekrar eden stateful logic'i reusable hale getiren function'dır.
```tsx
function useToggle() {
  const [isOpen, setIsOpen] =
    useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  };
}
```
Kullanım:
```tsx
const { isOpen, toggle } =
  useToggle();
```

# Hook İsmi Neden use ile Başlar?

Custom hook isimleri: "use..." ile başlamalıdır.
-- useAuth
-- useSearch
-- useModal
-- usePermissions

Bu:
- React convention'ıdır
- lint kuralları için önemlidir
- okunabilirlik sağlar

# Custom Hook Ne İçin Kullanılır?
Önemli nokta: UI tekrarını değil, logic tekrarını azaltır.

Kötü tekrar:
```tsx
const [isOpen, setIsOpen] =
  useState(false);

function toggle() {
  setIsOpen(!isOpen);
}
```
Bu logic birçok component'te tekrar ediyorsa custom hook mantıklıdır.

# İlk Gerçek Örnek
```tsx
function useCounter() {
  const [count, setCount] =
    useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  return {
    count,
    increase,
    decrease,
  };
}
```

Component:
```tsx
function CounterPanel() {
  const {
    count,
    increase,
    decrease,
  } = useCounter();

  return (
    <section>
      <p>{count}</p>

      <button onClick={increase}>
        Increase
      </button>

      <button onClick={decrease}>
        Decrease
      </button>
    </section>
  );
}
```

# Hook İçinde Hook Kullanımı
Custom hook içinde:
- useState
- useEffect
- diğer custom hook'lar kullanılabilir.

Bu çok güçlü bir pattern'dir.

# Hook Rules
React hook'larında çok önemli kurallar vardır.

Hook'lar:
✅ component top-level'ında çağrılır
✅ custom hook içinde çağrılabilir

❌ if içinde çağrılmaz
❌ loop içinde çağrılmaz
❌ normal function içinde çağrılmaz

YANLIŞ:
```tsx
if (isVisible) {
  useEffect(() => {});
}
```
Bu React hook sistemini bozar.

# Custom Hook Mental Model

Custom hook: Reusable stateful behavior sağlar.

Ama: Reusable UI değildir. UI component içinde kalır.

# Gerçek Kullanım Alanları
Gerçek projelerde çok sık görülür:
- useAuth
- useApi
- usePermissions
- useDebounce
- useLocalStorage
- useSearch
- useModal
- usePolling

Senin hedeflerin için özellikle:
- auth logic
- API state
- security polling
- reusable frontend behavior tarafında çok önemlidir.

# Fazla Erken Hook Yazma Riski
Başlangıçta yapılan hata: Her şeyi custom hook yapmak

Önce tekrar eden pattern gerçekten oluşmalı.

İyi yaklaşım: 
-- Tekrar eden logic varsa extract et.
-- Yoksa component içinde bırak.

# React Mental Model

Component: UI render eder
Custom hook: stateful behavior paylaşır

Bu ayrım çok önemlidir.
