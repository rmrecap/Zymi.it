"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { FaIndustry, FaArrowRight } from "react-icons/fa6";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slider-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <Slider {...settings}>
        {/* Slide 1: Circular Knitwear */}
        <div className="h-[380px] md:h-[450px] relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-2xl text-left space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FaIndustry className="text-xs" /> Apparel Emporium Manufacturing
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Export Grade Circular Knitwear <br />
              <span className="text-indigo-400">100% Combed Compact Cotton</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              From basic 160-220 GSM crewneck tees to 380 GSM brushed fleece hoodies. Precision cutting, reactive dyeing, and custom tech-pack execution with low MOQ.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/b2b-apparel"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
              >
                <span>Request B2B RFQ</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/tools/fabric-consumption-calculator"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition"
              >
                <span>Calculate Fabric Consumption</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2: Denim & Sustainable RMG */}
        <div className="h-[380px] md:h-[450px] relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-2xl text-left space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              OEKO-TEX & BSCI Audited Facilities
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Sustainable Denim & Chinos <br />
              <span className="text-emerald-400">Eco-Friendly Ozone Wash</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              98/2 Cotton-Spandex ring denim with laser whiskers and eco-friendly dyeing reducing water consumption by 65%. Available for global private labels.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/b2b-apparel"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
              >
                <span>Explore Denim Catalog</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
