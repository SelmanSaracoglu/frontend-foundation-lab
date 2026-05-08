// 08-literal-types/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// role adında bir değişken oluştur.
// Type'ı sadece "admin" olsun.
// Değer olarak "admin" ver.
// Console'a yazdır.

// Your code here:


// Expected output:
// admin


// =======================================================
// Exercise 2
// =======================================================

// Status adında bir type oluştur.
// Sadece şu değerleri alabilsin:
// "loading", "success", "error"
//
// currentStatus adında bir değişken oluştur.
// Type'ı Status olsun.
// İlk değer olarak "loading" ver.
// Sonra değerini "success" yap.
// Console'a iki durumu da yazdır.

// Your code here:


// Expected output:
// loading
// success


// =======================================================
// Exercise 3
// =======================================================

// Direction adında bir type oluştur.
// Sadece şu değerleri alabilsin:
// "left", "right", "up", "down"
//
// move adında bir function yaz.
// Parameter olarak direction: Direction alsın.
// direction değerini console'a yazdırsın.
//
// move function'ını "left" ve "down" ile çağır.

// Your code here:


// Expected output:
// left
// down


// =======================================================
// Exercise 4
// =======================================================

// Button type oluştur.
// Button içinde:
// label: string
// variant: "primary" | "secondary" | "danger"
//
// Bir button object oluştur.
// label: "Delete"
// variant: "danger"
//
// label ve variant değerlerini console'a yazdır.

// Your code here:


// Expected output:
// Delete
// danger


// =======================================================
// Exercise 5
// =======================================================

// Theme adında bir type oluştur.
// Sadece "light" veya "dark" alabilsin.
//
// setTheme adında bir function yaz.
// Parameter olarak theme: Theme alsın.
//
// Eğer theme "light" ise console'a "Light mode" yazdır.
// Eğer theme "dark" ise console'a "Dark mode" yazdır.
//
// Function'ı iki değerle de çağır.

// Your code here:


// Expected output:
// Light mode
// Dark mode


// =======================================================
// Exercise 6
// =======================================================

// Dice adında bir type oluştur.
// Sadece şu number değerlerini alabilsin:
// 1, 2, 3, 4, 5, 6
//
// dice adında bir değişken oluştur.
// İlk değer olarak 1 ver.
// Sonra değerini 6 yap.
// İki değeri de console'a yazdır.

// Your code here:


// Expected output:
// 1
// 6


// =======================================================
// Exercise 7
// =======================================================

// Task type oluştur.
// Task içinde:
// title: string
// status: "todo" | "in-progress" | "done"
//
// tasks adında Task[] array oluştur.
// En az 3 task ekle.
//
// filter kullanarak sadece status değeri "done" olan task'leri al.
// Sonucu console'a yazdır.

// Your code here:


// Expected output example:
// [ { title: 'Commit milestone', status: 'done' } ]


// =======================================================
// Exercise 8
// =======================================================

// Exercise 7'deki tasks array'ini kullan.
// filter callback parameter'ında destructuring kullan.
// Sadece status değeri "todo" olan task'leri al.
// Sonucu console'a yazdır.

// Your code here:


// Expected output example:
// [ { title: 'Practice exercises', status: 'todo' } ]


// =======================================================
// Exercise 9
// =======================================================

// UserRole adında bir type oluştur.
// Sadece şu değerleri alabilsin:
// "admin", "editor", "viewer"
//
// User type oluştur.
// User içinde:
// name: string
// role: UserRole
//
// users adında User[] array oluştur.
// En az 3 user ekle.
//
// filter kullanarak sadece role değeri "admin" olan user'ları al.
// filter içinde destructuring kullan.
// Sonucu console'a yazdır.

// Your code here:


// Expected output example:
// [ { name: 'Ada', role: 'admin' } ]


// =======================================================
// Exercise 10
// =======================================================

// Aşağıdaki soruları yorum satırı olarak cevapla:
//
// 1. string ile "success" literal type arasındaki fark nedir?
// 2. type Status = "loading" | "success" | "error"; ne anlama gelir?
// 3. Literal type typo hatalarını nasıl önler?
// 4. Hangi durumda literal type kullanmak mantıklıdır?

// Your answers here: