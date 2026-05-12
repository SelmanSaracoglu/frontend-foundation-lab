# React useEffect ve Side Effects
- component
- props
- state
- events
- conditional rendering
- forms

Gerçek uygulamalarda yalnızca render işlemi yapılmaz. Bazen component'in:
- API çağrısı yapması gerekir
- localStorage okuması gerekir
- timer başlatması gerekir
- event listener eklemesi gerekir
- dış sistemlerle konuşması gerekir

İşte bunlara: "side effect" denir.
React'te side effect yönetimi için en temel araç: "useEffect" hook'udur.

# Side Effect Nedir?
Side effect: Component render dışında yapılan işlemlerdir.
- API request
- console.log
- timer
- websocket connection
- localStorage işlemleri
- browser event listener
- analytics tracking
bunların hepsi side effect'tir.

# useEffect Neden Gerekli?
React component'leri normalde: UI render etmek için vardır.
Ama bazen render dışında işlem gerekir.

Örneğin: Component açılınca API çağır -> İşte burada useEffect kullanılır.

# İlk useEffect Örneği
```tsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component rendered");
  });

  return <h1>Hello</h1>;
}
```
Buradaki effect render sonrası çalışır.
```tsx
useEffect(() => {
  console.log("Component rendered");
});
```

# Dependency Array
En önemli konu: [] dependency array'dir.

# Component İlk Açıldığında Çalıştırma
```tsx
useEffect(() => {
  console.log("Mounted");
}, []);
```
Boş dependency array: Sadece ilk render'da çalış anlamına gelir.
Bu çok yaygın kullanımdır.
- API fetch
- initial setup
- auth check

# Belirli State Değişince Çalıştırma
```tsx
useEffect(() => {
  console.log("count changed");
}, [count]);
```

Burada effect count değişince çalışır. 

# Gerçek Mental Model
Render olur
    ↓
React DOM'u günceller
    ↓
Effect çalışır

useEffect render sırasında değil, render SONRASINDA çalışır.
Bu çok önemli.

# Cleanup Function
Bazı effect'ler temizlenmelidir.
- timer
- websocket
- event listener
```tsx
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Cleanup");
  };
}, []);
```

Return edilen function: "cleanup function" olarak çalışır.

# Sonsuz Render Problemi
Çok kritik bir konu:

YANLIŞ:
```tsx
useEffect(() => {
  setCount(count + 1);
});
```

Bu:
- render
- state update
- render
- state update

şeklinde sonsuz loop oluşturur. Bu React'te çok yaygın beginner hatasıdır.

# Fetch Mentality
Gerçek uygulamalarda çok yaygın pattern:
```tsx
useEffect(() => {
  fetchData();
}, []);
```
Yani: Component açılınca veri çek

# React Mental Model

React'te: "Render logic" ve "Side effect logic" ayrıdır.
Bu modern frontend engineering için çok önemlidir.
