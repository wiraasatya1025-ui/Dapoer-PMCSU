import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, sort_order } = await request.json();
    if (!name) return NextResponse.json({ error: "Nama kategori wajib diisi" }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const { data, error } = await supabaseAdmin
      .from("categories")
      .insert({ name, slug, sort_order: Number(sort_order) || 0 })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Category create error:", error);
    return NextResponse.json({ error: "Gagal menambahkan kategori" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });

    const { error } = await supabaseAdmin.from("categories").delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
