# TypeScript Core Learning

Bu klasor TypeScript'i temel syntax seviyesinden gercek uygulama type modellemeye kadar kademeli calismak icin tasarlanmis bir mufredattir.

Her konu klasoru genelde su yapidadir:

- `notes.md`: konu anlatimi ve mental model
- `examples.ts`: calisan referans ornekler
- `exercises.ts`: pratik alistirmalar

Phase sonlarindaki `phase-*-review` klasorleri, o phase'de ogrenilen konulari birlikte kullanan tekrar modulleridir.

## Calisma Akisi

1. `notes.md` dosyasini oku.
2. `examples.ts` dosyasini calistirmadan once tahmin ederek oku.
3. `exercises.ts` dosyasini kendin doldur veya mevcut alistirmalari yeniden yaz.
4. Phase review klasorune gecmeden once phase icindeki konulari tekrar et.
5. Typecheck'i calistir ve hatayi sadece susturmak yerine type modelini duzelterek coz.

## Phase Hedefleri

| Phase | Odak | Hedef |
| --- | --- | --- |
| Phase 1 | TypeScript temelleri | Primitive types, functions, arrays, objects, collections ve strict ayarlar |
| Phase 2 | Reusable domain types | Type alias, interface, unions, narrowing, literal unions ve discriminated unions |
| Phase 3 | Safe TypeScript | unknown, never, type guards, generics, result types ve async typing |
| Phase 4 | Type tools | Utility types, keyof, indexed access, typeof, satisfies, as const ve modules |
| Phase 5 | OOP ve composition | Classes, access modifiers, readonly, inheritance ve composition kararları |
| Phase 6 | Real app modeling | Auth, audit, permission ve API result modellerini birlikte tasarlamak |

## Genel Checklist

Her phase sonunda sunlari kontrol et:

- [ ] Bu phase'in ana problemini kendi cumlelerimle aciklayabiliyorum.
- [ ] TypeScript hatasinin nedenini okuyup model uzerinden cozebiliyorum.
- [ ] `any` kullanmadan veri modelleyebiliyorum.
- [ ] Runtime data ile compile-time type ayrimini karistirmiyorum.
- [ ] Optional alanlar, union modeller ve strict ayarlar arasindaki iliskiyi anliyorum.
- [ ] Phase review dosyasini takip edip ornekleri typecheck'ten gecirebiliyorum.

## Typecheck

Butun repo icin:

```bash
npm run typecheck
```

Sadece TypeScriptCoreLearning icin:

```bash
npm run typecheck:typescript-core
```

## Devam Fikirleri

Bu klasor ileride su eklerle daha tam bir egitim paketine donusebilir:

- Her konu icin `solutions.ts`
- Phase bazli mini proje klasorleri
- Runtime validation icin Zod veya benzeri bir bolum
- Type-level testing icin `tsd` veya `expect-type` bolumu
- React + TypeScript entegrasyon serisine gecis notlari
