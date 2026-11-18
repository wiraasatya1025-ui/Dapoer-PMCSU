"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Star, Pencil, ExternalLink, AlertCircle } from "lucide-react";

interface Testimonial {
  id: number;
  client_name: string;
  role_or_event: string;
  rating: number;
  comment: string;
  avatar_url?: string;
  sort_order: number;
}

const emptyForm = {
  client_name: "",
  role_or_event: "",
  rating: 5,
  comment: "",
  avatar_url: "",
  sort_order: 0,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ ...emptyForm });

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

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, sort_order: testimonials.length + 1 });
    setIsModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData({
      client_name: t.client_name,
      role_or_event: t.role_or_event || "",
      rating: t.rating || 5,
      comment: t.comment,
      avatar_url: t.avatar_url || "",
      sort_order: t.sort_order || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.comment) {
      alert("Nama klien dan komentar wajib diisi.");
      return;
    }
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId
        ? { type: "testimonial", id: editingId, ...formData }
        : { type: "testimonial", ...formData };

      const res = await fetch("/api/social-proof", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ ...emptyForm });
        fetchData();
      } else {
        const d = await res.json();
        alert("Gagal menyimpan: " + (d.error || ""));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus testimoni ini?")) return;
    const res = await fetch(`/api/social-proof?type=testimonial&id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const isInstagram = (url?: string) => url && url.includes("instagram.com");
  const isGoogle = (url?: string) => url && (url.includes("google.com/maps") || url.includes("maps.app.goo.gl") || url.includes("maps.google.com"));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Ulasan & Testimoni</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola ulasan pelanggan dari Google Maps & Instagram.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] border border-[#DFBF73] text-white rounded-xl text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Ulasan</span>
        </button>
      </div>

      {/* Info cara dapat link Google review */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 text-xs text-blue-800">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
        <div>
          <p className="font-semibold mb-1">Cara mendapatkan link langsung ke review Google Maps:</p>
          <ol className="list-decimal pl-4 space-y-0.5 text-blue-700">
            <li>Buka Google Maps → cari <strong>Pasar Minggu Catering Service</strong></li>
            <li>Klik tab <strong>Ulasan</strong> → temukan review yang ingin ditautkan</li>
            <li>Klik <strong>titik tiga (⋮)</strong> di pojok review → klik <strong>"Bagikan Ulasan"</strong></li>
            <li>Copy link lalu paste ke kolom <strong>Link Sumber</strong> saat edit ulasan</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-stone-400">Memuat testimoni...</div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full p-8 text-center text-stone-400">Belum ada ulasan klien.</div>
        ) : (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Badge sumber */}
                    {isInstagram(t.avatar_url) && (
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">Instagram</span>
                    )}
                    {isGoogle(t.avatar_url) && (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Google</span>
                    )}
                    {!t.avatar_url && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Tanpa Link</span>
                    )}
                  </div>
                </div>
                <p className="text-stone-700 text-xs italic mb-3 leading-relaxed line-clamp-3">&ldquo;{t.comment}&rdquo;</p>
                <div className="border-t border-stone-100 pt-2">
                  <span className="font-bold text-stone-900 text-xs block">{t.client_name}</span>
                  <span className="text-[11px] text-stone-400 block">{t.role_or_event || "Pelanggan"}</span>
                  {t.avatar_url && (
                    <a
                      href={t.avatar_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-[#8D6B26] hover:underline mt-1 truncate max-w-full"
                      title={t.avatar_url}
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span className="truncate">{t.avatar_url.replace("https://", "")}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-stone-100">
                <button
                  onClick={() => openEdit(t)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#8D6B26] border border-[#CBDFA5] bg-[#DFECC0] hover:bg-[#CBDFA5] rounded-xl transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit / Tambah Link
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-stone-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">
                {editingId ? "Edit Ulasan" : "Tambah Ulasan Baru"}
              </h2>
              <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="text-stone-400 hover:text-stone-600 text-sm">
                Tutup
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Klien *</label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Contoh: Niena K"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Acara / Platform</label>
                <input
                  type="text"
                  value={formData.role_or_event}
                  onChange={(e) => setFormData({ ...formData, role_or_event: e.target.value })}
                  placeholder="Contoh: Local Guide Google • 74 Ulasan"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>

              {/* Link Sumber — ditonjolkan */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                <label className="block text-xs font-semibold text-amber-800">
                  🔗 Link Sumber Review (Google Maps / Instagram)
                </label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://maps.app.goo.gl/... atau https://www.instagram.com/reel/..."
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <p className="text-[11px] text-amber-700">
                  Isi link ini agar kartu ulasan bisa diklik langsung ke sumbernya.
                  Untuk Google: klik ⋮ pada review → &ldquo;Bagikan Ulasan&rdquo;.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Rating Bintang</label>
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Isi Ulasan *</label>
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
                  onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs text-stone-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] border border-[#DFBF73] text-white rounded-xl text-xs font-semibold shadow-sm disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
