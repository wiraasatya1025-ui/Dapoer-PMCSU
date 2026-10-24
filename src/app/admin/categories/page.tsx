"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FolderTree } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sort_order: sortOrder }),
    });

    if (res.ok) {
      setName("");
      setSortOrder(0);
      fetchCategories();
    } else {
      alert("Gagal menambahkan kategori.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kategori ini? Menu di kategori ini akan kehilangan relasinya.")) return;
    const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchCategories();
    } else {
      alert("Gagal menghapus kategori.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Kategori Menu</h1>
        <p className="text-stone-500 text-sm mt-0.5">
          Atur kelompok menu makanan & minuman seperti Nasi Kotak, Prasmanan, Tumpeng, Snack Box, dll.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Tambah */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm h-fit">
          <h2 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Tambah Kategori</span>
          </h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Nama Kategori *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Coffee Break & Pastry"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Nomor Urut Tampilan</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all mt-2"
            >
              Simpan Kategori
            </button>
          </form>
        </div>

        {/* List Kategori */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-stone-500" />
              <span>Daftar Kategori ({categories.length})</span>
            </span>
          </div>
          {loading ? (
            <div className="p-8 text-center text-stone-400">Memuat kategori...</div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-stone-400">Belum ada kategori.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {categories.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div>
                    <span className="font-semibold text-stone-800 text-sm">{c.name}</span>
                    <span className="block text-xs text-stone-400">Slug: {c.slug} | Urutan: {c.sort_order}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
