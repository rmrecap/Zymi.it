"use client";

import React from "react";
import AmazonProductCard from "./AmazonProductCard";
import { FaScissors, FaAmazon, FaShieldHalved } from "react-icons/fa6";

interface RecommendedProEquipmentProps {
  title?: string;
  subtitle?: string;
}

export default function RecommendedProEquipment({
  title = "Recommended Pro Equipment for Apparel Makers & RMG Quality Labs",
  subtitle = "High-precision cutting tools, GSM verification kits, and finishing equipment used by professional sampling rooms and merchandisers.",
}: RecommendedProEquipmentProps) {
  const proEquipment = [
    {
      asin: "B08N5WRWNW",
      title: "Commercial Round Knife Fabric Cutting Machine (100mm Octagonal Blade)",
      price: 89,
      formattedPrice: "$89.99",
      manufacturer: "ClothMaster Pro",
      mainImage: "/category_denim.svg",
      rating: 5,
      badgeText: "Best Seller",
      features: [
        "Cuts up to 15 layers of heavy denim, fleece & canvas effortlessly",
        "Built-in automatic whetstone sharpening mechanism",
        "High-torque pure copper motor with safety blade guard",
      ],
    },
    {
      asin: "B07V2Q8X3Z",
      title: "Fabric GSM Round Sample Cutter with 0.01g Digital Electronic Balance",
      price: 115,
      formattedPrice: "$115.00",
      manufacturer: "TextileLab Instruments",
      mainImage: "/category_digital.svg",
      rating: 5,
      badgeText: "Lab Standard",
      features: [
        "Cuts precisely 100 cm² circular fabric specimens in seconds",
        "Dual-sided stainless steel rotary blades with non-slip cutting pad",
        "Includes high-precision scale (0.01g to 500g) with calibration weight",
      ],
    },
    {
      asin: "B07K9R4M7Y",
      title: "Industrial Heavy-Duty Commercial Garment Steamer (1800W Fast Steam)",
      price: 145,
      formattedPrice: "$145.00",
      manufacturer: "ProPress Commercial",
      mainImage: "/category_sweater.svg",
      rating: 5,
      badgeText: "Factory Choice",
      features: [
        "Continuous 60-minute steam time with 3.2L water reservoir",
        "Deep fabric penetration for wrinkle removal on knitwear and outerwear",
        "Heavy-duty brass boiler with auto shut-off safety protection",
      ],
    },
    {
      asin: "B09W2Q8L1K",
      title: "Digital Optical Thread Counter & Fabric Density Pick Glass",
      price: 42,
      formattedPrice: "$42.50",
      manufacturer: "PrecisionWeave Optics",
      mainImage: "/category_knit.svg",
      rating: 5,
      badgeText: "Merchandiser Essential",
      features: [
        "Accurate EPI/PPI (Ends & Picks per Inch) count verification",
        "Built-in LED illumination with graduated millimeter reticle scale",
        "Compact aluminum housing ideal for factory floor audits",
      ],
    },
  ];

  return (
    <section className="my-16 bg-slate-100/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FF9900]/15 text-[#995c00] border border-[#FF9900]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FaAmazon className="text-[#FF9900] text-sm" />
            <span>Amazon Verified Apparel Equipment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-white px-3.5 py-1.5 rounded-xl border border-slate-200">
          <FaShieldHalved className="text-emerald-500" />
          <span>Prime Global Shipping • Verified Sellers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {proEquipment.map((item) => (
          <AmazonProductCard
            key={item.asin}
            asin={item.asin}
            title={item.title}
            price={item.price}
            formattedPrice={item.formattedPrice}
            mainImage={item.mainImage}
            rating={item.rating}
            badgeText={item.badgeText}
            features={item.features}
            manufacturer={item.manufacturer}
          />
        ))}
      </div>
    </section>
  );
}

