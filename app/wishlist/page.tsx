import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Loader } from "@/components/Loader";
import { WishlistModule } from "@/components/modules/wishlist";
import { FaHeart, FaHouse, FaBagShopping } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "My Wishlist | ZYMI Global",
  description:
    "View and manage your saved items, fashion styles, and tools in your ZYMI Global wishlist.",
  alternates: {
    canonical: "https://zymi.it/wishlist",
  },
  openGraph: {
    title: "My Wishlist | ZYMI Global",
    description:
      "Manage your saved products and favorite apparel items on ZYMI Global.",
    url: "https://zymi.it/wishlist",
  },
};

export default function WishlistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "My Wishlist",
    url: "https://zymi.it/wishlist",
    description: "User wishlist and saved product collection.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://zymi.it",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Wishlist",
          item: "https://zymi.it/wishlist",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-cyan-600 transition flex items-center gap-1"
            >
              <FaHouse className="text-[10px]" /> Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-semibold">
              Wishlist
            </span>
          </div>

          {/* Page Heading Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xl">
                  <FaHeart />
                </span>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                    My Wishlist
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Your personal collection of saved products, apparel prototypes, and digital assets.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-sm"
              >
                <FaBagShopping /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Wishlist Table Container */}
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <Suspense fallback={<Loader />}>
              <WishlistModule />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

