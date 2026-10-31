"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
  Star,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Menu as MenuIcon,
  X,
  FileDown,
  CheckCircle2,
  Building2,
  Truck,
  Users,
} from "lucide-react";

interface Variant {
  name: string;
  price: number;
}

interface Menu {
  id: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  variants: string;
  is_available: number;
  is_featured: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  features: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Gallery {
  id: number;
  title: string;
  image_url: string;
  event_type: string;
  event_date: string;
}

interface Testimonial {
  id: number;
  client_name: string;
  role_or_event: string;
  rating: number;
  comment: string;
}

interface Profile {
  name: string;
  tagline: string;
  description: string;
  vision: string;
  mission: string;
  logo_url?: string;
  address: string;
  maps_url: string;
  phone: string;
  email: string;
  instagram: string;
  operating_hours: string;
}

interface PublicPageProps {
  profile: Profile;
  categories: Category[];
  menus: Menu[];
  services: Service[];
  galleries: Gallery[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
}

export default function PublicLandingPage({
  profile,
  categories,
  menus,
  services,
  galleries,
  testimonials,
  settings,
}: PublicPageProps) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeNavPopup, setActiveNavPopup] = useState<string | null>(null);

  const waPhone = settings.wa_phone || "6281234567890";
  const rawTemplate =
    settings.wa_template ||
    `Halo *{brand_name}*,\n\nSaya tertarik dan ingin memesan menu catering:\n🍱 *Nama Menu:* {menu_name}\n💵 *Harga:* {menu_price}\n✨ *Pilihan:* {menu_variant}\n\n*Format Data Acara:*\n• Nama Pemesan:\n• Tanggal & Waktu Acara:\n• Jumlah Porsi (Pax):\n• Alamat Pengantaran:\n\nMohon info ketersediaan dan detail selengkapnya. Terima kasih!`;

