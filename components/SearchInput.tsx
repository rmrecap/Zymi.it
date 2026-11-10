"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sanitize } from "@/lib/sanitize";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const sanitizedSearch = sanitize(searchInput);
    router.push(`/search?search=${encodeURIComponent(sanitizedSearch)}`);
    setSearchInput("");
  };

  return (
    <form
      className="relative w-full"
      onSubmit={searchProducts}
      toolname="search_products"
      tooldescription="Search products, digital assets, tech packs, and apparel manufacturing items on ZYMI Global"
      data-toolname="search_products"
      data-tooldescription="Search products, digital assets, tech packs, and apparel manufacturing items on ZYMI Global"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products, tools, tech packs..."
          className="w-full bg-slate-900/80 border border-slate-700/60 focus:border-cyan-400 text-slate-100 text-xs sm:text-sm rounded-full py-2 pl-4 pr-10 outline-hidden transition shadow-inner placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="absolute right-1.5 p-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center justify-center text-xs"
          aria-label="Submit search"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
