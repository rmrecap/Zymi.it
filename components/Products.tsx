import React from "react";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";
import prisma from "@/utils/db";
import { getLiveCanbosoProducts } from "@/lib/canboso-api";
import { TOP_AMAZON_PRODUCTS } from "@/lib/amazon-top-products";

const DEFAULT_FALLBACK_PRODUCTS = [
  {
    id: "prod-b2b-1",
    title: "Apparel Emporium Heavyweight 240 GSM Combed Cotton T-Shirt",
    price: 4.85,
    rating: 5,
    description: "Export-grade 100% combed cotton jersey manufactured in Bangladesh. Low MOQ, OEKO-TEX certified.",
    mainImage: "category_knit.svg",
    slug: "apparel-emporium-heavyweight-tshirt",
    manufacturer: "Apparel Emporium",
    inStock: 1,
    productType: "B2B_GARMENT",
    moq: 500,
    leadTime: "45-60 days",
  },
  {
    id: "prod-aff-1",
    title: "Commercial 15-Needle Industrial Embroidery Machine",
    price: 3899.0,
    rating: 5,
    description: "High-speed multi-head embroidery unit with automatic thread trimmer and touch screen computer.",
    mainImage: "product_headphones.svg",
    slug: "commercial-15-needle-embroidery-machine",
    manufacturer: "Industrial RMG",
    inStock: 1,
    productType: "AFFILIATE_AMAZON",
    asin: "B08N5WRWNW",
    affiliateUrl: "https://www.amazon.com/dp/B08N5WRWNW?tag=harperfinds20-20",
  },
  {
    id: "prod-dig-1",
    title: "Ultimate AI Prompt Pack for Fashion & Design Brands",
    price: 19.99,
    rating: 5,
    description: "Over 5,000+ curated Midjourney, Stable Diffusion, and ChatGPT marketing prompts for apparel founders.",
    mainImage: "digital_ai_prompts.svg",
    slug: "ultimate-ai-prompt-pack",
    manufacturer: "ZYMI Digital",
    inStock: 1,
    productType: "DIGITAL_DOWNLOAD",
    digitalFormat: "ZIP (PDF + Notion Dashboard)",
  },
  {
    id: "prod-drop-1",
    title: "Oversized Streetwear Fleece Hoodie (400 GSM)",
    price: 38.0,
    rating: 5,
    description: "Premium French terry heavyweight hoodie. Double-layered hood, drop-shoulder relaxed fit.",
    mainImage: "category_sweater.svg",
    slug: "oversized-streetwear-fleece-hoodie",
    manufacturer: "ZYMI Sourcing",
    inStock: 1,
    productType: "DROPSHIP",
  },
  {
    id: "prod-aff-2",
    title: "Textile Digital Fabric GSM Circular Cutter & Balance",
    price: 289.0,
    rating: 5,
    description: "High precision 100 sq cm round sampler for knitted and woven fabric GSM measurement.",
    mainImage: "tool_fabric_roll.svg",
    slug: "textile-fabric-gsm-circular-cutter",
    manufacturer: "Precision Textile Instruments",
    inStock: 1,
    productType: "AFFILIATE_AMAZON",
    asin: "B002KCK92I",
    affiliateUrl: "https://www.amazon.com/dp/B002KCK92I?tag=harperfinds20-20",
  },
  {
    id: "prod-dig-2",
    title: "Complete Tech Pack Template Bundle (AI + DXF + PDF)",
    price: 24.99,
    rating: 5,
    description: "Industry-standard spec sheets, graded measurement tables, and CAD flats for hoodies, tees, and joggers.",
    mainImage: "digital_design_templates.svg",
    slug: "complete-tech-pack-template-bundle",
    manufacturer: "Apparel Emporium Design Studio",
    inStock: 1,
    productType: "DIGITAL_DOWNLOAD",
    digitalFormat: "ZIP (AI + DXF + PDF)",
  },
];

