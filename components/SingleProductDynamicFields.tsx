"use client";

import React from "react";
import { Product } from "@/typings";
import AdaptiveProductActions from "./AdaptiveProductActions";

interface SingleProductDynamicFieldsProps {
  product: Product;
}

const SingleProductDynamicFields = ({ product }: SingleProductDynamicFieldsProps) => {
  return (
    <div className="w-full pt-2">
      <AdaptiveProductActions product={product} showQuantity={product.productType === "DROPSHIP" || !product.productType} />
    </div>
  );
};

export default SingleProductDynamicFields;
