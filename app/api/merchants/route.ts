import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

const fallbackMerchants = [
  {
    id: "merchant-ael",
    name: "Apparel Emporium",
    description: "Export garments & RMG manufacturing direct supply",
    email: "contact@aelbd.net",
    phone: "+880 1700-000000",
    address: "Dhaka, Bangladesh",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    const merchants = await prisma.merchant.findMany({
      orderBy: { name: "asc" },
      include: { products: true },
    });

    if (merchants && merchants.length > 0) {
      return NextResponse.json(merchants);
    }
  } catch (error) {
    console.warn("[Merchants API] Database unavailable, using fallback:", error);
  }

  return NextResponse.json(fallbackMerchants);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, address, description, status = "ACTIVE" } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Merchant name is required" }, { status: 400 });
    }

    try {
      const merchant = await prisma.merchant.create({
        data: {
          name: name.trim(),
          email: email || null,
          phone: phone || null,
          address: address || null,
          description: description || null,
          status,
        },
      });
      return NextResponse.json(merchant, { status: 201 });
    } catch (dbErr) {
      console.warn("[Merchants API] DB create fallback:", dbErr);
      return NextResponse.json(
        {
          id: `merchant-${Date.now()}`,
          name: name.trim(),
          email,
          phone,
          address,
          description,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create merchant" }, { status: 500 });
  }
}
