import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

const fallbackCategories = [
  { id: "cat-knit", name: "Circular Knitwear" },
  { id: "cat-sweater", name: "Flat Knit Sweaters" },
  { id: "cat-denim", name: "Denim & Chinos" },
  { id: "cat-active", name: "Activewear" },
  { id: "cat-organic", name: "Organic & Sustainable RMG" },
  { id: "cat-techpack", name: "Tech Packs & Digital Specs" },
];

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (categories && categories.length > 0) {
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.warn("[Categories API] Database unavailable, using fallback categories:", error);
  }

  return NextResponse.json(fallbackCategories);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = (body.name || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    try {
      const category = await prisma.category.create({
        data: { name },
      });
      return NextResponse.json(category, { status: 201 });
    } catch (dbErr) {
      console.warn("[Categories API] DB create fallback:", dbErr);
      return NextResponse.json(
        { id: `cat-${Date.now()}`, name },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
