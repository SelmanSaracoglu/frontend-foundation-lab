# React API State Patterns
Önceki milestone'da temel API fetching öğrendik. Ama gerçek projelerde API state yönetimini biraz daha düzenli düşünmek gerekir. Çünkü API çağrısı sadece veri çekmek değildir.

Genellikle şu durumları yönetiriz:
- idle
- loading
- success
- error
Bu milestone'da API ekranlarını daha temiz ve güvenilir modellemeyi öğreneceğiz.

# Problem: Ayrı Ayrı State Karmaşası
```tsx
const [users, setUsers] = useState<User[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
```
Bu başlangıç için iyidir. Ama uygulama büyüdükçe şu problemler çıkabilir:
--> isLoading true ama errorMessage da dolu
--> veya: data var ama errorMessage da var

Yani state'ler birbiriyle çelişebilir.

# Daha Net Yaklaşım: Status State
API durumunu tek bir status ile modellemek daha okunabilir olabilir.
```tsx
type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";
```
Sonra:
```tsx
const [status, setStatus] =
  useState<ApiStatus>("idle");
```
Bu bize daha net bir akış verir.

# API Status Mental Model
idle
 ↓
loading
 ↓
success

veya

idle
 ↓
loading
 ↓
error
-> Bu flow frontend ekranlarını daha predictable yapar.

# Data ve Error Ayrı Kalabilir
Status tek olsa bile data ve error ayrı tutulabilir.
```tsx
const [users, setUsers] = useState<User[]>([]);
const [errorMessage, setErrorMessage] = useState("");
```

Ama UI kararını çoğunlukla status verir.
```tsx
if (status === "loading") {
  return <p>Loading...</p>;
}

if (status === "error") {
  return <p>{errorMessage}</p>;
}
```

# Neden Bu Daha İyi?
Çünkü UI akışı daha net olur:
--> status loading ise loading göster
--> status error ise hata göster
--> status success ise data göster

Bu yaklaşım test yazarken de çok faydalıdır. Örneğin Cypress'te ileride şunları test ederiz:
- loading görünür
- hata durumunda error message görünür
- başarılı durumda liste görünür

# Empty State
Başarılı API çağrısı her zaman veri döndürmeyebilir.

Örneğin: --> API başarılı ama liste boş

Bu error değildir. Bu ayrı bir UI durumudur:
```tsx
if (status === "success" && users.length === 0) {
  return <p>No users found</p>;
}
```

# Error ile Empty State Farkı: Bu ayrım çok önemlidir.

Error: API çağrısı başarısız oldu.
Empty: API çağrısı başarılı oldu ama gösterilecek veri yok.

Bunları karıştırmak kötü kullanıcı deneyimi ve yanlış test senaryoları oluşturur.

# Güvenli Error Message
Frontend'de kullanıcıya teknik veya hassas hata detayı göstermek doğru değildir.

Kötü örnek: --> Database connection failed at internal-db-prod:5432
Daha doğru: --> Could not load users. Please try again.

Gerçek hata detayı backend loglarında veya monitoring sisteminde kalmalıdır. 
Bu AppSec açısından önemlidir.

# API UI State Checklist
Bir API ekranı tasarlarken şunları düşün:
-> Başlangıç durumu ne?
-> Loading nasıl görünecek?
-> Success nasıl görünecek?
-> Empty state var mı?
-> Error mesajı güvenli mi?
-> Retry gerekiyor mu?

Şimdilik retry eklemiyoruz. Ama gerçek sistemlerde önemli bir pattern'dir.
