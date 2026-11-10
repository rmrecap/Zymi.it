import { incentives } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Incentives = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Factory Advantages
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
            Why International Brands Partner With Us
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Certified manufacturing standards, transparent costing, and dedicated export merchandising.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                <Image
                  width={40}
                  height={40}
                  className="object-contain"
                  src={incentive.imageSrc}
                  alt={incentive.name}
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {incentive.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {incentive.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Incentives;
