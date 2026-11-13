"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk ke sistem");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F0CA] text-[#23382C] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambience Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: "url('/catering-landing-bg-seamless.png')",
        }}
      />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DFECC0]/50 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="w-full max-w-md bg-[#FCFBF6] rounded-3xl shadow-xl shadow-[#23382C]/10 border border-[#CBDFA5] overflow-hidden relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#23382C] to-[#2D4536] px-8 pt-8 pb-7 text-white text-center relative border-b border-[#CBDFA5]/30">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3.5 p-2 shadow-lg shadow-black/20 border-2 border-[#D5E5B2]">
            <img src="/logo-dapoer-pmcsu.png" alt="Dapoer PMCSU Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D8B669] bg-[#344F3F] border border-[#486B56] px-2.5 py-1 rounded-full inline-block mb-2">
            Panel Pengelolaan Konten
          </span>
          <h1 className="text-2xl font-bold tracking-tight font-serif text-[#FAF7EE]">DAPOER PMCSU</h1>
          <p className="text-[#BFCFBF] text-xs mt-1 font-medium">Masuk untuk mengelola katalog menu, galeri & ulasan</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D5245] mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D6B26]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBDFA5] rounded-xl text-[#23382C] placeholder-[#8A9C90] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40 focus:border-[#C9A24D] transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D5245] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D6B26]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBDFA5] rounded-xl text-[#23382C] placeholder-[#8A9C90] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40 focus:border-[#C9A24D] transition-all text-sm font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#D7B465] to-[#BFA052] hover:from-[#C9A24D] hover:to-[#B08E40] active:scale-[0.99] disabled:opacity-70 text-[#212E24] font-bold rounded-xl shadow-md shadow-[#C9A24D]/25 border border-[#DFBF73] flex items-center justify-center gap-2 transition-all mt-5 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#212E24] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Masuk ke Panel Admin</span>
                <ArrowRight className="w-4 h-4 text-[#212E24]" />
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <a
              href="/"
              className="text-xs font-semibold text-[#667C6E] hover:text-[#23382C] transition-colors"
            >
              &larr; Kembali ke Website Publik
            </a>
          </div>
        </form>
      </div>

      <p className="text-[11px] text-[#55695D] mt-6 relative z-10 text-center">
        &copy; {new Date().getFullYear()} DAPOER PMCSU. Sistem Manajemen Konten Resmi.
      </p>
    </div>
  );
}
