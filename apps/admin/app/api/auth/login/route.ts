import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbSelect } from "@/lib/db";
import { signAdminToken } from "@/lib/auth";

interface Admin {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const rows = await dbSelect<Admin>("admins", { email: `eq.${email}` });
    if (!rows.length) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}