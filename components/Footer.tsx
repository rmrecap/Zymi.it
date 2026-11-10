import React from "react";
import Link from "next/link";
import {
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaIndustry,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main Footer Row matching the Visual Blueprint */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              Z
            </div>
            <div className="text-left">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                ZYMI <span className="text-cyan-600 dark:text-cyan-400">Global</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Explore • Shop • Learn • Grow
              </p>
            </div>
          </div>

          {/* Center: Navigation, Legal & Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Link href="/about" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              About Us
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/pricing" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Pricing
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Contact Us
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/shipping" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Shipping
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/returns" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Returns
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/privacy-policy" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              Terms of Service
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link href="/b2b-apparel" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
              B2B Apparel
            </Link>
          </div>

          {/* Right: Social Channels */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500/50 transition shadow-xs"
              aria-label="YouTube"
            >
              <FaYoutube className="text-xs" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:border-blue-400/50 transition shadow-xs"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-xs" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-400/50 transition shadow-xs"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:border-pink-400/50 transition shadow-xs"
              aria-label="TikTok"
            >
              <FaTiktok className="text-xs" />
            </a>
          </div>
        </div>

        {/* Machine-Readable Contact Details & Corporate Address */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <address className="not-italic flex items-center gap-2">
            <FaLocationDot className="text-cyan-600 dark:text-cyan-400 shrink-0 text-sm" />
            <span>House 12, Road 4, Sector 3, Uttara, Dhaka-1230, Bangladesh</span>
          </address>

          <div className="flex items-center gap-2 md:justify-center">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 shrink-0 text-sm" />
            <span>Email: </span>
            <a
              href="mailto:contact@zymi.it"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
              aria-label="Email ZYMI Global Support"
            >
              contact@zymi.it
            </a>
          </div>

          <div className="flex items-center gap-2 md:justify-end">
            <FaPhone className="text-emerald-600 dark:text-emerald-400 shrink-0 text-sm" />
            <span>Tel: </span>
            <a
              href="tel:+8801700000000"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
              aria-label="Call ZYMI Global Support"
            >
              +880-1700-000000
            </a>
          </div>
        </div>

        {/* Secondary RMG & B2B Details */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <FaIndustry className="text-cyan-600 dark:text-cyan-400" />
            <span>
              Official Promotion for <strong>Apparel Emporium</strong> (
              <a href="https://aelbd.net" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 underline">
                aelbd.net
              </a>
              )
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaGlobe className="text-blue-500 dark:text-blue-400" />
            <span>OEKO-TEX, BSCI, SEDEX, GOTS Audited Manufacturer</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <FaEnvelope className="text-amber-500 dark:text-amber-400" />
            <span>
              B2B Desk:{" "}
              <a href="mailto:export@aelbd.net" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">
                export@aelbd.net
              </a>{" "}
              • ID: harperfinds20-20
            </span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} ZYMI Global &amp; Apparel Emporium. All rights reserved.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Disclaimer: As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
