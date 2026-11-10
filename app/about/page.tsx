import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  FaIndustry,
  FaGlobe,
  FaShieldHalved,
  FaCheck,
  FaArrowRight,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About Us | ZYMI Global & Apparel Emporium",
  description:
    "Learn about ZYMI Global, the international technology and B2B apparel export platform representing Apparel Emporium (aelbd.net) with certified factories in Bangladesh.",
  alternates: {
    canonical: "https://zymi.it/about",
  },
};

export default function AboutPage() {
  const stats = [
    { label: "Monthly Garment Capacity", value: "2.5M+ Pcs" },
    { label: "Global Export Destinations", value: "35+ Countries" },
    { label: "Factory Compliance Certifications", value: "OEKO-TEX, BSCI, GOTS" },
    { label: "Digital Tech Pack Assets", value: "5,000+ Templates" },
  ];

  const pillars = [
    {
      icon: FaIndustry,
      title: "Direct RMG Factory Manufacturing",
      description:
        "Official technology gateway for Apparel Emporium (aelbd.net), connecting global fashion founders and corporate retailers directly to compliant apparel production floors in Bangladesh.",
    },
    {
      icon: FaShieldHalved,
      title: "Certified Ethical Standards",
      description:
        "Every production partner adheres to strict global ethical governance: OEKO-TEX Standard 100, BSCI Code of Conduct, Sedex SMETA 4-Pillar, and Global Organic Textile Standard (GOTS).",
    },
    {
      icon: FaChartLine,
      title: "Free Engineering Calculators",
      description:
        "Empowering apparel merchandisers and factory owners worldwide with high-precision knit fabric consumption, GSM costing estimators, and yarn count converters.",
    },
    {
      icon: FaGlobe,
      title: "Curated International Commerce",
      description:
        "A hybrid platform bringing together Amazon Verified Creator merchandise, digital design assets, and direct-to-consumer apparel innovations under one unified ecosystem.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-4">
          Corporate Identity & Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight">
          Pioneering the Next Era of Global Apparel & Hybrid Commerce
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ZYMI Global bridges the gap between high-capacity, certified garment manufacturing in Bangladesh and modern global digital commerce.
        </p>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Narrative & Apparel Emporium Partnership */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Official Promotion & Technology Hub for Apparel Emporium
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Based in Dhaka, Bangladesh, <strong className="text-slate-900 dark:text-white">Apparel Emporium (<a href="https://aelbd.net" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 underline">aelbd.net</a>)</strong> is a premier apparel manufacturer specializing in export-grade knitwear, heavyweight hoodies, denim, and woven garments for renowned brands across Europe, North America, and Australia.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ZYMI Global was built to digitalize this powerhouse: providing transparent low-MOQ sourcing, real-time RFQ pipelines, instant digital tech pack downloads, and automated creator affiliate syndication.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/b2b-apparel"
                className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
              >
                <span>Explore B2B Factory Sourcing</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <span>Contact Our Corporate Team</span>
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaAward className="text-cyan-600 dark:text-cyan-400" />
              <span>International Compliance & Standards</span>
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheck className="text-[10px]" />
                </span>
                <span><strong>OEKO-TEX Standard 100:</strong> 100% free of harmful substances, skin-friendly and safe for baby/adult apparel.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheck className="text-[10px]" />
                </span>
                <span><strong>BSCI & Sedex SMETA:</strong> Fair living wages, safe ergonomic working floors, and worker healthcare guarantees.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheck className="text-[10px]" />
                </span>
                <span><strong>GOTS Certified:</strong> Organic cotton verification from spinning to finished garment packaging.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 dark:text-white mb-12">
          The Four Pillars of ZYMI Global
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xl">
                <pillar.icon />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
