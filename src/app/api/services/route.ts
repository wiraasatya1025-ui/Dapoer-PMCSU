import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const { data: services, error } = await supabaseAdmin
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;

    const formatted = services.map((s: any) => ({
      ...s,
      features: typeof s.features === "string" ? s.features : JSON.stringify(s.features || []),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json({ error: "Gagal mengambil layanan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, description, image_url, features, is_active, sort_order } = await request.json();
    if (!name || !description) return NextResponse.json({ error: "Nama dan deskripsi wajib diisi" }, { status: 400 });

    const parsedFeatures = typeof features === "string" ? JSON.parse(features || "[]") : (features || []);

    const { data, error } = await supabaseAdmin
      .from("services")
      .insert({
        name,
        description,
        image_url: image_url || "",
        features: parsedFeatures,
        is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1,
        sort_order: Number(sort_order) || 0,
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Service create error:", error);
    return NextResponse.json({ error: "Gagal menambahkan layanan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, name, description, image_url, features, is_active, sort_order } = await request.json();
    if (!id || !name || !description) return NextResponse.json({ error: "ID, nama, dan deskripsi wajib diisi" }, { status: 400 });

    const parsedFeatures = typeof features === "string" ? JSON.parse(features || "[]") : (features || []);

    const { error } = await supabaseAdmin
      .from("services")
      .update({
        name,
        description,
        image_url: image_url || "",
        features: parsedFeatures,
        is_active: is_active ? 1 : 0,
        sort_order: Number(sort_order) || 0,
      })
      .eq("id", Number(id));

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui layanan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });

    const { error } = await supabaseAdmin.from("services").delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus layanan" }, { status: 500 });
  }
}
