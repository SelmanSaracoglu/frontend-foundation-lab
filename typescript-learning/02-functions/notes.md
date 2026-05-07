# Milestone 1.3 — Functions

Fonksiyon:
Tekrar kullanılabilir bir işi paketlemektir.

Amaç:
- tekrar eden kodu azaltmak
- kodu düzenlemek
- belirli işleri isimlendirmek

Örnek:

function sayHello() {
  console.log("Hello");
}

Bu fonksiyon çağrıldığında ekrana "Hello" yazar.

# Function Parameters

Parameter:
Fonksiyonun dışarıdan veri almasını sağlar.

Örnek:

function greet(name: string) {
  console.log("Hello " + name);
}

Burada:
name bir parametredir.

Fonksiyon çalışırken dışarıdan değer alır.

# Return

Bazı fonksiyonlar sonuç üretir.

Bu sonucu dışarı vermek için return kullanılır.

Örnek:

function add(a: number, b: number) {
  return a + b;
}

Bu fonksiyon:
iki sayıyı toplar
ve sonucu geri verir.