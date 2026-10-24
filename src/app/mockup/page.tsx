"use client";

import { useState } from "react";
import Link from "next/link";
import { Laptop, Smartphone, Tablet, ExternalLink, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";

export default function MockupFigmaViewer() {
  const [device, setDevice] = useState<"laptop" | "tablet" | "mobile">("laptop");
  const [zoom, setZoom] = useState<number>(100);
  const [key, setKey] = useState<number>(0);

  const deviceSizes = {
    laptop: { width: "1440px", height: "900px", label: "MacBook Pro / Laptop (1440 x 900)" },
    tablet: { width: "820px", height: "1080px", label: "iPad Air / Tablet (820 x 1080)" },
    mobile: { width: "414px", height: "896px", label: "iPhone / Mobile (414 x 896)" },
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col font-sans select-none">
      {/* Top Figma Toolbar Header */}
      <header className="h-14 bg-[#2C2C2C] border-b border-[#3D3D3D] px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E05638] flex items-center justify-center font-black text-[9px] text-white">F</span>
            <span className="font-bold text-sm text-stone-200">Figma Prototype Viewer</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#383838] text-stone-400 font-mono">Dapoer PMC SU</span>
          </div>

          <div className="h-5 w-[1px] bg-[#444]" />

          {/* Device Switcher */}
          <div className="flex items-center bg-[#1E1E1E] p-1 rounded-lg border border-[#444]">
            <button
              onClick={() => setDevice("laptop")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                device === "laptop" ? "bg-[#0D99FF] text-white shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptop 1440px</span>
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                device === "tablet" ? "bg-[#0D99FF] text-white shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                device === "mobile" ? "bg-[#0D99FF] text-white shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>HP / Mobile</span>
            </button>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setKey(k => k + 1)}
            title="Reload Prototype"
            className="p-1.5 rounded hover:bg-[#3D3D3D] text-stone-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="flex items-center bg-[#1E1E1E] rounded-lg border border-[#444] px-2 py-1 text-xs text-stone-300 gap-2">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="hover:text-white font-bold px-1">-</button>
            <span className="font-mono w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="hover:text-white font-bold px-1">+</button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#383838] hover:bg-[#444] text-xs font-bold text-stone-200 transition-colors"
          >
            <span>Buka Web Penuh</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Figma Canvas Canvas Viewport */}
      <main className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[#181818] relative">
        {/* Device Frame */}
        <div
          className="transition-all duration-300 flex flex-col items-center"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          {/* Laptop Mockup Bezel Frame */}
          {device === "laptop" && (
            <div className="bg-[#2D2D2D] p-3 rounded-t-2xl shadow-2xl border border-[#444] flex flex-col items-center">
              {/* Camera dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] mb-2 border border-[#333]" />
              
              {/* Screen Bezel */}
              <div
                className="bg-white rounded-lg overflow-hidden border border-[#222]"
                style={{ width: "1280px", height: "760px" }}
              >
                <iframe
                  key={key}
                  src="/"
                  className="w-full h-full border-0 select-auto"
                  title="Dapoer PMC SU Laptop Prototype"
                />
              </div>
            </div>
          )}

          {/* Tablet Mockup Bezel */}
          {device === "tablet" && (
            <div className="bg-[#2D2D2D] p-4 rounded-3xl shadow-2xl border border-[#444] flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] mb-2 border border-[#333]" />
              <div
                className="bg-white rounded-2xl overflow-hidden border border-[#222]"
                style={{ width: "768px", height: "960px" }}
              >
                <iframe
                  key={key}
                  src="/"
                  className="w-full h-full border-0 select-auto"
                  title="Dapoer PMC SU Tablet Prototype"
                />
              </div>
            </div>
          )}

          {/* Smartphone Mockup Bezel */}
          {device === "mobile" && (
            <div className="bg-[#1F1F1F] p-3.5 rounded-[48px] shadow-2xl border-4 border-[#3A3A3A] flex flex-col items-center">
              {/* Dynamic Island */}
              <div className="w-28 h-5 rounded-full bg-black mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
              </div>
              <div
                className="bg-white rounded-[36px] overflow-hidden border border-[#111]"
                style={{ width: "375px", height: "780px" }}
              >
                <iframe
                  key={key}
                  src="/"
                  className="w-full h-full border-0 select-auto"
                  title="Dapoer PMC SU Mobile Prototype"
                />
              </div>
            </div>
          )}

          {/* Laptop Base Stand */}
          {device === "laptop" && (
            <div className="w-[1340px] h-4 bg-[#3E3E3E] rounded-b-2xl shadow-xl flex justify-center">
              <div className="w-32 h-1.5 bg-[#2A2A2A] rounded-b" />
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="h-8 bg-[#242424] border-t border-[#333] px-6 flex items-center justify-between text-[11px] text-stone-400">
        <div>Frame Size: <span className="text-stone-200 font-mono font-bold">{deviceSizes[device].label}</span></div>
        <div>Status: <span className="text-emerald-400 font-semibold">● Interaktif Real-time (Bisa Diklik &amp; Scroll)</span></div>
      </footer>
    </div>
  );
}
