"use client";

import React, { useState } from "react";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";
import RecommendedProEquipment from "@/components/RecommendedProEquipment";
import { FaCalculator, FaIndustry, FaCircleInfo, FaPrint, FaArrowsRotate } from "react-icons/fa6";

export default function FabricConsumptionCalculatorPage() {
  const [unit, setUnit] = useState<"cm" | "inch">("cm");
  const [garmentType, setGarmentType] = useState<"tshirt" | "polo" | "hoodie" | "pants">("tshirt");

  // Inputs
  const [bodyLength, setBodyLength] = useState<number>(72);
  const [sleeveLength, setSleeveLength] = useState<number>(22);
  const [halfChest, setHalfChest] = useState<number>(54);
  const [gsm, setGsm] = useState<number>(180);
  const [seamAllowance, setSeamAllowance] = useState<number>(6); // in cm or 2.5 in inch
  const [wastagePercent, setWastagePercent] = useState<number>(8); // Process loss %
  const [orderQuantity, setOrderQuantity] = useState<number>(1000); // Order volume

  // Convert to cm for unified calculation
  const toCm = (val: number) => (unit === "inch" ? val * 2.54 : val);

  const bodyLengthCm = toCm(bodyLength) + toCm(seamAllowance);
  const sleeveLengthCm = toCm(sleeveLength) + toCm(seamAllowance);
  const halfChestCm = toCm(halfChest) + toCm(seamAllowance / 2);

  // Industry Standard Knit Consumption Formula (cm):
  // Formula: ((Length + Sleeve) * (1/2 Chest) * 2 * GSM * 12) / 10,000,000 * (1 + Wastage/100)
  const multiplier = garmentType === "hoodie" ? 2.4 : garmentType === "pants" ? 1.8 : 2;
  const netGramsPerPc = ((bodyLengthCm + sleeveLengthCm) * halfChestCm * multiplier * gsm) / 10000;
  const grossGramsPerPc = netGramsPerPc * (1 + wastagePercent / 100);
  const kgPerDozen = (grossGramsPerPc * 12) / 1000;
  const totalFabricKg = (grossGramsPerPc * orderQuantity) / 1000;
  const totalYarnReqKg = totalFabricKg * 1.05; // 5% spinning/winding allowance

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            <FaCalculator /> RMG Merchandising Engineering Tools
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Knit Fabric Consumption Calculator (kg / Dozen)
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Standard export formula used by RMG merchandisers and factory production planners to calculate fabric consumption per piece, per dozen, and total bulk yarn requirement with process wastage.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Measurement Specifications</span>
              </h2>
              {/* Unit Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    if (unit === "inch") {
                      setBodyLength(Math.round(bodyLength * 2.54));
                      setSleeveLength(Math.round(sleeveLength * 2.54));
                      setHalfChest(Math.round(halfChest * 2.54));
                      setSeamAllowance(6);
                    }
                    setUnit("cm");
                  }}
                  className={`px-3 py-1 rounded-lg transition ${
                    unit === "cm" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === "cm") {
                      setBodyLength(Math.round(bodyLength / 2.54));
                      setSleeveLength(Math.round(sleeveLength / 2.54));
                      setHalfChest(Math.round(halfChest / 2.54));
                      setSeamAllowance(2.5);
                    }
                    setUnit("inch");
                  }}
                  className={`px-3 py-1 rounded-lg transition ${
                    unit === "inch" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>

            {/* Garment Type Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Garment Style Template
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "tshirt", label: "Basic T-Shirt" },
                  { id: "polo", label: "Polo Shirt" },
                  { id: "hoodie", label: "Hoodie / Fleece" },
                  { id: "pants", label: "Joggers / Pants" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGarmentType(item.id as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                      garmentType === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Body Length ({unit})
                </label>
                <input
                  type="number"
                  min="10"
                  step="0.5"
                  value={bodyLength}
                  onChange={(e) => setBodyLength(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sleeve Length ({unit})
                </label>
                <input
                  type="number"
                  min="5"
                  step="0.5"
                  value={sleeveLength}
                  onChange={(e) => setSleeveLength(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1/2 Chest Width ({unit})
                </label>
                <input
                  type="number"
                  min="10"
                  step="0.5"
                  value={halfChest}
                  onChange={(e) => setHalfChest(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fabric Weight (GSM)
                </label>
                <input
                  type="number"
                  min="80"
                  max="600"
                  step="5"
                  value={gsm}
                  onChange={(e) => setGsm(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
                <span className="text-[10px] text-slate-400">e.g. 160, 180, 220 GSM</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seam Allowance ({unit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={seamAllowance}
                  onChange={(e) => setSeamAllowance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
                <span className="text-[10px] text-slate-400">Hems & seam allowances</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wastage / Process Loss (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={wastagePercent}
                  onChange={(e) => setWastagePercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
                <span className="text-[10px] text-slate-400">Cutting + knitting loss</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Order Quantity (Pcs)
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-800/40 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Real-Time Yield
              </span>
              <h3 className="text-xl font-bold mt-1 text-white">Fabric Consumption Summary</h3>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-indigo-200 uppercase font-semibold">
                Consumption per Dozen
              </span>
              <div className="text-4xl font-extrabold text-amber-400 mt-1">
                {kgPerDozen.toFixed(2)}{" "}
                <span className="text-lg font-medium text-white">kg / dz</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Includes {wastagePercent}% cutting & process loss
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Net Weight per Pc</span>
                <span className="font-bold text-white">{netGramsPerPc.toFixed(1)} grams</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Gross Weight per Pc</span>
                <span className="font-bold text-white">{grossGramsPerPc.toFixed(1)} grams</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Total Bulk Fabric Required</span>
                <span className="font-extrabold text-amber-300">{totalFabricKg.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Recommended Raw Yarn Order</span>
                <span className="font-extrabold text-emerald-400">{totalYarnReqKg.toFixed(1)} kg</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/50 text-[11px] text-indigo-200 leading-relaxed">
              💡 <strong>Factory Pro-Tip:</strong> For high-gauge single jersey, Apparel Emporium recommends allocating 7-9% wastage for basic solid colors and 10-12% for rotary all-over prints (AOP).
            </div>
          </div>
        </div>

        {/* Technical Formula Explanations for SEO */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FaCircleInfo className="text-indigo-600" />
            <span>Knitwear Fabric Consumption Formula & Guidelines</span>
          </h3>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-3">
            <p>
              In garment manufacturing and RMG export merchandising, fabric cost constitutes approximately <strong>60% to 70%</strong> of the total FOB price. Precise calculation prevents dead stock excess or factory shortages during cutting.
            </p>

            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs text-slate-800">
              Consumption (Kg/Dozen) = [(Body Length + Seam) + (Sleeve Length + Seam)] × (1/2 Chest + Seam) × 2 × GSM × 12 ÷ 10,000,000 × (1 + Wastage%)
            </div>

            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Body Length:</strong> Measured from Highest Point of Shoulder (HPS) to bottom hem.</li>
              <li><strong>Sleeve Length:</strong> From shoulder seam to cuff hem.</li>
              <li><strong>1/2 Chest:</strong> Pit-to-pit chest circumference halved.</li>
              <li><strong>Seam Allowance:</strong> Usually 4-6 cm for basic tees, 6-8 cm for polo shirts, and 8-10 cm for hoodies.</li>
            </ul>
          </div>
        </div>

        {/* Amazon Affiliate High-Ticket Pro Equipment Widget */}
        <RecommendedProEquipment
          title="Essential Cutting & Sample Room Equipment"
          subtitle="Commercial fabric cutting machines, rotary blades, and heavy-duty sewing equipment available on Amazon Prime with international delivery."
        />

        {/* B2B Factory Direct CTA */}
        <B2BFactoryCTA
          title="Ready to Fabricate this Garment? Connect with Apparel Emporium"
          subtitle="Our vertical knitting, continuous dyeing, and garment manufacturing plants deliver OEKO-TEX certified fabrics and finished apparel with low MOQ and fast international delivery."
        />
      </div>
    </div>
  );
}

