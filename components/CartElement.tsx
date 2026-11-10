"use client";
import Link from "next/link";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
  const { allQuantity } = useProductStore();
  return (
    <div className="relative inline-flex items-center">
      <Link
        href="/cart"
        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-cyan-400 hover:text-cyan-300 transition-all duration-200 flex items-center justify-center shadow-xs"
        aria-label="View Shopping Cart"
      >
        <FaCartShopping className="text-lg" />
        {allQuantity > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[11px] rounded-full flex justify-center items-center shadow-sm shadow-cyan-500/50">
            {allQuantity}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartElement;
