# Panduan Membuka & Mengedit Mockup Figma (100% Offline Tanpa Plugin)

File mockup sudah dibuat khusus dengan standar format **Laptop/Desktop (1440px)** persis seperti website Dapoer PMC SU.

Lokasi file:
📁 **`figma-mockup/dapoer-pmcsu-laptop-mockup.svg`**

---

## 🚀 Cara Membuka di Figma (Bisa Tanpa Internet)

1. Buka aplikasi **Figma Desktop** di laptop Anda.
2. Buat file baru (**New design file**).
3. Buka File Explorer di Windows, lalu **drag & drop (tarik dan lepaskan)** file berikut langsung ke tengah kanvas Figma:
   `c:\Users\wiraa\Downloads\ProjectCoba2\figma-mockup\dapoer-pmcsu-laptop-mockup.svg`
4. Seluruh desain website laptop (1440 x 3700 px) akan langsung terbuka dengan **layer-layer terorganisir**:
   - `Top-Announcement-Bar` (Jam operasional & running info)
   - `Navbar-Desktop` (Logo Halal resmi pojok kiri, Logo Brand + Delicious Tastes, Menu navigasi, Button WA)
   - `Hero-Section` (Judul H1, checklist garansi, tombol CTA, card paket prasmanan)
   - `Layanan-Section` (3 card layanan: Prasmanan, Nasi Kotak, Tumpeng)
   - `Menu-Catalog-Section` (Filter tabs, 3 card menu lengkap harga & tombol WA)
   - `Galeri-Section` (Portofolio acara 4 item, banner konsultasi)
   - `Footer-Section` (Card QR Sertifikat Halal resmi, bio, kolom navigasi, medsos)

---

## 🎯 Cara Membuatnya Bisa Diklik (Interaktif / Prototype di Figma)

Setelah di-drop ke Figma, Anda bisa langsung mengatur fitur Prototype agar bisa diklik layaknya website aslinya:

1. Di panel kanan atas Figma, klik tab **Prototype**.
2. Klik teks navigasi di Navbar, misalnya teks **"Katalog Menu"** atau tombol **"Pilih Menu Sekarang"**.
3. Tarik tanda **lingkaran (+) biru** yang muncul ke arah frame/grup **`Menu-Catalog-Section`**.
4. Di popup interaksi, atur:
   - **Trigger**: `On click`
   - **Action**: `Scroll to`
   - **Target**: `Menu-Catalog-Section`
   - **Animation**: `Animate` / `Ease in and out`
5. Lakukan hal yang sama untuk link lainnya:
   - "Layanan" ➡️ Scroll to `Layanan-Section`
   - "Galeri Acara" ➡️ Scroll to `Galeri-Section`
   - "Tentang Kami" ➡️ Scroll to `Hero-Section`
6. Klik tombol **Present (Play ▶️)** di pojok kanan atas Figma:
   - Mockup laptop bisa di-scroll dan diklik seperti website aslinya, dan bisa digunakan saat presentasi offline!
