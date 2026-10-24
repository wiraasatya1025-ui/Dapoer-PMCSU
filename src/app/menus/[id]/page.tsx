import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import {
  UtensilsCrossed,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: menu } = await supabaseAdmin
    .from("menus")
    .select("name, description")
    .eq("id", id)
    .single();

  if (!menu) {
    return { title: "Menu Tidak Ditemukan - DAPOER PMCSU" };
  }

  return {
    title: `${menu.name} - Rincian Menu Catering | DAPOER PMCSU`,
    description: menu.description || "Rincian menu catering lengkap DAPOER PMCSU",
  };
}

export default async function MenuDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [menuRes, profileRes, settingsRes] = await Promise.all([
    supabaseAdmin
      .from("menus")
      .select("*, categories(name, slug)")
      .eq("id", id)
      .single(),
    supabaseAdmin.from("brand_profile").select("*").limit(1).single(),
    supabaseAdmin.from("settings").select("key, value"),
  ]);

  const menu = menuRes.data;
  if (!menu) {
    notFound();
  }

  const profile = profileRes.data || {
    name: "DAPOER PMCSU",
    address: "",
    operating_hours: "08.00 - 20.00 WIB",
  };

  const settingsMap = (settingsRes.data || []).reduce(
    (acc: Record<string, string>, item: { key: string; value: string }) => {
      acc[item.key] = item.value;
      return acc;
    },
    {}
  );

  const waPhone = settingsMap["wa_phone"] || "6281234567890";
  const defaultTemplate =
    "Halo {brand_name}, saya tertarik dengan menu *{menu_name}* (Varian: {menu_variant}, Harga: Rp {menu_price}). Bisakah berikan informasi detail untuk pemesanan?";
  const waTemplate = settingsMap["wa_template"] || defaultTemplate;

  let variants: Array<{ name: string; price: number }> = [];
  try {
    variants =
      typeof menu.variants === "string"
        ? JSON.parse(menu.variants)
        : menu.variants || [];
  } catch {
    variants = [];
  }

  // Pecah rincian menu / komposisi jika ada pemisah koma atau titik dua
  let descriptionParts: string[] = [];
  if (menu.description) {
    // Ambil setelah tanda titik dua pertama jika ada pola "Paket Buffet lengkap: ..."
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

  const initialWaMessage = waTemplate
    .replace(/{brand_name}/g, profile.name || "DAPOER PMCSU")
    .replace(/{menu_name}/g, menu.name)
    .replace(/{menu_price}/g, Number(menu.price).toLocaleString("id-ID"))
    .replace(/{menu_variant}/g, variants.length > 0 ? variants[0].name : "Standard");

  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(initialWaMessage)}`;

  return (
    <div className="min-h-screen bg-[#fafaf6] text-stone-800 flex flex-col font-sans">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e9e6dd] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/#menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#7CB342] transition-colors bg-[#f4f3ec] hover:bg-[#edf6de] px-3.5 py-2 rounded-xl border border-[#e2decb]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Menu</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-stone-900 text-sm">
              {profile.name}
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-700 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#menu" className="hover:text-stone-700 transition-colors">
            Katalog Menu
          </Link>
          {menu.categories?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-stone-600 font-medium">
                {menu.categories.name}
              </span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#558B2F] font-bold truncate max-w-[200px]">
            {menu.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Kolom Kiri: Foto & Status (5 col) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-3 border border-[#e6e3da] shadow-sm">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
                {menu.image_url ? (
                  <img
                    src={menu.image_url}
                    alt={menu.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                    <UtensilsCrossed className="w-12 h-12 mb-2" />
                    <span className="text-xs">Foto Menu</span>
                  </div>
                )}

                {menu.categories?.name && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg uppercase">
                    {menu.categories.name}
                  </span>
                )}

                {!menu.is_available && (
                  <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-5 py-2 bg-rose-600 text-white text-xs font-black uppercase rounded-xl tracking-wider">
                      Habis / Sold Out
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-[#edf6de] p-5 rounded-2xl border border-[#7CB342]/30 space-y-3 text-xs text-[#2d3a22]">
              <div className="flex items-center gap-2.5 font-bold text-[#4c731e]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Standar Kualitas & Kebersihan</span>
              </div>
              <ul className="space-y-1.5 text-stone-600 text-[11px] list-disc list-inside">
                <li>Bahan baku segar & halal 100%</li>
                <li>Dapur bersih dengan standar higienitas terjamin</li>
                <li>Pengantaran tepat waktu untuk seluruh wilayah</li>
              </ul>
            </div>
          </div>

          {/* Kolom Kanan: Detail Menu, Komposisi, Varian & Tombol Pesan (7 col) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4c731e] bg-[#edf6de] px-2.5 py-1 rounded-md">
                  {menu.categories?.name || "Menu Catering"}
                </span>
                {menu.is_featured === 1 && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D23] bg-[#fbf5e6] px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Menu Rekomendasi
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {menu.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xs text-stone-400 font-medium">Harga mulai:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#558B2F]">
                  Rp {Number(menu.price).toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-stone-400">/ porsi / paket</span>
              </div>
            </div>

            {/* Rincian Komposisi Lengkap */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6e3da] shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#7CB342]" />
                <span>Rincian & Komposisi Menu Lengkap</span>
              </h3>

              {descriptionParts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {descriptionParts.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#fafaf6] border border-[#f0eee6] text-xs text-stone-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#7CB342] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-600 leading-relaxed">
                  {menu.description || "Hubungi admin kami untuk detail paket dan menu ini."}
                </p>
              )}
            </div>

            {/* Varian / Opsi Pilihan */}
            {variants.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#e6e3da] shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Pilihan Varian / Paket
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {variants.map((v, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl border border-[#e6e3da] bg-[#fafaf6] flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-stone-800">{v.name}</span>
                      <span className="font-extrabold text-[#558B2F]">
                        Rp {Number(v.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aksi Pemesanan */}
            <div className="bg-gradient-to-br from-[#273220] to-[#1f2619] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">Tertarik dengan Menu Ini?</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Hubungi tim kami via WhatsApp untuk konsultasi porsi, tanggal acara, & penawaran terbaik.
                  </p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#7CB342] hover:bg-[#689F38] text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-[#7CB342]/30 active:scale-95 transition-all shrink-0"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Pesan Sekarang via WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="bg-[#141a10] text-[#a19d8e] py-6 px-4 border-t border-[#232c1b] text-center text-xs">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
