import Database from "better-sqlite3";
import path from "path";
import bcrypt from "bcryptjs";

const dbPath = path.join(process.cwd(), "catering.db");
const db = new Database(dbPath);

// Enable WAL mode for high performance
db.pragma("journal_mode = WAL");

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS brand_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tagline TEXT,
      description TEXT,
      vision TEXT,
      mission TEXT,
      logo_url TEXT,
      banner_url TEXT,
      address TEXT,
      maps_url TEXT,
      phone TEXT,
      email TEXT,
      instagram TEXT,
      operating_hours TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      features TEXT, -- JSON array of strings
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      image_url TEXT,
      variants TEXT, -- JSON array of { name: string, price: number }
      is_available INTEGER DEFAULT 1,
      is_featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS galleries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image_url TEXT NOT NULL,
      event_type TEXT,
      event_date TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      role_or_event TEXT,
      rating INTEGER DEFAULT 5,
      comment TEXT NOT NULL,
      avatar_url TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed default admin if none exists
  const existingAdmin = db.prepare("SELECT id FROM users WHERE username = 'admin'").get();
  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    db.prepare("INSERT OR IGNORE INTO users (username, password, name) VALUES (?, ?, ?)").run(
      "admin",
      hashedPassword,
      "Super Admin Catering"
    );
  }

  // Seed default brand profile
  const profileCheck = db.prepare("SELECT COUNT(*) as count FROM brand_profile").get() as { count: number };
  if (profileCheck.count === 0) {
    db.prepare(`
      INSERT INTO brand_profile (
        name, tagline, description, vision, mission, logo_url, banner_url,
        address, maps_url, phone, email, instagram, operating_hours
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "Rasa Nusantara Catering",
      "Kelezatan Tradisi, Sentuhan Modern untuk Setiap Momen Spesial Anda",
      "Rasa Nusantara Catering hadir dengan dedikasi menyajikan aneka sajian kuliner istimewa berstandar higienis tinggi, bahan-bahan segar berkualitas pilihan, dan cita rasa autentik Indonesia yang menggugah selera.",
      "Menjadi mitra catering terdepan dan terpercaya dengan menyajikan kualitas kuliner terbaik serta pelayanan profesional di setiap momen berharga Anda.",
      "1. Menghadirkan menu makanan dan minuman lezat berkualitas prima.\n2. Mengutamakan standar higienitas dan kebersihan tingkat tinggi.\n3. Memberikan pelayanan yang ramah, tepat waktu, dan fleksibel sesuai kebutuhan klien.\n4. Melestarikan kekayaan rasa kuliner nusantara dengan sentuhan modern.",
      "",
      "",
      "Jl. Kenangan Kuliner No. 18, Kebayoran Baru, Jakarta Selatan",
      "https://maps.google.com",
      "081234567890",
      "kontak@rasanusantaracatering.com",
      "@rasanusantara.catering",
      "Senin - Minggu: 08.00 - 20.00 WIB"
    );
  }

  // Seed default settings (including WhatsApp template)
  const waTemplateCheck = db.prepare("SELECT value FROM settings WHERE key = 'wa_template'").get();
  if (!waTemplateCheck) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run(
      "wa_template",
      `Halo {brand_name}, saya tertarik dan ingin konsultasi / memesan menu berikut:

*Menu:* {menu_name}
*Harga:* {menu_price}
*Varian / Pilihan:* {menu_variant}

---
*Data Pemesan:*
- Nama: 
- Jumlah Porsi / Pax: 
- Tanggal Acara: 
- Alamat Acara: 

Mohon informasi ketersediaan dan ketentuannya. Terima kasih!`
    );
  }

  const waPhoneCheck = db.prepare("SELECT value FROM settings WHERE key = 'wa_phone'").get();
  if (!waPhoneCheck) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run(
      "wa_phone",
      "6281234567890"
    );
  }

  const orderGuideCheck = db.prepare("SELECT value FROM settings WHERE key = 'order_guide'").get();
  if (!orderGuideCheck) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run(
      "order_guide",
      JSON.stringify([
        {
          step: 1,
          title: "Pilih Menu Favorit",
          desc: "Jelajahi katalog menu makanan, minuman, dan paket catering yang sesuai dengan selera dan konsep acara Anda."
        },
        {
          step: 2,
          title: "Klik Pesan via WhatsApp",
          desc: "Tekan tombol pemesanan pada menu pilihan Anda. Pesan otomatis dengan rincian menu akan langsung disiapkan."
        },
        {
          step: 3,
          title: "Lengkapi Detail & Konsultasi",
          desc: "Kirimkan pesan ke admin kami, sampaikan jumlah porsi, tanggal acara, serta preferensi khusus Anda."
        },
        {
          step: 4,
          title: "Konfirmasi & Hidangan Siap Diantar",
          desc: "Admin kami akan mengonfirmasi ketersediaan, total rincian, dan pesanan akan disiapkan tepat waktu untuk acara Anda."
        }
      ])
    );
  }

  // Seed default categories
  const catCheck = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
  if (catCheck.count === 0) {
    const insertCat = db.prepare("INSERT OR IGNORE INTO categories (name, slug, sort_order) VALUES (?, ?, ?)");
    insertCat.run("Nasi Kotak & Box", "nasi-kotak", 1);
    insertCat.run("Prasmanan / Buffet", "prasmanan", 2);
    insertCat.run("Snack Box & Coffee Break", "snack-box", 3);
    insertCat.run("Tumpeng Mini & Tradisional", "tumpeng", 4);
    insertCat.run("Minuman & Dessert", "minuman", 5);
  }

  // Seed default services
  const servCheck = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
  if (servCheck.count === 0) {
    const insertServ = db.prepare("INSERT INTO services (name, description, features, sort_order) VALUES (?, ?, ?, ?)");
    insertServ.run(
      "Catering Acara Kantor & Corporate",
      "Layanan catering profesional untuk meeting, seminar, peresmian, hingga gathering perusahaan dengan sajian tepat waktu.",
      JSON.stringify(["Packaging higienis & rapi", "Pilihan prasmanan atau bento box", "Faktur & nota resmi tersedia"]),
      1
    );
    insertServ.run(
      "Catering Pernikahan & Resepsi",
      "Paket prasmanan mewah dan pondokan (food stall) istimewa untuk hari bahagia Anda dengan dekorasi meja hidangan elegan.",
      JSON.stringify(["Dekorasi stall elegan", "Pramusaji berseragam rapi", "Free food tasting"]),
      2
    );
    insertServ.run(
      "Nasi Kotak Harian & Syukuran",
      "Solusi praktis dan nikmat untuk syukuran, pengajian, aqiqah, perayaan ulang tahun, hingga catering rombongan tour.",
      JSON.stringify(["Menu variatif berganti tiap hari", "Dibuat dari bahan segar berkualitas", "Pengiriman tepat waktu"]),
      3
    );
  }

  // Seed default menus
  const menuCheck = db.prepare("SELECT COUNT(*) as count FROM menus").get() as { count: number };
  if (menuCheck.count === 0) {
    const getCatId = (slug: string) => {
      const row = db.prepare("SELECT id FROM categories WHERE slug = ?").get(slug) as { id: number } | undefined;
      return row ? row.id : 1;
    };

    const insertMenu = db.prepare(`
      INSERT INTO menus (category_id, name, description, price, variants, is_available, is_featured, sort_order)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `);

    insertMenu.run(
      getCatId("nasi-kotak"),
      "Paket Nasi Kuning Royal",
      "Nasi kuning harum gurih dengan ayam suwir pedas manis, sambal goreng ati kentang, telur dadar iris, perkedel, emping & sambal terasi.",
      35000,
      JSON.stringify([
        { name: "Standar (Ayam Suwir)", price: 35000 },
        { name: "Spesial (+ Telur Balado)", price: 42000 },
        { name: "Komplit (+ Rendang Daging)", price: 50000 }
      ]),
      1,
      1
    );

    insertMenu.run(
      getCatId("nasi-kotak"),
      "Nasi Liwet Solo Komplit",
      "Nasi liwet gurih daun salam, ayam ungkep opor suwir, sayur labu siam pedas gurih, areh santan kental, dan telur pindang.",
      38000,
      JSON.stringify([
        { name: "Porsi Reguler", price: 38000 },
        { name: "Porsi Komplit (+ Tahu Tempe Bacem)", price: 45000 }
      ]),
      1,
      2
    );

    insertMenu.run(
      getCatId("prasmanan"),
      "Paket Buffet Kemegahan Nusantara",
      "Sajian prasmanan komplit: Nasi Putih + Nasi Goreng, Daging Rendang / Sapi Lada Hitam, Ayam Bakar Madu, Kakap Asam Manis, Capcay Seafood, Sup Kimlo, Kerupuk, Buah & Puding.",
      85000,
      JSON.stringify([
        { name: "Paket Silver (5 Menu Utama)", price: 75000 },
        { name: "Paket Gold (7 Menu Utama)", price: 85000 },
        { name: "Paket Platinum (9 Menu + 2 Stall)", price: 110000 }
      ]),
      1,
      3
    );

    insertMenu.run(
      getCatId("snack-box"),
      "Snack Box Premium Delight",
      "Kombinasi 3 kue pilihan premium (Lemper Ayam Bakar, Pastel Tutup Keju, Pie Buah Segar) + Air Mineral 330ml.",
      22000,
      JSON.stringify([
        { name: "Paket 3 Kue + Air Mineral", price: 22000 },
        { name: "Paket 4 Kue + Jus Kemasan", price: 30000 }
      ]),
      1,
      4
    );

    insertMenu.run(
      getCatId("tumpeng"),
      "Tumpeng Tampah Tradisional (10-15 Porsi)",
      "Tumpeng beras kuning pulen dihias tampah anyaman janur dengan 7 lauk pendamping autentik dan sambal terasi khas.",
      450000,
      JSON.stringify([
        { name: "Ukuran Medium (10-15 Porsi)", price: 450000 },
        { name: "Ukuran Large (20-25 Porsi)", price: 750000 },
        { name: "Ukuran Grand (30-35 Porsi)", price: 1050000 }
      ]),
      1,
      5
    );
  }

  // Seed default testimonials
  const testiCheck = db.prepare("SELECT COUNT(*) as count FROM testimonials").get() as { count: number };
  if (testiCheck.count === 0) {
    const insertTesti = db.prepare(`
      INSERT INTO testimonials (client_name, role_or_event, rating, comment, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertTesti.run(
      "Dina Maharani",
      "Corporate Event di SCBD",
      5,
      "Menu nasi kotaknya sangat disukai seluruh peserta seminar kantor kami. Rasa bumbunya medok dan packaging bento box-nya sangat eksklusif. Admin WA juga sangat responsif!",
      1
    );

    insertTesti.run(
      "Bambang Prasetyo",
      "Acara Syukuran & Aqiqah",
      5,
      "Tumpeng dan paket nasi kuningnya luar biasa nikmat. Hiasannya rapi, higienis, dan pengiriman tiba tepat waktu sebelum acara dimulai. Sangat direkomendasikan!",
      2
    );

    insertTesti.run(
      "Siti Nurhaliza",
      "Resepsi Pernikahan Jakarta",
      5,
      "Buffet prasmanan di acara pernikahan kami dipuji semua tamu undangan. Ayam bakar madu dan sapi lada hitamnya juara. Pelayanan tim catering juga ramah dan sigap.",
      3
    );
  }
}

// Automatically init database when loaded
initDatabase();

export default db;
