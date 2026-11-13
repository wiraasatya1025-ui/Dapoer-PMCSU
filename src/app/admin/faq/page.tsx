"use client";

import { useState, useEffect } from "react";
import { HelpCircle, CheckCircle, Truck, Clock, UtensilsCrossed } from "lucide-react";

export default function FaqAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [faqItems, setFaqItems] = useState<{ q: string; d: string }[]>([]);

  const [formData, setFormData] = useState({
    delivery_area_text: "",
    min_order_text: "",
    lead_time_text: "",
    faq_data: "",
    corporate_clients: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      const s = data.settings || {};
      const fd = {
        delivery_area_text: s.delivery_area_text || "Seluruh Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)",
        min_order_text: s.min_order_text || "Mulai 20 Pax (Nasi Box) &bull; Prasmanan min. 50 Pax",
        lead_time_text: s.lead_time_text || "H-2 Acara Berjalan (Menerima pesanan darurat)",
        faq_data: s.faq_data || "",
        corporate_clients: s.corporate_clients || "Bank Mandiri, Telkom Indonesia, Pertamina Group, Kementerian BUMN, Unilever ID, Astra International",
      };
      setFormData(fd);
      try {
        const parsed = JSON.parse(fd.faq_data || "[]");
        if (Array.isArray(parsed)) setFaqItems(parsed);
      } catch {
        setFaqItems([]);
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

    const payload = { ...formData, faq_data: JSON.stringify(faqItems) };

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Gagal memperbarui FAQ & Area.");
    }
  };

  const updateFaqItem = (idx: number, field: "q" | "d", val: string) => {
    setFaqItems(faqItems.map((f, i) => i === idx ? { ...f, [field]: val } : f));
  };

  const removeFaqItem = (idx: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== idx));
  };

  if (loading) {
    return <div className="p-8 text-center text-stone-400">Memuat data FAQ & Area...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">FAQ & Area Pengiriman</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola pertanyaan umum, area pengiriman, minimum order, dan informasi logistik.
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
            className="px-5 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] border border-[#DFBF73] text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Logistik Info */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#8D6B26]" />
          <span>Informasi Logistik & Area Pengiriman</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Jangkauan Area Pengiriman</label>
            <input
              type="text"
              value={formData.delivery_area_text}
              onChange={(e) => setFormData({ ...formData, delivery_area_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Pemesanan (Pax)</label>
            <input
              type="text"
              value={formData.min_order_text}
              onChange={(e) => setFormData({ ...formData, min_order_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Ketentuan Lead Time Reservasi</label>
            <input
              type="text"
              value={formData.lead_time_text}
              onChange={(e) => setFormData({ ...formData, lead_time_text: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
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
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#8D6B26]" />
          <span>FAQ (Pertanyaan yang Sering Ditanyakan)</span>
        </h2>
        <p className="text-xs text-stone-500">
          Pertanyaan dan jawaban ini ditampilkan pada bagian FAQ di halaman utama website.
        </p>

        {faqItems.map((item, idx) => (
          <div key={idx} className="p-4 border border-stone-200 rounded-xl space-y-2 relative">
            <button
              type="button"
              onClick={() => removeFaqItem(idx)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 text-sm font-bold"
            >
              ×
            </button>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Pertanyaan</label>
              <input
                type="text"
                value={item.q}
                onChange={(e) => updateFaqItem(idx, "q", e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Jawaban</label>
              <textarea
                rows={2}
                value={item.d}
                onChange={(e) => updateFaqItem(idx, "d", e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setFaqItems([...faqItems, { q: "", d: "" }])}
          className="text-sm font-semibold text-[#8D6B26] border border-[#CBDFA5] bg-[#DFECC0] hover:bg-[#CBDFA5] px-4 py-2 rounded-xl transition-colors"
        >
          + Tambah Pertanyaan
        </button>
      </div>
    </form>
  );
}
