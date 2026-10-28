import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#23382C",
};

export const metadata: Metadata = {
  title: "DAPOER PMCSU - Jasa Catering Prasmanan, Nasi Kotak & Tumpeng Jakarta",
  description: "Dapoer Pasar Minggu Catering Service Utama (PMCSU). Melayani paket prasmanan (buffet), nasi kotak (box makan), tumpeng selamatan, dan coffee break halal resmi di Jakarta & Jabodetabek.",
  keywords: [
    "Dapoer PMCSU",
    "Pasar Minggu Catering Service Utama",
    "Catering Jakarta",
    "Catering Jakarta Selatan",
    "Catering Prasmanan Halal",
    "Nasi Kotak Jakarta",
    "Tumpeng Jakarta",
    "Paket Pernikahan Catering",
    "Catering Kantor Jabodetabek"
  ],
  authors: [{ name: "DAPOER PMCSU" }],
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DAPOER PMCSU",
  },
  openGraph: {
    title: "DAPOER PMCSU - Catering Pilihan Jakarta",
    description: "Where Traditions Always Tastes Delicious. Solusi praktis & istimewa catering prasmanan, nasi kotak, dan tumpeng halal Jabodetabek.",
    url: "https://dapoer-pmcsu.vercel.app",
    siteName: "DAPOER PMCSU",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
