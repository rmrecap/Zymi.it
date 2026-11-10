/**
 * Server-side / Edge Markdown Content Generator
 * Serves lightweight Markdown representations for AI agents, LLMs, and crawlers
 * when the request sends `Accept: text/markdown` or `?format=md`.
 */

export function getMarkdownForPath(pathname: string): string {
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  switch (cleanPath) {
    case "/":
      return `# ZYMI Global & Apparel Emporium (RMG Hub)

> **Explore • Shop • Learn • Grow**
> Official international technology gateway and B2B digital export portal for **Apparel Emporium** ([aelbd.net](https://aelbd.net)) — an audited ready-made garment manufacturer in Bangladesh producing 2,500,000+ pieces monthly.

---

## Core Navigation & Category Launchpad
- [Digital Assets & Tech Packs](https://zymi.it/shop?type=DIGITAL_DOWNLOAD): AI workflows, Canva Pro team invites, and apparel CAD tech pack bundles.
- [Apparel Emporium B2B Sourcing](https://zymi.it/b2b-apparel): Factory-direct knitwear, heavyweight streetwear fleece hoodies, denim, and custom sampling.
- [Curated Commercial Gear](https://zymi.it/shop?type=AFFILIATE_AMAZON): Industrial sewing machines, heat presses, and fabric cutters.
- [Global Direct Store](https://zymi.it/shop?type=DROPSHIP): Official Apparel Emporium apparel.
- [Free RMG Engineering Calculators](https://zymi.it/tools): Fabric consumption, GSM costing yield, and yarn count converters.
- [Pricing Guide](https://zymi.it/pricing): Transparent rates for manufacturing and digital assets.
- [About Us](https://zymi.it/about): Corporate background and factory compliance.
- [Contact Us](https://zymi.it/contact): Direct inquiries and factory location.

---

## Featured Live Products & Pricing (USD)
| Product Name | Category | FOB / Price | Availability | Link |
| :--- | :--- | :--- | :--- | :--- |
| Google AI Pro Slot + 5TB Cloud (1 Mo) | Digital Asset | $1.74 | In Stock | [View Product](https://zymi.it/product/google-ai-pro-slot-5tb) |
| Gemini Pro Slot + 5TB Cloud (6 Mo) | Digital Asset | $4.19 | In Stock | [View Product](https://zymi.it/product/gemini-pro-slot-5tb-6-months) |
| Canva Pro Join Link (1 Mo Full Warranty) | Digital Asset | $0.80 | In Stock | [View Product](https://zymi.it/product/canva-pro-join-link-1-month) |
| YouTube Premium Slot (1 Mo) | Digital Asset | $1.50 | In Stock | [View Product](https://zymi.it/product/youtube-premium-1-month-slot) |
| Complete RMG Tech Pack Template Bundle | CAD / Vectors | $9.99 | Instant Download | [View Product](https://zymi.it/product/complete-tech-pack-template-bundle) |
| 100% Combed Cotton T-Shirt (200 GSM) | B2B Garments | $2.80 - $4.50 | MOQ 500 pcs | [View Sourcing](https://zymi.it/b2b-apparel) |
| Streetwear Fleece Hoodie (380-450 GSM) | B2B Garments | $7.50 - $11.20 | MOQ 300 pcs | [View Sourcing](https://zymi.it/b2b-apparel) |

---

## Free Textile Engineering Utilities
- **Fabric Consumption Calculator** ([/tools/fabric-consumption-calculator](https://zymi.it/tools/fabric-consumption-calculator)): Instant kg/dozen calculation for t-shirts, polos, and fleece hoodies.
- **GSM Costing Estimator** ([/tools/gsm-costing-estimator](https://zymi.it/tools/gsm-costing-estimator)): Fabric yield per pound and costing analysis for garment merchandisers.
- **Yarn Count Converter** ([/tools/yarn-count-converter](https://zymi.it/tools/yarn-count-converter)): Instant conversion across Ne, Nm, Tex, and Denier count systems.

---

## Apparel Emporium Factory Compliance & Audits
- **OEKO-TEX Standard 100**: 100% skin-safe, certified free from harmful chemical residues.
- **BSCI & Sedex SMETA 4-Pillar**: Fair living wages, safe worker environments, and ethical factory governance.
- **GOTS (Global Organic Textile Standard)**: Certified organic cotton traceability.
- **Monthly Capacity**: 2,500,000+ pieces across circular knitting, dyeing, and automated sewing lines.

---

## Machine-Readable Endpoints
- [LLM Context Index](https://zymi.it/llms.txt)
- [XML Sitemap](https://zymi.it/sitemap.xml)
- [Robots.txt](https://zymi.it/robots.txt)

---

## Corporate Contact & Identity
- **Email**: [contact@zymi.it](mailto:contact@zymi.it)
- **B2B Export Desk**: [export@aelbd.net](mailto:export@aelbd.net)
- **Telephone / WhatsApp**: [+880-1700-000000](tel:+8801700000000)
- **Headquarters**: House 12, Road 4, Sector 3, Uttara, Dhaka-1230, Bangladesh
- **Operating Hours**: Saturday – Thursday: 09:00 – 18:00 BST (UTC+6)
`;

    case "/about":
      return `# About ZYMI Global & Apparel Emporium

> Official international technology gateway and B2B export platform representing **Apparel Emporium** ([aelbd.net](https://aelbd.net)).

## Key Facts & Capabilities
- **Monthly Capacity**: 2,500,000+ garments per month.
- **Export Destinations**: 35+ countries across Europe, North America, and Australia.
- **Certifications**: OEKO-TEX Standard 100, BSCI Social Compliance, Sedex SMETA 4-Pillar, GOTS Organic Cotton.
- **Manufacturing Units**: High-efficiency circular knitting, automated cutting, reactive garment dyeing, and screen/embroidery printing in Dhaka & Gazipur, Bangladesh.

## Strategic Pillars
1. **Direct RMG Manufacturing**: Sourcing without intermediary trading houses, low MOQs, and transparent proforma costing.
2. **Free Engineering Tools**: Open web-based calculators for knit fabric consumption, GSM costing, and yarn counts.
3. **Digital Marketplace**: Instant download tech pack vectors, AI prompts, and cloud creator tools.
4. **Curated Commercial Gear**: Top-rated garment manufacturing hardware and equipment.

## Contact
- Email: contact@zymi.it
- B2B Desk: export@aelbd.net
- Phone: +880-1700-000000
- Location: House 12, Road 4, Sector 3, Uttara, Dhaka-1230, Bangladesh
`;

    case "/pricing":
      return `# Pricing & Sourcing Rates | ZYMI Global

> Transparent pricing across free engineering utilities, digital downloads, and B2B factory manufacturing.

## 1. Free RMG Calculators ($0 Forever)
- Fabric Consumption Calculator: $0.00
- GSM Costing & Yield Estimator: $0.00
- Yarn Count Converter: $0.00
- Unlimited access, no sign-in or payment required.

## 2. Digital Assets & Tech Packs
- Canva Pro 1-Month Team Access: $0.80
- Google AI Pro Slot + 5TB Cloud Storage (1 Mo): $1.74
- Gemini Pro Slot + 5TB Cloud Storage (6 Mo): $4.19
- Complete RMG Tech Pack Template Bundle: $9.99 (one-time lifetime license)

## 3. Apparel Emporium B2B Manufacturing Price Matrix (USD FOB)
- **100% Combed Cotton T-Shirts** (180-220 GSM): $2.80 - $4.50 / pc (MOQ 500 pcs)
- **Heavyweight Streetwear Fleece Hoodies** (380-450 GSM): $7.50 - $11.20 / pc (MOQ 300 pcs)
- **Pique Polo Shirts** (220-240 GSM): $4.20 - $6.80 / pc (MOQ 500 pcs)
- **Denim Jeans & Jackets** (11-14 oz): $8.90 - $14.50 / pc (MOQ 500 pcs)
- **Physical Prototype Sampling**: $50 flat fee per sample (100% credited against bulk production).

## Contact for Custom RFQ
- Inquiries: contact@zymi.it
- Export Desk: export@aelbd.net
- Direct Tel: +880-1700-000000
`;

    case "/contact":
      return `# Contact ZYMI Global & Apparel Emporium

> Direct corporate communication, factory quotation requests, and technical support.

## Corporate Headquarters & Factory Offices
- **Address**: House 12, Road 4, Sector 3, Uttara, Dhaka-1230, Bangladesh
- **General Support Email**: contact@zymi.it
- **B2B Merchandising Desk**: export@aelbd.net
- **Direct Phone / WhatsApp**: +880-1700-000000
- **Operating Hours**: Saturday – Thursday: 09:00 – 18:00 BST (UTC+6)

## Online Inquiry Options
- Submit B2B Sourcing RFQ: https://zymi.it/b2b-apparel
- Transparent Pricing: https://zymi.it/pricing
- Company Profile: https://zymi.it/about
`;

    case "/b2b-apparel":
      return `# Apparel Emporium B2B Garment Manufacturing

> Official technology gateway for **Apparel Emporium** ([aelbd.net](https://aelbd.net)) — Dhaka, Bangladesh.

## Production Capacities
- **Knitwear**: T-shirts, Polo shirts, Tank tops, Henleys (140-260 GSM).
- **Fleece & Streetwear**: Heavyweight French Terry, Brushed Fleece Hoodies, Joggers (300-480 GSM).
- **Woven & Denim**: Workwear trousers, stretch denim jeans, oversized jackets.
- **Factory Certifications**: OEKO-TEX Standard 100, BSCI, Sedex SMETA, GOTS.
- **Sampling**: Fast turnaround 7-10 days, $50 sample fee (100% credited to bulk).
- **Bulk Production Lead Times**: 25-45 days depending on wash and order volume.

## Direct Inquiries
- Email: export@aelbd.net or contact@zymi.it
- Phone: +880-1700-000000
`;

    case "/tools":
      return `# Free RMG & Textile Engineering Utilities

> Professional web-based calculators for apparel merchandisers, textile engineers, and factory owners.

## Available Calculators
1. **Fabric Consumption Calculator** (https://zymi.it/tools/fabric-consumption-calculator)
   - Computes knit fabric needed per dozen garments in kilograms with adjustable wastage allowance.
2. **GSM Costing Estimator** (https://zymi.it/tools/gsm-costing-estimator)
   - Calculates linear yard yield per pound and costing per yard based on fabric width and GSM.
3. **Yarn Count Converter** (https://zymi.it/tools/yarn-count-converter)
   - Converts English Cotton Count (Ne), Metric Count (Nm), Tex (g/km), and Denier (g/9km).

All tools are 100% free with no sign-in or installation required.
`;

    case "/terms":
      return `# Terms of Service | ZYMI Global

- **Effective Date**: November 2026
- **Acceptance**: Using zymi.it implies acceptance of these terms.
- **B2B Manufacturing**: Apparel Emporium (aelbd.net) handles all manufacturing and export contracts subject to official proforma invoices and Bangladesh law.
- **Digital Assets**: Non-exclusive license for personal/commercial development; redistribution prohibited.
- **Affiliate Disclosure**: Amazon Associate participant earning qualifying commissions.
- **Jurisdiction**: Exclusive jurisdiction of the courts of Dhaka, Bangladesh.
`;

    case "/privacy-policy":
      return `# Privacy Policy | ZYMI Global

- **Effective Date**: November 2026
- **Scope**: Covers zymi.it, digital downloads, and B2B apparel inquiries for Apparel Emporium.
- **Data Collected**: Contact details, RFQ specifications, and secure payment logs.
- **Security**: TLS encryption and secure authentication session management.
- **Contact**: Data privacy inquiries directed to contact@zymi.it.
`;

    default:
      // Generic Markdown for dynamic routes (e.g. /product/[slug], /blog/[slug], /shop)
      return `# ZYMI Global - ${cleanPath.replace(/^\//, "").toUpperCase()}

> **ZYMI Global & Apparel Emporium Hybrid Platform**
> https://zymi.it${cleanPath}

## About this Page
This page is part of the ZYMI Global ecosystem ([https://zymi.it](https://zymi.it)).

- **Website**: https://zymi.it
- **Parent Manufacturer**: Apparel Emporium ([https://aelbd.net](https://aelbd.net))
- **Email**: contact@zymi.it
- **Pricing**: https://zymi.it/pricing
- **LLM Full Index**: https://zymi.it/llms.txt
`;
  }
}
