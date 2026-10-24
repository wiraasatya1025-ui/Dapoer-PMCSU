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
    <div className="min-h-screen bg-gradient-to-br from-[#f1f6e8] via-[#fafaf6] to-[#eeeae0] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-[#e6e3da] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#689F38] to-[#7CB342] px-8 py-8 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 p-2 shadow-md border border-white/60">
            <img src="/logo-dapoer-pmcsu.png" alt="Dapoer PMCSU Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tight font-serif">DAPOER PMCSU</h1>
          <p className="text-[#edf6de] text-xs mt-1 font-medium">Panel Pengelolaan Konten & Katalog</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/30 focus:border-[#7CB342] transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/30 focus:border-[#7CB342] transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#7CB342] hover:bg-[#689F38] active:scale-[0.99] disabled:opacity-70 text-white font-semibold rounded-xl shadow-lg shadow-[#7CB342]/25 flex items-center justify-center gap-2 transition-all mt-4"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
