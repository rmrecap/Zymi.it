"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaIndustry, FaRegEnvelope, FaRegUser, FaGlobe } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  return (
    <div className="h-10 text-slate-200 bg-slate-950 text-xs border-b border-slate-800">
      <div className="flex justify-between h-full items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <span className="flex items-center gap-1.5 font-medium text-amber-400">
            <FaIndustry className="text-xs" />
            <span className="hidden sm:inline">Apparel Emporium Export Hub:</span>
            <a
              href="https://aelbd.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline flex items-center gap-1 font-bold"
            >
              aelbd.net <FaGlobe className="text-[10px]" />
            </a>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-400">
            <FaRegEnvelope className="text-xs" />
            <span>export@aelbd.net</span>
          </span>
        </div>

        <ul className="flex items-center gap-x-4 font-medium">
          <li className="hidden lg:inline">
            <Link href="/tools" className="text-slate-300 hover:text-white transition">
              Free Textile Calculators
            </Link>
          </li>
          <li className="hidden lg:inline">
            <Link href="/b2b-apparel" className="text-indigo-400 hover:text-indigo-300 transition font-bold">
              B2B Factory RFQ
            </Link>
          </li>
          {!session ? (
            <>
              <li>
                <Link href="/login" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
                  <FaRegUser className="text-xs" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-slate-300 hover:text-white transition">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <span className="text-slate-300">{session.user?.email}</span>
              <li>
                <button onClick={handleLogout} className="text-rose-400 hover:text-rose-300 transition">
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
