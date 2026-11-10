/**
 * Model Context Protocol (MCP) Server Card (SEP-1649)
 * Specification: https://modelcontextprotocol.io
 */

export const mcpServerCard = {
  $schema: "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  name: "zymi-rmg-hub",
  displayName: "ZYMI Global & Apparel Emporium RMG Hub",
  description:
    "Official MCP Server providing AI agents with real-time apparel manufacturing quotes, textile engineering calculators (fabric consumption, GSM costing, yarn count), and digital asset catalog access.",
  version: "1.0.0",
  homepage: "https://zymi.it",
  documentation: "https://zymi.it/llms.txt",
  endpoint: "https://zymi.it/api/mcp",
  endpoints: [
    {
      transport: "http",
      url: "https://zymi.it/api/mcp",
    },
    {
      transport: "sse",
      url: "https://zymi.it/api/mcp",
    },
  ],
  transport: "http",
  capabilities: {
    tools: {
      listChanged: false,
    },
    resources: {
      subscribe: false,
      listChanged: false,
    },
    prompts: {
      listChanged: false,
    },
  },
  tools: [
    {
      name: "search_products",
      description:
        "Search ZYMI Global catalog for digital downloads, B2B apparel, and commercial equipment.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keyword or item name",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "calculate_fabric_consumption",
      description:
        "Calculate knit fabric consumption in kilograms per dozen for t-shirts, polos, or hoodies.",
      inputSchema: {
        type: "object",
        properties: {
          bodyLengthCm: { type: "number", description: "Garment length in cm (e.g. 70)" },
          halfChestCm: { type: "number", description: "Half chest width in cm (e.g. 52)" },
          sleeveLengthCm: { type: "number", description: "Sleeve length in cm (e.g. 20)" },
          gsm: { type: "number", description: "Fabric weight in GSM (e.g. 180)" },
          wastagePercent: { type: "number", description: "Wastage allowance % (default 7)" },
        },
        required: ["bodyLengthCm", "halfChestCm", "gsm"],
      },
    },
    {
      name: "calculate_gsm_costing",
      description:
        "Calculate fabric yard yield and cost per linear yard from fabric width and GSM.",
      inputSchema: {
        type: "object",
        properties: {
          widthInches: { type: "number", description: "Fabric width in inches (e.g. 60)" },
          gsm: { type: "number", description: "Fabric GSM weight (e.g. 200)" },
          yarnPricePerKg: { type: "number", description: "Yarn price in USD per kg (e.g. 4.50)" },
        },
        required: ["widthInches", "gsm"],
      },
    },
    {
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
          quantity: {
            type: "number",
            description: "Target order quantity in units",
          },
        },
        required: ["category"],
      },
    },
    {
      name: "get_pricing_catalog",
      description:
        "Retrieve official transparent pricing for digital tools, cloud family slots, and manufacturing.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
  contact: {
    name: "ZYMI Engineering & Export Desk",
    email: "contact@zymi.it",
    url: "https://zymi.it/contact",
  },
  license: "MIT",
};
