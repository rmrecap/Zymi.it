"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaWrench,
  FaFire,
  FaArrowRight,
  FaStar,
  FaAmazon,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import context7Cache from "@/lib/context7-cache";

interface AffiliateDeal {
  asin: string;
  title: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice: number;
}

const DEFAULT_DEAL: AffiliateDeal = {
  asin: "B09XS7JWHH",
  title: "Sony WH-1000XM5 Wireless Headphones",
  image: "/product_headphones.svg",
  rating: 4.7,
  reviews: "12k",
  price: 299.99,
  originalPrice: 399.99,
};

export default function SplitUtilityDealsSection() {
  const [deal, setDeal] = useState<AffiliateDeal>(DEFAULT_DEAL);

  useEffect(() => {
    // Upstash Context7 caching layer for trending deals
    const loadDeals = async () => {
      const cached = await context7Cache.getCachedTrendingDeals();
      if (cached && cached.length > 0) {
        setDeal(cached[0]);
      } else {
        await context7Cache.cacheTrendingDeals([DEFAULT_DEAL]);
      }
    };
    loadDeals();
  }, []);

  // Amazon affiliate deal linking via geo-targeted redirect API with partner store tag: harperfinds20-20
  const affiliateDealUrl = `/api/affiliate/redirect?asin=${deal.asin}&tag=harperfinds20-20&productId=sony-wh1000xm5`;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto content-visibility-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: RMG Utility Tools (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-xl dark:shadow-black/40">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-sm">
                <FaWrench />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  RMG Utility Tools
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Free Tools for Your Business
                </p>
              </div>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition group"
            >
              <span>View All</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tools Grid: 2 Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tool 1: Fabric Consumption Calculator */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative w-full h-28 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 mb-3 flex items-center justify-center">
                <Image
                  src="/tool_fabric_roll.svg"
                  alt="Fabric Consumption Calculator"
                  width={140}
                  height={100}
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="space-y-1 mb-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  Fabric Consumption Calculator
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Calculate fabric yield &amp; kg/dozen usage.
                </p>
              </div>

              <Link
                href="/tools/fabric-consumption-calculator"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-xs"
              >
                <span>Open Tool</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>

            {/* Tool 2: GSM Estimation Tool */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative w-full h-28 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 mb-3 flex items-center justify-center">
                <Image
                  src="/tool_gsm_swatch.svg"
                  alt="GSM Estimation Tool Templates"
                  width={140}
                  height={100}
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="space-y-1 mb-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  GSM Estimation Tool Templates
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Estimate GSM for knitwear and costing.
                </p>
              </div>

              <Link
                href="/tools/gsm-costing-estimator"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-xs"
              >
                <span>Open Tool</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Curated Pro Gear (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-xl dark:shadow-black/40">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm">
                <FaFire />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Curated Pro Gear
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Best Verified Deals &amp; Equipment
                </p>
              </div>
            </div>

            <Link
              href="/shop?type=AFFILIATE_AMAZON"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition group"
            >
              <span>View All</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Deal Showcase Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-5 group">
            {/* Image */}
            <div className="relative w-36 h-36 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2">
              <Image
                src={deal.image}
                alt={deal.title}
                width={130}
                height={130}
                loading="lazy"
                className="object-contain group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm bg-[#FF9900] text-slate-950 font-black text-[9px] tracking-wider uppercase">
                Verified Pick
              </span>
            </div>

            {/* Info & Amazon Action */}
            <div className="space-y-2.5 w-full text-left">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                {deal.title}
              </h4>

              <div className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400 font-bold">
                <FaStar className="text-[11px]" />
                <span>{deal.rating}</span>
                <span className="text-slate-400 font-normal">({deal.reviews})</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ${deal.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  ${deal.originalPrice.toFixed(2)}
                </span>
              </div>

              {/* Amazon Affiliate Button */}
              <a
                href={affiliateDealUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white dark:text-slate-950 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
              >
                <FaAmazon className="text-sm" />
                <span>Check Verified Price</span>
                <FaArrowUpRightFromSquare className="text-[10px] ml-1 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
