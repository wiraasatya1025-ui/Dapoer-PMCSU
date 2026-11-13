"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  UtensilsCrossed,
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Briefcase,
  Image as ImageIcon,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
  Building2,
  ListOrdered,
  HelpCircle,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login/admin");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Tentang Kami", href: "/admin/settings", icon: Building2 },
    { label: "Layanan", href: "/admin/services", icon: Briefcase },
    { label: "Katalog Menu", href: "/admin/menus", icon: BookOpen },
    { label: "Kategori Menu", href: "/admin/categories", icon: FolderTree },
    { label: "Galeri Acara", href: "/admin/gallery", icon: ImageIcon },
    { label: "Panduan Pesan", href: "/admin/how-to-order", icon: ListOrdered },
    { label: "Ulasan", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "FAQ & Area", href: "/admin/faq", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#E6F0CA] flex flex-col md:flex-row text-[#23382C] font-sans selection:bg-[#C9A24D] selection:text-white relative">
      {/* Background SAMA PERSIS dengan Website Utama */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transform-gpu"
        style={{ transform: "translateZ(0)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2200&q=80"
          alt="Continuous Catering Background"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#E6F0CA]/80" />
      </div>

      {/* Sidebar - Soft Sage Theme Sesuai Website Utama */}
      <aside className="w-full md:w-64 bg-[#E6F0CA]/95 backdrop-blur-md text-[#23382C] flex flex-col shrink-0 border-r border-[#D5E5B2] shadow-sm z-20">
        {/* Brand */}
        <div className="p-5 border-b border-[#D5E5B2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E5B2] p-1 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <img src="/logo-dapoer-pmcsu.png" alt="Dapoer PMCSU" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-[#23382C] text-sm tracking-tight leading-none font-serif">DAPOER PMCSU</h2>
              <span className="text-[10px] text-[#8D6B26] font-bold uppercase tracking-wider">CMS Admin</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            title="Buka Website Publik"
            className="p-1.5 text-[#55695D] hover:text-[#9F7A2D] hover:bg-[#DFECC0] rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#D7B465] to-[#BFA052] text-[#212E24] shadow-md shadow-[#C9A24D]/25 border border-[#DFBF73]"
                    : "text-[#3D5245] hover:bg-[#DFECC0] hover:text-[#23382C]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#212E24]" : "text-[#8D6B26]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#D5E5B2]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-[#55695D] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
