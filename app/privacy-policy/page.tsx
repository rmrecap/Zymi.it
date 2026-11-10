import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ZYMI Global",
  description: "Official Privacy Policy of ZYMI Global and Apparel Emporium, detailing data protection, cookie policy, and compliance.",
  alternates: {
    canonical: "https://zymi.it/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: November 10, 2026 • Last Updated: November 2026</p>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            Welcome to ZYMI Global (<strong>zymi.it</strong>). We respect your privacy and are committed to protecting personal data collected through our e-commerce platform, digital downloads marketplace, and B2B garment manufacturing inquiry portal for Apparel Emporium (<strong>aelbd.net</strong>).
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, place an order, download digital assets, request a B2B quotation, or contact our support team:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Contact details:</strong> Name, corporate email address, phone number, and shipping/billing address.</li>
            <li><strong>B2B RFQ Data:</strong> Target quantities, tech packs, measurement specifications, and fabric requirements.</li>
            <li><strong>Payment Information:</strong> Processed securely through encrypted third-party payment gateways (Stripe, PayPal, SSLCommerz). We do not store raw credit card numbers.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Amazon Associate & Affiliate Disclosure</h2>
          <p>
            ZYMI Global participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click on an affiliate link and make a purchase, we may earn a commission at no additional cost to you.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Data Security & Storage</h2>
          <p>
            We deploy strict SSL/TLS encryption, secure NextAuth session mechanisms, and Upstash Context7 caching architecture to prevent unauthorized access, alteration, or disclosure of your personal information.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contact Information</h2>
          <p>
            For questions or requests regarding your data rights, contact us at: <a href="mailto:contact@zymi.it" className="text-cyan-600 dark:text-cyan-400 underline">contact@zymi.it</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
