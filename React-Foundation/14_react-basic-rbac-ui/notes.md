# React Basic RBAC UI
RBAC şu anlama gelir: Role-Based Access Control
Yani kullanıcının rolüne göre hangi aksiyonları görebileceğini veya kullanabileceğini belirleme yaklaşımıdır.

admin  → kullanıcı yönetebilir
editor → içerik düzenleyebilir
viewer → sadece görüntüleyebilir
Bu milestone'da backend authorization kurmuyoruz. Sadece React tarafında role göre UI gösterme mantığını öğreniyoruz.

# RBAC UI Nedir?
> Kullanıcının rolüne göre farklı arayüz parçaları göstermektir.
```tsx
{user.role === "admin" && (
  <button>Delete User</button>
)}
```
Bu, kullanıcı deneyimi için faydalıdır. Ama güvenlik için tek başına yeterli değildir.

# Çok Önemli Güvenlik Notu
Frontend'de buton gizlemek güvenlik değildir.

Kötü düşünce:
Delete butonunu gizledim, artık viewer kullanıcı silemez. --> Yanlış.

Kullanıcı frontend kodunu manipüle edebilir veya API'ye direkt istek atabilir.

Doğru model:
-- Frontend → kullanıcı deneyimi ve görünürlük
-- Backend  → gerçek authorization kontrolü

RBAC'ın güvenlik tarafı backend'de zorunlu olarak kontrol edilmelidir.

# Role Modelleme

Basit bir role tipi:
```tsx
type Role =
  | "admin"
  | "editor"
  | "viewer";
```

User tipi:
```tsx
type User = {
  id: number;
  name: string;
  role: Role;
};
```
Bu yaklaşım TypeScript ile yanlış role kullanımını azaltır.

# Permission Mantığı
Bazen doğrudan role kontrolü yapmak yerine permission mantığı kullanırız.

```tsx
type Permission =
  | "user:read"
  | "user:delete"
  | "course:edit";
```

Sonra role → permission eşleşmesi yapılabilir.
Bu milestone'da basit permission mapping kullanacağız.

# Role'den Permission Türetme

```tsx
const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "user:read",
    "user:delete",
    "course:edit",
  ],
  editor: [
    "user:read",
    "course:edit",
  ],
  viewer: [
    "user:read",
  ],
};
```

Bu yapı şunu sağlar:
-- Role doğrudan UI'a dağılmaz.
-- Permission kontrolü merkezi hale gelir.

# hasPermission Yardımcı Fonksiyonu
```tsx
function hasPermission(
  role: Role,
  permission: Permission
) {
  return rolePermissions[role].includes(permission);
}
```

Kullanım:
```tsx
{hasPermission(user.role, "user:delete") && (
  <button>Delete User</button>
)}
```
Bu daha okunabilir ve sürdürülebilir bir yaklaşımdır.

# Neden Permission Daha İyi?
Küçük projede role kontrolü yeterli olabilir. Ama proje büyüdükçe şu kodlar yayılır:
-- user.role === "admin"

Bu ileride bakım zorluğu yaratır. Permission yaklaşımı daha kontrollüdür:
-- hasPermission(user.role, "user:delete")

Bu cümle iş kuralını daha iyi anlatır.

# RBAC UI Nerelerde Kullanılır?

Gerçek uygulamalarda:
- admin panel
- user management
- course management
- audit log visibility
- settings screen
- billing actions
- security controls gibi alanlarda kullanılır.

# Test Automation Açısından Önemi
İleride Cypress ile şunları test edebiliriz:
-- Admin Delete User butonunu görür.
-- Viewer Delete User butonunu görmez.
-- Editor Course Edit butonunu görür.
Bu yüzden RBAC UI mantığını temiz kurmak test edilebilirliği artırır.

# React Mental Model
RBAC UI yine derived UI'dır.
user.role
   ↓
permissions
   ↓
visible UI actions

State'i çoğaltmıyoruz. UI'ı mevcut user bilgisinden türetiyoruz.
