// 09-enums/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// Status enum oluştur.
// Değerler:
// Loading = "loading"
// Success = "success"
// Error = "error"
//
// currentStatus adında bir değişken oluştur.
// İlk değer olarak Status.Loading ver.
// Sonra Status.Success yap.
// İki değeri de console'a yazdır.

// Your code here:


// Expected output:
// loading
// success


// =======================================================
// Exercise 2
// =======================================================

// Direction enum oluştur.
// Değerler:
// Left = "left"
// Right = "right"
// Up = "up"
// Down = "down"
//
// move adında bir function yaz.
// Parameter olarak direction: Direction alsın.
// direction değerini console'a yazdırsın.
//
// move function'ını Direction.Left ve Direction.Down ile çağır.

// Your code here:


// Expected output:
// left
// down


// =======================================================
// Exercise 3
// =======================================================

// UserRole enum oluştur.
// Değerler:
// Admin = "admin"
// Editor = "editor"
// Viewer = "viewer"
//
// User type oluştur.
// User içinde:
// name: string
// role: UserRole
//
// Bir user object oluştur.
// role olarak UserRole.Admin kullan.
// name ve role değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// Ada
// admin


// =======================================================
// Exercise 4
// =======================================================

// TaskStatus enum oluştur.
// Değerler:
// Todo = "todo"
// InProgress = "in-progress"
// Done = "done"
//
// Task type oluştur.
// Task içinde:
// title: string
// status: TaskStatus
//
// tasks adında Task[] array oluştur.
// En az 3 task ekle.
//
// filter kullanarak sadece status değeri TaskStatus.Done olanları al.
// Sonucu console'a yazdır.

// Your code here:


// Expected output example:
// [ { title: 'Learn enums', status: 'done' } ]


// =======================================================
// Exercise 5
// =======================================================

// Exercise 4'teki tasks array'ini kullan.
// filter callback parameter'ında destructuring kullan.
// Sadece TaskStatus.Todo olan task'leri al.
// Sonucu console'a yazdır.

// Your code here:


// Expected output example:
// [ { title: 'Commit changes', status: 'todo' } ]


// =======================================================
// Exercise 6
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. Enum ne işe yarar?
// 2. String enum ile literal union benzer olarak hangi problemi çözer?
// 3. Basit string seçenekleri için çoğu zaman hangi yapı yeterlidir?
// 4. Enum değerini kullanırken neden Status.Success gibi yazarız?

// Your answers here: