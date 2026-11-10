import { NextResponse } from "next/server";
import { mcpServerCard } from "@/utils/mcpServerCard";

export async function GET() {
  return NextResponse.json(mcpServerCard, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, method, params } = body;

    // MCP JSON-RPC 2.0 Handler
    switch (method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: mcpServerCard.capabilities,
            serverInfo: {
              name: mcpServerCard.name,
              version: mcpServerCard.version,
            },
          },
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: mcpServerCard.tools,
          },
        });

      case "tools/call": {
        const { name, arguments: args } = params || {};

        if (name === "calculate_fabric_consumption") {
          const l = Number(args?.bodyLengthCm || 70) + Number(args?.sleeveLengthCm || 20) + 6;
          const w = Number(args?.halfChestCm || 52) + 4;
          const g = Number(args?.gsm || 180);
          const wast = Number(args?.wastagePercent || 7);
          const consumption = ((l * w * 2 * g * 12) / 10000000) * (1 + wast / 100);

          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    consumptionKgPerDozen: Number(consumption.toFixed(2)),
                    unit: "kg/dozen",
                    formula: "((Length + Sleeve + 6) * (Chest + 4) * 2 * GSM * 12) / 10,000,000 * (1 + wastage)",
                  }),
                },
              ],
            },
          });
        }

        if (name === "get_b2b_sourcing_quote") {
          const cat = String(args?.category || "t-shirt").toLowerCase();
          const pricing: Record<string, { min: number; max: number; moq: number; leadTime: string }> = {
            "t-shirt": { min: 2.80, max: 4.50, moq: 500, leadTime: "25-35 days" },
            hoodie: { min: 7.50, max: 11.20, moq: 300, leadTime: "30-40 days" },
            polo: { min: 4.20, max: 6.80, moq: 500, leadTime: "25-35 days" },
            denim: { min: 8.90, max: 14.50, moq: 500, leadTime: "35-45 days" },
          };
          const item = pricing[cat] || pricing["t-shirt"];

          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    manufacturer: "Apparel Emporium (aelbd.net)",
                    category: cat,
                    quantity: args?.quantity || 500,
                    estimatedFobUsd: `$${item.min} - $${item.max}`,
                    moq: item.moq,
                    leadTime: item.leadTime,
                    certifications: ["OEKO-TEX Standard 100", "BSCI", "Sedex SMETA", "GOTS"],
                  }),
                },
              ],
            },
          });
        }

        if (name === "get_pricing_catalog") {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    digitalAssets: [
                      { item: "Canva Pro", price: "$0.80" },
                      { item: "Google AI Pro Slot + 5TB", price: "$1.74" },
                      { item: "Gemini Pro Slot + 5TB", price: "$4.19" },
                      { item: "CAD Tech Pack Bundle", price: "$9.99" },
                    ],
                    b2bApparel: [
                      { item: "100% Combed Cotton T-Shirt", priceRange: "$2.80 - $4.50" },
                      { item: "Streetwear Fleece Hoodie", priceRange: "$7.50 - $11.20" },
                    ],
                    url: "https://zymi.it/pricing",
                  }),
                },
              ],
            },
          });
        }

        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: `Tool ${name} executed.` }],
          },
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
    }
  } catch (err: any) {
    return NextResponse.json(
      { jsonrpc: "2.0", error: { code: -32603, message: err?.message || "Internal error" } },
      { status: 500 }
    );
  }
}
