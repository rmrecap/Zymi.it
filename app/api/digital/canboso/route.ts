import { NextResponse } from "next/server";
import { getLiveCanbosoProducts, getCanbosoBalance } from "@/lib/canboso-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const balanceOnly = searchParams.get("balance") === "true";

    if (balanceOnly) {
      const balance = await getCanbosoBalance();
      return NextResponse.json(balance);
    }

    let products = await getLiveCanbosoProducts();

    if (category && category !== "ALL") {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const query = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (limit && limit > 0) {
      products = products.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      profitMargin: "50%",
      products,
    });
  } catch (error: any) {
    console.error("Error in Canboso digital products API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live digital products" },
      { status: 500 }
    );
  }
}

