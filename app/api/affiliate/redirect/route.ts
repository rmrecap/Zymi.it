import { NextRequest, NextResponse } from "next/server";
import { buildAffiliateUrl, getCountryFromHeaders } from "@/lib/affiliate-engine";
import context7Cache from "@/lib/context7-cache";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const asin = searchParams.get("asin");
    const targetUrl = searchParams.get("url");
    const productId = searchParams.get("productId");
    const explicitCountry = searchParams.get("country");

    if (!asin && !targetUrl) {
      return NextResponse.json(
        { error: "Missing asin or url parameter" },
        { status: 400 }
      );
    }

    // Determine country from query or geo-headers (Vercel, Cloudflare, AWS CloudFront)
    const detectedCountry = explicitCountry || getCountryFromHeaders(request.headers);

    const redirectUrl = buildAffiliateUrl(
      asin || targetUrl || "",
      detectedCountry,
      productId || undefined
    );

    // Track click count in Context7 cache for revenue & analytics dashboard
    const clickKey = `stats:affiliate_clicks:${productId || asin || "general"}`;
    const currentClicks = ((await context7Cache.get<number>(clickKey)) || 0) + 1;
    await context7Cache.set(clickKey, currentClicks, 86400 * 30); // 30-day retention

    // Track country-specific clicks
    const geoKey = `stats:affiliate_geo:${detectedCountry.toUpperCase()}`;
    const countryClicks = ((await context7Cache.get<number>(geoKey)) || 0) + 1;
    await context7Cache.set(geoKey, countryClicks, 86400 * 30);

    // Perform redirect with security and referrer headers
    return NextResponse.redirect(redirectUrl, {
      status: 307,
      headers: {
        "Referrer-Policy": "no-referrer-when-downgrade",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    return NextResponse.redirect("https://www.amazon.com", { status: 302 });
  }
}
