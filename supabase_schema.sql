-- ==============================================================================
-- DAPOER PMCSU - SUPABASE (POSTGRESQL) SCHEMA & SEED QUERY
-- Buka Supabase Dashboard -> Masuk ke Project Anda -> SQL Editor -> Jalankan script ini
-- ==============================================================================

-- 1. TABEL USERS (Admin CMS)
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL BRAND PROFILE
CREATE TABLE IF NOT EXISTS public.brand_profile (
  id BIGSERIAL PRIMARY KEY,
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
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL CATEGORIES (Kategori Menu Makanan / Minuman)
CREATE TABLE IF NOT EXISTS public.categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT DEFAULT 0
);

-- 4. TABEL SERVICES (Layanan Catering)
CREATE TABLE IF NOT EXISTS public.services (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_active INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL MENUS (Katalog Menu & Varian Paket)
CREATE TABLE IF NOT EXISTS public.menus (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  image_url TEXT,
  variants JSONB DEFAULT '[]'::jsonb,
  is_available INT DEFAULT 1,
  is_featured INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL GALLERIES (Dokumentasi Acara & Portofolio)
CREATE TABLE IF NOT EXISTS public.galleries (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  event_type TEXT,
  event_date TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL TESTIMONIALS (Ulasan Klien)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  role_or_event TEXT,
  rating INT DEFAULT 5,
  comment TEXT NOT NULL,
  avatar_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABEL SETTINGS (Pengaturan WhatsApp & Template)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS
-- ==============================================================================

ALTER TABLE public.brand_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Izinkan publik membaca data untuk landing page
CREATE POLICY "Public read brand_profile" ON public.brand_profile FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read menus" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Public read galleries" ON public.galleries FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

-- Izinkan Service Role / Admin backend melakukan CRUD penuh
CREATE POLICY "Service role full access brand_profile" ON public.brand_profile USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access categories" ON public.categories USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access services" ON public.services USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access menus" ON public.menus USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access galleries" ON public.galleries USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access testimonials" ON public.testimonials USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access settings" ON public.settings USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access users" ON public.users USING (true) WITH CHECK (true);

-- ==============================================================================
-- DATA AWAL (SEEDER) - DAPOER PMCSU
-- ==============================================================================

-- 1. Default Admin (Password: admin123 ter-hash bcrypt)
INSERT INTO public.users (username, password, name)
VALUES (
  'admin',
  '$2a$10$wN31jJglp5Yf6q9mH3U3l.bFms1174O2p08pQ0q1j51Y5G3ZgY1Iq',
  'Super Admin Dapoer PMCSU'
) ON CONFLICT (username) DO NOTHING;

-- 2. Default Brand Profile
INSERT INTO public.brand_profile (
  id, name, tagline, description, vision, mission, logo_url, banner_url,
  address, maps_url, phone, email, instagram, operating_hours
) VALUES (
  1,
  'DAPOER PMCSU',
  'Kelezatan Istimewa & Higienis untuk Setiap Momen Spesial Anda',
  'DAPOER PMCSU hadir dengan dedikasi menyajikan aneka sajian kuliner istimewa berstandar higienis tinggi, bahan-bahan segar berkualitas pilihan, dan cita rasa autentik yang menggugah selera untuk setiap acara Anda.',
  'Menjadi mitra catering terdepan dan terpercaya dengan menyajikan kualitas kuliner terbaik serta pelayanan profesional di setiap momen berharga Anda.',
  '1. Menghadirkan menu makanan dan minuman lezat berkualitas prima.\n2. Mengutamakan standar higienitas dan kebersihan tingkat tinggi.\n3. Memberikan pelayanan yang ramah, tepat waktu, dan fleksibel sesuai kebutuhan klien.\n4. Melestarikan kekayaan rasa kuliner nusantara dengan sentuhan modern.',
  '/logo-dapoer-pmcsu.png',
  '',
  'Jl. Kenangan Kuliner No. 18, Kebayoran Baru, Jakarta Selatan',
  'https://maps.google.com',
  '081234567890',
  'kontak@dapoerpmcsu.com',
  '@dapoerpmcsu.official',
  'Senin - Minggu: 08.00 - 20.00 WIB'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  logo_url = EXCLUDED.logo_url;

-- 3. Default Settings (WhatsApp Phone & Template Pesan)
INSERT INTO public.settings (key, value) VALUES
('wa_phone', '6281234567890'),
('wa_template', 'Halo {brand_name}, saya tertarik dan ingin konsultasi / memesan menu berikut:

*Menu:* {menu_name}
*Harga:* {menu_price}
*Varian / Pilihan:* {menu_variant}

---
*Data Pemesan:*
- Nama: 
- Jumlah Porsi / Pax: 
- Tanggal Acara: 
- Alamat Acara: 

Mohon informasi ketersediaan dan ketentuannya. Terima kasih!'),
('order_guide', '[{"step":1,"title":"Pilih Menu Favorit","desc":"Jelajahi katalog menu makanan, minuman, dan paket catering yang sesuai dengan selera dan konsep acara Anda."},{"step":2,"title":"Klik Pesan via WhatsApp","desc":"Tekan tombol pemesanan pada menu pilihan Anda. Pesan otomatis dengan rincian menu akan langsung disiapkan."},{"step":3,"title":"Lengkapi Detail & Konsultasi","desc":"Kirimkan pesan ke admin kami, sampaikan jumlah porsi, tanggal acara, serta preferensi khusus Anda."},{"step":4,"title":"Konfirmasi & Hidangan Siap Diantar","desc":"Admin kami akan mengonfirmasi ketersediaan, total rincian, dan pesanan akan disiapkan tepat waktu untuk acara Anda."}]')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 4. Default Categories
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Nasi Kotak & Box', 'nasi-kotak', 1),
('Prasmanan / Buffet', 'prasmanan', 2),
('Snack Box & Coffee Break', 'snack-box', 3),
('Tumpeng Mini & Tradisional', 'tumpeng', 4),
('Minuman & Dessert', 'minuman', 5)
ON CONFLICT (slug) DO NOTHING;

-- 5. Default Services
INSERT INTO public.services (name, description, features, sort_order) VALUES
(
  'Catering Acara Kantor & Corporate',
  'Layanan catering profesional untuk meeting, seminar, peresmian, hingga gathering perusahaan dengan sajian tepat waktu.',
  '["Packaging higienis & rapi", "Pilihan prasmanan atau bento box", "Faktur & nota resmi tersedia"]'::jsonb,
  1
),
(
  'Catering Pernikahan & Resepsi',
  'Paket prasmanan mewah dan pondokan (food stall) istimewa untuk hari bahagia Anda dengan dekorasi meja hidangan elegan.',
  '["Dekorasi stall elegan", "Pramusaji berseragam rapi", "Free food tasting"]'::jsonb,
  2
),
(
  'Nasi Kotak Harian & Syukuran',
  'Solusi praktis dan nikmat untuk syukuran, pengajian, aqiqah, perayaan ulang tahun, hingga catering rombongan tour.',
  '["Menu variatif berganti tiap hari", "Dibuat dari bahan segar berkualitas", "Pengiriman tepat waktu"]'::jsonb,
  3
);

-- 6. Default Menus
INSERT INTO public.menus (category_id, name, description, price, variants, is_available, is_featured, sort_order) VALUES
(
  1,
  'Paket Nasi Kuning Royal PMCSU',
  'Nasi kuning harum gurih dengan ayam suwir pedas manis, sambal goreng ati kentang, telur dadar iris, perkedel, emping & sambal terasi.',
  35000,
  '[{"name": "Standar (Ayam Suwir)", "price": 35000}, {"name": "Spesial (+ Telur Balado)", "price": 42000}, {"name": "Komplit (+ Rendang Daging)", "price": 50000}]'::jsonb,
  1, 1, 1
),
(
  1,
  'Nasi Liwet Komplit PMCSU',
  'Nasi liwet gurih daun salam, ayam ungkep opor suwir, sayur labu siam pedas gurih, areh santan kental, dan telur pindang.',
  38000,
  '[{"name": "Porsi Reguler", "price": 38000}, {"name": "Porsi Komplit (+ Tahu Tempe Bacem)", "price": 45000}]'::jsonb,
  1, 0, 2
),
(
  2,
  'Paket Buffet Kemegahan PMCSU',
  'Sajian prasmanan komplit: Nasi Putih + Nasi Goreng, Daging Rendang / Sapi Lada Hitam, Ayam Bakar Madu, Kakap Asam Manis, Capcay Seafood, Sup Kimlo, Kerupuk, Buah & Puding.',
  85000,
  '[{"name": "Paket Silver (5 Menu Utama)", "price": 75000}, {"name": "Paket Gold (7 Menu Utama)", "price": 85000}, {"name": "Paket Platinum (9 Menu + 2 Stall)", "price": 110000}]'::jsonb,
  1, 1, 3
),
(
  3,
  'Snack Box Premium Delight',
  'Kombinasi 3 kue pilihan premium (Lemper Ayam Bakar, Pastel Tutup Keju, Pie Buah Segar) + Air Mineral 330ml.',
  22000,
  '[{"name": "Paket 3 Kue + Air Mineral", "price": 22000}, {"name": "Paket 4 Kue + Jus Kemasan", "price": 30000}]'::jsonb,
  1, 0, 4
),
(
  4,
  'Tumpeng Tampah Tradisional (10-15 Porsi)',
  'Tumpeng beras kuning pulen dihias tampah anyaman janur dengan 7 lauk pendamping autentik dan sambal terasi khas.',
  450000,
  '[{"name": "Ukuran Medium (10-15 Porsi)", "price": 450000}, {"name": "Ukuran Large (20-25 Porsi)", "price": 750000}, {"name": "Ukuran Grand (30-35 Porsi)", "price": 1050000}]'::jsonb,
  1, 1, 5
);

-- 7. Default Testimonials
INSERT INTO public.testimonials (client_name, role_or_event, rating, comment, sort_order) VALUES
(
  'Dina Maharani',
  'Corporate Event di SCBD',
  5,
  'Menu nasi kotak dari DAPOER PMCSU sangat disukai seluruh peserta seminar kantor kami. Rasa bumbunya mantap dan packaging bento box-nya sangat eksklusif. Admin WA juga sangat responsif!',
  1
),
(
  'Bambang Prasetyo',
  'Acara Syukuran & Aqiqah',
  5,
  'Tumpeng dan paket nasi kuningnya luar biasa nikmat. Hiasannya rapi, higienis, dan pengiriman tiba tepat waktu sebelum acara dimulai. Sangat direkomendasikan!',
  2
),
(
  'Siti Nurhaliza',
  'Resepsi Pernikahan Jakarta',
  5,
  'Buffet prasmanan di acara pernikahan kami dipuji semua tamu undangan. Ayam bakar madu dan sapi lada hitamnya juara. Pelayanan tim catering juga ramah dan sigap.',
  3
);
