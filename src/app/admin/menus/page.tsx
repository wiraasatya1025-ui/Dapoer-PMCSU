"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, Upload, Star } from "lucide-react";

interface Variant {
  name: string;
  price: number;
}

interface Menu {
  id: number;
  category_id: number | null;
  category_name?: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  variants: string; // JSON
  is_available: number;
  is_featured: number;
  sort_order: number;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: 0,
    image_url: "",
    variants: [] as Variant[],
    is_available: true,
    is_featured: false,
    sort_order: 0,
  });
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resMenus, resCats] = await Promise.all([
        fetch("/api/menus"),
        fetch("/api/categories"),
      ]);
      const dataMenus = await resMenus.json();
      const dataCats = await resCats.json();
      setMenus(dataMenus);
      setCategories(dataCats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category_id: categories[0]?.id ? String(categories[0].id) : "",
      description: "",
      price: 0,
      image_url: "",
      variants: [],
      is_available: true,
      is_featured: false,
      sort_order: menus.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (menu: Menu) => {
    setEditingId(menu.id);
    let parsedVariants: Variant[] = [];
    try {
      parsedVariants = JSON.parse(menu.variants || "[]");
    } catch {
      parsedVariants = [];
    }

    setFormData({
      name: menu.name,
      category_id: menu.category_id ? String(menu.category_id) : "",
      description: menu.description || "",
      price: menu.price,
      image_url: menu.image_url || "",
      variants: parsedVariants,
      is_available: Boolean(menu.is_available),
      is_featured: Boolean(menu.is_featured),
      sort_order: menu.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
      } else {
        alert("Gagal mengunggah gambar: " + (data.error || ""));
      }
    } catch {
      alert("Terjadi kesalahan saat upload gambar.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", price: prev.price || 0 }],
    }));
  };

  const handleRemoveVariant = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== idx),
    }));
  };

  const handleUpdateVariant = (idx: number, field: keyof Variant, value: string | number) => {
    setFormData((prev) => {
      const updated = [...prev.variants];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: editingId,
      category_id: formData.category_id ? Number(formData.category_id) : null,
      price: Number(formData.price),
    };

    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/menus", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchData();
    } else {
      const data = await res.json();
      alert("Gagal menyimpan menu: " + (data.error || ""));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;
    const res = await fetch(`/api/menus?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchData();
    } else {
      alert("Gagal menghapus menu.");
    }
  };

  const filteredMenus = menus.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "all" || String(m.category_id) === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Katalog Menu</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Tambah, ubah harga dasar, foto, status ketersediaan, serta pilihan paket varian menu catering.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Cari nama menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-500 whitespace-nowrap">Kategori:</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menus Table / List */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">Memuat data menu...</div>
        ) : filteredMenus.length === 0 ? (
          <div className="p-12 text-center text-stone-400">Belum ada menu yang sesuai kriteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-700">
              <thead className="bg-stone-50 text-stone-500 font-semibold text-xs border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Menu & Foto</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga Dasar</th>
                  <th className="py-3 px-4">Varian Paket</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMenus.map((m) => {
                  let variantsCount = 0;
                  try {
                    variantsCount = JSON.parse(m.variants || "[]").length;
                  } catch {
                    variantsCount = 0;
                  }

                  return (
                    <tr key={m.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                            {m.image_url ? (
                              <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[10px] text-stone-400">No Foto</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                              <span>{m.name}</span>
                              {m.is_featured === 1 && (
                                <span title="Menu Unggulan">
                                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-stone-400 line-clamp-1">{m.description || "-"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">
                          {m.category_name || "Tanpa Kategori"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-stone-900">
                        Rp {m.price.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        {variantsCount > 0 ? (
                          <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded-md font-medium border border-orange-200/60">
                            {variantsCount} varian paket
                          </span>
                        ) : (
                          <span className="text-xs text-stone-400">Tunggal</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {m.is_available ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tersedia</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full font-medium">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Habis</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(m)}
                            className="p-1.5 text-stone-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-2xl my-8 overflow-hidden">
            <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">
                {editingId ? "Edit Menu Catering" : "Tambah Menu Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-semibold"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Nama & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Menu *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Paket Nasi Kotak Rendang"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Harga & Urutan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Harga Dasar (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="Contoh: 35000"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor Urut Tampilan</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi Lengkap / Isi Lauk</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Rincian lauk, isi porsi, atau keunggulan menu..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              {/* Upload Foto & Preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Foto Menu (Auto WebP Compressed)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200 transition-all">
                    <Upload className="w-4 h-4 text-stone-500" />
                    <span>{uploading ? "Mengompres & Mengunggah..." : "Pilih File Foto"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <input
                    type="text"
                    placeholder="Atau masukkan URL gambar..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                {formData.image_url && (
                  <div className="mt-2 w-24 h-24 rounded-xl border border-stone-200 overflow-hidden bg-stone-50">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Varian / Pilihan Paket */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-stone-800">Pilihan Varian / Paket (Opsional)</span>
                    <p className="text-[11px] text-stone-500">Contoh: Porsi Reguler (Rp 25.000), Porsi Komplit (Rp 35.000)</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 bg-white border border-orange-200 px-2.5 py-1 rounded-lg"
                  >
                    + Tambah Varian
                  </button>
                </div>

                {formData.variants.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Nama Varian (misal: Komplit)"
                      value={v.name}
                      onChange={(e) => handleUpdateVariant(idx, "name", e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Harga Varian"
                      value={v.price}
                      onChange={(e) => handleUpdateVariant(idx, "price", Number(e.target.value))}
                      className="w-32 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Status & Featured Checkbox */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                  />
                  <span>Tersedia untuk Dipesan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                  />
                  <span>Menu Unggulan (Tampil di Beranda)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 text-sm font-semibold hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
