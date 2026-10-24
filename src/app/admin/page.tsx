import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { BookOpen, FolderTree, Briefcase, Image as ImageIcon, MessageSquareQuote, Settings, Eye } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    menusCountRes,
    categoriesCountRes,
    servicesCountRes,
    galleriesCountRes,
    testiCountRes,
    profileRes,
    settingsRes,
  ] = await Promise.all([
    supabaseAdmin.from("menus").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("categories").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("services").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("galleries").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("testimonials").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("brand_profile").select("name, phone").limit(1).single(),
    supabaseAdmin.from("settings").select("value").eq("key", "wa_phone").single(),
  ]);

  const menuCount = menusCountRes.count || 0;
  const categoryCount = categoriesCountRes.count || 0;
  const serviceCount = servicesCountRes.count || 0;
  const galleryCount = galleriesCountRes.count || 0;
  const testiCount = testiCountRes.count || 0;
  const brand = profileRes.data || { name: "DAPOER PMCSU" };
  const waPhone = settingsRes.data?.value || "6281234567890";

  const stats = [
    { label: "Katalog Menu", count: menuCount, href: "/admin/menus", icon: BookOpen, color: "bg-[#7CB342] text-white" },
    { label: "Kategori Menu", count: categoryCount, href: "/admin/categories", icon: FolderTree, color: "bg-[#CCA65B] text-white" },
    { label: "Layanan", count: serviceCount, href: "/admin/services", icon: Briefcase, color: "bg-[#558B2F] text-white" },
    { label: "Portofolio Acara", count: galleryCount, href: "/admin/gallery", icon: ImageIcon, color: "bg-blue-600 text-white" },
    { label: "Testimoni", count: testiCount, href: "/admin/testimonials", icon: MessageSquareQuote, color: "bg-rose-500 text-white" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1b2216] via-[#242e1d] to-[#2d3a24] text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#35442b] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#84C341] font-semibold">Database Supabase Cloud Terhubung</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white font-serif">
            {brand.name || "DAPOER PMCSU"}
          </h1>
          <p className="text-[#d8d5cb] text-sm mt-1 max-w-xl">
            Kelola menu makanan, paket varian, testimoni, dokumentasi acara, dan pesan otomatis WhatsApp langsung tersimpan di cloud Supabase.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#7CB342]/30"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Website</span>
          </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white p-5 rounded-2xl border border-[#e6e3da] shadow-xs hover:shadow-md hover:border-[#7CB342] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-stone-900 group-hover:text-[#7CB342] transition-colors">
                  {stat.count}
                </span>
              </div>
              <span className="text-xs font-medium text-stone-600">{stat.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick Setup Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#e6e3da] shadow-xs">
        <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#7CB342]" />
          <span>Informasi Kontak & Integrasi WhatsApp</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-[#fafaf6] rounded-xl border border-[#e6e3da]">
            <span className="text-xs text-stone-500 block mb-1 font-semibold uppercase">Nomor WhatsApp Tujuan:</span>
            <span className="text-base font-bold text-stone-800">+{waPhone}</span>
            <p className="text-xs text-stone-500 mt-1">Calon pelanggan yang menekan tombol pesan pada menu akan langsung diarahkan ke nomor ini.</p>
          </div>
          <div className="p-4 bg-[#fafaf6] rounded-xl border border-[#e6e3da] flex flex-col justify-between">
            <div>
              <span className="text-xs text-stone-500 block mb-1 font-semibold uppercase">Status Database Cloud:</span>
              <span className="text-xs text-[#558B2F] bg-[#edf6de] px-2 py-0.5 rounded-md font-semibold inline-block border border-[#7CB342]/30">
                Connected: Supabase Cloud PostgreSQL
              </span>
            </div>
            <Link
              href="/admin/settings"
              className="text-xs text-[#7CB342] hover:text-[#558B2F] font-semibold mt-2 inline-block"
            >
              Ubah Pengaturan & Template &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
