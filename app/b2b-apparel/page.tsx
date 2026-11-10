import React from "react";
import prisma from "@/utils/db";
import ApparelEmporiumShowcase from "@/components/ApparelEmporiumShowcase";
import ProductItem from "@/components/ProductItem";
import { FaDownload, FaIndustry, FaHandshake, FaGlobe, FaScissors, FaCheck } from "react-icons/fa6";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apparel Emporium B2B | RMG Manufacturing & Apparel Export Hub",
  description: "Global B2B wholesale clothing, RMG export, custom private label garment manufacturing, low MOQ tech packs, and factory direct quotes.",
};

export default async function B2BApparelPage() {
  // Fetch B2B products from database or fallback
  let b2bProducts: any[] = [];
  try {
    b2bProducts = await prisma.product.findMany({
      where: {
        productType: "B2B_GARMENT",
      },
      take: 12,
    });
  } catch (err) {
    console.error("Error fetching B2B products:", err);
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Showcase Section */}
      <ApparelEmporiumShowcase />

      {/* Value Proposition & Step-by-Step OEM/ODM Pipeline */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Factory-Direct Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
            From Tech Pack to Worldwide Container Delivery
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            We operate fully certified apparel manufacturing facilities handling sample development, fabric knitting/weaving, dyeing, precision cutting, bulk sewing, and export logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Tech Pack & RFQ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Share your sketches, size charts, fabric weight, and target budget. Our merchandising team delivers a formal quote within 24 hours.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Sampling & Lab Dips</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pantone-matched lab dips, print strikes, and fit proto samples dispatched via DHL/FedEx for buyer approval in 7-10 days.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Bulk Production</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated cutting and multi-line assembly with in-line QC checks. AQL 2.5 final inspection ensures zero defect tolerance.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Customs & Shipping</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete export documentation, EUR.1 / GSP certificates, sea freight (FCL/LCL) and air shipment straight to your warehouse.
            </p>
          </div>
        </div>
      </section>

      {/* Featured B2B Ready Catalog */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Apparel Emporium B2B Export Line
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Selected styles available for private labeling, OEM manufacturing, and wholesale volume.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg">
              Showing active wholesale models
            </span>
          </div>

          {b2bProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {b2bProducts.map((product) => (
                <ProductItem key={product.id} product={product as any} color="black" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl">
              <FaIndustry className="text-4xl text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">B2B Apparel Catalog Initializing</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Our export merchandising catalog is being updated with the latest SS27 garment collections. You can request custom development anytime!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

