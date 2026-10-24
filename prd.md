# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Website Brand Catering dengan CMS Admin

**Versi:** 0.1 — Draft Awal
**Status:** Penyusunan kebutuhan produk
**Platform:** Website responsif
**Model pemesanan:** WhatsApp
**Pengguna utama:** Calon pelanggan dan admin brand catering

---

## 1. Ringkasan Produk

Website ini merupakan website resmi untuk sebuah brand catering yang berfungsi sebagai media informasi, katalog menu, dan sarana pemesanan bagi pelanggan. Website akan menampilkan informasi mengenai brand, visi dan misi, layanan catering, menu makanan dan minuman, lokasi usaha, serta panduan pemesanan.

Untuk memudahkan pelanggan melakukan pemesanan, website menyediakan tombol yang mengarahkan pelanggan ke WhatsApp dengan pesan yang dapat diisi secara otomatis berdasarkan menu yang dipilih.

Website juga dilengkapi dengan Content Management System (CMS) yang dapat digunakan admin untuk mengelola konten website tanpa harus mengubah kode program secara langsung.

## 2. Latar Belakang

Calon pelanggan membutuhkan informasi yang jelas mengenai brand catering sebelum melakukan pemesanan. Informasi tersebut meliputi profil brand, pilihan layanan, daftar menu, harga, lokasi, dan cara pemesanan.

Website akan menjadi pusat informasi resmi yang dapat diakses pelanggan kapan saja. Dengan adanya CMS, pemilik atau admin juga dapat memperbarui informasi, menu, harga, dan gambar secara mandiri.

## 3. Tujuan Produk

1. Meningkatkan kemudahan pelanggan dalam mengenal brand catering.
2. Menyediakan informasi layanan dan katalog menu secara terstruktur.
3. Mempermudah pelanggan menemukan informasi harga dan cara pemesanan.
4. Mengarahkan calon pelanggan untuk melakukan pemesanan melalui WhatsApp.
5. Memungkinkan admin mengelola konten website melalui CMS.
6. Membangun citra brand yang profesional dan meningkatkan kepercayaan calon pelanggan.

## 4. Target Pengguna

### 4.1 Calon Pelanggan

Pengunjung yang ingin mencari informasi mengenai brand catering, melihat pilihan menu dan harga, mengetahui layanan yang tersedia, serta menghubungi pihak catering untuk melakukan pemesanan.

### 4.2 Admin

Pemilik usaha atau petugas yang bertanggung jawab mengelola informasi brand, layanan, menu makanan dan minuman, informasi lokasi, serta konten lainnya pada website.

## 5. Ruang Lingkup Produk

### 5.1 Website Publik

Website publik dapat diakses tanpa login dan menyediakan halaman berikut:

* **Beranda:** Menampilkan identitas brand, gambar utama, ringkasan layanan, menu unggulan, dan tombol pemesanan.
* **Tentang Kami:** Berisi profil brand, cerita singkat, visi, dan misi.
* **Layanan:** Menampilkan jenis layanan catering yang ditawarkan beserta penjelasannya.
* **Menu:** Menampilkan katalog makanan dan minuman, gambar, nama produk, deskripsi, harga, kategori, dan status ketersediaan.
* **Detail Menu:** Menampilkan informasi yang lebih lengkap mengenai menu serta tombol untuk melakukan pemesanan melalui WhatsApp.
* **Lokasi dan Kontak:** Menampilkan alamat usaha, nomor WhatsApp, jam operasional jika tersedia, serta tautan peta lokasi.
* **Galeri / Portofolio & Testimoni:** Menampilkan dokumentasi acara catering sebelumnya dan testimoni ulasan pelanggan untuk membangun kepercayaan.
* **Cara Pemesanan:** Menjelaskan langkah-langkah pemesanan, informasi yang perlu disiapkan pelanggan, dan ketentuan pemesanan.
* **Tombol Pemesanan WhatsApp:** Memudahkan pelanggan menghubungi pihak catering dari halaman yang relevan dengan pesan template otomatis.

Halaman-halaman tersebut dapat menggunakan satu halaman panjang dengan navigasi antarbagiannya atau dipisahkan menjadi beberapa halaman. Keputusan akhir ditetapkan pada tahap desain UI/UX.

