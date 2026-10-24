import { supabaseAdmin } from "@/lib/supabase";
import PublicLandingPage from "@/components/PublicLandingPage";
import type { Metadata } from "next";

export const revalidate = 0; // Pastikan data selalu sinkron langsung dengan Supabase

export async function generateMetadata(): Promise<Metadata> {
  const { data: profile } = await supabaseAdmin
    .from("brand_profile")
    .select("name, tagline, description")
    .limit(1)
    .single();

  return {
    title: profile ? `${profile.name} - ${profile.tagline}` : "DAPOER PMCSU - Official Catering",
    description: profile?.description || "Layanan catering profesional untuk aneka acara",
  };
}

export default async function Home() {
  const [
    profileRes,
    categoriesRes,
    menusRes,
    servicesRes,
    galleriesRes,
    testimonialsRes,
    settingsRes,
  ] = await Promise.all([
    supabaseAdmin.from("brand_profile").select("*").limit(1).single(),
    supabaseAdmin.from("categories").select("*").order("sort_order", { ascending: true }).order("id", { ascending: true }),
    supabaseAdmin.from("menus").select("*, categories(name, slug)").order("sort_order", { ascending: true }).order("id", { ascending: false }),
    supabaseAdmin.from("services").select("*").eq("is_active", 1).order("sort_order", { ascending: true }),
    supabaseAdmin.from("galleries").select("*").order("sort_order", { ascending: true }).order("id", { ascending: false }),
    supabaseAdmin.from("testimonials").select("*").order("sort_order", { ascending: true }).order("id", { ascending: false }),
    supabaseAdmin.from("settings").select("key, value"),
  ]);

  const profile = profileRes.data || {
    name: "DAPOER PMCSU",
    tagline: "Cita Rasa Istimewa & Higienis",
    description: "",
    address: "",
  };

  const categories = categoriesRes.data || [];

  const menus = (menusRes.data || []).map((m: any) => ({
    ...m,
    category_name: m.categories?.name || "",
    category_slug: m.categories?.slug || "",
    variants: typeof m.variants === "string" ? m.variants : JSON.stringify(m.variants || []),
  }));

  const services = (servicesRes.data || []).map((s: any) => ({
    ...s,
    features: typeof s.features === "string" ? s.features : JSON.stringify(s.features || []),
  }));

  const galleries = galleriesRes.data || [];
  const testimonials = testimonialsRes.data || [];

  const settings: Record<string, string> = {};
  if (settingsRes.data) {
    settingsRes.data.forEach((r: { key: string; value: string }) => {
      settings[r.key] = r.value;
    });
  }

  return (
    <PublicLandingPage
      profile={profile}
      categories={categories}
      menus={menus}
      services={services}
      galleries={galleries}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
