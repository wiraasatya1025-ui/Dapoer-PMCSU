"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: number;
  client_name: string;
  role_or_event: string;
  rating: number;
  comment: string;
  sort_order: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    client_name: "",
    role_or_event: "",
    rating: 5,
    comment: "",
    sort_order: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/social-proof");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
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
    if (!formData.client_name || !formData.comment) {
      alert("Nama klien dan komentar wajib diisi.");
      return;
    }

    const res = await fetch("/api/social-proof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "testimonial", ...formData }),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setFormData({ client_name: "", role_or_event: "", rating: 5, comment: "", sort_order: 0 });
      fetchData();
    } else {
      alert("Gagal menambahkan ulasan.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus testimoni ini?")) return;
    const res = await fetch(`/api/social-proof?type=testimonial&id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Testimoni</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola ulasan kata mereka yang telah merasakan hidangan catering Anda.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-stone-400">Memuat testimoni...</div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full p-8 text-center text-stone-400">Belum ada ulasan klien.</div>
        ) : (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-stone-700 text-xs italic mb-4 leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
              </div>
              <div className="border-t border-stone-100 pt-3">
                <span className="font-bold text-stone-900 text-sm block">{t.client_name}</span>
                <span className="text-[11px] text-stone-400 block">{t.role_or_event || "Pelanggan"}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">Tambah Testimoni Klien</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm">
                Tutup
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Klien / Pelanggan *</label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Contoh: Rina Anggraini"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Acara / Perusahaan</label>
                <input
                  type="text"
                  value={formData.role_or_event}
                  onChange={(e) => setFormData({ ...formData, role_or_event: e.target.value })}
                  placeholder="Contoh: Panitia Seminar Kampus"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Rating Bintang (1 - 5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                  <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Isi Ulasan / Testimoni *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Kesan pelanggan terhadap rasa, pengiriman, atau pelayanan..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs text-stone-600"
                >
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold">
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
