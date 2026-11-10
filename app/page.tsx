import React from "react";
import {
  Hero3DSection,
  FeaturedDigitalProducts,
  SplitUtilityDealsSection,
  GlobalSourcingHub,
  BlogAndInfluencerStrip,
} from "@/components";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://zymi.it/#organization",
    name: "ZYMI Global",
    alternateName: "ZYMI RMG Hybrid Platform",
    legalName: "ZYMI Global & Apparel Emporium Hub",
    url: "https://zymi.it",
    logo: "https://zymi.it/logo%20v1.png",
    image: "https://zymi.it/hero_factory_panoramic.svg",
    description:
      "Global RMG Industry Hub, Apparel Emporium B2B Showcase, Free Textile Calculators & Hybrid E-Commerce Engine.",
    email: "contact@zymi.it",
    telephone: "+880-1700-000000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 12, Road 4, Sector 3, Uttara",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka Division",
      postalCode: "1230",
      addressCountry: "BD",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Apparel Emporium",
      url: "https://aelbd.net",
    },
    sameAs: [
      "https://aelbd.net",
      "https://github.com/rmrecap/Zymi.it",
      "https://www.facebook.com/zymiglobal",
      "https://www.linkedin.com/company/apparelemporium",
      "https://www.instagram.com/zymi.it",
      "https://twitter.com/zymiglobal",
      "https://x.com/zymiglobal",
      "https://www.youtube.com/@zymiglobal",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+880-1700-000000",
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
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zymi.it/#localbusiness",
    name: "ZYMI Global & Apparel Emporium Hub",
    image: "https://zymi.it/hero_factory_panoramic.svg",
    url: "https://zymi.it",
    telephone: "+880-1700-000000",
    priceRange: "$$",
    sameAs: [
      "https://aelbd.net",
      "https://github.com/rmrecap/Zymi.it",
      "https://www.facebook.com/zymiglobal",
      "https://www.linkedin.com/company/apparelemporium",
      "https://www.instagram.com/zymi.it",
      "https://twitter.com/zymiglobal",
      "https://x.com/zymiglobal",
      "https://www.youtube.com/@zymiglobal",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 12, Road 4, Sector 3, Uttara",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka Division",
      postalCode: "1230",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8759,
      longitude: 90.3795,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    paymentAccepted: "Cash, Credit Card, PayPal, Visa, MasterCard",
    currenciesAccepted: "USD, BDT, EUR",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
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
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16 transition-colors duration-200">
      {/* 1. Explicit Organization JSON-LD Block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* 2. Explicit LocalBusiness JSON-LD Block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* 3. WebSite & SearchAction JSON-LD Block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
