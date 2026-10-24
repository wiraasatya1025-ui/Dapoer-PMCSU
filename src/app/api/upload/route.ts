import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { getSession } from "@/lib/auth";

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

    // Ensure uploads directory exists in public
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique webp filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
    const filePath = path.join(uploadsDir, filename);

    // Auto optimize & compress with sharp to WebP format
    await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filePath);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal memproses gambar" }, { status: 500 });
  }
}
