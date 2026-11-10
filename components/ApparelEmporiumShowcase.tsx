"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaIndustry, FaCertificate, FaShieldHalved, FaTruckPlane, FaArrowRight, FaFilePdf } from "react-icons/fa6";
import B2BInquiryModal from "./B2BInquiryModal";

export default function ApparelEmporiumShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const capabilities = [
    {
      title: "Knitwear & T-Shirts",
      desc: "Single Jersey, Pique, French Terry, Fleece (140-360 GSM) with reactive dye & bio-wash.",
      moq: "500 pcs/color",
    },
    {
      title: "Denim & Casual Pants",
      desc: "Stretch denim, twill chinos, cargo pants with laser whisker & ozone wash treatments.",
      moq: "800 pcs/style",
    },
    {
      title: "Activewear & Hoodies",
      desc: "Quick-dry moisture wicking, 4-way stretch spandex blends with flatlock seam construction.",
      moq: "500 pcs/style",
    },
    {
      title: "Sustainable & Recycled RMG",
      desc: "GOTS Certified Organic Cotton, Recycled Polyester (RPET), and Bamboo fiber blends.",
      moq: "1,000 pcs/order",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
              <FaIndustry className="text-sm" /> Apparel Emporium B2B Global Hub
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Premier RMG & Apparel <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Manufacturing Hub
              </span>
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
              Direct factory manufacturing & export gateway for international fashion brands, private labels, and retail distributors. Seamless tech-pack execution, lab dips, rapid prototyping, and worldwide delivery.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <span>Submit B2B RFQ</span>
              <FaArrowRight className="text-sm" />
            </button>
            <Link
              href="/b2b-apparel"
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <span>View B2B Catalog</span>
            </Link>
          </div>
        </div>

        {/* Global Factory Standards & Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-b border-slate-800/80 text-center">
          <div className="flex flex-col items-center gap-1 p-3">
            <FaCertificate className="text-amber-400 text-2xl mb-1" />
            <h4 className="font-bold text-sm text-slate-100">OEKO-TEX & BSCI</h4>
            <p className="text-xs text-slate-400">Audited Compliance</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-3">
            <FaShieldHalved className="text-indigo-400 text-2xl mb-1" />
            <h4 className="font-bold text-sm text-slate-100">100% Quality Inspected</h4>
            <p className="text-xs text-slate-400">AQL 2.5 Industry Standard</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-3">
            <FaIndustry className="text-emerald-400 text-2xl mb-1" />
            <h4 className="font-bold text-sm text-slate-100">Flexible Low MOQ</h4>
            <p className="text-xs text-slate-400">Starts at 500 pcs</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-3">
            <FaTruckPlane className="text-blue-400 text-2xl mb-1" />
            <h4 className="font-bold text-sm text-slate-100">Worldwide Port Delivery</h4>
            <p className="text-xs text-slate-400">FOB, CIF & DDP Available</p>
          </div>
        </div>

        {/* Product Categories Grid */}
        <div className="pt-12">
          <h3 className="text-xl font-bold text-slate-200 mb-6">
            Core Production Capacities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/40 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                    {item.moq}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-3 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition"
                >
                  <span>Request Spec Sheet</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <B2BInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

