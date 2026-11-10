import React from "react";
import Hero3DSection from "@/components/Hero3DSection";
import FeaturedDigitalProducts from "@/components/FeaturedDigitalProducts";
import SplitUtilityDealsSection from "@/components/SplitUtilityDealsSection";
import GlobalSourcingHub from "@/components/GlobalSourcingHub";
import BlogAndInfluencerStrip from "@/components/BlogAndInfluencerStrip";

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
    email: "contact@zymi.it",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ZYMI Global's relationship with Apparel Emporium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ZYMI Global is the official international technology hub and B2B digital export gateway for Apparel Emporium (aelbd.net), a certified ready-made garment (RMG) manufacturer based in Bangladesh.",
        },
      },
      {
        "@type": "Question",
        name: "How does the B2B garment manufacturing sourcing work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Global apparel brands can submit RFQs directly through ZYMI Global for OEKO-TEX, BSCI, and GOTS-certified knitwear, denim, and woven garments with flexible MOQs and direct factory pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Are the digital products delivered instantly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all digital downloads including AI prompt packs, tech pack CAD files, and design templates are delivered instantly upon checkout.",
        },
      },
    ],
  };

  const featuredProductsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Products & Sourcing Offers",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Google AI Pro Slot + 5TB 1 Month Full Warranty",
          image: "https://zymi.it/digital_ai_prompts.svg",
          description: "Google AI Pro Slot + 5TB Google One 1 Month Full Warranty family cloud invite.",
          sku: "canboso_6aef1d8dadf360530f723f20",
          offers: {
            "@type": "Offer",
            url: "https://zymi.it/product/google-ai-pro-slot-5tb",
            priceCurrency: "USD",
            price: "1.74",
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Gemini Pro Slot + 5TB Google One 6 Months Full Warranty",
          image: "https://zymi.it/digital_ai_prompts.svg",
          description: "Gemini Pro Slot + 5TB Google One 6 Months Full Warranty.",
          sku: "canboso_6ae92bc35edeecad99f76f79",
          offers: {
            "@type": "Offer",
            url: "https://zymi.it/product/gemini-pro-slot-5tb-6-months",
            priceCurrency: "USD",
            price: "4.19",
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Canva Pro Join Link 1 Month Full Warranty",
          image: "https://zymi.it/digital_design_templates.svg",
          description: "Canva Pro Join Link 1 Month Full Warranty team workspace invite.",
          sku: "canboso_6aea8c51adf86f5477863e33",
          offers: {
            "@type": "Offer",
            url: "https://zymi.it/product/canva-pro-join-link-1-month",
            priceCurrency: "USD",
            price: "0.80",
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Apparel Emporium Heavyweight Export T-Shirt",
          image: "https://zymi.it/hero_factory_panoramic.svg",
          description: "Direct RMG Factory Manufacturing 100% Combed Cotton 200 GSM T-Shirt.",
          sku: "ael_ts_200",
          offers: {
            "@type": "Offer",
            url: "https://zymi.it/product/apparel-emporium-heavyweight-tshirt",
            priceCurrency: "USD",
            price: "2.80",
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        },
      },
    ],
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

      {/* 4. FAQPage JSON-LD Block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 5. Product & Offer Schema JSON-LD Block (Reachable without JS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredProductsSchema) }}
      />

      {/* 6. Semantic Machine-Readable Contact Details for Agents & Crawlers */}
      <div className="sr-only" itemScope itemType="https://schema.org/Organization">
        <span itemProp="name">ZYMI Global</span>
        <a href="mailto:contact@zymi.it" itemProp="email">contact@zymi.it</a>
        <a href="tel:+8801700000000" itemProp="telephone">+880-1700-000000</a>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">House 12, Road 4, Sector 3, Uttara</span>
          <span itemProp="addressLocality">Dhaka</span>
          <span itemProp="addressCountry">BD</span>
        </div>
      </div>

      {/* 7. Static Server-Rendered Product & Offer Microdata for Non-JS Crawlers */}
      <section className="sr-only" aria-label="Featured Product Offers">
        <div itemScope itemType="https://schema.org/ItemList">
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
            <span itemProp="name">Google AI Pro Slot + 5TB 1 Month Full Warranty</span>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="price">1.74</span>
              <span itemProp="priceCurrency">USD</span>
              <link itemProp="availability" href="https://schema.org/InStock" />
              <a href="https://zymi.it/product/google-ai-pro-slot-5tb" itemProp="url">View Product</a>
            </div>
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
            <span itemProp="name">Canva Pro Join Link 1 Month Full Warranty</span>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="price">0.80</span>
              <span itemProp="priceCurrency">USD</span>
              <link itemProp="availability" href="https://schema.org/InStock" />
              <a href="https://zymi.it/product/canva-pro-join-link-1-month" itemProp="url">View Product</a>
            </div>
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
            <span itemProp="name">Apparel Emporium Heavyweight Export T-Shirt</span>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="price">2.80</span>
              <span itemProp="priceCurrency">USD</span>
              <link itemProp="availability" href="https://schema.org/InStock" />
              <a href="https://zymi.it/product/apparel-emporium-heavyweight-tshirt" itemProp="url">View Product</a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Declarative WebMCP Annotated Forms for In-Browser AI Agents */}
      <div className="sr-only" aria-hidden="true">
        <form
          id="webmcp-search-form"
          action="/search"
          method="GET"
          toolname="search_products"
          tooldescription="Search products, digital assets, and RMG manufacturing items on ZYMI Global"
          data-toolname="search_products"
          data-tooldescription="Search products, digital assets, and RMG manufacturing items on ZYMI Global"
        >
          <input type="text" name="search" placeholder="Search query" defaultValue="" />
          <button type="submit">Search</button>
        </form>

        <form
          id="webmcp-calculator-form"
          action="/tools/fabric-consumption-calculator"
          method="GET"
          toolname="calculate_fabric_consumption"
          tooldescription="Calculate knit fabric consumption in kilograms per dozen for t-shirts, polos, or hoodies"
          data-toolname="calculate_fabric_consumption"
          data-tooldescription="Calculate knit fabric consumption in kilograms per dozen for t-shirts, polos, or hoodies"
        >
          <input type="number" name="length" placeholder="Length cm" defaultValue={70} />
          <input type="number" name="chest" placeholder="Chest cm" defaultValue={50} />
          <input type="number" name="gsm" placeholder="GSM" defaultValue={180} />
          <button type="submit">Calculate</button>
        </form>

        <form
          id="webmcp-sourcing-form"
          action="/b2b-apparel"
          method="GET"
          toolname="get_b2b_sourcing_quote"
          tooldescription="Request Apparel Emporium factory FOB price estimations for bulk apparel orders"
          data-toolname="get_b2b_sourcing_quote"
          data-tooldescription="Request Apparel Emporium factory FOB price estimations for bulk apparel orders"
        >
          <input type="text" name="category" placeholder="t-shirt, hoodie, polo, denim" defaultValue="t-shirt" />
          <input type="number" name="quantity" placeholder="Quantity" defaultValue={500} />
          <button type="submit">Get Quote</button>
        </form>
      </div>

      {/* 1. 3D Hero Section & 7-Item Category Launchpad */}
      <Hero3DSection />

      {/* Pricing Quick Access Banner (Reachable without JS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Transparent Pricing &amp; Sourcing Rates
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Instant Digital Assets from <span className="text-cyan-600 dark:text-cyan-400 font-black">$0.80</span> • Factory Direct Sourcing from <span className="text-cyan-600 dark:text-cyan-400 font-black">$2.80/pc</span> • Free Engineering Tools <span className="text-emerald-600 dark:text-emerald-400 font-black">$0</span>
            </p>
          </div>
          <a
            href="/pricing"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shrink-0 transition shadow-sm flex items-center gap-1.5"
          >
            <span>View Pricing Guide</span>
          </a>
        </div>
      </section>

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
