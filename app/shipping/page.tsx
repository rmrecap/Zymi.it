import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaTruckFast,
  FaShip,
  FaPlaneDeparture,
  FaDownload,
  FaAmazon,
  FaFileLines,
  FaCircleCheck,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | ZYMI Global & Apparel Emporium",
  description:
    "Official shipping and delivery policy for ZYMI Global, covering Apparel Emporium B2B garment export logistics (FOB/CIF), instant digital product downloads, and Amazon affiliate fulfillment.",
  alternates: {
    canonical: "https://zymi.it/shipping",
  },
  openGraph: {
    title: "Shipping & Delivery Policy | ZYMI Global",
    description:
      "Global freight, ocean container shipping, air express sampling, and instant digital delivery terms for ZYMI Global and Apparel Emporium.",
    url: "https://zymi.it/shipping",
    type: "website",
  },
};

export default function ShippingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shipping & Delivery Policy",
    url: "https://zymi.it/shipping",
    description:
      "Official shipping policy covering B2B ocean/air freight, instant digital downloads, and global logistics for Apparel Emporium and ZYMI Global.",
    publisher: {
      "@type": "Organization",
      name: "ZYMI Global",
      url: "https://zymi.it",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://zymi.it",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shipping Policy",
          item: "https://zymi.it/shipping",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-sm">
          {/* Header */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-3">
              <FaTruckFast className="text-xs" /> Global Logistics &amp; Delivery
            </span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: November 10, 2026 • Last Updated: November 2026
            </p>
          </div>

          {/* Overview */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Multi-Tier Logistics Overview
            </h2>
            <p>
              ZYMI Global (<strong>zymi.it</strong>) operates a hybrid logistics architecture catering to three distinct fulfillment streams:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <FaShip className="text-cyan-500 text-xl mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  B2B Garment Freight
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ocean container (FCL/LCL) &amp; air freight from Apparel Emporium (Dhaka / Chittagong).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <FaDownload className="text-blue-500 text-xl mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  Digital Asset Delivery
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Instant electronic transmission for CAD templates, tech packs, and cloud software.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <FaAmazon className="text-amber-500 text-xl mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  Curated Commercial Gear
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fulfilled directly through Amazon Prime and verified third-party distribution hubs.
                </p>
              </div>
            </div>
          </section>

          {/* B2B Export Shipping */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaShip className="text-cyan-500 text-base" /> 2. Apparel Emporium B2B Export Shipping
            </h2>
            <p>
              Ready-made garment (RMG) bulk orders produced by <strong>Apparel Emporium</strong> (
              <a
                href="https://aelbd.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 underline font-medium"
              >
                aelbd.net
              </a>
              ) are dispatched from Bangladesh according to international Incoterms® 2020:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>FOB (Free on Board - Chittagong Sea Port / Hazrat Shahjalal International Airport, Dhaka):</strong> Default shipping term. The buyer arranges ocean freight carriage, insurance, and destination import handling.
              </li>
              <li>
                <strong>CIF / CFR (Cost, Insurance &amp; Freight):</strong> Available upon request during proforma invoice negotiation. We manage freight booking to your designated discharge port (e.g., Hamburg, Rotterdam, Felixstowe, New York, Los Angeles, Melbourne).
              </li>
              <li>
                <strong>Lead Times:</strong> Standard bulk production cycles range from <strong>25 to 45 business days</strong> following tech pack approval, lab dip confirmation, and Letter of Credit (LC) / Telegraphic Transfer (TT) establishment.
              </li>
              <li>
                <strong>Ocean Freight Transit:</strong> 20ft / 40ft High Cube containers generally require 25-35 days to European ports and 30-45 days to North American ports.
              </li>
              <li>
                <strong>Air Express Courier (Sampling &amp; Urgent Reorders):</strong> Dispatched via DHL, FedEx, or UPS within <strong>3 to 7 business days</strong> globally.
              </li>
            </ul>
          </section>

          {/* Export Documentation */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaFileLines className="text-blue-500 text-base" /> 3. Customs &amp; Export Documentation
            </h2>
            <p>Every commercial export consignment is accompanied by full certified customs documentation:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <FaCircleCheck className="text-emerald-500 shrink-0" />
                <span>Commercial Invoice &amp; Detailed Packing List</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <FaCircleCheck className="text-emerald-500 shrink-0" />
                <span>Original Bill of Lading (B/L) or Airway Bill (AWB)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <FaCircleCheck className="text-emerald-500 shrink-0" />
                <span>Certificate of Origin (EPB / DCCI Bangladesh)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <FaCircleCheck className="text-emerald-500 shrink-0" />
                <span>GSP Form A / REX statement (Duty-free EU access)</span>
              </div>
            </div>
          </section>

          {/* Digital Products */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaDownload className="text-emerald-500 text-base" /> 4. Digital Assets &amp; Software Delivery
            </h2>
            <p>
              Digital products (including Canva Pro team memberships, Google AI cloud licenses, CAD measurement tech packs, and production spreadsheets) are delivered <strong>instantaneously and electronically ($0 shipping fee)</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Direct download links and account invitation tokens are generated immediately upon completed checkout.</li>
              <li>A backup delivery notification containing access credentials is sent to your registered billing email within 5 minutes.</li>
              <li>If you experience any delay in receiving digital tokens, contact our technical team at <a href="mailto:contact@zymi.it" className="text-cyan-600 dark:text-cyan-400 underline">contact@zymi.it</a>.</li>
            </ul>
          </section>

          {/* Amazon Affiliate Physical Items */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaAmazon className="text-amber-500 text-base" /> 5. Amazon Affiliate Physical Merchandise
            </h2>
            <p>
              Physical commercial sewing equipment, fashion accessories, and workshop tools linked through our Amazon Affiliate store are fulfilled directly by Amazon.com and third-party vendors.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Eligible items qualify for Amazon Prime 1-day or 2-day delivery depending on buyer subscription status and geographical region.</li>
              <li>Shipping fees, tracking numbers, and international customs clearance are handled directly through Amazon&apos;s checkout infrastructure.</li>
            </ul>
          </section>

          {/* Inquiries */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. Shipping Inquiries &amp; Freight Tracking
            </h2>
            <p>
              For container tracking updates, container stuffing photos, or custom freight rate quotes:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <a
                href="mailto:export@aelbd.net"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition shadow-sm"
              >
                <FaShip /> Contact B2B Export Desk (export@aelbd.net)
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
              >
                Visit Contact Page
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

