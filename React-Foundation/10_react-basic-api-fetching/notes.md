# React Basic API Fetching

Gerçek React uygulamaları genelde veriyi sabit dizilerden değil, API'lerden alır.

Örneğin:

- kullanıcı listesi
- kurs listesi
- audit log kayıtları
- security alerts
- permission bilgileri
- dashboard metrikleri

çoğu zaman backend API'den gelir.

Bu milestone'da amaç profesyonel API mimarisine geçmek değil;
React içinde temel veri çekme akışını anlamaktır.

# API Fetching Nedir?

API fetching: > Frontend'in backend'den veri istemesidir.

React tarafında basit akış şudur:
Component açılır
      ↓
API çağrısı yapılır
      ↓
Loading gösterilir
      ↓
Veri gelirse liste gösterilir
      ↓
Hata olursa error gösterilir

# useEffect ile API Çağırma
Component ilk açıldığında API çağırmak için genelde `useEffect` kullanılır.
```tsx
useEffect(() => { fetchUsers(); }, []);
```
Boş dependency array: Component ilk render edildiğinde çalış anlamına gelir.

# Loading State
API çağrısı zaman alır. 
Bu yüzden kullanıcıya boş ekran göstermek yerine loading state kullanırız.
```tsx
const [isLoading, setIsLoading] = useState(true);
```

UI:
```tsx
if (isLoading) {
  return <p>Loading...</p>;
}
```

# Error State
API çağrısı başarısız olabilir.

Örneğin:
- internet yoktur
- backend kapalıdır
- token geçersizdir
- server hata dönmüştür
- kullanıcı yetkisizdir
Bu yüzden error state kullanırız.
```tsx
const [errorMessage, setErrorMessage] = useState("");
```

UI:
```tsx
if (errorMessage) {
  return <p>{errorMessage}</p>;
}
```

# Data State
Veri başarılı gelirse state'e koyarız.
```tsx
type User = {
  id: number;
  name: string;
  role: string;
};

const [users, setUsers] = useState<User[]>([]);
```

# Basit Fetch Pattern
```tsx
useEffect(() => {
  async function fetchUsers() {
    try {
      setIsLoading(true);

      const response = await fetch( "https://example.com/users" );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();

      setUsers(data);
    } catch {
      setErrorMessage(
        "Could not load users"
      );
    } finally {
      setIsLoading(false);
    }
  }

  fetchUsers();
}, []);
```
Bu pattern gerçek React uygulamalarında çok sık görülür.

# try / catch / finally Mantığı
API çağrılarında: 
--> try başarılı olabilecek işlemi dener.
--> catch hata olursa çalışır.
--> finally başarılı da olsa hatalı da olsa çalışır.

Genelde loading'i kapatmak için kullanılır.

# response.ok Neden Kontrol Edilir?

`fetch` önemli bir detaya sahiptir.
HTTP 404 veya 500 dönse bile her zaman `catch` bloğuna düşmeyebilir.

Bu yüzden:
```tsx
if (!response.ok) {
  throw new Error("Failed request");
}
```
kontrolü yapılır. Bu profesyonel API handling için önemlidir.

# API State Üçlüsü
Frontend'de API ekranları genelde üç state taşır:
- data
- loading
- error
Bu üçlü çok temel bir pattern'dir.
```tsx
const [users, setUsers] = useState<User[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
```

# UI Akışı
```tsx
if (isLoading) {
  return <p>Loading users...</p>;
}

if (errorMessage) {
  return <p>{errorMessage}</p>;
}

return <UserList users={users} />;
```
Bu yapı:
- okunabilir
- test edilebilir
- predictable bir UI oluşturur.

# Dikkat: Secret Bilgi Frontend'de Tutulmaz
Frontend kodu kullanıcıya gider. Bu yüzden frontend içine:
- API secret
- private key
- database password
- admin token asla koyulmaz.
Bu AppSec açısından çok temel bir kuraldır.
