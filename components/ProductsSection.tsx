import React from "react";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";
import { demoProducts } from "@/utils/insertDemoData";

const ProductsSection = async () => {
  let products = [];

  try {
    const data = await apiClient.get("/api/products");
    if (data.ok) {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.warn("Products API unreachable during render, using demo catalog fallback.");
  }

  // If no DB products yet, use our RMG & Hybrid sample products
  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <section className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Curated Sourcing Hub
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-2">
            Featured Garments &amp; Tech Packs
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            B2B Apparel Emporium bulk production, digital tech pack downloads, and verified Amazon essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.slice(0, 8).map((product: any) => (
            <ProductItem key={product.id || product.slug} product={product} color="black" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
