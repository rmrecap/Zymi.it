import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { demoProducts } from "@/utils/insertDemoData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("query") || "").trim();

    if (!query) {
      return NextResponse.json([]);
    }

    try {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { manufacturer: { contains: query } },
          ],
        },
        include: { category: true },
      });

      if (products && products.length > 0) {
        return NextResponse.json(products);
      }
    } catch (dbErr) {
      console.warn("[Search API] DB search fallback to demo products:", dbErr);
    }

    // Fallback: search demoProducts
    const qLower = query.toLowerCase();
    const demoMatches = (demoProducts as any[])?.filter((p) => {
      const inTitle = p.title?.toLowerCase().includes(qLower);
      const inDesc = p.description?.toLowerCase().includes(qLower);
      const inCategory =
        typeof p.category === "string"
          ? p.category.toLowerCase().includes(qLower)
          : p.category?.name?.toLowerCase().includes(qLower);
      return inTitle || inDesc || inCategory;
    });

    return NextResponse.json(demoMatches || []);
  } catch (error) {
    return NextResponse.json([]);
  }
}
