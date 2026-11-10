"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import UserProfileDropdown from "./UserProfileDropdown";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import {
  FaBars,
  FaXmark,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

const Header = () => {
  const pathname = usePathname();
  const { wishQuantity } = useWishlistStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // Categories list matching visual blueprint & updated psychological re-branding
  const menuPills = [
    { name: "Home", href: "/", active: pathname === "/" },
    {
      name: "Digital Assets",
      href: "/shop?type=DIGITAL_DOWNLOAD",
      active: pathname.startsWith("/shop") && pathname.includes("DIGITAL"),
    },
    {
      name: "Curated Gear",
      href: "/shop?type=AFFILIATE_AMAZON",
      active: pathname.includes("AFFILIATE"),
    },
    {
      name: "Global Store",
      href: "/shop?type=DROPSHIP",
      active: pathname.includes("DROPSHIP"),
    },
    {
      name: "Apparel Emporium",
      href: "/b2b-apparel",
      active: pathname === "/b2b-apparel",
    },
    {
      name: "Blog & Magazine",
      href: "/blog",
      active: pathname.startsWith("/blog"),
    },
    {
      name: "Free Tools",
      href: "/tools",
      active: pathname.startsWith("/tools"),
    },
    {
      name: "Pricing",
      href: "/pricing",
      active: pathname === "/pricing",
    },
    {
      name: "About",
      href: "/about",
      active: pathname === "/about",
    },
    {
      name: "Contact",
      href: "/contact",
      active: pathname === "/contact",
    },
  ];

  if (pathname.startsWith("/admin")) {
    return (
      <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-base shadow-sm shadow-cyan-500/50">
              Z
            </span>
            <span className="text-lg font-black tracking-tight text-white">
              ZYMI <span className="text-cyan-400">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 transition"
            >
              Back to Store
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#050a18]/85 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-500/10">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-slate-950 text-xl tracking-tighter">
                Z
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center gap-1">
                ZYMI <span className="text-cyan-500 dark:text-cyan-400">Global</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                Explore • Shop • Learn • Grow
              </span>
            </div>
          </Link>
        </div>

        {/* Center Menu Pills (Desktop) */}
        <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-full px-2 py-1 shadow-md dark:shadow-xl dark:shadow-black/40">
          {menuPills.map((pill) => (
            <Link
              key={pill.name}
              href={pill.href}
              className={`px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-full text-[11px] 2xl:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                pill.active
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white dark:text-slate-950 font-black shadow-md shadow-cyan-500/30"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80"
              }`}
            >
              <span>{pill.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search */}
          <div className="hidden md:block w-36 lg:w-44">
            <SearchInput />
          </div>

          {/* Theme Toggle Button (Light / Dark) */}
          <ThemeToggle />

          {/* Wishlist & Cart */}
          <HeartElement wishQuantity={wishQuantity} />
          <CartElement />

          {/* User Profile Dropdown (Skills UI + NextAuth) */}
          <UserProfileDropdown />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-50 dark:bg-[#091124] border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-3">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
            <SearchInput />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {menuPills.map((pill) => (
              <Link
                key={pill.name}
                href={pill.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  pill.active
                    ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {pill.name}
              </Link>
            ))}
          </div>

          {/* Quick Contact Bar */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <a
              href="mailto:contact@zymi.it"
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
            >
              <FaEnvelope className="text-cyan-500" />
              <span>contact@zymi.it</span>
            </a>
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
            >
              <FaPhone className="text-emerald-500" />
              <span>+880-1700-000000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
