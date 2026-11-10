"use client";

import { useEffect } from "react";

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    try {
      const nav = navigator as any;

      // Ensure navigator.modelContext exists
      if (!nav.modelContext) {
        const toolsMap = new Map();
        nav.modelContext = {
          tools: toolsMap,
          registerTool: (tool: any) => {
            toolsMap.set(tool.name, tool);
            if (typeof window.dispatchEvent === "function") {
              window.dispatchEvent(
                new CustomEvent("modelContext:toolRegistered", { detail: tool })
              );
            }
          },
          getTools: () => Array.from(toolsMap.values()),
          executeTool: (name: string, params: any) => {
            const tool = toolsMap.get(name);
            if (!tool) throw new Error(`Tool not found: ${name}`);
            return tool.execute(params);
          },
        };
      }

      if (typeof nav.modelContext.registerTool === "function") {
        // Tool 1: Search Products
        nav.modelContext.registerTool({
          name: "search_products",
          description:
            "Search ZYMI Global catalog for digital downloads, B2B apparel, and commercial equipment.",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query or product keyword" },
            },
            required: ["query"],
          },
          execute: async ({ query }: { query: string }) => {
            const targetUrl = `/search?search=${encodeURIComponent(query || "")}`;
            window.location.href = targetUrl;
            return { success: true, url: targetUrl };
          },
        });

        // Tool 2: Calculate Fabric Consumption
        nav.modelContext.registerTool({
          name: "calculate_fabric_consumption",
          description:
            "Calculate knit fabric consumption in kilograms per dozen for t-shirts, polos, or hoodies.",
          inputSchema: {
            type: "object",
            properties: {
              bodyLengthCm: { type: "number", description: "Garment length in cm (e.g. 70)" },
              halfChestCm: { type: "number", description: "Half chest width in cm (e.g. 52)" },
              sleeveLengthCm: { type: "number", description: "Sleeve length in cm (e.g. 20)" },
              gsm: { type: "number", description: "Fabric GSM weight (e.g. 180)" },
              wastagePercent: { type: "number", description: "Wastage allowance % (e.g. 7)" },
            },
            required: ["bodyLengthCm", "halfChestCm", "gsm"],
          },
          execute: async ({
            bodyLengthCm = 70,
            halfChestCm = 52,
            sleeveLengthCm = 20,
            gsm = 180,
            wastagePercent = 7,
          }: any) => {
            const lengthWithSleeve = Number(bodyLengthCm) + Number(sleeveLengthCm) + 6;
            const width = Number(halfChestCm) + 4;
            const consumption =
              ((lengthWithSleeve * width * 2 * Number(gsm) * 12) / 10000000) *
              (1 + Number(wastagePercent) / 100);
            return {
              consumptionKgPerDozen: Number(consumption.toFixed(2)),
              unit: "kg/dozen",
              formula: "((Length + Sleeve + 6) * (Chest + 4) * 2 * GSM * 12) / 10,000,000 * (1 + wastage)",
            };
          },
        });

        // Tool 3: Get B2B Sourcing Quote
        nav.modelContext.registerTool({
          name: "get_b2b_sourcing_quote",
          description:
            "Get Apparel Emporium direct factory FOB price estimations for bulk garment manufacturing.",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: ["t-shirt", "hoodie", "polo", "denim"],
                description: "Garment category",
              },
              quantity: { type: "number", description: "Target order quantity" },
            },
            required: ["category"],
          },
          execute: async ({
            category = "t-shirt",
            quantity = 500,
          }: {
            category?: string;
            quantity?: number;
          }) => {
            const pricing: Record<string, { min: number; max: number; moq: number; leadTime: string }> = {
              "t-shirt": { min: 2.80, max: 4.50, moq: 500, leadTime: "25-35 days" },
              hoodie: { min: 7.50, max: 11.20, moq: 300, leadTime: "30-40 days" },
              polo: { min: 4.20, max: 6.80, moq: 500, leadTime: "25-35 days" },
              denim: { min: 8.90, max: 14.50, moq: 500, leadTime: "35-45 days" },
            };
            const item = pricing[category.toLowerCase()] || pricing["t-shirt"];
            return {
              manufacturer: "Apparel Emporium (aelbd.net)",
              category,
              quantity,
              estimatedFobUsd: `$${item.min} - $${item.max}`,
              moq: item.moq,
              leadTime: item.leadTime,
              certifications: ["OEKO-TEX Standard 100", "BSCI", "Sedex SMETA", "GOTS"],
              rfqPortalUrl: "https://zymi.it/b2b-apparel",
            };
          },
        });

        // Tool 4: Get Pricing Catalog
        nav.modelContext.registerTool({
          name: "get_pricing_catalog",
          description:
            "Retrieve official transparent pricing for digital tools, cloud family slots, and manufacturing.",
          inputSchema: {
            type: "object",
            properties: {},
          },
          execute: async () => {
            return {
              digitalAssets: [
                { item: "Canva Pro (1 Month)", price: "$0.80" },
                { item: "Google AI Pro Slot + 5TB (1 Month)", price: "$1.74" },
                { item: "Gemini Pro Slot + 5TB (6 Months)", price: "$4.19" },
                { item: "Complete RMG Tech Pack CAD Bundle", price: "$9.99" },
              ],
              b2bApparelFob: [
                { item: "100% Combed Cotton T-Shirt", priceRange: "$2.80 - $4.50" },
                { item: "Heavyweight Streetwear Hoodie", priceRange: "$7.50 - $11.20" },
              ],
              pricingUrl: "https://zymi.it/pricing",
            };
          },
        });
      }
    } catch (err) {
      console.warn("[WebMCP] Registration note:", err);
    }
  }, []);

  return null;
}
