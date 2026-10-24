import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const [galleriesRes, testires] = await Promise.all([
      supabaseAdmin.from("galleries").select("*").order("sort_order", { ascending: true }).order("id", { ascending: false }),
      supabaseAdmin.from("testimonials").select("*").order("sort_order", { ascending: true }).order("id", { ascending: false }),
    ]);

    if (galleriesRes.error) throw galleriesRes.error;
    if (testires.error) throw testires.error;

    return NextResponse.json({
      galleries: galleriesRes.data || [],
      testimonials: testires.data || [],
    });
  } catch (error) {
    console.error("Gallery/Testi fetch error:", error);
    return NextResponse.json({ error: "Gagal mengambil data galeri/testimoni" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { type } = body;

    if (type === "gallery") {
      const { title, image_url, event_type, event_date, sort_order } = body;
      if (!title || !image_url) return NextResponse.json({ error: "Judul dan foto wajib diisi" }, { status: 400 });

      const { data, error } = await supabaseAdmin
        .from("galleries")
        .insert({
          title,
          image_url,
          event_type: event_type || "",
          event_date: event_date || "",
          sort_order: Number(sort_order) || 0,
        })
        .select("id")
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, id: data.id });
    } else if (type === "testimonial") {
      const { client_name, role_or_event, rating, comment, avatar_url, sort_order } = body;
      if (!client_name || !comment) return NextResponse.json({ error: "Nama klien dan komentar ulasan wajib diisi" }, { status: 400 });

      const { data, error } = await supabaseAdmin
        .from("testimonials")
        .insert({
          client_name,
          role_or_event: role_or_event || "",
          rating: Number(rating) || 5,
          comment,
          avatar_url: avatar_url || "",
          sort_order: Number(sort_order) || 0,
        })
        .select("id")
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, id: data.id });
    }

    return NextResponse.json({ error: "Tipe tidak valid" }, { status: 400 });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) return NextResponse.json({ error: "Tipe dan ID wajib disertakan" }, { status: 400 });

    if (type === "gallery") {
      const { error } = await supabaseAdmin.from("galleries").delete().eq("id", Number(id));
      if (error) throw error;
    } else if (type === "testimonial") {
      const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", Number(id));
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
