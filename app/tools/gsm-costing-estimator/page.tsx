"use client";

import React, { useState } from "react";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";
import RecommendedProEquipment from "@/components/RecommendedProEquipment";
import { FaCalculator, FaCoins, FaCircleInfo, FaIndustry } from "react-icons/fa6";

export default function GSMCostingEstimatorPage() {
  // Fabric Construction Inputs
  const [yarnCount, setYarnCount] = useState<number>(30); // Ne (e.g. 24s, 30s, 34s, 40s)
  const [fabricType, setFabricType] = useState<"single_jersey" | "interlock" | "rib" | "fleece">("single_jersey");
  const [stitchLength, setStitchLength] = useState<number>(2.8); // in mm

  // Costing Parameters ($/kg)
  const [yarnPricePerKg, setYarnPricePerKg] = useState<number>(3.6); // USD per kg of raw yarn
  const [knittingCostPerKg, setKnittingCostPerKg] = useState<number>(0.35); // Knitting charge
  const [dyeingCostPerKg, setDyeingCostPerKg] = useState<number>(1.25); // Dyeing & finishing charge
  const [processLossPercent, setProcessLossPercent] = useState<number>(7); // Dyeing & knitting wastage %
  const [fabricKgPerGarment, setFabricKgPerGarment] = useState<number>(0.22); // e.g. 220g per piece

  // GSM Calculation Approximation:
  // Empirical Formula: GSM ≈ (Constant * Loop Length) / Ne
  const fabricConstant =
    fabricType === "single_jersey" ? 1720 : fabricType === "rib" ? 2200 : fabricType === "interlock" ? 2450 : 2800;

  const estimatedGsm = Math.round((fabricConstant / yarnCount) * (stitchLength / 2.7));

  // Costing per kg calculation:
  // Base raw yarn with process loss
  const effectiveYarnCost = yarnPricePerKg * (1 + processLossPercent / 100);
  const totalFabricCostPerKg = effectiveYarnCost + knittingCostPerKg + dyeingCostPerKg;
  const costPerGarment = totalFabricCostPerKg * fabricKgPerGarment;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            <FaCoins /> Textile Costing & Engineering Suite
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            GSM & Fabric Costing Estimator
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Estimate knit fabric weight (GSM) from yarn count & stitch length, and calculate factory-floor production costing per kilogram and per finished garment.
          </p>
        </div>

        {/* Two-Column Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <span>1. Fabric Construction & Yarn Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Yarn Count (Ne)
                </label>
                <select
                  value={yarnCount}
                  onChange={(e) => setYarnCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                >
                  <option value={20}>20s Ne (Heavy Knit / Fleece)</option>
                  <option value={24}>24s Ne (Polo / Heavy Tee)</option>
                  <option value={26}>26s Ne (Standard Pique)</option>
                  <option value={30}>30s Ne (Standard Combed Cotton)</option>
                  <option value={34}>34s Ne (Lightweight Summer Tee)</option>
                  <option value={40}>40s Ne (Fine Premium Jersey)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fabric Structure
                </label>
                <select
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                >
                  <option value="single_jersey">Single Jersey (100% Cotton / CVC)</option>
                  <option value="rib">1x1 or 2x2 Rib</option>
                  <option value="interlock">Interlock / Double Knit</option>
                  <option value="fleece">Brushed Fleece / French Terry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stitch / Loop Length (mm)
              </label>
              <input
                type="number"
                min="2.0"
                max="4.0"
                step="0.05"
                value={stitchLength}
                onChange={(e) => setStitchLength(parseFloat(e.target.value) || 2.8)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <span className="text-[10px] text-slate-400">Typical range: 2.60mm to 3.10mm</span>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span>2. Financial Sourcing & Processing Costs ($/kg)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Raw Yarn Price ($/kg)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  value={yarnPricePerKg}
                  onChange={(e) => setYarnPricePerKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Knitting Cost ($/kg)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  value={knittingCostPerKg}
                  onChange={(e) => setKnittingCostPerKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dyeing & Finish ($/kg)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  value={dyeingCostPerKg}
                  onChange={(e) => setDyeingCostPerKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Process Loss / Wastage (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="20"
                  value={processLossPercent}
                  onChange={(e) => setProcessLossPercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Garment Fabric Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.05"
                  value={fabricKgPerGarment}
                  onChange={(e) => setFabricKgPerGarment(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="text-[10px] text-slate-400">e.g. 0.22 kg (220g) for a basic tee</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-800/40 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Computed Yield & Cost
              </span>
              <h3 className="text-xl font-bold mt-1 text-white">Fabric Valuation Report</h3>
            </div>

            {/* Estimated GSM Highlight */}
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-xs text-indigo-200 uppercase font-semibold">
                Estimated Fabric Weight
              </span>
              <div className="text-4xl font-extrabold text-amber-400 mt-1">
                {estimatedGsm} <span className="text-lg font-medium text-white">GSM (g/m²)</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Calculated for {yarnCount}s {fabricType.replace("_", " ")}
              </p>
            </div>

            {/* Costing Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Effective Yarn Cost</span>
                <span className="font-bold text-white">${effectiveYarnCost.toFixed(2)} / kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300">Knitting & Dyeing Charges</span>
                <span className="font-bold text-white">${(knittingCostPerKg + dyeingCostPerKg).toFixed(2)} / kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-300 font-bold">Total Fabric Cost per Kg</span>
                <span className="font-extrabold text-xl text-amber-400">${totalFabricCostPerKg.toFixed(2)} / kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10 bg-emerald-500/10 px-3 rounded-lg border-emerald-500/20">
                <span className="text-emerald-300 font-bold">Fabric Cost per Garment</span>
                <span className="font-black text-xl text-emerald-400">${costPerGarment.toFixed(2)} / pc</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/50 text-[11px] text-indigo-200 leading-relaxed">
              💡 <strong>Merchandising Note:</strong> Actual factory GSM can vary by ±3-5% based on finishing stenter temperature, compaction, and bio-silicon wash parameters.
            </div>
          </div>
        </div>

        {/* High-Ticket Pro Lab Equipment Widget */}
        <RecommendedProEquipment
          title="Recommended Fabric Testing & GSM Verification Kits"
          subtitle="Laboratory-grade round sample cutters, 0.01g electronic scales, and pick glasses used by apparel quality inspectors."
        />

        {/* B2B Factory Direct CTA */}
        <B2BFactoryCTA
          title="Looking for Competitive Fabric & Garment Costing? Quote Apparel Emporium"
          subtitle="Our direct yarn partnerships and in-house circular knitting reduce overhead by 15-20% compared to third-party commercial mills. Request an open-book FOB cost breakdown."
        />
      </div>
    </div>
  );
}

