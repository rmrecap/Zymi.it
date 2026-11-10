"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaBagShopping,
  FaArrowRightFromBracket,
  FaShieldHalved,
  FaChevronDown,
  FaCloudArrowDown,
  FaGear,
} from "react-icons/fa6";

export default function UserProfileDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    toast.success("Logged out successfully");
    await signOut({ callbackUrl: "/" });
  };

  // If session is loading or user is not logged in
  if (status === "loading") {
    return (
      <div className="w-20 h-9 rounded-full bg-slate-800/40 animate-pulse border border-slate-700/50" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 transition-all duration-200 active:scale-95"
      >
        <FaUser className="text-[10px]" />
        <span>Sign In / Register</span>
      </Link>
    );
  }

  const user = session.user;
  const firstName = user.name ? user.name.split(" ")[0] : "Account";
  const userRole = (user as any).role || "USER";
  const isAdmin = userRole === "admin";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-slate-200 bg-slate-900/80 dark:bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 transition-all duration-200 shadow-sm cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Avatar Circle */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-[11px] shadow-xs">
          {firstName.charAt(0).toUpperCase()}
        </div>
        <span className="max-w-[80px] truncate">{firstName}</span>
        <FaChevronDown
          className={`text-[9px] text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Glassmorphic Dropdown Menu (Skills UI) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-black/60 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-slate-800 text-left">
            <p className="text-xs font-bold text-white truncate">
              {user.name || "Apparel Partner"}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {user.email || ""}
            </p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Administrator
              </span>
            )}
          </div>

          {/* Links */}
          <div className="py-1.5 text-left text-xs">
            <Link
              href="/user-profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            >
              <FaUser className="text-cyan-400 text-xs" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            >
              <FaBagShopping className="text-blue-400 text-xs" />
              <span>Orders / Downloads</span>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-amber-300 hover:text-amber-200 hover:bg-slate-800/80 transition"
              >
                <FaShieldHalved className="text-amber-400 text-xs" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-slate-800 pt-1.5">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition text-left cursor-pointer font-semibold"
            >
              <FaArrowRightFromBracket className="text-xs" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

