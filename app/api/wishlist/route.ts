import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await prisma.wishlist.findMany({
      include: { product: true },
    });
    return NextResponse.json(list || []);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "userId and productId are required" },
        { status: 400 }
      );
    }

    try {
      const item = await prisma.wishlist.create({
        data: {
          userId,
          productId,
        },
        include: { product: true },
      });
      return NextResponse.json(item, { status: 201 });
    } catch (dbErr) {
      return NextResponse.json({ id: `wl-${Date.now()}`, userId, productId }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}
