import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "catering-cms-super-secret-key-2026-safe"
);

export async function createSession(userId: number, username: string, name: string) {
  const token = await new SignJWT({ userId, username, name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    return verified.payload as { userId: number; username: string; name: string };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}
