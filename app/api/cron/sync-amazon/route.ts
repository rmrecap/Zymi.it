import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import amazonCreators from "@/lib/amazon-creators";
import context7Cache from "@/lib/context7-cache";

export async function GET(request: NextRequest) {
  try {
    // 1. VibeSec Security Rule: Validate CRON_SECRET to prevent unauthorized invocations
    const expectedSecret = process.env.CRON_SECRET || "zymi-amazon-cron-secret-2026";
    const authHeader = request.headers.get("authorization");
    const cronSecretHeader = request.headers.get("x-cron-secret");
    const urlSecret = request.nextUrl.searchParams.get("secret");

    const providedSecret =
      (authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null) ||
      cronSecretHeader ||
      urlSecret;

    if (!providedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing CRON_SECRET" },
        { status: 401 }
      );
    }

    // 2. Query all database products of type AFFILIATE_AMAZON that have an ASIN
    const affiliateProducts = await prisma.product.findMany({
      where: {
        productType: "AFFILIATE_AMAZON",
        asin: { not: null },
      },
      select: {
        id: true,
        asin: true,
        slug: true,
        title: true,
        price: true,
      },
    });

    if (affiliateProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No AFFILIATE_AMAZON products with ASIN found to sync.",
        syncedCount: 0,
        timestamp: new Date().toISOString(),
      });
    }

    const asinsToSync = affiliateProducts
      .map((p) => p.asin)
      .filter((asin): asin is string => Boolean(asin));

    // 3. Fetch real-time item details from Amazon Creators API
    const syncedItems = await amazonCreators.getItems(asinsToSync);

    const updateResults: { asin: string; title: string; price: number; updated: boolean }[] = [];

    // 4. Update product entries in database
    for (const item of syncedItems) {
      const dbProduct = affiliateProducts.find((p) => p.asin === item.asin);
      if (!dbProduct) continue;

      try {
        await prisma.product.update({
          where: { id: dbProduct.id },
          data: {
            price: item.price > 0 ? item.price : dbProduct.price,
            title: item.title || dbProduct.title,
            mainImage: item.mainImage || undefined,
            affiliateUrl: item.detailPageURL || undefined,
          },
        });

        updateResults.push({
          asin: item.asin,
          title: item.title,
          price: item.price,
          updated: true,
        });

        // Invalidate cached product data in Context7 cache
        await context7Cache.del(`product:${dbProduct.slug}`);
      } catch (err) {
        console.error(`Failed to update ASIN ${item.asin}:`, err);
        updateResults.push({
          asin: item.asin,
          title: item.title,
          price: item.price,
          updated: false,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${updateResults.filter((r) => r.updated).length} Amazon Affiliate products.`,
      syncedCount: updateResults.length,
      items: updateResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Amazon sync cron job error:", error);
    return NextResponse.json(
      { error: "Internal server error during Amazon sync", details: error.message },
      { status: 500 }
    );
  }
}

