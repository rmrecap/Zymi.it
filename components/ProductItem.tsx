"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { sanitize } from "@/lib/sanitize";
import { Product } from "@/typings";
import AdaptiveProductActions from "./AdaptiveProductActions";
import { FaAmazon, FaIndustry, FaDownload, FaTruckFast } from "react-icons/fa6";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  const productType = product.productType || "DROPSHIP";

  const renderTypeBadge = () => {
    switch (productType) {
      case "AFFILIATE_AMAZON":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <FaAmazon className="text-[#FF9900]" /> Verified Choice
          </span>
        );
      case "B2B_GARMENT":
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <FaIndustry className="text-indigo-600 dark:text-indigo-400" /> B2B Manufacturing
          </span>
        );
      case "DIGITAL_DOWNLOAD":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <FaDownload className="text-emerald-600 dark:text-emerald-400" /> Digital Asset
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            <FaTruckFast className="text-blue-600 dark:text-blue-400" /> Direct Global
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 shadow-sm hover:shadow-lg dark:shadow-black/30 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Type Badge */}
      <div className="flex justify-between items-center w-full mb-2">
        {renderTypeBadge()}
        {product.inStock > 0 ? (
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">In Stock</span>
        ) : (
          <span className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block relative w-full h-52 overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-950 mb-3 border border-gray-100 dark:border-slate-800/80">
        <Image
          src={
            product.mainImage
              ? product.mainImage.startsWith("http")
                ? product.mainImage
                : `/${product.mainImage}`
              : "/product_placeholder.jpg"
          }
          alt={sanitize(product?.title) || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col gap-1 flex-grow text-left">
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-semibold text-gray-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 line-clamp-2 transition-colors"
          title={product.title}
        >
          {sanitize(product.title)}
        </Link>

        {productType === "B2B_GARMENT" ? (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-bold text-indigo-900 dark:text-indigo-400">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              / pc (MOQ: {product.moq || 500})
            </span>
          </div>
        ) : (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.rating > 0 && (
              <span className="text-xs text-amber-500 font-medium">
                ★ {product.rating}.0
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Actions */}
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800">
        <AdaptiveProductActions product={product} compact={true} />
      </div>
    </div>
  );
};

export default ProductItem;
