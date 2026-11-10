import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/utils/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Providers";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";

const inter = Inter({ subsets: ["latin"] });

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
  other: {
    "content-signal": "search=yes, ai-train=no",
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
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200`}>
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
