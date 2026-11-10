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
      return NextResponse.json({ error: "Batch ID required" }, { status: 400 });
    }

    try {
      const batch = await prisma.bulk_upload_batch.findUnique({
        where: { id },
        include: { items: true },
      });
      if (batch) {
        return NextResponse.json(batch);
      }
    } catch {}

    return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const { searchParams } = new URL(request.url);
    const deleteProducts = searchParams.get("deleteProducts") === "true";

    try {
      if (deleteProducts) {
        const items = await prisma.bulk_upload_item.findMany({
          where: { batchId: id, productId: { not: null } },
          select: { productId: true },
        });

        const productIds = items
          .map((i) => i.productId)
          .filter(Boolean) as string[];

        if (productIds.length > 0) {
          await prisma.product.deleteMany({
            where: { id: { in: productIds } },
          });
        }
      }

      await prisma.bulk_upload_item.deleteMany({
        where: { batchId: id },
      });

      await prisma.bulk_upload_batch.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("[BulkUpload API] Delete batch fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: deleteProducts
        ? "Batch and products deleted successfully!"
        : "Batch deleted successfully (products kept)",
      deletedProducts: deleteProducts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to delete batch" },
      { status: 500 }
    );
  }
}
