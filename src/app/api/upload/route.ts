import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Auto optimize & compress with sharp to WebP format
    let optimizedBuffer: Buffer;
    let contentType = "image/webp";
    let filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;

    try {
      // Dynamic import agar tidak crash jika sharp tidak tersedia
      const sharp = (await import("sharp")).default;
      optimizedBuffer = await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
    } catch (sharpErr) {
      console.warn("Sharp tidak tersedia, upload file asli:", sharpErr);
      // Fallback: upload file asli tanpa kompresi
      optimizedBuffer = buffer;
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      contentType = file.type || "image/jpeg";
    }

    // Upload directly to Supabase Storage bucket 'uploads'
    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(filename, optimizedBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json({ error: `Gagal menyimpan ke storage: ${uploadError.message}` }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("uploads")
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Upload error:", msg);
    return NextResponse.json({ error: `Gagal memproses gambar: ${msg}` }, { status: 500 });
  }
}
