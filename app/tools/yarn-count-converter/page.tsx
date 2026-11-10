"use client";

import React, { useState } from "react";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";
import { FaCalculator, FaArrowsRotate, FaCircleInfo, FaTableList } from "react-icons/fa6";

export default function YarnCountConverterPage() {
  // Current values
  const [ne, setNe] = useState<number>(30); // Cotton Count
  const [nm, setNm] = useState<number>(50.8);
  const [tex, setTex] = useState<number>(19.7);
  const [denier, setDenier] = useState<number>(177.2);

  // Conversion functions from each system
  const updateFromNe = (val: number) => {
    setNe(val);
    if (val > 0) {
      setNm(parseFloat((val * 1.6934).toFixed(2)));
      setTex(parseFloat((590.54 / val).toFixed(2)));
      setDenier(parseFloat((5314.9 / val).toFixed(2)));
    }
  };

  const updateFromNm = (val: number) => {
    setNm(val);
    if (val > 0) {
      const computedNe = val / 1.6934;
      setNe(parseFloat(computedNe.toFixed(2)));
      setTex(parseFloat((1000 / val).toFixed(2)));
      setDenier(parseFloat((9000 / val).toFixed(2)));
    }
  };

  const updateFromTex = (val: number) => {
    setTex(val);
    if (val > 0) {
      const computedNe = 590.54 / val;
      setNe(parseFloat(computedNe.toFixed(2)));
      setNm(parseFloat((1000 / val).toFixed(2)));
      setDenier(parseFloat((val * 9).toFixed(2)));
    }
  };

  const updateFromDenier = (val: number) => {
    setDenier(val);
    if (val > 0) {
      const computedTex = val / 9;
      setTex(parseFloat(computedTex.toFixed(2)));
      setNm(parseFloat((9000 / val).toFixed(2)));
      setNe(parseFloat((5314.9 / val).toFixed(2)));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            <FaArrowsRotate /> Universal Yarn Engineering Converter
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Yarn Count Converter (Ne, Nm, Tex, Denier)
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Convert seamlessly across direct and indirect yarn numbering systems. Used by spinning masters, fabric engineers, and apparel merchandisers across international markets.
          </p>
        </div>

        {/* Live Converter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Ne Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Indirect System
                </span>
                <span className="text-xs font-bold text-slate-400">Cotton</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">English Count (Ne)</h3>
              <p className="text-[11px] text-slate-500 mb-4">
                Number of 840-yard hanks per 1 lb weight.
              </p>
            </div>
            <div>
              <input
                type="number"
                step="0.5"
                min="1"
                value={ne}
                onChange={(e) => updateFromNe(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-black text-indigo-900 p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Higher number = finer yarn</span>
            </div>
          </div>

          {/* Nm Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Indirect System
                </span>
                <span className="text-xs font-bold text-slate-400">Metric</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Metric Count (Nm)</h3>
              <p className="text-[11px] text-slate-500 mb-4">
                Length in meters of 1 gram of yarn.
              </p>
            </div>
            <div>
              <input
                type="number"
                step="0.5"
                min="1"
                value={nm}
                onChange={(e) => updateFromNm(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-black text-slate-900 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">European standard</span>
            </div>
          </div>

          {/* Tex Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Direct System
                </span>
                <span className="text-xs font-bold text-slate-400">ISO Standard</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tex (tex)</h3>
              <p className="text-[11px] text-slate-500 mb-4">
                Weight in grams of 1,000 meters of yarn.
              </p>
            </div>
            <div>
              <input
                type="number"
                step="0.5"
                min="1"
                value={tex}
                onChange={(e) => updateFromTex(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-black text-slate-900 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Higher number = coarser yarn</span>
            </div>
          </div>

          {/* Denier Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  Direct System
                </span>
                <span className="text-xs font-bold text-slate-400">Filaments</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Denier (D)</h3>
              <p className="text-[11px] text-slate-500 mb-4">
                Weight in grams of 9,000 meters of filament.
              </p>
            </div>
            <div>
              <input
                type="number"
                step="1"
                min="1"
                value={denier}
                onChange={(e) => updateFromDenier(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-black text-slate-900 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Used for polyester, nylon & spandex</span>
            </div>
          </div>
        </div>

        {/* Industry Application Matrix */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FaTableList className="text-indigo-600" />
            <span>Garment Industry Standard Yarn Count Matrix</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                  <th className="py-3 px-4">Yarn Count (Ne)</th>
                  <th className="py-3 px-4">Tex / Denier</th>
                  <th className="py-3 px-4">Fabric Structure</th>
                  <th className="py-3 px-4">Common Apparel End Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">10s - 16s Ne</td>
                  <td className="py-3 px-4">59.1 - 36.9 tex</td>
                  <td className="py-3 px-4">Heavy Denim & Canvas</td>
                  <td className="py-3 px-4">Workwear jackets, raw selvedge jeans, heavy tote bags</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">20s - 24s Ne</td>
                  <td className="py-3 px-4">29.5 - 24.6 tex</td>
                  <td className="py-3 px-4">French Terry & Fleece</td>
                  <td className="py-3 px-4">Heavyweight streetwear hoodies (300-380 GSM), sweatpants</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">26s - 30s Ne</td>
                  <td className="py-3 px-4">22.7 - 19.7 tex</td>
                  <td className="py-3 px-4">Single Jersey & Pique</td>
                  <td className="py-3 px-4">Standard retail T-shirts (160-190 GSM), corporate polos</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">34s - 40s Ne</td>
                  <td className="py-3 px-4">17.4 - 14.8 tex</td>
                  <td className="py-3 px-4">Fine Combed Jersey</td>
                  <td className="py-3 px-4">Luxury lightweight tees, underwear, baby wear, soft pajamas</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-purple-700">75D / 150D Poly</td>
                  <td className="py-3 px-4">8.3 / 16.7 tex</td>
                  <td className="py-3 px-4">Micro Interlock & Spandex</td>
                  <td className="py-3 px-4">Dry-fit activewear, running jerseys, yoga leggings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* B2B Factory Direct CTA */}
        <B2BFactoryCTA
          title="Custom Yarn Sourcing & Development by Apparel Emporium"
          subtitle="Looking for custom melange shades, BCI/Organic cotton certifications, or specialized recycled poly-blends? Apparel Emporium sources directly from top-tier spinning mills."
        />
      </div>
    </div>
  );
}

