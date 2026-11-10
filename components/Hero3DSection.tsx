"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaPlay,
  FaArrowRight,
  FaXmark,
  FaBoxesStacked,
  FaChartLine,
  FaCartShopping,
  FaShirt,
  FaPenNib,
  FaWrench,
  FaGlobe,
  FaCloudArrowUp,
  FaBookOpen,
  FaHeadphones,
} from "react-icons/fa6";

export default function Hero3DSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // 7 Quick Launchpad Categories with compact, high-impact titles matching the reference blueprint
  const categories = [
    {
      title: "Digital Assets",
      href: "/shop?type=DIGITAL_DOWNLOAD",
      icon: <FaBoxesStacked className="text-lg text-blue-500 dark:text-blue-400" />,
      glowColor: "hover:border-blue-500/60 hover:shadow-blue-500/20",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Curated Gear",
      href: "/shop?type=AFFILIATE_AMAZON",
      icon: <FaChartLine className="text-lg text-amber-500 dark:text-amber-400" />,
      glowColor: "hover:border-amber-500/60 hover:shadow-amber-500/20",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Direct Store",
      href: "/shop?type=DROPSHIP",
      icon: <FaCartShopping className="text-lg text-emerald-500 dark:text-emerald-400" />,
      glowColor: "hover:border-emerald-500/60 hover:shadow-emerald-500/20",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Apparel Emporium",
      href: "/b2b-apparel",
      icon: <FaShirt className="text-lg text-cyan-600 dark:text-cyan-400" />,
      glowColor: "hover:border-cyan-500/60 hover:shadow-cyan-500/20",
      badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    },
    {
      title: "Blog & Insights",
      href: "/blog",
      icon: <FaPenNib className="text-lg text-purple-500 dark:text-purple-400" />,
      glowColor: "hover:border-purple-500/60 hover:shadow-purple-500/20",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      title: "Free RMG Tools",
      href: "/tools",
      icon: <FaWrench className="text-lg text-sky-500 dark:text-sky-400" />,
      glowColor: "hover:border-sky-500/60 hover:shadow-sky-500/20",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
    {
      title: "Global Sourcing",
      href: "/b2b-apparel",
      icon: <FaGlobe className="text-lg text-teal-500 dark:text-teal-400" />,
      glowColor: "hover:border-teal-500/60 hover:shadow-teal-500/20",
      badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-4 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[32rem] h-[32rem] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Top Split: Text on Left, 3D Devices & Hologram on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 pb-8">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-cyan-500/30 shadow-md shadow-cyan-500/10 text-xs font-bold text-cyan-700 dark:text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Your Global Business Hub</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Discover. Shop.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 glow-cyan">
                Grow.
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Digital Assets, Curated Pro Gear, Global Sourcing, Expert Guides
              and More — All in One Place!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-slate-950 hover:from-cyan-300 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 group"
              >
                <span>Explore All Categories</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/50 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm transition-all duration-200 active:scale-95"
              >
                <span>Pricing &amp; Rates</span>
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500/50 shadow-md transition-all active:scale-95 group cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[9px] group-hover:scale-110 transition-transform">
                  <FaPlay />
                </span>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Visual 3D Panel */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Central Glowing Cyber Globe */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 bg-gradient-to-b from-cyan-900/10 dark:from-cyan-900/20 via-blue-900/20 dark:via-blue-900/30 to-transparent blur-xs animate-pulse" />
              <div className="absolute w-72 h-72 rounded-full border border-blue-500/30 dark:border-blue-500/40 opacity-70" />
              <div className="absolute w-84 h-84 rounded-full border border-dashed border-cyan-400/20" />

              {/* 3D Laptop Graphic Mockup */}
              <div className="relative z-10 w-80 sm:w-96 p-4 rounded-2xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-800/90 dark:to-slate-900/95 border border-slate-200 dark:border-cyan-500/40 shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-500/20 backdrop-blur-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Screen */}
                <div className="relative w-full aspect-video rounded-xl bg-slate-950 border border-slate-800 dark:border-cyan-500/20 overflow-hidden flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-cyan-500/40 mb-2">
                    Z
                  </div>
                  <span className="text-xs font-black tracking-wider text-white">
                    ZYMI RMG &amp; APPAREL EMPORIUM
                  </span>
                  <span className="text-[10px] text-cyan-400 mt-1">
                    aelbd.net • Global RMG Network
                  </span>

                  {/* Code / Analytics grid lines */}
                  <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                    <span>RFQ Active: 100%</span>
                    <span>Verified Compliance</span>
                  </div>
                </div>

                {/* Keyboard Base */}
                <div className="mt-2 h-3 rounded-b-xl bg-slate-200 dark:bg-slate-700/60 border-t border-slate-300 dark:border-slate-600 flex justify-center items-center">
                  <div className="w-16 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                </div>
              </div>

              {/* Floating Hologram Icons */}
              <div className="absolute -top-2 left-6 p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-cyan-400/40 text-cyan-600 dark:text-cyan-400 shadow-lg shadow-cyan-500/20 animate-bounce">
                <FaCartShopping className="text-xl" />
              </div>

              <div className="absolute top-8 -right-3 p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-blue-400/40 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20">
                <FaCloudArrowUp className="text-xl" />
              </div>

              <div className="absolute bottom-10 -left-4 p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-indigo-400/40 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/20">
                <FaBookOpen className="text-xl" />
              </div>

              <div className="absolute -bottom-2 right-8 p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-cyan-400/40 text-cyan-600 dark:text-cyan-400 shadow-lg shadow-cyan-500/20">
                <FaHeadphones className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Category Launchpad: 7 Glassmorphic Cards */}
        <div className="mt-1 pt-5 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/90 transition-all duration-300 shadow-sm dark:shadow-md hover:-translate-y-1 text-center ${cat.glowColor}`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 border ${cat.badgeColor}`}
                >
                  {cat.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-white leading-tight truncate w-full">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl p-6">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
            >
              <FaXmark className="text-base" />
            </button>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400">ZYMI Global &amp; Apparel Emporium</span> — Ecosystem Tour
            </h3>
            <div className="aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 border border-slate-800 text-center">
              <FaPlay className="text-5xl text-cyan-400 mb-4 animate-pulse" />
              <p className="text-sm font-semibold text-slate-200 max-w-md">
                Touring our certified circular knitwear factory in Bangladesh (aelbd.net), free RMG calculators, and international hybrid dropshipping architecture.
              </p>
              <div className="mt-5 flex gap-3">
                <Link
                  href="/b2b-apparel"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Explore Factory Hub
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-200 hover:text-white rounded-lg text-xs"
                >
                  Try Free Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
