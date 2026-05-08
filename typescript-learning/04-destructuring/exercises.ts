// 06-destructuring/exercises.ts

// =======================================================
// Exercise 1
// =======================================================

// Aşağıdaki object içinden name ve city değerlerini destructuring ile al.
// Sonra console.log ile yazdır.

const student = {
  name: "Mert",
  city: "Istanbul",
  age: 21,
};

// Your code here:


// Expected output:
// Mert
// Istanbul


// =======================================================
// Exercise 2
// =======================================================

// Aşağıdaki object içinden brand ve year değerlerini destructuring ile al.
// Sonra console.log ile yazdır.

const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};

// Your code here:


// Expected output:
// Toyota
// 2020


// =======================================================
// Exercise 3
// =======================================================

// Product type oluştur.
// Product içinde title: string ve price: number olsun.
// Sonra bir product object oluştur.
// Destructuring ile title ve price değerlerini al.
// Console'a yazdır.

// Your code here:


// Expected output example:
// Mouse
// 450


// =======================================================
// Exercise 4
// =======================================================

// User type oluştur.
// User içinde name: string ve age: number olsun.
// printUserNormal adında bir function yaz.
// Function parameter olarak user: User alsın.
// Function içinde user.name ve user.age değerlerini yazdır.

// Your code here:


// Expected output example:
// Ada
// 28


// =======================================================
// Exercise 5
// =======================================================

// Exercise 4'teki function'ın destructuring kullanan versiyonunu yaz.
// Function adı printUserDestructured olsun.
// Parameter içinde { name, age }: User kullan.
// name ve age değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// Ada
// 28


// =======================================================
// Exercise 6
// =======================================================

// Profile type oluştur.
// Profile içinde username: string ve bio?: string olsun.
// Bir profile object oluştur.
// bio değerini yazma.
// Destructuring ile username ve bio değerlerini al.
// İkisini console'a yazdır.

// Your code here:


// Expected output example:
// codelearner
// undefined


// =======================================================
// Exercise 7
// =======================================================

// Course type oluştur.
// Course içinde title: string ve duration?: number olsun.
// Bir course object oluştur.
// duration değerini yazma.
// Destructuring yaparken duration için default value olarak 0 ver.
// title ve duration değerlerini console'a yazdır.

// Your code here:


// Expected output example:
// TypeScript
// 0


// =======================================================
// Exercise 8
// =======================================================

// Aşağıdaki object içinden name değerini al.
// Ama değişken adı userName olsun.
// Sonra userName değerini console'a yazdır.

const appUser = {
  name: "Elif",
  email: "elif@example.com",
};

// Your code here:


// Expected output:
// Elif


// =======================================================
// Exercise 9
// =======================================================

// Aşağıdaki colors array'inden ilk iki rengi array destructuring ile al.
// Değişken isimleri firstColor ve secondColor olsun.
// İkisini console'a yazdır.

const colors = ["red", "green", "blue"];

// Your code here:


// Expected output:
// red
// green


// =======================================================
// Exercise 10
// =======================================================

// Aşağıdaki scores array'inden ilk iki skoru destructuring ile al.
// firstScore ve secondScore değişkenlerini oluştur.
// İkisini console'a yazdır.

const scores = [100, 85, 70];

// Your code here:


// Expected output:
// 100
// 85


// =======================================================
// Exercise 11
// =======================================================

// Book type oluştur.
// Book içinde title: string ve pages: number olsun.
// books adında Book[] array oluştur.
// En az 3 book ekle.
// map kullanarak sadece book title'larından oluşan bir array üret.
// map callback parameter'ında destructuring kullan.

// Your code here:


// Expected output example:
// [ 'Book A', 'Book B', 'Book C' ]


// =======================================================
// Exercise 12
// =======================================================

// Movie type oluştur.
// Movie içinde title: string ve rating: number olsun.
// movies adında Movie[] array oluştur.
// En az 3 movie ekle.
// filter kullanarak rating değeri 8'den büyük olan filmleri al.
// filter callback parameter'ında destructuring kullan.

// Your code here:


// Expected output example:
// [
//   { title: 'Movie A', rating: 9 },
//   { title: 'Movie C', rating: 8.5 }
// ]


// =======================================================
// Exercise 13
// =======================================================

// Employee type oluştur.
// Employee içinde name: string, department: string ve salary: number olsun.
// employees adında Employee[] array oluştur.
// En az 3 employee ekle.
//
// Sonra map kullanarak sadece employee name'lerinden oluşan array üret.
// map içinde destructuring kullan.
//
// Sonra filter kullanarak salary değeri 50000'den büyük olan employee'leri al.
// filter içinde destructuring kullan.

// Your code here:


// Expected output example:
// [ 'Ayse', 'Mehmet', 'Zeynep' ]
// [
//   { name: 'Ayse', department: 'Engineering', salary: 70000 },
//   { name: 'Zeynep', department: 'Design', salary: 55000 }
// ]