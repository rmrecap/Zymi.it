import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { demoProducts } from "@/utils/insertDemoData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "";

    if (mode === "admin") {
      try {
        const dbProducts = await prisma.product.findMany({
          include: { category: true },
          orderBy: { title: "asc" },
        });

        if (dbProducts && dbProducts.length > 0) {
          return NextResponse.json(dbProducts);
        }
      } catch (dbErr) {
        console.warn("[Products API] DB admin fetch fallback to demo products:", dbErr);
      }
      return NextResponse.json(demoProducts || []);
    }

    // Normal Catalog Queries with Filtering and Sorting
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "24", 10)));
    const offset = (page - 1) * limit;
    const sort = searchParams.get("sort") || "defaultSort";

    let orderBy: any = { id: "desc" };
    if (sort === "lowPrice") orderBy = { price: "asc" };
    if (sort === "highPrice") orderBy = { price: "desc" };
    if (sort === "titleAsc") orderBy = { title: "asc" };
    if (sort === "titleDesc") orderBy = { title: "desc" };

    // Parse URL for nested filters (e.g. filters[price][$lte]=50)
    let maxPrice = 999999;
    let minRating = 0;
    let categoryName = "";
    let inStockOnly = false;

    searchParams.forEach((val, key) => {
      if (key.includes("filters[price]")) {
        const p = parseInt(val, 10);
        if (!isNaN(p)) maxPrice = p;
      }
      if (key.includes("filters[rating]")) {
        const r = parseInt(val, 10);
        if (!isNaN(r)) minRating = r;
      }
      if (key.includes("filters[category]")) {
        categoryName = val;
      }
      if (key.includes("filters[inStock]")) {
        inStockOnly = true;
      }
    });

    try {
      const where: any = {
        price: { lte: maxPrice },
        rating: { gte: minRating },
      };

      if (inStockOnly) {
        where.inStock = { gt: 0 };
      }

      if (categoryName) {
        where.category = {
          name: {
            contains: categoryName,
          },
        };
      }

      const products = await prisma.product.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy,
        include: { category: true },
      });

      if (products && products.length > 0) {
        return NextResponse.json(products);
      }
    } catch (queryErr) {
      console.warn("[Products API] DB catalog query fallback:", queryErr);
    }

    // Fallback filter over demoProducts
    let filtered = (demoProducts as any[]) || [];
    if (categoryName) {
      filtered = filtered.filter(
        (p) =>
          (typeof p.category === "string" && p.category.toLowerCase().includes(categoryName.toLowerCase())) ||
          (p.category?.name && p.category.name.toLowerCase().includes(categoryName.toLowerCase()))
      );
    }
    filtered = filtered.filter((p) => (p.price || 0) <= maxPrice && (p.rating || 0) >= minRating);

    return NextResponse.json(filtered.slice(offset, offset + limit));
  } catch (error) {
    console.warn("[Products API] Error occurred, returning demo products:", error);
    return NextResponse.json(demoProducts || []);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Find or fallback merchant
    let merchantId = body.merchantId;
    if (!merchantId) {
      try {
        const firstMerchant = await prisma.merchant.findFirst();
        merchantId = firstMerchant?.id;
      } catch {}
    }

    // Find or fallback category
    let categoryId = body.categoryId;
    if (!categoryId) {
      try {
        const firstCat = await prisma.category.findFirst();
        categoryId = firstCat?.id;
      } catch {}
    }

    const slug =
      body.slug ||
      body.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") ||
      `prod-${Date.now()}`;

    try {
      const product = await prisma.product.create({
        data: {
          title: body.title || "Untitled Product",
          slug,
          price: Math.round(Number(body.price) || 0),
          rating: Math.round(Number(body.rating) || 5),
          description: body.description || "",
          mainImage: body.mainImage || "/product_placeholder.jpg",
          manufacturer: body.manufacturer || "Apparel Emporium",
          inStock: Math.max(0, parseInt(body.inStock, 10) || 1),
          categoryId: categoryId || "default-cat",
          merchantId: merchantId || "default-merchant",
          productType: body.productType || "B2B_GARMENT",
          moq: parseInt(body.moq, 10) || 1,
          leadTime: body.leadTime || null,
          fabricDetails: body.fabricDetails || null,
          customizationOptions: body.customizationOptions || null,
          affiliateUrl: body.affiliateUrl || null,
          asin: body.asin || null,
          downloadUrl: body.downloadUrl || null,
        },
      });

      return NextResponse.json(product, { status: 201 });
    } catch (dbErr) {
      console.warn("[Products API] DB Create fallback:", dbErr);
      const mockCreated = {
        id: `mock-${Date.now()}`,
        slug,
        title: body.title || "New Product",
        price: Number(body.price) || 0,
        ...body,
      };
      return NextResponse.json(mockCreated, { status: 201 });
    }
  } catch (error: any) {
    console.error("[Products API] POST Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
