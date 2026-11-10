"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCartShopping, FaArrowRight, FaDownload, FaBolt } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";

interface DigitalProductItem {
  id: string;
  externalId?: string;
  title: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice: number;
  stock?: number;
  sold?: number;
  badge?: string;
  slug: string;
  brand?: string;
  digitalType?: string;
}

const DEFAULT_FEATURED: DigitalProductItem[] = [
  {
    id: "canboso_6aef1d8dadf360530f723f20",
    title: "Google AI Pro Slot + 5TB 1 Month Full Warranty",
    image: "/digital_ai_prompts.svg",
    rating: 4.9,
    reviews: "1.4k",
    price: 1.74,
    originalPrice: 2.89,
    stock: 10,
    sold: 1,
    badge: "Popular",
    slug: "google-ai-pro-slot-5tb",
    brand: "Google AI",
    digitalType: "Family Slot Invite",
  },
  {
    id: "canboso_6ae92bc35edeecad99f76f79",
    title: "Gemini Pro Slot + 5TB Google One 6 Months Full Warranty",
    image: "/digital_ai_prompts.svg",
    rating: 4.9,
    reviews: "2.1k",
    price: 4.19,
    originalPrice: 6.99,
    stock: 80,
    sold: 14,
    badge: "Bestseller",
    slug: "gemini-pro-slot-5tb-6-months",
    brand: "Google AI",
    digitalType: "Family Slot Invite",
  },
  {
    id: "canboso_6aea8c51adf86f5477863e33",
    title: "Canva Pro Join Link 1 Month Full Warranty",
    image: "/digital_design_templates.svg",
    rating: 4.8,
    reviews: "3.2k",
    price: 0.80,
    originalPrice: 1.50,
    stock: 62,
    sold: 28,
    badge: "50% Margin",
    slug: "canva-pro-join-link-1-month",
    brand: "Canva Pro",
    digitalType: "Invite Link",
  },
  {
    id: "canboso_6ac20b5e87cce3eea0a09f6a",
    title: "YouTube Premium 1 Month Slot Full Warranty",
    image: "/product_headphones.svg",
    rating: 4.9,
    reviews: "950",
    price: 1.50,
    originalPrice: 2.50,
    stock: 1,
    sold: 12,
    badge: "Limited Stock",
    slug: "youtube-premium-1-month-slot",
    brand: "YouTube Premium",
    digitalType: "Family Slot",
  },
];

export default function FeaturedDigitalProducts() {
  const { addToCart, calculateTotals } = useProductStore();
  const [products, setProducts] = useState<DigitalProductItem[]>(DEFAULT_FEATURED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch("/api/digital/canboso?limit=4");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn("Using offline fallback for featured digital products");
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);

  const handleAddToCart = (item: DigitalProductItem) => {
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
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Live Stock • 50% Profit Margin
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1.5">
            Verified Digital Assets &amp; Pro Subscriptions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time fulfillment via API • Instant delivery with full warranty
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
          >
            <span>Pricing Guide</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <Link
            href="/shop?type=DIGITAL_DOWNLOAD"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition group"
          >
            <span>View All 200+ Live Assets</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 4-Column Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-2xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 p-4 flex flex-col justify-between shadow-md dark:shadow-xl dark:shadow-black/40 hover:-translate-y-1.5 hover:shadow-cyan-500/10"
          >
            {/* Top Image Artwork & Badges */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800/80 mb-3.5">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                loading="lazy"
                className="w-3/4 h-3/4 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />

              {product.badge && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
                  {product.badge}
                </span>
              )}

              {/* Live stock indicator */}
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-white border border-slate-700 shadow-sm flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    (product.stock ?? 1) > 0 ? "bg-emerald-400" : "bg-rose-500"
                  }`}
                />
                {(product.stock ?? 1) > 0 ? `${product.stock} in stock` : "Sold out"}
              </span>

              <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 text-xs">
                <FaDownload />
              </span>
            </div>

            {/* Product Metadata */}
            <div className="space-y-1.5 mb-3.5">
              {product.brand && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                  {product.brand}
                </span>
              )}

              <h3
                className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug"
                title={product.title}
              >
                {product.title}
              </h3>

              {/* Rating & Live Sold */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
                  <FaStar className="text-[11px]" />
                  <span>{typeof product.rating === "number" ? product.rating.toFixed(1) : "4.9"}</span>
                  <span className="text-slate-400 font-normal">
                    ({product.reviews})
                  </span>
                </div>
                {product.sold !== undefined && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    Sold: {product.sold}
                  </span>
                )}
              </div>

              {/* Pricing (50% markup applied) */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                  +50% Margin
                </span>
              </div>
            </div>

            {/* Instant Add to Cart CTA */}
            <button
              type="button"
              disabled={(product.stock ?? 1) === 0}
              onClick={() => handleAddToCart(product)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                (product.stock ?? 1) > 0
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white dark:text-slate-950 shadow-cyan-500/15"
                  : "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <FaCartShopping className="text-xs" />
              <span>{(product.stock ?? 1) > 0 ? "Instant Access • Add to Cart" : "Out of Stock"}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
