import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/utils/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Providers";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a18",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zymi.it"),
  alternates: {
    canonical: "https://zymi.it",
  },
  title: {
    default: "ZYMI RMG Hub | Global Multipurpose Commerce & Apparel Emporium",
    template: "%s | ZYMI Global",
  },
  description:
    "Explore • Shop • Learn • Grow. Official promotion and B2B export gateway for Apparel Emporium (aelbd.net). Direct factory sourcing, digital tech packs, free textile calculators, and trending affiliate deals.",
  openGraph: {
    title: "ZYMI RMG Hub | Global Multipurpose Commerce & Apparel Emporium",
    description:
      "Explore • Shop • Learn • Grow. Official promotion and B2B export gateway for Apparel Emporium (aelbd.net). Direct factory sourcing, digital tech packs, free textile calculators, and trending affiliate deals.",
    url: "https://zymi.it",
    siteName: "ZYMI Global",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZYMI RMG Hub | Global Multipurpose Commerce & Apparel Emporium",
    description:
      "Explore • Shop • Learn • Grow. Official promotion and B2B export gateway for Apparel Emporium (aelbd.net).",
  },
  keywords: [
    "Apparel Emporium",
    "aelbd.net",
    "ZYMI Hub",
    "RMG manufacturer Bangladesh",
    "garment export",
    "fabric consumption calculator",
    "yarn count converter",
    "GSM costing estimator",
    "digital products",
    "amazon creators affiliate",
  ],
  authors: [{ name: "Apparel Emporium & ZYMI Engineering Team" }],
  verification: {
    google: "ZCdfrYcpZJN5c_i85N8IamTsP2pkNv4mSQYnw4V9jNg",
  },
  other: {
    "content-signal": "search=yes, ai-train=no",
    "google-site-verification": "ZCdfrYcpZJN5c_i85N8IamTsP2pkNv4mSQYnw4V9jNg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

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
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="ZCdfrYcpZJN5c_i85N8IamTsP2pkNv4mSQYnw4V9jNg" />
        {/* Preconnect & DNS-Prefetch for External Product Images */}
        <link rel="preconnect" href="https://m.media-amazon.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* WebMCP Tool Registration on Page Load for In-Browser Agents */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(typeof window!=="undefined"&&typeof navigator!=="undefined"){if(!navigator.modelContext){var m=new Map();navigator.modelContext={tools:m,registerTool:function(t){m.set(t.name,t);if(typeof window.dispatchEvent==="function"){window.dispatchEvent(new CustomEvent("modelContext:toolRegistered",{detail:t}));}},getTools:function(){return Array.from(m.values());},executeTool:function(n,p){var t=m.get(n);if(!t)throw new Error("Tool not found: "+n);return t.execute(p);}};}if(typeof navigator.modelContext.registerTool==="function"){navigator.modelContext.registerTool({name:"search_products",description:"Search ZYMI Global catalog for digital downloads, B2B apparel, and commercial equipment.",inputSchema:{type:"object",properties:{query:{type:"string",description:"Search query or product keyword"}},required:["query"]},execute:function(p){var q=p&&p.query?encodeURIComponent(p.query):"";window.location.href="/search?search="+q;return Promise.resolve({success:true,url:"/search?search="+q});}});navigator.modelContext.registerTool({name:"calculate_fabric_consumption",description:"Calculate knit fabric consumption in kilograms per dozen for t-shirts, polos, or hoodies.",inputSchema:{type:"object",properties:{bodyLengthCm:{type:"number",description:"Garment length in cm"},halfChestCm:{type:"number",description:"Half chest width in cm"},gsm:{type:"number",description:"Fabric GSM weight"},wastagePercent:{type:"number",description:"Wastage percentage"}},required:["bodyLengthCm","halfChestCm","gsm"]},execute:function(p){var l=p.bodyLengthCm||70,w=p.halfChestCm||50,g=p.gsm||180,wast=p.wastagePercent||7;var c=((l*w*2*g*12)/10000000)*(1+wast/100);return Promise.resolve({consumptionKgPerDozen:Number(c.toFixed(2)),unit:"kg/dozen"});}});navigator.modelContext.registerTool({name:"get_b2b_sourcing_quote",description:"Get Apparel Emporium direct factory FOB price estimations for bulk garment manufacturing.",inputSchema:{type:"object",properties:{category:{type:"string",description:"Garment category: t-shirt, hoodie, polo, denim"},quantity:{type:"number",description:"Order quantity"}},required:["category"]},execute:function(p){var c=(p&&p.category?p.category:"t-shirt").toLowerCase();var pr={"t-shirt":{min:2.8,max:4.5,moq:500,lead:"25-35 days"},hoodie:{min:7.5,max:11.2,moq:300,lead:"30-40 days"},polo:{min:4.2,max:6.8,moq:500,lead:"25-35 days"},denim:{min:8.9,max:14.5,moq:500,lead:"35-45 days"}};var item=pr[c]||pr["t-shirt"];return Promise.resolve({manufacturer:"Apparel Emporium (aelbd.net)",category:c,estimatedFobUsd:"$"+item.min+" - $"+item.max,moq:item.moq,leadTime:item.lead,certifications:["OEKO-TEX","BSCI","Sedex","GOTS"]});}});navigator.modelContext.registerTool({name:"get_pricing_catalog",description:"Retrieve official transparent pricing for digital tools, cloud family slots, and manufacturing.",inputSchema:{type:"object",properties:{}},execute:function(){return Promise.resolve({digitalAssets:[{item:"Canva Pro",price:"$0.80"},{item:"Google AI Pro Slot",price:"$1.74"},{item:"CAD Tech Pack Bundle",price:"$9.99"}],b2bApparel:[{item:"T-Shirt",fob:"$2.80 - $4.50"},{item:"Hoodie",fob:"$7.50 - $11.20"}],url:"https://zymi.it/pricing"});}});}}}catch(e){console.warn("[WebMCP] Init note:",e);}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-slate-950`}>
        <SessionProvider session={session}>
          <SessionTimeoutWrapper />
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