### 5.2 CMS Admin

CMS merupakan area khusus yang hanya bisa diakses pengguna yang memiliki hak akses sesuai ketentuan sistem.

Fitur CMS meliputi:

* Login dan logout admin.
* Dashboard ringkasan pengelolaan konten.
* Pengelolaan profil brand, visi, dan misi.
* Pengelolaan layanan catering.
* Pengelolaan kategori menu.
* Pengelolaan menu makanan dan minuman (termasuk varian/pilihan paket sederhana).
* Pengelolaan harga, deskripsi, foto, dan ketersediaan menu.
* Pengelolaan galeri dokumentasi acara dan testimoni pelanggan.
* Pengelolaan informasi alamat, kontak, dan nomor WhatsApp.
* Pengelolaan template format pesan WhatsApp dinamis (dengan placeholder nama menu, harga, dll).
* Pengelolaan panduan pemesanan.
* Pengelolaan gambar utama dan banner promosi, dilengkapi kompresi/optimasi gambar otomatis (WebP).
* Pengaturan publikasi konten, jika diperlukan.

Perubahan konten yang telah disimpan dan dipublikasikan harus ditampilkan pada website publik tanpa admin perlu mengedit kode program.

## 6. Kebutuhan Fungsional

| ID    | Kebutuhan                                                                            | Prioritas   |
| ----- | ------------------------------------------------------------------------------------ | ----------- |
| FR-01 | Pengunjung dapat melihat informasi brand, visi, dan misi.                            | Must Have   |
| FR-02 | Pengunjung dapat melihat daftar layanan catering.                                    | Must Have   |
| FR-03 | Pengunjung dapat melihat katalog menu makanan dan minuman.                           | Must Have   |
| FR-04 | Setiap menu dapat menampilkan nama, foto, deskripsi, harga, dan status ketersediaan. | Must Have   |
| FR-05 | Pengunjung dapat menekan tombol pemesanan yang mengarah ke WhatsApp.                 | Must Have   |
| FR-06 | Pesan WhatsApp dapat diisi otomatis menggunakan informasi menu yang dipilih serta template format yang dapat diatur admin. | Must Have   |
| FR-07 | Pengunjung dapat melihat alamat dan informasi kontak brand.                          | Must Have   |
| FR-08 | Pengunjung dapat membaca panduan pemesanan.                                          | Must Have   |
| FR-09 | Admin dapat login dan logout dengan aman.                                            | Must Have   |
| FR-10 | Admin dapat menambah, melihat, mengubah, dan menghapus konten yang dikelolanya.      | Must Have   |
| FR-11 | Admin dapat mengelola foto dan status ketersediaan menu.                             | Must Have   |
| FR-12 | Admin dapat mengubah nomor WhatsApp dan alamat usaha.                                | Must Have   |
| FR-13 | Website dapat diakses melalui desktop, tablet, dan ponsel.                           | Must Have   |
| FR-14 | Admin dapat mengatur publikasi konten sebelum ditampilkan ke publik.                 | Should Have |
| FR-15 | Sistem dapat mencatat riwayat perubahan konten oleh admin.                           | Could Have  |
| FR-16 | Pengunjung dapat melihat galeri dokumentasi acara dan testimoni pelanggan.           | Should Have |
| FR-17 | Admin dapat mengelola galeri foto acara dan ulasan/testimoni pelanggan.              | Should Have |
| FR-18 | Admin dapat mengelola varian menu atau paket sederhana (nama varian dan harga).      | Should Have |
| FR-19 | Sistem otomatis mengompresi dan mengoptimalkan gambar yang diunggah ke format modern (WebP). | Must Have   |

Prioritas tersebut merupakan usulan awal dan dapat disesuaikan setelah kebutuhan bisnis dikonfirmasi.

## 7. Kebutuhan CMS dan Data

### 7.1 Data Profil Brand

Data yang dapat dikelola meliputi nama brand, logo, deskripsi, gambar utama, visi, misi, alamat, nomor WhatsApp, jam operasional, dan tautan media sosial.

### 7.2 Data Layanan

