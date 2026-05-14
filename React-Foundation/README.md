# React Foundation

Bu klasor React temellerini kademeli olarak calismak icin tasarlanmis bir mini mufredattir. Her modul ayni yapidadir:

- `notes.md`: konu anlatimi ve mental model
- `examples.tsx`: calisan referans ornek
- `exercises.tsx`: bosluklu pratik dosyasi
- `solutions.tsx`: egzersizler icin referans cozum

## Calisma Akisi

1. Once `notes.md` dosyasini oku.
2. `examples.tsx` dosyasini satir satir incele.
3. `exercises.tsx` dosyasini bakmadan doldur.
4. Takildigin yerde sadece ilgili bolum icin `solutions.tsx` dosyasina bak.
5. Cozumu kopyalamak yerine tekrar `exercises.tsx` icinde kendin yaz.

## Modul Hedefleri

| Modul | Hedef |
| --- | --- |
| 01 Components ve JSX | JSX kurallarini ve component render etmeyi ogrenmek |
| 02 Props | Parent component'ten child component'e veri gecmek |
| 03 State ve Events | Kullanici aksiyonlariyla UI state guncellemek |
| 04 Conditional ve List Rendering | Kosullu UI ve liste render etme mantigini kurmak |
| 05 Forms ve Controlled Inputs | Input degerini React state ile yonetmek |
| 06 useEffect ve Side Effects | Render sonrasi isleri ve cleanup mantigini anlamak |
| 07 Component Composition | UI'i kucuk, anlamli component'lere bolmek |
| 08 State Lifting | Ortak state'i parent component'e tasimak |
| 09 Derived UI | Gereksiz state yerine UI'i mevcut veriden turetmek |
| 10 Basic API Fetching | Loading, error ve data state ile API verisi gostermek |
| 11 API State Patterns | API status state ile UI akislarini netlestirmek |
| 12 Error Handling Concept | Defensive rendering ve fallback UI dusunmek |
| 13 Auth UI State | Login/logout durumunu UI state olarak modellemek |
| 14 Basic RBAC UI | Role ve permission ile gorunur UI aksiyonlari turetmek |
| 15 Reusable Components | Ortak UI component'leri props ve children ile tasarlamak |
| 16 Custom Hooks Basics | Tekrar eden stateful logic'i custom hook'a cikarmak |

## Genel Checklist

Her modul sonunda sunlari kontrol et:

- [ ] Konuyu kendi cumlelerimle aciklayabiliyorum.
- [ ] Ornekteki component'leri neden o sekilde yazdigimi anlatabiliyorum.
- [ ] Egzersizi `solutions.tsx` dosyasina bakmadan cozebiliyorum.
- [ ] State, props, derived value ve side effect ayrimini ayirt edebiliyorum.
- [ ] Bu pattern'in gercek uygulamada nerede kullanilacagini ornekleyebiliyorum.

## Mini Projeler

Mini projeler `projects` klasoru altindadir. Her projede `README.md`, `starter.tsx` ve `solution.tsx` bulunur.

| Proje | Moduller | Odak |
| --- | --- | --- |
| [Course Directory](./projects/01_course-directory/README.md) | 01-04 | components, props, list rendering, conditional rendering |
| [Searchable Feedback Board](./projects/02_searchable-feedback-board/README.md) | 05-08 | controlled inputs, forms, callback props, state lifting |
| [API Dashboard](./projects/03_api-dashboard/README.md) | 09-12 | derived UI, API fetching, API status, defensive rendering |
| [Auth Support Panel](./projects/04_auth-support-panel/README.md) | 13-16 | auth state, RBAC, reusable components, custom hooks |

## Sonraki Seri Icin Dogal Devam

React Foundation bittikten sonra su konular ayri bir `React-Intermediate` serisine alinabilir:

- Context API
- useReducer
- useMemo ve useCallback
- React Router
- reusable form patterns
- API state icin custom hook
- Error Boundary implementation
- React component testing
- React Query basics
- final project: admin dashboard
