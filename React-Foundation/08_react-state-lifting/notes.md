# React State Lifting
Şu ana kadar state'i component içinde tuttuk.
```tsx
function Counter() {
  const [count, setCount] =
    useState(0);
}
```
Bu güzel ama gerçek uygulamalarda birden fazla component aynı veriye ihtiyaç duyar.
- search input
- search results
- filter panel
- notification counter
- auth state
- selected user
- selected course -> aynı state'i paylaşmak isteyebilir.

İşte burada "state lifting" devreye girer.

# State Lifting Nedir?
Ortak kullanılan state'i üst component'e taşımaktır.

React'te veri akışı yukarıdan aşağı olduğu için,
paylaşılan state genellikle ortak parent component'te tutulur.

# Problem Senaryosu
SearchPage
 ├─ SearchInput
 └─ SearchResults

`SearchInput`: - kullanıcıdan arama alıyor
`SearchResults`: - arama sonucunu gösteriyor

İkisi de aynı search query verisini kullanmalı. 
Ama kardeş component'ler doğrudan birbirine state veremez.

# Çözüm: State'i Parent'a Taşımak
SearchPage
 ├─ SearchInput
 └─ SearchResults

```tsx
const [query, setQuery] =
  useState("");
```
`SearchPage` içinde tutulur. Sonra props ile aşağı gönderilir.

# İlk State Lifting Örneği
```tsx
import { useState } from "react";

type SearchInputProps = {
  query: string;
  onQueryChange: (
    value: string
  ) => void;
};

function SearchInput({
  query,
  onQueryChange,
}: SearchInputProps) {
  return (
    <input
      value={query}
      onChange={(event) =>
        onQueryChange(
          event.target.value
        )
      }
    />
  );
}
```
Parent:
```tsx
function SearchPage() {
  const [query, setQuery] =
    useState("");

  return (
    <SearchInput
      query={query}
      onQueryChange={setQuery}
    />
  );
}
```

# Callback Props
State lifting'te çok önemli pattern:

Parent state tutar
        ↓
Child veri gösterir
        ↓
Child callback çağırır
        ↓
Parent state günceller

Bu React'in temel veri akışıdır.

# Child Parent State'i Nasıl Günceller?

Direkt güncellemez. Parent bir callback verir.
onQueryChange={setQuery}

Child: onQueryChange(event.target.value) çağırır.

Parent state değişir.

# Real Engineering Pattern
Bu pattern gerçek projelerde her yerde vardır:

- search systems
- filters
- table sorting
- auth forms
- modal open state
- dashboard controls
- security settings
- RBAC management

React engineering'in temel yapı taşlarından biridir.

# Single Source of Truth
State lifting'in en önemli fikri:
```txt
Single source of truth
```
Bir veri mümkün olduğunca tek yerde tutulmalıdır.
- bug riskini azaltır
- senkronizasyon problemlerini azaltır
- test etmeyi kolaylaştırır

# Kötü Pattern
Kötü yaklaşım: Aynı state'i farklı component'lerde ayrı ayrı tutmak
Bu zamanla:
- inconsistent UI
- stale data
- synchronization bugs
oluşturur.

# Controlled Component Mentality
State lifting aslında controlled component mantığını büyütür.

Parent: - state owner olur
Child: - controlled UI component olur

Bu React'te çok yaygındır.