# Milestone 1 — Basic Types

TypeScript, JavaScript koduna tip bilgisi ekler.

Ana amaç: Kod çalışmadan önce bazı hataları yakalamak.

Örnek:

const productName: string = "Takım";

Burada anlam: productName değişkeni sadece string yani yazı tutmalı.

Temel tipler:

string -> yazı/metin
number -> sayı
boolean -> true / false

TypeScript'te tip, değişken adından sonra iki nokta ile yazılır:

const name: string = "Selman";

# Type Inference

TypeScript bazen tipi otomatik anlayabilir.

Örnek:
const username = "selman";

Burada TypeScript şunu düşünürÇ "Bu bir string." Bu yüzden bazen tip yazmamıza gerek kalmaz. Buna Type Inference denir.
