"use client";

import React from "react";
import Image from "next/image";
import { FaAmazon, FaArrowUpRightFromSquare, FaStar, FaCheck } from "react-icons/fa6";
import { sanitize } from "@/lib/sanitize";

export interface AmazonProductCardProps {
  asin: string;
  title: string;
  price: number;
  formattedPrice?: string;
  mainImage: string;
  rating?: number;
  features?: string[];
  manufacturer?: string;
  badgeText?: string;
  compact?: boolean;
}

export default function AmazonProductCard({
  asin,
  title,
  price,
  formattedPrice,
  mainImage,
  rating = 5,
  features = [],
  manufacturer = "Amazon Verified",
  badgeText = "Amazon's Choice",
  compact = false,
}: AmazonProductCardProps) {
  const redirectUrl = `/api/affiliate/redirect?asin=${encodeURIComponent(asin)}`;

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Bar with Badge */}
      <div className="flex justify-between items-center mb-3">
        <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase">
          <span className="text-[#FF9900] font-black">amazon</span> {badgeText}
        </span>
        <span className="text-[11px] font-bold text-sky-600 flex items-center gap-1">
          <FaCheck className="text-[10px]" /> Prime Delivery
        </span>
      </div>

      {/* Image Container */}
      <a
        href={redirectUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="block relative w-full h-44 sm:h-48 bg-slate-50 rounded-xl overflow-hidden mb-3 p-3 group-hover:scale-102 transition-transform"
      >
        <Image
          src={mainImage ? (mainImage.startsWith("http") ? mainImage : `/${mainImage}`) : "/category_knit.svg"}
          alt={sanitize(title)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-2"
        />
      </a>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          {manufacturer}
        </span>

        <a
          href={redirectUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 line-clamp-2 transition-colors mt-0.5"
          title={title}
        >
          {sanitize(title)}
        </a>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex text-amber-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {rating}.0
          </span>
        </div>

        {/* Features preview (non-compact) */}
        {!compact && features.length > 0 && (
          <ul className="mt-2.5 space-y-1 text-[11px] text-slate-500 line-clamp-2">
            {features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span className="text-amber-500 font-bold">•</span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price Tag */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-black text-slate-900">
            {formattedPrice || `$${price}`}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">on Amazon</span>
        </div>
      </div>

      {/* High-Converting CTA Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
        <a
          href={redirectUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-full py-2.5 px-4 bg-[#FF9900] hover:bg-[#FF8800] active:scale-98 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FaAmazon className="text-base" />
          <span>Check Price on Amazon</span>
          <FaArrowUpRightFromSquare className="text-[10px] opacity-80" />
        </a>

        <p className="text-[10px] text-slate-400 text-center leading-tight">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
}

