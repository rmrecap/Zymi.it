import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FaCalculator, FaCoins, FaArrowsRotate, FaArrowRight, FaIndustry, FaDownload, FaFileCode } from "react-icons/fa6";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";
import RecommendedProEquipment from "@/components/RecommendedProEquipment";

export const metadata: Metadata = {
  title: "Free RMG & Textile Engineering Tools | ZYMI & Apparel Emporium",
  description:
    "Free client-side textile calculators for garment merchandisers: Fabric Consumption (kg/dz), GSM & Costing Estimator, and Yarn Count Converter.",
  alternates: {
    canonical: "https://zymi.it/tools",
  },
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: "Knit Fabric Consumption Calculator",
      description:
        "Calculate fabric required per dozen (kg/dz), single piece weight in grams, and total yarn order requirement with customizable seam allowances and process loss.",
      href: "/tools/fabric-consumption-calculator",
      badge: "Popular with Merchandisers",
      icon: FaCalculator,
      color: "from-indigo-600 to-indigo-800",
    },
    {
      title: "GSM & Fabric Costing Estimator",
      description:
        "Simulate fabric weight (GSM) from yarn count (Ne) and loop length. Calculate complete factory floor costing per kg and per garment including knitting and dyeing charges.",
      href: "/tools/gsm-costing-estimator",
      badge: "Costing & Budgeting",
      icon: FaCoins,
      color: "from-amber-600 to-amber-800",
    },
    {
      title: "Universal Yarn Count Converter",
      description:
        "Seamless bidirectional converter between Cotton Count (Ne), Metric Count (Nm), Tex, and Denier filament numbering systems with industrial application guides.",
      href: "/tools/yarn-count-converter",
      badge: "Spun & Filament Systems",
      icon: FaArrowsRotate,
      color: "from-emerald-600 to-emerald-800",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hub Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Open Textile Engineering Suite
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Free Garment Industry <br />
            <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">
              Calculators & Utility Hub
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-4 leading-relaxed">
            Professional client-side tools designed for fashion brand founders, sourcing merchandisers, and apparel engineers. Zero sign-up required, runs 100% in your browser.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="p-3 rounded-xl bg-slate-900 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="text-xl" />
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <span>Launch Free Tool</span>
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Amazon Affiliate High-Ticket Pro Equipment Widget */}
        <RecommendedProEquipment
          title="Recommended Professional RMG & Factory Equipment"
          subtitle="Precision machinery, fabric weight balance scales, and commercial garment steamers on Amazon Prime."
        />

        {/* B2B Factory Direct CTA Banner */}
        <B2BFactoryCTA
          title="Looking for Factory Execution? Partner with Apparel Emporium"
          subtitle="From yarn calculation to finished garment container shipping, Apparel Emporium (aelbd.net) provides certified manufacturing with low MOQ and guaranteed on-time delivery."
        />
      </div>
    </div>
  );
}