Setiap layanan memiliki nama, deskripsi, gambar, dan informasi tambahan yang relevan, seperti cakupan layanan atau ketentuan minimum pemesanan jika berlaku.

### 7.3 Data Menu dan Varian

Setiap menu sekurang-kurangnya memiliki:

* ID menu.
* Nama menu.
* Kategori.
* Deskripsi.
* Harga dasar atau daftar varian paket (misal: Reguler, Komplit beserta harganya).
* Gambar.
* Status ketersediaan.
* Status publikasi.

Kategori menu dapat mencakup makanan dan minuman, dengan kategori tambahan yang dapat diatur sesuai kebutuhan brand.

### 7.4 Data Galeri dan Testimoni

* **Galeri:** Judul/keterangan foto, gambar acara, tanggal/tag acara.
* **Testimoni:** Nama pelanggan/klien, foto (opsional), nama instansi/acara, rating bintang, dan isi ulasan.

### 7.5 Data Kontak dan Template Pemesanan

CMS menyediakan pengaturan:
* Nomor WhatsApp tujuan utama.
* Format template pesan pemesanan dengan placeholder (seperti `{brand_name}`, `{nama_menu}`, `{harga}`, `{varian}`, dll).
* Alamat usaha dan tautan Google Maps.
* Instruksi pemesanan langkah demi langkah.

## 8. Alur Pengguna

### 8.1 Alur Calon Pelanggan

1. Pelanggan membuka website.
2. Pelanggan melihat informasi brand pada halaman beranda.
3. Pelanggan membuka bagian layanan atau katalog menu.
4. Pelanggan memilih menu yang ingin diketahui lebih lanjut.
5. Pelanggan menekan tombol pesan melalui WhatsApp.
6. Website membuka WhatsApp dengan nomor tujuan dan pesan awal yang telah disiapkan.
7. Pelanggan memeriksa atau mengubah isi pesan, lalu mengirimkannya sendiri.
8. Pihak catering melanjutkan komunikasi dan mengonfirmasi pesanan melalui WhatsApp.

Website tidak dianggap telah menerima atau mengonfirmasi pesanan hanya karena pelanggan menekan tombol WhatsApp.

### 8.2 Alur Admin

1. Admin membuka halaman login CMS.
2. Admin memasukkan kredensial akun.
3. Sistem memvalidasi akun admin.
4. Admin masuk ke dashboard.
5. Admin memilih konten yang akan dikelola.
6. Admin menambah atau memperbarui informasi.
7. Admin menyimpan dan memublikasikan perubahan.
8. Sistem menampilkan konten yang telah dipublikasikan pada website publik.

## 9. Kebutuhan Nonfungsional

### 9.1 Desain dan Responsivitas

Website harus memiliki tampilan yang konsisten dengan identitas visual brand. Tata letak, teks, gambar, dan tombol harus tetap mudah digunakan pada layar desktop maupun ponsel.

### 9.2 Kinerja

Gambar harus dioptimalkan agar waktu pemuatan halaman tetap wajar. Halaman publik harus menghindari elemen yang tidak diperlukan dan menggunakan pemuatan data secara efisien.

### 9.3 Keamanan

Area CMS harus dilindungi autentikasi. Kata sandi wajib disimpan menggunakan metode hashing yang aman, akses pengelolaan konten dibatasi untuk admin yang berwenang, dan input harus divalidasi untuk mengurangi risiko serangan seperti SQL injection dan cross-site scripting (XSS).

### 9.4 SEO

Website perlu menyediakan judul halaman, deskripsi meta, struktur heading yang baik, URL yang mudah dipahami, teks alternatif gambar, serta informasi brand yang dapat diindeks mesin pencari.

### 9.5 Kemudahan Pengelolaan

Admin harus dapat memperbarui konten utama, menu, harga, foto, dan kontak tanpa harus memiliki kemampuan pemrograman.

### 9.6 Kompatibilitas

Website harus diuji pada browser modern yang umum digunakan, termasuk Chrome, Edge, Firefox, dan browser pada perangkat seluler.

## 10. Kriteria Keberhasilan dan Pengujian

Produk dinyatakan memenuhi kebutuhan awal apabila:

