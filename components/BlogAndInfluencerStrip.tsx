"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPenNib,
  FaFire,
  FaArrowRight,
  FaPlay,
  FaXmark,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

export default function BlogAndInfluencerStrip() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const blogPosts = [
    {
      title: "Top 10 Digital Tools in 2026",
      date: "Oct 20, 2026",
      category: "Digital Growth",
      image: "/digital_ai_prompts.svg",
      slug: "how-to-calculate-knit-fabric-consumption-rmg-guide",
    },
    {
      title: "Global Sourcing Made Easy",
      date: "Oct 18, 2026",
      category: "B2B Supply Chain",
      image: "/hero_factory_panoramic.svg",
      slug: "apparel-emporium-circular-knitwear-manufacturing-guide",
    },
    {
      title: "RMG Industry Insights",
      date: "Oct 10, 2026",
      category: "Fabric Engineering",
      image: "/tool_gsm_swatch.svg",
      slug: "yarn-count-selection-gsm-optimization-fashion-brands",
    },
  ];

  const influencerCards = [
    {
      id: "inf-1",
      creator: "@sophia.tech",
      views: "1.4M",
      image: "/influencer_1.svg",
      title: "AI Tools Every Brand Needs in 2026",
    },
    {
      id: "inf-2",
      creator: "@cyber.fashion",
      views: "980K",
      image: "/influencer_2.svg",
      title: "Next-Gen 3D Tech Packs & Design",
    },
    {
      id: "inf-3",
      creator: "@tariq.sourcing",
      views: "1.8M",
      image: "/influencer_3.svg",
      title: "Inside Bangladesh's Top Green Garment Factory",
    },
    {
      id: "inf-4",
      creator: "@elena.design",
      views: "760K",
      image: "/influencer_4.svg",
      title: "How We Scaled Our Dropship Brand",
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto content-visibility-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Latest Blog Posts (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-xl dark:shadow-black/40">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-sm">
                <FaPenNib />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Latest Blog Posts
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Insights, Tips and Industry News
                </p>
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition group"
            >
              <span>View All</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Horizontal Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {blogPosts.map((post, idx) => (
              <Link
                key={idx}
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 justify-between"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white dark:bg-slate-900 mb-2.5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={180}
                    height={110}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/90 dark:bg-slate-900/90 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Trending on TikTok & Instagram (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 shadow-lg dark:shadow-xl dark:shadow-black/40">
          {/* Header & Social Icons */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-sm">
                <FaFire />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Trending on TikTok &amp; Instagram
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Follow for the Latest Trends
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <FaTiktok />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* 4 Vertical 9:16 Video Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {influencerCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveVideo(card.creator)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-cyan-500/20 hover:-translate-y-1"
              >
                <Image
                  src={card.image}
                  alt={card.creator}
                  width={140}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-white/20 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-md">
                    <FaPlay className="text-[10px] ml-0.5" />
                  </div>
                </div>

                {/* Bottom Card Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                  <span className="text-[11px] font-bold text-white block truncate">
                    {card.creator}
                  </span>
                  <span className="text-[10px] font-semibold text-cyan-400">
                    ▶ {card.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Influencer Video Preview Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/50 p-6 text-center shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
            >
              <FaXmark />
            </button>
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xl mx-auto mb-3">
              <FaPlay />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{activeVideo}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Trending Social Spotlight &amp; Brand Partnership
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-center gap-2"
              >
                <FaTiktok />
                <span>Open in TikTok</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-full py-2 px-4 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
