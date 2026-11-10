import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ZYMI Global & Apparel Emporium",
  description:
    "Terms of Service governing the use of ZYMI Global, digital asset licensing, and B2B apparel manufacturing services in collaboration with Apparel Emporium.",
  alternates: {
    canonical: "https://zymi.it/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-3">
            Legal Agreement
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Effective Date: November 10, 2026 • Last Updated: November 2026</p>
        </div>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the ZYMI Global website (<strong>zymi.it</strong>) and associated digital services, you agree to be bound by these Terms of Service and our{" "}
            <Link href="/privacy-policy" className="text-cyan-600 dark:text-cyan-400 underline">
              Privacy Policy
            </Link>
            . If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. B2B Apparel Manufacturing &amp; RFQs</h2>
          <p>
            ZYMI Global operates as the official digital and export promotional gateway for <strong>Apparel Emporium</strong> (
            <a href="https://aelbd.net" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 underline">
              aelbd.net
            </a>
            ). All Requests for Quotation (RFQs), production contracts, sample developments, and bulk apparel manufacturing agreements are subject to official proforma invoices, LC/TT financing conditions, and compliance with Bangladesh export regulations.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Production leads times are calculated upon sample sign-off and LC establishment.</li>
            <li>Color shades and fabric tolerance levels adhere to standard international AQL 2.5 textile benchmarks.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Digital Assets &amp; Tech Pack Downloads</h2>
          <p>
            Digital products, including Canva templates, apparel tech packs, size specification charts, and engineering sheets are licensed, not sold. Upon purchase or free download:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>You receive a non-exclusive, non-transferable license for personal or commercial development.</li>
            <li>You may not resell, redistribute, sub-license, or republish original digital assets on third-party stock platforms.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Amazon Affiliate &amp; Third-Party Services</h2>
          <p>
            Certain physical products displayed on ZYMI Global link directly to Amazon and other third-party vendors. Pricing, shipping, warranties, and return policies for affiliate products are determined by the respective vendor. ZYMI Global is not responsible for transactions conducted on external partner sites.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any legal action or proceeding arising out of these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Inquiries &amp; Legal Notices</h2>
          <p>
            For questions regarding these terms, contact us at:{" "}
            <a href="mailto:contact@zymi.it" className="text-cyan-600 dark:text-cyan-400 underline">
              contact@zymi.it
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-cyan-600 dark:text-cyan-400 underline">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

