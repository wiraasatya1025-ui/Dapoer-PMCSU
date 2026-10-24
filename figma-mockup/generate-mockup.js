const fs = require('fs');
const path = require('path');

function getBase64(rel) {
  const full = path.join(__dirname, '..', 'public', rel);
  if (fs.existsSync(full)) {
    return 'data:image/png;base64,' + fs.readFileSync(full).toString('base64');
  }
  return '';
}

const logoHalal = getBase64('logo-halal-clean.png');
const logoBrand = getBase64('logo-dapoer-pmcsu.png');
const qrHalal = getBase64('qr-halal-clean.png');

const width = 1440;
const height = 6200;

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&amp;display=swap');
      text { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
      .serif { font-family: 'Playfair Display', Georgia, serif; }
      .cursor-pointer { cursor: pointer; }
      a { text-decoration: none; }
    </style>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D7B465" />
      <stop offset="100%" stop-color="#BFA052" />
    </linearGradient>
    <linearGradient id="sage-soft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6F0CA" />
      <stop offset="100%" stop-color="#DFECC0" />
    </linearGradient>
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#23382C" flood-opacity="0.08" />
    </filter>
    <filter id="btn-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#C9A24D" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" fill="#E6F0CA"/>

  <!-- ========================================== -->
  <!-- 1. TOP ANNOUNCEMENT BAR (MARQUEE)          -->
  <!-- ========================================== -->
  <g id="Top-Announcement-Bar">
    <rect width="${width}" height="36" fill="#DFECC0" />
    <line x1="0" y1="36" x2="${width}" y2="36" stroke="#D2E2AF" stroke-width="1" />
    <text x="100" y="23" fill="#23382C" font-size="12" font-weight="700">🕒 Jam Operasional:</text>
    <text x="225" y="23" fill="#3D5245" font-size="12" font-weight="500">Buka Setiap Hari: 08.00 - 20.00 WIB</text>
    <circle cx="470" cy="18" r="3" fill="#A5BA8C" />
    <text x="490" y="23" fill="#23382C" font-size="12" font-weight="700">📍 Dapur &amp; Lokasi:</text>
    <text x="595" y="23" fill="#3D5245" font-size="12" font-weight="500">Jl. Dapoer Nusantara No. 12, Jakarta Selatan</text>
    <circle cx="900" cy="18" r="3" fill="#A5BA8C" />
    <text x="920" y="23" fill="#8D6B26" font-size="12" font-weight="700">✨ Melayani Pemesanan Nasi Kotak, Prasmanan, Tumpeng &amp; Acara Spesial</text>
  </g>

  <!-- ========================================== -->
  <!-- 2. NAVBAR DESKTOP DENGAN INTERACTIVE LINKS -->
  <!-- ========================================== -->
  <g id="Navbar-Desktop">
    <rect y="36" width="${width}" height="80" fill="#E6F0CA" fill-opacity="0.95" />
    <line x1="0" y1="116" x2="${width}" y2="116" stroke="#D5E5B2" stroke-width="1" />

    <!-- Halal Logo Badge (Leftmost) -->
    <g id="Halal-Badge" transform="translate(100, 52)">
      <rect width="60" height="48" rx="12" fill="#FFFFFF" stroke="#D5E5B2" stroke-width="1" />
      <image href="${logoHalal}" x="12" y="6" width="36" height="36" preserveAspectRatio="xMidYMid meet" />
    </g>

    <!-- Brand Logo & Delicious Tastes -->
    <a href="#Hero-Section">
      <g id="Brand-Logo" transform="translate(176, 52)" class="cursor-pointer">
        <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="#D5E5B2" stroke-width="1" />
        <image href="${logoBrand}" x="4" y="4" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        <text x="58" y="22" fill="#23382C" font-size="18" font-weight="900" letter-spacing="-0.5">DAPOER PMCSU</text>
        <text x="58" y="38" fill="#8D6B26" font-size="11" font-weight="700">Delicious Tastes &amp; Catering Service</text>
      </g>
    </a>

    <!-- Nav Links (Center) dengan target internal scroll anchor -->
    <g id="Nav-Menu-Links" transform="translate(560, 80)">
      <a href="#Tentang-Kami-Section">
        <text x="0" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Tentang Kami</text>
      </a>
      <a href="#Layanan-Section">
        <text x="120" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Layanan</text>
      </a>
      <a href="#Menu-Catalog-Section">
        <text x="205" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Katalog Menu</text>
      </a>
      <a href="#Galeri-Section">
        <text x="325" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Galeri Acara</text>
      </a>
      <a href="#Cara-Pesan-Section">
        <text x="435" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Panduan Pesan</text>
      </a>
      <a href="#Testimoni-Section">
        <text x="565" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">Ulasan</text>
      </a>
      <a href="#FAQ-Section">
        <text x="640" y="0" fill="#2E4235" font-size="14" font-weight="700" class="cursor-pointer">FAQ &amp; Area</text>
      </a>
    </g>

    <!-- CTA Button WhatsApp -->
    <a href="https://wa.me/6281234567890" target="_blank">
      <g id="Navbar-CTA-WA" transform="translate(1160, 56)" class="cursor-pointer">
        <rect width="180" height="44" rx="22" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" filter="url(#btn-shadow)" />
        <circle cx="28" cy="22" r="10" fill="#212E24" />
        <text x="24" y="26" fill="#D7B465" font-size="12" font-weight="900">💬</text>
        <text x="46" y="27" fill="#212E24" font-size="13" font-weight="800">Hubungi WhatsApp</text>
      </g>
    </a>
  </g>

  <!-- ========================================== -->
  <!-- 3. HERO SECTION                            -->
  <!-- ========================================== -->
  <g id="Hero-Section" transform="translate(0, 116)">
    <rect width="${width}" height="640" fill="#E6F0CA" />
    <line x1="0" y1="640" x2="${width}" y2="640" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(100, 60)">
      <rect width="280" height="32" rx="16" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="20" y="21" fill="#8D6B26" font-size="12" font-weight="800">✨ DAPOER PMCSU • KATERING TERPERCAYA</text>
    </g>

    <g transform="translate(100, 130)">
      <text x="0" y="55" fill="#23382C" font-size="64" font-weight="900" class="serif" letter-spacing="-1">CATERING LEZAT,</text>
      <text x="0" y="125" fill="#9F7A2D" font-size="64" font-style="italic" font-weight="400" class="serif">Higienis &amp; Terpercaya</text>
      <text x="0" y="175" fill="#4B6152" font-size="22" font-weight="700">Solusi Praktis &amp; Istimewa untuk Setiap Acara Anda</text>
    </g>

    <g transform="translate(100, 335)">
      <g transform="translate(0, 0)">
        <circle cx="12" cy="12" r="12" fill="#C9A24D" /><text x="7" y="16" fill="#FFFFFF" font-size="12" font-weight="900">✓</text>
        <text x="36" y="16" fill="#2A3F33" font-size="16" font-weight="700">100% Halal &amp; Bahan Baku Segar Berkualitas</text>
      </g>
      <g transform="translate(0, 36)">
        <circle cx="12" cy="12" r="12" fill="#C9A24D" /><text x="7" y="16" fill="#FFFFFF" font-size="12" font-weight="900">✓</text>
        <text x="36" y="16" fill="#2A3F33" font-size="16" font-weight="700">Mulai dari Rp 25.000,- / Porsi (Harga Bersahabat &amp; Transparan)</text>
      </g>
      <g transform="translate(0, 72)">
        <circle cx="12" cy="12" r="12" fill="#C9A24D" /><text x="7" y="16" fill="#FFFFFF" font-size="12" font-weight="900">✓</text>
        <text x="36" y="16" fill="#2A3F33" font-size="16" font-weight="700">Lebih dari 50+ Variasi Masakan Nusantara Favorit</text>
      </g>
      <g transform="translate(0, 108)">
        <circle cx="12" cy="12" r="12" fill="#C9A24D" /><text x="7" y="16" fill="#FFFFFF" font-size="12" font-weight="900">✓</text>
        <text x="36" y="16" fill="#2A3F33" font-size="16" font-weight="700">Pengiriman Tepat Waktu untuk Seluruh Jabodetabek</text>
      </g>
    </g>

    <g transform="translate(100, 495)">
      <a href="#Menu-Catalog-Section">
        <rect width="230" height="56" rx="28" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" filter="url(#btn-shadow)" class="cursor-pointer" />
        <text x="36" y="34" fill="#212E24" font-size="16" font-weight="800" class="cursor-pointer">Pilih Menu Sekarang →</text>
      </a>
      <a href="https://wa.me/6281234567890" target="_blank">
        <rect x="250" width="180" height="56" rx="28" fill="none" stroke="#23382C" stroke-width="2" class="cursor-pointer" />
        <text x="286" y="34" fill="#23382C" font-size="16" font-weight="800" class="cursor-pointer">Konsultasi WA</text>
      </a>
    </g>

    <g transform="translate(100, 575)">
      <rect width="180" height="34" rx="17" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
      <text x="18" y="22" fill="#2E4235" font-size="12" font-weight="700">🛡️ 100% Halal Terjamin</text>
      <rect x="195" width="220" height="34" rx="17" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
      <text x="215" y="22" fill="#2E4235" font-size="12" font-weight="700">⭐ Standar Higienis Dapur Steril</text>
    </g>

    <g transform="translate(860, 80)">
      <rect width="480" height="490" rx="36" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
      <rect x="16" y="16" width="448" height="280" rx="24" fill="#F4F1E6" />
      <circle cx="240" cy="156" r="95" fill="#EADFC8" stroke="#D8B669" stroke-width="2" />
      <circle cx="240" cy="156" r="75" fill="#C9A24D" fill-opacity="0.25" />
      <text x="175" y="150" font-size="44">🍗🍛🥗</text>
      <text x="185" y="185" fill="#8D6B26" font-size="12" font-weight="800">PAKET PRASMANAN VIP</text>
      <rect x="290" y="240" width="160" height="42" rx="14" fill="#DEBF7E" stroke="#EBCE8F" stroke-width="1" filter="url(#btn-shadow)" />
      <text x="306" y="267" fill="#212E24" font-size="15" font-weight="900">Rp 45.000 / Porsi</text>
      <text x="32" y="335" fill="#23382C" font-size="22" font-weight="900" class="serif">Prasmanan Nusantara Istimewa</text>
      <text x="32" y="365" fill="#55695D" font-size="14" font-weight="500">Lengkap dengan Nasi Liwet / Kuning, Rendang Daging, Ayam Bakar,</text>
      <text x="32" y="388" fill="#55695D" font-size="14" font-weight="500">Sambal Goreng Ati, Sop Kimlo, Es Podeng, dan Buah Segar.</text>
      <line x1="32" y1="415" x2="448" y2="415" stroke="#EFECE0" stroke-width="1" />
      <text x="32" y="450" fill="#7A8E81" font-size="12" font-weight="600">Minimal pemesanan: 50 Porsi</text>
      <a href="#Menu-Catalog-Section">
        <rect x="300" y="430" width="148" height="38" rx="19" fill="#23382C" class="cursor-pointer" />
        <text x="326" y="454" fill="#FCFBF6" font-size="13" font-weight="700" class="cursor-pointer">Lihat Paket →</text>
      </a>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 4. SERVICES SECTION (LAYANAN)              -->
  <!-- ========================================== -->
  <g id="Layanan-Section" transform="translate(0, 756)">
    <rect width="${width}" height="620" fill="#E2ECC6" />
    <line x1="0" y1="620" x2="${width}" y2="620" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="630" width="180" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="670" y="20" fill="#8D6B26" font-size="12" font-weight="800">LAYANAN KAMI</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Solusi Kuliner untuk Segala Kebutuhan Acara</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Mulai dari makan siang kantor hingga pesta syukuran keluarga, kami siap melayani dengan standar terbaik.</text>
    </g>

    <g transform="translate(100, 200)">
      <g transform="translate(0, 0)">
        <rect width="386" height="360" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="32" y="32" width="56" height="56" rx="16" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
        <text x="48" y="68" fill="#8D6B26" font-size="20" font-weight="900">01</text>
        <text x="32" y="128" fill="#23382C" font-size="22" font-weight="800" class="serif">Prasmanan &amp; Wedding</text>
        <text x="32" y="160" fill="#55695D" font-size="14" font-weight="500">Penataan meja buffet elegan, chafing dish hangat,</text>
        <text x="32" y="180" fill="#55695D" font-size="14" font-weight="500">dan staf pramusaji profesional siap melayani tamu.</text>
        <g transform="translate(32, 210)">
          <text x="0" y="16" fill="#3A4E42" font-size="13" font-weight="600">• Meja Roll-Top Chafing Dish Hangat</text>
          <text x="0" y="42" fill="#3A4E42" font-size="13" font-weight="600">• Termasuk Kru Pramusaji Berbusana Rapi</text>
          <text x="0" y="68" fill="#3A4E42" font-size="13" font-weight="600">• Gratis Setup &amp; Peralatan Makan Lengkap</text>
        </g>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20tanya%20paket%20Prasmanan" target="_blank">
          <text x="32" y="325" fill="#9F7A2D" font-size="14" font-weight="800" class="cursor-pointer">Konsultasikan Acara Ini →</text>
        </a>
      </g>
      <g transform="translate(426, 0)">
        <rect width="386" height="360" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="32" y="32" width="56" height="56" rx="16" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
        <text x="46" y="68" fill="#8D6B26" font-size="20" font-weight="900">02</text>
        <text x="32" y="128" fill="#23382C" font-size="22" font-weight="800" class="serif">Nasi Kotak / Bento Box</text>
        <text x="32" y="160" fill="#55695D" font-size="14" font-weight="500">Pilihan praktis, higienis, dan ekonomis untuk</text>
        <text x="32" y="180" fill="#55695D" font-size="14" font-weight="500">rapat kantor, seminar, wisata, dan bakti sosial.</text>
        <g transform="translate(32, 210)">
          <text x="0" y="16" fill="#3A4E42" font-size="13" font-weight="600">• Kemasan Eksklusif &amp; Tersegel Higienis</text>
          <text x="0" y="42" fill="#3A4E42" font-size="13" font-weight="600">• Sendok, Tisu, &amp; Tusuk Gigi Lengkap</text>
          <text x="0" y="68" fill="#3A4E42" font-size="13" font-weight="600">• Pengiriman Tepat Waktu Terjadwal</text>
        </g>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20tanya%20Nasi%20Kotak" target="_blank">
          <text x="32" y="325" fill="#9F7A2D" font-size="14" font-weight="800" class="cursor-pointer">Konsultasikan Acara Ini →</text>
        </a>
      </g>
      <g transform="translate(852, 0)">
        <rect width="386" height="360" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="32" y="32" width="56" height="56" rx="16" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
        <text x="46" y="68" fill="#8D6B26" font-size="20" font-weight="900">03</text>
        <text x="32" y="128" fill="#23382C" font-size="22" font-weight="800" class="serif">Tumpeng &amp; Snack Box</text>
        <text x="32" y="160" fill="#55695D" font-size="14" font-weight="500">Tumpeng syukuran berhias cantik &amp; aneka kue</text>
        <text x="32" y="180" fill="#55695D" font-size="14" font-weight="500">tradisional manis gurih untuk momen berkesan.</text>
        <g transform="translate(32, 210)">
          <text x="0" y="16" fill="#3A4E42" font-size="13" font-weight="600">• Hiasan Sayur Tematik Sesuai Perayaan</text>
          <text x="0" y="42" fill="#3A4E42" font-size="13" font-weight="600">• Rasa Gurih Alami Beras Pilihan</text>
          <text x="0" y="68" fill="#3A4E42" font-size="13" font-weight="600">• Opsi Tumpeng Mini Personal Tersedia</text>
        </g>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20tanya%20Tumpeng" target="_blank">
          <text x="32" y="325" fill="#9F7A2D" font-size="14" font-weight="800" class="cursor-pointer">Konsultasikan Acara Ini →</text>
        </a>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 5. MENU CATALOG SECTION                   -->
  <!-- ========================================== -->
  <g id="Menu-Catalog-Section" transform="translate(0, 1376)">
    <rect width="${width}" height="760" fill="#E6F0CA" />
    <line x1="0" y1="760" x2="${width}" y2="760" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="620" width="200" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="660" y="20" fill="#8D6B26" font-size="12" font-weight="800">KATALOG PILIHAN</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Daftar Menu Favorit Kami</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Pilih menu favorit untuk melihat rincian paket dan langsung memesan via WhatsApp.</text>
    </g>

    <g transform="translate(380, 190)">
      <rect width="100" height="40" rx="20" fill="#D8B669" stroke="#E5CA8A" stroke-width="1" filter="url(#btn-shadow)" />
      <text x="24" y="25" fill="#212E24" font-size="13" font-weight="800">Semua</text>
      <rect x="115" width="130" height="40" rx="20" fill="#F7F9EC" stroke="#D5E5B2" stroke-width="1" />
      <text x="135" y="25" fill="#415549" font-size="13" font-weight="700">Nasi Kotak</text>
      <rect x="260" width="130" height="40" rx="20" fill="#F7F9EC" stroke="#D5E5B2" stroke-width="1" />
      <text x="280" y="25" fill="#415549" font-size="13" font-weight="700">Prasmanan</text>
      <rect x="405" width="130" height="40" rx="20" fill="#F7F9EC" stroke="#D5E5B2" stroke-width="1" />
      <text x="430" y="25" fill="#415549" font-size="13" font-weight="700">Tumpeng</text>
      <rect x="550" width="130" height="40" rx="20" fill="#F7F9EC" stroke="#D5E5B2" stroke-width="1" />
      <text x="570" y="25" fill="#415549" font-size="13" font-weight="700">Coffee Break</text>
    </g>

    <g transform="translate(100, 260)">
      <!-- Item 1 -->
      <g transform="translate(0, 0)">
        <rect width="386" height="430" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="386" height="200" rx="28" fill="#EADFC8" />
        <text x="130" y="115" font-size="44">🍱</text>
        <rect x="20" y="20" width="90" height="26" rx="8" fill="#FFFFFF" fill-opacity="0.9" />
        <text x="32" y="38" fill="#23382C" font-size="11" font-weight="800">NASI BOX</text>
        <rect x="230" y="150" width="136" height="34" rx="10" fill="#DEBF7E" stroke="#EBCE8F" stroke-width="1" />
        <text x="246" y="173" fill="#212E24" font-size="13" font-weight="900">Rp 30.000</text>
        <text x="24" y="235" fill="#23382C" font-size="20" font-weight="800" class="serif">Paket Nasi Kotak Ayam Bakar</text>
        <text x="24" y="265" fill="#55695D" font-size="13" font-weight="500">Nasi putih pulen, ayam bakar rempah khas solo,</text>
        <text x="24" y="285" fill="#55695D" font-size="13" font-weight="500">tahu tempe bacem, lalapan, dan sambal terasi.</text>
        <line x1="24" y1="350" x2="362" y2="350" stroke="#EFECE0" stroke-width="1" />
        <text x="24" y="380" fill="#7A8E81" font-size="11" font-weight="600">Mulai dari</text>
        <text x="24" y="405" fill="#8D6B26" font-size="18" font-weight="900">Rp 30.000</text>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20pesan%20Paket%20Nasi%20Kotak%20Ayam%20Bakar" target="_blank">
          <rect x="220" y="375" width="142" height="40" rx="12" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" class="cursor-pointer" />
          <text x="242" y="400" fill="#212E24" font-size="13" font-weight="800" class="cursor-pointer">Pesan via WA</text>
        </a>
      </g>
      <!-- Item 2 -->
      <g transform="translate(426, 0)">
        <rect width="386" height="430" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="386" height="200" rx="28" fill="#EADFC8" />
        <text x="130" y="115" font-size="44">🍛</text>
        <rect x="20" y="20" width="110" height="26" rx="8" fill="#D8B669" />
        <text x="32" y="38" fill="#212E24" font-size="11" font-weight="800">⭐ UNGGULAN</text>
        <rect x="230" y="150" width="136" height="34" rx="10" fill="#DEBF7E" stroke="#EBCE8F" stroke-width="1" />
        <text x="246" y="173" fill="#212E24" font-size="13" font-weight="900">Rp 55.000</text>
        <text x="24" y="235" fill="#23382C" font-size="20" font-weight="800" class="serif">Paket Prasmanan Lengkap VIP</text>
        <text x="24" y="265" fill="#55695D" font-size="13" font-weight="500">Rendang padang empuk, ayam balado, sop kimlo,</text>
        <text x="24" y="285" fill="#55695D" font-size="13" font-weight="500">kerupuk udang, buah potong, es podeng manis.</text>
        <line x1="24" y1="350" x2="362" y2="350" stroke="#EFECE0" stroke-width="1" />
        <text x="24" y="380" fill="#7A8E81" font-size="11" font-weight="600">Mulai dari</text>
        <text x="24" y="405" fill="#8D6B26" font-size="18" font-weight="900">Rp 55.000</text>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20pesan%20Paket%20Prasmanan%20Lengkap%20VIP" target="_blank">
          <rect x="220" y="375" width="142" height="40" rx="12" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" class="cursor-pointer" />
          <text x="242" y="400" fill="#212E24" font-size="13" font-weight="800" class="cursor-pointer">Pesan via WA</text>
        </a>
      </g>
      <!-- Item 3 -->
      <g transform="translate(852, 0)">
        <rect width="386" height="430" rx="28" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="386" height="200" rx="28" fill="#EADFC8" />
        <text x="130" y="115" font-size="44">🍚</text>
        <rect x="20" y="20" width="110" height="26" rx="8" fill="#FFFFFF" fill-opacity="0.9" />
        <text x="32" y="38" fill="#23382C" font-size="11" font-weight="800">TUMPENG</text>
        <rect x="220" y="150" width="146" height="34" rx="10" fill="#DEBF7E" stroke="#EBCE8F" stroke-width="1" />
        <text x="232" y="173" fill="#212E24" font-size="13" font-weight="900">Rp 450.000</text>
        <text x="24" y="235" fill="#23382C" font-size="20" font-weight="800" class="serif">Tumpeng Kuning Syukuran</text>
        <text x="24" y="265" fill="#55695D" font-size="13" font-weight="500">Tumpeng kerucut megah untuk 10 - 25 porsi,</text>
        <text x="24" y="285" fill="#55695D" font-size="13" font-weight="500">ayam goreng kuning, urap sayur, telur balado.</text>
        <line x1="24" y1="350" x2="362" y2="350" stroke="#EFECE0" stroke-width="1" />
        <text x="24" y="380" fill="#7A8E81" font-size="11" font-weight="600">Mulai dari</text>
        <text x="24" y="405" fill="#8D6B26" font-size="18" font-weight="900">Rp 450.000</text>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20pesan%20Tumpeng%20Kuning%20Syukuran" target="_blank">
          <rect x="220" y="375" width="142" height="40" rx="12" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" class="cursor-pointer" />
          <text x="242" y="400" fill="#212E24" font-size="13" font-weight="800" class="cursor-pointer">Pesan via WA</text>
        </a>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 6. EVENT GALLERY & PORTFOLIO               -->
  <!-- ========================================== -->
  <g id="Galeri-Section" transform="translate(0, 2136)">
    <rect width="${width}" height="640" fill="#E2ECC6" />
    <line x1="0" y1="640" x2="${width}" y2="640" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="610" width="220" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="640" y="20" fill="#8D6B26" font-size="12" font-weight="800">GALERI &amp; PORTOFOLIO</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Dokumentasi Acara Nyata</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Tata letak meja buffet berkelas, dekorasi pondokan tematik, dan kerapian staf pramusaji.</text>
    </g>

    <g transform="translate(100, 190)">
      <g transform="translate(0, 0)">
        <rect width="285" height="240" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="285" height="150" rx="20" fill="#EADFC8" />
        <text x="120" y="90" font-size="36">🍽️</text>
        <text x="20" y="180" fill="#23382C" font-size="14" font-weight="800">Setup Buffet Prasmanan</text>
        <text x="20" y="205" fill="#55695D" font-size="11" font-weight="500">Chafing dish hangat &amp; centerpiece bunga</text>
      </g>
      <g transform="translate(318, 0)">
        <rect width="285" height="240" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="285" height="150" rx="20" fill="#EADFC8" />
        <text x="120" y="90" font-size="36">🎪</text>
        <text x="20" y="180" fill="#23382C" font-size="14" font-weight="800">Pondokan Live Stall</text>
        <text x="20" y="205" fill="#55695D" font-size="11" font-weight="500">Booth etnik &amp; chef live cooking</text>
      </g>
      <g transform="translate(636, 0)">
        <rect width="285" height="240" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="285" height="150" rx="20" fill="#EADFC8" />
        <text x="120" y="90" font-size="36">👔</text>
        <text x="20" y="180" fill="#23382C" font-size="14" font-weight="800">Kerapian Staf Banquet</text>
        <text x="20" y="205" fill="#55695D" font-size="11" font-weight="500">Pramusaji berseragam rapi &amp; higienis</text>
      </g>
      <g transform="translate(954, 0)">
        <rect width="285" height="240" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect width="285" height="150" rx="20" fill="#EADFC8" />
        <text x="120" y="90" font-size="36">🏢</text>
        <text x="20" y="180" fill="#23382C" font-size="14" font-weight="800">Corporate Gala Dinner</text>
        <text x="20" y="205" fill="#55695D" font-size="11" font-weight="500">Pelayanan VIP instansi &amp; korporat</text>
      </g>
    </g>

    <g transform="translate(240, 485)">
      <rect width="960" height="80" rx="24" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
      <text x="36" y="38" fill="#23382C" font-size="16" font-weight="800">Butuh Konsultasi Penataan Ruang &amp; Meja Acara?</text>
      <text x="36" y="60" fill="#55695D" font-size="13" font-weight="500">Tim spesialis banquet kami siap survei lokasi dan merancang alur buffet terbaik.</text>
      <a href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20konsultasi%20layout%20buffet" target="_blank">
        <rect x="730" y="20" width="200" height="42" rx="21" fill="url(#gold-grad)" class="cursor-pointer" />
        <text x="755" y="46" fill="#212E24" font-size="13" font-weight="800" class="cursor-pointer">Konsultasi Layout Gratis</text>
      </a>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 7. PANDUAN CARA PESAN (4 LANGKAH)          -->
  <!-- ========================================== -->
  <g id="Cara-Pesan-Section" transform="translate(0, 2776)">
    <rect width="${width}" height="440" fill="#E6F0CA" />
    <line x1="0" y1="440" x2="${width}" y2="440" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="625" width="190" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="655" y="20" fill="#8D6B26" font-size="12" font-weight="800">CARA PEMESANAN</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Alur Mudah Pemesanan via WhatsApp</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Cukup 4 langkah praktis untuk menikmati sajian istimewa kami di hari acara Anda.</text>
    </g>

    <g transform="translate(100, 190)">
      <g transform="translate(0, 0)">
        <rect width="285" height="190" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="40" height="40" rx="14" fill="#D8B669" />
        <text x="39" y="50" fill="#212E24" font-size="18" font-weight="900">1</text>
        <text x="24" y="98" fill="#23382C" font-size="18" font-weight="800" class="serif">Pilih Menu</text>
        <text x="24" y="125" fill="#55695D" font-size="12" font-weight="500">Jelajahi ragam pilihan menu makanan,</text>
        <text x="24" y="145" fill="#55695D" font-size="12" font-weight="500">minuman &amp; paket prasmanan sesuai selera.</text>
      </g>
      <g transform="translate(318, 0)">
        <rect width="285" height="190" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="40" height="40" rx="14" fill="#D8B669" />
        <text x="38" y="50" fill="#212E24" font-size="18" font-weight="900">2</text>
        <text x="24" y="98" fill="#23382C" font-size="18" font-weight="800" class="serif">Klik Pesan via WA</text>
        <text x="24" y="125" fill="#55695D" font-size="12" font-weight="500">Pilih varian atau paket yang diinginkan lalu</text>
        <text x="24" y="145" fill="#55695D" font-size="12" font-weight="500">tekan tombol order WhatsApp otomatis.</text>
      </g>
      <g transform="translate(636, 0)">
        <rect width="285" height="190" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="40" height="40" rx="14" fill="#D8B669" />
        <text x="38" y="50" fill="#212E24" font-size="18" font-weight="900">3</text>
        <text x="24" y="98" fill="#23382C" font-size="18" font-weight="800" class="serif">Konsultasi Detail</text>
        <text x="24" y="125" fill="#55695D" font-size="12" font-weight="500">Kirim pesan ke admin, lengkapi tanggal,</text>
        <text x="24" y="145" fill="#55695D" font-size="12" font-weight="500">jumlah porsi, serta alamat pengantaran.</text>
      </g>
      <g transform="translate(954, 0)">
        <rect width="285" height="190" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="40" height="40" rx="14" fill="#D8B669" />
        <text x="37" y="50" fill="#212E24" font-size="18" font-weight="900">4</text>
        <text x="24" y="98" fill="#23382C" font-size="18" font-weight="800" class="serif">Konfirmasi &amp; Antar</text>
        <text x="24" y="125" fill="#55695D" font-size="12" font-weight="500">Admin konfirmasi rincian pesanan dan</text>
        <text x="24" y="145" fill="#55695D" font-size="12" font-weight="500">hidangan siap diantar tepat waktu.</text>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 8. TENTANG KAMI SECTION (VISI, MISI, MAPS) -->
  <!-- ========================================== -->
  <g id="Tentang-Kami-Section" transform="translate(0, 3216)">
    <rect width="${width}" height="640" fill="#E6F0CA" />
    <line x1="0" y1="640" x2="${width}" y2="640" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(100, 60)">
      <rect width="180" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="20" y="20" fill="#8D6B26" font-size="12" font-weight="800">TENTANG BRAND KAMI</text>
      <text x="0" y="75" fill="#23382C" font-size="40" font-weight="900" class="serif">DAPOER PMCSU</text>
      <text x="0" y="115" fill="#4B6152" font-size="15" font-weight="500">Layanan catering profesional terpercaya yang berkomitmen menyajikan hidangan lezat,</text>
      <text x="0" y="138" fill="#4B6152" font-size="15" font-weight="500">higienis, dan bersertifikat Halal resmi untuk setiap momen berharga Anda.</text>

      <g transform="translate(0, 180)">
        <rect width="580" height="120" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <text x="28" y="38" fill="#9F7A2D" font-size="14" font-weight="800">VISI KAMI</text>
        <text x="28" y="68" fill="#55695D" font-size="13" font-weight="500">Menjadi penyedia jasa boga dan katering terdepan di Jabodetabek yang dikenal</text>
        <text x="28" y="90" fill="#55695D" font-size="13" font-weight="500">akan konsistensi cita rasa nusantara, kebersihan standar tinggi, dan integritas Halal.</text>
      </g>

      <g transform="translate(0, 320)">
        <rect width="580" height="140" rx="24" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
        <text x="28" y="38" fill="#9F7A2D" font-size="14" font-weight="800">MISI KAMI</text>
        <text x="28" y="68" fill="#55695D" font-size="13" font-weight="500">1. Menggunakan 100% bahan baku segar, halal, dan berkualitas prima.</text>
        <text x="28" y="90" fill="#55695D" font-size="13" font-weight="500">2. Memberikan pelayanan ramah, sigap, dan penataan acara yang profesional.</text>
        <text x="28" y="112" fill="#55695D" font-size="13" font-weight="500">3. Menjaga ketepatan waktu pengiriman demi kelancaran momen bahagia pelanggan.</text>
      </g>
    </g>

    <g transform="translate(740, 90)">
      <rect width="600" height="470" rx="32" fill="#FCFBF6" stroke="#E1DEC9" stroke-width="1" filter="url(#card-shadow)" />
      <g transform="translate(40, 45)">
        <text x="0" y="24" fill="#23382C" font-size="24" font-weight="900" class="serif">📍 Alamat &amp; Lokasi Dapur Kami</text>
        <text x="0" y="65" fill="#55695D" font-size="15" font-weight="500">Jl. Dapoer Nusantara No. 12, Pasar Minggu, Jakarta Selatan, DKI Jakarta 12520</text>
        
        <g transform="translate(0, 100)">
          <text x="0" y="20" fill="#23382C" font-size="14" font-weight="800">🕒 Jam Operasional Dapur &amp; Customer Service:</text>
          <text x="0" y="44" fill="#55695D" font-size="14" font-weight="500">Setiap Hari: 08.00 - 20.00 WIB (Pengiriman 24 Jam Sesuai Jadwal Acara)</text>
        </g>

        <rect y="180" width="520" height="150" rx="20" fill="#E8EFE0" stroke="#CBDFA5" stroke-width="1" />
        <circle cx="260" cy="245" r="28" fill="#D8B669" fill-opacity="0.3" />
        <circle cx="260" cy="245" r="14" fill="#8D6B26" />
        <text x="254" y="250" fill="#FFFFFF" font-size="14">📍</text>
        <text x="260" y="290" text-anchor="middle" fill="#23382C" font-size="12" font-weight="700">Dapur Pusat Dapoer PMC SU - Jakarta Selatan</text>

        <a href="https://maps.google.com" target="_blank">
          <rect y="350" width="220" height="44" rx="22" fill="url(#gold-grad)" stroke="#DFBF73" stroke-width="1" class="cursor-pointer" />
          <text x="36" y="377" fill="#212E24" font-size="13" font-weight="800" class="cursor-pointer">Buka di Google Maps ↗</text>
        </a>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 9. TESTIMONIALS & KLIEN (BUKTI SOSIAL)     -->
  <!-- ========================================== -->
  <g id="Testimoni-Section" transform="translate(0, 3856)">
    <rect width="${width}" height="640" fill="#E2ECC6" />
    <line x1="0" y1="640" x2="${width}" y2="640" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="590" width="260" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="610" y="20" fill="#8D6B26" font-size="12" font-weight="800">BUKTI SOSIAL &amp; KEPUASAN KLIEN</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Apa Kata Klien &amp; Tamu Kami?</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Pengalaman nyata dari ribuan porsi yang telah kami sajikan untuk pernikahan, corporate gathering &amp; syukuran.</text>
    </g>

    <g transform="translate(100, 190)">
      <!-- T1 -->
      <g transform="translate(0, 0)">
        <rect width="386" height="260" rx="28" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <text x="32" y="44" font-size="16">⭐⭐⭐⭐⭐</text>
        <text x="32" y="80" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">"Alhamdulillah semua tamu memuji rasa makanannya,</text>
        <text x="32" y="104" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">terutama Daging Balado dan Sop Penganten-nya juara!</text>
        <text x="32" y="128" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">Penataan meja prasmanannya sangat elegan dan sigap."</text>
        <line x1="32" y1="180" x2="354" y2="180" stroke="#CBDFA5" stroke-width="1" />
        <circle cx="52" cy="215" r="20" fill="#DFECC0" />
        <text x="47" y="221" fill="#23382C" font-size="14" font-weight="800">R</text>
        <text x="82" y="210" fill="#23382C" font-size="13" font-weight="800">Ibu Ratna Dewi, S.E.</text>
        <text x="82" y="228" fill="#8D6B26" font-size="11" font-weight="600">Resepsi Pernikahan (800 Pax) - Gedung Sasana</text>
      </g>
      <!-- T2 -->
      <g transform="translate(426, 0)">
        <rect width="386" height="260" rx="28" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <text x="32" y="44" font-size="16">⭐⭐⭐⭐⭐</text>
        <text x="32" y="80" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">"Pengiriman tepat waktu 45 menit sebelum acara dimulai,</text>
        <text x="32" y="104" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">packaging bento box rapat &amp; higienis. Porsinya mantap</text>
        <text x="32" y="128" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">dan variasi lauknya pas dengan selera karyawan."</text>
        <line x1="32" y1="180" x2="354" y2="180" stroke="#CBDFA5" stroke-width="1" />
        <circle cx="52" cy="215" r="20" fill="#DFECC0" />
        <text x="46" y="221" fill="#23382C" font-size="14" font-weight="800">H</text>
        <text x="82" y="210" fill="#23382C" font-size="13" font-weight="800">Bpk. Hendra Gunawan</text>
        <text x="82" y="228" fill="#8D6B26" font-size="11" font-weight="600">General Assembly PT Telkom (350 Pax)</text>
      </g>
      <!-- T3 -->
      <g transform="translate(852, 0)">
        <rect width="386" height="260" rx="28" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <text x="32" y="44" font-size="16">⭐⭐⭐⭐⭐</text>
        <text x="32" y="80" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">"Sangat terbantu dengan konsultasi admin WA yang ramah.</text>
        <text x="32" y="104" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">Pondokan sate dan es dogernya jadi rebutan anak-anak</text>
        <text x="32" y="128" fill="#3D5245" font-size="13" font-weight="500" font-style="italic">dan orang tua. Pasti repeat order lagi!"</text>
        <line x1="32" y1="180" x2="354" y2="180" stroke="#CBDFA5" stroke-width="1" />
        <circle cx="52" cy="215" r="20" fill="#DFECC0" />
        <text x="46" y="221" fill="#23382C" font-size="14" font-weight="800">M</text>
        <text x="82" y="210" fill="#23382C" font-size="13" font-weight="800">Dr. Maya Anindita</text>
        <text x="82" y="228" fill="#8D6B26" font-size="11" font-weight="600">Acara Syukuran &amp; Keluarga Besar (150 Pax)</text>
      </g>
    </g>

    <g transform="translate(100, 490)">
      <line x1="0" y1="0" x2="1240" y2="0" stroke="#CBDFA5" stroke-width="1" />
      <text x="620" y="32" text-anchor="middle" fill="#708474" font-size="11" font-weight="800">DIPERCAYA OLEH PERUSAHAAN, BUMN &amp; KOMUNITAS TERKEMUKA:</text>
      <g transform="translate(20, 50)">
        <rect width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="90" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Bank Mandiri</text>
        <rect x="205" width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="295" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Telkom Indonesia</text>
        <rect x="410" width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="500" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Pertamina Group</text>
        <rect x="615" width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="705" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Kementerian BUMN</text>
        <rect x="820" width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="910" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Unilever ID</text>
        <rect x="1025" width="180" height="50" rx="14" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="1115" y="30" text-anchor="middle" fill="#4B6152" font-size="13" font-weight="800">🏢 Astra International</text>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 10. FAQ & LOGISTICS TRANSPARENCY           -->
  <!-- ========================================== -->
  <g id="FAQ-Section" transform="translate(0, 4496)">
    <rect width="${width}" height="760" fill="#E6F0CA" />
    <line x1="0" y1="760" x2="${width}" y2="760" stroke="#D5E5B2" stroke-width="1" />

    <g transform="translate(0, 50)">
      <rect x="600" width="240" height="30" rx="15" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
      <text x="622" y="20" fill="#8D6B26" font-size="12" font-weight="800">INFORMASI LOGISTIK &amp; FAQ</text>
      <text x="720" y="70" text-anchor="middle" fill="#23382C" font-size="38" font-weight="900" class="serif">Transparansi Area Pengiriman &amp; Syarat</text>
      <text x="720" y="105" text-anchor="middle" fill="#4B6152" font-size="15" font-weight="500">Jawaban cepat seputar minimum pemesanan, jangkauan kurir Jabodetabek, dan panduan pembayaran.</text>
    </g>

    <g transform="translate(100, 180)">
      <g transform="translate(0, 0)">
        <rect width="386" height="110" rx="24" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="20" y="20" width="50" height="50" rx="16" fill="#DFECC0" />
        <text x="32" y="52" font-size="22">🚚</text>
        <text x="86" y="38" fill="#8D6B26" font-size="11" font-weight="800">JANGKAUAN ANTAR</text>
        <text x="86" y="58" fill="#23382C" font-size="15" font-weight="800">Seluruh Jabodetabek</text>
        <text x="86" y="80" fill="#55695D" font-size="12" font-weight="500">Armada khusus makanan hangat &amp; tepat waktu.</text>
      </g>
      <g transform="translate(426, 0)">
        <rect width="386" height="110" rx="24" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="20" y="20" width="50" height="50" rx="16" fill="#DFECC0" />
        <text x="32" y="52" font-size="22">🍽️</text>
        <text x="86" y="38" fill="#8D6B26" font-size="11" font-weight="800">MINIMUM ORDER</text>
        <text x="86" y="58" fill="#23382C" font-size="15" font-weight="800">Mulai 20 Pax (Nasi Box)</text>
        <text x="86" y="80" fill="#55695D" font-size="12" font-weight="500">Buffet lengkap mulai 50 pax termasuk kru.</text>
      </g>
      <g transform="translate(852, 0)">
        <rect width="386" height="110" rx="24" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" filter="url(#card-shadow)" />
        <rect x="20" y="20" width="50" height="50" rx="16" fill="#DFECC0" />
        <text x="32" y="52" font-size="22">⏰</text>
        <text x="86" y="38" fill="#8D6B26" font-size="11" font-weight="800">WAKTU RESERVASI</text>
        <text x="86" y="58" fill="#23382C" font-size="15" font-weight="800">H-2 Acara Berjalan</text>
        <text x="86" y="80" fill="#55695D" font-size="12" font-weight="500">Menerima pesanan darurat sesuai slot dapur.</text>
      </g>
    </g>

    <g transform="translate(240, 330)">
      <g transform="translate(0, 0)">
        <rect width="960" height="85" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="28" y="34" fill="#23382C" font-size="15" font-weight="800">Q: Berapa minimum pemesanan (pax) untuk acara saya?</text>
        <text x="28" y="60" fill="#55695D" font-size="13" font-weight="500">A: Nasi Box mulai dari 20 pax. Paket Prasmanan lengkap dengan peralatan saji &amp; waiter mulai dari 50 pax.</text>
        <text x="915" y="45" fill="#8D6B26" font-size="16" font-weight="900">▾</text>
      </g>
      <g transform="translate(0, 100)">
        <rect width="960" height="85" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="28" y="34" fill="#23382C" font-size="15" font-weight="800">Q: Daerah mana saja yang dijangkau oleh pengiriman DAPOER PMCSU?</text>
        <text x="28" y="60" fill="#55695D" font-size="13" font-weight="500">A: Kami melayani pengantaran ke seluruh Jakarta, Depok, Tangerang, Tangerang Selatan, Bekasi, hingga sebagian Bogor.</text>
        <text x="915" y="45" fill="#8D6B26" font-size="16" font-weight="900">▾</text>
      </g>
      <g transform="translate(0, 200)">
        <rect width="960" height="85" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="28" y="34" fill="#23382C" font-size="15" font-weight="800">Q: Apakah makanan dijamin 100% Halal dan Higienis?</text>
        <text x="28" y="60" fill="#55695D" font-size="13" font-weight="500">A: Ya, kami memiliki Sertifikat Halal resmi BPJPH No. ID110025607930825 dan dapur bersanitasi terstandar.</text>
        <text x="915" y="45" fill="#8D6B26" font-size="16" font-weight="900">▾</text>
      </g>
      <g transform="translate(0, 300)">
        <rect width="960" height="85" rx="20" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
        <text x="28" y="34" fill="#23382C" font-size="15" font-weight="800">Q: Bagaimana sistem pembayaran dan pelunasannya?</text>
        <text x="28" y="60" fill="#55695D" font-size="13" font-weight="500">A: Booking tanggal dengan DP 30-50%, pelunasan dapat dilakukan H-1 atau saat hidangan tiba sesuai kesepakatan.</text>
        <text x="915" y="45" fill="#8D6B26" font-size="16" font-weight="900">▾</text>
      </g>
    </g>
  </g>

  <!-- ========================================== -->
  <!-- 11. FOOTER SECTION WITH HALAL QR CARD      -->
  <!-- ========================================== -->
  <g id="Footer-Section" transform="translate(0, 5256)">
    <rect width="${width}" height="944" fill="#E6F0CA" />

    <!-- Halal Certificate Card with QR & Registration -->
    <g id="Halal-QR-Card" transform="translate(420, 60)">
      <rect width="600" height="170" rx="28" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1.5" filter="url(#card-shadow)" />
      <rect x="24" y="24" width="122" height="122" rx="16" fill="#FFFFFF" stroke="#CBDFA5" stroke-width="1" />
      <image href="${qrHalal}" x="32" y="32" width="106" height="106" preserveAspectRatio="xMidYMid meet" />

      <g transform="translate(166, 32)">
        <rect width="180" height="24" rx="12" fill="#DFECC0" stroke="#CBDFA5" stroke-width="1" />
        <text x="14" y="16" fill="#8D6B26" font-size="10" font-weight="900">PINDAI / SCAN QR RESMI</text>
        <text x="0" y="52" fill="#23382C" font-size="16" font-weight="900">Sertifikat Halal Indonesia</text>
        <text x="0" y="74" fill="#55695D" font-size="13" font-weight="700">No. Registrasi: ID110025607930825</text>
        <text x="0" y="94" fill="#708474" font-size="11" font-weight="500">Badan Penyelenggara Jaminan Produk Halal (BPJPH)</text>
      </g>

      <image href="${logoHalal}" x="480" y="35" width="90" height="100" preserveAspectRatio="xMidYMid meet" />
    </g>

    <g transform="translate(100, 300)">
      <g transform="translate(0, 0)">
        <text x="0" y="24" fill="#23382C" font-size="20" font-weight="900" class="serif">DAPOER PMCSU</text>
        <text x="0" y="55" fill="#55695D" font-size="13" font-weight="500">Katering terpercaya dengan sertifikat Halal</text>
        <text x="0" y="77" fill="#55695D" font-size="13" font-weight="500">resmi, menghadirkan masakan cita rasa otentik,</text>
        <text x="0" y="99" fill="#55695D" font-size="13" font-weight="500">higienis, dan pengiriman tepat waktu.</text>
      </g>

      <g transform="translate(360, 0)">
        <text x="0" y="24" fill="#23382C" font-size="16" font-weight="800">Navigasi Cepat</text>
        <a href="#Tentang-Kami-Section"><text x="0" y="58" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Tentang Kami</text></a>
        <a href="#Layanan-Section"><text x="0" y="86" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Layanan Catering</text></a>
        <a href="#Menu-Catalog-Section"><text x="0" y="114" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Katalog Menu</text></a>
        <a href="#Galeri-Section"><text x="0" y="142" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Galeri Acara</text></a>
      </g>

      <g transform="translate(680, 0)">
        <text x="0" y="24" fill="#23382C" font-size="16" font-weight="800">Layanan Kami</text>
        <a href="#Layanan-Section"><text x="0" y="58" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Prasmanan &amp; Wedding</text></a>
        <a href="#Layanan-Section"><text x="0" y="86" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Nasi Kotak / Bento Box</text></a>
        <a href="#Layanan-Section"><text x="0" y="114" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Tumpeng Tradisional</text></a>
        <a href="#Layanan-Section"><text x="0" y="142" fill="#55695D" font-size="13" font-weight="600" class="cursor-pointer">• Coffee Break &amp; Snack</text></a>
      </g>

      <g transform="translate(980, 0)">
        <text x="0" y="24" fill="#23382C" font-size="16" font-weight="800">Hubungi Kami</text>
        <text x="0" y="58" fill="#55695D" font-size="13" font-weight="600">📞 WhatsApp: 0812-3456-7890</text>
        <text x="0" y="86" fill="#55695D" font-size="13" font-weight="600">✉️ Email: info@dapoerpmcsu.com</text>
        <text x="0" y="114" fill="#55695D" font-size="13" font-weight="600">📍 Jakarta Selatan, DKI Jakarta</text>
        <text x="0" y="142" fill="#8D6B26" font-size="13" font-weight="800">Jangkauan: Jabodetabek</text>
      </g>
    </g>

    <g transform="translate(480, 520)">
      <rect width="140" height="36" rx="18" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
      <text x="18" y="23" fill="#23382C" font-size="12" font-weight="700">📷 Instagram</text>
      <rect x="160" width="140" height="36" rx="18" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
      <text x="180" y="23" fill="#23382C" font-size="12" font-weight="700">📘 Facebook</text>
      <rect x="320" width="140" height="36" rx="18" fill="#FCFBF6" stroke="#CBDFA5" stroke-width="1" />
      <text x="340" y="23" fill="#23382C" font-size="12" font-weight="700">✉️ Email Kami</text>
    </g>

    <line x1="100" y1="600" x2="1340" y2="600" stroke="#CBDFA5" stroke-width="1" />
    <text x="720" y="640" text-anchor="middle" fill="#55695D" font-size="13" font-weight="600">© 2026 DAPOER PMCSU. Hak Cipta Dilindungi.</text>
  </g>
</svg>`;

const outputPath = path.join(__dirname, 'dapoer-pmcsu-laptop-mockup.svg');
fs.writeFileSync(outputPath, svgContent, 'utf-8');
console.log('Successfully re-generated SVG with native clickable anchors.');
