import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRotateLeft,
  FaShieldHalved,
  FaFileContract,
  FaDownload,
  FaAmazon,
  FaEnvelope,
  FaCircleCheck,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Return & Refund Policy | ZYMI Global & Apparel Emporium",
  description:
    "Official Return & Refund Policy for ZYMI Global, outlining B2B garment quality guarantees (AQL 2.5), digital asset replacement warranty, and Amazon affiliate return guidelines.",
  alternates: {
    canonical: "https://zymi.it/returns",
  },
  openGraph: {
    title: "Return & Refund Policy | ZYMI Global",
    description:
      "Comprehensive return and refund guidelines for Apparel Emporium B2B manufacturing, digital software assets, and retail purchases.",
    url: "https://zymi.it/returns",
    type: "website",
  },
};

export default function ReturnsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Return & Refund Policy",
    url: "https://zymi.it/returns",
    description:
      "Official return and refund policy covering B2B garment quality guarantees, digital license warranties, and affiliate returns.",
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
          name: "Return Policy",
          item: "https://zymi.it/returns",
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-3">
              <FaArrowRotateLeft className="text-xs" /> Customer Protection &amp; Quality Guarantee
            </span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Return &amp; Refund Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: November 10, 2026 • Last Updated: November 2026
            </p>
          </div>

          {/* Overview */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Policy Overview
            </h2>
            <p>
              At ZYMI Global (<strong>zymi.it</strong>), we stand firmly behind the quality of every product and service we offer. Because our platform combines B2B industrial manufacturing, instant digital software tools, and retail affiliate merchandise, each category has a tailored policy to ensure complete transparency and fair resolution.
            </p>
          </section>

          {/* B2B Garment Manufacturing */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaShieldHalved className="text-cyan-500 text-base" /> 2. Apparel Emporium B2B Garment Quality Guarantee
            </h2>
            <p>
              All bulk garment manufacturing orders manufactured by <strong>Apparel Emporium</strong> (
              <a
                href="https://aelbd.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 underline font-medium"
              >
                aelbd.net
              </a>
              ) are produced under strict international quality assurance protocols:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>AQL 2.5 Inspection Standard:</strong> Every production batch is inspected under the internationally recognized Acceptable Quality Limit (AQL) 2.5 benchmark for major defects and 4.0 for minor defects before leaving our Dhaka/Gazipur facilities.
              </li>
              <li>
                <strong>Third-Party Pre-Shipment Inspection:</strong> Buyers are welcome to commission certified third-party inspection agencies (e.g., SGS, Intertek, Bureau Veritas, TÜV SÜD) prior to final container loading.
              </li>
              <li>
                <strong>14-Day Claim Window:</strong> In the rare event of manufacturing defects exceeding agreed tolerance limits, written notification along with high-resolution photographic evidence and third-party inspection reports must be submitted within <strong>14 calendar days</strong> of customs release at destination port.
              </li>
              <li>
                <strong>Remediation Protocols:</strong> Validated manufacturing discrepancies will be resolved via factory re-production, proforma credit adjustments on future shipments, or negotiated financial compensation as stipulated in the underlying commercial contract.
              </li>
            </ul>
          </section>

          {/* Sample Orders */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaFileContract className="text-blue-500 text-base" /> 3. Physical Prototype Sample Policy
            </h2>
            <p>
              Custom sampling allows brand founders and fashion labels to test fabric drape, measurement grading, and print technique before committing to bulk manufacturing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Our standard sample development fee is <strong>$50 flat per prototype</strong> (including courier shipping).</li>
              <li>
                <strong>100% Bulk Credit:</strong> When you confirm a bulk production order meeting the Minimum Order Quantity (MOQ) within 60 days of sample delivery, the full $50 sample fee is credited toward your bulk production invoice.
              </li>
              <li>Sample development fees are non-refundable once fabric knitting and lab dips have commenced.</li>
            </ul>
          </section>

          {/* Digital Assets */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaDownload className="text-emerald-500 text-base" /> 4. Digital Assets &amp; Software Licenses Warranty
            </h2>
            <p>
              Due to the immediate access nature of electronic software, CAD vectors, and cloud account credentials, digital sales are generally considered final once credentials or vector files have been downloaded or redeemed.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FaCircleCheck className="text-emerald-500" /> 7-Day Replacement Warranty
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                If an account invite link (e.g., Canva Pro team link, Google AI cloud slot, YouTube Premium invite) ceases to function within the guaranteed subscription period, ZYMI Global provides an <strong>immediate free replacement or re-invite within 24 hours</strong>. If we cannot restore your service, a prorated or full refund will be credited to your original payment method.
              </p>
            </div>
          </section>

          {/* Amazon Affiliate */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaAmazon className="text-amber-500 text-base" /> 5. Amazon Affiliate Physical Merchandise
            </h2>
            <p>
              For commercial garment machinery, fabric cutters, and retail goods ordered via external partner links (such as Amazon.com):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Transactions, billing, and returns are managed according to <strong>Amazon&apos;s standard 30-day return policy</strong>.</li>
              <li>You may initiate a return or request a prepaid return label directly via your Amazon Order History.</li>
              <li>ZYMI Global does not process physical returns or handle payment refunds for third-party affiliate purchases.</li>
            </ul>
          </section>

          {/* Claim Submission */}
          <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              6. How to Submit a Claim
            </h2>
            <p>
              To initiate an RMA, request a digital key replacement, or open a factory quality inquiry, please contact our support desk with your order number and issue description:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <a
                href="mailto:contact@zymi.it"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-sm"
              >
                <FaEnvelope /> Email Support (contact@zymi.it)
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
              >
                Visit Contact Desk
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

