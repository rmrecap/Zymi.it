import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center justify-center gap-y-3 cursor-pointer bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500 rounded-2xl py-6 px-4 text-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 text-center h-full">
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 group-hover:scale-105 transition-transform">
          {children}
        </div>
        <h3 className="font-bold text-sm tracking-wide text-slate-100 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
