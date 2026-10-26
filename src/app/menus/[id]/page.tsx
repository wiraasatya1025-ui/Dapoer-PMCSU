import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import {
  UtensilsCrossed,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Phone,
  Truck,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    return { title: "Menu Tidak Ditemukan - DAPOER PMCSU" };
  }

  const { data: menu } = await supabaseAdmin
    .from("menus")
    .select("name, description")
    .eq("id", numId)
    .maybeSingle();

  if (!menu) {
    return { title: "Menu Tidak Ditemukan - DAPOER PMCSU" };
  }

  return {
    title: `${menu.name} - Rincian Menu Catering | DAPOER PMCSU`,
    description: menu.description || "Rincian menu catering lengkap DAPOER PMCSU Jakarta & Jabodetabek",
  };
}

export default async function MenuDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    notFound();
  }

  const [menuRes, profileRes, settingsRes] = await Promise.all([
    supabaseAdmin
      .from("menus")
      .select("*, categories(name, slug)")
      .eq("id", numId)
      .maybeSingle(),
    supabaseAdmin.from("brand_profile").select("*").maybeSingle(),
    supabaseAdmin.from("settings").select("key, value"),
  ]);

  const menu = menuRes?.data;
  if (!menu) {
    notFound();
  }

  const profile = profileRes?.data || {
    name: "DAPOER PMCSU",
    address: "Jl. Raya Tj. Barat No.11A, Ps. Minggu, Jakarta Selatan",
    operating_hours: "Buka Setiap Hari: 08.00 - 20.00 WIB",
    phone: "081234567890",
  };

  const settingsMap = (settingsRes?.data || []).reduce(
    (acc: Record<string, string>, item: { key: string; value: string }) => {
      acc[item.key] = item.value;
      return acc;
    },
    {}
  );

  const waPhone = settingsMap["wa_phone"] || profile.phone || "6281234567890";
  const defaultTemplate =
    settingsMap["wa_template"] ||
    `Halo *{brand_name}*,\n\nSaya tertarik dan ingin memesan menu catering:\n🍱 *Nama Menu:* {menu_name}\n💵 *Harga:* {menu_price}\n✨ *Pilihan:* {menu_variant}\n\n*Format Data Acara:*\n• Nama Pemesan:\n• Tanggal & Waktu Acara:\n• Jumlah Porsi (Pax):\n• Alamat Pengantaran:\n\nMohon info ketersediaan dan detail selengkapnya. Terima kasih!`;

  let variants: Array<{ name: string; price: number }> = [];
  try {
    variants =
      typeof menu.variants === "string"
        ? JSON.parse(menu.variants)
        : menu.variants || [];
  } catch {
    variants = [];
  }

  // Pecah rincian menu / komposisi lauk
  let descriptionParts: string[] = [];
  if (menu.description) {
    let rawItems = menu.description;
    const colonIndex = rawItems.indexOf(":");
    if (colonIndex !== -1 && colonIndex < 40) {
      rawItems = rawItems.substring(colonIndex + 1);
    }
    descriptionParts = rawItems
      .split(/,|\./)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 2);
  }

  const initialWaMessage = defaultTemplate
    .replace(/{brand_name}/g, profile.name || "DAPOER PMCSU")
    .replace(/{nama_menu}/g, menu.name)
    .replace(/{menu_name}/g, menu.name)
    .replace(/{menu_price}/g, `Rp ${Number(menu.price).toLocaleString("id-ID")}`)
    .replace(/{harga}/g, `Rp ${Number(menu.price).toLocaleString("id-ID")}`)
    .replace(/{menu_variant}/g, variants.length > 0 ? variants[0].name : "Standard");

  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(initialWaMessage)}`;

  return (
    <div className="min-h-screen bg-[#E6F0CA] text-[#23382C] flex flex-col font-sans selection:bg-[#C9A24D] selection:text-white relative">
      {/* Continuous Seamless Full-Page Photographic Background (persis seperti website utama) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2500&q=85"
          alt="Continuous Catering Background"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[#E6F0CA]/80 backdrop-blur-[0.5px]" />
      </div>

      {/* Top Announcement Bar */}
      <div className="relative z-40 bg-[#DFECC0]/90 backdrop-blur-sm text-[#3D5245] py-2 overflow-hidden text-xs font-medium border-b border-[#D2E2AF]/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-[#3D5245]">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
              <span className="font-semibold text-[#23382C]">Jam Operasional:</span>
              <span>{profile.operating_hours || "Buka Setiap Hari: 08.00 - 20.00 WIB"}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
              <span className="text-[#8D6B26] font-semibold">Tersertifikasi Halal Resmi ID110025607930825</span>
            </span>
          </div>
          <Link
            href="/#menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6B26] hover:text-[#23382C] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </div>

      {/* Main Header (Sage Green Tone & Halal Badge) */}
      <header className="relative z-30 bg-[#E6F0CA]/90 backdrop-blur-md border-b border-[#D5E5B2] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Halal Badge */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <div
              className="h-11 px-3 py-1 bg-white rounded-xl border border-[#D5E5B2] shadow-xs flex items-center justify-center"
              title="Tersertifikasi Halal Indonesia ID110025607930825"
            >
              <img
                src="/logo-halal-clean.png"
                alt="Halal Indonesia"
                className="h-7 w-auto object-contain"
              />
            </div>
            <Link href="/" className="flex flex-col group">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#23382C] block leading-tight font-serif group-hover:text-[#9F7A2D] transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8D6B26] uppercase tracking-wider block">
                Catering &amp; Culinary Service
              </span>
            </Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/#menu"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 border border-[#CBDFA5] text-[#23382C] hover:bg-[#D8B669] hover:border-[#D8B669] hover:text-[#212E24] text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Semua Menu</span>
              <span className="sm:hidden">Katalog</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-slide-down">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#55695D] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#23382C] transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8D6B26]" />
          <Link href="/#menu" className="hover:text-[#23382C] transition-colors">
            Katalog Menu
          </Link>
          {menu.categories?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#8D6B26]" />
              <span className="text-[#3D5245] font-medium">
                {menu.categories.name}
              </span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[#8D6B26]" />
          <span className="text-[#8D6B26] font-bold truncate max-w-[220px]">
            {menu.name}
          </span>
        </nav>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: Foto & Status & Quick Guarantee */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#FCFBF6] rounded-3xl p-3 sm:p-4 border border-[#E1DEC9] shadow-sm">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F1EFE6]">
                {menu.image_url ? (
                  <img
                    src={menu.image_url}
                    alt={menu.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#8C9E91]">
                    <UtensilsCrossed className="w-12 h-12 mb-2" />
                    <span className="text-xs font-medium">Foto Menu Catering</span>
                  </div>
                )}

                {menu.categories?.name && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md text-[#23382C] text-xs font-bold rounded-lg uppercase shadow-xs border border-[#E1DEC9]">
                    {menu.categories.name}
                  </span>
                )}

                {menu.is_featured === 1 && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-[#D8B669] text-[#212E24] text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs border border-[#E5CA8A]">
                    <Star className="w-3.5 h-3.5 fill-[#212E24]" />
                    <span>Unggulan</span>
                  </span>
                )}

                {!menu.is_available && (
                  <div className="absolute inset-0 bg-[#23382C]/70 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-5 py-2 bg-rose-600 text-white text-xs font-black uppercase rounded-xl tracking-wider">
                      Habis / Sold Out
                    </span>
                  </div>
                )}

                {/* Floating Gold Price Badge */}
                <div className="absolute bottom-3 right-3 bg-[#DEBF7E] text-[#212E24] px-4 py-2 rounded-xl font-black text-sm shadow-md border border-[#EBCE8F]">
                  Rp {Number(menu.price).toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            {/* Quick Guarantee Box (Theme Consistent) */}
            <div className="bg-[#FCFBF6] p-5 rounded-3xl border border-[#CBDFA5] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-[#8D6B26]">
                <ShieldCheck className="w-5 h-5 text-[#8D6B26] shrink-0" />
                <span className="text-xs sm:text-sm uppercase tracking-wide">Jaminan Kualitas &amp; Higienitas</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4B6152]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8D6B26] shrink-0 mt-0.5" />
                  <span>100% Halal Resmi terdaftar di BPJPH Kemenag</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8D6B26] shrink-0 mt-0.5" />
                  <span>Bahan segar pilihan tanpa pengawet berbahaya</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8D6B26] shrink-0 mt-0.5" />
                  <span>Pengantaran armada higienis berpendingin / tepat waktu</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Menu, Varian, Komposisi, & Order WA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FCFBF6] p-6 sm:p-8 rounded-3xl border border-[#CBDFA5] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3 py-1 rounded-full">
                  {menu.categories?.name || "Menu Catering"}
                </span>
                {menu.is_featured === 1 && (
                  <span className="text-xs font-bold text-[#212E24] bg-[#D8B669] border border-[#E5CA8A] px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Rekomendasi
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#23382C] font-serif tracking-tight mt-2">
                {menu.name}
              </h1>

              <div className="mt-4 pt-4 border-t border-[#EFECE0] flex items-baseline gap-2">
                <span className="text-xs text-[#7A8E81] font-medium">Harga mulai dari:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#8D6B26]">
                  Rp {Number(menu.price).toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-[#7A8E81]">/ porsi / paket</span>
              </div>
            </div>

            {/* Rincian Komposisi Lengkap */}
            <div className="bg-[#FCFBF6] p-6 sm:p-8 rounded-3xl border border-[#CBDFA5] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#EFECE0] pb-3">
                <UtensilsCrossed className="w-5 h-5 text-[#8D6B26]" />
                <h3 className="text-sm sm:text-base font-bold text-[#23382C] font-serif">
                  Rincian &amp; Komposisi Menu
                </h3>
              </div>

              {descriptionParts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {descriptionParts.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-[#E1DEC9] text-xs text-[#3D5245] shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#8D6B26] shrink-0 mt-0.5" />
                      <span className="font-semibold leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#4B6152] leading-relaxed">
                  {menu.description || "Hubungi admin kami untuk informasi rincian lengkap menu ini."}
                </p>
              )}
            </div>

            {/* Varian / Paket Pilihan (jika ada) */}
            {variants.length > 0 && (
              <div className="bg-[#FCFBF6] p-6 sm:p-8 rounded-3xl border border-[#CBDFA5] shadow-xs space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-[#23382C] font-serif border-b border-[#EFECE0] pb-3">
                  Pilihan Varian / Tipe
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {variants.map((v, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-[#E1DEC9] bg-white flex items-center justify-between text-xs shadow-xs"
                    >
                      <span className="font-bold text-[#23382C]">{v.name}</span>
                      <span className="font-black text-[#8D6B26]">
                        Rp {Number(v.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aksi Pemesanan Direct WhatsApp */}
            <div className="bg-gradient-to-br from-[#23382C] to-[#17251D] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4 border border-[#3A5343]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <span className="text-[11px] font-bold text-[#DEBF7E] uppercase tracking-wider block mb-1">
                    Konsultasi &amp; Pemesanan Acara
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-serif">Tertarik dengan Menu Ini?</h4>
                  <p className="text-xs text-white/80 mt-1 max-w-md leading-relaxed">
                    Hubungi tim customer service DAPOER PMCSU via WhatsApp untuk cek ketersediaan tanggal, penyesuaian porsi, serta diskon paket acara.
                  </p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] font-black text-sm rounded-2xl shadow-lg shadow-[#D7B465]/30 active:scale-95 transition-all shrink-0 cursor-pointer border border-[#E5CA8A]"
                >
                  <MessageCircle className="w-5 h-5 fill-[#212E24]" />
                  <span>Pesan Sekarang via WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimal Serasi */}
      <footer className="relative z-10 bg-[#DFECC0]/80 backdrop-blur-xs text-[#3D5245] py-8 px-4 border-t border-[#D5E5B2]/60 text-center text-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-bold text-[#23382C]">{profile.name} - Catering &amp; Culinary Service</p>
          <p className="text-[#55695D]">{profile.address}</p>
          <p className="text-[11px] text-[#708474] pt-2 border-t border-[#CBDFA5]/60">&copy; {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
