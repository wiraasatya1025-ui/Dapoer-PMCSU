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
    { label: "Katalog Menu", href: "/admin/menus", icon: BookOpen },
    { label: "Kategori Menu", href: "/admin/categories", icon: FolderTree },
    { label: "Layanan", href: "/admin/services", icon: Briefcase },
    { label: "Portofolio Acara", href: "/admin/gallery", icon: ImageIcon },
    { label: "Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Tentang Kami & WhatsApp", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#E6F0CA] flex flex-col md:flex-row text-[#23382C] font-sans selection:bg-[#C9A24D] selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#23382C] text-[#E6F0CA] flex flex-col shrink-0 border-r border-[#344F3F] shadow-xl md:shadow-none z-20">
        {/* Brand */}
        <div className="p-5 border-b border-[#344F3F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D5E5B2] p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
              <img src="/logo-dapoer-pmcsu.png" alt="Dapoer PMCSU" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-[#FAF7EE] text-sm tracking-tight leading-none font-serif">DAPOER PMCSU</h2>
              <span className="text-[10px] text-[#D8B669] font-bold uppercase tracking-wider">CMS Admin</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            title="Buka Website Publik"
            className="p-1.5 text-[#BFCFBF] hover:text-[#D8B669] hover:bg-[#2D4536] rounded-lg transition-colors"
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
                    : "text-[#D8E6D0] hover:bg-[#2D4536] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#212E24]" : "text-[#D8B669]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#344F3F]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-[#BFCFBF] hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto relative">
        {/* Subtle background ambience */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-fixed opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: "url('/catering-landing-bg-seamless.png')",
          }}
        />
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
