"use client";

import React, { useState } from "react";
import { Product } from "@/typings";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaAmazon, FaArrowUpRightFromSquare, FaIndustry, FaDownload, FaCartShopping, FaBolt } from "react-icons/fa6";
import QuantityInput from "./QuantityInput";

const B2BInquiryModal = dynamic(() => import("./B2BInquiryModal"), {
  ssr: false,
});

interface AdaptiveProductActionsProps {
  product: Product;
  showQuantity?: boolean;
  compact?: boolean;
}

export default function AdaptiveProductActions({
  product,
  showQuantity = false,
  compact = false,
}: AdaptiveProductActionsProps) {
  const router = useRouter();
  const { addToCart, calculateTotals } = useProductStore();
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState<boolean>(false);

  const productType = product.productType || "DROPSHIP";

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Added to your shopping cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  // 1. Amazon Affiliate Flow
  if (productType === "AFFILIATE_AMAZON") {
    const affiliateRedirectUrl = `/api/affiliate/redirect?asin=${encodeURIComponent(
      product.asin || ""
    )}&url=${encodeURIComponent(product.affiliateUrl || "")}&productId=${encodeURIComponent(
      product.id
    )}`;

    return (
      <div className="w-full flex flex-col gap-2">
        <a
          href={affiliateRedirectUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={`flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FF8800] text-slate-950 font-bold transition-all duration-200 rounded-lg shadow-sm hover:shadow-md active:scale-98 ${
            compact ? "py-2 px-3 text-xs w-full" : "py-3.5 px-6 text-base w-full sm:w-auto"
          }`}
        >
          <FaAmazon className="text-lg" />
          <span>Check Verified Price</span>
          <FaArrowUpRightFromSquare className="text-xs ml-0.5 opacity-80" />
        </a>

        {!compact && (
          <div className="p-2.5 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">Verified Partner Notice:</span> Sourced directly via Amazon Verified Creator Store with guaranteed authenticity.
          </div>
        )}
      </div>
    );
  }

  // 2. Apparel Emporium B2B / RMG Manufacturing Flow
  if (productType === "B2B_GARMENT") {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
            <FaIndustry className="text-indigo-600" />
            MOQ: {product.moq || 500} pcs
          </span>
          {product.leadTime && (
            <span className="bg-indigo-50 text-indigo-700 font-medium px-2.5 py-1 rounded-md border border-indigo-100">
              Lead Time: {product.leadTime}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsB2BModalOpen(true)}
          className={`flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-950 text-white font-bold transition-all duration-200 rounded-lg shadow-sm hover:shadow-indigo-900/20 active:scale-98 ${
            compact ? "py-2 px-3 text-xs w-full" : "py-3.5 px-6 text-base w-full sm:w-auto"
          }`}
        >
          <FaIndustry />
          <span>Request Factory Quote / RFQ</span>
        </button>

        <B2BInquiryModal
          product={product}
          isOpen={isB2BModalOpen}
          onClose={() => setIsB2BModalOpen(false)}
        />
      </div>
    );
  }

  // 3. Digital Download Marketplace Flow
  if (productType === "DIGITAL_DOWNLOAD") {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-medium">
          <FaDownload />
          <span>Instant Download • {product.digitalFormat || "Digital File (ZIP/PDF)"}</span>
        </div>

        <div className={`flex gap-2 ${compact ? "flex-col" : "flex-row flex-wrap"}`}>
          <button
            type="button"
            onClick={handleBuyNow}
            className={`flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all active:scale-98 ${
              compact ? "py-2 px-3 text-xs w-full" : "py-3 px-5 text-sm"
            }`}
          >
            <FaBolt />
            <span>Instant Buy & Access</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold rounded-lg transition-all ${
              compact ? "py-1.5 px-3 text-xs w-full" : "py-3 px-4 text-sm"
            }`}
          >
            <FaCartShopping />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Standard Dropshipping / Physical E-Commerce Flow
  return (
    <div className="w-full flex flex-col gap-3">
      {showQuantity && (
        <QuantityInput
          quantityCount={quantityCount}
          setQuantityCount={setQuantityCount}
        />
      )}

      {Boolean(product.inStock) ? (
        <div className={`flex gap-3 ${compact ? "flex-col" : "flex-row flex-wrap"}`}>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all ${
              compact ? "py-2 px-3 text-xs w-full" : "py-3 px-6 text-sm"
            }`}
          >
            <FaCartShopping />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-blue-600/20 transition-all ${
              compact ? "py-2 px-3 text-xs w-full" : "py-3 px-6 text-sm"
            }`}
          >
            <FaBolt />
            <span>Buy Now</span>
          </button>
        </div>
      ) : (
        <div className="py-2 text-center text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg">
          Currently Out of Stock
        </div>
      )}
    </div>
  );
}

