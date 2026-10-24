import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");

    let query = supabaseAdmin
      .from("menus")
      .select("*, categories(name, slug)")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: false });

    if (categoryId) {
      query = query.eq("category_id", Number(categoryId));
    }

    const { data: menus, error } = await query;
    if (error) throw error;

    // Flatten category name for frontend compatibility
    const formatted = menus.map((m: any) => ({
      ...m,
      category_name: m.categories?.name || "",
      category_slug: m.categories?.slug || "",
      variants: typeof m.variants === "string" ? m.variants : JSON.stringify(m.variants || []),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Menus fetch error:", error);
    return NextResponse.json({ error: "Gagal mengambil data menu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      category_id, name, description, price, image_url,
      variants, is_available, is_featured, sort_order
    } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Nama menu dan harga dasar wajib diisi" }, { status: 400 });
    }

    const parsedVariants = typeof variants === "string" ? JSON.parse(variants || "[]") : (variants || []);

    const { data, error } = await supabaseAdmin
      .from("menus")
      .insert({
        category_id: category_id ? Number(category_id) : null,
        name,
        description: description || "",
        price: Number(price) || 0,
        image_url: image_url || "",
        variants: parsedVariants,
        is_available: is_available !== undefined ? (is_available ? 1 : 0) : 1,
        is_featured: is_featured ? 1 : 0,
        sort_order: Number(sort_order) || 0,
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Menu create error:", error);
    return NextResponse.json({ error: "Gagal menambahkan menu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      id, category_id, name, description, price, image_url,
      variants, is_available, is_featured, sort_order
    } = body;

    if (!id || !name || price === undefined) {
      return NextResponse.json({ error: "ID, nama menu, dan harga wajib diisi" }, { status: 400 });
    }

    const parsedVariants = typeof variants === "string" ? JSON.parse(variants || "[]") : (variants || []);

    const { error } = await supabaseAdmin
      .from("menus")
      .update({
        category_id: category_id ? Number(category_id) : null,
        name,
        description: description || "",
        price: Number(price) || 0,
        image_url: image_url || "",
        variants: parsedVariants,
        is_available: is_available ? 1 : 0,
        is_featured: is_featured ? 1 : 0,
        sort_order: Number(sort_order) || 0,
      })
      .eq("id", Number(id));

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Menu update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui menu" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });

    const { error } = await supabaseAdmin.from("menus").delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Menu delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus menu" }, { status: 500 });
  }
}
