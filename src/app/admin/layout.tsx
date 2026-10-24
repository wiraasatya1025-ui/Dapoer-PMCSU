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
    <div className="min-h-screen bg-[#f7f6f0] flex flex-col md:flex-row text-stone-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1b2216] text-[#dfdbcf] flex flex-col shrink-0 border-r border-[#26301f]">
        {/* Brand */}
        <div className="p-5 border-b border-[#26301f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#7CB342]/40 p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
              <img src="/logo-dapoer-pmcsu.png" alt="Dapoer PMCSU" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm tracking-tight leading-none font-serif">DAPOER PMCSU</h2>
              <span className="text-[11px] text-[#84C341] font-semibold">CMS Admin</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            title="Buka Website Publik"
            className="p-1.5 text-stone-400 hover:text-white hover:bg-[#26301f] rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#7CB342] text-white shadow-sm shadow-[#7CB342]/40 font-semibold"
                    : "text-[#c2beaf] hover:bg-[#26301f] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#84C341]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-[#26301f]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-stone-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
