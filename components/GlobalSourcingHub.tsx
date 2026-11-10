"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaGlobe, FaIndustry, FaShieldHalved, FaArrowRight, FaCheck, FaEnvelope, FaPhone } from "react-icons/fa6";

// Lazy-load B2B modal to reduce initial page bundle
const B2BInquiryModal = dynamic(() => import("./B2BInquiryModal"), {
  ssr: false,
});

export default function GlobalSourcingHub() {
  const [modalOpen, setModalOpen] = useState(false);

  const certifications = [
    { name: "OEKO-TEX Standard 100", image: "/badge_oekotex.svg" },
    { name: "BSCI Social Compliance", image: "/badge_bsci.svg" },
    { name: "Sedex SMETA 4-Pillar", image: "/badge_sedex.svg" },
    { name: "GOTS Organic Certified", image: "/badge_gots.svg" },
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto content-visibility-auto">
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-cyan-500/10">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Sourcing Intro & Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-2xl">
                <FaGlobe />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Global Sourcing Hub
                </h2>
                <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-300 font-medium">
                  Connect with Verified Manufacturers Worldwide
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Official export gateway for <strong>Apparel Emporium (aelbd.net)</strong>.
              Direct-to-factory knitwear, sweaters, denim, and activewear production with
              fully audited sustainable practices, low MOQs, and European/US standard compliance.
            </p>

            {/* Certifications Badge Bar */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Factory Compliance &amp; Certifications
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={38}
                      height={38}
                      loading="lazy"
                      className="rounded-full"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 pr-1">
                      {cert.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <FaIndustry />
                <span>Request B2B Audit / RFQ</span>
              </button>

              <Link
                href="/b2b-apparel"
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <span>View Factory Profile</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Direct Machine-Readable Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block w-full sm:w-auto">
                Direct Contact:
              </span>
              <a
                href="mailto:contact@zymi.it"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium"
              >
                <FaEnvelope className="text-cyan-500" />
                <span>contact@zymi.it</span>
              </a>
              <a
                href="tel:+8801700000000"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition font-medium"
              >
                <FaPhone className="text-emerald-500" />
                <span>+880-1700-000000</span>
              </a>
            </div>
          </div>

          {/* Right Column: Factory Panoramic Photo / Illustration (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 shadow-xl bg-slate-950 flex items-center justify-center">
              <Image
                src="/hero_factory_panoramic.svg"
                alt="Apparel Emporium LEED Platinum Manufacturing Plant"
                width={500}
                height={260}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    LEED Platinum Facility
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Apparel Emporium Export Unit • Gazipur, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* B2B Inquiry Modal */}
      {modalOpen && (
        <B2BInquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
