"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Building2, MapPin, Phone, Camera, Clock, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    vision: "",
    mission: "",
    logo_url: "",
    banner_url: "",
    address: "",
    maps_url: "",
    phone: "",
    email: "",
    instagram: "",
    operating_hours: "",
    wa_phone: "",
    wa_template: "",
    // Hero & Tagline dinamis
    hero_tagline: "",
    hero_title_1: "",
    hero_title_2: "",
    hero_subtitle: "",
    hero_feature_1: "",
    hero_feature_2: "",
    hero_feature_3: "",
    hero_feature_4: "",
    // Trust Badges dinamis
    trust_badge_1: "",
    trust_badge_2: "",
    trust_badge_3: "",
    // E-Brosur / PDF
    pdf_catalog_url: "",
    // Logistik & Area Pengiriman
    delivery_area_text: "",
    min_order_text: "",
    lead_time_text: "",
    // FAQ JSON
    faq_data: "",
    // Klien Korporat
    corporate_clients: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      const s = data.settings || {};
      if (data.profile) {
        setFormData({
          name: data.profile.name || "",
          tagline: data.profile.tagline || "",
          description: data.profile.description || "",
          vision: data.profile.vision || "",
          mission: data.profile.mission || "",
          logo_url: data.profile.logo_url || "",
          banner_url: data.profile.banner_url || "",
          address: data.profile.address || "",
          maps_url: data.profile.maps_url || "",
          phone: data.profile.phone || "",
          email: data.profile.email || "",
          instagram: data.profile.instagram || "",
          operating_hours: data.profile.operating_hours || "",
          wa_phone: s.wa_phone || "6281234567890",
          wa_template: s.wa_template || "",
          hero_tagline: s.hero_tagline || "Catering Pilihan Jakarta",
          hero_title_1: s.hero_title_1 || "Catering Lezat,",
          hero_title_2: s.hero_title_2 || "Higienis & Terpercaya",
          hero_subtitle: s.hero_subtitle || "Solusi Praktis & Istimewa untuk Setiap Acara Anda",
          hero_feature_1: s.hero_feature_1 || "100% Halal & Bahan Baku Segar Berkualitas",
          hero_feature_2: s.hero_feature_2 || "Mulai dari Rp 45.000,- / Porsi (Harga Bersahabat)",
          hero_feature_3: s.hero_feature_3 || "Lebih dari 50+ Variasi Menu Masakan Nusantara & Internasional",
          hero_feature_4: s.hero_feature_4 || "Pengiriman Tepat Waktu untuk Seluruh Jabodetabek",
          trust_badge_1: s.trust_badge_1 || "100% Halal Terjamin",
          trust_badge_2: s.trust_badge_2 || "Standar Higienis & Dapur Steril",
          trust_badge_3: s.trust_badge_3 || "Bahan Pangan Segar Pilihan",
          pdf_catalog_url: s.pdf_catalog_url || "",
          delivery_area_text: s.delivery_area_text || "Seluruh Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
          min_order_text: s.min_order_text || "Mulai 20 Pax (Nasi Box) &bull; Prasmanan min. 50 Pax",
          lead_time_text: s.lead_time_text || "H-2 Acara Berjalan (Menerima pesanan darurat)",
          faq_data: s.faq_data || "",
          corporate_clients: s.corporate_clients || "Bank Mandiri, Telkom Indonesia, Pertamina Group, Kementerian BUMN, Unilever ID, Astra International",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Gagal memperbarui pengaturan.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-stone-400">Memuat profil & pengaturan...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Tentang Kami & Pengaturan WhatsApp</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola profil tentang brand, visi misi, kontak, jam operasional, dan format pesan WhatsApp otomatis pelanggan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl font-medium border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Berhasil Disimpan</span>
            </span>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>Pengaturan Integrasi WhatsApp (Pemesanan Dinamis)</span>
        </h2>
        <p className="text-xs text-stone-500">
          Ketika calon pelanggan menekan tombol pesan pada menu makanan/paket di website, sistem akan mengarahkan ke WhatsApp nomor ini dengan format pesan otomatis di bawah.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nomor WhatsApp Admin (Gunakan format 62...) *
            </label>
            <input
              type="text"
              required
              value={formData.wa_phone}
              onChange={(e) => setFormData({ ...formData, wa_phone: e.target.value.replace(/\D/g, "") })}
              placeholder="Contoh: 6281234567890"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              Gunakan kode negara (62 untuk Indonesia tanpa tanda + atau 0 di depan).
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700">Template Pesan WhatsApp</label>
              <span className="text-[10px] text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded">
                Placeholder: {"{brand_name}"}, {"{menu_name}"}, {"{menu_price}"}, {"{menu_variant}"}
              </span>
            </div>
            <textarea
              rows={8}
              value={formData.wa_template}
              onChange={(e) => setFormData({ ...formData, wa_template: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Profil Brand */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-600" />
          <span>Informasi Brand & Visi Misi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Brand Catering *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Tagline Slogan</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi / Tentang Brand</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Visi Brand</label>
            <textarea
              rows={3}
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Misi Brand</label>
            <textarea
              rows={3}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>
      </div>

      {/* Kontak & Lokasi */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span>Lokasi Usaha, Jam Operasional & Media Sosial</span>
        </h2>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Lengkap Usaha Catering</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Tautan Google Maps</label>
            <input
              type="text"
              value={formData.maps_url}
              onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Instagram (@akun)</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Jam Operasional</label>
            <input
              type="text"
              value={formData.operating_hours}
              onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
              placeholder="Senin - Minggu: 08.00 - 20.00"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>
      </div>

      {/* Hero Header & Teks Utama */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-orange-600" />
          <span>Pengaturan Hero Section (Judul & Subjudul Halaman Utama)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Judul Utama Baris 1</label>
            <input
              type="text"
              value={formData.hero_title_1}
              onChange={(e) => setFormData({ ...formData, hero_title_1: e.target.value })}
              placeholder="Contoh: Catering Lezat,"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Judul Utama Baris 2 (Highlight Emas)</label>
            <input
              type="text"
              value={formData.hero_title_2}
              onChange={(e) => setFormData({ ...formData, hero_title_2: e.target.value })}
              placeholder="Contoh: Higienis & Terpercaya"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Tagline Pill Kecil di Atas Judul</label>
          <input
            type="text"
            value={formData.hero_tagline}
            onChange={(e) => setFormData({ ...formData, hero_tagline: e.target.value })}
            placeholder="Contoh: Catering Pilihan Jakarta"
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
          />
        </div>

        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            Poin Keunggulan Checklist (Centang Emas di Hero)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-stone-500 mb-1 block">Checklist 1:</span>
              <input
                type="text"
                value={formData.hero_feature_1}
                onChange={(e) => setFormData({ ...formData, hero_feature_1: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <span className="text-[11px] text-stone-500 mb-1 block">Checklist 2:</span>
              <input
                type="text"
                value={formData.hero_feature_2}
                onChange={(e) => setFormData({ ...formData, hero_feature_2: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <span className="text-[11px] text-stone-500 mb-1 block">Checklist 3:</span>
              <input
                type="text"
                value={formData.hero_feature_3}
                onChange={(e) => setFormData({ ...formData, hero_feature_3: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <span className="text-[11px] text-stone-500 mb-1 block">Checklist 4:</span>
              <input
                type="text"
                value={formData.hero_feature_4}
                onChange={(e) => setFormData({ ...formData, hero_feature_4: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges & PDF E-Brochure */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Trust Badges & Katalog PDF E-Brochure</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Badge 1</label>
            <input
              type="text"
              value={formData.trust_badge_1}
              onChange={(e) => setFormData({ ...formData, trust_badge_1: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Badge 2</label>
            <input
              type="text"
              value={formData.trust_badge_2}
              onChange={(e) => setFormData({ ...formData, trust_badge_2: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Trust Badge 3</label>
            <input
              type="text"
              value={formData.trust_badge_3}
              onChange={(e) => setFormData({ ...formData, trust_badge_3: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            URL File PDF Menu / E-Brochure (Opsional)
          </label>
          <input
            type="text"
            value={formData.pdf_catalog_url}
            onChange={(e) => setFormData({ ...formData, pdf_catalog_url: e.target.value })}
            placeholder="Kosongkan jika ingin langsung mengarahkan minta brosur via WhatsApp"
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
          />
          <span className="text-[11px] text-stone-400 mt-1 block">
            Jika diisi link Google Drive / PDF Cloud, tombol "Unduh Menu PDF" akan langsung membuka link ini.
          </span>
        </div>
      </div>

      {/* Logistik & FAQ & Klien Korporat */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <span>Informasi Logistik, Area Pengiriman & Klien Korporat</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Jangkauan Area Pengiriman</label>
            <input
              type="text"
              value={formData.delivery_area_text}
              onChange={(e) => setFormData({ ...formData, delivery_area_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Pemesanan (Pax)</label>
            <input
              type="text"
              value={formData.min_order_text}
              onChange={(e) => setFormData({ ...formData, min_order_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Ketentuan Lead Time Reservasi</label>
            <input
              type="text"
              value={formData.lead_time_text}
              onChange={(e) => setFormData({ ...formData, lead_time_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Daftar Logo Klien Perusahaan (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={formData.corporate_clients}
            onChange={(e) => setFormData({ ...formData, corporate_clients: e.target.value })}
            placeholder="Contoh: Bank Mandiri, Telkom Indonesia, Pertamina, BCA, Unilever"
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
          />
        </div>
      </div>
    </form>
  );
}
