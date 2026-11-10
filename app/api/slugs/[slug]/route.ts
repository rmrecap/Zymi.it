import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { demoProducts } from "@/utils/insertDemoData";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { slug } = await props.params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true, merchant: true },
      });

      if (product) {
        return NextResponse.json(product);
      }
    } catch (dbErr) {
      console.warn("[Slugs API] DB fetch fallback to demo products:", dbErr);
    }

    // Fallback: search demoProducts
    const foundDemo = (demoProducts as any[])?.find(
      (p) => p.slug === slug || p.id === slug
    );

    if (foundDemo) {
      return NextResponse.json(foundDemo);
    }

    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}
