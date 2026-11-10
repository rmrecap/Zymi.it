"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaBoxesStacked,
  FaFileLines,
  FaGem,
  FaTruckFast,
  FaIndustry,
} from "react-icons/fa6";

export default function ShopTabs() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "ALL";

  const tabs = [
    {
      id: "ALL",
      label: "All Collections",
      icon: FaBoxesStacked,
      href: "/shop",
      badge: "Full Store",
    },
    {
      id: "DIGITAL_DOWNLOAD",
      label: "Digital Assets & Tech Packs",
      icon: FaFileLines,
      href: "/shop?type=DIGITAL_DOWNLOAD",
      badge: "Instant Access",
    },
    {
      id: "AFFILIATE_AMAZON",
      label: "Curated Pro Gear",
      icon: FaGem,
      href: "/shop?type=AFFILIATE_AMAZON",
      badge: "Verified Deals",
    },
    {
      id: "DROPSHIP",
      label: "Direct Global Store",
      icon: FaTruckFast,
      href: "/shop?type=DROPSHIP",
      badge: "Worldwide Shipping",
    },
    {
      id: "B2B_GARMENT",
      label: "B2B Manufacturing Catalog",
      icon: FaIndustry,
      href: "/shop?type=B2B_GARMENT",
      badge: "Factory Direct",
    },
  ];

  return (
    <div className="w-full mb-6">
      {/* Scrollable Pills container for mobile & desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentType === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 border ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/40 shadow-sm shadow-cyan-500/10 dark:shadow-cyan-500/20"
                  : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-white"
              }`}
            >
              <Icon
                className={
                  isActive
                    ? "text-cyan-500"
                    : "text-slate-400 dark:text-slate-500"
                }
              />
              <span>{tab.label}</span>
              <span
                className={`hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab.badge}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

