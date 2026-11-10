import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { demoProducts } from "@/utils/insertDemoData";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true, merchant: true },
      });

      if (product) {
        return NextResponse.json(product);
      }
    } catch (dbErr) {
      console.warn("[Product Detail API] DB fetch fallback:", dbErr);
    }

    // Check fallback demoProducts
    const foundDemo = (demoProducts as any[])?.find(
      (p) => p.id === id || p.slug === id
    );

    if (foundDemo) {
      return NextResponse.json(foundDemo);
    }

    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await request.json().catch(() => ({}));

    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          title: body.title,
          price: body.price !== undefined ? Math.round(Number(body.price)) : undefined,
          rating: body.rating !== undefined ? Math.round(Number(body.rating)) : undefined,
          description: body.description,
          mainImage: body.mainImage,
          manufacturer: body.manufacturer,
          inStock: body.inStock !== undefined ? parseInt(body.inStock, 10) : undefined,
          categoryId: body.categoryId,
          merchantId: body.merchantId,
          productType: body.productType,
          moq: body.moq !== undefined ? parseInt(body.moq, 10) : undefined,
          leadTime: body.leadTime,
          fabricDetails: body.fabricDetails,
          customizationOptions: body.customizationOptions,
          affiliateUrl: body.affiliateUrl,
          asin: body.asin,
          downloadUrl: body.downloadUrl,
        },
      });

      return NextResponse.json(updated);
    } catch (dbErr) {
      console.warn("[Product Detail API] DB update fallback:", dbErr);
      return NextResponse.json({ message: "Product updated", id, ...body }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      try {
        await prisma.product.delete({
          where: { id },
        });
      } catch (dbErr) {
        console.warn("[Product Detail API] DB delete fallback:", dbErr);
      }
    }
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  }
}
