"use client";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

const HeartElement = ({ wishQuantity }: { wishQuantity: number }) => {
  return (
    <div className="relative inline-flex items-center">
      <Link
        href="/wishlist"
        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-rose-400 hover:text-rose-300 transition-all duration-200 flex items-center justify-center shadow-xs"
        aria-label="Wishlist"
      >
        <FaHeart className="text-lg" />
        {wishQuantity > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-[11px] rounded-full flex justify-center items-center shadow-sm shadow-rose-500/50">
            {wishQuantity}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeartElement;
