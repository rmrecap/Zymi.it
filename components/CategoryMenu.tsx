import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";

const CategoryMenu = () => {
  return (
    <div className="py-16 bg-slate-950 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Export Sourcing Directory
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Core RMG Manufacturing Lines
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            Direct production capacities from Apparel Emporium (aelbd.net) with factory-direct pricing and low MOQ.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryMenuList.map((item) => (
            <CategoryItem title={item.title} key={item.id} href={item.href}>
              <Image
                src={item.src}
                width={56}
                height={56}
                alt={item.title}
                className="w-14 h-14 object-contain"
              />
            </CategoryItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
