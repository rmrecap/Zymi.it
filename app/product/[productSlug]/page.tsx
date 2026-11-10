import {
  StockAvailabillity,
  UrgencyText,
  ProductTabs,
  SingleProductDynamicFields,
} from "@/components";
import apiClient from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";
import { sanitize } from "@/lib/sanitize";
import prisma from "@/utils/db";
import { getLiveCanbosoProducts } from "@/lib/canboso-api";
import { getAmazonProductBySlugOrAsin } from "@/lib/amazon-top-products";
import type { Metadata } from "next";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

interface SingleProductPageProps {
  params: Promise<{ productSlug: string; id: string }>;
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const paramsAwaited = await params;
  const slug = paramsAwaited?.productSlug || "product";
  const formattedTitle = slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formattedTitle} | ZYMI Store`,
    description: `Buy ${formattedTitle} online at ZYMI Global. Verified quality, fast global shipping, and direct factory-level reliability.`,
    alternates: {
      canonical: `https://zymi.it/product/${slug}`,
    },
    openGraph: {
      title: `${formattedTitle} | ZYMI Store`,
      description: `Buy ${formattedTitle} online at ZYMI Global.`,
      url: `https://zymi.it/product/${slug}`,
    },
  };
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const paramsAwaited = await params;
  let product: any = null;
  let images: ImageItem[] = [];

  // 1. Try Express API backend if running
  try {
    const data = await apiClient.get(
      `/api/slugs/${paramsAwaited?.productSlug}`
    );
    if (data.ok) {
      product = await data.json();
    }
  } catch {
    product = null;
  }

  // 2. Fallback: Check Canboso live digital products catalog
  if (!product || product.error) {
    try {
      const canbosoItems = await getLiveCanbosoProducts();
      const match = canbosoItems.find(
        (c) =>
          c.slug === paramsAwaited?.productSlug ||
          c.id === paramsAwaited?.productSlug ||
          c.externalId === paramsAwaited?.productSlug
      );
      if (match) {
        product = {
          id: match.id,
          title: match.title,
          price: match.price,
          costPrice: match.costPrice,
          originalPrice: match.originalPrice,
          rating: match.rating,
          description: match.description,
          mainImage: match.image,
          slug: match.slug,
          manufacturer: match.brand,
          inStock: match.inStock,
          stock: match.stock,
          sold: match.sold,
          productType: "DIGITAL_DOWNLOAD",
          digitalFormat: match.digitalType,
          badge: match.badge,
        };
      }
    } catch {
      // Ignore
    }
  }

  // 3. Fallback: Check direct Prisma database
  if (!product || product.error) {
    try {
      const dbProduct = await prisma.product.findFirst({
        where: { slug: paramsAwaited?.productSlug },
      });
      if (dbProduct) {
        product = dbProduct;
      }
    } catch {
      // Ignore
    }
  }

  // 4. Fallback: Check Amazon Top-Demand & Automated ASIN Catalog
  if (!product || product.error) {
    try {
      const amzProduct = getAmazonProductBySlugOrAsin(paramsAwaited?.productSlug);
      if (amzProduct) {
        product = {
          id: amzProduct.id,
          title: amzProduct.title,
          price: amzProduct.price,
          originalPrice: amzProduct.originalPrice,
          rating: amzProduct.rating,
          description: amzProduct.features.join(" • "),
          mainImage: amzProduct.mainImage,
          slug: amzProduct.slug,
          manufacturer: amzProduct.manufacturer,
          inStock: amzProduct.inStock,
          productType: "AFFILIATE_AMAZON",
          asin: amzProduct.asin,
          affiliateUrl: amzProduct.affiliateUrl,
          badge: amzProduct.badge,
          category: amzProduct.category,
        };
      }
    } catch {
      // Ignore
    }
  }

  // 4. Try fetching images
  try {
    const imagesData = await apiClient.get(
      `/api/images/${paramsAwaited?.id || product?.id}`
    );
    if (imagesData.ok) {
      images = await imagesData.json();
    }
  } catch {
    images = [];
  }

  if (!product || product.error) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title || "ZYMI Product",
    image: product?.mainImage?.startsWith("http")
      ? product.mainImage
      : `https://zymi.it/${product?.mainImage || "product_placeholder.jpg"}`,
    description: product?.description || product?.title || "",
    sku: String(product?.id || product?.asin || "zymi-item"),
    brand: {
      "@type": "Brand",
      name: product?.manufacturer || "ZYMI Global",
    },
    offers: {
      "@type": "Offer",
      url: `https://zymi.it/product/${product?.slug}`,
      priceCurrency: "USD",
      price: product?.price || 0,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        (product?.inStock ?? 1) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "ZYMI Global",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.rating || 4.8,
      reviewCount: 45,
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-[#050a18] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center gap-x-12 pt-4 max-lg:flex-col items-center gap-y-6">
          <div>
            <Image
              src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
              width={500}
              height={500}
              alt="main image"
              className="w-auto h-auto"
            />
            <div className="flex justify-around mt-5 flex-wrap gap-y-1 max-[500px]:justify-center max-[500px]:gap-x-1">
              {images?.map((imageItem: ImageItem, key: number) => (
                <Image
                  key={imageItem.imageID + key}
                  src={`/${imageItem.image}`}
                  width={100}
                  height={100}
                  alt="laptop image"
                  className="w-auto h-auto"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-7 text-black max-[500px]:text-center">

            <h1 className="text-3xl">{sanitize(product?.title)}</h1>
            <p className="text-xl font-semibold">${product?.price}</p>
            <StockAvailabillity stock={94} inStock={product?.inStock} />
            <SingleProductDynamicFields product={product} />
            <div className="flex flex-col gap-y-2 max-[500px]:items-center">

              <p className="text-lg">
                SKU: <span className="ml-1">abccd-18</span>
              </p>
              <div className="text-lg flex gap-x-2">
                <span>Share:</span>
                <div className="flex items-center gap-x-1 text-2xl">
                  <FaSquareFacebook />
                  <FaSquareXTwitter />
                  <FaSquarePinterest />
                </div>
              </div>
              <div className="flex gap-x-2">
                <Image
                  src="/visa.svg"
                  width={50}
                  height={50}
                  alt="visa icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/mastercard.svg"
                  width={50}
                  height={50}
                  alt="mastercard icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/ae.svg"
                  width={50}
                  height={50}
                  alt="americal express icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/paypal.svg"
                  width={50}
                  height={50}
                  alt="paypal icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/dinersclub.svg"
                  width={50}
                  height={50}
                  alt="diners club icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/discover.svg"
                  width={50}
                  height={50}
                  alt="discover icon"
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
