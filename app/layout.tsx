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
  return (
    <html lang="en" suppressHydrationWarning>
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