1. Seluruh informasi utama brand dapat ditampilkan dengan benar.
2. Katalog menu menampilkan informasi sesuai data yang dikelola admin.
3. Menu yang tidak tersedia dapat diberi status yang jelas dan tidak menyesatkan pelanggan.
4. Tombol WhatsApp membuka nomor tujuan yang benar serta menghasilkan pesan awal yang sesuai.
5. Admin yang valid dapat login dan mengelola konten.
6. Pengguna tanpa hak akses tidak dapat mengakses fitur pengelolaan CMS.
7. Perubahan konten yang dipublikasikan muncul pada website publik.
8. Website tetap dapat digunakan dengan baik pada desktop dan ponsel.
9. Formulir serta input CMS melakukan validasi terhadap data yang tidak sesuai.
10. Informasi alamat, kontak, dan harga konsisten dengan data yang tersimpan.

## 11. Batasan Produk Versi Pertama

Versi pertama berfokus pada penyajian informasi brand dan pengarahan pemesanan ke WhatsApp.

Fitur berikut belum termasuk dalam ruang lingkup awal:

* Keranjang belanja dan checkout.
* Pembayaran online.
* Sistem transaksi dan konfirmasi pesanan otomatis.
* Pelacakan status pesanan.
* Akun pelanggan.
* Program loyalitas dan poin pelanggan.
* Laporan transaksi atau integrasi akuntansi.

Fitur tersebut dapat dipertimbangkan pada pengembangan berikutnya apabila kebutuhan usaha meningkat.

## 12. Risiko dan Hal yang Perlu Diperhatikan

* Informasi harga dan ketersediaan menu harus diperbarui secara berkala oleh admin.
* Nomor WhatsApp tujuan harus dapat diubah tanpa mengubah kode program.
* Ukuran gambar perlu dibatasi atau dioptimalkan agar tidak memperlambat website.
* Proses pemesanan tetap bergantung pada WhatsApp dan respons pihak catering.
* Data login dan seluruh operasi CMS perlu dilindungi dari akses tanpa izin.

## 13. Asumsi Awal

PRD ini disusun berdasarkan asumsi bahwa:

1. Website diperuntukkan bagi satu brand catering.
2. Pengunjung dapat melihat informasi publik tanpa membuat akun.
3. Pemesanan dilakukan melalui WhatsApp.
4. CMS digunakan oleh admin untuk mengelola konten, bukan untuk memproses transaksi.
5. Belum ada kebutuhan pembayaran online atau sistem pesanan internal.
6. Informasi brand, menu, harga, alamat, dan nomor WhatsApp akan diberikan atau dilengkapi sebelum implementasi.

## 14. Hal yang Perlu Dikonfirmasi

Sebelum PRD ditetapkan sebagai acuan final, beberapa informasi berikut perlu ditentukan:

* Nama brand dan identitas visual.
* Jenis catering yang ditawarkan, seperti catering harian, acara, nasi box, atau layanan lainnya.
* Sasaran pelanggan utama.
* Struktur halaman akhir.
* Apakah menu hanya berupa katalog atau juga memiliki pilihan paket dan variasi.
* Apakah admin hanya satu orang atau perlu beberapa akun dengan peran berbeda.
* Teknologi yang akan digunakan untuk frontend, backend, database, dan hosting.

## 15. Tahapan Pengembangan

Tahapan yang disarankan adalah:

1. Finalisasi PRD berdasarkan kebutuhan brand.
2. Penyusunan sitemap dan user flow.
3. Pembuatan wireframe dan desain UI/UX.
4. Penetapan arsitektur dan teknologi.
5. Pengembangan website publik dan CMS.
6. Integrasi tombol WhatsApp.
7. Pengujian fungsional, responsivitas, dan keamanan.
8. Pengisian konten final serta deployment.
9. Pemeliharaan dan evaluasi setelah website digunakan.

---

**Kesimpulan:** Produk yang dikembangkan adalah website profil dan katalog brand catering yang terhubung dengan WhatsApp, dilengkapi CMS agar admin dapat mengelola isi website secara mandiri. Fokus versi pertama adalah penyajian informasi yang jelas, katalog menu yang mudah digunakan, dan alur pemesanan yang praktis.