  const filteredMenus = menus.filter((m) => {
    if (selectedCat === "all") return true;
    return String(m.category_id) === selectedCat;
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Reset carousel ke awal saat kategori berubah
  const handleSetCat = (cat: string) => {
    setSelectedCat(cat);
    setCarouselIndex(0);
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleOpenDetail = (menu: Menu) => {
    setSelectedMenu(menu);
    let vList: Variant[] = [];
    try {
      vList = JSON.parse(menu.variants || "[]");
    } catch {
      vList = [];
    }
    if (vList.length > 0) {
      setSelectedVariant(vList[0]);
    } else {
      setSelectedVariant(null);
    }
  };

  const buildWhatsAppUrl = (menu: Menu, variant: Variant | null) => {
    const finalPrice = variant ? variant.price : menu.price;
    const variantName = variant ? variant.name : "Standar";

    let message = rawTemplate
      .replace(/{brand_name}/g, profile.name || "DAPOER PMCSU")
      .replace(/{nama_menu}/g, menu.name)
      .replace(/{menu_name}/g, menu.name)
      .replace(/{menu_price}/g, `Rp ${finalPrice.toLocaleString("id-ID")}`)
      .replace(/{harga}/g, `Rp ${finalPrice.toLocaleString("id-ID")}`)
      .replace(/{menu_variant}/g, variantName)
      .replace(/{varian}/g, variantName);

    return `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
  };

  const generalWaUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Halo *${profile.name || "DAPOER PMCSU"}*,\n\nSaya ingin konsultasi pemesanan catering untuk acara:\n\n• Jenis Acara (Pernikahan / Kantor / Syukuran / Lainnya):\n• Rencana Tanggal Acara:\n• Perkiraan Jumlah Porsi:\n• Lokasi Acara:\n\nMohon rekomendasi paket menu dan penawaran terbaiknya. Terima kasih!`
  )}`;

  return (
    <div className="min-h-screen bg-[#E6F0CA] text-[#23382C] flex flex-col font-sans selection:bg-[#C9A24D] selection:text-white relative">
      {/* Continuous Seamless Full-Page Photographic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2500&q=85"
          alt="Continuous Catering Background"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
        />
        {/* Continuous Soft Sage Overlay */}
        <div className="absolute inset-0 bg-[#E6F0CA]/80 backdrop-blur-[0.5px]" />
      </div>

      {/* Top Announcement Bar with Running Marquee Text */}
      <div className="relative z-40 bg-[#DFECC0]/90 backdrop-blur-sm text-[#3D5245] py-2 overflow-hidden text-xs font-medium border-b border-[#D2E2AF]/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Running Marquee Container */}
          <div className="flex-1 overflow-hidden relative select-none">
            {/* Soft gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#DFECC0] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#DFECC0] to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee items-center gap-8 text-[#3D5245]">
              <span className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="font-semibold text-[#23382C]">Jam Operasional:</span>
                <span>{profile.operating_hours || "Buka Setiap Hari: 08.00 - 20.00 WIB"}</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="font-semibold text-[#23382C]">Dapur & Lokasi:</span>
                <span>{profile.address}</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="text-[#8D6B26] font-semibold">Melayani Pemesanan Nasi Kotak, Prasmanan, Tumpeng & Acara Spesial</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>

              {/* Duplicate loop for seamless infinite marquee effect */}
              <span className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="font-semibold text-[#23382C]">Jam Operasional:</span>
                <span>{profile.operating_hours || "Buka Setiap Hari: 08.00 - 20.00 WIB"}</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="font-semibold text-[#23382C]">Dapur & Lokasi:</span>
                <span>{profile.address}</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24D] shrink-0" />
                <span className="text-[#8D6B26] font-semibold">Melayani Pemesanan Nasi Kotak, Prasmanan, Tumpeng & Acara Spesial</span>
              </span>
              <span className="text-[#A5BA8C] font-bold">&bull;</span>
            </div>
          </div>

          {/* Right Static Action Links */}
          <div className="flex items-center gap-4 shrink-0 pl-2 bg-[#DFECC0] z-20">
          </div>
        </div>
      </div>

      {/* Main Header with Soft Sage Green Background */}
      <header className="z-40 bg-[#E6F0CA]/90 backdrop-blur-md border-b border-[#D5E5B2] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Pojok Kiri: Halal Indonesia Badge & Logo Brand */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Halal Indonesia Certified Badge (Di Pojok Paling Kiri) */}
            <div
              className="h-11 px-3 py-1 bg-white rounded-xl border border-[#D5E5B2] shadow-xs flex items-center justify-center hover:shadow-sm transition-all"
              title="Tersertifikasi Halal Indonesia ID110025607930825"
            >
              <img
                src="/logo-halal-clean.png"
                alt="Halal Indonesia ID110025607930825"
                className="h-7 w-auto object-contain"
              />
            </div>

            {/* Brand Name */}
            <a href="#" className="flex flex-col group">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#23382C] block leading-tight font-serif drop-shadow-xs group-hover:text-[#9F7A2D] transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#8D6B26] uppercase tracking-wider block">
                Catering &amp; Culinary Service
              </span>
            </a>
          </div>

          {/* Tengah: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold text-[#2E4235]">
            <a
              href="#tentang"
              onClick={(e) => handleSmoothScroll(e, "tentang")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Tentang Kami
            </a>
            <a
              href="#layanan"
              onClick={(e) => handleSmoothScroll(e, "layanan")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Layanan
            </a>
            <a
              href="#menu"
              onClick={(e) => handleSmoothScroll(e, "menu")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Katalog Menu
            </a>
            <a
              href="#galeri"
              onClick={(e) => handleSmoothScroll(e, "galeri")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Galeri Acara
            </a>
            <a
              href="#cara-pesan"
              onClick={(e) => handleSmoothScroll(e, "cara-pesan")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Panduan Pesan
            </a>
            <a
              href="#testimoni"
              onClick={(e) => handleSmoothScroll(e, "testimoni")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Ulasan
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="hover:text-[#9F7A2D] hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              FAQ & Area
            </a>
          </nav>

          {/* Pojok Kanan: Contact WA Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={generalWaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] active:scale-95 text-[#212E24] text-sm font-extrabold rounded-full shadow-md shadow-[#C9A24D]/30 transition-all border border-[#DFBF73] whitespace-nowrap"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#25D366"
                  d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
                />
                <path
                  fill="#FFFFFF"
                  d="M17.53 14.45C17.23 14.3 15.75 13.57 15.48 13.47C15.2 13.37 15 13.32 14.8 13.62C14.6 13.92 14.03 14.6 13.85 14.8C13.68 15.01 13.5 15.03 13.2 14.88C12.9 14.73 11.95 14.42 10.82 13.41C9.94 12.63 9.35 11.66 9.17 11.36C9 11.06 9.15 10.9 9.3 10.75C9.44 10.62 9.6 10.4 9.75 10.23C9.9 10.05 9.95 9.92 10.05 9.72C10.15 9.52 10.1 9.35 10.03 9.2C9.95 9.05 9.35 7.57 9.1 6.98C8.86 6.4 8.61 6.48 8.43 6.47C8.26 6.46 8.06 6.46 7.86 6.46C7.66 6.46 7.33 6.53 7.06 6.83C6.78 7.13 6 7.86 6 9.35C6 10.83 7.08 12.27 7.23 12.47C7.38 12.67 9.35 15.71 12.37 17.01C13.09 17.32 13.65 17.51 14.09 17.65C14.81 17.88 15.47 17.85 15.99 17.77C16.57 17.68 17.77 17.04 18.02 16.34C18.27 15.63 18.27 15.03 18.2 14.9C18.12 14.78 17.93 14.7 17.63 14.55L17.53 14.45Z"
                />
              </svg>
              <span>Hubungi WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#23382C] hover:text-[#9F7A2D] hover:bg-[#D5E5B2]/50 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#E6F0CA] border-b border-[#D5E5B2] px-6 py-4 space-y-3 shadow-lg">
            {/* Halal Badge Mobile */}
            <div className="flex items-center gap-2 pb-2 border-b border-[#D5E5B2]">
              <img
                src="/logo-halal-badge.png"
                alt="Halal Indonesia - ID110025607930825"
                className="h-6 w-auto object-contain bg-white rounded-lg p-1 border border-[#CBDFA5]"
              />
              <span className="text-[11px] font-bold text-[#23382C]">
                Sertifikat Halal: ID110025607930825
              </span>
            </div>

            <a
              href="#tentang"
              onClick={(e) => handleSmoothScroll(e, "tentang")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Tentang Kami
            </a>
            <a
              href="#layanan"
              onClick={(e) => handleSmoothScroll(e, "layanan")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Layanan
            </a>
            <a
              href="#menu"
              onClick={(e) => handleSmoothScroll(e, "menu")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Katalog Menu
            </a>
            <a
              href="#galeri"
              onClick={(e) => handleSmoothScroll(e, "galeri")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Galeri Acara
            </a>
            <a
              href="#cara-pesan"
              onClick={(e) => handleSmoothScroll(e, "cara-pesan")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Panduan Pesan
            </a>
            <a
              href="#testimoni"
              onClick={(e) => handleSmoothScroll(e, "testimoni")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              Ulasan & Klien
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="block font-bold text-[#23382C] hover:text-[#9F7A2D] cursor-pointer"
            >
              FAQ & Pengiriman
            </a>
            <div className="pt-2">
              <a
                href={generalWaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#D7B465] to-[#BFA052] text-[#212E24] rounded-full font-bold text-sm shadow-md border border-[#DFBF73]"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#25D366"
                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M17.53 14.45C17.23 14.3 15.75 13.57 15.48 13.47C15.2 13.37 15 13.32 14.8 13.62C14.6 13.92 14.03 14.6 13.85 14.8C13.68 15.01 13.5 15.03 13.2 14.88C12.9 14.73 11.95 14.42 10.82 13.41C9.94 12.63 9.35 11.66 9.17 11.36C9 11.06 9.15 10.9 9.3 10.75C9.44 10.62 9.6 10.4 9.75 10.23C9.9 10.05 9.95 9.92 10.05 9.72C10.15 9.52 10.1 9.35 10.03 9.2C9.95 9.05 9.35 7.57 9.1 6.98C8.86 6.4 8.61 6.48 8.43 6.47C8.26 6.46 8.06 6.46 7.86 6.46C7.66 6.46 7.33 6.53 7.06 6.83C6.78 7.13 6 7.86 6 9.35C6 10.83 7.08 12.27 7.23 12.47C7.38 12.67 9.35 15.71 12.37 17.01C13.09 17.32 13.65 17.51 14.09 17.65C14.81 17.88 15.47 17.85 15.99 17.77C16.57 17.68 17.77 17.04 18.02 16.34C18.27 15.63 18.27 15.03 18.2 14.9C18.12 14.78 17.93 14.7 17.63 14.55L17.53 14.45Z"
                  />
                </svg>
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-[#23382C] min-h-0 sm:min-h-[580px] lg:min-h-[640px] flex items-center py-8 sm:py-16 lg:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, Checklists & Action */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
              {/* Top Tagline */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#DFECC0] border border-[#CBDFA5] text-[#8D6B26] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
                <span>
                  {profile.name} &bull; {settings.hero_tagline || "Catering Pilihan Jakarta"}
                </span>
              </div>

              {/* Bold Title */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px] font-normal text-[#9F7A2D] tracking-tight leading-[1.12] sm:leading-[1.08] font-serif">
                  {settings.hero_title_1 || "When Tradition"} <br className="hidden sm:inline" />
                  <span className="text-[#9F7A2D] italic font-normal inline-block">
                    {settings.hero_title_2 || "Deliciously Tastes"}
                  </span>
                </h1>
                <p className="text-sm sm:text-2xl font-bold text-[#4B6152] pt-0.5 sm:pt-1">
                  {settings.hero_subtitle || "Solusi Praktis & Istimewa untuk Setiap Acara Anda"}
                </p>
              </div>

              {/* Key Features Checklist */}
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C9A24D] flex items-center justify-center text-white shrink-0 font-bold text-[10px] sm:text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-base font-bold text-[#2A3F33]">
                    {settings.hero_feature_1 || "100% Halal & Bahan Baku Segar Berkualitas"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C9A24D] flex items-center justify-center text-white shrink-0 font-bold text-[10px] sm:text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-base font-bold text-[#2A3F33]">
                    {settings.hero_feature_2 || "Mulai dari Rp 45.000,- / Porsi (Harga Bersahabat)"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C9A24D] flex items-center justify-center text-white shrink-0 font-bold text-[10px] sm:text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-base font-bold text-[#2A3F33]">
                    {settings.hero_feature_3 || "Lebih dari 50+ Variasi Menu Masakan Nusantara & Internasional"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C9A24D] flex items-center justify-center text-white shrink-0 font-bold text-[10px] sm:text-xs shadow-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-base font-bold text-[#2A3F33]">
                    {settings.hero_feature_4 || "Pengiriman Tepat Waktu untuk Seluruh Jabodetabek"}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#menu"
                  onClick={(e) => handleSmoothScroll(e, "menu")}
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] active:scale-95 text-[#212E24] font-extrabold text-sm sm:text-base rounded-full shadow-lg shadow-[#C9A24D]/35 hover:shadow-xl transition-all border border-[#DFBF73] cursor-pointer"
                >
                  <span>Pilih Menu Sekarang</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href={generalWaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 bg-transparent hover:bg-[#DFECC0] text-[#23382C] font-extrabold text-sm sm:text-base rounded-full border-2 border-[#23382C]/30 hover:border-[#23382C] transition-all"
                >
                  <span>Konsultasi WA</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FCFBF6]/90 border border-[#CBDFA5] text-[#2E4235] text-[11px] sm:text-xs font-bold shadow-xs">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#EBF4D6] border border-[#CBDFA5] flex items-center justify-center text-[#4B6152] font-black text-[9px] sm:text-[10px]">
                    حلال
                  </span>
                  <span>{settings.trust_badge_1 || "100% Halal Terjamin"}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FCFBF6]/90 border border-[#CBDFA5] text-[#2E4235] text-[11px] sm:text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A24D]" />
                  <span>{settings.trust_badge_2 || "Standar Higienis & Dapur Steril"}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FCFBF6]/90 border border-[#CBDFA5] text-[#2E4235] text-[11px] sm:text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8D6B26]" />
                  <span>{settings.trust_badge_3 || "Bahan Pangan Segar Pilihan"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Logo PMC SU */}
            <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center pt-4 sm:pt-6 lg:pt-0">
              <div className="w-44 h-44 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-3xl bg-white p-4 sm:p-8 flex items-center justify-center shadow-lg shadow-[#23382C]/10 border-2 border-[#D5E5B2] hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={profile.logo_url || "/logo-dapoer-pmcsu.png"}
                  alt={profile.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Layanan Catering */}
      <section id="layanan" className="relative py-12 sm:py-24 text-[#23382C] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
              Layanan Kami
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 tracking-tight font-serif">
              Solusi Kuliner untuk Segala Kebutuhan Acara
            </h2>
            <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Mulai dari makan siang kantor hingga pesta syukuran keluarga, kami siap melayani dengan standar terbaik.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {services.map((service, idx) => {
              let features: string[] = [];
              try {
                features = JSON.parse(service.features || "[]");
              } catch {
                features = [];
              }

              return (
                <div
                  key={service.id}
                  className="bg-[#FCFBF6] rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-[#E1DEC9] hover:border-[#C9A24D] shadow-xs hover:shadow-xl hover:shadow-[#C9A24D]/15 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#DFECC0] to-[#CFE2A8] border border-[#CBDFA5] text-[#8D6B26] flex items-center justify-center font-black text-xs sm:text-lg mb-2 sm:mb-4 group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-[#23382C] mb-1 sm:mb-2 group-hover:text-[#9F7A2D] transition-colors font-serif">
                      {service.name}
                    </h3>
                    <p className="text-[#55695D] text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-4">
                      {service.description}
                    </p>

                    {features.length > 0 && (
                      <ul className="space-y-1 mb-2 sm:mb-5">
                        {features.slice(0, 2).map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[9px] sm:text-xs text-[#3A4E42] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] shrink-0"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <a
                    href={generalWaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#9F7A2D] hover:text-[#7A5B1A] transition-colors pt-2 border-t border-[#EFECE0]"
                  >
                    <span>Konsultasi</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Katalog Menu & WhatsApp Order Trigger */}
      <section 
        id="menu" 
        className="relative py-12 sm:py-24 text-[#23382C] overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
              Katalog Pilihan
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 tracking-tight font-serif">
              Daftar <span className="italic font-normal text-[#9F7A2D]">Menu Lengkap</span>
            </h2>
            <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Pilih menu yang Anda minati untuk melihat rincian paket dan langsung memesan via WhatsApp.
            </p>

            {/* Secondary Button: Unduh Menu PDF (E-Brochure) */}
            <div className="mt-3 sm:mt-5 flex justify-center">
              <a
                href={
                  settings.pdf_catalog_url && settings.pdf_catalog_url.trim().length > 0
                    ? settings.pdf_catalog_url.startsWith("http")
                      ? settings.pdf_catalog_url
                      : `https://${settings.pdf_catalog_url}`
                    : "/katalog-menu-pmcsu.pdf"
                }
                download="Katalog-Menu-Dapoer-PMCSU.pdf"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FCFBF6] hover:bg-white text-[#2E4235] hover:text-[#9F7A2D] text-[11px] sm:text-xs font-bold border border-[#CBDFA5] hover:border-[#9F7A2D] shadow-xs hover:shadow-md transition-all active:scale-95 group"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DFECC0] group-hover:bg-[#D8B669] flex items-center justify-center transition-colors">
                  <FileDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#212E24]" />
                </div>
                <span>Unduh Katalog Menu (PDF / E-Brochure)</span>
              </a>
            </div>
          </div>

          {/* Category Filter - Horizontal Scroll Slider with Navigation Arrows */}
          <div className="relative mb-6 sm:mb-12 max-w-5xl mx-auto px-6 sm:px-10">
            {/* Left Scroll Button */}
            <button
              onClick={() => {
                const el = document.getElementById("cat-slider");
                if (el) el.scrollBy({ left: -220, behavior: "smooth" });
              }}
              aria-label="Geser Kategori Kiri"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#CBDFA5] text-[#23382C] shadow-md hover:bg-[#D8B669] hover:border-[#D8B669] transition-all flex items-center justify-center z-10 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
            </button>

            {/* Slider Container */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth select-none cursor-grab active:cursor-grabbing"
              id="cat-slider"
            >
              <button
                onClick={() => handleSetCat("all")}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCat === "all"
                    ? "bg-[#D8B669] text-[#212E24] shadow-md shadow-[#D8B669]/30 scale-105 border border-[#E5CA8A]"
                    : "bg-[#F7F9EC] text-[#415549] hover:bg-white border border-[#D5E5B2]"
                }`}
              >
                Semua
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSetCat(String(c.id))}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCat === String(c.id)
                      ? "bg-[#D8B669] text-[#212E24] shadow-md shadow-[#D8B669]/30 scale-105 border border-[#E5CA8A]"
                      : "bg-[#F7F9EC] text-[#415549] hover:bg-white border border-[#D5E5B2]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => {
                const el = document.getElementById("cat-slider");
                if (el) el.scrollBy({ left: 220, behavior: "smooth" });
              }}
              aria-label="Geser Kategori Kanan"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#CBDFA5] text-[#23382C] shadow-md hover:bg-[#D8B669] hover:border-[#D8B669] transition-all flex items-center justify-center z-10 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Menu Carousel - Responsive Slider (Touch-swipe & Smooth Arrows) */}
          {filteredMenus.length === 0 ? (
            <div className="text-center py-20 text-[#6B8072]">
              <UtensilsCrossed className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Belum ada menu untuk kategori ini.</p>
            </div>
          ) : (
            <div className="relative group">
              {(() => {
                const scrollMenu = (direction: "left" | "right") => {
                  const container = menuScrollRef.current;
                  if (!container) return;
                  const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
                  container.scrollBy({
                    left: direction === "left" ? -cardWidth : cardWidth,
                    behavior: "smooth",
                  });
                };

                const scrollMenuToIndex = (index: number) => {
                  const container = menuScrollRef.current;
                  if (!container) return;
                  const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
                  container.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth",
                  });
                  setCarouselIndex(index);
                };

                const handleMenuScroll = () => {
                  const container = menuScrollRef.current;
                  if (!container) return;
                  const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
                  const newIndex = Math.round(container.scrollLeft / cardWidth);
                  setCarouselIndex(Math.min(newIndex, filteredMenus.length - 1));
                };

                return (
                  <>
                    {/* Horizontal Scrollable Menu Row */}
                    <div
                      ref={menuScrollRef}
                      onScroll={handleMenuScroll}
                      className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-4 sm:px-8 md:px-12 scrollbar-hide -mx-4 sm:mx-0"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {filteredMenus.map((menu, idx) => {
                        let variants: Variant[] = [];
                        try { variants = JSON.parse(menu.variants || "[]"); } catch { variants = []; }

                        return (
                          <div
                            key={menu.id}
                            className="flex-shrink-0 snap-center w-[250px] sm:w-[280px] lg:w-[calc(33.333%-16px)] bg-[#FCFBF6] rounded-2xl sm:rounded-3xl border border-[#E1DEC9] overflow-hidden flex flex-col cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C9A24D]/15 hover:border-[#C9A24D]"
                          >
                            {/* Image */}
                            <Link href={`/menus/${menu.id}`} className="h-36 sm:h-48 bg-[#F1EFE6] relative overflow-hidden block">
                              {menu.image_url ? (
                                <img src={menu.image_url} alt={menu.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1EFE6] text-[#8C9E91]">
                                  <UtensilsCrossed className="w-7 h-7 sm:w-8 sm:h-8 mb-1" />
                                  <span className="text-[10px] sm:text-xs font-medium">Foto Menu Catering</span>
                                </div>
                              )}
                              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
                                {menu.category_name && (
                                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/90 backdrop-blur-md text-[#23382C] text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg uppercase shadow-xs border border-[#E1DEC9]">
                                    {menu.category_name}
                                  </span>
                                )}
                                {menu.is_featured === 1 && (
                                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#D8B669] text-[#212E24] text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg flex items-center gap-1 shadow-xs border border-[#E5CA8A]">
                                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#212E24]" /><span>Unggulan</span>
                                  </span>
                                )}
                              </div>
                              {!menu.is_available && (
                                <div className="absolute inset-0 bg-[#23382C]/70 backdrop-blur-[2px] flex items-center justify-center">
                                  <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-rose-600 text-white text-[10px] sm:text-xs font-extrabold uppercase rounded-lg sm:rounded-xl tracking-wider">Habis</span>
                                </div>
                              )}

                              {/* Floating Gold Price Badge on Card */}
                              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#DEBF7E] text-[#212E24] px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs shadow-md border border-[#EBCE8F]">
                                Rp {menu.price.toLocaleString("id-ID")}
                              </div>
                            </Link>

                            {/* Body */}
                            <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <Link href={`/menus/${menu.id}`} className="text-sm sm:text-base font-bold text-[#23382C] line-clamp-1 hover:text-[#9F7A2D] transition-colors block mb-0.5 sm:mb-1 font-serif">
                                  {menu.name}
                                </Link>
                                <Link href={`/menus/${menu.id}`} className="block mb-2 sm:mb-3">
                                  <p className="text-[11px] sm:text-xs text-[#55695D] line-clamp-2 leading-relaxed">{menu.description || "Hubungi admin untuk kustomisasi lauk dan menu."}</p>
                                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#9F7A2D] mt-1 hover:underline">Lihat Menu Lengkap &rarr;</span>
                                </Link>
                                {variants.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mb-2.5 sm:mb-3">
                                    {variants.slice(0, 3).map((v, i) => (
                                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F4F2E7] text-[#4F6255] font-medium border border-[#E1DEC9]">{v.name}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="pt-2.5 sm:pt-3 border-t border-[#EFECE0] flex items-center justify-between gap-2">
                                <div>
                                  <span className="text-[9px] sm:text-[10px] text-[#7A8E81] block font-medium">Mulai</span>
                                  <span className="text-xs sm:text-sm font-extrabold text-[#8D6B26]">Rp {menu.price.toLocaleString("id-ID")}</span>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleOpenDetail(menu); }}
                                  disabled={!menu.is_available}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] disabled:bg-stone-300 active:scale-95 text-[#212E24] text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl shadow-xs border border-[#DFBF73] transition-all"
                                >
                                  <MessageCircle className="w-3 h-3 text-[#212E24]" />
                                  <span>Pesan</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Arrow Buttons (Desktop & Tablet) */}
                    <button
                      onClick={() => scrollMenu("left")}
                      aria-label="Geser Menu Kiri"
                      className="flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#D5E5B2] text-[#23382C] rounded-full shadow-md items-center justify-center hover:bg-[#D8B669] hover:border-[#D8B669] transition-all z-10 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => scrollMenu("right")}
                      aria-label="Geser Menu Kanan"
                      className="flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#D5E5B2] text-[#23382C] rounded-full shadow-md items-center justify-center hover:bg-[#D8B669] hover:border-[#D8B669] transition-all z-10 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dot Indicators */}
                    {filteredMenus.length > 1 && (
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6">
                        {filteredMenus.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => scrollMenuToIndex(idx)}
                            aria-label={`Ke menu ${idx + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                              idx === carouselIndex
                                ? "w-6 h-2.5 bg-[#D8B669]"
                                : "w-2.5 h-2.5 bg-[#CBDFA5] hover:bg-[#B6CD8E]"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Section: Galeri Acara (Event Highlights) - Portofolio Suasana Acara */}
      <section id="galeri" className="relative py-12 sm:py-24 text-[#23382C] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
              Galeri Acara &bull; Event Highlights
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 font-serif">
              Portofolio Suasana Acara
            </h2>
            <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Dokumentasi nyata tata letak meja buffet berkelas, dekorasi pondokan (food stall) tematik, dan kerapian seragam staf pramusaji profesional di lokasi nyata.
            </p>
          </div>

          {/* Sub-filter Kategori Suasana Acara (Horizontal swipe on mobile, wrap on desktop) */}
          <div className="flex items-center sm:justify-center gap-2 mb-6 sm:mb-10 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "all", label: "Semua Dokumentasi" },
              { id: "buffet", label: "Tata Letak Meja Buffet" },
              { id: "pondokan", label: "Dekorasi Pondokan (Stalls)" },
              { id: "staff", label: "Kerapian Staf & Pramusaji" },
              { id: "event", label: "Pernikahan & Acara Kantor" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGalleryTab(tab.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeGalleryTab === tab.id
                    ? "bg-[#D8B669] text-[#212E24] shadow-md shadow-[#D8B669]/30 scale-105 border border-[#E5CA8A]"
                    : "bg-[#FCFBF6] text-[#415549] hover:bg-white border border-[#CBDFA5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Galeri Acara (2 Kolom Kompak di HP seperti katalog rapi, 4 di Desktop) */}
          {(() => {
            // Curated real event gallery showcase items
            const defaultEventShowcase = [
              {
                id: 101,
                title: "Setup Meja Buffet Prasmanan Elegan",
                category: "buffet",
                category_label: "Tata Letak Meja Buffet",
                image_url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
                note: "Roll-top chafing dish hangat, centerpiece bunga & pencahayaan hangat",
              },
              {
                id: 102,
                title: "Pondokan Live Cooking Dimsum & Kambing Guling",
                category: "pondokan",
                category_label: "Dekorasi Pondokan (Stall)",
                image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
                note: "Dekorasi booth tradisional modern dengan chef live cooking",
              },
              {
                id: 103,
                title: "Staf Pramusaji & Barista Berseragam Rapi",
                category: "staff",
                category_label: "Kerapian Staf Pramusaji",
                image_url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80",
                note: "Staf profesional berseragam rapi, memakai sarung tangan higienis & masker",
              },
              {
                id: 104,
                title: "Dessert Table & Mini Bar Corner",
                category: "buffet",
                category_label: "Tata Letak Meja Buffet",
                image_url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80",
                note: "Susunan pudding, pastry, dan infused water tertata cantik & rapi",
              },
              {
                id: 105,
                title: "Resepsi Pernikahan Ballroom Kuningan",
                category: "event",
                category_label: "Pernikahan & Acara Kantor",
                image_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
                note: "Pelayanan 1.200 porsi tamu undangan berjalan lancar dan teratur",
              },
              {
                id: 106,
                title: "Pondokan Es Doger & Sate Ayam Madura",
                category: "pondokan",
                category_label: "Dekorasi Pondokan (Stall)",
                image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
                note: "Desain stall ramah antrean dengan perlengkapan etnik berkualitas",
              },
              {
                id: 107,
                title: "Pelayanan Kru Catering Siap Siaga",
                category: "staff",
                category_label: "Kerapian Staf Pramusaji",
                image_url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&auto=format&fit=crop&q=80",
                note: "Pengisian ulang hidangan (refill) cepat sebelum chafing dish kosong",
              },
              {
                id: 108,
                title: "Corporate Gala Dinner & Awarding Night",
                category: "event",
                category_label: "Pernikahan & Acara Kantor",
                image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80",
                note: "Standar VIP untuk pertemuan direksi dan tamu kehormatan",
              },
            ];

            // Item yang diunggah dari CMS admin
            const dbItems = galleries.map((g) => {
              const rawType = (g.event_type || "").toLowerCase();
              let cat = "event";
              let label = "Dokumentasi Acara";
              if (rawType.includes("buffet") || rawType.includes("prasmanan") || rawType.includes("meja")) {
                cat = "buffet";
                label = "Tata Letak Meja Buffet";
              } else if (rawType.includes("pondok") || rawType.includes("stall") || rawType.includes("booth")) {
                cat = "pondokan";
                label = "Dekorasi Pondokan (Stall)";
              } else if (rawType.includes("staff") || rawType.includes("pramusaji") || rawType.includes("kru")) {
                cat = "staff";
                label = "Kerapian Staf Pramusaji";
              }
              return {
                id: g.id,
                title: g.title,
                category: cat,
                category_label: label,
                image_url: g.image_url,
                note: g.event_date || "Dokumentasi Resmi DAPOER PMCSU",
              };
            });

            const combinedList = [...dbItems, ...defaultEventShowcase];

            // Filter item berdasarkan tab
            const filteredItems =
              activeGalleryTab === "all"
                ? combinedList
                : combinedList.filter((item) => item.category === activeGalleryTab);

            return (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FCFBF6] border border-[#CBDFA5] hover:border-[#D8B669] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#23382C]/85 backdrop-blur-xs text-[#E6F0CA] text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg uppercase tracking-wide">
                          {item.category_label}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-[#23382C] text-xs sm:text-sm group-hover:text-[#9F7A2D] transition-colors line-clamp-1 font-serif">
                          {item.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-[#55695D] mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Info Tambahan Pelayanan di Lokasi */}
          <div className="mt-12 p-6 rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFECC0] flex items-center justify-center text-[#23382C] shrink-0">
                <Users className="w-5 h-5 text-[#8D6B26]" />
              </div>
              <div>
                <h5 className="font-bold text-[#23382C] text-sm">Butuh Konsultasi Penataan Ruang & Meja Acara?</h5>
                <p className="text-xs text-[#55695D]">Tim spesialis banquet kami siap survei lokasi dan merancang alur buffet terbaik.</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                `Halo ${profile.name || "DAPOER PMCSU"}, saya ingin konsultasi penataan meja buffet dan pondokan untuk acara kami.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] text-[#212E24] rounded-full text-xs font-black shadow-xs hover:shadow-md transition-all whitespace-nowrap"
            >
              Konsultasi Layout Gratis
            </a>
          </div>
        </div>
      </section>



      {/* Combined Section: Panduan Pemesanan & Tentang Brand Kami (Seamless) */}
      <div className="relative text-[#23382C] overflow-hidden">
        {/* Section: Panduan Pemesanan */}
        <section id="cara-pesan" className="relative z-10 pt-12 sm:pt-24 pb-8 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
              <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
                Cara Pemesanan
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 tracking-tight font-serif">
                Alur Mudah Pemesanan via WhatsApp
              </h2>
              <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                Cukup 4 langkah praktis untuk menikmati sajian istimewa kami di hari acara Anda.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#E1DEC9] hover:border-[#C9A24D] shadow-xs hover:shadow-xl hover:shadow-[#C9A24D]/15 transition-all duration-300 group">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D8B669] text-[#212E24] font-black text-sm sm:text-base flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  1
                </span>
                <h4 className="font-bold text-[#23382C] text-sm sm:text-base mb-1 group-hover:text-[#9F7A2D] transition-colors font-serif">
                  Pilih Menu
                </h4>
                <p className="text-[#55695D] text-[11px] sm:text-xs leading-relaxed">
                  Jelajahi ragam pilihan menu makanan, minuman, dan paket prasmanan sesuai selera Anda.
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#E1DEC9] hover:border-[#C9A24D] shadow-xs hover:shadow-xl hover:shadow-[#C9A24D]/15 transition-all duration-300 group">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D8B669] text-[#212E24] font-black text-sm sm:text-base flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  2
                </span>
                <h4 className="font-bold text-[#23382C] text-sm sm:text-base mb-1 group-hover:text-[#9F7A2D] transition-colors font-serif">
                  Pesan via WA
                </h4>
                <p className="text-[#55695D] text-[11px] sm:text-xs leading-relaxed">
                  Pilih varian atau paket yang diinginkan lalu tekan tombol pemesanan WhatsApp otomatis.
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#E1DEC9] hover:border-[#C9A24D] shadow-xs hover:shadow-xl hover:shadow-[#C9A24D]/15 transition-all duration-300 group">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D8B669] text-[#212E24] font-black text-sm sm:text-base flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  3
                </span>
                <h4 className="font-bold text-[#23382C] text-sm sm:text-base mb-1 group-hover:text-[#9F7A2D] transition-colors font-serif">
                  Konsultasi Detail
                </h4>
                <p className="text-[#55695D] text-[11px] sm:text-xs leading-relaxed">
                  Kirim pesan ke admin, lengkapi tanggal acara, jumlah porsi, serta alamat pengantaran.
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#E1DEC9] hover:border-[#C9A24D] shadow-xs hover:shadow-xl hover:shadow-[#C9A24D]/15 transition-all duration-300 group">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D8B669] text-[#212E24] font-black text-sm sm:text-base flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  4
                </span>
                <h4 className="font-bold text-[#23382C] text-sm sm:text-base mb-1 group-hover:text-[#9F7A2D] transition-colors font-serif">
                  Konfirmasi & Antar
                </h4>
                <p className="text-[#55695D] text-[11px] sm:text-xs leading-relaxed">
                  Admin mengonfirmasi rincian pesanan dan hidangan lezat siap diantar tepat waktu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Tentang Kami & Visi Misi */}
        <section id="tentang" className="relative z-10 pt-8 sm:pt-12 pb-12 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full mb-3">
                  Tentang Brand Kami
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal text-[#9F7A2D] mt-1 font-serif">{profile.name}</h2>
              </div>
              <p className="text-[#4B6152] text-sm leading-relaxed">{profile.description}</p>

              <div className="p-6 bg-[#FCFBF6] rounded-3xl border border-[#E1DEC9] shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-[#9F7A2D] uppercase tracking-wide">Visi Kami</h4>
                <p className="text-[#55695D] text-xs leading-relaxed">{profile.vision}</p>
              </div>

              <div className="p-6 bg-[#FCFBF6] rounded-3xl border border-[#E1DEC9] shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-[#9F7A2D] uppercase tracking-wide">Misi Kami</h4>
                <p className="text-[#55695D] text-xs leading-relaxed whitespace-pre-line">{profile.mission}</p>
              </div>
            </div>

            {/* Lokasi & Kontak Box */}
            <div className="bg-[#FCFBF6] p-8 rounded-3xl border border-[#E1DEC9] shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#23382C] flex items-center gap-2 font-serif">
                <MapPin className="w-5 h-5 text-[#9F7A2D]" />
                <span>Alamat & Lokasi Dapur Kami</span>
              </h3>
              <p className="text-[#55695D] text-sm leading-relaxed">{profile.address}</p>

              <div className="space-y-3 text-xs text-[#55695D]">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9F7A2D]" />
                  <span>{profile.operating_hours}</span>
                </div>
              </div>

              {profile.maps_url && (
                <a
                  href={profile.maps_url.startsWith('http') ? profile.maps_url : `https://${profile.maps_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] text-[#212E24] rounded-xl text-xs font-bold transition-colors border border-[#DFBF73]"
                >
                  <ExternalLink className="w-4 h-4 text-[#212E24]" />
                  <span>Buka di Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Bukti Sosial & Ulasan (Social Proof & Testimonials) */}
      <section id="testimoni" className="relative z-10 py-12 sm:py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
              Ulasan Nyata Google Maps
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 font-serif">
              Apa Kata Klien & Tamu Kami?
            </h2>
            <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Pengalaman nyata pelanggan dari ulasan bintang 4 & 5 di Google Maps untuk prasmanan pernikahan, gathering kantor, selamatan, dan syukuran keluarga.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <a
                href={
                  profile.maps_url
                    ? profile.maps_url.startsWith("http")
                      ? profile.maps_url
                      : `https://${profile.maps_url}`
                    : "https://www.google.com/maps/place/Pasar+Minggu+Catering+Service/@-6.2900409,106.8438304,17z/data=!4m18!1m9!3m8!1s0x2e69f272f042f0fd:0x5fa547fbfd9ec7ef!2sPasar+Minggu+Catering+Service!8m2!3d-6.2900409!4d106.8438304!9m1!1b1!16s%2Fg%2F11cm13p_qy!3m7!1s0x2e69f272f042f0fd:0x5fa547fbfd9ec7ef!8m2!3d-6.2900409!4d106.8438304!9m1!1b1!16s%2Fg%2F11cm13p_qy?hl=id"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#CBDFA5] text-[#23382C] hover:text-[#9F7A2D] text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center text-[#F59E0B]">
                  {"★★★★★"}
                </div>
                <span>Lihat Ulasan di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8D6B26]" />
              </a>
            </div>
          </div>

          {/* Testimonial Cards - Responsive Slider (Touch-swipe & Smooth Arrows) */}
          {(() => {
            const testimonialList = testimonials && testimonials.length > 0
              ? testimonials
              : [
                  {
                    id: 1,
                    client_name: "meeva kitchen",
                    role_or_event: "Ulasan Google Maps",
                    rating: 5,
                    comment: "Rasanya enak, pelayanannya ramah dan cepat. Recommended banget!",
                  },
                  {
                    id: 2,
                    client_name: "Susila Hesti Purnami",
                    role_or_event: "Ulasan Google Maps",
                    rating: 4,
                    comment: "Makanannya enak, porsinya pas. Cuma tempatnya agak kecil.",
                  },
                  {
                    id: 3,
                    client_name: "Nina Nasution",
                    role_or_event: "Ulasan Google Maps",
                    rating: 5,
                    comment: "Cateringnya mantap, harga terjangkau, rasa juara!",
                  },
                ];

            const scrollSlide = (direction: "left" | "right") => {
              const container = testimonialScrollRef.current;
              if (!container) return;
              const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
              container.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
              });
            };

            const scrollToIndex = (index: number) => {
              const container = testimonialScrollRef.current;
              if (!container) return;
              const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
              container.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
              });
              setTestimonialIndex(index);
            };

            const handleScroll = () => {
              const container = testimonialScrollRef.current;
              if (!container) return;
              const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 20 : 320;
              const newIndex = Math.round(container.scrollLeft / cardWidth);
              setTestimonialIndex(Math.min(newIndex, testimonialList.length - 1));
            };

            return (
              <>
                <div className="relative mb-16 group">
                  {/* Horizontal Scrollable Row with Native Touch Momentum */}
                  <div
                    ref={testimonialScrollRef}
                    onScroll={handleScroll}
                    className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-4 sm:px-8 md:px-12 scrollbar-hide -mx-4 sm:mx-0"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {testimonialList.map((t) => (
                      <div
                        key={t.id}
                        className="flex-shrink-0 snap-center w-[340px] lg:w-[calc(33.333%-16px)] p-6 sm:p-7 rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] hover:border-[#D8B669] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1 mb-4 text-[#D8B669]">
                            {Array.from({ length: t.rating || 5 }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#D8B669]" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-[#3D5245] leading-relaxed italic mb-6">
                            &ldquo;{t.comment}&rdquo;
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#CBDFA5]/60 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#DFECC0] border border-[#CBDFA5] flex items-center justify-center font-bold text-[#23382C] text-sm shrink-0">
                            {t.client_name ? t.client_name.charAt(0) : "K"}
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-[#23382C] text-xs truncate">{t.client_name}</h5>
                            <p className="text-[11px] text-[#8D6B26] font-medium truncate">{t.role_or_event}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Arrow Buttons (Desktop & Tablet) */}
                  <button
                    onClick={() => scrollSlide("left")}
                    aria-label="Geser Ulasan Kiri"
                    className="flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#D5E5B2] text-[#23382C] rounded-full shadow-md items-center justify-center hover:bg-[#D8B669] hover:border-[#D8B669] transition-all z-10 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button
                    onClick={() => scrollSlide("right")}
                    aria-label="Geser Ulasan Kanan"
                    className="flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#D5E5B2] text-[#23382C] rounded-full shadow-md items-center justify-center hover:bg-[#D8B669] hover:border-[#D8B669] transition-all z-10 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dot Indicators */}
                  {testimonialList.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                      {testimonialList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToIndex(idx)}
                          aria-label={`Ke ulasan ${idx + 1}`}
                          className={`rounded-full transition-all duration-300 ${
                            idx === testimonialIndex
                              ? "w-6 h-2.5 bg-[#D8B669]"
                              : "w-2.5 h-2.5 bg-[#CBDFA5] hover:bg-[#B6CD8E]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {/* Monochrome Corporate Clients Logo Strip */}
          <div className="pt-8 border-t border-[#CBDFA5]">
            <p className="text-center text-[11px] uppercase tracking-wider font-extrabold text-[#708474] mb-8">
              Dipercaya Oleh Berbagai Perusahaan, BUMN, & Komunitas Terkemuka:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
              {(() => {
                const rawClients = settings.corporate_clients || "Bank Mandiri, Telkom Indonesia, Pertamina Group, Kementerian BUMN, Unilever ID, Astra International";
                const clientList = rawClients
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item.length > 0);

                return clientList.map((clientName, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FCFBF6]/70 border border-[#CBDFA5]/60 text-[#55695D] hover:text-[#23382C] hover:border-[#D8B669] transition-colors"
                  >
                    <Building2 className="w-6 h-6 mb-1 opacity-70" />
                    <span className="text-[11px] font-bold tracking-tight text-center">{clientName}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Transparansi Area Pengiriman & Syarat (Logistics & FAQ) */}
      <section id="faq" className="relative z-10 py-12 sm:py-20 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-3.5 py-1.5 rounded-full inline-block">
              Informasi Logistik & FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#9F7A2D] mt-2 sm:mt-3 font-serif">
              Transparansi Area Pengiriman & Syarat
            </h2>
            <p className="text-[#4B6152] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Jawaban cepat seputar minimum pemesanan, jangkauan kurir Jabodetabek, dan panduan pembayaran.
            </p>
          </div>

          {/* Quick Highlight Cards: Minimum Order & Coverage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-10">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] shadow-xs flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#DFECC0] flex items-center justify-center text-[#212E24] shrink-0">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8D6B26]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B26] block">Jangkauan Antar</span>
                <h4 className="font-bold text-[#23382C] text-xs sm:text-sm mt-0.5">
                  {settings.delivery_area_text ? settings.delivery_area_text.split("(")[0].trim() : "Seluruh Jabodetabek"}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#55695D] mt-1 leading-normal">
                  {settings.delivery_area_text || "Armada berpendingin / box khusus menjamin hidangan tetap hangat & higienis sampai tujuan."}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] shadow-xs flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#DFECC0] flex items-center justify-center text-[#212E24] shrink-0">
                <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-[#8D6B26]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B26] block">Minimum Pemesanan</span>
                <h4 className="font-bold text-[#23382C] text-xs sm:text-sm mt-0.5">
                  {settings.min_order_text ? settings.min_order_text.split("&bull;")[0].trim() : "Mulai 20 Pax (Nasi Box)"}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#55695D] mt-1 leading-normal">
                  {settings.min_order_text || "Untuk buffet/prasmanan min. 50 pax sudah lengkap dengan meja, chafing dish, dan staf."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#DFECC0] flex items-center justify-center text-[#212E24] shrink-0">
                <Clock className="w-5 h-5 text-[#8D6B26]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B26] block">Waktu Reservasi</span>
                <h4 className="font-bold text-[#23382C] text-sm mt-0.5">
                  {settings.lead_time_text ? settings.lead_time_text.split("(")[0].trim() : "H-2 Acara Berjalan"}
                </h4>
                <p className="text-[11px] text-[#55695D] mt-1 leading-normal">
                  {settings.lead_time_text || "Menerima pesanan darurat (H-1) sesuai ketersediaan slot dapur dan menu terpilih."}
                </p>
              </div>
            </div>
          </div>

          {/* Accordion FAQ List */}
          <div className="space-y-3">
            {[
              {
                q: "Berapa minimum pemesanan (pax) untuk acara saya?",
                a: "Minimum order untuk Nasi Box/Bento adalah 20 pax. Untuk paket Prasmanan (Buffet) lengkap dengan peralatan saji dan waiter adalah mulai dari 50 pax. Kami juga melayani pesanan tumpeng mulai ukuran 10 porsi.",
              },
              {
                q: "Daerah mana saja yang dijangkau oleh pengiriman DAPOER PMCSU?",
                a: "Kami melayani pengantaran ke seluruh area Jabodetabek (Jakarta Pusat, Selatan, Timur, Barat, Utara, Depok, Tangerang Kota, Tangerang Selatan, Bekasi, hingga sebagian Bogor). Khusus area Jakarta Selatan tersedia promo subsidi ongkir.",
              },
              {
                q: "Bagaimana cara pembayaran dan sistem pelunasan catering?",
                a: "Pemesanan dinyatakan terkonfirmasi setelah pembayaran DP (Down Payment) sebesar 30%–50%. Pelunasan dapat dilakukan maksimal H-1 sebelum tanggal pengantaran atau sesuai kesepakatan invoice korporat.",
              },
              {
                q: "Apakah bisa request tester menu (food tasting) sebelum deal besar?",
                a: "Tentu bisa! Untuk pesanan resepsi pernikahan atau corporate event di atas 300 pax, kami menyediakan complimentary food tasting di dapur utama kami atau dikirimkan tester sample box ke alamat Anda.",
              },
              {
                q: "Apakah seluruh hidangan terjamin 100% Halal?",
                a: "Ya, 100% halal. Seluruh bahan hewani (daging sapi, ayam) disembelih secara syar'i bersertifikasi halal, dan dapur kami menerapkan sistem pemisahan bebas dari bahan non-halal maupun kontaminasi silang.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FCFBF6] border border-[#CBDFA5] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#23382C] text-sm hover:text-[#9F7A2D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8D6B26] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#9F7A2D]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-[#55695D] leading-relaxed border-t border-[#E1DEC9]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>

      {/* Footer (Warm Golden Ochre Marquee Tone matching the banner in Image 1) */}
      <footer className="relative z-10 bg-[#DFECC0]/80 backdrop-blur-xs text-[#3D5245] pt-12 pb-6 px-4 border-t border-[#D5E5B2]/60 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Ringkasan Logistik & Area Pengiriman di Footer */}
          <div className="mb-10 pb-8 border-b border-[#CBDFA5] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#CBDFA5] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#8D6B26]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#23382C] text-xs uppercase tracking-wider">Area Jangkauan Pengiriman</h5>
                <p className="text-xs text-[#415549] mt-0.5">
                  {settings.delivery_area_text || "Seluruh Jakarta, Bogor, Depok, Tangerang & Bekasi (Jabodetabek)"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#CBDFA5] flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-5 h-5 text-[#8D6B26]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#23382C] text-xs uppercase tracking-wider">Ketentuan Minimum Order</h5>
                <p className="text-xs text-[#415549] mt-0.5">
                  {settings.min_order_text || "Nasi Box min. 20 pax &bull; Buffet / Prasmanan min. 50 pax"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#CBDFA5] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#8D6B26]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#23382C] text-xs uppercase tracking-wider">Jaminan Higienis & Halal</h5>
                <p className="text-xs text-[#415549] mt-0.5">
                  {settings.trust_badge_1 || "100% Halal Certified"} &bull; {settings.trust_badge_2 || "Standar Higienis Pangan"}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media & Contact Links (2 di atas & 2 di bawah pada HP, 1 baris di Laptop) */}
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 max-w-lg lg:max-w-none mx-auto">
            {/* Phone / WhatsApp */}
            <a
              href={generalWaUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#415549] hover:text-[#9F7A2D] transition-colors group min-w-0"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CBDFA5] flex items-center justify-center group-hover:border-[#9F7A2D]/50 transition-colors shadow-xs shrink-0">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9F7A2D]" />
              </span>
              <span className="text-xs font-medium truncate">+{waPhone}</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/pasarminggucatering"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#415549] hover:text-[#9F7A2D] transition-colors group min-w-0"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CBDFA5] flex items-center justify-center group-hover:border-[#9F7A2D]/50 transition-colors shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9F7A2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </span>
              <span className="text-xs font-medium truncate">@pasarminggucatering</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/pasarminggucatering"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#415549] hover:text-[#9F7A2D] transition-colors group min-w-0"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CBDFA5] flex items-center justify-center group-hover:border-[#9F7A2D]/50 transition-colors shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9F7A2D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </span>
              <span className="text-xs font-medium truncate">pasarminggucatering</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${profile.email || 'info@dapoerpmcsu.com'}`}
              className="flex items-center gap-2 text-[#415549] hover:text-[#9F7A2D] transition-colors group min-w-0"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CBDFA5] flex items-center justify-center group-hover:border-[#9F7A2D]/50 transition-colors shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9F7A2D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <span className="text-xs font-medium truncate">{profile.email || 'info@dapoerpmcsu.com'}</span>
            </a>
          </div>

          {/* Halal Indonesia Certificate Card & QR Barcode */}
          <div className="my-8 p-6 rounded-3xl bg-[#FCFBF6] border border-[#CBDFA5] max-w-xl mx-auto shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#CBDFA5] p-2 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/qr-halal-clean.png"
                  alt="QR Barcode Halal Indonesia"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8D6B26] bg-[#DFECC0] border border-[#CBDFA5] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Pindai / Scan QR Resmi
                </span>
                <h4 className="font-extrabold text-[#23382C] text-sm">
                  Sertifikat Halal Indonesia
                </h4>
                <p className="text-xs text-[#55695D] font-mono font-semibold mt-0.5">
                  No. Registrasi: ID110025607930825
                </p>
                <p className="text-[11px] text-[#708474] mt-1">
                  Badan Penyelenggara Jaminan Produk Halal (BPJPH)
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <img
                src="/logo-halal-clean.png"
                alt="Logo Halal Indonesia"
                className="h-10 w-auto object-contain mx-auto"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#CBDFA5] pt-5 text-center text-xs text-[#55695D]">
            <p>&copy; {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Detail Menu Modal & WhatsApp Direct Action */}
      {selectedMenu && (
        <div
          onClick={() => setSelectedMenu(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-[#CBDFA5] w-full max-w-lg overflow-hidden my-8 animate-slide-down will-change-transform"
          >
            <div className="relative h-60 bg-stone-100 overflow-hidden">
              {selectedMenu.image_url ? (
                <img
                  src={selectedMenu.image_url}
                  alt={selectedMenu.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <UtensilsCrossed className="w-12 h-12" />
                </div>
              )}
              <button
                onClick={() => setSelectedMenu(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F7A2D] block mb-1">
                  {selectedMenu.category_name || "Menu Catering"}
                </span>
                <h3 className="text-xl font-bold text-[#23382C]">{selectedMenu.name}</h3>
                <p className="text-[#4B6152] text-xs leading-relaxed mt-2">
                  {selectedMenu.description || "Hubungi admin kami untuk rincian menu ini."}
                </p>
              </div>

              {/* Varian Selection if any */}
              {(() => {
                let variants: Variant[] = [];
                try {
                  variants = JSON.parse(selectedMenu.variants || "[]");
                } catch {
                  variants = [];
                }

                if (variants.length === 0) return null;

                return (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <label className="text-xs font-bold text-[#23382C] block">Pilih Varian / Paket:</label>
                    <div className="space-y-2">
                      {variants.map((v, i) => {
                        const isSelected = selectedVariant?.name === v.name;
                        return (
                          <div
                            key={i}
                            onClick={() => setSelectedVariant(v)}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? "border-[#D8B669] bg-[#FAF5E6] font-bold text-[#23382C] shadow-xs"
                                : "border-stone-200 hover:border-stone-300 text-stone-600"
                            }`}
                          >
                            <span>{v.name}</span>
                            <span className="text-[#9F7A2D] font-bold">Rp {v.price.toLocaleString("id-ID")}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#eeebe2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Harga Pesanan:</span>
                  <span className="text-xl font-black text-[#23382C]">
                    Rp {(selectedVariant ? selectedVariant.price : selectedMenu.price).toLocaleString("id-ID")}
                  </span>
                </div>

                <a
                  href={buildWhatsAppUrl(selectedMenu, selectedVariant)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-[#D8B669] hover:bg-[#C9A24D] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#D8B669]/25 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Kirim Pesan ke WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
