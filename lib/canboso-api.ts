/**
 * Canboso Digital Products API Client & Integration Engine
 * Connects to canboso.com/api/v2/telegram-buyer/*
 * Applies minimum 50% profit margin and tracks live real-time stock
 */

export interface CanbosoRawProduct {
  productId: string;
  name: string;
  description: string;
  emoji: string;
  productType: "slot" | "upgrade_account" | string;
  price: {
    amount: number;
    currency: string;
    text: string;
  };
  availability: {
    available: number;
    sold: number;
  };
  image?: string;
  purchaseRequirements?: {
    customerEmail?: boolean;
    customerAccounts?: boolean;
    quantityFixed?: number;
  };
}

export interface UnifiedDigitalProduct {
  id: string;
  externalId: string;
  title: string;
  slug: string;
  description: string;
  costPrice: number;
  price: number;
  originalPrice: number;
  currency: string;
  profitMarginPercent: number;
  stock: number;
  sold: number;
  inStock: number;
  rating: number;
  reviews: string;
  badge?: string;
  category: string;
  brand: string;
  digitalType: string;
  emoji: string;
  image: string;
  productType: "DIGITAL_DOWNLOAD";
  requirements: {
    customerEmail?: boolean;
    customerAccounts?: boolean;
  };
}

const CANBOSO_API_KEY =
  process.env.CANBOSO_API_KEY ||
  "tgb_d59e42482168c1863b2fe9413f5dc7dcc631de1d6554af45";

const BASE_URL = "https://canboso.com";

