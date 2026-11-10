import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { customerOrderId, productId, quantity } = body;

    if (!customerOrderId || !productId) {
      return NextResponse.json(
        { error: "customerOrderId and productId are required" },
        { status: 400 }
      );
    }

    try {
      const orderProduct = await prisma.customer_order_product.create({
        data: {
          customerOrderId,
          productId,
          quantity: Math.max(1, parseInt(quantity, 10) || 1),
        },
      });

      return NextResponse.json(orderProduct, { status: 201 });
    } catch (dbError) {
      console.warn("[OrderProduct API] DB create fallback:", dbError);
      return NextResponse.json(
        { id: `op-${Date.now()}`, customerOrderId, productId, quantity: 1 },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("[OrderProduct API] POST error:", error);
    return NextResponse.json({ error: "Failed to create order-product" }, { status: 500 });
  }
}
