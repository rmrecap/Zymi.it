"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaIndustry, FaCalculator, FaShieldHalved, FaBoxesPacking } from "react-icons/fa6";
import B2BInquiryModal from "./B2BInquiryModal";

const IntroducingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Integrated RMG Ecosystem
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl">
          Global Garment Sourcing & <br />
          <span className="bg-gradient-to-r from-indigo-300 via-white to-amber-300 bg-clip-text text-transparent">
            Apparel Emporium Manufacturing Gateway
          </span>
        </h2>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mt-4 leading-relaxed">
          Bridging international apparel buyers, fashion tech-pack designers, and certified textile manufacturing. Explore our real-time fabric engineering calculators or request wholesale production quotes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-10 text-left">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <FaIndustry className="text-indigo-400 text-2xl mb-2" />
            <h4 className="font-bold text-base text-white">Apparel Emporium B2B</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Export garment manufacturing hub for international brands with strict compliance and custom packaging.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <FaCalculator className="text-amber-400 text-2xl mb-2" />
            <h4 className="font-bold text-base text-white">Free RMG Calculators</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Fabric consumption, GSM costing estimators, and yarn count converters used by global merchandisers.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <FaBoxesPacking className="text-emerald-400 text-2xl mb-2" />
            <h4 className="font-bold text-base text-white">Hybrid Commerce</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Digital tech-packs, curated garment dropshipping, and verified Amazon fashion affiliate selections.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition text-sm"
          >
            Request Factory Quotation
          </button>
          <Link
            href="/tools"
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition text-sm"
          >
            Explore Free Textile Tools
          </Link>
        </div>
      </div>

      <B2BInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default IntroducingSection;
