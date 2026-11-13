"use client";

import { useState, useEffect } from "react";
import { ListOrdered, CheckCircle } from "lucide-react";

export default function HowToOrderPage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    step1_title: "",
    step1_desc: "",
    step2_title: "",
    step2_desc: "",
    step3_title: "",
    step3_desc: "",
    step4_title: "",
    step4_desc: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      const s = data.settings || {};
      setFormData({
        step1_title: s.step1_title || "Pilih Menu",
        step1_desc: s.step1_desc || "Jelajahi ragam pilihan menu makanan, minuman, dan paket prasmanan sesuai selera Anda.",
        step2_title: s.step2_title || "Pesan via WA",
        step2_desc: s.step2_desc || "Pilih varian atau paket yang diinginkan lalu tekan tombol pemesanan WhatsApp otomatis.",
        step3_title: s.step3_title || "Konsultasi Detail",
        step3_desc: s.step3_desc || "Kirim pesan ke admin, lengkapi tanggal acara, jumlah porsi, serta alamat pengantaran.",
        step4_title: s.step4_title || "Konfirmasi & Antar",
        step4_desc: s.step4_desc || "Admin mengonfirmasi rincian pesanan dan hidangan lezat siap diantar tepat waktu.",
      });
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
      alert("Gagal memperbarui panduan pemesanan.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-stone-400">Memuat data panduan pemesanan...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Panduan Pemesanan</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola 4 langkah panduan pemesanan yang tampil di halaman utama website.
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

      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-[#8D6B26]" />
          <span>4 Langkah Panduan Pemesanan</span>
        </h2>
        <p className="text-xs text-stone-500">
          Teks ini ditampilkan pada bagian &quot;Cara Pemesanan&quot; di halaman utama website.
        </p>

        {([1, 2, 3, 4] as const).map((n) => {
          const titleKey = `step${n}_title` as keyof typeof formData;
          const descKey = `step${n}_desc` as keyof typeof formData;
          return (
            <div key={n} className="p-4 border border-stone-100 rounded-xl bg-stone-50/50 space-y-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#D8B669] text-[#212E24] font-black text-sm">
                {n}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Langkah {n} - Judul</label>
                  <input
                    type="text"
                    value={formData[titleKey]}
                    onChange={(e) => setFormData({ ...formData, [titleKey]: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Langkah {n} - Deskripsi</label>
                  <textarea
                    rows={2}
                    value={formData[descKey]}
                    onChange={(e) => setFormData({ ...formData, [descKey]: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
