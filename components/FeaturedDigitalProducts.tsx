"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCartShopping, FaArrowRight, FaDownload } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import context7Cache from "@/lib/context7-cache";

interface DigitalProduct {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice: number;
  badge?: string;
  slug: string;
}

const DEFAULT_DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "dp-1",
    title: "Ultimate AI Prompt Pack",
    image: "/digital_ai_prompts.svg",
    rating: 4.8,
    reviews: "2.5k",
    price: 19.99,
    originalPrice: 39.99,
    badge: "Bestseller",
    slug: "ultimate-ai-prompt-pack",
  },
  {
    id: "dp-2",
    title: "Graphic Design Templates",
    image: "/digital_design_templates.svg",
    rating: 4.7,
    reviews: "1.8k",
    price: 14.99,
    originalPrice: 29.99,
    badge: "Trending",
    slug: "graphic-design-templates",
  },
  {
    id: "dp-3",
    title: "Business Planner Toolkit",
    image: "/digital_business_planner.svg",
    rating: 4.9,
    reviews: "1.2k",
    price: 9.99,
    originalPrice: 19.99,
    slug: "business-planner-toolkit",
  },
  {
    id: "dp-4",
    title: "Stock Photos Collection",
    image: "/digital_stock_photos.svg",
    rating: 4.8,
    reviews: "900",
    price: 12.99,
    originalPrice: 24.99,
    slug: "stock-photos-collection",
  },
];

export default function FeaturedDigitalProducts() {
  const { addToCart, calculateTotals } = useProductStore();
  const [products, setProducts] = useState<DigitalProduct[]>(DEFAULT_DIGITAL_PRODUCTS);

  useEffect(() => {
    // Upstash Context7 caching layer for instant sub-second render
    const loadProducts = async () => {
      const cached = await context7Cache.getCachedFeaturedProducts();
      if (cached && cached.length > 0) {
        setProducts(cached);
      } else {
        await context7Cache.cacheFeaturedProducts(DEFAULT_DIGITAL_PRODUCTS);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (item: DigitalProduct) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      amount: 1,
    });
    calculateTotals();
    toast.success(`Added ${item.title} to your cart!`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">★</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Digital Assets &amp; Tech Packs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Learn, Create, and Accelerate Production
          </p>
        </div>

        <Link
          href="/shop?type=DIGITAL_DOWNLOAD"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition group self-start sm:self-auto"
        >
          <span>View All</span>
          <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4-Column Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-2xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 p-4 flex flex-col justify-between shadow-md dark:shadow-xl dark:shadow-black/40 hover:-translate-y-2 hover:shadow-cyan-500/10"
          >
            {/* Top Image Artwork */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800/80 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                width={260}
                height={260}
                loading="lazy"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />

              {product.badge && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
                  {product.badge}
                </span>
              )}

              <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 text-xs">
                <FaDownload />
              </span>
            </div>

            {/* Product Metadata */}
            <div className="space-y-2 mb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                {product.title}
              </h3>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400 font-bold">
                <FaStar className="text-[11px]" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({product.reviews})
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white dark:text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-cyan-500/15 transition-all active:scale-95 cursor-pointer"
            >
              <FaCartShopping className="text-xs" />
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
