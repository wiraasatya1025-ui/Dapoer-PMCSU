"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Upload, Calendar } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  event_type: string;
  event_date: string;
  sort_order: number;
}

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    event_type: "buffet",
    event_date: "",
    sort_order: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/social-proof");
      const data = await res.json();
      setGalleries(data.galleries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
      } else {
        alert("Gagal mengunggah foto.");
      }
    } catch {
      alert("Error saat upload foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      alert("Judul dan foto wajib diisi.");
      return;
    }

    const res = await fetch("/api/social-proof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "gallery", ...formData }),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setFormData({ title: "", image_url: "", event_type: "", event_date: "", sort_order: 0 });
      fetchData();
    } else {
      alert("Gagal menyimpan foto galeri.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus foto dari galeri?")) return;
    const res = await fetch(`/api/social-proof?type=gallery&id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Portofolio Acara</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Unggah foto dokumentasi acara catering (resepsi, buffet corporate, syukuran) untuk portofolio acara.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Foto Acara</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-stone-400">Memuat galeri...</div>
        ) : galleries.length === 0 ? (
          <div className="col-span-full p-8 text-center text-stone-400">Belum ada foto dokumentasi acara.</div>
        ) : (
          galleries.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus Foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <span className="text-[11px] font-semibold text-orange-600 uppercase block">{item.event_type || "Acara"}</span>
                <h4 className="font-semibold text-stone-900 text-xs line-clamp-1">{item.title}</h4>
                {item.event_date && (
                  <span className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.event_date}</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-md overflow-hidden">
            <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">Upload Foto Dokumentasi Acara</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm">
                Tutup
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Judul / Keterangan Foto *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Prasmanan Pernikahan Gedung Bidakara"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori Suasana Acara *</label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                >
                  <option value="buffet">Tata Letak Meja Buffet (buffet)</option>
                  <option value="pondokan">Dekorasi Pondokan / Stalls (pondokan)</option>
                  <option value="staff">Kerapian Staf & Pramusaji (staff)</option>
                  <option value="event">Pernikahan & Acara Kantor (event)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Catatan Singkat / Tanggal Acara</label>
                <input
                  type="text"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  placeholder="Contoh: Chafing dish hangat & meja VIP / Okt 2026"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pilih File Foto *</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200">
                    <Upload className="w-4 h-4 text-stone-500" />
                    <span>{uploading ? "Mengompres ke WebP..." : "Pilih File"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="URL Foto..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                {formData.image_url && (
                  <div className="mt-2 w-20 h-20 rounded-xl border border-stone-200 overflow-hidden bg-stone-50">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
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
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
