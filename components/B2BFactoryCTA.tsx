"use client";

import React, { useState } from "react";
import { FaIndustry, FaArrowRight, FaShieldHalved, FaGlobe } from "react-icons/fa6";
import B2BInquiryModal from "./B2BInquiryModal";

interface B2BFactoryCTAProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function B2BFactoryCTA({
  title = "Source Directly from Verified Manufacturer: Apparel Emporium",
  subtitle = "Need bulk production for this specification? Get factory-direct quotes with audited compliance (BSCI, OEKO-TEX), rapid sampling in 7 days, and low MOQ.",
  compact = false,
}: B2BFactoryCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl overflow-hidden ${
      compact ? "p-5" : "p-8 my-10"
    }`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Factory Direct
            </span>
            <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
              <FaGlobe className="text-[10px]" /> aelbd.net
            </span>
          </div>

          <h3 className={`font-extrabold text-white tracking-tight ${compact ? "text-lg" : "text-2xl"}`}>
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <FaShieldHalved /> OEKO-TEX & BSCI Audited
            </span>
            <span>•</span>
            <span>MOQ: 500 pcs/style</span>
            <span>•</span>
            <span>Full Tech-Pack Execution</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm active:scale-95"
          >
            <FaIndustry />
            <span>Request Factory RFQ</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>

      <B2BInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

