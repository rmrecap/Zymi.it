export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
  ShopTabs,
} from "@/components";
import React from "react";
import { sanitize } from "@/lib/sanitize";

export const metadata: Metadata = {
  title: "Shop All Collections | Apparel Emporium & Curated Gear",
  description:
    "Browse verified RMG apparel, industrial garment machinery, and digital design templates at ZYMI Global.",
  alternates: {
    canonical: "https://zymi.it/shop",
  },
};

// improve readabillity of category text, for example category text "smart-watches" will be "smart watches"
const improveCategoryText = (text: string): string => {
  if (text.indexOf("-") !== -1) {
    let textArray = text.split("-");

    return textArray.join(" ");
  } else {
    return text;
  }
};

const ShopPage = async ({ params, searchParams }: { params: Promise<{ slug?: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  // Await both params and searchParams
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ZYMI Commercial & Apparel Collections",
    url: "https://zymi.it/shop",
    description:
      "Browse verified RMG apparel, industrial machinery, and digital design templates at ZYMI Global.",
    mainEntity: {
      "@type": "ItemList",
      name: "Shop Catalog Items",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: "https://zymi.it/product/singer-heavy-duty-4452-sewing-machine",
          name: "SINGER Heavy Duty 4452 Sewing Machine",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: "https://zymi.it/product/google-ai-pro-slot-5tb",
          name: "Google AI Pro Slot + 5TB Cloud Storage",
        },
        {
          "@type": "ListItem",
          position: 3,
          url: "https://zymi.it/product/carhartt-heavyweight-hooded-sweatshirt",
          name: "Carhartt Men's Heavyweight Hooded Sweatshirt",
        },
      ],
    },
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <Breadcrumb />

        {/* 5 Skills UI Filter Tabs */}
        <ShopTabs />

        <div className="grid grid-cols-[220px_1fr] gap-x-8 max-md:grid-cols-1 max-md:gap-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm self-start">
            <Filters />
          </div>
          <div>
            <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-y-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                {awaitedParams?.slug && awaitedParams?.slug[0]?.length > 0
                  ? sanitize(improveCategoryText(awaitedParams?.slug[0]))
                  : "All Collections"}
              </h2>

              <SortBy />
            </div>
            <div className="border-b border-slate-200 dark:border-slate-800 mb-6"></div>
            <Products params={awaitedParams} searchParams={awaitedSearchParams} />
            <div className="mt-8">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
