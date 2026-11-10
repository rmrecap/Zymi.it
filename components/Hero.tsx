"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaIndustry, FaCalculator, FaArrowRight, FaShieldHalved, FaGlobe } from "react-icons/fa6";
import B2BInquiryModal from "./B2BInquiryModal";

const Hero = () => {
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden py-16 md:py-24 border-b border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider w-fit">
              <FaIndustry className="text-amber-400" />
              <span>Global RMG Hub & Apparel Emporium Gateway</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Empowering Global Fashion Brands with <br />
              <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Direct RMG Manufacturing
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connect directly with <strong>Apparel Emporium</strong> (aelbd.net) for premium knitwear, denim, and custom private label manufacturing. Access free industry engineering tools, automated merchandising calculators, and hybrid global commerce.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setIsB2BModalOpen(true)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all flex items-center gap-2 text-base active:scale-95"
              >
                <span>Request B2B Factory Quote</span>
                <FaArrowRight className="text-sm" />
              </button>

              <Link
                href="/tools"
                className="px-7 py-4 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-base"
              >
                <FaCalculator className="text-amber-400" />
                <span>Free RMG Calculators</span>
              </Link>
            </div>

            {/* Quick Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs sm:text-sm">
              <div>
                <p className="font-extrabold text-xl text-white">500 pcs</p>
                <p className="text-slate-400">Low Minimum Order (MOQ)</p>
              </div>
              <div>
                <p className="font-extrabold text-xl text-white">OEKO-TEX & BSCI</p>
                <p className="text-slate-400">Certified Audited Facility</p>
              </div>
              <div>
                <p className="font-extrabold text-xl text-white">Worldwide</p>
                <p className="text-slate-400">FOB & CIF Export Gateway</p>
              </div>
            </div>
          </div>

          {/* Quick Interactive B2B Spotlight Card */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white">Apparel Emporium</h3>
                <p className="text-xs text-amber-400 font-medium">Export Garment Manufacturer</p>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Verified Factory
              </span>
            </div>

            <div className="py-5 space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Manufacturing Specialization</span>
                <span className="font-semibold text-white">Circular & Flat Knit, Denim, Activewear</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Official Portal</span>
                <a href="https://aelbd.net" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-semibold">
                  aelbd.net
                </a>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Sample Turnaround</span>
                <span className="font-semibold text-white">7-10 Days Worldwide</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">In-House Capabilities</span>
                <span className="font-semibold text-white">Knitting, Dyeing, Printing, Embroidery</span>
              </div>
            </div>

            <button
              onClick={() => setIsB2BModalOpen(true)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition text-center text-sm"
            >
              Direct Factory Inquiry (RFQ)
            </button>
          </div>
        </div>
      </div>

      <B2BInquiryModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
