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
    { label: "Katalog Menu", count: menuCount, href: "/admin/menus", icon: BookOpen, color: "bg-[#DFECC0] text-[#8D6B26]" },
    { label: "Kategori Menu", count: categoryCount, href: "/admin/categories", icon: FolderTree, color: "bg-[#DFECC0] text-[#8D6B26]" },
    { label: "Layanan", count: serviceCount, href: "/admin/services", icon: Briefcase, color: "bg-[#DFECC0] text-[#8D6B26]" },
    { label: "Portofolio Acara", count: galleryCount, href: "/admin/gallery", icon: ImageIcon, color: "bg-[#DFECC0] text-[#8D6B26]" },
    { label: "Testimoni", count: testiCount, href: "/admin/testimonials", icon: MessageSquareQuote, color: "bg-[#DFECC0] text-[#8D6B26]" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner - Sesuai Card Gaya Landing Page */}
      <div className="bg-[#FCFBF6] p-6 sm:p-8 rounded-3xl shadow-sm border border-[#CBDFA5] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8D6B26] font-black bg-[#DFECC0] border border-[#CBDFA5] px-3 py-1 rounded-full inline-block mb-1.5">
            Database Supabase Cloud Terhubung
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal mt-1 text-[#9F7A2D] font-serif">
            {brand.name || "DAPOER PMCSU"}
          </h1>
          <p className="text-[#4B6152] text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Kelola menu prasmanan, tumpeng, varian snack, ulasan Google Maps, portofolio acara, dan template WhatsApp secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] rounded-xl text-xs font-bold transition-all shadow-md shadow-[#C9A24D]/25 border border-[#DFBF73]"
          >
            <Eye className="w-4 h-4 text-[#212E24]" />
            <span>Lihat Website Publik</span>
          </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-[#FCFBF6] p-4 sm:p-5 rounded-2xl border border-[#CBDFA5] shadow-xs hover:shadow-lg hover:border-[#D8B669] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} shadow-xs border border-black/5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#23382C] group-hover:text-[#9F7A2D] transition-colors">
                  {stat.count}
                </span>
              </div>
              <span className="text-xs font-bold text-[#4B6152]">{stat.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick Setup Card */}
      <div className="bg-[#FCFBF6] rounded-3xl p-6 sm:p-7 border border-[#CBDFA5] shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-[#23382C] mb-4 flex items-center gap-2 font-serif">
          <Settings className="w-5 h-5 text-[#8D6B26]" />
          <span>Informasi Kontak & Integrasi WhatsApp</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white rounded-2xl border border-[#CBDFA5]">
            <span className="text-[10px] text-[#8D6B26] block mb-1 font-bold uppercase tracking-wider">Nomor WhatsApp Admin:</span>
            <span className="text-base font-bold text-[#23382C]">+{waPhone}</span>
            <p className="text-xs text-[#55695D] mt-1">Calon pelanggan yang menekan tombol pesan pada katalog menu akan langsung terhubung ke nomor ini.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#CBDFA5] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#8D6B26] block mb-1 font-bold uppercase tracking-wider">Status Database Cloud:</span>
              <span className="text-xs text-[#23382C] bg-[#DFECC0] border border-[#CBDFA5] px-2.5 py-0.5 rounded-md font-bold inline-block">
                Connected: Supabase Cloud PostgreSQL
              </span>
            </div>
            <Link
              href="/admin/settings"
              className="text-xs font-bold text-[#8D6B26] hover:text-[#9F7A2D] mt-3 inline-block"
            >
              Ubah Pengaturan & Template &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