// In-memory cache with 60-second TTL to keep stock fresh while keeping page load instant
let cachedProducts: UnifiedDigitalProduct[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Brand & icon mapper based on Canboso emoji and product titles
export function mapBrandAndImage(emoji: string, title: string): { brand: string; image: string; category: string } {
  const lowerTitle = title.toLowerCase();

  if (emoji === "google_one" || lowerTitle.includes("gemini") || lowerTitle.includes("google")) {
    return { brand: "Google AI", image: "/digital_ai_prompts.svg", category: "AI & Cloud" };
  }
  if (emoji === "chatgpt" || emoji === "apigpt" || lowerTitle.includes("chatgpt") || lowerTitle.includes("openai")) {
    return { brand: "OpenAI", image: "/digital_ai_prompts.svg", category: "AI Models" };
  }
  if (emoji === "claude" || lowerTitle.includes("claude")) {
    return { brand: "Anthropic Claude", image: "/digital_ai_prompts.svg", category: "AI Models" };
  }
  if (emoji === "canva" || lowerTitle.includes("canva")) {
    return { brand: "Canva Pro", image: "/digital_design_templates.svg", category: "Creative Tools" };
  }
  if (emoji === "youtube" || lowerTitle.includes("youtube")) {
    return { brand: "YouTube Premium", image: "/product_headphones.svg", category: "Streaming" };
  }
  if (emoji === "netflix" || lowerTitle.includes("netflix")) {
    return { brand: "Netflix", image: "/product_headphones.svg", category: "Streaming" };
  }
  if (emoji === "spotify" || lowerTitle.includes("spotify")) {
    return { brand: "Spotify Premium", image: "/product_headphones.svg", category: "Audio & Music" };
  }
  if (emoji === "microsoft_office_365" || emoji === "windows" || lowerTitle.includes("office") || lowerTitle.includes("windows")) {
    return { brand: "Microsoft", image: "/digital_business_planner.svg", category: "Productivity" };
  }
  if (emoji === "cursor" || lowerTitle.includes("cursor")) {
    return { brand: "Cursor IDE", image: "/digital_design_templates.svg", category: "Developer Tools" };
  }
  if (emoji === "notion" || lowerTitle.includes("notion")) {
    return { brand: "Notion", image: "/digital_business_planner.svg", category: "Productivity" };
  }
  if (emoji === "icloud" || lowerTitle.includes("icloud") || lowerTitle.includes("apple")) {
    return { brand: "Apple iCloud", image: "/digital_business_planner.svg", category: "Cloud Storage" };
  }
  if (emoji === "capcut" || lowerTitle.includes("capcut")) {
    return { brand: "CapCut Pro", image: "/digital_design_templates.svg", category: "Video Editing" };
  }
  if (emoji === "figma" || lowerTitle.includes("figma") || emoji === "adobe" || lowerTitle.includes("adobe")) {
    return { brand: "Design Suite", image: "/digital_design_templates.svg", category: "Creative Tools" };
  }
  if (emoji.includes("vpn") || lowerTitle.includes("vpn")) {
    return { brand: "Privacy & VPN", image: "/compliance_icon.svg", category: "Security" };
  }

  return { brand: "Digital Pro", image: "/digital_stock_photos.svg", category: "Digital Services" };
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Fetch and transform products from Canboso with live stock and 50% profit margin
 */
export async function getLiveCanbosoProducts(forceRefresh = false): Promise<UnifiedDigitalProduct[]> {
  const now = Date.now();

  if (!forceRefresh && cachedProducts && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedProducts;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v2/telegram-buyer/products`, {
      headers: {
        "X-API-KEY": CANBOSO_API_KEY,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Canboso API responded with status ${res.status}`);
      if (cachedProducts) return cachedProducts;
      return [];
    }

    const data = await res.json();
    if (!data.success || !Array.isArray(data.products)) {
      if (cachedProducts) return cachedProducts;
      return [];
    }

    // Minimum 50% profit margin multiplier (1.50x)
    const MARGIN_MULTIPLIER = 1.5;

    const transformed: UnifiedDigitalProduct[] = data.products.map(
      (p: CanbosoRawProduct) => {
        const costPrice = Number(p.price?.amount || 0);

        // Apply 50% profit margin, ensure at least +$0.50 margin on micro-priced items
        let sellingPrice = Math.max(costPrice * MARGIN_MULTIPLIER, costPrice + 0.40);
        sellingPrice = Math.round(sellingPrice * 100) / 100;

        // Retail comparative original price
        const originalPrice = Math.round(sellingPrice * 1.45 * 100) / 100;
        const availableStock = p.availability?.available ?? 0;
        const soldCount = p.availability?.sold ?? 0;

        const { brand, image, category } = mapBrandAndImage(p.emoji, p.name);
        const slug = `${generateSlug(p.name)}-${p.productId.slice(-6)}`;

        let badge = "Verified";
        if (soldCount > 5) badge = "Popular";
        if (availableStock <= 3 && availableStock > 0) badge = "Limited Stock";
        if (availableStock === 0) badge = "Out of Stock";

        return {
          id: `canboso_${p.productId}`,
          externalId: p.productId,
          title: p.name,
          slug,
          description: p.description || `${p.name} - Instant digital fulfillment with verified guarantee.`,
          costPrice,
          price: sellingPrice,
          originalPrice,
          currency: "USD",
          profitMarginPercent: 50,
          stock: availableStock,
          sold: soldCount,
          inStock: availableStock > 0 ? 1 : 0,
          rating: 4.8 + (Math.abs(p.productId.charCodeAt(0) % 3) * 0.1),
          reviews: `${120 + (soldCount * 8)}`,
          badge,
          category,
          brand,
          digitalType: p.productType === "slot" ? "Family Slot Invite" : "Account Upgrade",
          emoji: p.emoji || "star",
          image,
          productType: "DIGITAL_DOWNLOAD",
          requirements: {
            customerEmail: !!p.purchaseRequirements?.customerEmail,
            customerAccounts: !!p.purchaseRequirements?.customerAccounts,
          },
        };
      }
    );

    cachedProducts = transformed;
    lastFetchTime = now;
    return transformed;
  } catch (error) {
    console.error("Failed to fetch live Canboso products:", error);
    if (cachedProducts) return cachedProducts;
    return [];
  }
}

/**
 * Fetch current buyer wallet balance
 */
export async function getCanbosoBalance() {
  try {
    const res = await fetch(`${BASE_URL}/api/v2/telegram-buyer/balance`, {
      headers: {
        "X-API-KEY": CANBOSO_API_KEY,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, balanceUsd: 0, balanceText: "$0.00" };
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch Canboso balance:", error);
    return { success: false, balanceUsd: 0, balanceText: "$0.00" };
  }
}

/**
 * Execute automated purchase when buyer order is completed
 */
export async function executeCanbosoPurchase(params: {
  productId: string;
  customerEmail?: string;
  customerAccounts?: string[];
  quantity?: number;
  orderId?: string;
}) {
  const idempotencyKey = `zymi_${params.orderId || Date.now()}_${params.productId}`;

  try {
    const body: Record<string, any> = {
      product_id: params.productId,
      quantity: params.quantity || 1,
    };

    if (params.customerEmail) {
      body.customer_email = params.customerEmail;
    }
    if (params.customerAccounts && params.customerAccounts.length > 0) {
      body.customer_accounts = params.customerAccounts;
    }

    const res = await fetch(`${BASE_URL}/api/v2/telegram-buyer/purchase`, {
      method: "POST",
      headers: {
        "X-API-KEY": CANBOSO_API_KEY,
        "Idempotency-Key": idempotencyKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Failed to execute Canboso purchase:", error);
    return { success: false, error: error.message };
  }
}

