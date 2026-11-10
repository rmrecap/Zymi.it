import { NextRequest, NextResponse } from "next/server";
import { getAmazonProductBySlugOrAsin, TOP_AMAZON_PRODUCTS } from "@/lib/amazon-top-products";
import amazonCreators from "@/lib/amazon-creators";
import { buildAffiliateUrl } from "@/lib/affiliate-engine";
import prisma from "@/utils/db";

/**
 * Automated Amazon Product Page Generator API
 * Generates instant product details and permanent product entries for high-demand items.
 * Usage:
 *   GET /api/affiliate/generate?asin=B004RDH75O
 *   POST /api/affiliate/generate (body: { asin: "B004RDH75O", saveToDb: true })
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const asin = searchParams.get("asin") || searchParams.get("query");

    if (!asin) {
      return NextResponse.json({
        success: true,
        message: "Automated Amazon Product Catalog Engine Active",
        availableTopProducts: TOP_AMAZON_PRODUCTS.length,
        items: TOP_AMAZON_PRODUCTS.map((p) => ({
          asin: p.asin,
          title: p.title,
          slug: p.slug,
          badge: p.badge,
          productUrl: `/product/${p.slug}`,
        })),
      });
    }

    const product = getAmazonProductBySlugOrAsin(asin);

    if (!product) {
      return NextResponse.json(
        { error: "Could not generate product page for given ASIN/query" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
      pageUrl: `/product/${product.slug}`,
      directAffiliateUrl: product.affiliateUrl,
      partnerTag: "harperfinds20-20",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate Amazon product" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const asin = (body.asin || "").trim().toUpperCase();

    if (!asin || asin.length !== 10) {
      return NextResponse.json(
        { error: "A valid 10-character Amazon ASIN is required" },
        { status: 400 }
      );
    }

    // Resolve or generate product
    const product = getAmazonProductBySlugOrAsin(asin);

    if (!product) {
      return NextResponse.json(
        { error: "Failed to generate product from ASIN" },
        { status: 400 }
      );
    }

    // If database is available, optionally save or update
    let dbSaved = false;
    try {
      const existing = await prisma.product.findFirst({
        where: { asin: product.asin },
      });

      const category = await prisma.category.findFirst();
      const merchant = await prisma.merchant.findFirst();

      if (!existing && category && merchant) {
        await prisma.product.create({
          data: {
            title: product.title,
            slug: product.slug,
            price: Math.round(product.price),
            rating: Math.round(product.rating),
            description: product.features.join("\n"),
            mainImage: product.mainImage,
            manufacturer: product.manufacturer,
            inStock: product.inStock,
            productType: "AFFILIATE_AMAZON",
            asin: product.asin,
            affiliateUrl: product.affiliateUrl,
            categoryId: category.id,
            merchantId: merchant.id,
          },
        });
        dbSaved = true;
      }
    } catch {
      // Prisma offline or schema sync in progress; in-memory dynamic fallback handles it
      dbSaved = false;
    }

    return NextResponse.json({
      success: true,
      message: `Automated product page successfully generated for ASIN ${asin}`,
      dbSaved,
      product,
      pageUrl: `/product/${product.slug}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
