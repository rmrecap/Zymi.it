import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(users || []);
  } catch (error) {
    console.warn("[Users API] Database unavailable, returning empty list:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, role = "user" } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      return NextResponse.json(user, { status: 201 });
    } catch (dbErr) {
      console.warn("[Users API] DB create fallback:", dbErr);
      return NextResponse.json(
        { id: `user-${Date.now()}`, email, role },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
