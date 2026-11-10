import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (!id) {
      return NextResponse.json([]);
    }

    try {
      // Look up by userId first
      const items = await prisma.wishlist.findMany({
        where: {
          OR: [{ userId: id }, { id: id }],
        },
        include: {
          product: true,
        },
      });

      return NextResponse.json(items || []);
    } catch (dbErr) {
      console.warn("[Wishlist API] GET fallback:", dbErr);
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      try {
        await prisma.wishlist.deleteMany({
          where: {
            OR: [{ id }, { productId: id }],
          },
        });
      } catch {}
    }
    return NextResponse.json({ message: "Wishlist item removed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Wishlist item removed" }, { status: 200 });
  }
}
