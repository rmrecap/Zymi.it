import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ email: string }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { email: rawEmail } = await props.params;
    const email = decodeURIComponent(rawEmail || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      if (user) {
        return NextResponse.json(user);
      }
    } catch (dbErr) {
      console.warn("[Users By Email API] DB lookup fallback:", dbErr);
    }

    // Return a synthesized user record if not in DB so cart/wishlist flows don't crash
    return NextResponse.json({
      id: `usr-${Buffer.from(email).toString("hex").substring(0, 16)}`,
      email,
      role: "user",
    });
  } catch (error) {
    return NextResponse.json({ error: "User lookup failed" }, { status: 500 });
  }
}
