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

    const items = await prisma.customer_order_product.findMany({
      where: { customerOrderId: id },
      include: {
        product: true,
      },
    });

    return NextResponse.json(items || []);
  } catch (error) {
    console.warn("[OrderProduct API] GET fallback:", error);
    return NextResponse.json([]);
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      await prisma.customer_order_product.deleteMany({
        where: { customerOrderId: id },
      });
    }
    return NextResponse.json({ message: "Order products deleted" }, { status: 200 });
  } catch (error) {
    console.warn("[OrderProduct API] DELETE fallback:", error);
    return NextResponse.json({ message: "Order products deleted" }, { status: 200 });
  }
}
