import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password wajib diisi" }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Kredensial tidak valid" }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Kredensial tidak valid" }, { status: 401 });
    }

    await createSession(user.id, user.username, user.name);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username, name: user.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
