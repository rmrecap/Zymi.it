import React from "react";
import {
  Hero3DSection,
  FeaturedDigitalProducts,
  SplitUtilityDealsSection,
  GlobalSourcingHub,
  BlogAndInfluencerStrip,
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16 transition-colors duration-200">
      {/* 1. 3D Hero Section & 7-Item Category Launchpad */}
      <Hero3DSection />

      {/* 2. Featured Digital Products Grid (3D Box Artwork + Instant Cart) */}
      <FeaturedDigitalProducts />

      {/* 3. Side-by-Side Dual Module: RMG Utility Tools & Trending Affiliate Deals */}
      <SplitUtilityDealsSection />

      {/* 4. Global Sourcing Hub (Apparel Emporium Factory, OEKO-TEX / BSCI / SEDEX / GOTS) */}
      <GlobalSourcingHub />

      {/* 5. Split Bottom Strip: Latest Blog Posts & Trending TikTok/Instagram Reels */}
      <BlogAndInfluencerStrip />
    </main>
  );
}
