"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaperPlane,
  FaCircleCheck,
  FaIndustry,
  FaClock,
} from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate/post to API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      toast.success("Thank you! Your inquiry has been dispatched to our team.");
    } catch {
      toast.error("Failed to submit inquiry. Please email contact@zymi.it directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 transition-colors duration-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Contact ZYMI Global
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Have questions about Apparel Emporium B2B factory orders, digital downloads, or commercial gear? We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Contact Info & Factory Details */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Corporate Headquarters & Support
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 text-base">
                    <FaLocationDot />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Factory & Office Address</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      House 12, Road 4, Sector 3, Uttara, Dhaka-1230, Bangladesh
                    </p>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1 font-semibold">
                      Apparel Emporium Manufacturing Complex
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 text-base">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Email Inquiries</h3>
                    <a
                      href="mailto:contact@zymi.it"
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                    >
                      contact@zymi.it
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-base">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Direct Phone & WhatsApp</h3>
                    <a
                      href="tel:+8801700000000"
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                    >
                      +880-1700-000000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-base">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Operating Hours</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Saturday – Thursday: 9:00 AM – 6:00 PM (BST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick B2B Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-cyan-900/10 to-transparent border border-cyan-500/20 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Looking for Bulk Apparel Sourcing?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Submit tech packs and request factory quotation directly.</p>
              </div>
              <Link
                href="/b2b-apparel"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shrink-0 transition"
              >
                B2B Portal
              </Link>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-3xl">
                  <FaCircleCheck />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to ZYMI Global. Our corporate merchandising team will review your inquiry and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Send a Direct Message
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Corporate / Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="B2B Manufacturing Quote">B2B Manufacturing Quote</option>
                    <option value="Digital Product Support">Digital Product Support</option>
                    <option value="Amazon Affiliate & Partnership">Amazon Affiliate & Partnership</option>
                    <option value="Compliance & Certifications">Compliance & Certifications</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message / Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on your inquiry or requirements..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:brightness-110 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
