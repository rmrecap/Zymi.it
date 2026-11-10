"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/typings";
import { sanitize } from "@/lib/sanitize";
import AdaptiveProductActions from "./AdaptiveProductActions";
import { FaBagShopping, FaStar } from "react-icons/fa6";

interface BlogProductRecommendationProps {
  products: Product[];
  title?: string;
}

export default function BlogProductRecommendation({
  products,
  title = "Recommended Sourcing & Products in this Article",
}: BlogProductRecommendationProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="my-10 p-6 sm:p-8 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-xs">
      <div className="flex items-center gap-2 mb-6">
        <span className="p-2 bg-indigo-900 text-white rounded-lg">
          <FaBagShopping className="text-amber-400 text-sm" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">
            Verified materials, tech packs & manufacturer specifications mentioned above
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <Link href={`/product/${product.slug}`} className="block relative w-full h-40 bg-slate-50 rounded-lg overflow-hidden mb-3">
                <Image
                  src={
                    product.mainImage
                      ? product.mainImage.startsWith("http")
                        ? product.mainImage
                        : `/${product.mainImage}`
                      : "/product_placeholder.jpg"
                  }
                  alt={sanitize(product.title)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2 hover:scale-105 transition-transform"
                />
              </Link>

              <Link
                href={`/product/${product.slug}`}
                className="text-xs font-bold text-slate-900 hover:text-indigo-600 line-clamp-2"
              >
                {sanitize(product.title)}
              </Link>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-900">
                  ${product.price}
                </span>
                {product.rating > 0 && (
                  <span className="text-[11px] text-amber-500 flex items-center gap-1 font-semibold">
                    <FaStar className="text-[10px]" /> {product.rating}.0
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <AdaptiveProductActions product={product} compact={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

