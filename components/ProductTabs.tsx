"use client";

import React, { useState } from "react";
import { formatCategoryName } from "@/utils/categoryFormating";
import { sanitize, sanitizeHtml } from "@/lib/sanitize";

const ProductTabs = ({ product }: { product: Product }) => {
  const [currentProductTab, setCurrentProductTab] = useState<number>(0);

  return (
    <div className="px-5 text-black">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab text-lg text-black pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${
            currentProductTab === 0 && "tab-active font-bold text-indigo-700"
          }`}
          onClick={() => setCurrentProductTab(0)}
        >
          Product Specifications
        </a>
        <a
          role="tab"
          className={`tab text-black text-lg pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${
            currentProductTab === 1 && "tab-active font-bold text-indigo-700"
          }`}
          onClick={() => setCurrentProductTab(1)}
        >
          Manufacturing & Sourcing Details
        </a>
      </div>
      <div className="pt-6">
        {currentProductTab === 0 && (
          <div 
            className="text-base sm:text-lg leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{ 
              __html: sanitizeHtml(product?.description) 
            }}
          />
        )}

        {currentProductTab === 1 && (
          <div className="overflow-x-auto max-w-2xl">
            <table className="table text-sm text-left">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="font-semibold text-slate-600 w-1/3">Manufacturer:</th>
                  <td className="text-slate-900 font-bold">{sanitize(product?.manufacturer)}</td>
                </tr>
                <tr>
                  <th className="font-semibold text-slate-600">Product Model:</th>
                  <td className="text-slate-900">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {product?.productType || "DROPSHIP"}
                    </span>
                  </td>
                </tr>
                {product?.moq && (
                  <tr>
                    <th className="font-semibold text-slate-600">Minimum Order (MOQ):</th>
                    <td className="text-slate-900 font-semibold">{product.moq} pcs</td>
                  </tr>
                )}
                {product?.leadTime && (
                  <tr>
                    <th className="font-semibold text-slate-600">Production Lead Time:</th>
                    <td className="text-slate-900">{product.leadTime}</td>
                  </tr>
                )}
                {product?.fabricDetails && (
                  <tr>
                    <th className="font-semibold text-slate-600">Fabric Composition & GSM:</th>
                    <td className="text-slate-900">{product.fabricDetails}</td>
                  </tr>
                )}
                {product?.customizationOptions && (
                  <tr>
                    <th className="font-semibold text-slate-600">Custom Branding / Options:</th>
                    <td className="text-slate-900">{product.customizationOptions}</td>
                  </tr>
                )}
                <tr>
                  <th className="font-semibold text-slate-600">Category:</th>
                  <td className="text-slate-900">
                    {product?.category?.name
                      ? sanitize(formatCategoryName(product?.category?.name))
                      : "General RMG"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
