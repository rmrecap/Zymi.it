import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaCheck,
  FaIndustry,
  FaDownload,
  FaCalculator,
  FaArrowRight,
  FaShieldHalved,
  FaGlobe,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Pricing & Factory Sourcing Rates | ZYMI Global",
  description:
    "Transparent pricing for B2B apparel manufacturing, digital downloads, tech pack templates, and free textile engineering calculators at ZYMI Global.",
  alternates: {
    canonical: "https://zymi.it/pricing",
  },
};

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "ZYMI Global & Apparel Emporium Pricing Catalog",
    description: "Transparent pricing across digital assets, factory manufacturing, and textile tools.",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Free Textile Engineering & GSM Calculators",
        price: "0.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "100% free knit fabric consumption, GSM costing estimators, and yarn count converters.",
        url: "https://zymi.it/tools",
      },
      {
        "@type": "Offer",
        name: "Google AI Pro Slot + 5TB Cloud Storage",
        price: "1.74",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "1 Month Google AI Pro family slot with 5TB storage and full warranty.",
        url: "https://zymi.it/product/google-ai-pro-slot-5tb",
      },
      {
        "@type": "Offer",
        name: "Canva Pro Join Link (1 Month)",
        price: "0.80",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Canva Pro workspace team join link with 1 month warranty.",
        url: "https://zymi.it/product/canva-pro-join-link-1-month",
      },
      {
        "@type": "Offer",
        name: "Complete RMG Tech Pack Template Bundle",
        price: "9.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Vector CAD flats, measurement specs, bill of materials, and size gradings.",
        url: "https://zymi.it/product/complete-tech-pack-template-bundle",
      },
      {
        "@type": "Offer",
        name: "B2B Export T-Shirt Manufacturing (Custom Order)",
        price: "2.80",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "2.80",
          maxPrice: "4.50",
          priceCurrency: "USD",
          unitCode: "C62",
        },
        availability: "https://schema.org/InStock",
        description: "Direct RMG factory manufacturing for 100% combed cotton 180-220 GSM t-shirts. MOQ 500 pcs.",
        url: "https://zymi.it/b2b-apparel",
      },
      {
        "@type": "Offer",
        name: "Heavyweight Streetwear Fleece Hoodie Manufacturing",
        price: "7.50",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "7.50",
          maxPrice: "11.20",
          priceCurrency: "USD",
          unitCode: "C62",
        },
        availability: "https://schema.org/InStock",
        description: "Custom 380-450 GSM French Terry / Brushed Fleece hoodies with custom trims and branding. MOQ 300 pcs.",
        url: "https://zymi.it/b2b-apparel",
      },
    ],
  };

  const digitalTiers = [
    {
      title: "Free Tools & Utilities",
      price: "$0",
      period: "Forever Free",
      description: "Essential textile calculators and design utilities without sign-up.",
      features: [
        "Knit Fabric Consumption Calculator",
        "GSM Costing & Yield Estimator",
        "Yarn Count & Denier Converter",
        "Unlimited instant calculations",
        "No login or credit card required",
      ],
      ctaText: "Use Free Tools",
      ctaHref: "/tools",
      popular: false,
    },
    {
      title: "Digital Assets & Prompts",
      price: "$0.80",
      period: "Starting from",
      description: "Verified creator assets, cloud slots, and AI workflow packages.",
      features: [
        "Google AI / Gemini 5TB Slots ($1.74 - $4.19)",
        "Canva Pro Team Invite ($0.80)",
        "Ultimate AI Prompt Pack",
        "Instant digital delivery",
        "Full replacement guarantee",
      ],
      ctaText: "Browse Digital Store",
      ctaHref: "/shop?type=DIGITAL_DOWNLOAD",
      popular: true,
    },
    {
      title: "RMG Tech Pack CAD Bundle",
      price: "$9.99",
      period: "One-time download",
      description: "Commercial garment tech packs, measurement charts, and CAD vectors.",
      features: [
        "50+ Vector Fashion Flats (AI / PDF / EPS)",
        "Standard European & US size gradation charts",
        "BOM & sewing stitch guidelines",
        "Factory-ready production files",
        "Commercial usage rights included",
      ],
      ctaText: "Get CAD Bundle",
      ctaHref: "/product/complete-tech-pack-template-bundle",
      popular: false,
    },
  ];

  const manufacturingTiers = [
    {
      item: "100% Combed Cotton T-Shirts",
      specs: "180 - 220 GSM • Bio-washed",
      moq: "500 pcs / colorway",
      priceRange: "$2.80 - $4.50",
      leadTime: "25 - 35 days",
    },
    {
      item: "Heavyweight Streetwear Hoodies",
      specs: "380 - 450 GSM • French Terry",
      moq: "300 pcs / design",
      priceRange: "$7.50 - $11.20",
      leadTime: "30 - 40 days",
    },
    {
      item: "Pique Polo Shirts",
      specs: "220 - 240 GSM • Reactive Dyed",
      moq: "500 pcs / colorway",
      priceRange: "$4.20 - $6.80",
      leadTime: "25 - 35 days",
    },
    {
      item: "Custom Denim Jeans & Jackets",
      specs: "11 - 14 oz • Stone / Acid Wash",
      moq: "500 pcs / style",
      priceRange: "$8.90 - $14.50",
      leadTime: "35 - 45 days",
    },
    {
      item: "Physical Sample Development",
      specs: "1:1 Prototype from Tech Pack",
      moq: "1 pc",
      priceRange: "$50 flat fee",
      leadTime: "7 - 10 days (100% credited on bulk)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-16 px-4 sm:px-6 lg:px-8">
      {/* Schema.org OfferCatalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Transparent Pricing &amp; Factory Rates
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Simple, Transparent Pricing with No Hidden Fees
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether you need free textile engineering calculators, instant digital tech pack downloads, or factory-direct B2B garment manufacturing through Apparel Emporium (aelbd.net), our pricing is completely accessible.
          </p>
        </div>

        {/* Section 1: Digital Products & Free Tools */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <FaDownload className="text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Digital Downloads &amp; Engineering Utilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {digitalTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-200 ${
                  tier.popular
                    ? "bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10"
                    : "bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      / {tier.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-slate-100 dark:border-slate-800/80 pt-6">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <FaCheck className="text-emerald-500 shrink-0 mt-0.5 text-[11px]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={tier.ctaHref}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-md shadow-cyan-500/20"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Apparel Emporium B2B Manufacturing Price Matrix */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FaIndustry className="text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Apparel Emporium B2B Factory Sourcing Matrix
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Audited by OEKO-TEX Standard 100 • BSCI • Sedex • GOTS
            </span>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-bold text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-4 px-6">Garment Category</th>
                  <th className="py-4 px-6">Fabric / Specs</th>
                  <th className="py-4 px-6">Minimum Order (MOQ)</th>
                  <th className="py-4 px-6">FOB Unit Price (USD)</th>
                  <th className="py-4 px-6">Production Lead Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {manufacturingTiers.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {row.item}
                    </td>
                    <td className="py-4 px-6">{row.specs}</td>
                    <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">
                      {row.moq}
                    </td>
                    <td className="py-4 px-6 font-black text-cyan-600 dark:text-cyan-400">
                      {row.priceRange}
                    </td>
                    <td className="py-4 px-6">{row.leadTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-cyan-900/10 to-transparent border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Need a Custom Tech Pack Quote or Factory Audit?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Submit tech packs directly to Apparel Emporium for an official proforma quotation within 24 hours.
              </p>
            </div>
            <Link
              href="/b2b-apparel"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shrink-0 transition"
            >
              Request Custom RFQ
            </Link>
          </div>
        </div>

        {/* Section 3: Machine-Readable Price Guarantee & Contact */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <FaShieldHalved className="text-cyan-600 dark:text-cyan-400" />
            <span>Price Transparency &amp; Agent Accessibility</span>
          </div>
          <p className="leading-relaxed">
            All prices listed on ZYMI Global are quoted in United States Dollars (USD) and represent direct export pricing from our manufacturing units in Dhaka and Gazipur, Bangladesh. For physical creator gear curated from Amazon, real-time pricing is dynamically reflected on the official Amazon product listing page without markup.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Inquiries: <a href="mailto:contact@zymi.it" className="text-cyan-600 dark:text-cyan-400 underline">contact@zymi.it</a></span>
            <span>B2B Export Desk: <a href="mailto:export@aelbd.net" className="text-cyan-600 dark:text-cyan-400 underline">export@aelbd.net</a></span>
            <span>Tel: <a href="tel:+8801700000000" className="text-cyan-600 dark:text-cyan-400 underline">+880-1700-000000</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
