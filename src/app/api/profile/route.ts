import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const { data: profile } = await supabaseAdmin
      .from("brand_profile")
      .select("*")
      .limit(1)
      .single();

    const { data: settingsRows } = await supabaseAdmin
      .from("settings")
      .select("key, value");

    const settings: Record<string, string> = {};
    if (settingsRows) {
      settingsRows.forEach((r: { key: string; value: string }) => {
        settings[r.key] = r.value;
      });
    }

    return NextResponse.json({ profile, settings });
  } catch (error) {
    console.error("Profile get error:", error);
    return NextResponse.json({ error: "Gagal mengambil data profil" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name, tagline, description, vision, mission, logo_url, banner_url,
      address, maps_url, phone, email, instagram, operating_hours,
      wa_phone, wa_template
    } = body;

    const { error: profileError } = await supabaseAdmin
      .from("brand_profile")
      .update({
        name, tagline, description, vision, mission,
        logo_url, banner_url, address, maps_url, phone,
        email, instagram, operating_hours,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (profileError) throw profileError;

    // Simpan semua konfigurasi settings dinamis (hero, badge, logistik, faq, klien, pdf, dll)
    const reservedProfileKeys = new Set([
      "name", "tagline", "description", "vision", "mission",
      "logo_url", "banner_url", "address", "maps_url", "phone",
      "email", "instagram", "operating_hours"
    ]);

    for (const [key, val] of Object.entries(body)) {
      if (!reservedProfileKeys.has(key) && typeof val === "string") {
        await supabaseAdmin.from("settings").upsert({ key, value: val });
      }
    }

    if (body.settings && typeof body.settings === "object") {
      for (const [k, v] of Object.entries(body.settings)) {
        if (typeof v === "string") {
          await supabaseAdmin.from("settings").upsert({ key: k, value: v });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui data profil" }, { status: 500 });
  }
}
