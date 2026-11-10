// *********************
// Role of the component: SortBy
// Name of the component: SortBy.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SortBy />
// Input parameters: no input parameters
// Output: select input with options for sorting by a-z, z-a, price low, price high
// *********************

"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";

const SortBy = () => {
  // getting values from Zustand sort store
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex items-center gap-x-3 max-lg:flex-col max-lg:w-full max-lg:items-start">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Sort by:</h3>
      <select
        defaultValue={sortBy}
        onChange={(e) => changeSortBy(e.target.value)}
        className="select border-slate-300 dark:border-slate-700 py-1.5 px-3 text-xs sm:text-sm rounded-xl border select-bordered w-40 focus:outline-none outline-none max-lg:w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
        name="sort"
      >
        <option value="defaultSort">Default</option>
        <option value="titleAsc">Sort A-Z</option>
        <option value="titleDesc">Sort Z-A</option>
        <option value="lowPrice">Lowest Price</option>
        <option value="highPrice">Highest Price</option>
      </select>
    </div>
  );
};

export default SortBy;
