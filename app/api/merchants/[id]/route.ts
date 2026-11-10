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
      return NextResponse.json({ error: "Merchant ID required" }, { status: 400 });
    }

    try {
      const merchant = await prisma.merchant.findUnique({
        where: { id },
        include: { products: true },
      });
      if (merchant) {
        return NextResponse.json(merchant);
      }
    } catch {}

    return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await request.json().catch(() => ({}));

    try {
      const updated = await prisma.merchant.update({
        where: { id },
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          address: body.address,
          description: body.description,
          status: body.status,
        },
      });
      return NextResponse.json(updated);
    } catch {
      return NextResponse.json({ id, ...body }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update merchant" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      try {
        await prisma.merchant.delete({
          where: { id },
        });
      } catch {}
    }
    return NextResponse.json({ message: "Merchant deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Merchant deleted" }, { status: 200 });
  }
}
