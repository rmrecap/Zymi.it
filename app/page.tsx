import React from "react";
import {
  Hero3DSection,
  FeaturedDigitalProducts,
  SplitUtilityDealsSection,
  GlobalSourcingHub,
  BlogAndInfluencerStrip,
} from "@/components";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineBusiness"],
        "@id": "https://zymi.it/#organization",
        name: "ZYMI Global",
        alternateName: "ZYMI RMG Hybrid Platform",
        url: "https://zymi.it",
        logo: {
          "@type": "ImageObject",
          url: "https://zymi.it/logo%20v1.png",
          caption: "ZYMI Global Logo",
        },
        image: "https://zymi.it/hero_factory_panoramic.svg",
        description:
          "Global RMG Industry Hub, Apparel Emporium B2B Showcase, Free Textile Calculators & Hybrid E-Commerce Engine.",
        email: "contact@zymi.it",
        parentOrganization: {
          "@type": "Organization",
          name: "Apparel Emporium",
          url: "https://aelbd.net",
        },
        sameAs: [
          "https://aelbd.net",
          "https://github.com/rmrecap/Zymi.it",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "Customer Support & B2B Inquiries",
            email: "contact@zymi.it",
            availableLanguage: ["English", "Bengali"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "ZYMI Commerce & Manufacturing Solutions",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "B2B Apparel Manufacturing & Factory Direct Sourcing",
            },
            {
              "@type": "OfferCatalog",
              name: "Curated Commercial & Industrial Garment Equipment",
            },
            {
              "@type": "OfferCatalog",
              name: "Digital Downloads & Tech Pack Templates",
            },
            {
              "@type": "OfferCatalog",
              name: "Free Textile Engineering & GSM Calculators",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://zymi.it/#website",
        url: "https://zymi.it",
        name: "ZYMI Global",
        description:
          "International RMG Hybrid Commerce, Apparel Factory Direct Sourcing & Textile Tools",
        publisher: {
          "@id": "https://zymi.it/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://zymi.it/search?query={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16 transition-colors duration-200">
      {/* Schema.org JSON-LD Structured Data Block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. 3D Hero Section & 7-Item Category Launchpad */}
      <Hero3DSection />

      {/* 2. Featured Digital Products Grid (3D Box Artwork + Instant Cart) */}
      <FeaturedDigitalProducts />

      {/* 3. Side-by-Side Dual Module: RMG Utility Tools & Trending Affiliate Deals */}
      <SplitUtilityDealsSection />

      {/* 4. Global Sourcing Hub (Apparel Emporium Factory, OEKO-TEX / BSCI / SEDEX / GOTS) */}
      <GlobalSourcingHub />

      {/* 5. Split Bottom Strip: Latest Blog Posts & Trending TikTok/Instagram Reels */}
      <BlogAndInfluencerStrip />
    </main>
  );
}