const Products = async ({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // getting page number from searchParams
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const typeFilter =
    searchParams?.type && searchParams.type !== "ALL"
      ? String(searchParams.type)
      : undefined;

  // setting stockMode
  let stockMode = "lte";
  const inStockNum = searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = searchParams?.outOfStock === "true" ? 1 : 0;

  if (inStockNum === 1 && outOfStockNum === 0) {
    stockMode = "equals";
  }
  if (inStockNum === 0 && outOfStockNum === 1) {
    stockMode = "lt";
  }
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  let products: any[] = [];

  try {
    // 1. Try fetching via API client (if Express is running on port 3001)
    const data = await apiClient.get(
      `/api/products?filters[price][$lte]=${searchParams?.price || 3000
      }&filters[rating][$gte]=${Number(searchParams?.rating) || 0
      }&filters[inStock][$${stockMode}]=1&${params?.slug && params.slug.length > 0
        ? `filters[category][$equals]=${params.slug[0]}&`
        : ""
      }sort=${searchParams?.sort || "defaultSort"}&page=${page}`
    );

    if (data.ok) {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch {
    products = [];
  }

  // 2. Fetch live Canboso Digital Products if viewing digital downloads or full catalog
  let liveDigitalProducts: any[] = [];
  if (!typeFilter || typeFilter === "DIGITAL_DOWNLOAD") {
    try {
      const canbosoItems = await getLiveCanbosoProducts();
      if (canbosoItems && canbosoItems.length > 0) {
        liveDigitalProducts = canbosoItems.map((c) => ({
          id: c.id,
          title: c.title,
          price: c.price,
          costPrice: c.costPrice,
          originalPrice: c.originalPrice,
          rating: c.rating,
          description: c.description,
          mainImage: c.image,
          slug: c.slug,
          manufacturer: c.brand,
          inStock: c.inStock,
          stock: c.stock,
          sold: c.sold,
          productType: "DIGITAL_DOWNLOAD" as const,
          digitalFormat: c.digitalType,
          badge: c.badge,
        }));
      }
    } catch {
      liveDigitalProducts = [];
    }
  }

  // 3. Fallback to direct Prisma query if API did not return items
  if (products.length === 0) {
    try {
      products = await prisma.product.findMany({
        where: typeFilter ? { productType: typeFilter as any } : undefined,
        take: 24,
      });
    } catch {
      // Database not reachable, use rich fallback products
      products = DEFAULT_FALLBACK_PRODUCTS;
    }
  }

  // 4. If database was empty or not populated, use default fallback
  if (products.length === 0) {
    products = DEFAULT_FALLBACK_PRODUCTS;
  }

  // 5. Integrate Live Canboso digital products & Curated Amazon Best Sellers into collection
  if (typeFilter === "DIGITAL_DOWNLOAD") {
    if (liveDigitalProducts.length > 0) {
      products = liveDigitalProducts;
    } else {
      products = DEFAULT_FALLBACK_PRODUCTS.filter((p) => p.productType === "DIGITAL_DOWNLOAD");
    }
  } else if (typeFilter === "AFFILIATE_AMAZON") {
    // Seamlessly deliver high-demand, top-searched Amazon products
    products = TOP_AMAZON_PRODUCTS;
  } else if (!typeFilter) {
    // For 'All Collections', merge top live digital products & Amazon top items with catalog
    const topDigital = liveDigitalProducts.slice(0, 8);
    const topAmazon = TOP_AMAZON_PRODUCTS.slice(0, 6);
    const baseItems = products.filter((p: any) => p.productType !== "DIGITAL_DOWNLOAD" && p.productType !== "AFFILIATE_AMAZON");
    products = [...baseItems, ...topAmazon, ...topDigital];
  } else {
    // Other specific filters (e.g. DROPSHIP, B2B_GARMENT)
    const filtered = products.filter((p: any) => p.productType === typeFilter);
    if (filtered.length > 0) {
      products = filtered;
    } else {
      products = DEFAULT_FALLBACK_PRODUCTS.filter((p) => p.productType === typeFilter);
    }
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 w-full">
        <p className="text-base font-bold text-slate-800 dark:text-slate-200">
          No items found in this collection.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Try switching filter tabs or adjusting your price and rating filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-6">
      {products.map((product: any) => (
        <ProductItem key={product.id} product={product} color="black" />
      ))}
    </div>
  );
};

export default Products;
