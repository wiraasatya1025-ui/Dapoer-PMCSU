"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Briefcase, Upload } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  image_url: string;
  features: string; // JSON array
  is_active: number;
  sort_order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    features: [] as string[],
    newFeature: "",
    sort_order: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      image_url: "",
      features: [],
      newFeature: "",
      sort_order: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingId(s.id);
    let fList: string[] = [];
    try {
      fList = JSON.parse(s.features || "[]");
    } catch {
      fList = [];
    }

    setFormData({
      name: s.name,
      description: s.description,
      image_url: s.image_url || "",
      features: fList,
      newFeature: "",
      sort_order: s.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!formData.newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, prev.newFeature.trim()],
      newFeature: "",
    }));
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: editingId,
    };

    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchServices();
    } else {
      alert("Gagal menyimpan layanan.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus layanan ini?")) return;
    const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Layanan</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Kelola jenis layanan catering utama (Corporate, Pernikahan, Nasi Box Acara, Buffet, dll).
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-stone-400">Memuat layanan...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full p-8 text-center text-stone-400">Belum ada layanan catering.</div>
        ) : (
          services.map((s) => {
            let features: string[] = [];
            try {
              features = JSON.parse(s.features || "[]");
            } catch {
              features = [];
            }

            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-stone-400 hover:text-orange-600 rounded-lg hover:bg-orange-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">{s.name}</h3>
                  <p className="text-stone-500 text-xs line-clamp-3 mb-3">{s.description}</p>

                  {features.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {features.map((f, i) => (
                        <div key={i} className="text-xs text-stone-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">
                {editingId ? "Edit Layanan" : "Tambah Layanan Catering"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm">
                Tutup
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Layanan *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Catering Corporate & Gathering"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi Layanan *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan keunggulan layanan..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Poin Keunggulan / Fasilitas</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newFeature}
                    onChange={(e) => setFormData({ ...formData, newFeature: e.target.value })}
                    placeholder="Contoh: Free Food Tasting"
                    className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 bg-stone-800 text-white text-xs rounded-xl font-medium"
                  >
                    + Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.features.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-700 text-xs rounded-lg"
                    >
                      <span>{f}</span>
                      <button type="button" onClick={() => handleRemoveFeature(i)} className="text-stone-400 hover:text-rose-600">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-sm text-stone-600"
                >
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-600 text-white rounded-xl text-sm font-semibold">
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
