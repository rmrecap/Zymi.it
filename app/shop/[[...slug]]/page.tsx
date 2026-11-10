export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200">
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
